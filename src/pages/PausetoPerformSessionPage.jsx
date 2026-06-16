import React, { useState, useEffect } from "react";

export default function PauseToPerformPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    question: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // RESPONSIVE STATE
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const validate = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid e-mail address";
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        await fetch(
          "https://script.google.com/macros/s/AKfycbxjsO0QDu1WhWLuhrRh_KFzb8rnc7o_z0gESAkl200WGz0ANKBv320HGWMIVzOsWCL4/exec",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        setSubmitted(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          question: "",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="fa-page-root mt-16">
      <style>{frostStyles}</style>

      {/* Atmospheric Background */}
      <div className="fa-page-bg" aria-hidden="true">
        <span className="fa-page-orb fa-page-orb--1" />
        <span className="fa-page-orb fa-page-orb--2" />
        <span className="fa-page-orb fa-page-orb--3" />
        <span className="fa-page-grid" />
      </div>

      <main className="fa-page-container">
        <div className="fa-page-content" style={{
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        }}>
          
          {/* LEFT SECTION - CONTENT */}
          <div className="fa-page-left">
            <div className="fa-page-eyebrow">
              <span>FROST WELLNESS SESSION</span>
            </div>

            <h1 className="fa-page-heading" style={{
              fontSize: isMobile ? "2.2rem" : "3.2rem",
              textAlign: isMobile ? "center" : "left",
            }}>
              Pause to <span className="fa-page-accent">Perform</span> 💪
            </h1>

            {/* SESSION DETAILS SECTION */}
            <div className="fa-page-session-details">
              <div className="fa-session-detail-item">
                <svg className="fa-session-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <div className="fa-session-detail-content">
                  <p className="fa-session-label">Date & Time</p>
                  <p className="fa-session-value">June 14, 2026 • 4:30 PM</p>
                </div>
              </div>

              
            </div>

            <p className="fa-page-description" style={{
              textAlign: isMobile ? "center" : "left",
            }}>
              Recharge your body and refresh your mind. Join our wellness session focused on posture correction, eye breaks, stretch routines, and walking breaks to improve productivity and everyday performance.
            </p>

            {/* Image Card */}
            <div className="fa-page-image-card">
              <img
                src="/images/pause-to-perform-1.jpeg"
                alt="Frost Device"
                className="fa-page-device-image"
              />
            </div>
          </div>

          {/* RIGHT SECTION - FORM */}
          <div className="fa-page-form-wrapper">
            <div className="fa-page-form-card">
              {!submitted ? (
                <>
                  <h2 className="fa-page-form-title" style={{
                    fontSize: isMobile ? "1.75rem" : "2.2rem",
                    textAlign: isMobile ? "center" : "left",
                  }}>
                    Reserve Your Seat
                  </h2>

                  <form onSubmit={handleSubmit} className="fa-page-form">
                    {/* NAME FIELD */}
                    <div className="fa-page-field">
                      <label className="fa-page-label">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="fa-page-input"
                      />
                      {errors.fullName && (
                        <p className="fa-page-error">{errors.fullName}</p>
                      )}
                    </div>

                    {/* EMAIL FIELD */}
                    <div className="fa-page-field">
                      <label className="fa-page-label">E-mail *</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your e-mail"
                        value={formData.email}
                        onChange={handleChange}
                        className="fa-page-input"
                      />
                      {errors.email && (
                        <p className="fa-page-error">{errors.email}</p>
                      )}
                    </div>

                    {/* PHONE FIELD */}
                    <div className="fa-page-field">
                      <label className="fa-page-label">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="fa-page-input"
                      />
                      {errors.phone && (
                        <p className="fa-page-error">{errors.phone}</p>
                      )}
                    </div>

                    {/* QUESTIONS FIELD */}
                    <div className="fa-page-field">
                      <label className="fa-page-label">Any questions for the session?</label>
                      <textarea
                        rows="4"
                        name="question"
                        placeholder="Write your questions here..."
                        value={formData.question}
                        onChange={handleChange}
                        className="fa-page-textarea"
                      />
                    </div>

                    <button type="submit" className="fa-page-button">
                      Reserve Now
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </button>
                  </form>
                </>
              ) : (
                /* SUCCESS STATE */
                <div className="fa-page-success">
                  <div className="fa-page-success-circle">✓</div>
                  <h2 className="fa-page-success-title">Registration Successful</h2>
                  <p className="fa-page-success-text">
                    Thank you for registering for <span className="fa-page-success-highlight">Pause to Perform 💪</span>
                  </p>
                  <p className="fa-page-success-subtext">Check your e-mail for further updates.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

const frostStyles = `
 @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap');

.fa-page-root {
  --frost-primary: #1F6FEB;
  --frost-primary-deep: #0E4FC0;
  --frost-cyan: #38BDF8;
  --frost-navy: #0A2540;
  --frost-ink: #0B1B33;
  --frost-slate: #5B6B85;
  --frost-50: #F2F8FF;
  --frost-100: #E5F0FF;
  --frost-200: #CADEFF;
  --glass: rgba(255, 255, 255, 0.72);
  --glass-border: rgba(255, 255, 255, 0.85);

  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  font-family: 'Manrope', system-ui, sans-serif;
  color: var(--frost-ink);
  background: radial-gradient(120% 120% at 80% -10%, #EAF4FF 0%, #F6FBFF 45%, #FFFFFF 100%);
  box-sizing: border-box;
  padding-top: 72px;
  padding-bottom: 72px;
}

.fa-page-root * {
  box-sizing: border-box;
}

/* Background Atmosphere
.fa-page-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.fa-page-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.55;
}

.fa-page-orb--1 {
  width: 420px;
  height: 420px;
  top: -120px;
  right: -80px;
  background: radial-gradient(circle at 30% 30%, #6FBBFF, #1F6FEB);
}

.fa-page-orb--2 {
  width: 360px;
  height: 360px;
  bottom: -140px;
  left: -100px;
  background: radial-gradient(circle at 50% 50%, #9FE0FF, #38BDF8);
  opacity: 0.4;
}

.fa-page-orb--3 {
  width: 280px;
  height: 280px;
  top: 40%;
  left: 55%;
  background: radial-gradient(circle at 50% 50%, #CFE8FF, #7CC4FF);
  opacity: 0.3;
}

.fa-page-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(31, 111, 235, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(31, 111, 235, 0.05) 1px, transparent 1px);
  background-size: 54px 54px;
  mask-image: radial-gradient(110% 80% at 50% 0%, #000 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(110% 80% at 50% 0%, #000 30%, transparent 75%);
}

/* Container */
.fa-page-container {
  position: relative;
  z-index: 1;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
}

.fa-page-content {
  display: grid;
  gap: 55px;
  align-items: center;
  animation: faUpPage 0.7s ease both;
}

/* Left Section */
.fa-page-left {
  color: var(--frost-navy);
}

.fa-page-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 8px 16px;
  border-radius: 999px;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  box-shadow: 0 6px 22px rgba(31, 111, 235, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.02em;
  color: var(--frost-primary-deep);
  animation: faUpPage 0.7s 0.08s ease both;
  width: fit-content;
}

.fa-page-heading {
  font-family: 'Fraunces', serif;
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 22px 0 0;
  color: var(--frost-navy);
  animation: faUpPage 0.7s 0.16s ease both;
}

.fa-page-accent {
  background: linear-gradient(120deg, var(--frost-primary), var(--frost-cyan));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-style: italic;
}

/* SESSION DETAILS SECTION - STYLED LIKE GOOGLE/META EVENTS */
.fa-page-session-details {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 32px 0 24px;
  animation: faUpPage 0.7s 0.2s ease both;
}

.fa-session-detail-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(31, 111, 235, 0.12);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

.fa-session-detail-item:hover {
  background: rgba(255, 255, 255, 0.65);
  border-color: rgba(31, 111, 235, 0.25);
  box-shadow: 0 8px 24px rgba(31, 111, 235, 0.1);
}

.fa-session-icon {
  width: 28px;
  height: 28px;
  min-width: 28px;
  color: var(--frost-primary);
  stroke-width: 2.5;
}

.fa-session-detail-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fa-session-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--frost-slate);
  text-transform: uppercase;
  margin: 0;
}

.fa-session-value {
  font-size: 16px;
  font-weight: 600;
  color: var(--frost-navy);
  margin: 0;
  line-height: 1.4;
}

.fa-page-description {
  margin: 18px auto 0;
  max-width: 560px;
  font-size: clamp(0.95rem, 2.2vw, 1.1rem);
  line-height: 1.6;
  color: var(--frost-slate);
  animation: faUpPage 0.7s 0.24s ease both;
}

.fa-page-image-card {
  margin-top: 30px;
  padding: 12px;
  border-radius: 24px;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 18px 50px rgba(10, 37, 64, 0.08);
  animation: faCardPage 0.6s 0.32s ease both;
}

.fa-page-device-image {
  width: 100%;
  object-fit: cover;
  border-radius: 20px;
  display: block;
}

/* Form Section */
.fa-page-form-wrapper {
  animation: faUpPage 0.7s 0.32s ease both;
}

.fa-page-form-card {
  padding: 42px;
  border-radius: 24px;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 18px 50px rgba(10, 37, 64, 0.08);
}

.fa-page-form-title {
  font-family: 'Fraunces', serif;
  font-weight: 600;
  line-height: 1.1;
  color: var(--frost-navy);
  margin: 0 0 30px;
}

.fa-page-form {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.fa-page-field {
  display: flex;
  flex-direction: column;
}

.fa-page-label {
  display: block;
  margin-bottom: 10px;
  color: var(--frost-navy);
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.02em;
}

.fa-page-input,
.fa-page-textarea {
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid var(--frost-200);
  background: rgba(255, 255, 255, 0.5);
  color: var(--frost-ink);
  font-family: 'Manrope', inherit;
  font-size: 15px;
  transition: all 0.25s ease;
}

.fa-page-input:focus,
.fa-page-textarea:focus {
  outline: none;
  border-color: var(--frost-primary);
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 0 3px rgba(31, 111, 235, 0.1);
}

.fa-page-input::placeholder,
.fa-page-textarea::placeholder {
  color: var(--frost-slate);
}

.fa-page-textarea {
  resize: none;
}

.fa-page-error {
  color: #E85D75;
  margin-top: 8px;
  font-size: 13px;
  font-weight: 500;
}

.fa-page-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  font-family: 'Manrope', inherit;
  font-weight: 700;
  font-size: 15px;
  padding: 14px 24px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(120deg, var(--frost-primary), var(--frost-primary-deep));
  color: white;
  box-shadow: 0 12px 28px rgba(31, 111, 235, 0.3);
  transition: all 0.25s ease;
  margin-top: 8px;
}

.fa-page-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 34px rgba(31, 111, 235, 0.42);
}

.fa-page-button:active {
  transform: translateY(0);
}

.fa-page-button svg {
  transition: transform 0.25s ease;
}

.fa-page-button:hover svg {
  transform: translateX(4px);
}

/* Success State */
.fa-page-success {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  animation: faUpPage 0.6s ease both;
}

.fa-page-success-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(120deg, var(--frost-primary), var(--frost-cyan));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: white;
  font-weight: 700;
  margin-bottom: 30px;
  box-shadow: 0 12px 40px rgba(31, 111, 235, 0.35);
}

.fa-page-success-title {
  font-family: 'Fraunces', serif;
  color: var(--frost-navy);
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 15px;
}

.fa-page-success-text {
  color: var(--frost-slate);
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 10px;
}

.fa-page-success-highlight {
  color: var(--frost-primary);
  font-weight: 600;
}

.fa-page-success-subtext {
  color: var(--frost-slate);
  font-size: 15px;
}

/* Animations */
@keyframes faUpPage {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes faCardPage {
  from {
    opacity: 0;
    transform: translateY(26px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .fa-page-root {
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .fa-page-container {
    padding: 0 18px;
  }

  .fa-page-content {
    gap: 40px;
  }

 .fa-page-eyebrow {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    margin: 0 auto;
    padding: 8px 14px;
  }

  .fa-page-left {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .fa-page-heading {
    text-align: center;
  }

  .fa-page-session-details {
    margin: 24px 0 20px;
  }

  .fa-session-detail-item {
    padding: 14px;
    gap: 12px;
  }

  .fa-session-label {
    font-size: 11px;
  }

  .fa-session-value {
    font-size: 15px;
  }

  .fa-page-description {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }

  .fa-page-form-card {
    padding: 28px 20px;
  }

  .fa-page-form-title {
    text-align: center;
  }

  .fa-page-success {
    min-height: 350px;
  }

  .fa-page-success-circle {
    width: 90px;
    height: 90px;
    font-size: 42px;
  }

  .fa-page-success-title {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .fa-page-root {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .fa-page-container {
    padding: 0 16px;
  }

  .fa-page-orb--1 {
    width: 300px;
    height: 300px;
    top: -100px;
    right: -100px;
  }

  .fa-page-orb--2 {
    width: 250px;
    height: 250px;
    bottom: -120px;
    left: -80px;
  }

  .fa-page-heading {
    font-size: 1.8rem;
  }

  .fa-page-session-details {
    gap: 12px;
    margin: 20px 0 16px;
  }

  .fa-session-detail-item {
    padding: 12px;
    gap: 10px;
  }

  .fa-session-icon {
    width: 24px;
    height: 24px;
  }

  .fa-session-value {
    font-size: 14px;
  }

  .fa-page-form-card {
    padding: 24px 16px;
  }

  .fa-page-button {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fa-page-root * {
    animation: none !important;
    transition: none !important;
  }
}
`;