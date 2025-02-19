import Button from "./Button";
import { IoMdAdd } from "react-icons/io";
import Modal from './Modal'
import { useState } from "react";
import { Tag } from "./AddContentModal";
import InputBox from './InputBox'
import axios from "axios";
import { useRef } from "react";
import { cardProps } from "./Card";

interface EditContentModalInterface{
    open: boolean,
    setOpen: (value: boolean) => void,
    card: cardProps
}

interface formDataInterface {
    type: "tweet" | "youtube" | "document" | "link",
    title: string,
    link: string,
    tags: string[]
}

export default function EditContentModal({
    open,
    setOpen,
    card
}: EditContentModalInterface){
    const [formData, setFormData] = useState<formDataInterface>({
        type: card.type,
        title: card.title,
        link: card.link,
        tags: [...card.tags.map((tag) => tag.title)]
    })
    let timeout: any;
    const [disabled, setDisabled] = useState<boolean>(false);
    const [buttonText, setButtonText] = useState("Submit");
    const alerDivtRef= useRef<HTMLInputElement | null>(null);
    const URL = "http://localhost:6001/api/v1/content";

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
            alerDivtRef.current ? alerDivtRef.current.innerText = "Can not add empty tag" : false
            return
        }
        if( formData.tags.includes(value) ){
            alerDivtRef.current ? alerDivtRef.current.innerText = "Can't add the same tag twice" : false
            return
        }
        if ( value.includes(" ")){
            alerDivtRef.current ? alerDivtRef.current.innerText = "A tag can not have spaces in between" : false
            return
        }
        setFormData({
            ...formData,
            tags: [...formData.tags, value]
        })
    }

    const handleEditContent = () => {
        const token = localStorage.getItem("token");
        if (formData.type === "tweet" && !(formData.link.includes("x.com") || formData.link.includes("twitter.com"))){
            alerDivtRef.current ? alerDivtRef.current.innerText = "Not a valid Twitter Link" : false
            return
        }
        else if (formData.type === "youtube" && !(formData.link.includes("youtu.be") || formData.link.includes("youtube.com"))){
            alerDivtRef.current ? alerDivtRef.current.innerText = "Not a valid YouTube Link" : false
            return
        }
        if (!token){
            alerDivtRef.current ? alerDivtRef.current.innerText = "You are not authorized" : false
            return
        }
        setButtonText("Editing your content...");
        setDisabled(true)
        axios.put(URL, {
            "contentId": card.id,
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
                setButtonText("Success.")
                card.setReloadContent ? card.setReloadContent(true) : false
                setTimeout(() => {
                    setOpen(false);
                    setButtonText("Submit");
                    setDisabled(false)
                }, 500)
            }
        }).catch(() => {
            setButtonText("Error Occured! Please Try again!");
            setDisabled(false)
            setTimeout(() => {
                setButtonText("Submit")
            }, 1500)
        })
    }

    return(
        <Modal title="Add Content to your Brain" open={open} setOpen={setOpen} >
            <div className="flex flex-col m-1 my-5 gap-4">
                <div>
                    <div className="text-gray-400" >Card type:</div>
                    <select name="type" id="type" defaultValue={card.type}
                    className="w-full h-10 p-2 text-base border-1 appearance-none border-gray-500 rounded-md"
                    onChange={handleInputChange}  >
                        <option value="tweet">Tweet</option>
                        <option value="youtube">YouTube</option>
                        <option value="document">Document</option>
                        <option value="link">Link</option>
                    </select>
                </div>

                <div>
                    <div className="text-gray-400" >Title:</div>
                    <InputBox title="Enter the title" name="title" defaultValue={card.title} maxLength={50} onChange={handleInputChange} />
                </div>

                <div>
                    <div className="text-gray-400" >Link:</div>
                    <InputBox title="Enter your Link" name="link" maxLength={150} defaultValue={card.link} onChange={handleInputChange} />                  
                </div>

                <div>
                    <div className="text-gray-400" >Tags:</div>
                    <div className="flex justify-between gap-3">
                        <InputBox title="Enter a tag" id="tag-input" maxLength={50} onKeyDown={(e) => {
                            if(e.key === "Enter"){
                                handleAddTag();
                            }
                        }} />                            
                        <Button variant="secondary" size="sm" text="" startIcon={<IoMdAdd />} onClick={handleAddTag} />
                    </div>
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
                <div className="text-center text-gray-400 text-sm" ref={alerDivtRef} > </div>
                <Button variant="primary" size="sm" text={buttonText} onClick={handleEditContent} disabled={disabled} />
            </div>
        </Modal>
    )
}