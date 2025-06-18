// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Header background change on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.backdropFilter = "blur(10px)"
  } else {
    header.style.background = "#fff"
    header.style.backdropFilter = "none"
  }
})

// Form submission
const contactForm = document.querySelector(".contact-form")
contactForm.addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const name = this.querySelector('input[type="text"]').value
  const email = this.querySelector('input[type="email"]').value
  const phone = this.querySelector('input[type="tel"]').value
  const message = this.querySelector("textarea").value

  // Simple validation
  if (!name || !email || !message) {
    alert("Por favor, preencha todos os campos obrigatórios.")
    return
  }

  // Simulate form submission
  alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")
  this.reset()
})

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".service-card, .product-card, .about-text, .about-image").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Counter animation for stats
const animateCounters = () => {
  const counters = document.querySelectorAll(".stat h4")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.textContent.replace("+", ""))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current) + "+"
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target + "+"
      }
    }

    updateCounter()
  })
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters()
        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

const statsSection = document.querySelector(".stats")
if (statsSection) {
  statsObserver.observe(statsSection)
}

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "1"
})

// Initial page load animation
document.body.style.opacity = "0"
document.body.style.transition = "opacity 0.5s ease"
