
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage'; 
import AboutPage from '@/pages/AboutPage'; 

import LoginPage from '@/pages/LoginPage'; 
import RegisterPage from '@/pages/RegisterPage'; 
import { Toaster } from '@/components/ui/toaster';

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



function App() {
  return (
    <Router>
    <ScrollToHash />

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

        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
}

export default App;
  