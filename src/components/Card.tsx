import { IoShareSocialOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { CgFileDocument } from "react-icons/cg";
import { CiTwitter } from "react-icons/ci";
import { PiYoutubeLogoLight } from "react-icons/pi";
import { FaLink } from "react-icons/fa6";


interface tag {
    id: number,
    title: string,
    contentId: number
}

interface cardProps { 
    type: "document" | "tweet" | "link" | "youtube",
    link: string,
    title: string,
    tags: tag[]
}

interface tagProps {
    title: string,
}

interface embedingProps {
    link: string
}

const cardIconsStyles = 'size-6 text-gray-400 cursor-pointer'

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
        <div className="w-[31%] min-w-72 max-w-96 h-fit bg-white rounded-2xl border-1 border-gray-200 text-black p-4 flex flex-col gap-4" >
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    {cardType[type]}
                    <p className="font-medium text-lg text-gray-600 leading-5">{title}</p>
                </div>
                <div className="flex gap-5">
                    <IoShareSocialOutline className={`${cardIconsStyles} before:content-['select'] before:ml-2 before:text-black before:absolute before:top-1 before:left-1 before `} />
                    <RiDeleteBinLine className={`${cardIconsStyles} before:content-['select'] before:ml-2 before:text-black before:absolute before:top-1 before:left-1 before `} />
                </div>
            </div>
            <div className="overflow-hidden text-gray-600 font-light">
                {
                    type === "youtube" ? <YoutubeEmbeded link={link} /> :
                    type === "tweet" ? <TwitterEmbeded link={link} /> : 
                    type === 'link' ? false : 
                    type === "document" ? false : false
                }
            </div>
            <div className="flex justify-start gap-2 items-start flex-wrap ">
                {
                   tags && tags?.length > 0 ? tags.map((tag) => {
                    console.log(tag)
                        return (
                            <div key={tag.id}>
                                <Tag title={tag.title} />
                            </div>
                        )
                    }) : false
                }
            </div>
            <div className="text-gray-500 text-sm font-extralight">
                Added on 31/01/2025
            </div>
        </div>
    )
}

export function Tag({
    title,
} : tagProps){
    return (
        <div className="bg-purple-200 text-sm text-purple-600 px-3 py-1 w-fit rounded-xl font-light">
            #{title}
        </div>
    )
}

function YoutubeEmbeded({
    link 
} : embedingProps){ 
    let parts = link.split('/')
    const embed =  `https://www.youtube.com/embed/${parts[parts.length - 1].split('?')[0]}`

    return (
        <iframe className="h-full w-full rounded-lg" src={embed} title="YouTube video player"
         frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
        </iframe>
    )
}

function TwitterEmbeded({
    link
}: embedingProps){
    const embed = link.replace("x.com", "twitter.com")

    return (
        <div className=" max-w-xs" >
            <blockquote className="twitter-tweet">
                <a href={embed}></a>
            </blockquote>
            <script async src="https://platform.twitter.com/widgets.js"></script>
        </div>
    )
}