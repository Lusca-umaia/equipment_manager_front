"use client";

import { useCallback } from "react";
import Navbar from "@/components/LandingPage/Navbar";
import Product from "@/components/LandingPage/Product";
import Technologies from "@/components/LandingPage/Technologies";
import Functionalities from "@/components/LandingPage/Functionalities";
import Footer from "@/components/LandingPage/Footer";

const navigation = [
  { name: "Produto", href: "product" },
  { name: "Tecnologias", href: "technologies" },
  { name: "Funcionalidades", href: "functionalities" },
];

export default function LandingPage() {
  const scrollToSection = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);

    if (element) {
      window.scroll({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div>
      <Navbar navigation={navigation} scrollToSection={scrollToSection} />
      <Product />
      <Technologies />
      <Functionalities />
      <Footer navigation={navigation} scrollToSection={scrollToSection} />
    </div>
  );
}
