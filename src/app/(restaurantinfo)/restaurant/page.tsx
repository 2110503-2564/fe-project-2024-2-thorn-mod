import BackButton from "@/components/BackButton";
import  RestaurantCatalog  from "@/components/RestaurantCatalog";
import  getRestaurants  from "@/libs/getRestaurants";

export default async function Home() {
  const restaurantDetail = await getRestaurants();

  return (
    <main className="min-h-screen">

      <div className="flex px-14 pt-24">
        <BackButton />
      </div>
      <div className="flex items-center justify-center w-screen px-4">
        <RestaurantCatalog restaurantJson={restaurantDetail} />
      </div>
      
    </main>
  );
}
