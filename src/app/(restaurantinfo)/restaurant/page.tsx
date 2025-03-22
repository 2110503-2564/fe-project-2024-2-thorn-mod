import  RestaurantCatalog  from "@/components/RestaurantCatalog";
import  getRestaurants  from "@/libs/getRestaurants";

export default async function Home() {
  const restaurantDetail = await getRestaurants();

  return (
    <main >
  
     <div className="flex items-center justify-center w-screen h-screen">
      <RestaurantCatalog restaurantJson={restaurantDetail} />
     </div>
      
    </main>
  );
}
