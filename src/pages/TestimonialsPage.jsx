
import React from 'react';
import { Link } from 'react-router-dom';

const TestimonialsPage = () => {
  // Testimonials section is now part of HomePage. This page is likely not needed.
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold mb-4">Testimonials</h1>
      <p className="text-muted-foreground mb-8">Testimonials are shown on the main page.</p>
      <Link to="/" className="text-primary hover:underline">Go back home</Link>
    </div>
  );
};

export default TestimonialsPage;
  