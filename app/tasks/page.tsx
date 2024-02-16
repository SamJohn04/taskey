import { getSession } from "@auth0/nextjs-auth0";
import TaskList from "../components/TasksList"
import { getTasks } from "../mongo/Controller/taskController"
import { redirect } from "next/navigation";
import TaskNav from "./components/TaskNav";
import Button from "../components/styleComponents/Button";

export default async function Tasks() {
    const { user } = await getSession() ?? {};
    if (!user) {
        redirect('/');
    }
    const result = await getTasks();
    if(!result.success) {
        console.error(result.error);
        return <h1>Failed to get tasks</h1>
    }
    return (
        <main className="w-[95dvw] mt-20 mx-auto flex flex-col gap-4 items-center justify-center">
            <div className="w-full flex justify-between items-center"><Button className="rounded hover:scale-95 justify-self-end">New Task</Button></div>
            <div className="w-full flex gap-4">
                <TaskNav />
                <div className="w-[95vw] max-w-6xl"><TaskList tasks={result.tasks}/></div>
            </div>
        </main>
    )
}