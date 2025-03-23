
import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import Rating from "@mui/material/Rating";


export default function Card ({venueName,imgSrc,ratingFunc}:{venueName:string,imgSrc:string,ratingFunc?:Function}){
    function onCompare(venueName: string) {
        throw new Error("Function not implemented.");
    }

    return (
        <InteractiveCard contentName={venueName}>
            
            <div className="bg-white shadow-md flex flex-col w-full h-[70%] rounded-t-lg relative text-center " >
                    <Image 
                        src={imgSrc}
                        alt={venueName}
                        fill={true}
                        objectFit="cover"
                    />
                </div>

                <div className="w-full h-[15%] p-[10px] ">
                    <h1>{venueName}</h1>
                </div>
                {
                    ratingFunc ?  <Rating size="large" name={`${venueName} Rating`} id={`${venueName} Rating`} data-testid={`${venueName} Rating`} className="w-fit h-[15%]" 
                    onChange={(event, value) => {ratingFunc(venueName, value); event.preventDefault(); }} onClick={(e) => e.stopPropagation()}
                >
                    
                </Rating>: null
                
                }
               
                
       
        </InteractiveCard>

    );
};