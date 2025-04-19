export function initAnimations() {
    const animateElements = document.querySelectorAll(
      ".animate-fade-in, .animate-slide-in-left, .animate-slide-in-right, .animate-scale-in",
    )
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-visible")
          }
        })
      },
      { threshold: 0.1 },
    )
  
    animateElements.forEach((element) => {
      observer.observe(element)
    })
  }
  