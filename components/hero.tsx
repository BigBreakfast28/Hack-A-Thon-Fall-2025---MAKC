'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Video, Music, Palette, Brain } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
      <div className="absolute top-20 right-10 sm:right-20 w-32 h-32 sm:w-48 sm:h-48 opacity-20 animate-pulse">
        <div className="absolute inset-0 bg-accent rounded-full blur-3xl" />
      </div>
      <div className="absolute bottom-10 left-10 sm:left-20 w-24 h-24 sm:w-32 sm:h-32 opacity-20 animate-pulse delay-700">
        <div className="absolute inset-0 bg-highlight rounded-full blur-3xl" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-10 animate-pulse delay-300">
        <div className="absolute inset-0 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-sm font-medium text-accent animate-fade-in">
              <Brain className="h-4 w-4" />
              AI-Powered Talent Discovery
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-balance animate-fade-in">
              Discover + Ignite{' '}
              <span className="text-accent">Your Spark</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed text-pretty">
              Every career platform measures what you can do. Only SparkQuest measures who you are—and who you can become. We call it <span className="font-semibold text-accent">"Spark Capital"</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 hover:scale-105 group"
              >
                Start Discovery
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-accent/30 hover:bg-accent/10 transition-all duration-300 hover:scale-105"
              >
                See How It Works
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 hover:border-accent transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-accent/20 cursor-pointer group">
                  <Video className="h-8 w-8 sm:h-10 sm:w-10 text-accent mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Creative Videos</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Your story, your way</p>
                </div>
                <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 hover:border-highlight transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-highlight/20 cursor-pointer group">
                  <Palette className="h-8 w-8 sm:h-10 sm:w-10 text-highlight mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Your Art</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Visual genius unlocked</p>
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6 pt-8 sm:pt-12">
                <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 hover:border-accent transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-accent/20 cursor-pointer group">
                  <Music className="h-8 w-8 sm:h-10 sm:w-10 text-accent mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Music</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Your rhythm, your rules</p>
                </div>
                <div className="bg-gradient-to-br from-accent/20 to-highlight/20 border border-accent rounded-2xl p-6 sm:p-8 flex items-center justify-center hover:scale-105 transition-all duration-500 cursor-pointer">
                  <Sparkles className="h-12 w-12 sm:h-16 sm:w-16 text-accent animate-pulse" />
                </div>
              </div>
            </div>
            <p className="text-center mt-8 text-sm sm:text-base font-semibold text-accent animate-fade-in">
              Any content. Any format. You rule the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
