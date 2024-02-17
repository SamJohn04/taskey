import TaskListSkeleton from "../components/tasks/TaskListSkeleton";

export default function Loading() {
    return (
        <main className="w-[95dvw] max-w-6xl mt-20 mx-auto">
            <TaskListSkeleton />
        </main>
    )
}