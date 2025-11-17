import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Detail(){
  const { slug } = useParams()
  const [item, setItem] = useState(null)
  const [err, setErr] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/items/${slug}`)
        if(!res.ok) throw new Error('Tidak ditemukan')
        const data = await res.json()
        setItem(data)
      } catch(e){
        setErr('Item tidak ditemukan')
      }
    }
    load()
  }, [slug])

  if(err) return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar/>
      <div className="max-w-4xl mx-auto px-6 py-10">{err}</div>
      <Footer/>
    </div>
  )

  if(!item) return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar/>
      <div className="max-w-4xl mx-auto px-6 py-10">Memuat...</div>
      <Footer/>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar/>
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-white">{item.title}</h1>
            <p className="text-slate-300 mt-2">{item.short_description}</p>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
              {(item.screenshots || []).slice(0,6).map((s, i) => (
                <img key={i} src={s} alt={`Screenshot ${i+1}`} className="w-full rounded-lg border border-slate-700" />
              ))}
            </div>
            <div className="prose prose-invert max-w-none mt-6">
              <p>{item.description}</p>
            </div>
          </div>
          <aside>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <div className="text-sm text-slate-400">Versi</div>
              <div className="font-semibold">{item.version}</div>
              <div className="text-sm text-slate-400 mt-2">Ukuran</div>
              <div className="font-semibold">{item.size}</div>
              <div className="text-sm text-slate-400 mt-2">Format</div>
              <div className="font-semibold">{item.download_type}</div>
              <a href={item.download_url} target="_blank" className="block mt-4 text-center px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold">Unduh {item.download_type}</a>
            </div>
            {item.features?.length > 0 && (
              <div className="mt-4 bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                <div className="font-semibold mb-2">Fitur Unggulan</div>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  {item.features.map((f,i)=> (<li key={i}>{f}</li>))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </main>
      <Footer/>
    </div>
  )
}
