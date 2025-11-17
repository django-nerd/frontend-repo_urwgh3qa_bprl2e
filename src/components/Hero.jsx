import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-fuchsia-600/20 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 items-center gap-10">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Mod APK & Aplikasi Premium Android Gratis
            </h1>
            <p className="mt-4 text-slate-300 text-lg">
              Unduh aplikasi dan game modded terbaru, XAPK/APK, update rutin, dan panduan instalasi lengkap. Semua dalam satu tempat.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link to="#terbaru" className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium">Lihat Terbaru</Link>
              <Link to="/blog" className="px-5 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-200 hover:bg-slate-800">Artikel & Tips</Link>
            </div>
          </div>
          <div className="relative">
            <img src="/hero-banner.jpg" alt="Banner Game & App" className="w-full rounded-2xl border border-slate-700 shadow-2xl"/>
            <div className="absolute -bottom-4 -left-4 bg-slate-900/80 backdrop-blur border border-slate-700 rounded-xl px-4 py-2 text-slate-200 text-sm">
              APK • XAPK • Mod Menu • Premium Unlocked
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
