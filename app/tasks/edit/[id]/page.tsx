import Box from "@/app/components/styleComponents/Box";
import Form from "@/app/components/tasks/new/Form";
import { redirect } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";
import { getTaskById } from "@/app/mongo/Controller/taskController";

export default async function EditTaskPage({ params }: { params: { id: string } }) {
    const { user } = await getSession() ?? {};
    if (!user) {
        redirect('/');
    }
    const result = await getTaskById(params.id);
    if(!result.success) {
        console.error(result.error);
        return <h1>Failed to get task</h1>
    }
    const { task } = result;
    return (
        <main className="flex justify-center items-start mt-20">
            <Box className="my-4 p-6 py-12 md:p-12 flex flex-col gap-16 w-[95vw] max-w-5xl">
                <h1 className="w-full max-w-6xl mx-auto text-2xl md:text-3xl font-semibold">Editing Task {task.title}</h1>
                <Form />
            </Box>
        </main>
    )
}