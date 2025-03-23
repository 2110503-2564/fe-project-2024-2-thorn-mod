'use client'

import React from "react"

export default function InteractiveCard({children,contentName}:{children:React.ReactNode,contentName:string}){
    function onMouseHover(event:React.SyntheticEvent){
        if (event.type == "mouseover"){
            event.currentTarget.classList.remove("shadow-lg")
            event.currentTarget.classList.add("shadow-2xl")
            event.currentTarget.classList.remove("bg-white")
            event.currentTarget.classList.add("bg-neutral-200")
        }else {
            event.currentTarget.classList.remove("shadow-2xl")
            event.currentTarget.classList.add("shadow-lg")
            event.currentTarget.classList.remove("bg-neutral-200")
            event.currentTarget.classList.add("bg-white")
        }
    }

    return (
        <div className="bg-white rounded-lg px-6 py-8 ring shadow-lg ring-gray-900/5 h-[300px] text-center"
        onMouseOver={(e)=>onMouseHover(e)}
        onMouseOut={(e)=>onMouseHover(e)}
        
        >
            {children}
        </div>
    )
}