import cupcake1Image from '../../assets/images/mock/cupcake1.png'
import cupcake2Image from '../../assets/images/mock/cupcake2.png'
import cupcake3Image from '../../assets/images/mock/cupcake3.png'
import sorveteImage from '../../assets/images/mock/sorvete.png'
import type { DisplayProduct } from './types'

export const MOCK_PRODUCTS: DisplayProduct[] = [
  {
    id: 'mock-1',
    name: 'Cupcake Chocomenta',
    price: 5,
    image: cupcake1Image,
  },
  {
    id: 'mock-2',
    name: 'Cupcake Chocolate',
    price: 5,
    image: cupcake2Image,
  },
  {
    id: 'mock-3',
    name: 'Casquinha de Creme com Chocolate',
    price: 8,
    image: sorveteImage,
  },
  {
    id: 'mock-4',
    name: 'Cupcake de Morango',
    price: 6,
    image: cupcake3Image,
  },
]
