import Modal from './Modal';
import Button from './Button';
import { LuCopy } from "react-icons/lu";
import axios from 'axios';
import { useRef, useState } from 'react';
import { IoCopyOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";

interface ShareContentModalInterface{
    open: boolean,
    setOpen: (value: boolean) => void,
    length: number
}

export default function ShareContentModal({
    open, 
    setOpen,
    length
}: ShareContentModalInterface){
    const URL = 'http://localhost:6001/api/v1/brain/share';
    const alerDivtRef= useRef<HTMLInputElement | null>(null);
    const [link, setLink] = useState<string | null>(null);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [copied, setCopied] = useState(false)

    const handleShareContent = () => {
        setDisabled(true)
        const token = localStorage.getItem("token");
        alerDivtRef.current ? alerDivtRef.current.innerText = "Requesting for you share link" : false
        axios.post(URL, {
            share: true
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if(res.data.success){
                // if(alerDivtRef.current){
                //     alerDivtRef.current.innerText = "Copied share link to your clipboard."
                //     setTimeout(() => {
                //         if (alerDivtRef.current){
                //             alerDivtRef.current.innerText = ""
                //         }
                //         setOpen(false)
                //     }, 2000)
                // }
                // navigator.clipboard.writeText(`${window.location.href}/api/v1/brain/${res.data.data.link}`);
                alerDivtRef.current ? alerDivtRef.current.innerText = "" : false
                setLink(`${window.location.href}seeBrain/${res.data.data.link}`)
            }
        }).catch(() => {
            if(alerDivtRef.current){
                alerDivtRef.current.innerText = "Some error occured. Please try again."
                setDisabled(false)
                setTimeout(() => {
                    if (alerDivtRef.current){
                        alerDivtRef.current.innerText = ""
                    }
                }, 1500)
            }
        })
    }

    return (
        <Modal open={open} setOpen={setOpen} title='Share Your Second Brain' >
            <div className='p-2 w-full flex flex-col gap-2'>
                <p className='mt-5 text-gray-500 mb-3'>
                    Share your entire collection of notes, documents, tweets, and videos with others. They'll be able to import your content into their own Second Brain.
                </p>
                <div className="text-center text-gray-400 text-sm" ref={alerDivtRef} > </div>
                {
                    link ?
                    <div className='w-full bg-gray-200 p-3 flex justify-between items-center rounded-md gap-2'>
                        <div className='overflow-x-auto no-scrollbar w-full'>
                            {link}
                        </div>
                        {
                            copied ?
                            <TiTick className='text-gray-500 size-6 cursor-pointer' />
                            :
                            <IoCopyOutline className='text-gray-500 size-6 cursor-pointer' onClick={() => {
                                setCopied(true);
                                navigator.clipboard.writeText(link);
                                alerDivtRef.current ? alerDivtRef.current.innerText = "Copied share link to your clipboard" : false
                                setTimeout(() => {
                                    alerDivtRef.current ? alerDivtRef.current.innerText = "" : false
                                    setCopied(false)
                                }, 3000)
                            }} />
                        }
                    </div>  
                    : <Button disabled={disabled} variant='primary' text='Share Brain' size="lg" startIcon={<LuCopy />} onClick={handleShareContent} />
                }
                <p className='text-gray-400 text-center'>{length} items will be shared</p>
            </div>
        </Modal>
    )
}