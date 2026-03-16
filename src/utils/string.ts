export function getNameInitial(value: string) {
  return value.trim().charAt(0).toUpperCase()
}

export function formatPhoneMask(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (!digits) {
    return ''
  }

  const area = digits.slice(0, 2)
  const firstDigit = digits.slice(2, 3)
  const middle = digits.slice(3, 7)
  const last = digits.slice(7, 11)

  let output = `(${area}`

  if (area.length === 2) {
    output += ') '
  }

  if (firstDigit) {
    output += firstDigit
  }

  if (middle) {
    output += `.${middle}`
  }

  if (last) {
    output += `-${last}`
  }

  return output
}
