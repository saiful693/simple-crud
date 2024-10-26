"use client"
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    const session = useSession()
    return (
        <div className='border-b border-spacing-1'>
            <div className="navbar container mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                    </div>
                    <Link href='/' className="btn btn-ghost text-xl">Simple-Crud</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                </div>
                <div className="navbar-end space-x-2">
                    <Link href={'/signup'} className='btn px-4'>SignUp</Link>
                    {!session.data ?
                        <Link href={'/login'} className='btn px-4'>Login</Link>
                        :
                        <button onClick={() => signOut()}>Logout</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;