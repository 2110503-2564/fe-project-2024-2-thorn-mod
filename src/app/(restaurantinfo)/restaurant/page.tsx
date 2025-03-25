import BackButton from "@/components/BackButton";
import  RestaurantCatalog  from "@/components/RestaurantCatalog";
import  getRestaurants  from "@/libs/getRestaurants";
import RestaurantCatalogWithSearch from "@/components/RestaurantCatalogWithSearch";

export default async function Home() {
  const restaurantDetail = await getRestaurants();

  return (
    <main className="min-h-screen pt-24 px-6">

      <div className="absolute top-24 left-6 z-50">
        <BackButton />
      </div>
      <div className="flex items-start gap-4">
          <RestaurantCatalogWithSearch restaurantJson={restaurantDetail} />
      </div>
      
      {/* <div className="flex items-center justify-center w-screen px-4">
        <RestaurantCatalog restaurantJson={restaurantDetail} />
      </div> */}
      
    </main>
  );
}
