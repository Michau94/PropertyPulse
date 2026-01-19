import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import FeaturedProperties from "@/components/FeaturedProperties";
import HomeProperties from "@/components/HomeProperties";
import connectDB from "@/config/database";

export default function HomePage() {
  connectDB();

  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
}
