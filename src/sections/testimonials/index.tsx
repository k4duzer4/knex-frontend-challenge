import './styles.css'

const testimonials = [
  {
    id: '1',
    name: 'Laura Silva',
    role: 'Cliente',
    message: 'Simplesmente os melhores cupcakes que ja experimentei! A massa e fofinha e o recheio e perfeito.',
  },
  {
    id: '2',
    name: 'Carlos Andre',
    role: 'Cliente',
    message: 'Os sabores sao incriveis, da para sentir o cuidado em cada detalhe. E impossivel comer so um!',
  },
  {
    id: '3',
    name: 'Joseph Nunes',
    role: 'Cliente',
    message: 'Sempre que quero adocar meu dia, corro para ca. Qualidade e sabor sem comparacao!',
  },
]

function HomeTestimonials() {
  return (
    <section id="testimonials" className="home-testimonials" aria-label="Depoimentos de clientes">
      <div className="home-testimonials__content">
        <h2>Depoimentos</h2>
        <p>Feedback de alguns clientes.</p>

        <div className="home-testimonials__grid">
          {testimonials.map((item) => (
            <article key={item.id} className="home-testimonials__card">
              <h3>{item.name}</h3>
              <span>{item.role}</span>
              <blockquote>{item.message}</blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeTestimonials
