'use client';

import Link from "next/link";
import { Task } from "../../mongo/Model/taskModel";
import Button from "../styleComponents/Button";
import ToggleSwitch from "../styleComponents/ToggleSwitch";
import TaskNav from "./TaskNav";
import TaskList from "./TasksList";
import React from "react";
import { useSearchParams } from "next/navigation";

export default function TasksView({tasks} : { tasks: Task[] }) {
    const [expand, setExpand] = React.useState<boolean>(false);
    const [showNav, setShowNav] = React.useState<boolean>(false);
    const params = useSearchParams();
    const filteredTasks = React.useMemo(() => {
        const filter = params.get('filter');
        if(filter === 'important') {
            return tasks.filter(task => task.important);
        } else if(filter === 'completed') {
            return tasks.filter(task => task.status === 'completed');
        } else if(filter === 'dropped') {
            return tasks.filter(task => task.status === 'dropped');
        } else if(filter === 'overdue') {
            return tasks.filter(task => task.dueAt && task.dueAt.getTime() - new Date().getTime() < 0);
        } else {
            return tasks;
        }
    }, [params])

    return (
        <>
            <div className="md:col-start-2 md:col-span-3 w-full flex justify-between">
                <div className="flex items-center gap-2">Expand View: <ToggleSwitch variant="primary" onChange={(event) => {setExpand(event.target.checked)}}/></div>
                <Link href='/tasks/new'><Button className="rounded-md hover:scale-95 active:scale-95">New Task</Button></Link>
            </div>
            <div className="w-full md:hidden"><Button variant="tertiary-active" className="w-full items-center justify-center active:scale-95 font-semibold" onClick={() => setShowNav(val => !val)}>Filter Tasks</Button></div>
            <TaskNav showNav={showNav} setShowNav={setShowNav}/>
            <div className="col-span-3 w-[95dvw] md:w-auto"><TaskList tasks={filteredTasks} compact={!expand}/></div>
        </>
    )
}