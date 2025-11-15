export function Stats() {
  const stats = [
    {
      value: '3 out of 4',
      label: "high schoolers don't feel confident making decisions about careers*",
    },
    {
      value: '1M',
      label: 'youth discovering their spark',
    },
    {
      value: '500K',
      label: 'getting jobs through our platform',
    },
    {
      value: '50%',
      label: 'entertainment industry becoming diverse',
    },
  ]

  return (
    <section className="py-16 sm:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-base sm:text-lg text-muted-foreground italic max-w-3xl mx-auto text-balance">
            SparkQuest turns student interests into clear next steps - courses, careers, and life after high school.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent">
                {stat.value}
              </div>
              <p className="text-sm sm:text-base text-foreground text-balance">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
