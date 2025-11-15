'use client'

import { useState, useEffect } from 'react'
import { Sparkles, TrendingUp, Users, Award } from 'lucide-react'

export function LiveFeed() {
  const [activeIndex, setActiveIndex] = useState(0)

  const activities = [
    {
      icon: Sparkles,
      name: 'Alex M.',
      action: 'discovered a talent in',
      skill: 'Video Editing',
      time: '2 mins ago',
      color: 'text-accent',
    },
    {
      icon: Users,
      name: 'Jordan T.',
      action: 'connected with mentor for',
      skill: 'Music Production',
      time: '5 mins ago',
      color: 'text-highlight',
    },
    {
      icon: Award,
      name: 'Sam K.',
      action: 'landed an internship in',
      skill: 'Graphic Design',
      time: '12 mins ago',
      color: 'text-accent',
    },
    {
      icon: TrendingUp,
      name: 'Casey L.',
      action: 'started learning',
      skill: 'Digital Art',
      time: '18 mins ago',
      color: 'text-highlight',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % activities.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [activities.length])

  return (
    <section className="py-16 sm:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Real People, <span className="text-accent">Real Progress</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            See what's happening right now on SparkQuest
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const Icon = activity.icon
              return (
                <div
                  key={index}
                  className={`bg-card border rounded-2xl p-6 transition-all duration-700 ${
                    activeIndex === index
                      ? 'border-accent scale-105 shadow-xl shadow-accent/20'
                      : 'border-border opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-500 ${
                      activeIndex === index ? 'bg-accent/20' : 'bg-secondary'
                    }`}>
                      <Icon className={`h-6 w-6 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">
                        {activity.name}{' '}
                        <span className="font-normal text-muted-foreground">
                          {activity.action}
                        </span>{' '}
                        <span className="text-accent">{activity.skill}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
