'use client';

import Link from 'next/link';
import React from 'react';
import Button from './styleComponents/Button';
import { useUser } from '@auth0/nextjs-auth0/client';

const HeroButtons = () => {
    const {isLoading, user} = useUser();
    return (
        <div className="w-full flex items-center justify-start px-4 gap-2">{!isLoading && user ? <Link href='/tasks'><Button className="rounded">Your Tasks</Button></Link> : <Link href='/api/auth/login'><Button className='rounded'>Login</Button></Link>}<Link href='/theme/settings'><Button variant="secondary" className="rounded">Customize My Look</Button></Link></div>
    );
};

export default HeroButtons;