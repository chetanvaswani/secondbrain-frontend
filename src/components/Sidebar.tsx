import { CgFileDocument } from "react-icons/cg";
import { CiTwitter } from "react-icons/ci";
import { PiYoutubeLogoLight } from "react-icons/pi";
import { FaLink } from "react-icons/fa6";
import { RiHashtag } from "react-icons/ri";
import { LuBrain } from "react-icons/lu";
import SidebarItem from "./SidebarItem";

const sidebarItems = [
    {
        name: "Tweets",
        icon: <CiTwitter className='size-6 stroke-1' />
    },
    {
        name: "Videos",
        icon: <PiYoutubeLogoLight className='size-6 stroke-3' />
    },
    {
        name : "Documents",
        icon : <CgFileDocument className='size-6' />
    },
    {
        name: "Links",
        icon: <FaLink className='size-6' />
    },
    {
        name: "Tags",
        icon: <RiHashtag className="size-6" />
    }
]

export default function Sidebar(){
    return (
        <div className=" h-full w-72 bg-white border-r-1 border-gray-200 py-2">
            <div className="flex items-center p-2 gap-2">
                <LuBrain className="size-10 fill text-purple-600 " />
                <div className="text-2xl font-semibold" >Second Brain</div>
            </div>
            <div className="my-5">
                {
                    sidebarItems.map((item) => {
                        return ( 
                            <SidebarItem name={item.name} key={item.name} icon={item.icon} />
                        )
                    })
                }
            </div>
        </div>
    )
}