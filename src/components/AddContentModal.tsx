import Button from "./Button";
import { IoMdAdd } from "react-icons/io";
import Modal from './Modal'
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface AddContentModalInterface{
    open: boolean,
    setOpen: (value: boolean) => void
}

interface InputBoxPropsInterface {
    title: string,
    maxLength: number,
    id?: string,
    required? : boolean,
    onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void
}

interface tagProps {
    title: string,
    onClick: () => void
}

export default function AddContentModal({
    open,
    setOpen,
}: AddContentModalInterface){
    interface formDataInterface {
        type: string,
        title: string,
        link: string,
        tags: string[]
    }
    const [formData, setFormData] = useState<formDataInterface>({
        type: '',
        title: '',
        link: '',
        tags: []
    })
    // let timeout: any;

    return(
        <Modal title="Add Content to your Brain" open={open} setOpen={setOpen} >
            <div className="flex flex-col m-1 my-5 gap-4">
                <select name="type" id="type" className="w-full h-10 p-2 text-base border-1 border-gray-500 rounded-md" >
                    <option value="Twitter">Twitter</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Document">Document</option>
                    <option value="Link">Link</option>
                </select>
                <InputBox title="Enter the title" maxLength={50} onChange={() => {

                }} />
                <InputBox title="Enter your Link" maxLength={50} onChange={() => {
                    
                }} />                  
                <div className="flex justify-between gap-3">
                    <InputBox title="Enter a tag" id="tag-input" maxLength={50} />                            
                    <Button variant="secondary" size="sm" text="" startIcon={<IoMdAdd />} onClick={() => {
                    // @ts-ignore
                    let value  = document.getElementById('tag-input').value
                    if (value.length === 0){
                        alert("Can not add empty tag")
                        return
                    }
                    if( formData.tags.includes(value) ){
                        alert("Can't add the same tag twice")
                        return
                    }
                    if ( value.includes(" ")){
                        alert("A tag can not have spaces in between")
                        return
                    }
                    setFormData({
                        ...formData,
                        tags: [...formData.tags, value]
                    })
                    // @ts-ignore
                    document.getElementById('tag-input').value = ""
                }} />
                </div>
                <div className="flex gap-2 flex-wrap ">
                    {
                        formData.tags.map((title) => {
                            return (
                                <div key={title}>
                                    <Tag title={title} onClick={() => {
                                        setFormData({
                                                ...formData,
                                                tags: [...formData.tags.filter((tag) => tag !== title)]
                                        })
                                    }} />
                                </div>
                            )
                        })
                    }
                </div>
                <Button variant="primary" size="sm" text="Submit" onClick={() => {
                    
                }} />
            </div>
        </Modal>
    )
}

function InputBox({
    title,
    maxLength,
    id,
    onChange,
    required
}: InputBoxPropsInterface){
    return (
        <input id={id} autoComplete="off" placeholder={title} required={required ? true : false} className="w-full h-10 p-2 text-base border-1 border-gray-500 rounded-md" maxLength={maxLength} onChange={onChange} />
    )
}

export function Tag({
    title,
    onClick
} : tagProps){
    return (
        <div className="bg-purple-200 text-sm text-purple-600 px-3 py-1 w-fit rounded-xl font-light flex items-center gap-1">
            <div>#{title}</div>
            <IoCloseOutline className="cursor-pointer font-bold hover:text-black " onClick={onClick} />
        </div>
    )
}