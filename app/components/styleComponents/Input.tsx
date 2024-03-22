'use client';

import { StyleContext } from "@/app/StyleContext";
import React, { useContext } from "react";

export default function Input({ name, type, required, placeholder, className, variant, style, multiline, maxLength, label, value, defaultValue, max, min, onChange, onKeyDown }: {
    name?: string;
    type?: React.HTMLInputTypeAttribute;
    required?: boolean;
    placeholder?: string;
    className?: string;
    variant?: "primary" | "secondary" | "tertiary" | 'basic' | 'transparent';
    style?: React.CSSProperties;
    multiline?: boolean;
    maxLength?: number;
    label?: string;
    value?: string | number | readonly string[];
    max?: string | number;
    min?: string | number;
    defaultValue?: string | number | readonly string[];
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}) {
    const [theme, ] = useContext(StyleContext);
    const variantStyles = {
        primary: {
            background: `${theme?.colors?.primary}${theme?.transparency?.input ?? 'A5'}`,
            color: theme?.colors?.text
        },
        secondary: {
            background: `${theme?.colors?.secondary}${theme?.transparency?.input ?? 'A5'}`,
            color: theme?.colors?.text
        },
        tertiary: {
            background: `${theme?.colors?.background}${theme?.transparency?.input ?? 'A5'}`,
            color: theme?.colors?.text
        }, basic:{
            background: `${theme?.colors?.neutral}${theme?.transparency?.input ?? 'A5'}`,
            color: theme?.colors?.text
        }, transparent: {
            background: 'transparent',
            color: theme?.colors?.text
        }
    }
    if(multiline) {
        return (
            <textarea value={value} aria-label={label} defaultValue={defaultValue} name={name} maxLength={maxLength} required={required} className={`${className ?? ''} appearance-none`} placeholder={placeholder} style={{...variantStyles[variant ?? 'basic'], ...style}} onChange={onChange} onKeyDown={onKeyDown}/>
        )
    }
    return (
        <input aria-label={label} max={max} min={min} defaultValue={defaultValue} value={value} name={name} maxLength={maxLength} type={type} required={required} className={`${className ?? ''}`} placeholder={placeholder} style={{...variantStyles[variant ?? 'basic'], ...style}} onChange={onChange} onKeyDown={onKeyDown}/>
    )
}