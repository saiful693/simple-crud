"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import Swal from 'sweetalert2';

const Page = () => {
    const router = useRouter()
    const handleSignup = async (event) => {
        event.preventDefault();
        const newUser = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value,
        };
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/signup/api`, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "content-type": "application/json"
            }
        })
        if (response.status === 200) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Successfully Register Now login",
                showConfirmButton: false,
                timer: 1500
            });
            router.push('/login')
        }
    }
    return (
        <div className="flex justify-center items-center h-screen bg-base-200">
            <div className="w-full max-w-md p-8 space-y-6 shadow-lg bg-white rounded-lg">
                <h2 className="text-2xl font-bold text-center text-primary">Create an Account</h2>
                <form onSubmit={handleSignup} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Full Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Your name"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary w-full">
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className="text-center">
                    Already have an account? <Link href="/login" className="text-primary">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default Page;