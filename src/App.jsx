import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CheckCircle2, Sparkles } from 'lucide-react'
import Sidebar from './components/Sidebar'
import { VISTAS } from './data/vistas'
import Header from './components/Header'
import KpiCards from './components/KpiCards'
import HeatMap from './components/HeatMap'
import PredictivePanel from './components/PredictivePanel'
import ZoneRanking from './components/ZoneRanking'
import OperationsTable from './components/OperationsTable'
import VrpPanel from './components/VrpPanel'
import { MUNICIPIOS } from './data/mockData'

function VistaTitulo({ vista }) {
  const cfg = VISTAS.find((v) => v.id === vista)
  if (!cfg) return null
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-institucional-700 text-white">
        <cfg.Icon className="h-4 w-4" />
      </span>
      <div className="leading-tight">
        <h2 className="text-base font-extrabold tracking-tight text-institucional-900">
          {cfg.nombre}
        </h2>
        <p className="text-[11px] text-slate-500">
          Municipalidad de Jujuy · actualizado en tiempo real
        </p>
      </div>
    </div>
  )
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [vista, setVista] = useState('vision')
  const [municipio, setMunicipio] = useState('ssj')
  const [tipo, setTipo] = useState('todas')
  const [rango, setRango] = useState('30d')
  const [focusIncident, setFocusIncident] = useState(null)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  const municipioNombre = useMemo(
    () => MUNICIPIOS.find((m) => m.id === municipio)?.nombre ?? '',
    [municipio],
  )

  const notificar = useCallback((msg) => {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 3200)
  }, [])

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const cambiarVista = (id) => {
    setVista(id)
    setSidebarOpen(false)
  }

  const focusEnMapa = (inc) => {
    setFocusIncident(inc)
    setVista('vision')
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar
        active={vista}
        onChange={cambiarVista}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          onOpenMenu={() => setSidebarOpen(true)}
          municipio={municipio}
          setMunicipio={setMunicipio}
          tipo={tipo}
          setTipo={setTipo}
          rango={rango}
          setRango={setRango}
        />

        <main className="flex-1 space-y-5 p-4 lg:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <VistaTitulo vista={vista} />
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-500">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
                {municipioNombre}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-violet-700">
                <Sparkles className="h-3 w-3" /> IA activa · scoring 72 h
              </span>
            </div>
          </div>

          {vista === 'vision' && (
            <div className="space-y-5 animate-fade-in">
              <KpiCards />
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                <div className="xl:col-span-2">
                  <HeatMap municipio={municipio} tipo={tipo} focusIncident={focusIncident} />
                </div>
                <ZoneRanking
                  onDispatch={(z) =>
                    notificar(`Cuadrilla ${z.cuadrilla} despachada a ${z.zona} (riesgo ${z.riesgo}%)`)
                  }
                />
              </div>
              <PredictivePanel />
              <OperationsTable
                onFocus={focusEnMapa}
                onDispatch={(inc) => notificar(`Reclamo ${inc.id} asignado a ${inc.cuadrilla}`)}
              />
            </div>
          )}

          {vista === 'prediccion' && (
            <div className="space-y-5 animate-fade-in">
              <KpiCards />
              <PredictivePanel />
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                <div className="xl:col-span-2">
                  <HeatMap municipio={municipio} tipo={tipo} focusIncident={focusIncident} />
                </div>
                <ZoneRanking
                  onDispatch={(z) =>
                    notificar(`Despacho preventivo: ${z.cuadrilla} → ${z.zona}`)
                  }
                />
              </div>
            </div>
          )}

          {vista === 'despacho' && (
            <div className="space-y-5 animate-fade-in">
              <VrpPanel />
              <OperationsTable
                onFocus={focusEnMapa}
                onDispatch={(inc) => notificar(`Reclamo ${inc.id} asignado a ${inc.cuadrilla}`)}
              />
            </div>
          )}

          {vista === 'open311' && (
            <div className="space-y-5 animate-fade-in">
              <HeatMap municipio={municipio} tipo={tipo} focusIncident={focusIncident} />
              <OperationsTable
                onFocus={focusEnMapa}
                onDispatch={(inc) => notificar(`Reclamo ${inc.id} derivado a ${inc.cuadrilla}`)}
              />
            </div>
          )}

          <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-4 text-[11px] text-slate-400">
            <p>
              Prototipo MVP · Datos simulados con fines demostrativos · Gobierno Abierto de Jujuy
            </p>
            <p>React + Tailwind CSS · Leaflet · Recharts</p>
          </footer>
        </main>
      </div>

      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-card-hover animate-fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          {toast}
        </div>
      )}
    </div>
  )
}
