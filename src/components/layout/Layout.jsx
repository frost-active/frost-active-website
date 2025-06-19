import React from 'react';

import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
   

      {/* Removed container/padding from main to allow full-width sections */}
      <main className="flex-grow "> {/* pt-20 ensures content isn't hidden under fixed header */}
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
