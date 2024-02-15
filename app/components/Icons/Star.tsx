'use client';

import { StyleContext } from "@/app/StyleContext";
import { useContext } from "react";

export default function Star({isStarred, disabled, width } : {isStarred?: boolean, disabled?: boolean, width?: string }) {
    const [theme, ] = useContext(StyleContext);

    const style = {
        fill: isStarred ? theme?.colors?.primary : 'transparent',
        stroke: isStarred ? theme?.colors?.primary : theme?.colors?.text,
        strokeWidth: width ? `calc(${width}/2)` : '2rem',
        width: width,
    }
    return (
        <svg className={`w-6 md:w-8 transition ${!disabled && 'hover:scale-90'}`} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z"/></svg>
    )
}