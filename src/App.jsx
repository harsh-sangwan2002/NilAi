import { lazy } from "react";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const Navbar = lazy(() => import("./components/Navbar"));
const Hero = lazy(() => import("./components/Hero"));
const Slider = lazy(() => import("./components/Slider"));
const About = lazy(() => import("./components/About"));
const About2 = lazy(() => import("./components/About2"));
const About3 = lazy(() => import("./components/About3"));
const NilAi = lazy(() => import("./components/NilAi"));
const Carousel = lazy(() => import("./components/Carousel"));
const Layout = lazy(() => import("./components/Layout"));

function App() {

  return (
    <Layout>
      <Navbar />
      <Hero />
      <Slider />
      <About />
      <About2 />
      <About3 />
      <NilAi />
      <Carousel />
      <Contact />
      <Footer />
    </Layout>
  );
}

export default App;
