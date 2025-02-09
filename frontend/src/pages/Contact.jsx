import React from "react";
import Layout from "../layout/Layout";
import Banner from "../utils/Banner";
import ContactDetails from "../components/contact/ContactDetails";


function Contact() {
  return (
    <Layout>
      <Banner />
      <ContactDetails/>
    </Layout>
  );
}

export default Contact;
