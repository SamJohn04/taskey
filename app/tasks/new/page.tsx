import Box from "@/app/components/styleComponents/Box";
import Form from "../../components/tasks/new/Form";
import { redirect } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";

export default async function NewTaskPage() {
    const { user } = await getSession() ?? {};
    if (!user) {
        redirect('/');
    }
    return (
        <main className="flex justify-center items-start md:mt-20 mt-10">
            <Box className="my-4 p-6 py-12 md:p-12 flex flex-col gap-16 w-[95vw] max-w-5xl">
                <h1 className="w-full max-w-6xl mx-auto text-2xl md:text-3xl font-semibold">Create a New Task</h1>
                <Form />
            </Box>
        </main>
    )
}