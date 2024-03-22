'use client';

import { Dispatch, SetStateAction, createContext, useEffect, useMemo, useState } from "react";
import { Theme } from "./mongo/Model/themeModel";
import { ThemeProvider, createTheme } from "@mui/material";

export const themes: Record<string, Theme> = {
    lightBlue: {
        colors : {
            background: "#C1C8E4",
            primary: "#5680E9",
            secondary: "#59EBCB",
            text: "#000000",
            textMuted: "#64748B",
            textEmphasis: "#235be8",
            neutral: "#F5F5F5",
            success: "#2FAD79",
            danger: "#E44A65",
            warning: "#FFA900"
        }, transparency: {
            box: "65",
            input: '33'
        }
    }, darkPurple: {
        colors : {
            background: "#150312",
            primary: "#8530d1",
            secondary: "#A38401",
            text: "#FFFFFF",
            textMuted: "#a9bad1",
            textEmphasis: "#ca69f0",
            neutral: "#2C0735",
            success: "#2FAD79",
            danger: "#E44A65",
            warning: "#FFA900"
        }
    }
}

export const StyleContext = createContext<[Theme | null, Dispatch<SetStateAction<Theme>> | null]>([null, null]);

export default function StyleProvider({ children, themeName, theme, getThemeAction } : { children: React.ReactNode | React.ReactNode[], themeName?: keyof typeof themes, theme?: Theme, getThemeAction?: () => Promise<Theme | null> }) {
    const [currentTheme, setTheme] = useState<Theme>(theme ?? themes[themeName ?? 'lightBlue']);
    useEffect(() => {
        if(getThemeAction) {
            getThemeAction().then((res) => {
               if(res) {
                setTheme(res);
               }
            })
        }
    }, [])
    const muiTheme = useMemo(() => createTheme({
        palette: {
            primary: {
                main: currentTheme.colors.primary
            }, secondary: {
                main: currentTheme.colors.secondary
            }, background: {
                default: currentTheme.colors.background
            }, text: {
                primary: currentTheme.colors.text
            }, warning: {
                main: currentTheme.colors.warning
            }, success: {
                main: currentTheme.colors.success
            }, error: {
                main: currentTheme.colors.danger
            }, info: {
                main: currentTheme.colors.textEmphasis
            }
        }}), [currentTheme])
    return (
        <StyleContext.Provider value={[currentTheme, setTheme]}>
            <ThemeProvider theme={muiTheme}>
                {children}
            </ThemeProvider>
        </StyleContext.Provider>
    )
}