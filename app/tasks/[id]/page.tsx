import Box from "@/app/components/styleComponents/Box";
import { getTaskById, updateTaskTags } from "@/app/mongo/Controller/taskController";
import ImportantMarker from "../../components/tasks/ImportantMarker";
import { getDateTimeMessage } from "@/app/utils/utils";
import Span from "@/app/components/styleComponents/Span";
import Tag from "@/app/components/Tag";
import AddTag from "../../components/tasks/AddTag";
import TaskStatus from "@/app/components/tasks/task/TaskStatus";
import Tags from "@/app/components/tasks/task/Tags";

export default async function Task({ params }: { params: { id: string } }) {
    const result = await getTaskById(params.id);
    if(!result.success) {
        console.error(result.error);
        return <h1>Failed to get task</h1>
    }
    
    const { task } = result;
    if ( !task || task._id === undefined ) {
        return <h1>Task not found</h1>
    }

    const dueAtMessage = getDateTimeMessage(task.dueAt);
    const createdAtMessage = getDateTimeMessage(task.createdAt);

    const getTagCloseHandler= (index:number) => async () => {
        'use server';
        if(task.tags && task._id) {
            const newTags = task.tags;
            newTags.splice(index, 1);
            await updateTaskTags(task._id, newTags);
        }
    }

    const onTagCreate = async (tag: string) => {
        'use server';
        if(task._id) {
            const newTags = task.tags ?? [];
            newTags.push(tag);
            await updateTaskTags(task._id, newTags);
        }
    }
    return (
        <main className="mt-20 flex justify-center items-start">
            <Box className="p-3 py-12 md:p-12 flex flex-col gap-8 w-[97vw] max-w-5xl">
                <div>
                    <h1 className="text-2xl font-semibold w-full flex justify-between items-center">{task.title}<ImportantMarker _id={task._id ?? ''} important={task.important ?? false}/></h1>
                    <div className="text-sm"><Span variant="textMuted">Created: {createdAtMessage}</Span> | <Span variant={ task.dueAt && task.dueAt.getTime() > new Date().getTime() ? 'success' : 'danger' }>Due Date: {dueAtMessage}</Span></div>
                </div>
                <Tags task={task} getTagCloseHandler={getTagCloseHandler} onTagCreate={onTagCreate}/>
                <p className="text-lg whitespace-pre">{task.description}</p>
                <TaskStatus task={task}/>
            </Box>
        </main>
    )
}