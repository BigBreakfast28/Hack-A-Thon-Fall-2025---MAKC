'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Zap, ArrowRight } from 'lucide-react'

export function CTA() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-accent via-accent to-highlight rounded-3xl p-8 sm:p-12 lg:p-16 text-center text-accent-foreground transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-accent-foreground/10 rounded-2xl mb-6 sm:mb-8 transition-transform duration-500 hover:scale-110 hover:rotate-12">
            <Zap className="h-8 w-8 sm:h-10 sm:w-10" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-balance">
            Ready to Discover Your Spark Capital?
          </h2>
          <p className="text-lg sm:text-xl mb-8 opacity-90 text-balance">
            Join thousands of youth turning their passion into careers. AI-powered discovery. Human-guided growth. Completely free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 w-full sm:w-auto transition-all duration-300 hover:scale-105 group"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-accent-foreground/20 text-accent-foreground hover:bg-accent-foreground/10 w-full sm:w-auto transition-all duration-300 hover:scale-105"
            >
              Watch Demo
            </Button>
          </div>
          <p className="text-sm mt-6 opacity-75">No credit card. No waitlist. Start discovering today.</p>
        </div>

        <footer className="mt-16 sm:mt-24 pt-8 sm:pt-12 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-accent rounded-lg p-2 transition-transform duration-300 hover:scale-110 hover:rotate-12">
                <Zap className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold">SparkQuest</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-accent transition-all duration-300 hover:scale-110">Privacy</a>
              <a href="#" className="hover:text-accent transition-all duration-300 hover:scale-110">Terms</a>
              <a href="#" className="hover:text-accent transition-all duration-300 hover:scale-110">Contact</a>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            © 2025 SparkQuest. Making talent visible with AI.
          </p>
        </footer>
      </div>
    </section>
  )
}
