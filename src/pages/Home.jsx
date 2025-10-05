import Hero from "../components/Hero";
import About from "../components/sections/About";
import Servicios from "../components/sections/Servicios";
import Contact from "../components/sections/Contact";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />

      <About />

      <Servicios />

      <Contact />
    </div>
  );
};

export default Home;
