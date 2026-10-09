import { useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet.heat'
import {
  Flame,
  MapPin,
  Layers,
  Maximize2,
  X,
  Clock3,
  Users,
  Hash,
} from 'lucide-react'
import { PUNTOS_CALOR, INCIDENCIAS, ESTADOS, MUNICIPIOS } from '../data/mockData'
import EstadoBadge from './EstadoBadge'
import PrioridadBadge from './PrioridadBadge'

const GRADIENT = {
  0.15: '#22c55e',
  0.4: '#84cc16',
  0.55: '#eab308',
  0.75: '#f97316',
  1.0: '#dc2626',
}

function HeatLayer({ points, visible }) {
  const map = useMap()

  useEffect(() => {
    if (!visible) return undefined
    const crearHeat = L.heatLayer ?? globalThis.L?.heatLayer
    if (typeof crearHeat !== 'function') return undefined
    const layer = crearHeat(
      points.map((p) => [p.lat, p.lng, p.intensidad]),
      { radius: 34, blur: 28, maxZoom: 17, minOpacity: 0.35, gradient: GRADIENT },
    )
    layer.addTo(map)
    return () => {
      map.removeLayer(layer)
    }
  }, [map, points, visible])

  return null
}

function FlyTo({ centro, zoom }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(centro, zoom, { duration: 1.1 })
  }, [map, centro, zoom])
  return null
}

export default function HeatMap({ municipio, tipo, focusIncident }) {
  const [mostrarCalor, setMostrarCalor] = useState(true)
  const [mostrarPines, setMostrarPines] = useState(true)
  const [detalle, setDetalle] = useState(null)

  const config = useMemo(
    () => MUNICIPIOS.find((m) => m.id === municipio) ?? MUNICIPIOS[0],
    [municipio],
  )

  const puntosCalor = useMemo(() => {
    if (tipo === 'todas') return PUNTOS_CALOR
    return PUNTOS_CALOR.filter((_, i) => i % (tipo === 'baches' ? 1 : 2) === 0)
  }, [tipo])

  const incidencias = useMemo(
    () => (tipo === 'todas' ? INCIDENCIAS : INCIDENCIAS.filter((i) => i.categoria.toLowerCase().includes(tipo))),
    [tipo],
  )

  useEffect(() => {
    if (focusIncident) setDetalle(focusIncident)
  }, [focusIncident])

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-jujuy-500 to-institucional-600 text-white">
            <Flame className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <h2 className="text-sm font-bold text-institucional-900">
              Mapa de Calor Geoespacial de Jujuy
            </h2>
            <p className="text-[11px] text-slate-500">
              Densidad de reclamos y riesgo urbano por zona · {config.nombre}
            </p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setMostrarCalor((v) => !v)}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
              mostrarCalor
                ? 'border-orange-200 bg-orange-50 text-orange-700'
                : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Flame className="h-3.5 w-3.5" /> Heatmap
          </button>
          <button
            onClick={() => setMostrarPines((v) => !v)}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
              mostrarPines
                ? 'border-sky-200 bg-sky-50 text-jujuy-700'
                : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
            }`}
          >
            <MapPin className="h-3.5 w-3.5" /> Reclamos
          </button>
          <span className="hidden items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 sm:inline-flex">
            <Layers className="h-3.5 w-3.5" /> Capas
          </span>
        </div>
      </div>

      <div className="relative">
        <MapContainer
          center={config.centro}
          zoom={config.zoom}
          scrollWheelZoom
          className="z-0 h-[400px] w-full lg:h-[520px]"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          <FlyTo centro={config.centro} zoom={config.zoom} />
          <HeatLayer points={puntosCalor} visible={mostrarCalor} />

          {mostrarPines &&
            incidencias.map((inc) => {
              const color = ESTADOS[inc.estado].color
              return (
                <CircleMarker
                  key={inc.id}
                  center={[inc.lat, inc.lng]}
                  radius={9}
                  pathOptions={{
                    color: '#ffffff',
                    weight: 2,
                    fillColor: color,
                    fillOpacity: 0.95,
                  }}
                  eventHandlers={{ click: () => setDetalle(inc) }}
                >
                  <Popup>
                    <div className="w-64 p-1">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-institucional-900">{inc.id}</span>
                        <EstadoBadge estado={inc.estado} />
                      </div>
                      <p className="text-sm font-bold text-slate-800">{inc.categoria}</p>
                      <p className="mt-0.5 flex items-start gap-1 text-[11px] text-slate-500">
                        <MapPin className="mt-0.5 h-3 w-3 shrink-0" />
                        {inc.direccion} · {inc.barrio}
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-2 border-t border-slate-100 pt-2 text-[11px]">
                        <div>
                          <p className="text-slate-400">Antigüedad</p>
                          <p className="font-semibold text-slate-700">{inc.antiguedad}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Cuadrilla</p>
                          <p className="font-semibold text-slate-700">{inc.cuadrilla}</p>
                        </div>
                      </div>
                      <p className="mt-2 rounded-md bg-slate-50 px-2 py-1.5 text-[11px] text-slate-600">
                        <span className="font-semibold text-institucional-700">Acción: </span>
                        {inc.accion}
                      </p>
                    </div>
                  </Popup>
                </CircleMarker>
              )
            })}
        </MapContainer>

        <div className="pointer-events-none absolute bottom-4 left-4 z-[500] w-44 rounded-lg border border-slate-200 bg-white/95 p-3 shadow-card backdrop-blur">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Nivel de riesgo
          </p>
          <div className="h-2 w-full rounded-full bg-gradient-to-r from-green-500 via-yellow-400 via-60% to-red-600" />
          <div className="mt-1.5 flex justify-between text-[10px] font-semibold text-slate-500">
            <span>Bajo</span>
            <span>Medio</span>
            <span>Crítico</span>
          </div>
        </div>

        <div className="absolute right-3 top-3 z-[500] inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-slate-600 shadow-card backdrop-blur">
          <Maximize2 className="h-3.5 w-3.5 text-jujuy-600" />
          {incidencias.length} reclamos geolocalizados
        </div>
      </div>

      {detalle && (
        <div className="flex flex-wrap items-center gap-4 border-t border-slate-200 bg-slate-50 px-4 py-3 animate-fade-in">
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-jujuy-600" />
            <span className="text-sm font-bold text-institucional-900">{detalle.id}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-600">
            <MapPin className="h-3.5 w-3.5 text-slate-400" /> {detalle.barrio}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-600">
            <Clock3 className="h-3.5 w-3.5 text-slate-400" /> {detalle.antiguedad}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-600">
            <Users className="h-3.5 w-3.5 text-slate-400" /> {detalle.cuadrilla}
          </span>
          <EstadoBadge estado={detalle.estado} />
          <PrioridadBadge prioridad={detalle.prioridad} />
          <button
            onClick={() => setDetalle(null)}
            className="ml-auto inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-200"
          >
            <X className="h-3.5 w-3.5" /> Cerrar
          </button>
        </div>
      )}
    </div>
  )
}
