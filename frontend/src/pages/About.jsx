import React from "react";
import Layout from "../layout/Layout";
import AboutDetail from "../components/about/AboutDetail";
import AboutTestimonial from "../components/about/AboutTestimonial";


function About() {
  return (
    <>
     
      <div className="">
        <Layout>
          <AboutDetail />
          <AboutTestimonial />
        </Layout>
      </div>
    </>
  );
}

export default About;
