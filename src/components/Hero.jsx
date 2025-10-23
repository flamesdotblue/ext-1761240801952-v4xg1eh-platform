import { useEffect, useRef } from 'react'
import { Shield, Cloud, Zap } from 'lucide-react'

export default function Hero() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = canvas.width = canvas.offsetWidth
    let height = canvas.height = canvas.offsetHeight

    const resize = () => {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    const nodes = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3
    }))

    let raf
    const render = () => {
      ctx.clearRect(0,0,width,height)
      for (let i=0;i<nodes.length;i++){
        const n = nodes[i]
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.2, 0, Math.PI*2)
        ctx.fillStyle = 'rgba(167,139,250,0.6)'
        ctx.fill()
      }
      for (let i=0;i<nodes.length;i++){
        for (let j=i+1;j<nodes.length;j++){
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d2 = dx*dx + dy*dy
          if (d2 < 130*130){
            const a = 1 - d2/(130*130)
            ctx.strokeStyle = `rgba(34,211,238,${a*0.35})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(render)
    }

    const ob = new ResizeObserver(resize)
    ob.observe(canvas)
    render()
    return () => {
      cancelAnimationFrame(raf)
      ob.disconnect()
    }
  }, [])

  useEffect(() => {
    const el = containerRef.current
    const onMove = (e) => {
      const title = el.querySelector('[data-hero-title]')
      if (!title) return
      const r = title.getBoundingClientRect()
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
      if (inside) title.classList.add('glitch')
      else title.classList.remove('glitch')
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section id="hero" ref={containerRef} className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black"/>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-white/70">
          <Shield size={14} className="text-emerald-400"/> Production-grade MLOps & GenAI Systems
        </div>
        <h1 data-hero-title className="mt-6 text-4xl sm:text-6xl font-semibold tracking-tight text-white hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.35)] transition">
          Transforming Data Science Prototypes into Resilient, Observable, and Scalable Multi-Cloud AI Systems
        </h1>
        <p className="mt-6 text-white/70 text-lg max-w-3xl mx-auto">High-throughput, production-scale deployments across AWS, Azure, and OCI — engineered with Kubernetes, Kafka, Airflow, and CI/CD. Expert in RAG, Agentic AI, and end-to-end GenAI pipelines.</p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <a href="#projects" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 hover:bg-emerald-500/30 hover:border-emerald-400/50 transition">
            <Zap size={18}/> View Proof
          </a>
          <a href="#rigor" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-cyan-500/20 border border-cyan-400/30 text-cyan-200 hover:bg-cyan-500/30 hover:border-cyan-400/50 transition">
            <Cloud size={18}/> Technical Rigor
          </a>
        </div>
      </div>
      <style>{`
        .glitch:hover { text-shadow: 0 0 18px rgba(59,130,246,0.35), 0 0 28px rgba(168,85,247,0.35); }
      `}</style>
    </section>
  )
}
