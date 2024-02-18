'use client';

import { StyleContext } from "@/app/StyleContext";
import { useContext } from "react";

export default function Select({ name, options, variant, style, defaultValue, className, onChange } : {
    name?: string;
    options: string[];
    variant?: "primary" | "secondary" | "tertiary" | 'basic';
    style?: React.CSSProperties;
    defaultValue?: string;
    className?: string;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}) {
    const [theme, ] = useContext(StyleContext);
    const variantStyles = {
        primary: {
            background: `${theme?.colors?.primary}A5`,
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
        <select name={name} style={{...variantStyles[variant ?? 'basic'], ...style}} defaultValue={defaultValue} className={`p-2 rounded-sm w-full ${className}`} onChange={onChange}>
            {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
    )
}