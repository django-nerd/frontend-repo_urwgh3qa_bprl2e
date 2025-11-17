import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Search from './pages/Search'
import Category from './pages/Category'
import Contact from './pages/Contact'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/detail/:slug" element={<Detail/>} />
      <Route path="/blog" element={<Blog/>} />
      <Route path="/blog/:slug" element={<BlogDetail/>} />
      <Route path="/cari" element={<Search/>} />
      <Route path="/kategori/:slug" element={<Category/>} />
      <Route path="/kontak" element={<Contact/>} />
    </Routes>
  )
}

export default App
