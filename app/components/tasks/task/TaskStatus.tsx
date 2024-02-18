'use client';

import React, { useContext } from "react";
import { Task } from "@/app/mongo/Model/taskModel";
import { updateTaskStatus } from "@/app/mongo/Controller/taskController";
import Box from "../../styleComponents/Box";
import { StyleContext } from "@/app/StyleContext";
import { motion } from "framer-motion";

export default function TaskStatus({task} : { task: Task }) {
    const options = ['in progress', 'completed', 'dropped'] as const;
    const [loading, setLoading] = React.useState(false);
    const [currentStatusValue, setCurrentStatusValue] = React.useState(task.status);

    const [theme, ] = useContext(StyleContext)
    return (
        <Box className="relative overflow-hidden w-full p-2 rounded-full flex items-center">
            {options.map((option) => <button className="text-sm md:text-base capitalize w-full flex items-center justify-center disabled:opacity-60" key={option} onClick={async () => {
                if(option === currentStatusValue || !task._id) return;
                if(option === 'in progress' || option === 'completed' || option === 'dropped') {
                    setCurrentStatusValue(option);
                    setLoading(true);
                    await updateTaskStatus(task._id, option);
                    setLoading(false);
                }
            }} disabled={loading}>{option}</button>)}
            <motion.div initial={{translateX: `0%`, backgroundColor: `${theme?.colors.text}10`}} animate={{translateX: `${options.indexOf(currentStatusValue ?? 'in progress') * 100}%`, backgroundColor: `${theme?.colors.text}30`}} className="absolute left-0 h-full w-1/3 rounded-full" />
        </Box>
    )
}