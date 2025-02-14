import Button from "./Button";
import { IoMdAdd } from "react-icons/io";
import Modal from './Modal'
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import InputBox from './InputBox'
import axios from "axios";

interface AddContentModalInterface{
    open: boolean,
    setOpen: (value: boolean) => void
}

interface formDataInterface {
    type: "twitter" | "youtube" | "document" | "link",
    title: string,
    link: string,
    tags: string[]
}

export default function AddContentModal({
    open,
    setOpen,
}: AddContentModalInterface){
    const [formData, setFormData] = useState<formDataInterface>({
        type: 'twitter',
        title: '',
        link: '',
        tags: []
    })
    let timeout: any;
    const URL = "http://localhost:6001/api/v1/content"

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
            // console.log([e.target.name], e.target.value)
        }, 250)
    };

    const handleAddTag = () => {
        // @ts-ignore
        let value  = document.getElementById('tag-input').value.trim()
        // @ts-ignore
        document.getElementById('tag-input').value = ""
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
    }

    const handleAddContent = () => {
        const token = localStorage.getItem("token")
        if (formData.type === "twitter" && !(formData.link.includes("x.com") || formData.link.includes("twitter.com"))){
            alert("Not a valid Twitter Link")
        }
        else if (formData.type === "youtube" && !(formData.link.includes("youtu.be") || formData.link.includes("youtube.com"))){
            alert("Not a valid YouTube Link")
        }
        if (!token){
            console.log("You are not authorized")
        }
        console.log({
            "type": formData.type,
            "title": formData.title,
            "link": formData.link,
            "tags": formData.tags
        })
        axios.post(URL, {
            "type": formData.type,
            "title": formData.title,
            "link": formData.link,
            "tags": formData.tags
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            if (res.data.success){
                // alert("Successfully added new content")
                setOpen(false)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    return(
        <Modal title="Add Content to your Brain" open={open} setOpen={setOpen} >
            <div className="flex flex-col m-1 my-5 gap-4">
                <select name="type" id="type"
                className="w-full h-10 p-2 text-base border-1 appearance-none border-gray-500 rounded-md"
                onChange={handleInputChange}  >
                    <option value="twitter">Twitter</option>
                    <option value="youtube">YouTube</option>
                    <option value="document">Document</option>
                    <option value="link">Link</option>
                </select>
                <InputBox title="Enter the title" name="title" maxLength={50} onChange={handleInputChange} />
                <InputBox title="Enter your Link" name="link" maxLength={100} onChange={handleInputChange} />                  
                <div className="flex justify-between gap-3">
                    <InputBox title="Enter a tag" id="tag-input" maxLength={50} onKeyDown={() => {

                    }} />                            
                    <Button variant="secondary" size="sm" text="" startIcon={<IoMdAdd />} onClick={handleAddTag} />
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
                <Button variant="primary" size="sm" text="Submit" onClick={handleAddContent} />
            </div>
        </Modal>
    )
}

interface tagProps {
    title: string,
    onClick: () => void
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