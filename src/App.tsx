import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoginPage from './pages/Login'

function App() {
  return (
    <>
      <LoginPage />
      <ToastContainer position="top-right" autoClose={2200} newestOnTop pauseOnHover />
    </>
  )
}

export default App
