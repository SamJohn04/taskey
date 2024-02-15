'use client';

import { StyleContext } from "@/app/StyleContext";
import { useContext, useRef } from "react";

export default function ToggleSwitch({variant, onChange}: {
    variant: "primary" | "secondary" | "tertiary";
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [theme, ] = useContext(StyleContext);
    const variantStyles = {
        primary: {
            background: `${inputRef.current?.checked ? theme?.colors?.primary : theme?.colors?.textMuted}A5`,
            color: theme?.colors?.text
        },
        secondary: {
            background: `${theme?.colors?.secondary}A5`,
            color: theme?.colors?.text
        },
        tertiary: {
            background: `${theme?.colors?.background}A5`,
            color: theme?.colors?.text
        }, basic:{
            background: `${theme?.colors?.neutral}A5`,
            color: theme?.colors?.text
        } 
    }
    return (
        <div className="relative flex toggle-switch cursor-pointer">
            <input type="checkbox" className="appearance-none h-5 w-16 rounded-full cursor-pointer" onChange={onChange} ref={inputRef} style={variantStyles[variant ?? 'primary']}/>
            <div className="w-4 h-4 rounded-full absolute top-1/2 left-1 -translate-y-1/2 transition-all" style={{backgroundColor: theme?.colors?.text}} onClick={() => inputRef.current?.click() }/>
        </div>
    )
}