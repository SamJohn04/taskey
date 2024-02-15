import Box from "@/app/components/styleComponents/Box";

export default function Loading() {
    return (
        <main className="mt-20 flex justify-center items-start">
            <Box className="p-6 py-12 md:p-12 flex flex-col gap-8 w-[95vw] max-w-5xl">
                <div className="flex flex-col gap-2">
                    <h1 className="bg-gray-200 text-2xl h-12 animate-pulse font-semibold w-1/2 flex justify-between items-center" />
                    <div className="bg-gray-200 animate-pulse h-8 w-1/3" />
                </div>
                <p className="bg-gray-200 w-full h-24 animate-pulse" />
            </Box>
        </main>
    )
}