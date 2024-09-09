"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { RocketIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons'

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-purple-900 to-indigo-900 min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background pattern */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            d="M10 10 L90 90 M90 10 L10 90 M50 0 L50 100 M0 50 L100 50" 
            stroke="white" 
            strokeWidth="0.5" 
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
      
      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.h2 
          className="text-2xl font-medium text-purple-200 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Zostań programistą AI!
        </motion.h2>
        <motion.h1 
          className="text-5xl font-bold text-white mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Kursy programowania<br />dla początkujących
        </motion.h1>
        <motion.div 
          className="flex justify-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Button size="lg" className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white">
            <RocketIcon className="mr-2 h-5 w-5" /> Kup Teraz
          </Button>
          <Button size="lg" variant="outline" className="text-purple-200 border-purple-200 hover:bg-purple-800">
            <QuestionMarkCircledIcon className="mr-2 h-5 w-5" /> Jak to Działa
          </Button>
        </motion.div>
      </motion.div>
      
      {/* Circle overlay */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-purple-800"></div>
      </motion.div>
    </div>
  )
}

export default Hero