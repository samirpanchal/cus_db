import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Materials from './pages/Materials';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Quote from './pages/Quote';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="materials" element={<Materials />} />
          <Route path="materials/:slug" element={<ProductDetail />} />
          <Route path="ppscrap.html" element={<ProductDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="quote" element={<Quote />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
