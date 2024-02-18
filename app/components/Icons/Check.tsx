'use client';

import { StyleContext } from "@/app/StyleContext";
import React, { useContext } from "react";

export default function Check({hoverColor} : {hoverColor?: 'primary' | 'secondary' | 'text' | 'textEmphasis' | 'textMuted' | 'success' | 'danger'}) {
    const [theme, ] = useContext(StyleContext);
    const [isHover, setHover] = React.useState(false);
    return (
        <svg xmlns="http://www.w3.org/2000/svg" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{fill: isHover ? theme?.colors[hoverColor ?? 'success'] ?? 'green' : theme?.colors?.text}} viewBox="0 -960 960 960" className="w-4 md:w-6"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
    )
}