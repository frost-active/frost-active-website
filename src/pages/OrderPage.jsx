import React, { useState, useRef, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';


// Navigation links
const navLinks = [
  { name: 'Home', url: '/' },
  { name: 'Features', url: '/#features' },
  { name: 'Working', url: '/#how-it-works' },
  { name: 'Team', url: '/#team' },
  { name: 'Testimonials', url: '/#testimonials' },
  { name: 'Contact Us', url: '/#try' },
];

const Header = () => {
  const navigate = useNavigate();
  const navTimeout = useRef(null);

  const handleNavClick = (url) => {
    if (navTimeout.current) {
      clearTimeout(navTimeout.current);
    }
    navTimeout.current = setTimeout(() => {
      navigate(url);
      navTimeout.current = null;
    }, 300);
  };

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full h-20 z-50 bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 h-full overflow-hidden">
          {/* Logo on the left */}
          <a
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2 font-extrabold text-xl text-primary cursor-pointer"
          >
           <div className="relative top-[6px] left-[-30px] ">
              <img
                src="/images/logo2.png" loading="lazy"
                alt="FROST Logo"
                className="h-40 w-auto object-contain max-w-[180px]" // restrict height and width
              />
              </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            {navLinks.map((link) => (
              <span
                key={link.name}
                onClick={() => handleNavClick(link.url)}
                className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition cursor-pointer"
                style={{ fontFamily: 'Roboto', fontWeight: '800' }}
              >
                {link.name}
              </span>
            ))}

            {/* Invest Button - Desktop */}
               <div className="-ml-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-primary hover:bg-primary/90 text-white px-5 sm:px-6 py-3 rounded-lg text-sm sm:text-base shadow-md">
                    <a href="/invest">Invest</a>
                  </Button>
                </motion.div>
              </div>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary">
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white rounded-lg shadow-lg">
                {navLinks.map((link) => (
                  <DropdownMenuItem key={link.name} asChild>
                    <span
                      onClick={() => handleNavClick(link.url)}
                      className="text-gray-800 hover:bg-blue-100 px-4 py-2 rounded transition cursor-pointer"
                      style={{ fontFamily: 'Roboto', fontWeight: '400' }}
                    >
                      {link.name}
                    </span>
                  </DropdownMenuItem>
                ))}

                {/* Invest Button - Mobile */}
                                  
                                  <DropdownMenuItem asChild>
                                    <div className="w-full px-4 py-2">
                                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-md text-sm shadow-md">
                                          <a href="/invest" className="w-full block text-center">
                                            Invest 
                                          </a>
                                        </Button>
                                      </motion.div>
                                    </div>
                                  </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Spacer to avoid content being hidden under the fixed header */}
      <div className="h-20" />
    </>
  );
};

// Google script submission URL
const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbz5gexvwLFFbY4pY52icXpOaosAmQdf9QR01rqEFwzbwJkdcyb8udfgajx1kOMZP77Nmg/exec';

// OrderPage component
const OrderPage = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    shareInfo: false,
    country: 'IN',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      const maxLength = form.country === 'GER' ? 11 : 10;
      if (numericValue.length <= maxLength) {
        setForm((prev) => ({ ...prev, [name]: numericValue }));
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }

    setErrorMsg('');
  };

  const handleSubmit = async () => {
    const { firstName, address, phone, email, shareInfo, country } = form;

    if (!firstName || !address || !phone || !email || !shareInfo) {
      setErrorMsg('Please complete all required fields and agree to share your booking information.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid email address, such as "name@example.com".');
      return;
    }

    const requiredLength = country === 'GER' ? 11 : 10;
    if (phone.length !== requiredLength) {
      setErrorMsg(
        `The phone number must be exactly ${requiredLength} digits for ${
          country === 'IN' ? 'India' : country === 'US' ? 'United States' : 'Germany'
        }. Please ensure it is correctly formatted.`
      );
      return;
    }

    if (!/^\d+$/.test(phone)) {
      setErrorMsg('The phone number should contain digits only.');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch (err) {
      setErrorMsg('We encountered an error while submitting your booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm({
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      email: '',
      shareInfo: false,
      country: 'IN',
    });
    setSubmitted(false);
  };

  return (
    <>
      <Header />
      <div className="-mt-16 min-h-screen bg-white pt-24 px-4 flex flex-col items-center">
        <div className="bg-white shadow-md border w-full max-w-3xl p-8 relative">
          {!submitted ? (
            <>
              <h2 className="text-2xl font-bold text-left mb-6">
                Booking <span style={{ color: "#389ED7" }}>Information</span>
              </h2>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name*"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full sm:w-1/2 p-3 bg-blue-50 rounded border border-blue-100"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name (Optional)"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full sm:w-1/2 p-3 bg-blue-50 rounded border border-blue-100"
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Address*"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full p-3 bg-blue-50 rounded border border-blue-100"
                />
                <div className="flex flex-col sm:flex-row gap-4">
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className="w-full sm:w-1/4 p-3 bg-blue-50 rounded border border-blue-100 text-gray-400"
                  >
                    <option value="IN">IN (+91)</option>
                    <option value="US">US (+1)</option>
                    <option value="GER">GER (+49)</option>
                  </select>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number*"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full sm:w-3/4 p-3 bg-blue-50 rounded border border-blue-100"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-blue-50 rounded border border-blue-100"
                />
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    id="shareInfo"
                    name="shareInfo"
                    checked={form.shareInfo}
                    onChange={handleChange}
                    className="accent-blue-500"
                  />
                  <label htmlFor="shareInfo" className="text-sm text-gray-800">
                    Share booking information.*
                  </label>
                </div>
                {errorMsg && (
                  <div className="text-red-600 text-sm mt-2">{errorMsg}</div>
                )}
              </div>
              <div className="flex justify-center">
                <button
                  className="mt-6 px-6 py-2 text-white font-semibold rounded-full shadow"
                  style={{ backgroundColor: '#389ED7' }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2f8cc2')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#389ED7')}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? 'Booking...' : 'Book Now'}
                </button>
              </div>
            </>
          ) : (
            <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50 px-4">
              <div className="bg-white border border-blue-200 shadow-lg rounded-xl p-6 w-full max-w-sm text-center">
                <p className="text-lg font-semibold text-black mb-4">
                  Thank you! Your booking has been submitted.
                </p>
                <button
                  className="mt-2 px-5 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition"
                  onClick={handleClose}
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderPage;
