import { ReactElement } from "react"

interface SidebarItemInterface{
    name: string,
    icon: ReactElement
}

export default function SidebarItem({
    name,
    icon
}: SidebarItemInterface){ 
    return (
        <div key={name} className="flex items-center gap-4 py-3 px-8 cursor-pointer bg-white hover:bg-gray-50" >
            <div>{icon}</div>
            <div className="font-light text-xl" >{name}</div>
        </div>
    )
}