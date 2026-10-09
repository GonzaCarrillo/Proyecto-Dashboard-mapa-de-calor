export function formatNumero(valor) {
  return new Intl.NumberFormat('es-AR').format(valor)
}

export function formatValor(valor, formato) {
  switch (formato) {
    case 'porcentaje':
      return `${valor.toLocaleString('es-AR', { maximumFractionDigits: 1 })}%`
    case 'horas':
      return `${valor.toLocaleString('es-AR', { maximumFractionDigits: 1 })} h`
    default:
      return formatNumero(valor)
  }
}

export function formatVariacion(valor) {
  const signo = valor > 0 ? '+' : ''
  return `${signo}${valor.toLocaleString('es-AR', { maximumFractionDigits: 1 })}%`
}

export function riesgoTone(riesgo) {
  if (riesgo >= 80) return { label: 'Crítico', color: '#DC2626', bg: '#FEE2E2', text: '#991B1B' }
  if (riesgo >= 65) return { label: 'Alto', color: '#F97316', bg: '#FFEDD5', text: '#9A3412' }
  if (riesgo >= 50) return { label: 'Medio', color: '#EAB308', bg: '#FEF9C3', text: '#854D0E' }
  return { label: 'Bajo', color: '#16A34A', bg: '#DCFCE7', text: '#166534' }
}
