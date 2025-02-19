import { ReactElement } from "react"

export interface SidebarItemInterface{
    name: string,
    icon: ReactElement,
    selected?: boolean,
    value: "all" | "tweet" | "youtube" | "document" | "link" | "tags"
    setSelectedCategory?: (category: "all" | "tweet" | "youtube" | "document" | "link" | "tags") => void
}

export default function SidebarItem({
    name,
    icon,
    value,
    selected,
    setSelectedCategory
}: SidebarItemInterface){ 
    let style = "flex items-center gap-4 py-3 px-8 cursor-pointer bg-white hover:bg-gray-50 " 
    if (selected){
        style += "text-purple-600" 
    }

    return (
        <div key={name} onClick={() => {
            if (selected){
                setSelectedCategory ? setSelectedCategory("all") : false
            } else {
                setSelectedCategory ? setSelectedCategory(value) : false
            }
        }} className={style} >
            <div>{icon}</div>
            <div className="font-light text-xl" >{name}</div>
        </div>
    )
}