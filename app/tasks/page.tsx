import { getSession } from "@auth0/nextjs-auth0";
import { getTasks } from "../mongo/Controller/taskController"
import { redirect } from "next/navigation";
import TasksView from "../components/tasks/TasksView";

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
        <main className="w-[95dvw] mt-10 md:mt-20 mx-auto flex flex-col items-start md:grid md:grid-cols-4 gap-4">
            <TasksView tasks={result.tasks} />
        </main>
    )
}