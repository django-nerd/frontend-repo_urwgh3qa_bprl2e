import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Sections from '../components/Sections'
import Footer from '../components/Footer'

export default function Home(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Navbar/>
      <Hero/>
      <Sections/>
      <Footer/>
    </div>
  )
}
