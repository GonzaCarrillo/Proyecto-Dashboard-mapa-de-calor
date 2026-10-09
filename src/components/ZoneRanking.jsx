import { AlertTriangle, MapPin, Users, Clock3, ArrowUpRight } from 'lucide-react'
import { ZONAS_RIESGO } from '../data/mockData'
import { riesgoTone } from '../utils/format'

export default function ZoneRanking({ onDispatch }) {
  return (
    <div className="card p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-critico">
          <AlertTriangle className="h-4 w-4" />
        </span>
        <div className="leading-tight">
          <h2 className="text-sm font-bold text-institucional-900">
            Ranking de Zonas de Alto Riesgo Preventivo
          </h2>
          <p className="text-[11px] text-slate-500">
            Priorización proactiva generada por el modelo XGBoost
          </p>
        </div>
      </div>

      <div className="space-y-2.5">
        {ZONAS_RIESGO.map((z, i) => {
          const tone = riesgoTone(z.riesgo)
          return (
            <div
              key={z.id}
              className="group rounded-lg border border-slate-200 p-3 transition hover:border-jujuy-300 hover:bg-slate-50"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500 group-hover:bg-jujuy-100 group-hover:text-jujuy-700">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-bold text-slate-800">{z.zona}</p>
                    <span
                      className="badge"
                      style={{ backgroundColor: tone.bg, color: tone.text }}
                    >
                      {tone.label} · {z.riesgo}%
                    </span>
                  </div>
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
                    <MapPin className="h-3 w-3" /> {z.barrio} · {z.categoria}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-600">{z.causa}</p>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Users className="h-3 w-3" /> {z.cuadrilla}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="h-3 w-3" /> Horizonte {z.horizonte}
                    </span>
                  </div>
                </div>

                <div className="hidden w-24 shrink-0 sm:block">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${z.riesgo}%`, backgroundColor: tone.color }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => onDispatch?.(z)}
                  className="shrink-0 self-center rounded-md border border-slate-200 p-1.5 text-slate-500 transition hover:border-jujuy-300 hover:bg-jujuy-50 hover:text-jujuy-700"
                  title="Despachar cuadrilla preventiva"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
