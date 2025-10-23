import { useEffect } from 'react'
import Hero from './components/Hero'
import TechnicalRigor from './components/TechnicalRigor'
import Achievements from './components/Achievements'
import Projects from './components/Projects'
import { Rocket, Linkedin, Github, Code2 } from 'lucide-react'

function Navbar() {
  useEffect(() => {
    const handler = () => {
      const nav = document.getElementById('top-nav')
      if (!nav) return
      if (window.scrollY > 20) {
        nav.classList.add('backdrop-blur-md', 'bg-black/40', 'shadow-xl')
      } else {
        nav.classList.remove('backdrop-blur-md', 'bg-black/40', 'shadow-xl')
      }
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav id="top-nav" className="fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-2xl border border-white/10 px-4 sm:px-6 py-3 flex items-center gap-6 text-sm text-white/90">
      <a href="#hero" className="hover:text-white transition">Ashwin Upadhyay</a>
      <div className="hidden sm:flex gap-4">
        <a href="#rigor" className="hover:text-white transition">Technical Rigor</a>
        <a href="#achievements" className="hover:text-white transition">Proof Points</a>
        <a href="#projects" className="hover:text-white transition">Projects</a>
        <a href="#cta" className="hover:text-white transition">Contact</a>
      </div>
    </nav>
  )
}

function CTASection() {
  useEffect(() => {
    const burst = (x, y) => {
      const container = document.getElementById('burst-layer')
      if (!container) return
      for (let i = 0; i < 12; i++) {
        const p = document.createElement('span')
        const angle = (Math.PI * 2 * i) / 12
        const dx = Math.cos(angle) * (8 + Math.random() * 16)
        const dy = Math.sin(angle) * (8 + Math.random() * 16)
        p.className = 'pointer-events-none absolute w-1 h-1 rounded-full'
        p.style.left = `${x}px`
        p.style.top = `${y}px`
        p.style.background = ['#22d3ee','#22c55e','#a78bfa'][i%3]
        p.style.opacity = '0.9'
        p.animate([
          { transform: 'translate(0,0) scale(1)', opacity: 0.9 },
          { transform: `translate(${dx}px, ${dy}px) scale(0.5)`, opacity: 0 }
        ], { duration: 700, easing: 'cubic-bezier(0.22,1,0.36,1)' })
        container.appendChild(p)
        setTimeout(() => p.remove(), 720)
      }
    }

    const links = Array.from(document.querySelectorAll('[data-burst]'))
    const onClick = (e) => {
      const rect = e.currentTarget.getBoundingClientRect()
      burst(rect.left + rect.width/2, rect.top + rect.height/2 + window.scrollY)
    }
    links.forEach(l => l.addEventListener('click', onClick))
    return () => links.forEach(l => l.removeEventListener('click', onClick))
  }, [])

  return (
    <section id="cta" className="relative py-24 sm:py-28">
      <div id="burst-layer" className="absolute inset-0 z-0"></div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-white/70 mb-4">
          <Rocket size={14} className="text-cyan-400"/> Ready for mission-critical AI systems
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">Request Secured Private Portfolio Access</h2>
        <p className="mt-4 text-white/70 max-w-2xl mx-auto">Get a curated deep dive into architecture diagrams, code walkthroughs, and production metrics. Response in 24 hours.</p>
        <div className="mt-8 mx-auto max-w-xl">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <input readOnly value="ashwinupadhyay09@gmail.com" className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 selection:bg-cyan-500/30" />
            <a data-burst href="mailto:ashwinupadhyay09@gmail.com?subject=Private%20Portfolio%20Access%20Request" className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 bg-cyan-500/20 border border-cyan-400/30 text-cyan-200 hover:bg-cyan-500/30 hover:border-cyan-400/50 transition shadow-[0_0_30px_rgba(34,211,238,0.15)]">Request Link</a>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <a data-burst href="https://www.linkedin.com/in/ashwin-upadhyay" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10">
              <Linkedin size={18}/> LinkedIn
            </a>
            <a data-burst href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10">
              <Github size={18}/> GitHub
            </a>
            <a data-burst href="https://leetcode.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10">
              <Code2 size={18}/> LeetCode
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('bg-black')
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-zinc-950 text-white font-inter selection:bg-purple-500/30">
      <Navbar />
      <main>
        <Hero />
        <TechnicalRigor />
        <Achievements />
        <Projects />
        <CTASection />
      </main>
      <footer className="py-10 text-center text-xs text-white/50">© {new Date().getFullYear()} Ashwin Upadhyay — Cloud-Native MLOps & Generative AI Systems Engineer</footer>
    </div>
  )
}
