import React, { useState } from "react";

// ==== TOAST HOOK USE (Pass the actual import in your project) ====
import { useToast } from "@/hooks/use-toast"; // Adjust if your file structure is different!

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxv_rlA8zUYbhhN8PuMVbcoh0mhXzlWAetJA9EH8qAGAd3Ya4myK8tt1h3yPFZ3d2TN/exec";

const MASTER_GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxqXNa5d1oYF9yiHJpsxtv6sdtV0KsdGUSg_2oSe--dHl4YIe7tPCYHZzeBsIojmqXt/exec";

const CHEERIO_API_KEY =
  "dfd7bcf44867df2f37bccce492a2368dcb0d9cdcd5963dd47acd270de09208ba";

const ContactUsSection = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    query: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  // ---- Handlers ----
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---- Email Validation per your strict requirements ----
  const validateEmail = (email) => {
    // Basic structure check
    const regex = /^[^\s@]+@[^\s@]+\.[A-Za-z.]{2,}$/;
    if (!regex.test(email)) return false;
    // Full valid TLD list (master list)
    const validTLDs = new Set([
      "com","org","net","info","biz","xyz","dev","app","pro","me","name",
      "online","site","tech","store","ai","io","cloud","digital","media",
      "in","us","uk","ca","au","nz","de","fr","jp","sg","ae","sa","pk","lk",
      "bd","cn","es","it","nl","co.in","org.in","net.in","ac.in","gov.in","nic.in",
      "co.uk","org.uk","ac.uk","co.za","co.jp","com.au","com.sg","com.pk"
    ]);
    const parts = email.toLowerCase().split("@")[1].split(".");
    const tld1 = parts[parts.length - 1];
    const tld2 = parts.length >= 2 ? parts.slice(-2).join(".") : null;
    if (validTLDs.has(tld1)) return true;
    if (tld2 && validTLDs.has(tld2)) return true;
    return false;
  };

  // ---- Submit Handler ----
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, query, message } = formData;

    // 1️⃣ Validation
    if (!name || !email || !phone || !query || !message) {
      toast({
        title: "All fields are required",
        description: "Please fill in every field before submitting.",
        variant: "destructive",
      });
      return;
    }

    // 2️⃣ Email validation
    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      // Google Sheet (sends all details)
      fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).catch(() => {});

      // Master Email Sheet (EMAIL ONLY)
      fetch(MASTER_GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${encodeURIComponent(email)}&source=Contact Us`,
      }).catch(() => {});

      // Cheerio Manual Workflow Trigger (UPDATED — email only)
      await fetch(
        "https://newprod.api.cheerio.in/direct-apis/v1/manualTriggerWorkflow",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": CHEERIO_API_KEY,
          },
          body: JSON.stringify({
            email: email,
            workflowId: "691d8c61dfc2664a0552732b",
          }),
        }
      );

      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll be in touch soon.",
        variant: "default",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        query: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      style={{
        background: "#E2EFF7",
        padding: "clamp(60px,6vw,120px) 12px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 520, margin: "0 auto", width: "100%" }}>
        <h2
          style={{
            letterSpacing: "4px",
            color: "#41587E",
            fontSize: "clamp(20px,4vw,34px)",
            fontWeight: 400,
            marginBottom: 8,
            marginTop: 0,
            textTransform: "uppercase",
            letterSpacinng: "0.1em",
          }}
        >
          CONTACT US
        </h2>
        <p
          style={{
            letterSpacing: "2px",
            color: "#41587E",
            opacity: 0.7,
            fontSize: "clamp(12px,2vw,18px)",
            marginBottom: 32,
          }}
        >
          WILL LOVE TO HEAR FROM YOU
        </p>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            width: "100%",
          }}
          autoComplete="off"
        >
          <div
            style={{
              display: "flex",
              gap: 16,
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <input
              style={inputStyle}
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={submitting}
              maxLength={128}
              required
            />
            <input
              style={inputStyle}
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={submitting}
              maxLength={128}
              required
              type="email"
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: 16,
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <input
              style={inputStyle}
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={submitting}
              maxLength={24}
              required
              type="tel"
            />
            <input
              style={inputStyle}
              placeholder="Query"
              name="query"
              value={formData.query}
              onChange={handleChange}
              disabled={submitting}
              maxLength={128}
              required
            />
          </div>
          <textarea
            style={{
              ...inputStyle,
              minHeight: 108,
              resize: "vertical",
              width: "100%",
            }}
            placeholder="Feedback"
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={submitting}
            maxLength={2000}
            required
          />
          <button
            type="submit"
            disabled={submitting}
            style={{
              background: "#41587E",
              color: "#fff",
              fontWeight: 500,
              fontSize: "20px",
              border: "none",
              borderRadius: "12px",
              padding: "15px 0",
              width: "100%",
              cursor: submitting ? "not-allowed" : "pointer",
              opacity: submitting ? 0.8 : 1,
              transition: "background 0.3s, opacity 0.2s",
              boxShadow: "none",
            }}
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
      <style>{`
        @media (max-width: 600px) {
          #contact form > div {
            flex-direction: column !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </section>
  );
};

const inputStyle = {
  width: "100%",
  border: "none",
  borderRadius: "12px",
  background: "#fff",
  padding: "22px 18px",
  fontWeight: 400,
  fontSize: "18px",
  color: "#41587E",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
  marginBottom: 0,
  boxShadow: "none",
};

export default ContactUsSection;