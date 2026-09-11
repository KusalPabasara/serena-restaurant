import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'

export function App() {
  const location = useLocation()
  const reduce = useReducedMotion()

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="relative z-0 flex-1">
        {/* Avoid AnimatePresence mode="wait" — it can leave pages unclickable mid-transition */}
        <motion.div
          key={location.pathname}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-full"
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}

export default App
