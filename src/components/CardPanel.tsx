'use client'
import { useReducer } from "react";
import Card from "./Card";
import Link from "next/link";

export default function CardPanel() {

    const venueData = [
        {vid:"001",venueName:"The Bloom Pavilion",imgSrc:"/img/bloom.jpg"},
        {vid:"002",venueName:"Spark Space", imgSrc:"/img/sparkspace.jpg"},
        {vid:"003",venueName:"The Grand Table", imgSrc:"/img/grandtable.jpg"}
    ];

    const venueRating = (ratingList:Map<string,number>,action:{type:string,venue:string,rating:number})=>{
        switch (action.type){
            case 'updateRating' :
                const newRatingList = new Map(ratingList)
                newRatingList.set(action.venue,action.rating??0)
                return newRatingList
            case 'removeRating':
                ratingList.delete(action.venue)
                return new Map(ratingList)
            default :
            return ratingList
        }
    };

    const initialRating = new Map(venueData.map(({ venueName }) => [venueName, 0]));

    const [ratingList,dispatchFunc] = useReducer(venueRating,initialRating);

    return (
        <div className="flex flex-col">
            
            <div className="bg-slate-100 rouded-lg space-x-5 space-x-2
          w-full px-10 py-5 flex flex-row justify-center">

            {
                venueData.map((venue)=> (
                    <Link href={`/venue/${venue.vid}`} className="w-1/5" >
                    
                        <Card venueName={venue.venueName} imgSrc={venue.imgSrc}  ratingFunc={(venue:string,rating:number)=>dispatchFunc({type:'updateRating',venue:venue,rating:rating} )} 
                            
                            />
                    
                    </Link>
                )   )
                
            }
          
            {/* <Card venueName="The Bloom Pavilion" imgSrc="/img/bloom.jpg" />
            <Card venueName="Spark Space" imgSrc="/img/sparkspace.jpg"  />
            <Card venueName="The Grand Table" imgSrc="/img/grandtable.jpg" /> */}
            </div>
        
            <div className="p-10 bg-slate-200">

            <div className=" w-full text-xl font-medium block " >
                Venue List : {ratingList.size}
            </div>

                {Array.from(ratingList).map(([venue, rating]) => 
                        <div data-testid={venue} key={venue} onClick={() => dispatchFunc({ type: 'removeRating', venue:venue,rating:rating })}
                        className="block"
                        >
                            {venue}: {rating} 
                        </div>
                )}

            </div>
        </div>
            
        
    )
}