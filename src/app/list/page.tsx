'use client'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter, useSearchParams, } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import Error404 from '../components/error404';
import { List, dataEditSendApi } from '../../../types/list';


export default function List() {


    const [dataList, setDataList] = useState<List[]>([])
    const [editFunction, setEditFunction] = useState<number | undefined>()
    const [dataEdit, setDataEdit] = useState({} as List)
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [myName, setMyName] = useState<string>('')
    const [myJob, setMyJob] = useState<string>('')
    const [checkToken, setcheckToken] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)




    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {

        try {
            const checkToken = localStorage.getItem('token');
            if (!checkToken) {
                setcheckToken(true)
            } else {
                const res = await fetch('https://reqres.in/api/users?page=2')
                let data = await res.json()
                setDataList(data.data)
                setLoading(true)
            }

        }
        catch (error) {
            throw (error)
        }
    }


    const edit = async (index: number, item: List) => {
        setEditFunction(index)
        setDataEdit(item)
    }

    const checkEditSend = async () => {
        if (myName !== '' && myJob !== '') {
            let obj: dataEditSendApi = {
                name: myName,
                job: myJob,
                id: dataEdit.id
            }
            await sendUpdate(obj)
        } else {
            Swal.fire({
                title: "Please enter the code.",
                text: "",
                icon: "error"
            });
        }
    }

    const sendUpdate = async (obj: dataEditSendApi) => {
        try {
            const res = await fetch(`https://reqres.in/api/users/${obj.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify(obj)
            })

            const data = await res.json()

            if (!data.error) {
                Swal.fire({
                    title: "Successfully",
                    html: `ID: ${data.id}<br> <br> name: ${data.name}<br> <br>Job: ${data.job} <br> <br> Time : ${data.updatedAt}`,
                    icon: "success"
                });
                setShowEdit(false)
                setEditFunction(undefined)
                setMyName('')
                setMyJob('')
            } else {
                Swal.fire({
                    title: `${data.error}`,
                    text: "",
                    icon: "error"
                });
            }

        } catch (error) {
            throw (error)
        }

    }

    const openShowEdit = () => {
        setShowEdit(!showEdit)
        setEditFunction(undefined)
    }

    const deleteSend = async (index: number) => {

        // เหมือนว่า server ไม่ให้ลบข้อมูลรึเปล่าครับ เพราะลองส่งแบบ url และ ลองส่ง แบบ body ก็ไม่ได้ทั้งคู่ 
        

        try {
            const res = await fetch(`https://reqres.in/api/users/${index}`, {
                method: 'DELETE',
                // mode: 'no-cors',
                // credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                },
                // body: JSON.stringify(index)
            });

            const data = await res.json()
            if (!data.error) {
                Swal.fire({
                    title: "Successfully",
                    html: ``,
                    icon: "success"
                });
                setShowEdit(false)
            } else {
               
            }

        } catch (error) {
            Swal.fire({
                title: ``,
                text: `เหมือนว่า server ไม่ให้ลบข้อมูลรึเปล่าครับ เพราะลองส่งแบบ url และ ลองส่ง แบบ body ก็ไม่ได้ทั้งคู่`,
                icon: "error"
            });
            throw (error)

        }
    }

    const refOne: any = useRef(null);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [refOne]);

    const handleClickOutside = (e: any) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
            setEditFunction(undefined)
        }
    };

    if (checkToken) return <Error404 />
    if (!loading) return <></>

    return (

        <div className='w-full'>
            <div className='max-w-[1440px] mx-auto relative px-4'>
                <div className='text-center font-bold text-3xl mt-20 '>Hello ReqRes users!</div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 relative'>
                    {dataList.map((item: List, index: number) => (
                        <div className='border shadow-md rounded-md pb-10 relative h-[22rem] transition duration-300 hover:border-black hover:shadow-inner hover:border-2 ' key={index}
                        >
                            <div className='flex flex-col items-center'>
                                <div className='mt-3 font-bold'>{item.first_name}</div>
                                <div className='mt-3'>{item.email}</div>
                                <div className='mt-3'>
                                    <Image
                                        src={item.avatar}
                                        alt="Picture of the author"
                                        width={200}
                                        height={0}
                                        className='rounded-full  h-[200px] object-cover'
                                    />
                                </div>
                            </div>
                            <div className='cursor-pointer' onClick={() => edit(index, item)}>
                                <svg className="h-5 w-5 absolute top-2 right-2 transition duration-300 hover:text-blue-500 stroke-2" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 
                                0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 
                                2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 
                                9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0
                                 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 
                                 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg></div>

                            {editFunction === index && (<div className='flex justify-between px-4 mt-5' ref={refOne}>
                                <div className=''><span className='bg-green-600 px-5 py-1 text-white rounded-full cursor-pointer' onClick={() => { setShowEdit(true) }}>Edit</span></div>
                                <div className=''><span className='bg-red-600 px-5 py-1 text-white rounded-full cursor-pointer' onClick={() => { deleteSend(item.id) }}>Delete</span></div>
                            </div>)}
                        </div>
                    ))}

                    <div className='mt-5 absolute bottom-0 right-0 font-bold cursor-pointer transition duration-300 hover:text-red-500'>
                        <Link href='/'>Logout</Link></div>
                </div>


            </div>
            {showEdit && (
                <div className='w-full z-10 flex justify-center items-center h-screen backdrop-blur-sm  bg-black bg-opacity-50 absolute top-0'>
                    <div className='z-20 border w-96 rounded-lg bg-white  px-4 pb-10 relative'>
                        <div className='text-center  text-xl font-semibold pt-5'>ID : {dataEdit?.id}</div>
                        <div className='mt-5'>Username : {dataEdit?.first_name} </div>
                        <input type="text"
                            className='border w-full mt-3 py-1 focus:outline-none px-3 rounded-md transition duration-300  hover:border-blue-500'
                            onChange={(e) => { setMyName(e.target.value) }}

                        />
                        <div className='mt-5'>Job : </div>
                        <input type="text"
                            className='border w-full mt-3 py-1 focus:outline-none px-3 rounded-md transition duration-300 hover:border-blue-500'
                            onChange={(e) => { setMyJob(e.target.value) }}
                        />
                        <div className='flex justify-center items-center mt-10'><span className='bg-green-600 text-white px-10 rounded-full py-2 cursor-pointer transition duration-300 hover:bg-blue-500' onClick={checkEditSend}>Send</span></div>
                        <div className='top-0 absolute right-0 px-2 cursor-pointer text-2xl' onClick={openShowEdit}>x</div>
                    </div>
                </div>
            )}

        </div>
    )
}