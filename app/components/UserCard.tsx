import { UserProfile } from "@auth0/nextjs-auth0/client";
import Button from "./styleComponents/Button";
import Box from "./styleComponents/Box";
import React from "react";
import Link from "next/link";

export default function UserCard({ user }: { user: UserProfile }) {
    const [isOpen, setOpen] = React.useState(false);

    React.useEffect(() => {
        if(!isOpen) {
            return;
        }
        document.body.addEventListener('click', (event) => {
            if(!(event.target as HTMLElement).closest('#user-card')) {
                setOpen(false);
            }
        })
        return (
            () => document.body.removeEventListener('click', (event) => {
                if(!(event.target as HTMLElement).closest('#user-card')) {
                    setOpen(false);
                }
            })
        )
    }, [isOpen])
    return (
        <div className="relative">
            <Button variant="tertiary" isActive={isOpen} className="flex items-center gap-2" onClick={() => {setOpen(open => !open)}}>{user.picture && <img src={user.picture} alt={user.name ?? ''} className="w-8 h-8 rounded-full" />} <span>{user.name}</span></Button>
            {isOpen && <Box id='user-card' className="flex flex-col items-center gap-2 md:gap-4 p-2 absolute top-full left-1/2 -translate-x-1/2 mt-3 rounded-md z-30">
                <img src={user.picture ?? undefined} alt={user.name ?? ''} className="w-20 h-20 rounded-full" />
                <span>{user.email}</span>
                <Link href='/design/settings' className="w-full"><Button variant="primary" className="flex items-center justify-center w-full hover:scale-95">Alter Theme</Button></Link>
                <Link href='/api/auth/logout' className="w-full"><Button variant="secondary" className="flex items-center justify-center w-full hover:scale-95">Logout</Button></Link>
            </Box>}
        </div>
    )
}