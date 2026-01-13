import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { TourProvider } from './context/TourContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PaymentButton from './components/PaymentButton';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TourDetail from './pages/TourDetail';
import Tours from './pages/Tours';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import MyBookings from './pages/MyBookings';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFail from './pages/PaymentFail';
import PaymentCancel from './pages/PaymentCancel';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TourProvider>
          <InnerApp />
        </TourProvider>
      </AuthProvider>
    </Router>
  );
}

function InnerApp() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith('/admin');

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tour/:slug" element={<TourDetail />} />
        <Route path="/bookings" element={<MyBookings />} />

        {/* Payment Pages */}
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/fail" element={<PaymentFail />} />
        <Route path="/cancel" element={<PaymentCancel />} />

        {/* Example Payment Button Route */}
        <Route
          path="/book-tour"
          element={<PaymentButton amount={1500} userId="123" tourId="456" />}
        />
      </Routes>
      {!hideNavbar && <Footer />}
    </>
  );
}

export default App;
