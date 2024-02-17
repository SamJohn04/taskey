'use client';

import Link from "next/link";
import { Task } from "../../mongo/Model/taskModel";
import Button from "../styleComponents/Button";
import ToggleSwitch from "../styleComponents/ToggleSwitch";
import TaskNav from "./TaskNav";
import TaskList from "./TasksList";
import React from "react";

export default function TasksView({tasks} : { tasks: Task[] }) {
    const [compact, setCompact] = React.useState<boolean>(false);
    return (
        <>
            <div className="md:col-start-2 md:col-span-3 w-full flex justify-between">
                <div className="flex items-center gap-2">Compact View: <ToggleSwitch variant="primary" onChange={(event) => {setCompact(event.target.checked)}}/></div>
                <Link href='/tasks/new'><Button className="rounded-md hover:scale-95 active:scale-95">New Task</Button></Link>
            </div>
            <TaskNav />
            <div className="col-span-3 w-[95dvw] md:w-auto"><TaskList tasks={tasks} compact={compact}/></div>
        </>
    )
}