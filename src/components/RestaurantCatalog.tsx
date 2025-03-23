import Link from "next/link";
import Card from "./Card";
import { RestaurantItem, RestaurantJson } from "../../interface";

export default async function RestaurantCatalog({ restaurantJson }: { restaurantJson: Promise<RestaurantJson> }){
    const restaurantJsonReady = await restaurantJson;

    return (
        
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 p-10 w-full">
            {restaurantJsonReady.data.map((resItem : RestaurantItem ) => (   
                <Link key={resItem._id} href={`restaurant/${resItem._id}`} className="w-full">
                    <Card venueName={resItem.name} imgSrc={resItem.picture} />
                </Link>
            ))}
        </div>
        
    )
}