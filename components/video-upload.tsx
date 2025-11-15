'use client'

import { useState, useRef } from 'react'
import { Upload, Video, Image, Music, FileText, Check, Sparkles, Plus, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function VideoUpload() {
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'system'; content: string; files?: string[] }>>([
    { type: 'system', content: 'Hey! Ready to discover your hidden talents? Upload any creative content and let our AI reveal your Spark Capital.' }
  ])
  const [inputText, setInputText] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setUploadedFiles(prev => [...prev, ...files])
    }
  }

  const handleSend = () => {
    if (uploadedFiles.length === 0 && !inputText.trim()) return

    const userMessage = {
      type: 'user' as const,
      content: inputText || 'Uploaded content for analysis',
      files: uploadedFiles.map(f => f.name)
    }
    setMessages(prev => [...prev, userMessage])
    
    setIsAnalyzing(true)
    setInputText('')
    setUploadedFiles([])

    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'system',
        content: `Amazing! I'm analyzing your content now. I can see you have potential in creative storytelling and visual design. Your Spark Capital is growing! 🎨✨`
      }])
      setIsAnalyzing(false)
    }, 2000)
  }

  const contentTypes = [
    { icon: Video, label: 'Videos', color: 'text-accent' },
    { icon: Image, label: 'Art', color: 'text-highlight' },
    { icon: Music, label: 'Music', color: 'text-accent' },
    { icon: FileText, label: 'Writing', color: 'text-highlight' },
  ]

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Start Your <span className="text-accent">Spark Journey</span>
            </h2>
            <p className="text-lg text-muted-foreground text-balance">
              Upload any creative content. Our AI analyzes it and reveals your hidden talents and potential.
            </p>
          </div>

          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
            {/* Messages area */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-6 py-4 ${
                      message.type === 'user'
                        ? 'bg-accent text-white'
                        : 'bg-secondary/50 text-foreground'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    {message.files && message.files.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.files.map((file, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg"
                          >
                            <Check className="h-4 w-4" />
                            <span className="text-xs font-medium">{file}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isAnalyzing && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-secondary/50 rounded-2xl px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-accent animate-spin" />
                      <span className="text-sm">Analyzing your spark...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Content type pills */}
            <div className="px-6 py-4 border-t border-border bg-secondary/30">
              <div className="flex flex-wrap gap-3 mb-4">
                {contentTypes.map((type, index) => {
                  const Icon = type.icon
                  return (
                    <button
                      key={index}
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full hover:border-accent transition-all duration-300 hover:scale-105"
                    >
                      <Icon className={`h-4 w-4 ${type.color}`} />
                      <span className="text-xs font-medium">{type.label}</span>
                    </button>
                  )
                })}
              </div>

              {uploadedFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent rounded-full text-xs"
                    >
                      <Check className="h-3 w-3 text-accent" />
                      <span>{file.name}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="video/*,image/*,audio/*,.pdf,.doc,.docx,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="shrink-0 rounded-full h-12 w-12 border-2 hover:border-accent hover:bg-accent/10 transition-all duration-300"
                >
                  <Plus className="h-5 w-5" />
                </Button>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Tell us about your creative work or upload files..."
                  className="flex-1 px-6 py-3 bg-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={uploadedFiles.length === 0 && !inputText.trim()}
                  className="shrink-0 rounded-full h-12 w-12 bg-accent hover:bg-accent/90 transition-all duration-300 hover:scale-105 disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
