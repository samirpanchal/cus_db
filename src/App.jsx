import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Materials from './pages/Materials';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Quote from './pages/Quote';
import Privacy from './pages/Privacy';
import LocationsHub from './pages/LocationsHub';
import { GlobalDirectory, IndiaPortsDirectory, IndiaDirectory } from './pages/Directories';
import LocationProducts from './pages/LocationProducts';


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="materials" element={<Materials />} />
          <Route path="materials/:slug" element={<ProductDetail />} />
          <Route path="export/:location/:slug" element={<ProductDetail />} />
          <Route path="import-india/:location/:slug" element={<ProductDetail />} />
          <Route path="india/:location/:slug" element={<ProductDetail />} />
          <Route path="ppscrap.html" element={<ProductDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="quote" element={<Quote />} />
          <Route path="privacy-policy" element={<Privacy />} />
          <Route path="locations" element={<LocationsHub />} />
          <Route path="locations/global" element={<GlobalDirectory />} />
          <Route path="locations/import-india" element={<IndiaPortsDirectory />} />
          <Route path="locations/india" element={<IndiaDirectory />} />
          <Route path="export/:location" element={<LocationProducts region="export" />} />
          <Route path="import-india/:location" element={<LocationProducts region="import-india" />} />
          <Route path="india/:location" element={<LocationProducts region="india" />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
