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
    } finally {
        await connection?.disconnect()
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
        const tasks: Task[] = (await TaskModel.find({uId: user.sub})).toSorted((a: Task, b: Task) => {
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
    } finally {
        await connection?.disconnect();
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
        const res = await TaskModel.findOneAndUpdate({ _id: taskId, uId: user.sub }, { important });
        return (res !== null);
    } catch(error) {
        console.log('Task Update Error: ', error)
        return {
            success: false,
            error: error
        }
    } finally {
        await connection?.disconnect();
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

        const task = await TaskModel.findById(taskId);
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
    } finally {
        await connection?.disconnect();
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
        const res = await TaskModel.findOneAndUpdate({ _id: taskId, uId: user.sub }, { tags });
        return (res !== null);
    } catch(error) {
        console.log('Task Update Error: ', error)
        return {
            success: false,
            error: error
        }
    } finally {
        await connection?.disconnect();
    }
}