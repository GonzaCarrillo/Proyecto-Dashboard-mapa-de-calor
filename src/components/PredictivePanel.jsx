import { useMemo } from 'react'
import {
  ComposedChart,
  Area,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { BrainCircuit, TrendingUp, Sparkles, Target } from 'lucide-react'
import { SERIE_PREDICCION, CATEGORIA_PRONOSTICO } from '../data/mockData'

function TooltipReclamos({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const hist = payload.find((p) => p.dataKey === 'historico')
  const proy = payload.find((p) => p.dataKey === 'proyectado')
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-card">
      <p className="mb-1 font-bold text-institucional-900">{label}</p>
      {hist && (
        <p className="text-slate-600">
          Histórico: <span className="font-semibold">{hist.value}</span>
        </p>
      )}
      {proy && (
        <p className="text-jujuy-700">
          Proyectado IA: <span className="font-semibold">{proy.value}</span>
        </p>
      )}
    </div>
  )
}

function TooltipCategorias({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-card">
      <p className="mb-1 font-bold text-institucional-900">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-slate-600">
          {p.dataKey === 'historico' ? 'Histórico' : 'Proyectado'}: {p.value}
        </p>
      ))}
    </div>
  )
}

export default function PredictivePanel() {
  const serie = useMemo(
    () =>
      SERIE_PREDICCION.map((d) => ({
        semana: d.semana,
        historico: d.historico,
        proyectado: d.proyectado,
        banda:
          d.proyectado != null
            ? [Math.round(d.proyectado * 0.93), Math.round(d.proyectado * 1.07)]
            : null,
      })),
    [],
  )

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <div className="card p-4 xl:col-span-2">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-institucional-600 text-white">
            <BrainCircuit className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <h2 className="text-sm font-bold text-institucional-900">
              Proyección de Reclamos vs. Histórico
            </h2>
            <p className="text-[11px] text-slate-500">
              Pronóstico a 4 semanas · Intervalo de confianza 93%–107%
            </p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-700">
            <Sparkles className="h-3 w-3" /> MAPE 6.4%
          </span>
        </div>

        <div className="mt-3 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={serie} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="bandaIA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0284C7" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#0284C7" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="semana" tick={{ fontSize: 11, fill: '#64748B' }} tickLine={false} axisLine={{ stroke: '#E2E8F0' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} tickLine={false} axisLine={false} width={48} />
              <Tooltip content={<TooltipReclamos />} />
              <Legend
                wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
                formatter={(v) => (v === 'historico' ? 'Histórico' : v === 'proyectado' ? 'Proyección IA' : v)}
              />
              <Area type="monotone" dataKey="banda" stroke="none" fill="url(#bandaIA)" name="banda" legendType="none" />
              <Line
                type="monotone"
                dataKey="historico"
                stroke="#1E3A8A"
                strokeWidth={2.5}
                dot={{ r: 2.5, fill: '#1E3A8A' }}
                activeDot={{ r: 5 }}
                name="historico"
              />
              <Line
                type="monotone"
                dataKey="proyectado"
                stroke="#0284C7"
                strokeWidth={2.5}
                strokeDasharray="6 4"
                dot={{ r: 3, fill: '#0284C7' }}
                activeDot={{ r: 5 }}
                name="proyectado"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card p-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
            <Target className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <h2 className="text-sm font-bold text-institucional-900">Demanda por Categoría</h2>
            <p className="text-[11px] text-slate-500">Histórico vs. proyectado (30 días)</p>
          </div>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CATEGORIA_PRONOSTICO} margin={{ top: 8, right: 8, left: -18, bottom: 0 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="categoria" tick={{ fontSize: 10, fill: '#64748B' }} tickLine={false} axisLine={{ stroke: '#E2E8F0' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} tickLine={false} axisLine={false} width={40} />
              <Tooltip content={<TooltipCategorias />} cursor={{ fill: '#F1F5F9' }} />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} formatter={(v) => (v === 'historico' ? 'Histórico' : 'Proyectado')} />
              <Bar dataKey="historico" fill="#1E3A8A" radius={[4, 4, 0, 0]} maxBarSize={26} />
              <Bar dataKey="proyectado" fill="#38BDF8" radius={[4, 4, 0, 0]} maxBarSize={26} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 flex items-center gap-1.5 rounded-lg bg-violet-50 px-3 py-2 text-[11px] text-violet-700">
          <TrendingUp className="h-3.5 w-3.5 shrink-0" />
          Se anticipa un pico de baches (+13.6%) asociado a la temporada de lluvias.
        </p>
      </div>
    </div>
  )
}
