import AboutUsSection from "./AboutUsSection";
import OurMission from "./OurMission";
import CommonHeader from "../../components/Common/CommonHeader";
import MeetOurTeam from "../../components/Common/MeetOurTeam";
import ClientTestimonials from "@/components/ClientTestimonials";

const AboutUs = () => {
  return (
    <div>
      <CommonHeader
        title="About Our Company"
        breadcrumb="About Us"
        imagePath="/about-us/about-us-1.png"
      />
      <AboutUsSection />
      <OurMission />
      <MeetOurTeam />
      <ClientTestimonials />
    </div>
  );
};

export default AboutUs;
