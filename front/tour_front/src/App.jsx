import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { TourProvider } from './context/TourContext';

// Components
import Navbar from './components/Navbar';
import PaymentButton from './components/PaymentButton';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TourDetail from './pages/TourDetail';
import MyBookings from './pages/MyBookings';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFail from './pages/PaymentFail';
import PaymentCancel from './pages/PaymentCancel';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TourProvider>
          <Navbar />
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
        </TourProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
