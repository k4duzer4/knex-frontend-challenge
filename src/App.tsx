import './App.css'
import { ToastContainer } from 'react-toastify'
import AppRouter from './routes/AppRouter'

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer position="top-right" autoClose={2200} newestOnTop pauseOnHover />
    </>
  )
}

export default App
