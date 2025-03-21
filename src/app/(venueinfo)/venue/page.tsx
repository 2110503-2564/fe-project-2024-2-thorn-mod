import  VenueCatalog  from "@/components/VenueCatalog";
import  getVenues  from "@/libs/getVenues";

export default async function Home() {
  const venueDetail = await getVenues();

  return (
    <main >
  
     
      
      <VenueCatalog venuesJson={venueDetail} />
      
        
      
    </main>
  );
}
