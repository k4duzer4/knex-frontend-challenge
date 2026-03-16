import { useState } from 'react'
import { toast } from 'react-toastify'
import './styles.css'
import DeleteTestimonialModal from './components/DeleteTestimonialModal'
import TestimonialsCarousel from './components/TestimonialsCarousel'
import UpsertTestimonialModal from './components/UpsertTestimonialModal'
import { TESTIMONIALS_SECTION_SUBTITLE, TESTIMONIALS_SECTION_TITLE } from './constants'
import { useTestimonialsCatalog } from './hooks/useTestimonialsCatalog'
import type { HomeTestimonial, HomeTestimonialsProps } from './types'
import IconButton from '../../components/ui/IconButton'
import SectionTitleWithLines from '../../components/ui/SectionTitleWithLines'

function HomeTestimonials({ isReadOnlyMode }: HomeTestimonialsProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [testimonialToEdit, setTestimonialToEdit] = useState<HomeTestimonial | null>(null)
  const [testimonialToDelete, setTestimonialToDelete] = useState<HomeTestimonial | null>(null)

  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } =
    useTestimonialsCatalog()
  const hasTestimonials = testimonials.length > 0

  function handleRequestOpenAddModal() {
    if (isReadOnlyMode) {
      return
    }
    setIsAddModalOpen(true)
  }

  function handleRequestEdit(testimonial: HomeTestimonial) {
    if (isReadOnlyMode) {
      return
    }
    setTestimonialToEdit(testimonial)
  }

  function handleRequestDelete(testimonial: HomeTestimonial) {
    if (isReadOnlyMode) {
      return
    }
    setTestimonialToDelete(testimonial)
  }

  function handleAddTestimonial(input: { name: string; role: string; message: string }) {
    try {
      addTestimonial(input)
      toast.success('Depoimento adicionado com sucesso.')
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Nao foi possivel adicionar o depoimento agora.',
      )
      throw error
    }
  }

  function handleUpdateTestimonial(input: { name: string; role: string; message: string }) {
    if (!testimonialToEdit) {
      return
    }

    try {
      updateTestimonial({
        id: testimonialToEdit.id,
        ...input,
      })
      toast.success('Depoimento atualizado com sucesso.')
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Nao foi possivel atualizar o depoimento agora.',
      )
      throw error
    }
  }

  function handleDeleteTestimonial() {
    if (!testimonialToDelete) {
      return
    }

    deleteTestimonial(testimonialToDelete.id)
    toast.success('Depoimento apagado com sucesso.')
    setTestimonialToDelete(null)
  }

  return (
    <section id="testimonials" className="home-testimonials" aria-label="Depoimentos de clientes">
      <div className="home-testimonials__content">
        <div className="home-testimonials__header">
          <SectionTitleWithLines as="h2" className="home-testimonials__title">
            {TESTIMONIALS_SECTION_TITLE}
          </SectionTitleWithLines>
          {!isReadOnlyMode && hasTestimonials ? (
            <IconButton
              icon="+"
              ariaLabel="Adicionar depoimento"
              className="home-testimonials__add-button"
              onClick={handleRequestOpenAddModal}
            />
          ) : null}
        </div>

        <p className="home-testimonials__subtitle">{TESTIMONIALS_SECTION_SUBTITLE}</p>

        {hasTestimonials ? (
          <TestimonialsCarousel
            testimonials={testimonials}
            isReadOnlyMode={isReadOnlyMode}
            onRequestEdit={handleRequestEdit}
            onRequestDelete={handleRequestDelete}
          />
        ) : !isReadOnlyMode ? (
          <div className="home-testimonials__empty" role="status" aria-live="polite">
            <button
              type="button"
              className="home-testimonials__empty-action"
              aria-label="Adicionar primeiro depoimento"
              onClick={handleRequestOpenAddModal}
            >
              +
            </button>
            <h3 className="home-testimonials__empty-title">Nenhum depoimento cadastrado</h3>
            <p className="home-testimonials__empty-copy">
              Clique no botão para adicionar o primeiro depoimento.
            </p>
          </div>
        ) : null}
      </div>

      {!isReadOnlyMode && (
        <>
          <UpsertTestimonialModal
            key={`testimonial-create-${isAddModalOpen ? 'open' : 'closed'}`}
            isOpen={isAddModalOpen}
            mode="create"
            onClose={() => setIsAddModalOpen(false)}
            onSubmit={handleAddTestimonial}
          />

          <UpsertTestimonialModal
            key={testimonialToEdit?.id ?? 'testimonial-update'}
            isOpen={!!testimonialToEdit}
            mode="update"
            initialName={testimonialToEdit?.name}
            initialRole={testimonialToEdit?.role}
            initialMessage={testimonialToEdit?.message}
            onClose={() => setTestimonialToEdit(null)}
            onSubmit={handleUpdateTestimonial}
          />

          <DeleteTestimonialModal
            isOpen={!!testimonialToDelete}
            testimonialName={testimonialToDelete?.name ?? ''}
            onCancel={() => setTestimonialToDelete(null)}
            onConfirm={handleDeleteTestimonial}
          />
        </>
      )}
    </section>
  )
}

export default HomeTestimonials
