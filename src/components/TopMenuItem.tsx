'use client'

import Link from "next/link"

export default function TopMenuItem({title,pageref}:{title:string,pageref:string}){
    return(
        <Link href={pageref} className="w-[120px] h-[50px] text-center font-sans md:font-serif" >
            {title}
        </Link>
    )
}
