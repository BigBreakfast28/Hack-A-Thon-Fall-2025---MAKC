export function Testimonials() {
  const testimonials = [
    {
      quote: "SparkQuest helped me see that my cooking videos weren't just fun—they were showing real culinary skills. Now I'm training to be a chef!",
      author: 'Maria Rodriguez',
      role: 'Culinary Arts Student',
    },
    {
      quote: 'I never thought my music production hobby could be a career. The AI mentor answered my questions instantly, and my real mentor helped me land an internship.',
      author: 'James Chen',
      role: 'Audio Engineering Intern',
    },
    {
      quote: 'The community support made all the difference. Seeing other youth succeed gave me confidence that I could too. Now I have a job in video production.',
      author: 'Aisha Williams',
      role: 'Video Producer',
    },
  ]

  return (
    <section id="impact" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-balance">
            What Our <span className="text-accent">Community Says</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 hover:border-accent transition-all duration-300"
            >
              <p className="text-sm sm:text-base text-muted-foreground italic mb-6 leading-relaxed text-pretty">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
