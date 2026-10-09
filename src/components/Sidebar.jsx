import { X, ShieldCheck, Database } from 'lucide-react'
import { VISTAS } from '../data/vistas'

export default function Sidebar({ active, onChange, open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-institucional-900 text-slate-100 transition-transform duration-300 lg:static lg:z-0 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-jujuy-500 to-institucional-500 font-extrabold text-white shadow-lg">
            JY
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold tracking-wide text-white">Municipalidad de Jujuy</p>
            <p className="text-[11px] text-slate-300">Centro de Mando Digital</p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto rounded-md p-1.5 text-slate-300 hover:bg-white/10 lg:hidden"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4 scrollbar-thin">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Módulos de gestión
          </p>
          {VISTAS.map(({ id, nombre, descripcion, Icon }) => {
            const activo = active === id
            return (
              <button
                key={id}
                onClick={() => onChange(id)}
                className={`group flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-all ${
                  activo
                    ? 'bg-gradient-to-r from-jujuy-600 to-institucional-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition ${
                    activo ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold leading-snug">{nombre}</span>
                  <span
                    className={`block text-[11px] ${activo ? 'text-sky-100' : 'text-slate-400'}`}
                  >
                    {descripcion}
                  </span>
                </span>
              </button>
            )
          })}
        </nav>

        <div className="space-y-3 border-t border-white/10 px-4 py-4">
          <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <div className="leading-tight">
              <p className="text-[11px] font-semibold text-slate-200">Gobierno Abierto</p>
              <p className="text-[10px] text-slate-400">Datos públicos · Ley 5.919</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2.5">
            <Database className="h-4 w-4 text-sky-400" />
            <div className="leading-tight">
              <p className="text-[11px] font-semibold text-slate-200">Data Warehouse</p>
              <p className="text-[10px] text-slate-400">Data Lake municipal · Últ. sync 08:42</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
