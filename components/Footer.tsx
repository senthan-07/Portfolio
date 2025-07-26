'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'

export default function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  const handleContactClick = (type: 'email' | 'phone') => {
    if (type === 'email') {
      window.location.href = 'mailto:senthanbalu@gmail.com'
    } else if (type === 'phone') {
      window.location.href = 'tel:+919600506430'
    }
  }

  return (
    <footer id="contact" className="py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden border-t border-slate-700/40">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-blue-500/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/2 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating particles */}
        <motion.div
          className="absolute top-1/4 right-1/3 w-2 h-2 bg-blue-400 rounded-full"
          animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-400 rounded-full"
          animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          
          <h2 className="font-elegant text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 mx-auto rounded-full shadow-lg"></div>
          
          <p className="font-elegant text-slate-300 text-lg max-w-2xl mx-auto mt-8 leading-relaxed">
            I&apos;m always open to discussing new opportunities and interesting projects. 
            Let&apos;s connect and see how we can work together!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="glass rounded-3xl p-8 h-full">
              <h3 className="font-elegant text-2xl font-bold text-white mb-8 tracking-wide">
                Contact <span className="gradient-text-static">Info</span>
              </h3>
              
              <div className="space-y-6">
                {/* Clickable Email */}
                <motion.div 
                  className="flex items-center gap-4 p-4 glass rounded-2xl hover:bg-slate-700/70 hover:border-slate-500/50 transition-all duration-300 group cursor-pointer"
                  whileHover={{ x: 5, scale: 1.02 }}
                  onClick={() => handleContactClick('email')}
                >
                  <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                    <FaEnvelope className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <p className="font-elegant text-slate-400 text-sm">Email</p>
                    <p className="font-elegant text-slate-200 font-medium group-hover:text-blue-300 transition-colors">senthanbalu@gmail.com</p>
                  </div>
                </motion.div>
                
                {/* Clickable Phone */}
                <motion.div 
                  className="flex items-center gap-4 p-4 glass rounded-2xl hover:bg-slate-700/70 hover:border-slate-500/50 transition-all duration-300 group cursor-pointer"
                  whileHover={{ x: 5, scale: 1.02 }}
                  onClick={() => handleContactClick('phone')}
                >
                  <div className="p-3 bg-green-500/20 rounded-xl group-hover:bg-green-500/30 transition-colors">
                    <FaPhone className="text-green-400" size={20} />
                  </div>
                  <div>
                    <p className="font-elegant text-slate-400 text-sm">Phone</p>
                    <p className="font-elegant text-slate-200 font-medium group-hover:text-green-300 transition-colors">+91 9600506430</p>
                  </div>
                </motion.div>
                
                {/* Location */}
                <motion.div 
                  className="flex items-center gap-4 p-4 glass rounded-2xl hover:bg-slate-700/70 hover:border-slate-500/50 transition-all duration-300 group"
                  whileHover={{ x: 5, scale: 1.02 }}
                >
                  <div className="p-3 bg-purple-500/20 rounded-xl group-hover:bg-purple-500/30 transition-colors">
                    <FaMapMarkerAlt className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <p className="font-elegant text-slate-400 text-sm">Location</p>
                    <p className="font-elegant text-slate-200 font-medium">Chennai, India</p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h4 className="font-elegant text-slate-300 font-medium mb-4 tracking-wide">Follow Me</h4>
                <div className="flex gap-3">
                  <motion.a 
                    href="https://github.com/senthan-07" 
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 glass rounded-2xl hover:bg-slate-700/70 hover:border-slate-500/50 text-slate-300 hover:text-white transition-all duration-300 group"
                  >
                    <FaGithub size={20} className="group-hover:rotate-12 transition-transform" />
                  </motion.a>
                  <motion.a 
                    href="https://linkedin.com/in/b-t-senthan-amuthan-17006827b/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 glass rounded-2xl hover:bg-slate-700/70 hover:border-slate-500/50 text-slate-300 hover:text-white transition-all duration-300 group"
                  >
                    <FaLinkedin size={20} className="group-hover:rotate-12 transition-transform" />
                  </motion.a>
                  <motion.a 
                    href="https://x.com/Senthan_07" 
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 glass rounded-2xl hover:bg-slate-700/70 hover:border-slate-500/50 text-slate-300 hover:text-white transition-all duration-300 group"
                  >
                    <FaTwitter size={20} className="group-hover:rotate-12 transition-transform" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-3xl p-8 h-full">
              <h3 className="font-elegant text-2xl font-bold text-white mb-8 tracking-wide">
                Send <span className="gradient-text-static">Message</span>
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-elegant text-slate-300 text-sm font-medium mb-2 block">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      required
                      className="w-full px-4 py-3 glass border border-slate-600/30 rounded-2xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 text-white placeholder-slate-400 font-elegant transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="font-elegant text-slate-300 text-sm font-medium mb-2 block">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                      className="w-full px-4 py-3 glass border border-slate-600/30 rounded-2xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 text-white placeholder-slate-400 font-elegant transition-all duration-300"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="font-elegant text-slate-300 text-sm font-medium mb-2 block">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                    required
                    className="w-full px-4 py-3 glass border border-slate-600/30 rounded-2xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 text-white placeholder-slate-400 font-elegant transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label className="font-elegant text-slate-300 text-sm font-medium mb-2 block">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    required
                    className="w-full px-4 py-3 glass border border-slate-600/30 rounded-2xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 text-white placeholder-slate-400 resize-none font-elegant transition-all duration-300"
                  ></textarea>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-2xl p-4 text-green-400"
                  >
                    <FaCheckCircle size={16} />
                    <span className="font-elegant text-sm">Message sent successfully! I&apos;ll get back to you soon.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-2xl p-4 text-red-400"
                  >
                    <FaExclamationTriangle size={16} />
                    <span className="font-elegant text-sm">Failed to send message. Please try again or contact me directly.</span>
                  </motion.div>
                )}
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02, y: -1 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className={`w-full py-4 rounded-2xl font-elegant font-medium shadow-lg transition-all duration-300 group ${
                    isSubmitting 
                      ? 'bg-slate-600 text-slate-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-blue-500/25 glow'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <FaEnvelope size={16} className={`${!isSubmitting ? 'group-hover:rotate-12' : ''} transition-transform`} />
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center pt-8 border-t border-slate-700/40"
        >
          <div className="glass p-6 rounded-3xl max-w-2xl mx-auto">
            <p className="font-elegant text-slate-300 mb-2">
              Thanks for visiting my portfolio!
            </p>
            <p className="font-elegant text-slate-400 text-sm">
              © 2025 Senthan Amuthan  All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
