'use client';

import { motion } from "framer-motion";
import React from "react";
import { Chip } from "@mui/material";

export default function Tag({ tag, handleClose, hideClose } : { tag?: string, handleClose?: () => void, hideClose?: boolean}) {
    return (
        // <motion.div initial={{scaleX: 0}} animate={{scaleX: 1}} title={tag} className="overflow-hidden"><Box variant="primary" className="rounded-full px-6 py-2 flex items-center gap-2 justify-between">{children}{!hideClose && <button type="button" className="transition hover:rotate-90" onClick={() => handleClose && handleClose()}><Close /></button>}</Box></motion.div>
        <motion.div initial={{scaleX: 0}} animate={{scaleX: 1}} title={tag} className="overflow-hidden"><Chip variant="outlined" className="p-2 backdrop-blur" label={tag} onDelete={hideClose ? undefined : handleClose}/></motion.div>

    )
}