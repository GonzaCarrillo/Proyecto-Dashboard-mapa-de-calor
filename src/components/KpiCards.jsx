import { Inbox, Clock, ShieldAlert, Truck, TrendingUp, TrendingDown } from 'lucide-react'
import { KPIS } from '../data/mockData'
import { formatValor, formatVariacion } from '../utils/format'

const ICONS = { Inbox, Clock, ShieldAlert, Truck }

const TONES = {
  activos: { ring: 'border-t-critico', icon: 'bg-red-50 text-red-600' },
  respuesta: { ring: 'border-t-jujuy-500', icon: 'bg-sky-50 text-jujuy-600' },
  riesgo: { ring: 'border-t-alerta', icon: 'bg-orange-50 text-orange-600' },
  eficiencia: { ring: 'border-t-optimo', icon: 'bg-green-50 text-green-600' },
}

export default function KpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {KPIS.map((kpi) => {
        const Icon = ICONS[kpi.icono]
        const tone = TONES[kpi.id]
        const positiva = kpi.tendenciaPositiva
        const TrendIcon = kpi.tendencia === 'up' ? TrendingUp : TrendingDown
        return (
          <div
            key={kpi.id}
            className={`card group relative overflow-hidden border-t-4 ${tone.ring} p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover`}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                {kpi.titulo}
              </p>
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tone.icon}`}>
                <Icon className="h-5 w-5" />
              </span>
            </div>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-3xl font-extrabold tracking-tight text-institucional-900">
                {formatValor(kpi.valor, kpi.formato)}
              </span>
              <span
                className={`mb-1 inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-bold ${
                  positiva ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}
              >
                <TrendIcon className="h-3 w-3" />
                {formatVariacion(kpi.variacion)}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-400">{kpi.detalle}</p>
          </div>
        )
      })}
    </div>
  )
}
