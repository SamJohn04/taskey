'use client';

import { CSSProperties, ReactNode, useContext } from "react";
import { StyleContext } from "../../StyleContext";

export default function Body({ children, className, style } : { children: ReactNode | ReactNode[], className: string, style?: CSSProperties }) {
    const [theme, ] = useContext(StyleContext);

    return (
        <body className={className} style={{color: theme?.colors?.text, backgroundImage: theme?.background?.body && `url(${theme?.background?.body})`, backgroundColor: theme?.colors?.background, backgroundSize: 'cover', backgroundAttachment: 'fixed', ...style}}>
            { children }
        </body>
    )
}