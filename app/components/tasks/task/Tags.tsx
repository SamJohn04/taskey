import { Task } from "@/app/mongo/Model/taskModel";
import Tag from "../../Tag";

export default async function Tags({ task, getTagCloseHandler} : { task: Task, getTagCloseHandler: (index: number) => () => Promise<void>}){

    return (
        <div className="flex gap-2 overflow-x-auto overflow-y-hidden">{task.tags?.map((tag, index) => <Tag key={tag + index} tag={tag} hideClose/>)}</div>
    )
}