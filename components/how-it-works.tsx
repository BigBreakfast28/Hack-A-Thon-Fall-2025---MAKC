'use client'

import { useState } from 'react'
import { Upload, Sparkles, Users, Briefcase } from 'lucide-react'

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  const steps = [
    {
      number: '01',
      icon: Upload,
      title: 'Upload Your Content',
      description: 'Share your creative videos, art, music, or any work you\'re proud of. No gatekeeping—just you being you.',
    },
    {
      number: '02',
      icon: Sparkles,
      title: 'Discover Hidden Talents',
      description: 'Our AI analyzes your content to reveal skills you didn\'t know you had and matches them to careers.',
    },
    {
      number: '03',
      icon: Users,
      title: 'Connect with Mentors',
      description: 'Get guidance from AI mentors 24/7 and real mentors for critical moments. Plus peer support from your community.',
    },
    {
      number: '04',
      icon: Briefcase,
      title: 'Land Opportunities',
      description: 'Access jobs, internships, and training programs. Completely free for youth, funded by employer partnerships.',
    },
  ]

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-balance">
            Your Journey to <span className="text-accent">Success</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Four simple steps from hidden talent to career opportunity
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div 
                key={index} 
                className="relative"
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {index < steps.length - 1 && (
                  <div className={`hidden lg:block absolute top-16 left-full w-full h-0.5 transition-all duration-500 -translate-x-4 ${
                    activeStep === index ? 'bg-gradient-to-r from-accent via-accent to-highlight' : 'bg-gradient-to-r from-accent to-transparent'
                  }`} />
                )}
                <div className={`bg-card border border-border rounded-2xl p-6 transition-all duration-500 cursor-pointer ${
                  activeStep === index 
                    ? 'border-accent scale-110 shadow-2xl shadow-accent/30 -translate-y-2' 
                    : 'hover:scale-105'
                }`}>
                  <div className={`text-5xl font-bold mb-4 transition-all duration-500 ${
                    activeStep === index ? 'text-accent' : 'text-accent/20'
                  }`}>{step.number}</div>
                  <div className="mb-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-500 ${
                      activeStep === index 
                        ? 'bg-accent/20 scale-110' 
                        : 'bg-accent/10'
                    }`}>
                      <Icon className={`h-6 w-6 text-accent transition-transform duration-500 ${
                        activeStep === index ? 'scale-125' : ''
                      }`} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
