import Navbar from "@/components/shared/Navbar";
import Hero from "./(landing)/Hero";
import HowItWorks from "./(landing)/HowItWorks";
import Footer from "./(landing)/Footer";
import Features from "./(landing)/Features";

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full mx-auto overflow-x-clip">
      <Navbar />
      <Hero />
      <Features />
      <div className="hidden md:flex">
        <HowItWorks />
      </div>
      <Footer />
    </div>
  );
};

export default page;
