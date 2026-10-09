import { useMemo, useState } from 'react'
import {
  Search,
  ClipboardList,
  Send,
  CheckCheck,
  Navigation,
  SlidersHorizontal,
} from 'lucide-react'
import { INCIDENCIAS, ESTADOS, TIPOS_INCIDENCIA } from '../data/mockData'
import EstadoBadge from './EstadoBadge'
import PrioridadBadge from './PrioridadBadge'

const FILTROS_ESTADO = [
  { id: 'todos', label: 'Todos' },
  { id: 'abierto', label: 'Abierto' },
  { id: 'inspeccion', label: 'En Inspección' },
  { id: 'resuelto', label: 'Resuelto' },
]

export default function OperationsTable({ onFocus, onDispatch }) {
  const [q, setQ] = useState('')
  const [estado, setEstado] = useState('todos')
  const [categoria, setCategoria] = useState('todas')
  const [despachadas, setDespachadas] = useState(() => new Set())

  const filas = useMemo(() => {
    const term = q.trim().toLowerCase()
    return INCIDENCIAS.filter((i) => {
      const okEstado = estado === 'todos' || i.estado === estado
      const okCat = categoria === 'todas' || i.categoria.toLowerCase().includes(categoria)
      const okQ =
        !term ||
        i.id.toLowerCase().includes(term) ||
        i.barrio.toLowerCase().includes(term) ||
        i.direccion.toLowerCase().includes(term) ||
        i.categoria.toLowerCase().includes(term)
      return okEstado && okCat && okQ
    })
  }, [q, estado, categoria])

  const despachar = (inc) => {
    setDespachadas((prev) => new Set(prev).add(inc.id))
    onDispatch?.(inc)
  }

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-jujuy-500 to-institucional-600 text-white">
            <ClipboardList className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <h2 className="text-sm font-bold text-institucional-900">
              Flujo Operativo y Trazabilidad · Open311 / 103 Digital
            </h2>
            <p className="text-[11px] text-slate-500">
              {filas.length} de {INCIDENCIAS.length} reclamos · acciones recomendadas por IA
            </p>
          </div>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar ID, barrio o dirección..."
              className="w-56 rounded-lg border border-slate-200 bg-white py-2 pl-8 pr-3 text-xs text-slate-700 outline-none transition focus:border-jujuy-500 focus:ring-2 focus:ring-jujuy-500/20"
            />
          </div>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 outline-none focus:border-jujuy-500 focus:ring-2 focus:ring-jujuy-500/20"
          >
            <option value="todas">Todas las categorías</option>
            {TIPOS_INCIDENCIA.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nombre}
              </option>
            ))}
          </select>
          <span className="hidden items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500 lg:inline-flex">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filtros rápidos
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-slate-100 px-4 py-2.5">
        {FILTROS_ESTADO.map((f) => {
          const activo = estado === f.id
          return (
            <button
              key={f.id}
              onClick={() => setEstado(f.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
                activo
                  ? 'bg-institucional-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.id !== 'todos' && (
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: ESTADOS[f.id]?.color }}
                />
              )}
              {f.label}
            </button>
          )
        })}
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
              <th className="px-4 py-2.5 font-bold">ID Reclamo</th>
              <th className="px-4 py-2.5 font-bold">Categoría</th>
              <th className="px-4 py-2.5 font-bold">Dirección / Geolocalización</th>
              <th className="px-4 py-2.5 font-bold">Estado</th>
              <th className="px-4 py-2.5 font-bold">Prioridad</th>
              <th className="px-4 py-2.5 font-bold">Acción Recomendada</th>
              <th className="px-4 py-2.5 text-right font-bold">Operación</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((inc) => {
              const hecho = despachadas.has(inc.id)
              return (
                <tr
                  key={inc.id}
                  className="border-b border-slate-100 text-sm transition hover:bg-sky-50/60"
                >
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onFocus?.(inc)}
                      className="font-mono text-xs font-bold text-jujuy-700 hover:underline"
                      title="Ver en el mapa"
                    >
                      {inc.id}
                    </button>
                    <p className="mt-0.5 text-[10px] text-slate-400">{inc.antiguedad}</p>
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold text-slate-700">{inc.categoria}</td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-slate-700">{inc.direccion}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-400">
                      <Navigation className="h-3 w-3" /> {inc.geom}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <EstadoBadge estado={inc.estado} />
                  </td>
                  <td className="px-4 py-3">
                    <PrioridadBadge prioridad={inc.prioridad} />
                  </td>
                  <td className="max-w-[220px] px-4 py-3 text-xs text-slate-600">{inc.accion}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      disabled={hecho}
                      onClick={() => despachar(inc)}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                        hecho
                          ? 'cursor-default bg-green-50 text-green-700'
                          : 'bg-institucional-700 text-white shadow-sm hover:bg-institucional-800 active:scale-95'
                      }`}
                    >
                      {hecho ? (
                        <>
                          <CheckCheck className="h-3.5 w-3.5" /> Despachada
                        </>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" /> Despachar Cuadrilla
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              )
            })}
            {filas.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-400">
                  No se encontraron reclamos con los filtros seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
