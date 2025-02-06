import { IoShareSocialOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { CgFileDocument } from "react-icons/cg";
import { CiTwitter } from "react-icons/ci";
import { PiYoutubeLogoLight } from "react-icons/pi";
import { FaLink } from "react-icons/fa6";


interface cardProps { 
    type: "document" | "tweet" | "link" | "youtube",
    link: string,
    title: string,
    tags: string[]
}

const cardIconsStyles = 'size-6 text-gray-400'

const cardType = {
    "document": <CgFileDocument className='size-8 text-gray-500' />,
    "tweet": <CiTwitter className='size-10 text-gray-600' />,
    "youtube": <PiYoutubeLogoLight className='size-11 text-gray-500' />,
    "link": <FaLink className='size-8 text-gray-500' />,
}

export default function Card({
    type,
    link,
    title,
    tags
} : cardProps) {
    return (
        <div className="w-72 h-96 bg-white rounded-2xl border-1 border-gray-200 text-black p-4 flex flex-col gap-4" >
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    {cardType[type]}
                    <p className="font-medium text-lg text-gray-600 leading-5">{title}</p>
                </div>
                <div className="flex gap-5">
                    <IoShareSocialOutline className={cardIconsStyles} />
                    <RiDeleteBinLine className={cardIconsStyles} />
                </div>
            </div>
            <div className="max-h-52 overflow-hidden text-gray-600 font-light">
                The best way to build a second brain app is to learn programming.
                Learn MERN stack and then learn postgress and prisma and learn typescript.
            </div>
            <div className="flex justify-start gap-2 items-start overflow-x-auto">
                {
                    tags.map(title => <Tag title={title} key={title} />)
                }
            </div>
            <div className="text-gray-500 text-sm font-extralight">
                Added on 31/01/2025
            </div>
        </div>
    )
}

interface tagProps {
    title: string
}

function Tag({
    title
} : tagProps){
    return (
        <div className="bg-purple-200 text-sm text-purple-600 px-3 py-1 w-fit rounded-xl font-light">
            #{title}
        </div>
    )
}