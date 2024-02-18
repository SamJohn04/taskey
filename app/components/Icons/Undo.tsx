'use client';

import { StyleContext } from "@/app/StyleContext";
import React, { useContext } from "react";

export default function Undo({hoverColor} : {hoverColor?: 'primary' | 'secondary' | 'text' | 'textEmphasis' | 'textMuted' | 'success' | 'danger'}) {
    const [theme, ] = useContext(StyleContext);
    const [isHover, setHover] = React.useState(false);
    return (
        <svg xmlns="http://www.w3.org/2000/svg" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{fill: isHover ? theme?.colors[hoverColor ?? 'success'] ?? 'green' : theme?.colors?.text}} viewBox="0 -960 960 960" className="w-4 md:w-6"><path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"/></svg>
    )
}