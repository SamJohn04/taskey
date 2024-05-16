'use client';

import { StyleContext } from "@/app/StyleContext";
import Box from "@/app/components/styleComponents/Box";
import Button from "@/app/components/styleComponents/Button";
import Input from "@/app/components/styleComponents/Input";
import { createTheme } from "@/app/mongo/Controller/themeController";
import { Theme } from "@/app/mongo/Model/themeModel";
import { Check } from "@mui/icons-material";
import { Alert } from "@mui/material";
import { useContext, useEffect, useState } from "react";

function opacityToHex(opacity: string) {
    return Math.round((parseInt(opacity) / 100) * 255).toString(16).toUpperCase();
}

function opacityToRange(opacity?: string) {
    return opacity ? Math.round((parseInt(opacity, 16) / 255) * 100).toString() : 'FF';
}

export default function DesignSettings() {
    const [theme, setTheme] = useContext(StyleContext);
    const [loading, setLoading] = useState(false);
    const [originalTheme, setOriginalTheme] = useState<Theme | null>(null);
    const [showThemeSaved, setShowThemeSaved] = useState(false);
    useEffect(() => {
        if(!originalTheme) {
            setOriginalTheme(theme);
        }
        return () => {
            if(originalTheme && setTheme)
                setTheme(originalTheme);
        }
    }, []);

    const handleSaveTheme = async () => {
        setOriginalTheme(theme);
        setLoading(true);
        if(theme) {
            const res = await createTheme(theme);
            if(res.success) {
                setShowThemeSaved(true);
                setTimeout(() => {
                    setShowThemeSaved(false);
                }, 5000)
            
            }
        }
        setLoading(false);
    }
    if(!theme) {
        return <div>Loading...</div>
    }
    return (
        <main className="mt-20 mb-10 flex justify-center items-start">
            <Box className="p-6 py-12 md:p-12 flex flex-col gap-8 w-[95vw] max-w-5xl">
                <h2 className="text-xl">Colors</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center">
                    <span>Neutral</span>
                    <Input label="Neutral Color" type="color" className="" value={theme?.colors?.neutral} onChange={(e) => setTheme && setTheme({...theme, colors: {...theme.colors, neutral: e.target.value}})} />
                    <span>Primary</span>
                    <Input label="Primary Color" type="color" className="" value={theme?.colors?.primary} onChange={(e) => setTheme && setTheme({...theme, colors: {...theme.colors, primary: e.target.value}})} />
                    <span>Secondary</span>
                    <Input label="Secondary Color" type="color" className="" value={theme?.colors?.secondary} onChange={(e) => setTheme && setTheme({...theme, colors: {...theme.colors, secondary: e.target.value}})} />
                    <div className="col-span-2"/>
                    <span>Text</span>
                    <Input label="Text Color" type="color" className="" value={theme?.colors?.text} onChange={(e) => setTheme && setTheme({...theme, colors: {...theme.colors, text: e.target.value}})} />
                    <span>Emphasised Text</span>
                    <Input label="Emphasised Text Color" type="color" className="" value={theme?.colors?.textEmphasis} onChange={(e) => setTheme && setTheme({...theme, colors: {...theme.colors, textEmphasis: e.target.value}})} />
                    <span>Muted Text</span>
                    <Input label="Muted Text Color" type="color" className="" value={theme?.colors?.textMuted} onChange={(e) => setTheme && setTheme({...theme, colors: {...theme.colors, textMuted: e.target.value}})} />
                </div>
                <hr/>
                <h2 className="text-xl">Opacity</h2>
                <div className="grid grid-cols-4 gap-4">
                    <span>Box</span><input aria-label="Box Opacity" type="range" className="col-span-3 w-full" min={"0"} defaultValue={opacityToRange(theme?.transparency?.box)} onChange={(e) => setTheme && setTheme({...theme, transparency: {...theme.transparency, box: opacityToHex(e.target.value)}})} />
                    <span>Input</span><input aira-label="Input Opacity" type="range" className="col-span-3 w-full" defaultValue={opacityToRange(theme?.transparency?.input)} onChange={(e) => setTheme && setTheme({...theme, transparency: {...theme.transparency, input: opacityToHex(e.target.value)}})} />
                </div>
                <hr/>
                <h2 className="text-xl">Background</h2>
                <div className="grid md:grid-cols-4 gap-4">
                    <span>Background Color</span><Input label="Background Color" type="color" className="col-span-3 w-full rounded-sm" value={theme?.colors?.background ?? '#FFF'} onChange={(e) => setTheme && setTheme({...theme, colors: {...theme.colors, background: e.target.value}})} />
                    <span>Background Image</span><Input label="Background Image" type="url" className="col-span-3 w-full p-2 rounded-sm" value={theme?.background?.body ?? ''} onChange={(e) => setTheme && setTheme({...theme, background: {...theme.background, body: e.target.value}})} />
                </div>
                <hr/>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center">
                    <Button variant="primary" className="hover:scale-95 active:scale-95 justify-center items-center">Primary</Button>
                    <Button variant="secondary" className="hover:scale-95 active:scale-95 justify-center items-center">Secondary</Button>
                    <Button variant="tertiary" className="hover:scale-95 active:scale-95 justify-center items-center">Tertiary</Button>
                    <Button variant="tertiary-active" className="hover:scale-95 active:scale-95 justify-center items-center">Active</Button>
                </div>
                <Button onClick={handleSaveTheme} className="justify-center hover:scale-95 active:scale-95 rounded" disabled={loading}>Save Theme</Button>
                <Alert className={`absolute bottom-2 w-[50vw] ${showThemeSaved ? '' : 'hidden'}`} icon={<Check fontSize="inherit" />} severity="success">
                    Theme Saved!
                </Alert>
            </Box>
        </main>
    )
}