import React from 'react';

const GetInTouch = () => {
  return (
    <div style={styles.container}>
      <h2>Get in Touch</h2>
      <p>If you have any questions, feel free to reach out!</p>
      <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="Your Name" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Your Email" required />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" placeholder="Your Message" required></textarea>

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  }
};

export default GetInTouch;
