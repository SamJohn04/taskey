import { Task } from "@/app/mongo/Model/taskModel";
import Tag from "../../Tag";
import AddTag from "../AddTag";

export default function Tags({ task, getTagCloseHandler, onTagCreate} : { task: Task, getTagCloseHandler: (index: number) => () => Promise<void>, onTagCreate: (tag: string) => Promise<void>}){

    return (
        <div className="flex gap-2 overflow-x-auto overflow-y-hidden">{task.tags?.map((tag, index) => <Tag key={tag + index} tag={tag} handleClose={getTagCloseHandler(index)}><span className="text-nowrap truncate w-full">{tag}</span></Tag>)}<AddTag onTagCreate={onTagCreate}/></div>
    )
}