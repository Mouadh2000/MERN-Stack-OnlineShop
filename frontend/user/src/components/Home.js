import Banner from "./Banner";
import HeroSection from "./HeroSection";
import Categories from "./Categories";
import HomeShop from "./Shop/HomeShop";

const Home = () => {
    return(
        <>
            <HeroSection />
            <Banner />
            <HomeShop />
            <Categories />
        </>
    );
};

export default Home;