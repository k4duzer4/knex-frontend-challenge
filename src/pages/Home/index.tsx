import { useNavigate } from 'react-router-dom'
import HomeAbout from '../../components/home/HomeAbout'
import HomeContact from '../../components/home/HomeContact'
import HomeFooter from '../../components/home/HomeFooter'
import HomeHeader from '../../components/home/HomeHeader'
import HomeHero from '../../components/home/HomeHero'
import HomeProducts from '../../components/home/HomeProducts'
import HomeTestimonials from '../../components/home/HomeTestimonials'
import { useAuth } from '../../hooks/useAuth'
import './HomePage.css'

function HomePage() {
  const navigate = useNavigate()
  const { getToken, clearToken } = useAuth()

  const token = getToken()

  const handleLogout = () => {
    clearToken()
    navigate('/', { replace: true })
  }

  if (!token) {
    return null
  }

  return (
    <main className="home-page">
      <HomeHeader onLogout={handleLogout} />
      <HomeHero />
      <HomeAbout />
      <HomeProducts token={token} />
      <HomeTestimonials />
      <HomeContact />
      <HomeFooter />
    </main>
  )
}

export default HomePage
