'use client'

import Image from 'next/image';
import {signOut} from 'next-auth/react';
import Link from 'next/link';
import { type } from 'os';

type User = {
    image: string
}

export default function Logged({image}: User) {
    return (
        <li className='flex gap-8 items-center'>
            <button onClick={() => signOut()} className="text-sm bg-slate-500 text-white py-3 px-6 rounded-xl">
                Sign Out
            </button>
            <Link href={'/dashboard'}>
                <Image 
                width={64}
                height={64}
                className='w-12 rounded-full'
                src={image}
                alt=''
                priority />
            </Link>
        </li>
    )
}