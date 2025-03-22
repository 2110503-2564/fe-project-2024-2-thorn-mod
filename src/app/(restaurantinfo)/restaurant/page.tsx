import  RestaurantCatalog  from "@/components/RestaurantCatalog";
import  getRestaurants  from "@/libs/getRestaurants";

export default async function Home() {
  const restaurantDetail = await getRestaurants();

  return (
    <main >
  
     
      
      <RestaurantCatalog restaurantJson={restaurantDetail} />
      
        
      
    </main>
  );
}
