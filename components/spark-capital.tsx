'use client'

import { useState } from 'react'
import { Brain, Target, TrendingUp, Sparkles } from 'lucide-react'

export function SparkCapital() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const principles = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Our algorithms analyze your creative content to identify patterns, skills, and potential you might not even know you have.',
      stat: '98% Accuracy',
    },
    {
      icon: Target,
      title: 'Who You Are',
      description: "We don't just measure skills. We understand your unique creative voice, style, and the authentic way you express yourself.",
      stat: '50+ Dimensions',
    },
    {
      icon: TrendingUp,
      title: 'Who You Can Become',
      description: 'See your future potential mapped to real career paths. From where you are now to where your talents can take you.',
      stat: '1000+ Paths',
    },
    {
      icon: Sparkles,
      title: 'Your Spark Capital',
      description: "The unique combination of skills, interests, and potential that makes you valuable. It's not what you've done—it's what you can do.",
      stat: 'Unlimited',
    },
  ]

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-highlight rounded-full blur-3xl animate-pulse delay-700" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-sm font-medium text-accent mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4" />
            Introducing Spark Capital
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Beyond Skills: Measuring <span className="text-accent">Human Potential</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground text-balance">
            Every career platform measures what you can do. Only SparkQuest measures who you are—and who you can become.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {principles.map((principle, index) => {
            const Icon = principle.icon
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`bg-card border border-border rounded-2xl p-6 sm:p-8 transition-all duration-500 cursor-pointer ${
                  hoveredIndex === index
                    ? 'border-accent scale-105 shadow-2xl shadow-accent/20'
                    : ''
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`flex-shrink-0 w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    hoveredIndex === index ? 'scale-110 rotate-6 bg-accent/20' : ''
                  }`}>
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{principle.title}</h3>
                    <div className="text-sm font-semibold text-accent">{principle.stat}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{principle.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
