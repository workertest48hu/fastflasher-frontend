"use client"

export default function StatsSection() {
  const stats = [
    {
      value: "2M+",
      numericValue: "2000000",
      label: "Trusted by People",
      description: "",
    },
    {
      value: "Thousands",
      numericValue: "10000",
      label: "Visited us",
      description: "Daily transaction on our website",
    },
    {
      value: "10-20",
      numericValue: "10-20",
      label: "Speed to Work",
      description:
        "FLASH delivered within few minutes",
    },
    {
      value: "100%",
      numericValue: "100",
      label: "tradable",
      description: "TOP TRUST",
    },
  ]

  return (
    <section id="stats" className="py-20">
      <div className="container mx-auto px-4 md:px-0">
        <div className="text-center mb-4">
          <div className="scroll-trigger text-sm font-medium text-white opacity-80 mb-2">ACCELERATE YOUR JOURNEY</div>
          <h2 className="scroll-trigger section-title text-white">
            Join the fastest
            <br />
            growing ecosystem
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {stats.map((stat, index) => (
            <div key={index} className="scroll-trigger border-l-2 border-white border-opacity-20 pl-6">
              <div className="text-4xl font-bold text-white mb-2">
                {stat.value.includes("M") ? (
                  <>
                    <span className="animated-counter" data-target={stat.numericValue} data-suffix=""></span>
                    <span>+</span>
                  </>
                ) : stat.value.includes("%") ? (
                  <>
                    <span className="animated-counter" data-target={stat.numericValue} data-suffix="%"></span>
                  </>
                ) : stat.value === "10x" ? (
                  <>
                    <span className="animated-counter" data-target={stat.numericValue} data-suffix="x"></span>
                  </>
                ) : (
                  <>
                    <span className="animated-counter" data-target={stat.numericValue} data-suffix=""></span>
                  </>
                )}
              </div>
              <h3 className="text-lg font-medium text-white mb-2">{stat.label}</h3>
              <p className="text-sm text-white text-opacity-80">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
