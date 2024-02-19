import { UserProfile } from "@auth0/nextjs-auth0/client";
import Button from "./styleComponents/Button";
import Box from "./styleComponents/Box";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserCard({ user }: { user: UserProfile }) {
    const [isOpen, setOpen] = React.useState(false);

    const currentPath = usePathname();

    React.useEffect(() => {
        setOpen(false);
    }, [currentPath])

    React.useEffect(() => {
        if(!isOpen) {
            return;
        }
        const closeUserCard = (event: MouseEvent) => {
            if(!(event.target as HTMLElement).closest('#user-card')) {
                event.stopPropagation();
                setOpen(false);
            }
        }
        document.body.addEventListener('click', closeUserCard)
        return (
            () => document.body.removeEventListener('click', closeUserCard)
        )
    }, [isOpen])
    return (
        <div className="relative">
            <Button variant="tertiary" isActive={isOpen} className="hidden md:flex justify-center w-full items-center gap-2" onClick={() => {setOpen(true)}}>{user.picture && <img src={user.picture} alt={user.name ?? ''} className="w-8 h-8 rounded-full" />} <span className="hidden md:inline">{user.name}</span></Button>
            <Box id='user-card' className={`w-full md:w-auto flex-col items-center gap-2 md:gap-4 p-2 md:absolute top-full left-1/2 md:-translate-x-1/2 mt-3 rounded-md z-30 ${isOpen ? "flex" : "flex md:hidden"}`}>
                <img src={user.picture ?? undefined} alt={user.name ?? ''} className="w-20 h-20 rounded-full" />
                <span>{user.name}</span>
                <span>{user.email}</span>
                <Link href='/design/settings' className="w-full"><Button variant="primary" className="flex items-center justify-center w-full hover:scale-95 active:scale-95">Change Theme</Button></Link>
                <Link href='/api/auth/logout' className="w-full"><Button variant="secondary" className="flex items-center justify-center w-full hover:scale-95 active:scale-95">Logout</Button></Link>
            </Box>
        </div>
    )
}