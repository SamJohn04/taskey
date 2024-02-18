'use server';

import TaskModel, { Task } from "@/app/mongo/Model/taskModel";
import { connectDB } from "../database";
import { getSession } from "@auth0/nextjs-auth0";

export async function createTask(task: Task): Promise<{ success: true } | { success: false, error: unknown }> {
    const { success, connection, error } = await connectDB();
    if (!success) {
        return {
            success: false,
            error: error
        }
    }
    try {
        const newTask = await TaskModel.create(task);
        console.log(newTask);
        return {
            success: true,
        }
    } catch(error) {
        console.log('Task Create Error: ', error)
        return {
            success: false,
            error: error
        }
    }
}

export async function getTasks(): Promise<{success: false, error: unknown} | {success: true, tasks: Task[]}> {
    const { success, connection, error } = await connectDB();
    const { user } = (await getSession()) ?? {};
    if (!success) {
        return {
            success: false,
            error: error
        }
    } else if (!user) {
        return {
            success: false,
            error: 'User not found'
        }
    }
    try {
        const tasks: Task[] = (await TaskModel.find({uId: user.sub}).exec()).toSorted((a: Task, b: Task) => {
            if(a.status === 'completed' && b.status !== 'completed') {
                return 1;
            }
            if(a.status !== 'completed' && b.status === 'completed') {
                return -1;
            }
            if(a.important && !b.important) {
                return -1;
            }
            if(!a.important && b.important) {
                return 1;
            }
            if(a.dueAt && b.dueAt) {
                return a.dueAt.getTime() - b.dueAt.getTime();
            }
            return 0;
        }).map(task => {
            return {
                _id: task._id.toString(),
                title: task.title,
                description: task.description,
                status: task.status,
                dueAt: task.dueAt,
                completedAt: task.completedAt,
                important: task.important,
                uId: task.uId,
                tags: task.tags,
                repeating: task.repeating,
                createdAt: task.createdAt
            }
        });
        return {
            success: true,
            tasks: tasks
        }
    } catch(error) {
        console.log('Task Get Error: ', error)
        return {
            success: false,
            error: error
        }
    }
}

export async function updateTaskImportant(taskId: string, important: boolean) {
    const { success, connection, error } = await connectDB();
    try {
        const { user } = (await getSession()) ?? {};
        if (!success) {
            return {
                success: false,
                error: error
            }
        } else if (!user) {
            return {
                success: false,
                error: 'User not found'
            }
        }
        const res = await TaskModel.findOneAndUpdate({ _id: taskId, uId: user.sub }, { important }).exec();
        return (res !== null);
    } catch(error) {
        console.log('Task Update Error: ', error)
        return {
            success: false,
            error: error
        }
    }
}

export async function getTaskById(taskId: string): Promise<{
    success: false,
    error: unknown
} | {
    success: true,
    task: Task
}> {
    const { success, connection, error } = await connectDB();
    try {
        const { user } = (await getSession()) ?? {};
        if (!success) {
            return {
                success: false,
                error: error
            }
        } else if (!user) {
            return {
                success: false,
                error: 'User not found'
            }
        }

        const task = await TaskModel.findById(taskId).exec();
        if(task.uId !== user.sub) {
            return {
                success: false,
                error: 'Task not found'
            }
        }

        return {
            success: true,
            task: {
                _id: task._id.toString(),
                title: task.title,
                description: task.description,
                status: task.status,
                dueAt: task.dueAt,
                completedAt: task.completedAt,
                important: task.important,
                uId: task.uId,
                tags: task.tags,
                repeating: task.repeating,
                createdAt: task.createdAt
            }
        }
    } catch(error) {
        console.log('Task Get Error: ', error)
        return {
            success: false,
            error: error
        }
    }
}

export async function updateTaskTags(taskId: string, tags: string[]) {
    const { success, connection, error } = await connectDB();
    try {
        const { user } = (await getSession()) ?? {};
        if (!success) {
            return {
                success: false,
                error: error
            }
        } else if (!user) {
            return {
                success: false,
                error: 'User not found'
            }
        }
        const res = await TaskModel.findOneAndUpdate({ _id: taskId, uId: user.sub }, { tags }).exec();
        return (res !== null);
    } catch(error) {
        console.log('Task Update Error: ', error)
        return {
            success: false,
            error: error
        }
    }
}

export async function updateTaskStatus(taskId: string, status: string) {
    const { success, connection, error } = await connectDB();
    try {
        const { user } = (await getSession()) ?? {};
        if (!success) {
            return {
                success: false,
                error: error
            }
        } else if (!user) {
            return {
                success: false,
                error: 'User not found'
            }
        } else if (!['in progress', 'completed', 'dropped'].includes(status)) {
            return {
                success: false,
                error: 'Invalid status'
            }
        }
        const task = await TaskModel.findById(taskId).exec();
        if(!task || task.uId !== user.sub) {
            return {
                success: false,
                error: 'Task not found'
            }
        }
        task.status = status;
        task.completedAt = status === 'completed' ? new Date() : undefined;
        await task.save()
        if(task.repeating && status === 'completed' && task.originalId === undefined) {
            const newTask = {
                ...task.toObject(),
                _id: undefined,
                status: undefined,
                originalId: task._id
            }
            await TaskModel.create(newTask);
        } else if (task.repeating && status === 'completed') {
            const openTask = await TaskModel.find({ originalId: task.originalId, status: 'in progress' }).exec();
            if(openTask.length === 0) {
                const newTask = {
                    ...task.toObject(),
                    _id: undefined,
                    status: undefined,
                }
                await TaskModel.create(newTask);
            }
        }
    } catch(error) {
        console.log('Task Update Error: ', error)
        return {
            success: false,
            error: error
        }
    }
}