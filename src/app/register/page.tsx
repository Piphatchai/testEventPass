'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function Register() {

    type LoginData = {
        email: string
        password: string
    }
    const router = useRouter()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')


    const checkRegister = async () => {
        if (email === '' && password === '') {
            Swal.fire({
                title: "Please enter the code.",
                text: "",
                icon: "error"
            });
        } else {
            let obj = {
                email: email,
                password: password
            }
            await sendRegister(obj)
        }
    }

    const sendRegister = async (obj: LoginData) => {

        try {

            const res = await fetch('https://reqres.in/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            })

            let data = await res.json()

            if (!data.error) {
                Swal.fire({
                    title: "Successfully applied",
                    text: "",
                    icon: "success"
                });
                router.push('/');
            } else {
                Swal.fire({
                    title: `${data.error}`,
                    text: '',
                    icon: "error"
                });
            }
        } catch (error) {
        }
    }

    return (
        <div className='h-screen bg-gray-100 flex justify-center items-center'>
            <div className='w-96 border shadow-md bg-white rounded-md px-4 pb-10'>
                <div className='font-bold text-3xl text-center pt-3 mt-5'>Register</div>
                <div className='mt-4 font-semibold '>Username :</div>
                <div className='relative'>
                    <input type="text"
                        className='border w-full mt-3 py-1 focus:outline-none px-3 transition duration-300 hover:border-green-500  rounded-lg'
                        onChange={(e) => { setEmail(e.target.value) }}

                    />
                    <svg className="h-6 w-6 absolute top-4 right-3 "
                        width="24" height="24" viewBox="0 0 24 24"
                        strokeWidth="2" stroke="currentColor" fill="none"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="7" r="4" />  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                </div>
                <div className='mt-3 font-semibold '>Password :</div>
                <div className='relative'>
                    <input type="password"
                        className='border w-full mt-3 py-1 focus:outline-none px-3 transition duration-300 hover:border-green-500 rounded-lg'
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <svg className="h-6 w-6 absolute top-4 right-3" width="24" height="24" viewBox="0 0 24 24"
                        strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />  <rect x="3" y="4" width="18" height="8" rx="3" />
                        <rect x="3" y="12" width="18" height="8" rx="3" />  <line x1="7" y1="8" x2="7" y2="8.01" />  <line x1="7" y1="16" x2="7" y2="16.01" /></svg>
                </div>
                <div className='flex justify-center items-center mt-10' >
                    <span className='bg-blue-500 px-14 py-1 rounded-full text-white cursor-pointer transition duration-300 hover:bg-green-500' onClick={checkRegister}>Register</span>
                </div>
                <Link href='/'><div className='text-end text-blue-500 mt-5 underline'>
                    Back
                </div></Link>



            </div>
        </div>
    )
}