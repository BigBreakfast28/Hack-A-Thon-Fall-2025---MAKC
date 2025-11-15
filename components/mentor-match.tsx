'use client'

import { useState } from 'react'
import { Bot, User, MessageCircle, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function MentorMatch() {
  const [selectedMentor, setSelectedMentor] = useState<'ai' | 'human' | null>(null)
  const [question, setQuestion] = useState('')

  const mentorTypes = [
    {
      id: 'ai' as const,
      icon: Bot,
      title: 'AI Mentor Twin',
      description: '24/7 instant answers',
      features: ['Always available', 'Instant responses', 'Personalized guidance'],
      color: 'accent',
    },
    {
      id: 'human' as const,
      icon: User,
      title: 'Real Mentor',
      description: 'Critical moments support',
      features: ['Industry experts', 'Deep guidance', 'Personal connection'],
      color: 'highlight',
    },
  ]

  return (
    <section id="mentors" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Get <span className="text-accent">Mentorship That Scales</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            AI for 90% of questions. Humans for 10% of critical moments.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {mentorTypes.map((mentor) => {
              const Icon = mentor.icon
              return (
                <div
                  key={mentor.id}
                  onClick={() => setSelectedMentor(mentor.id)}
                  className={`bg-card border-2 rounded-3xl p-8 cursor-pointer transition-all duration-500 ${
                    selectedMentor === mentor.id
                      ? `border-${mentor.color} scale-105 shadow-2xl shadow-${mentor.color}/30`
                      : 'border-border hover:scale-102 hover:border-accent/50'
                  }`}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-500 ${
                    selectedMentor === mentor.id
                      ? `bg-${mentor.color}/20 scale-110`
                      : 'bg-secondary'
                  }`}>
                    <Icon className={`h-8 w-8 text-${mentor.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{mentor.title}</h3>
                  <p className="text-muted-foreground mb-6">{mentor.description}</p>
                  <ul className="space-y-3">
                    {mentor.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Zap className={`h-4 w-4 text-${mentor.color}`} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          {selectedMentor && (
            <div className="bg-card border border-accent rounded-3xl p-8 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="h-6 w-6 text-accent" />
                <h3 className="text-xl font-bold">
                  Ask Your {selectedMentor === 'ai' ? 'AI' : 'Real'} Mentor
                </h3>
              </div>
              <div className="flex gap-4">
                <Input
                  placeholder="What do you want to know?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="flex-1"
                />
                <Button className="bg-accent hover:bg-accent/90 transition-all duration-300 hover:scale-105">
                  Send
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
