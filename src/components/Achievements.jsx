import { useEffect, useRef, useState } from 'react'
import { Award } from 'lucide-react'

export default function Achievements(){
  const [leetcode, setLeetcode] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0
        const end = 1700
        const startTime = performance.now()
        const dur = 1200
        const step = (t) => {
          const p = Math.min(1, (t - startTime)/dur)
          const eased = 1 - Math.pow(1 - p, 3)
          setLeetcode(Math.floor(start + (end - start) * eased))
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
        obs.disconnect()
      }
    }, { threshold: 0.4 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="achievements" ref={sectionRef} className="relative py-24 sm:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-2 text-white/80">
          <div className="w-10 h-[2px] bg-gradient-to-r from-emerald-400 to-cyan-400"/>
          <span className="uppercase tracking-widest text-xs">Key Achievements & Proof</span>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <StatCard title="LeetCode Top 9.82% Ranking" value={`${leetcode}+`} subtitle="1700+ problems solved" accent="from-purple-500 to-cyan-400" icon={<Award className="text-purple-300" size={18}/>} />
          <StatCard title="Reduced Model Deployment Latency" value="40ms" subtitle="via containerization & CI/CD" accent="from-emerald-500 to-cyan-400" />
          <StatCard title="Automated Deployment Workflow" value="30%" subtitle="reduction in manual steps" accent="from-pink-500 to-purple-400" />
        </div>

        <div className="mt-10 overflow-hidden">
          <div className="text-xs uppercase tracking-wider text-white/50 mb-3">Certification Carousel</div>
          <div className="relative">
            <div className="animate-marquee flex gap-6 whitespace-nowrap will-change-transform">
              {[
                'OCI Data Science Professional',
                'Astronomer DAG Authoring',
                'Databricks AI Agent Fundamentals',
                'Apache Airflow Certified',
                'Databricks GenAI Certified'
              ].map((t, i) => (
                <div key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"/>
                  {t}
                </div>
              ))}
              {[
                'OCI Data Science Professional',
                'Astronomer DAG Authoring',
                'Databricks AI Agent Fundamentals',
                'Apache Airflow Certified',
                'Databricks GenAI Certified'
              ].map((t, i) => (
                <div key={`dup-${i}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"/>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .animate-marquee { animation: marquee 22s linear infinite; }
        @keyframes marquee { from { transform: translateX(0%);} to { transform: translateX(-50%);} }
      `}</style>
    </section>
  )
}

function StatCard({ title, value, subtitle, accent, icon }){
  return (
    <div className="relative overflow-hidden rounded-2xl p-5 bg-white/5 border border-white/10 group">
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br ${`from-transparent via-white/[0.02] to-white/[0.06]`}`}></div>
      <div className={`absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-30 bg-gradient-to-tr ${accent}`}/>
      <div className="relative z-10">
        <div className="text-white/70 text-xs uppercase tracking-wider flex items-center gap-2">{icon} {title}</div>
        <div className="mt-3 text-4xl font-semibold">{value}</div>
        <div className="mt-1 text-white/60 text-sm">{subtitle}</div>
      </div>
    </div>
  )
}
