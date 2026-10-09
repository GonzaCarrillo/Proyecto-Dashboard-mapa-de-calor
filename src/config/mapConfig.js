const env = import.meta.env ?? {}

const PROVIDERS = {
  maptiler: {
    label: 'MapTiler',
    requiresKey: true,
    url: (key) => `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`,
    attribution:
      '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  mapbox: {
    label: 'Mapbox',
    requiresKey: true,
    url: (key) =>
      `https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/256/{z}/{x}/{y}@2x?access_token=${key}`,
    attribution:
      '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  google: {
    label: 'Google (raster)',
    requiresKey: true,
    url: (key) =>
      `https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=${key}`,
    attribution: '&copy; Google',
  },
  arcgis: {
    label: 'ArcGIS World Street Map',
    requiresKey: false,
    url: () =>
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, HERE, Garmin, &copy; OpenStreetMap',
  },
  positron: {
    label: 'CARTO Positron',
    requiresKey: false,
    url: () => 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
}

const apiKey = env.VITE_MAP_API_KEY ?? ''
const customUrl = env.VITE_MAP_TILES_URL ?? ''
const requestedId = env.VITE_MAP_PROVIDER ?? (apiKey ? 'maptiler' : 'positron')
const requestedProvider = PROVIDERS[requestedId] ? PROVIDERS[requestedId] : PROVIDERS.positron

const faltaKey = requestedProvider.requiresKey && !apiKey && !customUrl
const usandoRespaldo = faltaKey && (env.VITE_MAP_PROVIDER ?? '') !== 'positron'
const providerId = faltaKey ? 'positron' : requestedId && PROVIDERS[requestedId] ? requestedId : 'positron'
const provider = PROVIDERS[providerId]

const tileUrl = customUrl || provider.url(apiKey)

if (usandoRespaldo && env.DEV) {
  console.warn(
    `[mapConfig] Falta VITE_MAP_API_KEY para "${requestedProvider.label}". ` +
      'Usando tiles de respaldo (CARTO). Definí la key en .env.local o en Vercel.',
  )
}

export const mapConfig = {
  providerId,
  providerLabel: provider.label,
  tileUrl,
  attribution: env.VITE_MAP_ATTRIBUTION || provider.attribution,
  usandoRespaldo,
  hasKey: Boolean(apiKey) || !provider.requiresKey || Boolean(customUrl),
}

export const MAP_PROVIDERS = PROVIDERS
