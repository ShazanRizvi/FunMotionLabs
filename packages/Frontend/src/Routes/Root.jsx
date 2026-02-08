import React from 'react'
import { Outlet, useLocation } from "react-router-dom";
//import Navbar from "@/AppComponents/Navbar";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import Footer from "@/AppComponents/Footer";
import { useState } from "react";

const Root = () => {
   const location = useLocation();
   const isGameDetailPage = /^\/games\/[^/]+$/.test(location.pathname);
   const navItems = [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "About",
        link: "/about",
      },
      {
        name: "Games",
        link: "/games",
      },
      {
        name: "Build with Us",
        link: "#build_with_us",
      },
      {
        name: "Blogs",
        link: "/blogs",
      },
      {
        name: "Payments",
        link: "#payments",
      },
    ];
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (

   
       <div className=" h-screen w-screen">
            <Navbar>
              {/* Desktop Navigation */}
              <NavBody
                className={isGameDetailPage ? "bg-white/90 text-black backdrop-blur-sm shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]" : ""}
              >
                <NavbarLogo forceDarkText={isGameDetailPage} />
                <NavItems items={navItems} />
                <div className="flex items-center gap-1">
                  <NavbarButton forceDarkText={isGameDetailPage} variant="secondary">Subscribe</NavbarButton>
                  <NavbarButton forceDarkText={isGameDetailPage} variant="gradient">Book a call</NavbarButton>
                </div>
              </NavBody>
       
              {/* Mobile Navigation */}
              <MobileNav>
                <MobileNavHeader>
                  <NavbarLogo />
                  <MobileNavToggle
                    isOpen={isMobileMenuOpen}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  />
                </MobileNavHeader>
       
                <MobileNavMenu
                  isOpen={isMobileMenuOpen}
                  onClose={() => setIsMobileMenuOpen(false)}
                >
                  {navItems.map((item, idx) => (
                    <a
                      key={`mobile-link-${idx}`}
                      href={item.link}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="relative text-neutral-600 dark:text-neutral-300"
                    >
                      <span className="block">{item.name}</span>
                    </a>
                  ))}
                  <div className="flex w-full flex-col gap-4">
                    <NavbarButton
                      onClick={() => setIsMobileMenuOpen(false)}
                      variant="primary"
                      className="w-full"
                    >
                      Login
                    </NavbarButton>
                    <NavbarButton
                      onClick={() => setIsMobileMenuOpen(false)}
                      variant="gradient"
                      className="w-full"
                    >
                      Book a call
                    </NavbarButton>
                  </div>
                </MobileNavMenu>
              </MobileNav>
            </Navbar>
      <Outlet />
      <div className="w-full bg-blue-900 ">
      <Footer/>
    </div>
     
    </div>
  )
}

export default Root
