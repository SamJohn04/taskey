'use client';

import { StyleContext } from "@/app/StyleContext";
import React, { useContext } from "react";

export default function Delete({hoverColor} : {hoverColor?: 'primary' | 'secondary' | 'text' | 'textEmphasis' | 'textMuted' | 'success' | 'danger'}) {
    const [theme, ] = useContext(StyleContext);
    const [isHover, setHover] = React.useState(false);
    return (
        <svg xmlns="http://www.w3.org/2000/svg" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{fill: isHover ? theme?.colors[hoverColor ?? 'danger'] ?? 'red' : theme?.colors?.text}} viewBox="0 -960 960 960" className="w-4 md:w-6"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z"/></svg>
    )
}