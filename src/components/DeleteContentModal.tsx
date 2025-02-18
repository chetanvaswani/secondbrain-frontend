import Modal from "./Modal";
import Button from "./Button";
import axios from "axios";
import { useRef, useState } from "react";

interface DeleteContentModalInterface {
    open: boolean,
    setOpen: (value: boolean) => void,
    id: number,
    setReloadContent: (agr: boolean) => void,
}

export default function DeleteContentModal({
    open,
    setOpen,
    id,
    setReloadContent
}:DeleteContentModalInterface){
    const DELETE_URL = "http://localhost:6001/api/v1/content/";
    const [disabled, setDisabled] = useState(false);
    const alerDivtRef= useRef<HTMLInputElement | null>(null);

    const handleDelete = () => {
        setDisabled(true)
        if (alerDivtRef.current){
            alerDivtRef.current.innerText = "Deleting the following content..."
        }
        const token = localStorage.getItem("token")

        axios.delete(DELETE_URL + id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            if(res.data.success){
                if (alerDivtRef.current){
                    alerDivtRef.current.innerText = "Success."
                }
                console.log(res)
                setReloadContent(true)
                setTimeout(() => {
                    setOpen(false)
                    setDisabled(false)
                    alerDivtRef.current ? alerDivtRef.current.innerText = "" : false
                }, 1000)
            }
        }).catch((err) => {
            if (alerDivtRef.current){
                alerDivtRef.current.innerText = "Some error occured while deleting the content. Please try again."
            }
            console.log(err)
            setDisabled(false)
        })
    }

    return (
        <Modal open={open} setOpen={setOpen} title="Are you sure you want to delete this content?" >
            <div className="flex w-full flex-col justify-center items-center gap-3 mt-4">
                <div className="text-center text-gray-400 text-sm" ref={alerDivtRef}> </div>
                <div className="w-full flex justify-center gap-3">
                    <div className="w-[40%] flex flex-col">
                        <Button text="Yes" variant="primary" size="md" onClick={handleDelete} disabled={disabled} />
                    </div>
                    <div className="w-[40%] flex flex-col">
                        <Button text="No" variant="secondary" size="md" disabled={disabled} onClick={() => {
                            setOpen(false)
                        }}/>
                    </div>
                </div>
            </div>
        </Modal>
    )
}