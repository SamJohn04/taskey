'use client';

import { StyleContext } from "@/app/StyleContext";
import { useContext } from "react";

export default function Close({className} : {className?: string}) {
    const [theme, ] = useContext(StyleContext);
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{fill: theme?.colors?.text}} viewBox="0 -960 960 960" className={className ?? "w-4 md:w-6"}><path d="M256-227.692 227.692-256l224-224-224-224L256-732.308l224 224 224-224L732.308-704l-224 224 224 224L704-227.692l-224-224-224 224Z"/></svg>
    )
}