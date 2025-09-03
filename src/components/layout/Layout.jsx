import React from 'react';
import Footer from './Footer';
import Header from './Header'; // Assuming you have a Header component

const Layout = ({ children }) => {
  return (
    <>
   <Header/>
      {/* Removed container/padding from main to allow full-width sections */}
      <main className="flex-grow "> {/* pt-20 ensures content isn't hidden under fixed header */}
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
