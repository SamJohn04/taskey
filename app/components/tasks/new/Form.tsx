'use client';

import { createTask } from "@/app/mongo/Controller/taskController";
import MoreVert from "@/app/components/Icons/MoreVert";
import Star from "@/app/components/Icons/Star";
import Box from "@/app/components/styleComponents/Box";
import Button from "@/app/components/styleComponents/Button";
import Input from "@/app/components/styleComponents/Input";
import ToggleSwitch from "@/app/components/styleComponents/ToggleSwitch";
import { Task } from "@/app/mongo/Model/taskModel";
import { motion } from "framer-motion";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Tag from "@/app/components/Tag";

export default function Form({ defaultValues, isEditing, editingId } : { defaultValues?: Task, isEditing?: boolean, editingId?: string}) {
    const [tags, setTags] = React.useState<string[]>(defaultValues?.tags ?? []);
    const [important, setImportant] = React.useState<boolean>(defaultValues?.important ?? false);
    const [repeat, setRepeat] = React.useState<boolean>(defaultValues?.repeating ?? false);
    const [moreOpen, setMoreOpen] = React.useState<boolean>(false);
    const [showEnterMessage, setShowEnterMessage] = React.useState<boolean>(false);
    const [dueDateIsOpen, setDueDateIsOpen] = React.useState<boolean>(defaultValues?.dueAt !== undefined);
    const { user, error, isLoading } = useUser();
    const [ loading, setLoading ] = React.useState<boolean>(false);
    
    const dialogRef = React.useRef<HTMLDialogElement>(null);
    const [dialogMessage, setDialogMessage] = React.useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!user) {
            setDialogMessage("You need to be logged in to create a task!");
            dialogRef.current?.showModal();
            return;
        }

        const target = event.currentTarget;
        setLoading(true);
        const formData = new FormData(event.currentTarget);
        const task: Task = {
            uId: user.sub ?? '',
            title: formData.get("title") as string,
            important: important,
            tags: tags,
            description: formData.get("description") as string,
            dueAt: dueDateIsOpen ? new Date(formData.get("dueAt") as string) : undefined,
            repeating: repeat,
        }
        const res = await createTask(task);
        if(res.success) {
            setDialogMessage("Task Created Successfully!");
            target.reset();
            setTags([]);
        } else {
            setDialogMessage(`Failed to create task; Error: ${error}. Please try again later.`);
        }
        dialogRef.current?.showModal();
        setLoading(false);
    }

    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") {
            return;
        }
        event.preventDefault();
        const tag = event.currentTarget.value;
        if(tag.length === 0) {
            return;
        }
        const newTags = tag.split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 0)
        event.currentTarget.value = ""
        setTags((tags) => [...tags, ...newTags])
        setShowEnterMessage(false)
    }

    const getCloseHandler = (index: number) => () => {
        setTags(tags => tags.filter((_, i) => i !== index))
    }
    return (
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex justify-between items-center"><h2 className="w-full max-w-6xl mx-auto text-lg md:text-2xl font-semibold">Details</h2><button type="button" onClick={() => setImportant(important => !important)}><Star isStarred={important}/></button></div>
            <div className="w-full max-w-5xl m-auto flex items-stretch text-lg gap-4"><Input name="title" className="w-full p-2 rounded-sm" required type="text" placeholder="Title" defaultValue={defaultValues?.title}/></div>
            <div className="w-full max-w-5xl m-auto flex items-stretch text-lg gap-4"><Input multiline name="description" placeholder="Description" className="w-full p-2 rounded-sm" defaultValue={defaultValues?.description} maxLength={10000}/></div>
            <h2 className="w-full max-w-6xl mx-auto text-lg md:text-2xl font-semibold">Tags</h2>
            <div className="w-full max-w-5xl m-auto flex flex-col items-start gap-4 text-lg">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-center">{tags.map((tag, index) => <Tag key={index} tag={tag} handleClose={getCloseHandler(index)}><span className="text-nowrap truncate w-full">{tag}</span></Tag>)}</div>
                <div className="relative w-full md:w-auto"><Input name= 'tag' className="p-2 rounded-sm relative z-10 w-full" type="text" placeholder="Tag" onKeyDown={handleEnter} onChange={(event) => setShowEnterMessage(event.target.value.length > 0)}/><span className={`text-sm text-text-muted text-center absolute w-full left-0 z-0 transition-all ${showEnterMessage ? 'opacity-100 -bottom-6' : 'opacity-0 bottom-0'}`}>Press &lt;Enter&gt; to add Tag</span></div>
            </div>
            <Button variant={moreOpen ? "tertiary-active" : "tertiary"} className="flex justify-center items-center group gap-4" onClick={() => setMoreOpen(isOpen => !isOpen)}><MoreVert isOpen={moreOpen}/>More Options</Button>
                <motion.div initial={{scaleY: 0}} whileInView={{scaleY: 1}} style={moreOpen ? {} : {display: 'none'}} className="flex flex-col gap-4">
                    <div className="w-full max-w-5xl m-auto flex flex-col items-stretch text-lg gap-4"><span className="flex items-center gap-4">Have a due date? <ToggleSwitch variant="primary" onChange={(e : React.ChangeEvent<HTMLInputElement>) => setDueDateIsOpen(e.currentTarget.checked)}/></span><Input name="dueAt" defaultValue={defaultValues?.dueAt?.toDateString()} style={{visibility: dueDateIsOpen ? 'visible' : 'collapse'}} type="datetime-local"/></div>
                    <div className="w-full max-w-5xl m-auto flex flex-col items-stretch text-lg gap-4"><span className="flex items-center gap-4 underline decoration-dashed" title="Create a new copy of the task once it is complete">Repeat? <ToggleSwitch variant="primary" value={repeat} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setRepeat(e.currentTarget.checked)}/></span></div>
                </motion.div>
            <Button type="submit" className="mt-4 flex justify-center items-center rounded hover:scale-95 disabled:hover:scale-100 active:scale-95 disabled:active:scale-100 disabled:grayscale" disabled={loading || isLoading}>Create</Button>
            <dialog ref={dialogRef} className="rounded-md"><Box className="p-4 rounded-md flex flex-col gap-4"><span className="text-xl">{dialogMessage}</span><Button className="items-center justify-center hover:scale-95 active:scale-95" onClick={() => dialogRef.current?.close()}>Ok!</Button></Box></dialog>
        </form>
    )
}