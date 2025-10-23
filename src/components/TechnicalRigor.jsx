import { useEffect, useRef } from 'react'
import { Cpu, GitBranch, Database, Boxes } from 'lucide-react'

export default function TechnicalRigor(){
  const cubeRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        cubeRef.current?.classList.add('animate')
      } else {
        cubeRef.current?.classList.remove('animate')
      }
    }, { threshold: 0.3 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="rigor" ref={sectionRef} className="relative py-24 sm:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-2 text-white/80">
          <div className="w-10 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500"/>
          <span className="uppercase tracking-widest text-xs">Technical Rigor</span>
        </div>
        <div className="mt-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl sm:text-4xl font-semibold">Battle-tested Stack for Production AI</h3>
            <p className="mt-4 text-white/70">MLOps pillars and GenAI systems engineered for throughput, observability, and reliability across multi-cloud environments.</p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="flex items-center gap-2 text-cyan-300"><Boxes size={16}/> MLOps Pillars</div>
                <p className="mt-2 text-sm text-white/70">Kubernetes, Apache Kafka, Apache Airflow (Certified), CI/CD, Flask APIs</p>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="flex items-center gap-2 text-emerald-300"><Cpu size={16}/> GenAI Specialization</div>
                <p className="mt-2 text-sm text-white/70">RAG, Agentic AI, LLMs, LangChain, Databricks GenAI Certified</p>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="flex items-center gap-2 text-purple-300"><Database size={16}/> Cloud & Data</div>
                <p className="mt-2 text-sm text-white/70">Multi-Cloud (OCI, AWS, Azure), Snowflake, PySpark, PyTorch</p>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="flex items-center gap-2 text-fuchsia-300"><GitBranch size={16}/> Explainability</div>
                <p className="mt-2 text-sm text-white/70">XGBoost, SHAP (Explainable AI), Time Series, Computer Vision</p>
              </div>
            </div>
          </div>

          <div className="relative aspect-square mx-auto w-full max-w-md perspective-[1200px]">
            <div ref={cubeRef} className="skill-cube absolute inset-0 m-auto w-64 h-64 [transform-style:preserve-3d] transition-transform duration-700">
              <Face className="rotate-y-0 translate-z-32" title="MLOps" bullets={["Kubernetes","Kafka","Airflow (Certified)","CI/CD","Flask APIs"]} color="from-cyan-400 to-emerald-400"/>
              <Face className="rotate-y-90 translate-z-32" title="GenAI" bullets={["RAG","Agentic AI","LLMs","LangChain","Databricks GenAI Cert."]} color="from-purple-400 to-fuchsia-400"/>
              <Face className="rotate-y-180 translate-z-32" title="Cloud" bullets={["OCI","AWS","Azure","Snowflake","PySpark"]} color="from-emerald-400 to-cyan-400"/>
              <Face className="-rotate-y-90 translate-z-32" title="Modeling" bullets={["PyTorch","XGBoost","SHAP","CV/TS"]} color="from-pink-400 to-purple-400"/>
              <div className="absolute -translate-z-32 inset-0 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0"/>
              <div className="absolute translate-z-32 inset-0 rounded-2xl border border-white/10"/>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-\[1200px\] { perspective: 1200px; }
        .translate-z-32 { transform: translateZ(8rem); }
        .-translate-z-32 { transform: translateZ(-8rem); }
        .skill-cube.animate { animation: spin 12s linear infinite; }
        .skill-cube:hover { animation-duration: 6s; }
        @keyframes spin { from { transform: rotateY(0deg) rotateX(10deg); } to { transform: rotateY(360deg) rotateX(10deg); } }
      `}</style>
    </section>
  )
}

function Face({ title, bullets, color, className }){
  return (
    <div className={`absolute inset-0 grid place-items-center rounded-2xl border border-white/10 bg-white/5 [backface-visibility:hidden] ${className}`}>
      <div className="text-center px-6">
        <div className={`inline-flex px-3 py-1 rounded-full text-xs text-white/90 bg-gradient-to-r ${color} bg-clip-text text-transparent border border-white/10`}>{title}</div>
        <ul className="mt-3 space-y-1.5 text-sm text-white/80">
          {bullets.map((b, i) => (
            <li key={i}>• {b}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
