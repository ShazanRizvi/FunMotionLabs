import React from 'react'
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "framer-motion";

const MainText = ({words, subtext}) => {
  return (
     <div>
     <motion.div className="relative mx-4 my-4 flex flex-row items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
       <LayoutTextFlip
         text=""
         words={words}
         
       />
     </motion.div>
     <p className="mt-3 max-w-7xl bg-clip-text font-medium text-lg lg:text-2xl text-center text-white/80 drop-shadow-xl bg-gradient-to-b from-white/10 to-white/20 oswald-regular">
     {subtext}
     </p>
   </div>
  )
}

export default MainText