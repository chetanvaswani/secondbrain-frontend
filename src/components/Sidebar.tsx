import { CgFileDocument } from "react-icons/cg";
import { CiTwitter } from "react-icons/ci";
import { PiYoutubeLogoLight } from "react-icons/pi";
import { FaLink } from "react-icons/fa6";
import { RiHashtag } from "react-icons/ri";
import { LuBrain } from "react-icons/lu";
import SidebarItem from "./SidebarItem";
import Button from "./Button";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { SidebarItemInterface } from "./SidebarItem";

const sidebarItems: SidebarItemInterface[] = [
    {
        name: "Tweets",
        value: "tweet",
        icon: <CiTwitter className='size-6 stroke-1' />
    },
    {
        name: "Videos",
        value: "youtube",
        icon: <PiYoutubeLogoLight className='size-6 stroke-3' />
    },
    {
        name : "Documents",
        value: "document",
        icon : <CgFileDocument className='size-6' />
    },
    {
        name: "Links",
        value: "link",
        icon: <FaLink className='size-6' />
    },
    {
        name: "Tags",
        value: "tags",
        icon: <RiHashtag className="size-6" />
    }
]

interface SidebarProps{
    selectedCategory: "all" | "tweet" | "youtube" | "document" | "link" | "tags",
    setSelectedCategory: (category: "all" | "tweet" | "youtube" | "document" | "link" | "tags") => void
    login?: boolean
}

export default function Sidebar({
    selectedCategory,
    setSelectedCategory,
    login
}: SidebarProps){
    const navigate = useNavigate()

    return (
        <div className=" h-full w-72 bg-white border-r-1 border-gray-200 py-2 flex flex-col justify-between ">
            <div>
                <div className="flex items-center p-2 gap-2">
                    <LuBrain className="size-10 fill text-purple-600 " />
                    <div className="text-2xl font-semibold">Second Brain</div>
                </div>
                <div className="my-5">
                    {
                        sidebarItems.map((item) => {
                            let selected = item.value === selectedCategory
                            return ( 
                                <SidebarItem value={item.value} name={item.name} key={item.name} icon={item.icon} selected={selected} setSelectedCategory={setSelectedCategory} />
                            )
                        })
                    }
                </div>
            </div>
            {
                login ?
                <div className="py-2 px-5 w-full flex flex-col">
                    <Button text="Logout" variant="primary" size="md" startIcon={<TbLogout2 />} onClick={() => {
                        localStorage.removeItem("token");
                        navigate('/login')
                    }} />
                </div> : false
            }
        </div>
    )
}