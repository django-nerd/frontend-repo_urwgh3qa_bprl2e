export default function Footer(){
  return (
    <footer className="mt-10 border-t border-slate-800 bg-slate-900/60">
      <div className="max-w-7xl mx-auto px-6 py-10 text-slate-300">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src="/flame-icon.svg" className="w-6 h-6"/>
              <span className="text-white font-semibold">ModDroid ID</span>
            </div>
            <p className="text-sm">Pusat unduhan Mod APK dan aplikasi premium Android. Konten untuk tujuan edukasi dan demo.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Panduan</h4>
            <ul className="space-y-1 text-sm">
              <li>Instal APK/XAPK</li>
              <li>Aktifkan Sumber Tidak Dikenal</li>
              <li>Perbedaan APK vs XAPK</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Kontak</h4>
            <p className="text-sm">Email: support@moddroid.id</p>
          </div>
        </div>
        <div className="text-xs text-slate-500 mt-8">© {new Date().getFullYear()} ModDroid ID</div>
      </div>
    </footer>
  )
}
