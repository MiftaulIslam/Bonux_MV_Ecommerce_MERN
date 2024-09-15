import { HeroSection } from "../components";
import FlashSale from "../components/Home/FlashSale";
import JustForYou from "../components/Home/JustForYou";

const Home = () => {
  return (
    <>
      {" "}
      <div className="flex gap-4 items-center w-full justify-center h-[400px]">
        <HeroSection />
      </div>
    
        <div className="py-6">
          <FlashSale />
        </div>
        <div className="py-6">
          <JustForYou />
        </div>
     
    </>
  );
};

export default Home;
