import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function BlogDetail(){
  const { slug } = useParams()
  const [post, setPost] = useState(null)

  useEffect(()=>{
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    fetch(`${base}/api/blog/${slug}`).then(r=>r.json()).then(setPost).catch(()=>setPost(null))
  },[slug])

  if(!post) return (
    <div className="min-h-screen bg-slate-950 text-slate-100"><Navbar/><div className="max-w-4xl mx-auto px-6 py-10">Memuat...</div><Footer/></div>
  )

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar/>
      <main className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        {post.cover_image && (<img src={post.cover_image} alt={post.title} className="w-full rounded-xl border border-slate-800 mt-4"/>)}
        <article className="prose prose-invert max-w-none mt-6" dangerouslySetInnerHTML={{__html: post.content}} />
      </main>
      <Footer/>
    </div>
  )
}
