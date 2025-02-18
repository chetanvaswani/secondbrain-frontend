import Modal from './Modal';
import Button from './Button';
import { LuCopy } from "react-icons/lu";
import axios from 'axios';
import { useRef } from 'react';

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

    const handleShareContent = () => {
        const token = localStorage.getItem("token")

        axios.post(URL, {
            share: true
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if(res.data.success){
                if(alerDivtRef.current){
                    alerDivtRef.current.innerText = "Copied share link to your clipboard."
                    setTimeout(() => {
                        if (alerDivtRef.current){
                            alerDivtRef.current.innerText = ""
                        }
                        setOpen(false)
                    }, 2000)
                }
                navigator.clipboard.writeText(`${window.location.href}/api/v1/brain/${res.data.data.link}`);
            }
        }).catch(() => {
            if(alerDivtRef.current){
                alerDivtRef.current.innerText = "Some error occured. Please try again."
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
                <Button variant='primary' text='Share Brain' size="lg" startIcon={<LuCopy />} onClick={handleShareContent} />
                <p className='text-gray-400 text-center'>{length} items will be shared</p>
            </div>
        </Modal>
    )
}