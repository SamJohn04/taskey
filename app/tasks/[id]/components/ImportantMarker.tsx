'use client';

import Star from "@/app/components/Icons/Star";
import Button from "@/app/components/styleComponents/Button";
import { updateTaskImportant } from "@/app/mongo/Controller/taskController";
import React from "react";

export default function ImportantMarker({ _id, important } : { _id: string, important: boolean }) {
    const [isImportant, setIsImportant] = React.useState(important);
    return (
        <Button variant="tertiary" onClick={async () => {
            setIsImportant(!isImportant);
            await updateTaskImportant(_id, !isImportant);
        }}><Star isStarred={isImportant}/></Button>
    )
}