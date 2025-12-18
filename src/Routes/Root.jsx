import React from 'react'
import { Outlet } from "react-router-dom";
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
import { useState } from "react";

const Root = () => {
   const navItems = [
      {
        name: "Home",
        link: "#features",
      },
      {
        name: "About",
        link: "#pricing",
      },
      {
        name: "What we offer",
        link: "#contact",
      },
      {
        name: "Contact",
        link: "#contact",
      },
    ];
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (

   
       <div className=" h-screen w-full ">
            <Navbar>
              {/* Desktop Navigation */}
              <NavBody>
                <NavbarLogo />
                <NavItems items={navItems} />
                <div className="flex items-center gap-1">
                  <NavbarButton  variant="secondary">Subscribe</NavbarButton>
                  <NavbarButton variant="gradient">Book a call</NavbarButton>
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
     
    </div>
  )
}

export default Root