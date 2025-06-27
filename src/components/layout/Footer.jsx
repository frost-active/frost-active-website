import React from 'react';
import { Link } from 'react-router-dom';
import {
  Linkedin,
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-blue-50 px-4 sm:px-6 lg:px-8 flex flex-col">
      <div className="flex-1">
        {/* Top Logo Row */}
        <div className="max-w-7xl mx-auto mb-10 flex justify-start">
          <Link to="/" className="font-bold text-xl text-primary ml-[-20px]">
            <img
              src="/images/logo2.png"
              height={150}
              width={150}
              alt="FROST Aura Smart Hydration dock on a desk"
              className="object-contain"
            />
          </Link>
        </div>

        {/* Main Content Row */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left items-start">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start gap-4 relative -top-10">
            <p className="text-sm max-w-md" style={{ fontFamily: "Roboto", font: "regular" }}>
              Frost Aura is your smart hydration and wellness dock, designed to
              transform your desk into a healthier workspace. We believe small
              habits like drinking water, taking mindful breaks, and moving more
              can make a big difference. With smart reminders, sensor tracking,
              and soothing light cues, Frost Aura helps you stay hydrated,
              energized, and focused throughout the day.
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
              <img
                src="/images/appstore.png"
                alt="App Store"
                className="h-10 w-auto object-contain"
              />
              <img
                src="/images/playstore.png"
                alt="Google Play"
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>

          {/* Information Links */}
          <div className="relative -top-12 md:pl-6 flex flex-col items-center md:items-start">
            <h4 className="font-semibold mb-2 text-blue-700 text-lg">
              <span className="text-[#389ED7]">Information</span>
            </h4>
            <ul className="space-y-0">
              {/*}
              <li>
                <Link to="/faq" className="text-sm text-[#021637] hover:text-blue-700" style={{ fontFamily: "Roboto", font: "regular" }}>
                  FAQ
                </Link>
              </li>
              */}
              
              <li>
                <Link to="/about" className="text-sm text-[#021637] hover:text-blue-700" style={{ fontFamily: "Roboto", font: "regular" }}>
                  About Us
                </Link>
              </li>
       
              <li>
                <Link to="/community" className="text-sm text-[#021637] hover:text-blue-700" style={{ fontFamily: "Roboto", font: "regular" }}>
                  Community & Beta
                </Link>
              </li>

              {/*
              <li>
                <Link to="/services" className="text-sm text-[#021637] hover:text-blue-700" style={{ fontFamily: "Roboto", font: "regular" }}>
                  Blog / Resources
                </Link>
              </li>
              */}

              {/*
              <li>
                <Link to="/services" className="text-sm text-[#021637] hover:text-blue-700" style={{ fontFamily: "Roboto", font: "regular" }}>
                  Live Chat / Support Widget
                </Link>
              </li>
              */}

            </ul>
          </div>

          {/* Contact Info */}
          <div className="relative -top-12 md:pl-6 flex flex-col items-center md:items-start">
            <h4 className="font-semibold mb-2 text-blue-700 text-lg">
              <span className="text-[#389ED7]">Contact Info</span>
            </h4>
            <ul className="space-y-1 text-sm text-[#021637]" style={{ fontFamily: "Roboto", font: "regular" }}>
  <li className="flex items-center justify-center md:justify-start gap-2">
    <img
      src="/images/mail.png"
      alt="Mail Icon"
      className="h-5 w-5 object-contain"
    />
    <span>Info@frostactive.com</span>
  </li>
  <li className="flex items-center justify-center md:justify-start gap-2">
    <img
      src="/images/phone.png"
      alt="Phone Icon"
      className="h-5 w-5 object-contain"
    />
    <span>017613892344</span>
  </li>
  <li className="flex items-center justify-center md:justify-start gap-2">
    <img
      src="/images/location.png"
      alt="Location Icon"
      className="h-5 w-5 object-contain"
    />
    <span>Frankfurter str 11, 57072 Germany</span>
  </li>
</ul>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 pt-6 border-t border-blue-100">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 items-start gap-6">
            
           {/* Social Media Links Section - LEFT */}
<div className="flex gap-4 justify-center md:justify-start">
  <a href="https://www.linkedin.com/company/frost-active/" target="_blank" rel="noopener noreferrer">
    <img
      src="/images/linkedin.png"
      alt="LinkedIn"
      className="h-6 w-6 object-contain hover:brightness-90"
    />
  </a>
  <a href="https://www.facebook.com/share/16Q37LVMTM/" target="_blank" rel="noopener noreferrer">
    <img
      src="/images/facebook.png"
      alt="Facebook"
      className="h-6 w-6 object-contain hover:brightness-90"
    />
  </a>

  <a href="https://www.instagram.com/frost_active?igsh=MXA3N2FoYXY2aDBpbQ==" target="_blank" rel="noopener noreferrer">
    <img
      src="/images/instagram.png"
      alt="instagram"
      className="h-6 w-6 object-contain hover:brightness-90"
    />
  </a>

  <a href="https://www.youtube.com/@Frost_active" target="_blank" rel="noopener noreferrer">
    <img
      src="/images/youtube.png"
      alt="youtube"
      className="h-7 w-7 object-contain hover:brightness-90"
    />
  </a>
</div>



            {/* Partners Section - CENTER */}
            <div className="flex flex-col items-center justify-center">
              <h4 className="font-semibold text-blue-700 mb-4 text-base md:text-lg text-center">
                <span className="text-[#000000]">Designed in Germany in collaboration with</span>
              </h4>
              <div className="flex flex-wrap justify-center items-center gap-6">
                <img src="/images/onesmallstep.jpg" alt="EXIST" className="h-[60px] object-contain" />
                <img src="/images/fablab.png" alt="German Ministry" className="h-[60px] object-contain" />
              </div>
            </div>

            {/* Empty Right Column to keep center aligned */}
            <div className="hidden md:block"></div>
          </div>
        </div>
      </div>

      {/* Bottom Blue Bar */}
      <div className="w-screen h-[40px] bg-[#389ED7] mt-4 mx-[-1rem] sm:mx-[-1.5rem] lg:mx-[-2rem]"></div>
    </footer>
  );
};

export default Footer;
