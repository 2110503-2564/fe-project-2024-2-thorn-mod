import Link from "next/link";
import Card from "./Card";
import { RestaurantItem, RestaurantJson } from "../../interface";

export default async function RestaurantCatalog({ restaurantJson }: { restaurantJson: Promise<RestaurantJson> }){
    const restaurantJsonReady = await restaurantJson;

    return (
        
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 min-w-[200px] min-h-[300px]  gap-5 p-10">
            {restaurantJsonReady.data.map((resItem : RestaurantItem ) => (   
                <Link key={resItem._id} href={`restaurant/${resItem._id}`} className="w-full">
                    <Card venueName={resItem.name} imgSrc={resItem.picture} />
                </Link>
            ))}
        </div>
        
    )
}