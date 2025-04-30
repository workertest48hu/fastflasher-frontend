"use client"

// Assuming you have an animated counter setup elsewhere that reads the data attributes.
// If not, the counter part won't animate but will show the initial value.

export default function StatsSection() {
  // Updated stats based on the image provided
  const stats = [
    {
      value: "2,000,000+", // Display value from image
      numericValue: "2000000", // Numeric value for potential counter
      label: "Trusted by People",
      description: "", // No description in image for this stat
    },
    {
      value: "10,000", // Display value from image
      numericValue: "10000", // Numeric value for potential counter
      label: "Visited us",
      description: "Daily transaction on our website", // Description from image
    },
    {
      // Special case: "High Volume" is the main value, details are split
      value: "High Volume", // Main large text from image
      numericValue: null, // Not a standard number for a counter
      label: "Selling 9,827,65+", // Mapped to label field
      description: "Flash USDT daily.", // Mapped to description field
    },
    {
      value: "100%", // Display value from image
      numericValue: "100", // Numeric value for potential counter
      label: "Trusted Platform",
      description: "Over 9,827,65 satisfied buyers.", // Description from image
    },
  ]

  return (
    <section id="stats" className="py-20">
      <div className="container mx-auto px-4 md:px-0">
        {/* Updated Headline */}
        <div className="text-center mb-12 md:mb-16"> {/* Increased bottom margin */}
          <div className="scroll-trigger text-sm font-medium text-white opacity-80 mb-2">ACCELERATE YOUR JOURNEY</div>
          <h2 className="scroll-trigger section-title text-4xl md:text-5xl font-bold text-white"> {/* Adjusted text size and weight */}
            Why You Choose Fast Flasher to buying crypto?
          </h2>
        </div>

        {/* Updated Grid Layout and Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"> {/* Removed mt-16 as mb added above */}
          {stats.map((stat, index) => (
            <div key={index} className="scroll-trigger border-l-2 border-white border-opacity-20 pl-6">
              {/* Updated Value Rendering Logic */}
              <div className="text-4xl font-bold text-white mb-2">
                {stat.numericValue && !isNaN(parseFloat(stat.numericValue)) ? (
                  // Use counter for numeric values
                  <>
                    <span
                      className="animated-counter" // Assumes a counter script targets this class
                      data-target={stat.numericValue}
                      // Add suffix based on original value string
                      data-suffix={stat.value.includes('%') ? '%' : ''}
                    >
                      {/* Optional: Display initial value or 0 before counter script runs */}
                      {/* {stat.numericValue} */}
                    </span>
                    {/* Add '+' if the original value string ends with it (and isn't a percentage) */}
                    {stat.value.endsWith('+') && !stat.value.includes('%') && <span>+</span>}
                  </>
                ) : (
                  // Display non-numeric values directly
                  <span>{stat.value}</span>
                )}
              </div>
              {/* Label and Description */}
              <h3 className="text-lg font-medium text-white mb-2">{stat.label}</h3>
              {stat.description && ( // Conditionally render description if it exists
                 <p className="text-sm text-white text-opacity-80">{stat.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
