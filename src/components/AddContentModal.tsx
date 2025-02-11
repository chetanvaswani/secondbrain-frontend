import Button from "./Button";
import { IoMdAdd } from "react-icons/io";
import Modal from './Modal'

interface AddContentModalInterface{
    open: boolean,
    setOpen: (value: boolean) => void
}

export default function AddContentModal({
    open,
    setOpen,
}: AddContentModalInterface){
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
                    <InputBox title="Enter a tag" maxLength={50} onChange={() => {
                    
                    }} />                            
                    <Button variant="secondary" size="sm" text="" startIcon={<IoMdAdd />} />
                </div>
                <Button variant="primary" size="sm" text="Submit" />
            </div>
        </Modal>
    )
}

interface InputBoxPropsInterface {
    title: string,
    maxLength: number,
    onChange: () => void
}

function InputBox({
    title,
    maxLength,
    onChange,
}: InputBoxPropsInterface){
    return (
        <input placeholder={title} className="w-full h-10 p-2 text-base border-1 border-gray-500 rounded-md" maxLength={maxLength} onChange={onChange} />
    )
}