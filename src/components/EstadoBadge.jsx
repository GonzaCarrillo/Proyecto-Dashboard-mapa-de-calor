import { CircleDot, Search, CheckCircle2 } from 'lucide-react'
import { ESTADOS } from '../data/mockData'

const CONFIG = {
  abierto: { dot: 'bg-critico', text: 'text-red-700', bg: 'bg-red-50', Icon: CircleDot },
  inspeccion: { dot: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-50', Icon: Search },
  resuelto: { dot: 'bg-optimo', text: 'text-green-700', bg: 'bg-green-50', Icon: CheckCircle2 },
}

export default function EstadoBadge({ estado }) {
  const cfg = CONFIG[estado] ?? CONFIG.abierto
  const { Icon } = cfg
  return (
    <span className={`badge ${cfg.bg} ${cfg.text}`}>
      <Icon className="h-3 w-3" strokeWidth={2.5} />
      {ESTADOS[estado]?.label ?? estado}
    </span>
  )
}
