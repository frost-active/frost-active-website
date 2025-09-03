// WhatsAppButton.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phoneNumber = "4917613892344"; // Your WhatsApp number (with country code, no + sign)

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "6px",
        right: "4px",
        backgroundColor: "#25D366",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
        zIndex: 1000,
        cursor: "pointer",
      }}
    >
      <FaWhatsapp size={35} color="white" />
    </a>
  );
}
