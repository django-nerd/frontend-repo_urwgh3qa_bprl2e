import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Contact(){
  const [form, setForm] = useState({name:'', email:'', subject:'', message:''})
  const [status, setStatus] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Mengirim...')
    try{
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/api/contact`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data: form})
      })
      if(!res.ok) throw new Error('Gagal mengirim')
      setStatus('Pesan terkirim. Terima kasih!')
      setForm({name:'', email:'', subject:'', message:''})
    }catch(err){
      setStatus('Terjadi kesalahan. Coba lagi nanti.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar/>
      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-4">Kontak</h1>
        <p className="text-slate-300 mb-6">Kirimkan pertanyaan, saran, atau kerja sama melalui formulir di bawah ini.</p>
        <form onSubmit={submit} className="space-y-4 bg-slate-900/60 border border-slate-800 p-6 rounded-xl">
          <div>
            <label className="block text-sm mb-1">Nama</label>
            <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 outline-none" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 outline-none" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Subjek</label>
            <input value={form.subject} onChange={e=>setForm({...form, subject:e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 outline-none" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Pesan</label>
            <textarea rows="5" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 outline-none" required />
          </div>
          <button className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium">Kirim</button>
          {status && <div className="text-sm text-slate-300">{status}</div>}
        </form>
      </main>
      <Footer/>
    </div>
  )
}
