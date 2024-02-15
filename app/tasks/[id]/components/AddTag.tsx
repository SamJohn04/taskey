'use client';

import Add from "@/app/components/Icons/Add";
import Close from "@/app/components/Icons/Close";
import Tag from "@/app/components/Tag";
import Button from "@/app/components/styleComponents/Button";
import Input from "@/app/components/styleComponents/Input";
import React from "react";

export default function AddTag({ onTagCreate } : { onTagCreate: (tag: string) => Promise<void> }) {
    const [tagOpen, setTagOpen] = React.useState<boolean>(false);
    if (tagOpen) {
        return (
            <Tag handleClose={() => setTagOpen(false)}><Input variant="transparent" placeholder="Tag" onKeyDown={async (event) => {
                if (event.key === 'Enter') {
                    await onTagCreate(event.currentTarget.value);
                    setTagOpen(false);
                }
            }}/></Tag>
        )
    }
    return (
        <Button variant="basic" noPad className="rounded-full aspect-square flex items-center justify-center transition hover:rotate-90" onClick={() => setTagOpen(val => !val)}>{tagOpen ? <Close /> : <Add />}</Button>
    )
}