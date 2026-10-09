import { Menu, MapPin, CalendarRange, Layers, BrainCircuit, RefreshCw, Circle } from 'lucide-react'
import { MUNICIPIOS, TIPOS_INCIDENCIA } from '../data/mockData'

function Select({ icon: Icon, label, value, onChange, options, renderOption }) {
  return (
    <label className="group flex flex-col gap-1">
      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        <Icon className="h-3 w-3" />
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-jujuy-500 focus:ring-2 focus:ring-jujuy-500/20"
      >
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {renderOption(opt)}
          </option>
        ))}
      </select>
    </label>
  )
}

export default function Header({ onOpenMenu, municipio, setMunicipio, tipo, setTipo, rango, setRango }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="flex flex-col gap-3 px-4 py-3 lg:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenMenu}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-extrabold tracking-tight text-institucional-900 sm:text-lg">
              Gobierno Abierto de Jujuy
              <span className="hidden font-semibold text-slate-400 sm:inline"> · </span>
              <span className="hidden text-jujuy-700 sm:inline">Centro de Mando Digital</span>
            </h1>
            <p className="truncate text-[11px] text-slate-500 sm:text-xs">
              Tablero Inteligente de Control de Gestión y Predicción de Reclamos Urbanos
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-700">
              <BrainCircuit className="h-3.5 w-3.5" />
              Modelo Predictivo Activo
              <span className="hidden text-emerald-500 sm:inline">· ML / XGBoost</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-[11px] font-semibold text-sky-700">
              <RefreshCw className="h-3.5 w-3.5 animate-spin [animation-duration:3.5s]" />
              Sincronización ETL
              <span className="inline-flex items-center gap-1 text-sky-500">
                <Circle className="h-2 w-2 fill-current" /> Actualizado
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Select
            icon={MapPin}
            label="Municipio / Barrio"
            value={municipio}
            onChange={setMunicipio}
            options={MUNICIPIOS}
            renderOption={(o) => o.nombre}
          />
          <Select
            icon={MapPin}
            label="Tipo de Incidencia"
            value={tipo}
            onChange={setTipo}
            options={[{ id: 'todas', nombre: 'Todas las incidencias' }, ...TIPOS_INCIDENCIA]}
            renderOption={(o) => o.nombre}
          />
          <Select
            icon={CalendarRange}
            label="Rango de Fechas"
            value={rango}
            onChange={setRango}
            options={[
              { id: '7d', nombre: 'Últimos 7 días' },
              { id: '30d', nombre: 'Últimos 30 días' },
              { id: '90d', nombre: 'Último trimestre' },
              { id: 'anio', nombre: 'Año en curso' },
            ]}
            renderOption={(o) => o.nombre}
          />
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <Layers className="h-3 w-3" />
              Estado de Capas
            </span>
            <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              {[
                { c: 'bg-critico', t: 'Abierto' },
                { c: 'bg-amber-500', t: 'Inspección' },
                { c: 'bg-optimo', t: 'Resuelto' },
              ].map((l) => (
                <span key={l.t} className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
                  <span className={`h-2.5 w-2.5 rounded-full ${l.c}`} />
                  {l.t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
