import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Search(){
  const [params] = useSearchParams()
  const q = params.get('q') || ''
  const [items, setItems] = useState([])

  useEffect(()=>{
    if(!q) return
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    fetch(`${base}/api/items?q=${encodeURIComponent(q)}&limit=40`).then(r=>r.json()).then(d=> setItems(d.items||[])).catch(()=>setItems([]))
  },[q])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar/>
      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold mb-4">Hasil pencarian: {q}</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(item => (
            <Link key={item._id} to={`/detail/${item.slug}`} className="group bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
              <div className="aspect-video bg-slate-900/60"></div>
              <div className="p-4">
                <div className="text-white font-semibold line-clamp-1">{item.title}</div>
                <div className="text-sm text-slate-400">{item.version} • {item.size}</div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer/>
    </div>
  )
}
