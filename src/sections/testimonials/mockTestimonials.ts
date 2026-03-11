import type { HomeTestimonial } from './types'

export const MOCK_TESTIMONIALS: HomeTestimonial[] = [
  {
    id: '1',
    name: 'Laura Silva',
    role: 'Cliente',
    message:
      'Simplesmente os melhores cupcakes que ja experimentei! A massa e fofinha e o recheio e perfeito.',
    accentClassName: 'home-testimonials__avatar--laura',
  },
  {
    id: '2',
    name: 'Carlos Andre',
    role: 'Cliente',
    message: 'Os sabores sao incriveis, da para sentir o cuidado em cada detalhe. E impossivel comer so um!',
    accentClassName: 'home-testimonials__avatar--carlos',
  },
  {
    id: '3',
    name: 'Joseph Nunes',
    role: 'Cliente',
    message: 'Sempre que quero adocar meu dia, corro para ca. Qualidade e sabor sem comparacao!',
    accentClassName: 'home-testimonials__avatar--joseph',
  },
]
