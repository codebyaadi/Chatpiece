'use client'

import { signIn } from 'next-auth/react';

export default function LogIn() {
    return (
        <li className='list-none'>
            <button onClick={() => signIn()} className="text-sm bg-slate-500 text-white py-3 px-6 rounded-xl">
                Sign In
            </button>
        </li>
    )
}