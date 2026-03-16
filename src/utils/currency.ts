export function formatPrice(value: number | string) {
  const numeric = typeof value === 'number' ? value : Number(value)

  if (Number.isNaN(numeric)) {
    return 'Preço indisponível'
  }

  return numeric.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function formatBrlInput(value: string) {
  const digitsOnly = value.replace(/\D/g, '')

  if (!digitsOnly) {
    return ''
  }

  const amount = Number(digitsOnly) / 100

  return amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function parseBrlInputToNumber(value: string) {
  const digitsOnly = value.replace(/\D/g, '')

  if (!digitsOnly) {
    return 0
  }

  return Number(digitsOnly) / 100
}

export function normalizeApiPrice(value: number | string) {
  if (typeof value === 'number') {
    return Number.isInteger(value) ? value / 100 : value
  }

  const normalized = value.trim()

  if (!normalized) {
    return 0
  }

  if (normalized.includes(',') || normalized.includes('.')) {
    const decimalValue = Number(normalized.replace(/\./g, '').replace(',', '.'))
    return Number.isFinite(decimalValue) ? decimalValue : 0
  }

  const centsValue = Number(normalized)
  return Number.isFinite(centsValue) ? centsValue / 100 : 0
}
