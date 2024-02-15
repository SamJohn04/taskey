import Box from "@/app/components/styleComponents/Box";

export default function TaskNav() {
    return (
        <nav className="h-full w-full max-w-md">
            <Box className="h-full flex flex-col justify-between px-4 py-2">
                <h1 className="text-2xl font-bold mb-6">Tasks</h1>
                <div className="flex flex-col gap-4 items-start">
                    <button className="text-lg font-semibold">All</button>
                    <button className="text-lg font-semibold">Important</button>
                    <button className="text-lg font-semibold">Completed</button>
                </div>
            </Box>
        </nav>
    )
}