import React from "react";
import Layout from "../layout/Layout";
import BannerSlider from "../components/home/BannerSlider";
import BannerSlider2 from "../components/home/BannerSlider2";
import HomeProductSlider from "../components/home/HomeProductSlider";
import OurCategorySlider from "../components/home/OurCategorySlider";
import FixedBanner from  '../components/home/FixedBanner';
import HomeBottomContent from "../components/home/HomeBottomContent";
function Home() {
  return (
    <Layout>
      <BannerSlider />
      <BannerSlider2 />
      <section className="container mx-auto py-10 bg-[#FBFBFB]">
        <HomeProductSlider categoryId="675d5734303025d3f89460f0" />
      </section>
      <section className="container py-5 mx-auto bg-[#FBFBFB]">
        <OurCategorySlider categoryId="675d5756303025d3f89460f7" />
      </section>
     <FixedBanner/>
      <HomeBottomContent />
    </Layout>
  );
}

export default Home;
