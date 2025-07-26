'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronUp } from 'react-icons/fa'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 group"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          whileHover={{ 
            scale: 1.1,
            y: -2,
            transition: { duration: 0.15, ease: "easeOut" }
          }}
          whileTap={{ 
            scale: 0.95,
            transition: { duration: 0.1 }
          }}
        >
          {/* Main button with glassmorphism effect */}
          <div className="relative">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl md:rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
            
            {/* Button container */}
            <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 p-3 md:p-4 rounded-xl md:rounded-2xl shadow-2xl glass-strong border border-blue-400/20 group-hover:border-blue-400/40 transition-all duration-300">
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Icon with subtle animation */}
              <motion.div
                className="relative z-10"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaChevronUp 
                  size={16}
                  className="text-white drop-shadow-lg md:w-5 md:h-5 w-4 h-4" 
                />
              </motion.div>
            </div>
            
            {/* Tooltip */}
            <motion.div
              className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap glass"
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              Back to top
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
            </motion.div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
} 