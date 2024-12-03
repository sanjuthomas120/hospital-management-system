import React from "react";
import IndexNavbar from "./IndexNavbar/IndexNavbar";
import IntroductionPage from "./IntroductionPage/IntroductionPage";
import Service from "./Service/Service";
import AboutUs from "./AboutUs/AboutUs";
import ContactUs from "./ContactUs/ContactUs";
import Footer from "../Footer/Footer";

function Index() {
  return (
    <div>
      <IndexNavbar />
      <IntroductionPage />
      <Service />
      <AboutUs />
      <ContactUs />
      <Footer />
    </div>
  );
}
export default Index;
