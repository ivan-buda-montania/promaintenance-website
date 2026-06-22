import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollManager from "./components/ScrollManager";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import StartYourProject from "./components/StartYourProject";
import Moodboard from "./components/Moodboard";
import FreeEstimate from "./components/FreeEstimate";
import Contact from "./components/Contact";

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <About />
        <Testimonials />
        <StartYourProject />
        <Moodboard />
      </main>
      <Contact />
    </>
  );
}

function EstimatePage() {
  return (
    <>
      <Navbar />
      <main>
        <FreeEstimate />
      </main>
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/estimate" element={<EstimatePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
