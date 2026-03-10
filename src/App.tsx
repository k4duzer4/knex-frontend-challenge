import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
