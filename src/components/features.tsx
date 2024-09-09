"use client"

import { useEffect } from 'react'
import { CodeIcon, FrameIcon, LightningBoltIcon } from '@radix-ui/react-icons'
import { Card } from '@/components/ui/card'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Features = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.48, 0.15, 0.25, 0.96]
      }
    }
  }

  return (
    <section className="py-16 bg-purple-950" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center text-white mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
          variants={itemVariants}
        >
          Why Choose ToKnowAI?
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <FeatureCard
            icon={<CodeIcon className="w-12 h-12" />}
            title="Learn to Code"
            description="Master programming fundamentals with hands-on projects."
            variants={itemVariants}
          />
          <FeatureCard
            icon={<FrameIcon className="w-12 h-12" />}
            title="AI Specialization"
            description="Dive deep into artificial intelligence and machine learning."
            variants={itemVariants}
          />
          <FeatureCard
            icon={<LightningBoltIcon className="w-12 h-12" />}
            title="Fast-Track Learning"
            description="Accelerate your career with our efficient learning paths."
            variants={itemVariants}
          />
        </motion.div>
      </div>
    </section>
  )
}

const FeatureCard = ({ icon, title, description, variants }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  variants: any;
}) => (
  <motion.div variants={variants}>
    <Card className="flex flex-col items-center text-center p-8 bg-purple-900 border-purple-700 hover:bg-purple-800 transition-colors duration-300">
      <div className="text-white mb-6">{icon}</div>
      <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
      <p className="text-purple-200">{description}</p>
    </Card>
  </motion.div>
)

export default Features