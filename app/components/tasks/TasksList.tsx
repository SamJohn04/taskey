import { Task } from "../../mongo/Model/taskModel";
import TaskCard from "./TaskCard";
import Box from "../styleComponents/Box";

export default function TaskList({ tasks, compact } : { tasks: Task[], compact?: boolean }) {
    return (
        // <Box className="flex flex-col gap-4 max-w-6xl m-auto">
        //     {tasks.map(task => (
        //         <Box variant="primary" key={task._id} className="p-2 rounded">
        //             <h2 className="text-xl md:text-2xl"><Star isStarred={task.important} disabled/>{task.title}</h2>
        //             <p className="">{task.description}</p>
        //         </Box>
        //     ))}
        // </Box>
        <Box className={`grid grid-cols-6 sm:grid-cols-8 ${compact ? 'gap-y-1' : 'gap-y-2'} w-full p-2 py-4 md:p-8 md:rounded-md`}>
            <span className="md:mb-4 md:text-lg col-span-2 md:col-span-1">Due</span>
            <span className="md:mb-4 md:text-lg col-span-3 md:col-span-2">Title</span>
            <span className="md:mb-4 md:text-lg hidden sm:inline sm:col-span-2 md:col-span-4">Description</span>
            { tasks.map((task, index) => <TaskCard key={task._id ?? task.createdAt?.getTime()} task={task} compact={compact}/>) }
        </Box>
    )
}