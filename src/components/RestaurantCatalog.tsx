import Link from "next/link";
import Card from "./Card";
import { RestaurantItem, RestaurantJson } from "../../interface";

export default async function RestaurantCatalog({restaurantJson}:{restaurantJson:Promise<RestaurantJson>}){
    const restaurantJsonReady = await restaurantJson;
    return (
        <>
            <div
                style={{
                    margin: "20px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    alignContent: "space-around",
                }}
            >
                {restaurantJsonReady.data.map((resItem : RestaurantItem ) => (   
                    <Link key={resItem._id} href={`restaurant/${resItem._id}`} className="w-1/5">
                        <Card venueName={resItem.name} imgSrc={"/img/amber.jpg"} />
                    </Link>
                ))}
            </div>
        </>
    )
}