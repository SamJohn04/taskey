import Box from "./styleComponents/Box";

export default function TaskListSkeleton() {
    return (
        <Box className="grid grid-cols-8 gap-y-5 w-full p-2 py-8 md:p-8 md:rounded-md">
            <span className="mb-4 md:text-lg col-span-3 sm:col-span-2 md:col-span-1">Due</span>
            <span className="mb-4 md:text-lg col-span-4 sm:col-span-3 md:col-span-2">Title</span>
            <span className="mb-4 md:text-lg hidden sm:inline sm:col-span-2 md:col-span-4">Description</span>
            <span className="mb-4 md:text-lg overflow-x-hidden text-ellipsis">Status</span>
            <Box className="animate-pulse col-span-8 h-12 rounded-md bg-gray-200" />
            <Box className="animate-pulse col-span-8 h-12 rounded-md bg-gray-200" />
        </Box>
    )
}