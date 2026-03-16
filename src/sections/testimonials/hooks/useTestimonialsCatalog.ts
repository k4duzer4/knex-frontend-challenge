import { useEffect, useState } from 'react'
import { MOCK_TESTIMONIALS } from '../mockTestimonials'
import type { HomeTestimonial } from '../types'

const TESTIMONIALS_STORAGE_KEY = 'knex.frontend.testimonials'
const ACCENT_CLASSES = [
  'home-testimonials__avatar--laura',
  'home-testimonials__avatar--carlos',
  'home-testimonials__avatar--joseph',
] as const

function parseStoredTestimonials(rawValue: string | null) {
  if (!rawValue) {
    return null
  }

  try {
    const parsed = JSON.parse(rawValue)

    if (!Array.isArray(parsed)) {
      return null
    }

    const normalized = parsed.filter((item) => {
      if (!item || typeof item !== 'object') return false

      const candidate = item as Record<string, unknown>
      return (
        typeof candidate.id === 'string' &&
        typeof candidate.name === 'string' &&
        typeof candidate.role === 'string' &&
        typeof candidate.message === 'string' &&
        typeof candidate.accentClassName === 'string'
      )
    }) as HomeTestimonial[]

    return normalized.length > 0 ? normalized : null
  } catch {
    return null
  }
}

function getInitialTestimonials() {
  if (typeof window === 'undefined') {
    return MOCK_TESTIMONIALS
  }

  const storedTestimonials = parseStoredTestimonials(
    window.localStorage.getItem(TESTIMONIALS_STORAGE_KEY),
  )
  return storedTestimonials ?? MOCK_TESTIMONIALS
}

function getAccentByLength(length: number) {
  return ACCENT_CLASSES[length % ACCENT_CLASSES.length]
}

function buildNewTestimonialId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `testimonial-${Date.now()}-${Math.floor(Math.random() * 100000)}`
}

export function useTestimonialsCatalog() {
  const [testimonials, setTestimonials] = useState<HomeTestimonial[]>(() =>
    getInitialTestimonials(),
  )

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(testimonials))
  }, [testimonials])

  function addTestimonial(input: { name: string; role: string; message: string }) {
    const trimmedName = input.name.trim()
    const trimmedRole = input.role.trim()
    const trimmedMessage = input.message.trim()

    if (!trimmedName || !trimmedRole || !trimmedMessage) {
      throw new Error('Preencha todos os campos do depoimento.')
    }

    setTestimonials((current) => [
      ...current,
      {
        id: buildNewTestimonialId(),
        name: trimmedName,
        role: trimmedRole,
        message: trimmedMessage,
        accentClassName: getAccentByLength(current.length),
      },
    ])
  }

  function updateTestimonial(input: { id: string; name: string; role: string; message: string }) {
    const trimmedName = input.name.trim()
    const trimmedRole = input.role.trim()
    const trimmedMessage = input.message.trim()

    if (!trimmedName || !trimmedRole || !trimmedMessage) {
      throw new Error('Preencha todos os campos do depoimento.')
    }

    setTestimonials((current) =>
      current.map((testimonial) =>
        testimonial.id === input.id
          ? {
              ...testimonial,
              name: trimmedName,
              role: trimmedRole,
              message: trimmedMessage,
            }
          : testimonial,
      ),
    )
  }

  function deleteTestimonial(id: string) {
    setTestimonials((current) => current.filter((testimonial) => testimonial.id !== id))
  }

  return {
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
  }
}
