import { UserProfile } from "@auth0/nextjs-auth0/client";
import Button from "./styleComponents/Button";
import Box from "./styleComponents/Box";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
            <Button variant="tertiary" isActive={isOpen} className="justify-center w-full items-center gap-2" onClick={() => {setOpen(true)}}><span className="max-md:hidden">{user.name}</span></Button>
            <Box className={`flex-col items-center gap-2 md:gap-4 p-2 absolute top-full max-md:-right-1/2 md:left-1/2 md:-translate-x-1/2 mt-3 rounded-md z-30 ${isOpen ? "flex" : "hidden"}`}>
                <span>{user.name}</span>
                <span>{user.email}</span>
                <Link href='/theme/settings' className="w-full"><Button variant="primary" className="flex items-center justify-center w-full hover:scale-95 active:scale-95">Change Theme</Button></Link>
                <Link href='/api/auth/logout' className="w-full"><Button variant="secondary" className="flex items-center justify-center w-full hover:scale-95 active:scale-95">Logout</Button></Link>
            </Box>
        </div>
    )
}