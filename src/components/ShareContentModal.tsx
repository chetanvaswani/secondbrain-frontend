import Modal from './Modal';
import Button from './Button';
import { LuCopy } from "react-icons/lu";

interface ShareContentModalInterface{
    open: boolean,
    setOpen: (value: boolean) => void
}

export default function ShareContentModal({
    open, 
    setOpen
}: ShareContentModalInterface){
    return (
        <Modal open={open} setOpen={setOpen} title='Share Your Second Brain' >
            <div className='p-2 w-full flex flex-col gap-2'>
                <p className='mt-5 text-gray-500 mb-3'>
                    Share your entire collection of notes, documents, tweets, and videos with others. They'll be able to import your content into their own Second Brain.
                </p>
                <Button variant='primary' text='Share Brain' size="lg" startIcon={<LuCopy />} />
                <p className='text-gray-400 text-center'>5 items will be shared</p>
            </div>
        </Modal>
    )
}