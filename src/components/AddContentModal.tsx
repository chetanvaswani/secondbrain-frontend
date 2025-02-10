import { IoCloseOutline } from "react-icons/io5";

interface AddContentModalInterface{
    open: boolean,
    onClick: () => void
}

export default function AddContentModal({
    open,
    onClick
}: AddContentModalInterface){
    if (open){
        return(
            <div className="h-screen w-screen bg-opacity-0 bg-black-50 absolute top-0 left-0 flex justify-center items-center "  >
                <div className="h-75 w-120 bg-white rounded-xl p-5" >
                    <div className="flex w-full items-center justify-between" >
                        <div className="font-normal text-xl text-gray-700" >Add Content to your Brain</div>
                        <IoCloseOutline className="size-6 cursor-pointer text-gray-500 " onClick={onClick} />
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        )
    }
}