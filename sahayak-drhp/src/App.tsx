import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from './store'
import { Toasts } from './components/ui'
import Landing from './pages/Landing'
import Ingest from './pages/Ingest'
import Workspace from './pages/Workspace'

export default function App() {
  const screen = useStore((s) => s.screen)
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {screen === 'landing' && <Landing />}
          {screen === 'ingest' && <Ingest />}
          {screen === 'workspace' && <Workspace />}
        </motion.div>
      </AnimatePresence>
      <Toasts />
    </>
  )
}
