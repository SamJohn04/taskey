'use client';

import React from "react";
import { Task } from "../mongo/Model/taskModel";
import Star from "./Icons/Star";
import Span from "./styleComponents/Span";
import { updateTaskImportant } from "../mongo/Controller/taskController";
import Link from "next/link";
import { getDateTimeMessage } from "../utils/utils";

export default function TaskCard({ task } : { task: Task }) {
    const createdAtMessage = React.useMemo(() => getDateTimeMessage(task.createdAt), [task.createdAt]);
    const dueAtMessage = React.useMemo(() => getDateTimeMessage(task.dueAt), [task.dueAt]);
    const [ showImportant, setShowImportant ] = React.useState(task.important);
    return (
        <Link href={`/tasks/${task._id}`} className="grid col-span-8 grid-cols-subgrid">
            <Span className="col-span-3 sm:col-span-2 md:col-span-1" variant={task.status === 'completed' || task.status === 'dropped' ? 'textMuted' : task.dueAt && (task.dueAt.getTime() - new Date().getTime() > 0) ? 'success' : task.dueAt ? 'danger' : 'text'}>{dueAtMessage}</Span>
            <Span className={`flex  items-center gap-2 mb-4 col-span-4 sm:col-span-3 md:col-span-2 ${task.status === "completed" || task.status === 'dropped' ? 'line-through' : ''}`} variant={task.status === 'completed' || task.status === 'dropped' ? 'textMuted' : 'text'}>{task.title}<button type="button" onClick={async (event) => {
                event.preventDefault();
                event.stopPropagation();
                if(!task._id) {
                    return;
                }
                await updateTaskImportant(task._id, !showImportant);
                setShowImportant(!showImportant);
            }}><Star width="1.3rem" isStarred={showImportant}/></button></Span>
            <Span className={`md:max-w-[75%] hidden sm:inline overflow-hidden whitespace-nowrap text-ellipsis ls:col-span-2 md:col-span-4 ${task.status === "completed" || task.status === 'dropped' ? 'line-through' : ''}`}>{task.description}</Span>
            <Span className="capitalize">{task.status}</Span>
            {/* <Select className="col-span-1" options={['waiting', 'ongoing', 'completed', 'dropped']} defaultValue={task.status}/> */}
        </Link>
    )
}