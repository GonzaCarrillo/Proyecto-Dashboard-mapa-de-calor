import { LayoutDashboard, BrainCircuit, Route, ClipboardList } from 'lucide-react'

export const VISTAS = [
  {
    id: 'vision',
    nombre: 'Visión General & Mapa de Calor',
    corto: 'Visión General',
    descripcion: 'KPIs y georreferenciación',
    Icon: LayoutDashboard,
  },
  {
    id: 'prediccion',
    nombre: 'Predicción de Zonas Críticas (IA)',
    corto: 'Predicción IA',
    descripcion: 'Modelo XGBoost',
    Icon: BrainCircuit,
  },
  {
    id: 'despacho',
    nombre: 'Despacho de Cuadrillas & Rutas (VRP)',
    corto: 'Despacho VRP',
    descripcion: 'Optimización logística',
    Icon: Route,
  },
  {
    id: 'open311',
    nombre: 'Registro Open311 / Módulos Ciudadanos',
    corto: 'Open311 / 103',
    descripcion: 'Trazabilidad de reclamos',
    Icon: ClipboardList,
  },
]
