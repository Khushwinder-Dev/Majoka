"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import WeAssist from "@/components/WeAssist";
import Featured from "@/components/Featured";
import WorkSteps from "@/components/WorkSteps";
import Services from "@/components/Services";
import ClientTestimonials from "@/components/ClientTestimonials";
import GetStarted from "@/components/GetStarted";
import MeetOurTeam from "@/components/Common/MeetOurTeam";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <main>
        <div>
          <HeroSection />
        </div>
        <div data-aos="fade-up" data-aos-delay="100">
          <StatsSection />
        </div>
        <div data-aos="fade-up" data-aos-delay="200">
          <WeAssist />
        </div>
        <div data-aos="fade-up" data-aos-delay="200">
          <Featured />
        </div>
        <div data-aos="fade-up" data-aos-delay="200">
          <WorkSteps />
        </div>
        <div data-aos="fade-up" data-aos-delay="200">
          <Services />
        </div>
        <div data-aos="fade-up" data-aos-delay="200">
          <MeetOurTeam />
        </div>
        <div data-aos="fade-up" data-aos-delay="200">
          <ClientTestimonials />
        </div>

        <div data-aos="fade-up" data-aos-delay="200">
          <GetStarted />
        </div>
      </main>
    </div>
  );
}
