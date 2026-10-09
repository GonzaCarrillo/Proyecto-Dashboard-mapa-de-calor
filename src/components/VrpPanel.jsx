import { Route, Truck, Gauge, Fuel, MapPinned, CheckCircle2, Loader2, Database } from 'lucide-react'
import { CUADRILLAS, LOG_ETL } from '../data/mockData'

const RUTAS = [
  {
    cuadrilla: 'C-03 Vialidad',
    vehiculo: 'Camión Vial Ford 1722',
    paradas: 6,
    km: 18.4,
    avance: 62,
    zona: 'Centro → Los Perales',
    ahorro: '2.1 h',
    estado: 'activa',
  },
  {
    cuadrilla: 'C-07 Electricidad',
    vehiculo: 'Camioneta 4x4 Hilux',
    paradas: 5,
    km: 24.7,
    avance: 40,
    zona: 'Alto Comedero',
    ahorro: '1.4 h',
    estado: 'activa',
  },
  {
    cuadrilla: 'C-05 Residuos',
    vehiculo: 'Compactador Iveco',
    paradas: 8,
    km: 31.2,
    avance: 78,
    zona: 'Cuyaya → Chijra',
    ahorro: '1.9 h',
    estado: 'activa',
  },
  {
    cuadrilla: 'C-09 Espacios Verdes',
    vehiculo: 'Camión con hidroelevador',
    paradas: 4,
    km: 15.6,
    avance: 25,
    zona: 'Chijra → Parque Xibi-Xibi',
    ahorro: '0.8 h',
    estado: 'activa',
  },
]

export default function VrpPanel() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <div className="xl:col-span-2">
        <div className="card p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-jujuy-500 to-institucional-600 text-white">
              <Route className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <h2 className="text-sm font-bold text-institucional-900">
                Optimización de Rutas (VRP) · Despacho de Cuadrillas
              </h2>
              <p className="text-[11px] text-slate-500">
                Rutas recalculadas por Vehicle Routing Problem · ventana operativa del día
              </p>
            </div>
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-700">
              <Gauge className="h-3 w-3" /> 84% eficiencia
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {RUTAS.map((r) => (
              <div
                key={r.cuadrilla}
                className="rounded-lg border border-slate-200 p-4 transition hover:border-jujuy-300 hover:shadow-card"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-jujuy-50 text-jujuy-700">
                      <Truck className="h-4 w-4" />
                    </span>
                    <div className="leading-tight">
                      <p className="text-sm font-bold text-slate-800">{r.cuadrilla}</p>
                      <p className="text-[11px] text-slate-500">{r.vehiculo}</p>
                    </div>
                  </div>
                  <span className="badge bg-emerald-50 text-emerald-700">
                    <Loader2 className="h-3 w-3 animate-spin" /> En ruta
                  </span>
                </div>

                <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                  <MapPinned className="h-3.5 w-3.5 text-jujuy-600" /> {r.zona}
                </p>

                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-md bg-slate-50 py-1.5">
                    <p className="text-[10px] uppercase text-slate-400">Paradas</p>
                    <p className="text-sm font-bold text-slate-700">{r.paradas}</p>
                  </div>
                  <div className="rounded-md bg-slate-50 py-1.5">
                    <p className="text-[10px] uppercase text-slate-400">Km</p>
                    <p className="text-sm font-bold text-slate-700">{r.km}</p>
                  </div>
                  <div className="rounded-md bg-slate-50 py-1.5">
                    <p className="text-[10px] uppercase text-slate-400">Ahorro</p>
                    <p className="text-sm font-bold text-green-600">{r.ahorro}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="mb-1 flex justify-between text-[10px] font-semibold text-slate-500">
                    <span>Avance de ruta</span>
                    <span>{r.avance}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-jujuy-500 to-institucional-600 transition-all duration-700"
                      style={{ width: `${r.avance}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="card p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-jujuy-600">
              <Fuel className="h-4 w-4" />
            </span>
            <h2 className="text-sm font-bold text-institucional-900">Impacto Logístico (30 días)</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Combustible ahorrado', valor: '318 L', pct: 22 },
              { label: 'Horas operativas ahorradas', valor: '46.5 h', pct: 18 },
              { label: 'Reclamos resueltos en 1ª visita', valor: '71%', pct: 71 },
              { label: 'Reducción de tiempos de respuesta', valor: '-6.8%', pct: 34 },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">{m.label}</span>
                  <span className="font-bold text-slate-700">{m.valor}</span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-jujuy-500"
                    style={{ width: `${m.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Database className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <h2 className="text-sm font-bold text-institucional-900">Pipeline ETL · Última ejecución</h2>
              <p className="text-[11px] text-slate-500">Extracción, transformación y carga</p>
            </div>
          </div>
          <ol className="space-y-2.5">
            {LOG_ETL.map((l, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-slate-700">{l.evento}</p>
                  <p className="text-[10px] text-slate-400">
                    {l.hora} · {l.registros} registros
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-[11px] text-slate-500">
            {CUADRILLAS.length} cuadrillas sincronizadas con el Data Warehouse municipal.
          </p>
        </div>
      </div>
    </div>
  )
}
