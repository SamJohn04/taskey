'use client';

import React from "react";
import { Task } from "../../mongo/Model/taskModel";
import Star from "../Icons/Star";
import Span from "../styleComponents/Span";
import { updateTaskImportant, updateTaskStatus } from "../../mongo/Controller/taskController";
import Link from "next/link";
import { getDateTimeMessage } from "../../utils/utils";
import Tag from "../Tag";
import Check from "../Icons/Check";
import Delete from "../Icons/Delete";
import { useRouter } from "next/navigation";
import RemoveCheck from "../Icons/RemoveCheck";
import Undo from "../Icons/Undo";

export default function TaskCard({ task, compact } : { task: Task, compact?: boolean}) {
    const router = useRouter()
    const [loading, setLoading] = React.useState(false);
    const createdAtMessage = React.useMemo(() => getDateTimeMessage(task.createdAt), [task.createdAt]);
    const dueAtMessage = React.useMemo(() => getDateTimeMessage(task.dueAt), [task.dueAt]);
    const [ showImportant, setShowImportant ] = React.useState(task.important);
    const [status, setStatus] = React.useState(task.status);
    return (
        <div className="py-2 grid col-start-1 col-span-6 sm:col-span-8 grid-cols-subgrid items-center overflow-auto">
            <Span className="col-span-2 md:col-span-1 whitespace-nowrap" variant={status === 'completed' || status === 'dropped' ? 'textMuted' : task.dueAt && (task.dueAt.getTime() - new Date().getTime() > 0) ? 'success' : task.dueAt ? 'danger' : 'text'}>{dueAtMessage}</Span>
            <Link href={`/tasks/${task._id}`} className="col-span-3 md:col-span-2"><Span className={`flex items-center gap-2 overflow-hidden text-nowrap truncate ${status === "completed" || status === 'dropped' ? 'line-through' : ''}`} variant={status === 'completed' || status === 'dropped' ? 'textMuted' : 'text'}>{task.title}<button type="button" onClick={async (event) => {
                event.preventDefault();
                event.stopPropagation();
                if(!task._id) {
                    return;
                }
                await updateTaskImportant(task._id, !showImportant);
                setShowImportant(!showImportant);
            }}><Star width="1.3rem" isStarred={showImportant}/></button></Span></Link>
            <Span className={`md:max-w-[75%] hidden sm:inline overflow-hidden whitespace-nowrap text-ellipsis ls:col-span-2 md:col-span-4 ${status === "completed" || status === 'dropped' ? 'line-through' : ''}`}>{task.description}</Span>
            <Span className="capitalize  whitespace-nowrap w-full flex justify-between items-center gap-2"><span className={'max-md:hidden'}>{status}</span><button disabled={loading} className="hover:scale-95 active:scale-95" onClick={async (event) => {
                event.preventDefault();
                event.stopPropagation();
                if(!task._id) {
                    return;
                }
                setLoading(true);
                await updateTaskStatus(task._id, task.status === 'completed' ? 'in progress' : 'completed');
                setStatus(task.status === 'completed' ? 'in progress' : 'completed');
                setLoading(false);
            }} title={status === 'completed' ? 'Mark as In Progress' : 'Mark as Completed'}>{status === 'completed' ? <RemoveCheck hoverColor={loading ? 'textMuted' : 'danger'}/> : <Check hoverColor={loading ? 'textMuted' : 'success'}/>}</button><button disabled={loading} className="hover:scale-95 active:scale-95" onClick={async (event) => {
                event.preventDefault();
                event.stopPropagation();
                if(!task._id) {
                    return;
                }
                setLoading(true);
                await updateTaskStatus(task._id, task.status === 'dropped' ? 'in progress' : 'dropped');
                setStatus(task.status === 'dropped' ? 'in progress' : 'dropped');
                setLoading(false);
            }} title={status === 'dropped' ? 'Mark as In Progress' : "Mark as dropped"}>{status === 'dropped' ? <Undo hoverColor={loading ? 'textMuted' : 'success'}/> : <Delete hoverColor={loading ? 'textMuted' : 'danger'}/>}</button></Span>
            {!compact && <div className="col-start-2 col-span-7 flex gap-2 py-2 overflow-hidden" >{task.tags?.slice(0, 5).map((tag, index) => <Tag key={index} hideClose><span className="text-nowrap truncate w-full">{tag}</span></Tag>)}</div>}
        </div>
    )
}