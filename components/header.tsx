import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-2">
            <div className="bg-accent rounded-lg p-2">
              <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-accent-foreground" />
            </div>
            <span className="text-xl sm:text-2xl font-bold">SparkQuest</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <a href="#features" className="text-sm font-medium hover:text-accent transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-accent transition-colors">
              How It Works
            </a>
            <a href="#mentors" className="text-sm font-medium hover:text-accent transition-colors">
              Mentors
            </a>
            <a href="#impact" className="text-sm font-medium hover:text-accent transition-colors">
              Impact
            </a>
          </nav>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Start Your Journey
          </Button>
        </div>
      </div>
    </header>
  )
}
