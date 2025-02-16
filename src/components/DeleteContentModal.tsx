import Modal from "./Modal";
import Button from "./Button";
import axios from "axios";

interface DeleteContentModalInterface {
    open: boolean,
    setOpen: (value: boolean) => void,
    id: number
}

export default function DeleteContentModal({
    open,
    setOpen,
    id
}:DeleteContentModalInterface){
    const DELETE_URL = "http://localhost:6001/api/v1/content/";

    const handleDelete = () => {
        const token = localStorage.getItem("token")

        axios.delete(DELETE_URL + id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            if(res.data.success){
                setOpen(false)
            }
        }).catch((err) => {
            alert("Some error occured while deleting the content. Please try again.")
            console.log(err)
        })
    }

    return (
        <Modal open={open} setOpen={setOpen} title="Are you sure you want to delete this content?" >
            <div className="flex w-full justify-center items-center gap-3 mt-4">
                <div className="w-[40%] flex flex-col">
                    <Button text="Yes" variant="primary" size="md" onClick={handleDelete} />
                </div>
                <div className="w-[40%] flex flex-col">
                    <Button text="No" variant="secondary" size="md" onClick={() => {
                        setOpen(false)
                    }}/>
                </div>
            </div>
        </Modal>
    )
}