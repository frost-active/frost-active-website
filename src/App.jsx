
import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage'; 
import AboutPage from '@/pages/AboutPage'; 

import LoginPage from '@/pages/LoginPage'; 
import RegisterPage from '@/pages/RegisterPage'; 
import { Toaster } from '@/components/ui/toaster';
import GoogleTranslate from './components/GoogleTranslate';



import OrderPage from '@/pages/OrderPage'; 
import BlogsPage1 from '@/pages/BlogsPage1'; 
import BlogsPage2 from '@/pages/BlogsPage2'; 
import BlogsPage3 from '@/pages/BlogsPage3'; 
import BlogsPage4 from '@/pages/BlogsPage4'; 
import DJAngelPage from '@/pages/DJAngelPage';

import CommunityPage from './pages/CommunityPage';
import GetInTouch from './pages/GetInTouch';
import ScrollToHash from './components/ScrollToHash';
import Investor from './pages/Investor';
import usePageTracking from './usePageTracking';

import LanguageSelector from './components/LanguageSelector';

import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

import CookieConsent from "./components/CookieConsent";

import PreOrderPage from './pages/PreOrderPage';
import ReservePage from './pages/ReservePage';
import NoThanksPage from './pages/NoThanksPage';

import EmailPopup from "./components/EmailPopup";
import WhatsAppButton from './components/WhatsAppButton';

import WaterIntakeCalculator from './pages/WaterCalculator';
import QuizPage from './pages/QuizPage';

function App() {
   
  return (
    <Router>
    <PageTracker />
    <ScrollToHash />
    {/* <GoogleTranslate/>
     {/* Email popup Triggers for 20 sec */}
     <EmailPopup /> 

      <WhatsAppButton />

     {/* <CookieConsent />
     {/* <LanguageSelector /> */}
      <Layout>
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
         
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          

          <Route path="/order" element={<OrderPage />} />
           <Route path="/getin" element={<GetInTouch />} />

           <Route path="/blogs" element={<BlogsPage1 />} />
           <Route path="/blogs2" element={<BlogsPage2 />} />
           <Route path="/blogs3" element={<BlogsPage3 />} />
           <Route path="/blogs4" element={<BlogsPage4 />} />
            <Route path="/djangel" element={<DJAngelPage />} />

            <Route path="/community" element={<CommunityPage />} />
            <Route path="/invest" element={<Investor />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/prelaunch" element={<PreOrderPage />} />
            <Route path="/reserve" element={<ReservePage />} />
            <Route path="/questions" element={<NoThanksPage />} />
            <Route path="/waterintakecalculator" element={<WaterIntakeCalculator />} />

            <Route path="/quiz" element={<QuizPage />}  />
           
          

        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
}

// ✅ Wrap your usePageTracking in a component
const PageTracker = () => {
  usePageTracking();
  return null;
};

export default App;
  