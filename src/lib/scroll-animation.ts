export function initScrollAnimations() {
    // Scroll trigger animations
    const scrollTriggerElements = document.querySelectorAll(
      ".scroll-trigger, .scroll-trigger-left, .scroll-trigger-right, .scroll-trigger-scale",
    )
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    )
  
    scrollTriggerElements.forEach((element) => {
      observer.observe(element)
    })
  
    // Interactive elements
    const interactiveElements = document.querySelectorAll(".interactive-element")
  
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        element.classList.add("hovered")
      })
  
      element.addEventListener("mouseleave", () => {
        element.classList.remove("hovered")
      })
  
      element.addEventListener("click", () => {
        element.classList.add("clicked")
        setTimeout(() => {
          element.classList.remove("clicked")
        }, 300)
      })
    })
  
    // Animated counters
    const animatedCounters = document.querySelectorAll(".animated-counter")
  
    animatedCounters.forEach((counter) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = counter.getAttribute("data-target")
              const suffix = counter.getAttribute("data-suffix") || ""
              const duration = Number.parseInt(counter.getAttribute("data-duration") || "2000")
              const delay = Number.parseInt(counter.getAttribute("data-delay") || "0")
  
              if (target) {
                setTimeout(() => {
                  animateCounter(counter, target, suffix, duration)
                }, delay)
              }
  
              observer.unobserve(counter)
            }
          })
        },
        { threshold: 0.5 },
      )
  
      observer.observe(counter)
    })
  }
  
  function animateCounter(element: Element, target: string, suffix: string, duration: number) {
    const start = 0
    const end = Number.parseInt(target.replace(/,/g, ""))
    const startTime = performance.now()
  
    function updateCounter(currentTime: number) {
      const elapsedTime = currentTime - startTime
      const progress = Math.min(elapsedTime / duration, 1)
  
      // Use easeOutExpo for smoother animation
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
  
      const currentValue = Math.floor(easedProgress * end)
  
      // Format with commas
      const formattedValue = currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      element.textContent = formattedValue + suffix
  
      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      }
    }
  
    requestAnimationFrame(updateCounter)
  }
  