import { motion } from 'framer-motion'

type FallbackInfoProps = {
  show: boolean
  onReload: () => void
}

function FallbackInfo({ show, onReload }: FallbackInfoProps) {
  if (!show) return null

  return (
    <div className="home-products__fallback-info" role="status" aria-live="polite">
      <span>Mostrando vitrine de teste</span>
      <motion.button
        type="button"
        className="home-products__notice-reload"
        aria-label="Recarregar produtos"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReload}
      >
        <motion.span aria-hidden whileHover={{ rotate: 180 }} transition={{ duration: 0.4 }}>
          ↻
        </motion.span>
      </motion.button>
    </div>
  )
}

export default FallbackInfo
