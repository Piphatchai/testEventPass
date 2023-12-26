'use client'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Home() {

  const router = useRouter()


  type LoginData = {
    email: string
    password: string
  }

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }, []);

  const checkLogin = async () => {
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
      await sendLogin(obj)
    }
  }

  const sendLogin = async (obj: LoginData) => {

    try {

      const res = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })

      let data = await res.json()



      if (!data.error) {
        Swal.fire({
          title: "Welclome My List",
          text: "",
          icon: "success"
        });
        localStorage.setItem('token', data.token);
        router.push('/list')


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
    <div className='h-screen bg-blue-300 flex justify-center items-center'>
      <div className='w-96 border shadow-md bg-white rounded-md px-4 pb-10 'style={{ animation: 'fadeIn 1s' }}>
        <div className='font-bold text-3xl text-center pt-3 mt-5'>Login</div>
        <div className='mt-2 font-semibold '>Username :</div>
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
            className='border w-full mt-3 py-1 focus:outline-none px-3 transition duration-300 hover:border-green-500  rounded-lg'
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="h-5 w-5 absolute top-5 right-3"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" /><circle cx="16.5" cy="7.5" r=".5" /></svg>
        </div>
        <div className='flex justify-center items-center mt-10' >
          <span className='bg-blue-500 px-14 py-1 rounded-full text-white cursor-pointer transition duration-300 hover:bg-green-500' onClick={checkLogin}>Login</span>
        </div>
        <div className='text-end text-blue-500 mt-5 underline '>
          <Link href='/register'> Register</Link>
        </div>


      </div>
    </div>
  )
}
