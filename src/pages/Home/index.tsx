import HomeAbout from '../../sections/about'
import HomeContact from '../../sections/contact'
import HomeFooter from '../../sections/footer'
import HomeHeader from '../../sections/header'
import HomeHero from '../../sections/hero'
import HomeProducts from '../../sections/products'
import HomeTestimonials from '../../sections/testimonials'
import { useAuth } from '../../hooks/useAuth'
import './HomePage.css'

function HomePage() {
  const { getToken, clearToken } = useAuth()

  const token = getToken()

  const handleLogout = () => {
    clearToken()
    window.location.replace('/')
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
