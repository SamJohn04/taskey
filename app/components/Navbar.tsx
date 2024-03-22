'use client';

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Button from "./styleComponents/Button";
import Box from "./styleComponents/Box";
import UserCard from "./UserCard";
import Menu from "./Icons/Menu";
import { motion } from "framer-motion";

// function NavItemsSkeleton() {
//     return (
//         <div className="flex items-center">
//             <div className="w-20 h-10 rounded-md bg-gray-300 animate-pulse"></div>
//         </div>
//     )
// }

export default function Navbar() {
    const { user, error, isLoading } = useUser();
    const isLoggedIn = user !== undefined && !error && !isLoading;

    const [isOpen, setOpen] = React.useState(false);

    const currentPath = usePathname();

    React.useEffect(() => {
        setOpen(false);
    }, [currentPath])

    const navDestinations = [{
        title: 'Home',
        href: '/',
    }, {
        title: 'Tasks',
        href: '/tasks',
    }]
    if (isLoading) {
        return (
            <header className="md:mt-5 w-full md:w-4/5 relative md:sticky md:top-2 m-auto z-20"><Box className="p-2 py-1 bg-primary/20 rounded-md shadow-md">
                <nav className="w-full min-h-10 flex items-stretch">
                    <Link href='/' className="px-4 flex items-center gap-2">
                        <img className="w-10 h-10 rounded-full" src="/next.svg" alt="TasKey" />
                        <h1 className="text-xl font-bold">TasKey</h1>
                    </Link>
                    <div className="w-full flex justify-end px-8">
                        <div className="flex items-stretch gap-4">
                            <div className="flex items-center px-4">
                                <span className="text-sm text-text-muted">Loading...</span>
                            </div>
                        </div>
                    </div>
                </nav>
            </Box></header>
        )
    }

    if (error) {
        return (
            <header className="md:mt-5 w-full md:w-4/5 relative md:sticky md:top-2 m-auto z-20"><Box className="p-2 py-1 bg-primary/20 rounded-md shadow-md">
                <nav className="w-full min-h-10 flex items-stretch">
                    <Link href='/' className="px-4 flex items-center gap-2">
                        <img className="w-10 h-10 rounded-full" src="/next.svg" alt="TasKey" />
                        <h1 className="text-xl font-bold">TasKey</h1>
                    </Link>
                    <div className="w-full flex justify-between px-8">
                        <span className="text-sm text-text-muted">Error: {error.message}</span>
                    </div>
                </nav>
            </Box></header>
        )
    }
    return (
        <header className={`md:mt-5 w-full md:w-4/5 fixed md:sticky top-0 md:top-2 m-auto z-20 ${isOpen ? 'max-md:h-full' : ''}`}><Box className="p-2 py-1 rounded-md shadow-md max-md:h-full">
            <nav className="min-h-10 max-md:h-full flex flex-col md:flex-row items-center md:items-stretch">
                <div className="w-full flex items-center max-md:justify-between md:w-auto relative">
                    <Link href='/' className="px-4 flex items-center gap-2">
                        <img className="w-10 h-10 rounded-full" src="/next.svg" alt="TasKey" />
                        <h1 className="text-xl font-bold">TasKey</h1>
                    </Link>
                    <div className="flex"><div className="md:hidden">
                        {isLoggedIn ? <UserCard user={user}/> : <Link href='/api/auth/login' className="flex items-stretch">
                                <Button variant="secondary" className="hover:scale-95 active:scale-95">Login</Button>
                            </Link>}
                    </div>
                    {isLoggedIn && <Button variant="tertiary" className="md:hidden" onClick={() => setOpen(open => !open)}><Menu /></Button>}</div>
                </div>
                <motion.div initial={{scaleY: '0%'}} whileInView={{scaleY: '100%'}} className={`w-full max-md:h-full text-lg flex-col items-center md:flex-row justify-between px-8 overflow-hidden md:overflow-visible ${isOpen ? 'flex' : 'hidden md:flex'}`}>
                    {isLoggedIn && <ul className="w-1/2 flex flex-col md:flex-row items-stretch justify-stretch">
                        {navDestinations.map(({href, title}) => <li key={title} className="w-full flex justify-center items-center"><Button variant={currentPath === href ? "tertiary-active" : "tertiary"} className="w-full justify-center items-center"><Link href={href}>{title}</Link></Button></li>)}
                    </ul>}
                    <div className="flex md:w-full items-stretch md:justify-end gap-4 max-md:hidden">
                        {isLoggedIn ? <UserCard user={user}/> : <Link href='/api/auth/login' className="flex items-stretch">
                            <Button variant="secondary" className="hover:scale-95 active:scale-95">Login</Button>
                        </Link>}
                    </div>
                </motion.div>
            </nav>
        </Box></header>
    )
}