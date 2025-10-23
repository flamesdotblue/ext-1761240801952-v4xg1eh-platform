import { useState } from 'react'
import { ExternalLink } from 'lucide-react'

export default function Projects(){
  const [open, setOpen] = useState(null)

  const projects = [
    {
      id: 'etl',
      title: 'ETL Pipeline Automation',
      highlight: '94.9% data freshness',
      summary: 'Airflow-orchestrated multi-cloud ETL with AWS Glue, Azure Data Factory; Kafka/Snowflake for petabyte-scale flow.',
      details: [
        'Airflow (Certified) DAGs coordinating cross-cloud data sync across AWS & Azure',
        'Kafka streaming ingestion; Snowflake warehousing with time-partitioned optimization',
        'Automated SLAs & alerting; freshness maintained at 94.9% across domains'
      ]
    },
    {
      id: 'shar',
      title: 'SHAR — Suspicious Human Activity Recognition',
      highlight: 'Real-time ViT-LSTM detection',
      summary: 'PyTorch-based ViT-LSTM system for continuous surveillance with optimized inference pipelines.',
      details: [
        'Vision Transformer embeddings fused with LSTM temporal reasoning',
        'ONNX/TensorRT optimized inference for edge deployment',
        'Real-time streaming with Kafka; containerized microservices'
      ]
    },
    {
      id: 'xai',
      title: 'Fraud Detection with Explainability',
      highlight: 'AUC 0.98 | Transparency 0.90',
      summary: 'XGBoost + SHAP with containerized Flask API and Power BI dashboard.',
      details: [
        'AUC 0.98 on holdout; SHAP-based explanations aggregated by segment',
        'Flask API for scoring; Dockerized CI/CD to multi-cloud targets',
        'Power BI dashboards for stakeholder transparency (0.90 transparency score)'
      ]
    }
  ]

  return (
    <section id="projects" className="relative py-24 sm:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-2 text-white/80">
          <div className="w-10 h-[2px] bg-gradient-to-r from-purple-500 to-emerald-400"/>
          <span className="uppercase tracking-widest text-xs">Projects</span>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <Card key={p.id} project={p} onOpen={() => setOpen(p)} />
          ))}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-6" onClick={() => setOpen(null)}>
          <div className="relative max-w-2xl w-full rounded-2xl bg-zinc-950 border border-white/10 p-6" onClick={(e)=>e.stopPropagation()}>
            <button onClick={()=>setOpen(null)} className="absolute top-3 right-3 text-white/50 hover:text-white">✕</button>
            <h4 className="text-2xl font-semibold">{open.title}</h4>
            <p className="mt-1 text-emerald-300 text-sm">{open.highlight}</p>
            <p className="mt-3 text-white/70">{open.summary}</p>
            <ul className="mt-4 list-disc pl-5 text-white/80 space-y-2">
              {open.details.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
            <div className="mt-6 flex items-center justify-end">
              <a href="#" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10">
                <ExternalLink size={16}/> Explore Demo
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function Card({ project, onOpen }){
  const onMouseMove = (e) => {
    const card = e.currentTarget
    const r = card.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const rx = -((y - r.height/2) / r.height) * 8
    const ry = ((x - r.width/2) / r.width) * 12
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
    card.style.setProperty('--mx', `${x}px`)
    card.style.setProperty('--my', `${y}px`)
  }
  const onLeave = (e) => {
    const card = e.currentTarget
    card.style.transform = 'rotateX(0) rotateY(0)'
  }

  return (
    <div onMouseMove={onMouseMove} onMouseLeave={onLeave} onClick={onOpen} className="relative cursor-pointer rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgba(168,85,247,0.15),transparent_60%)] bg-zinc-950 p-5 transition-transform will-change-transform">
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-30" style={{background: 'conic-gradient(from 180deg at 50% 50%, rgba(34,211,238,0.25), rgba(168,85,247,0.25), rgba(34,197,94,0.25), rgba(34,211,238,0.25))'}} />
      <div className="relative z-10">
        <div className="text-xs uppercase tracking-wider text-white/60">{project.highlight}</div>
        <h4 className="mt-2 text-xl font-semibold">{project.title}</h4>
        <p className="mt-2 text-white/70 text-sm">{project.summary}</p>
        <div className="mt-4 inline-flex items-center gap-2 text-cyan-300 text-sm">Open details <ExternalLink size={14}/></div>
      </div>
    </div>
  )
}
