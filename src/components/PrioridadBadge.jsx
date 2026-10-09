const CONFIG = {
  Crítica: 'bg-red-100 text-red-700 ring-1 ring-red-200',
  Alta: 'bg-orange-100 text-orange-700 ring-1 ring-orange-200',
  Media: 'bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200',
  Baja: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
}

export default function PrioridadBadge({ prioridad }) {
  return <span className={`badge ${CONFIG[prioridad] ?? CONFIG.Baja}`}>{prioridad}</span>
}
