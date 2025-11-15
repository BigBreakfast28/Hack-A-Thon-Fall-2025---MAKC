'use client'

import { useState } from 'react'
import { Sparkles, Users, Calendar, TrendingUp } from 'lucide-react'

export function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const features = [
    {
      icon: Sparkles,
      title: 'Skill Spark Detector',
      description:
        "We don't ask youth 'What are you good at?' We show them by analyzing their creative videos, their art, their music—their REAL life. That's where underprivileged youth already show talent.",
      color: 'text-accent',
      gradient: 'from-accent/10 to-accent/5',
    },
    {
      icon: Users,
      title: 'AI Mentor Twins',
      description:
        'Mentorship at scale without losing authenticity. AI handles 90% of questions 24/7. Real mentors handle 10% of critical moments. Both working together.',
      color: 'text-highlight',
      gradient: 'from-highlight/10 to-highlight/5',
    },
    {
      icon: Calendar,
      title: 'Community Hub',
      description:
        'Peer support scales mentorship exponentially. And peer support is MORE trusted than top-down mentorship. So we built for that reality.',
      color: 'text-accent',
      gradient: 'from-accent/10 to-accent/5',
    },
    {
      icon: TrendingUp,
      title: 'Career Pathways',
      description:
        'Connect discovered talents to real opportunities. From skill identification to job placement, we guide youth through their entire journey to success.',
      color: 'text-highlight',
      gradient: 'from-highlight/10 to-highlight/5',
    },
  ]

  return (
    <section id="features" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-balance">
            How We <span className="text-accent">Ignite Potential</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Four powerful features working together to discover, nurture, and launch careers
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 sm:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`bg-card border border-border rounded-2xl p-6 sm:p-8 transition-all duration-500 cursor-pointer ${
                  hoveredIndex === index
                    ? 'border-accent scale-105 shadow-2xl shadow-accent/20'
                    : 'hover:scale-102'
                }`}
              >
                <div className="mb-4 sm:mb-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${feature.gradient} rounded-xl transition-all duration-500 ${
                    hoveredIndex === index ? 'scale-110 rotate-6' : ''
                  }`}>
                    <Icon className={`h-6 w-6 sm:h-7 sm:w-7 ${feature.color} transition-transform duration-500 ${
                      hoveredIndex === index ? 'scale-110' : ''
                    }`} />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{feature.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
