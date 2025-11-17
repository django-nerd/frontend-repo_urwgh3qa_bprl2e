import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Blog(){
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    fetch(`${base}/api/blog?limit=20`).then(r=>r.json()).then(d=> setPosts(d.posts||[])).catch(()=>setPosts([]))
  },[])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar/>
      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Artikel & Tips</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(p => (
            <Link key={p._id} to={`/blog/${p.slug}`} className="block bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700">
              {p.cover_image ? (
                <img src={p.cover_image} alt={p.title} className="w-full aspect-video object-cover"/>
              ) : (
                <div className="w-full aspect-video bg-slate-900 flex items-center justify-center text-slate-500">Cover</div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-white line-clamp-2">{p.title}</h3>
                <p className="text-slate-400 text-sm line-clamp-2 mt-1">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer/>
    </div>
  )
}
