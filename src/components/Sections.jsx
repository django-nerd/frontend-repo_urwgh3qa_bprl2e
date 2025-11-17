import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function ItemCard({ item }) {
  return (
    <Link to={`/detail/${item.slug}`} className="group bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-colors">
      <div className="aspect-video bg-slate-900/60 flex items-center justify-center text-slate-500 text-sm">Screenshot</div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold truncate mr-2">{item.title}</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">{item.type === 'game' ? 'Game' : 'App'}</span>
        </div>
        <p className="text-slate-400 text-sm mt-1 line-clamp-2">{item.short_description}</p>
        <div className="mt-3 text-xs text-slate-400">Versi {item.version} • {item.size}</div>
      </div>
    </Link>
  )
}

export default function Sections() {
  const [latest, setLatest] = useState([])
  const [apps, setApps] = useState([])
  const [games, setGames] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const load = async () => {
      try {
        const [l, a, g, c] = await Promise.all([
          fetch(`${base}/api/items/latest?limit=12`).then(r=>r.json()),
          fetch(`${base}/api/items?type=app&limit=8`).then(r=>r.json()),
          fetch(`${base}/api/items?type=game&limit=8`).then(r=>r.json()),
          fetch(`${base}/api/categories`).then(r=>r.json()),
        ])
        setLatest(l.items || [])
        setApps(a.items || [])
        setGames(g.items || [])
        setCategories(c.categories || [])
      } catch (e) {
        // fail silently
      }
    }
    load()
  }, [])

  return (
    <>
      <section id="terbaru" className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Diperbarui Terbaru</h2>
          <Link to="/kategori/updated" className="text-blue-400 hover:text-blue-300 text-sm">Lihat semua</Link>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {latest.map(item => <ItemCard key={item._id} item={item} />)}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Aplikasi Terbaru</h2>
              <Link to="/kategori/apps" className="text-blue-400 hover:text-blue-300 text-sm">Lihat semua</Link>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {apps.map(item => <ItemCard key={item._id} item={item} />)}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Game Terbaru</h2>
              <Link to="/kategori/games" className="text-blue-400 hover:text-blue-300 text-sm">Lihat semua</Link>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {games.map(item => <ItemCard key={item._id} item={item} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Kategori Populer</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.slice(0,16).map(c => (
            <Link key={c.slug} to={`/kategori/${c.slug}`} className="px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700">{c.name}</Link>
          ))}
        </div>
      </section>
    </>
  )
}
