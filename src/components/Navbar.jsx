import { useEffect, useState } from 'react'
import { Menu, Search, Gamepad2, AppWindow, Layers, Newspaper, Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/categories`)
        const data = await res.json()
        setCategories(data.categories || [])
      } catch (e) {
        setCategories([])
      }
    }
    load()
  }, [])

  const onSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/cari?q=${encodeURIComponent(query)}`)
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-slate-900/70 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 rounded-md hover:bg-slate-800" onClick={() => setOpen(!open)}>
              <Menu className="w-6 h-6 text-white" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <img src="/flame-icon.svg" className="w-8 h-8" alt="Logo" />
              <span className="text-white font-bold text-lg">ModDroid ID</span>
            </Link>
          </div>

          <form onSubmit={onSearch} className="hidden md:flex items-center gap-2 w-full max-w-xl mx-4">
            <div className="flex items-center gap-2 flex-1 bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2">
              <Search className="w-5 h-5 text-slate-300" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari aplikasi, game, mod..."
                className="bg-transparent outline-none text-slate-100 placeholder:text-slate-400 flex-1"
              />
            </div>
            <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium">Cari</button>
          </form>

          <nav className="hidden lg:flex items-center gap-6 text-slate-200">
            <Link to="/kategori/apps" className="hover:text-white flex items-center gap-2"><AppWindow className="w-5 h-5"/>Aplikasi</Link>
            <Link to="/kategori/games" className="hover:text-white flex items-center gap-2"><Gamepad2 className="w-5 h-5"/>Game</Link>
            <Link to="/blog" className="hover:text-white flex items-center gap-2"><Newspaper className="w-5 h-5"/>Blog</Link>
            <Link to="/kontak" className="hover:text-white flex items-center gap-2"><Mail className="w-5 h-5"/>Kontak</Link>
          </nav>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden pb-4">
            <form onSubmit={onSearch} className="flex items-center gap-2 w-full mb-3">
              <div className="flex items-center gap-2 flex-1 bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2">
                <Search className="w-5 h-5 text-slate-300" />
                <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Cari aplikasi, game, mod..." className="bg-transparent outline-none text-slate-100 placeholder:text-slate-400 flex-1"/>
              </div>
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">Cari</button>
            </form>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/kategori/apps" onClick={()=>setOpen(false)} className="flex items-center gap-2 bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-200"><AppWindow className="w-5 h-5"/>Aplikasi</Link>
              <Link to="/kategori/games" onClick={()=>setOpen(false)} className="flex items-center gap-2 bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-200"><Gamepad2 className="w-5 h-5"/>Game</Link>
              <Link to="/blog" onClick={()=>setOpen(false)} className="flex items-center gap-2 bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-200"><Newspaper className="w-5 h-5"/>Blog</Link>
              <Link to="/kontak" onClick={()=>setOpen(false)} className="flex items-center gap-2 bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-200"><Mail className="w-5 h-5"/>Kontak</Link>
            </div>
            {categories?.length > 0 && (
              <div className="mt-3">
                <div className="flex items-center gap-2 text-slate-300 mb-2"><Layers className="w-4 h-4"/>Kategori Populer</div>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(0,8).map((c)=> (
                    <Link key={c.slug} to={`/kategori/${c.slug}`} onClick={()=>setOpen(false)} className="px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-200 text-sm">{c.name}</Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
