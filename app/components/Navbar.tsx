'use client';

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Button from "./styleComponents/Button";
import Box from "./styleComponents/Box";
import UserCard from "./UserCard";

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

    const currentPath = usePathname();

    const navDestinations = [{
        title: 'Home',
        href: '/',
    }, {
        title: 'Tasks',
        href: '/tasks',
    }, {
        title: 'New Task',
        href: '/tasks/new',
    
    }]
    if (isLoading) {
        return (
            <header className="mt-5 w-4/5 sticky top-2 m-auto z-20"><Box className="p-2 py-1 bg-primary/20 rounded-md shadow-md">
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
            <header className="mt-5 w-4/5 sticky top-2 m-auto z-20"><Box className="p-2 py-1 bg-primary/20 rounded-md shadow-md">
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
        <header className="mt-5 w-4/5 sticky top-2 m-auto z-20"><Box className="p-2 py-1 bg-primary/20 rounded-md shadow-md">
            <nav className="min-h-10 flex items-stretch">
                <Link href='/' className="px-4 flex items-center gap-2">
                    <img className="w-10 h-10 rounded-full" src="/next.svg" alt="TasKey" />
                    <h1 className="text-xl font-bold">TasKey</h1>
                </Link>
                <div className="w-full flex justify-between px-8">
                    {isLoggedIn && <div className="w-1/2 flex items-stretch justify-stretch">
                        {navDestinations.map(({href, title}, index) => <Button key={index} variant={currentPath === href ? "tertiary-active" : "tertiary"} className="w-full justify-center items-center"><Link href={href}>{title}</Link></Button>)}
                    </div>}
                    <div className="flex w-full items-stretch justify-end gap-4">
                        {isLoggedIn && <UserCard user={user}/>}
                        {!isLoggedIn && <Link href='/api/auth/login' className="flex items-stretch">
                            <Button variant="secondary" className="hover:scale-95">Login</Button>
                        </Link>}
                    </div>
                </div>
            </nav>
        </Box></header>
    )
}