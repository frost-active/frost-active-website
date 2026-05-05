import React from "react";
import { Link } from "react-router-dom";

const INDIEGOGO_LINK =
  "https://www.indiegogo.com/en/projects/frostactive-38748367/stay-hydrated-focused-balanced-meet-frost-aura?ref=explore";

const ReservePage = () => {
  const styles = {
    container: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "stretch",
      fontFamily: "Inter, sans-serif",
      width: "100%",
      marginTop: "80px",
    },

    /* LEFT SECTION */
    left: {
      flex: "1 1 420px",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      color: "#579CD3",
    },

    leftImage: {
      width: "100%",
      maxWidth: "270px",
      marginBottom: "20px",
    
    },

    prelaunchText: {
      fontSize: "26px",
      fontWeight: "500",
      marginBottom: "30px",
      color: "#579CD3",
    },

    reserveBtn: {
      backgroundColor: "#579CD3",
      color: "#fff",
      border: "none",
      padding: "10px",
      fontSize: "24px",
      borderRadius: "6px",
      cursor: "pointer",
      marginBottom: "12px",
      width: "100%",
      maxWidth: "420px",
    },

    noThanksBtn: {
      backgroundColor: "#fff",
      border: "1px solid #579CD3",
      padding: "8px",
      fontSize: "20px",
      borderRadius: "6px",
      color: "#579CD3",
      cursor: "pointer",
      marginBottom: "12px",
      width: "100%",
      maxWidth: "420px",
    },

    terms: {
      fontSize: "16px",
      textAlign: "center",
      maxWidth: "420px",
      color: "#579CD3",
    },

    link: {
      color: "#579CD3",
    },

    /* RIGHT SECTION */
    right: {
      flex: "1 1 420px",
      padding: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    rightImage: {
      width: "100%",
      maxWidth: "820px",
      height: "100%",
      objectFit: "contain",
      borderRadius: "16px",
      cursor: "pointer",
    },

    /* FOOTER */
    footer: {
      width: "100%",
      backgroundColor: "#579CD3",
      color: "#fff",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      marginTop: "30px",
      borderRadius: "10px",
      fontSize: "18px",
      gap: "20px",
      textAlign: "center",
    },

    footerItem: {
      padding: "0 10px",
      whiteSpace: "nowrap",
    },

    footerDivider: {
      width: "1px",
      height: "26px",
      backgroundColor: "#ffffff",
      opacity: 0.7,
    },

    // NOTE: do NOT set `display` here — control display via CSS so media queries can show/hide it.
    mobileDivider: {
      width: "100%",
      height: "1px",
      backgroundColor: "#ffffff",
      opacity: 0.6,
      margin: "12px 0",
    },
  };

  return (
    <>
      {/* MOBILE FOOTER CSS */}
      <style>
        {`
          /* default: hide mobile horizontal divider and show vertical divider */
          .footer-mobile-divider {
            display: none;
          }

          .footer-vertical-divider {
            display: block;
          }

          @media (max-width: 768px) {
            /* on mobile: hide vertical divider, show horizontal full-width divider */
            .footer-vertical-divider {
              display: none;
            }
            .footer-mobile-divider {
              display: block;
            }
          }
        `}
      </style>

      <div style={styles.container}>
        {/* LEFT SECTION */}
        <div className="lg:ml-20" style={styles.left}>
          <div className="lg:ml-14 ml-10">
           
              <img
                src="/images/indiegogo.svg"
                alt="Prelaunch"
                style={styles.leftImage}
              />
         
            <br />
            <div style={styles.prelaunchText}>
              <b>Visit our Prelaunch Page</b>
            </div>
          </div>

          <button
            style={styles.reserveBtn}
            onClick={() => window.open(INDIEGOGO_LINK, "_blank")}
          >
            Reserve discount in Indiegogo
          </button>

          <button
            style={styles.noThanksBtn}
            onClick={() => (window.location.href = "/questions")}
          >
            No Thanks
          </button>

          <p style={styles.terms}>
            by reserving, you accept the{" "}
            <Link to="/terms" style={styles.link}>
              <b>terms and condition</b>
            </Link>
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="lg:mr-20" style={styles.right}>
          <a
            href={INDIEGOGO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{ width: "100%" }}
          >
            <img
              src="/images/reserve.jpeg"
              alt="Coming Soon"
              style={styles.rightImage}
            />
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        <div style={styles.footerItem}>10+ Features</div>
        <div className="footer-vertical-divider" style={styles.footerDivider} />
        <div className="footer-mobile-divider" style={styles.mobileDivider} />

        <div style={styles.footerItem}>10+ Customizable Remainders</div>
        <div className="footer-vertical-divider" style={styles.footerDivider} />
        <div className="footer-mobile-divider" style={styles.mobileDivider} />

        <div style={styles.footerItem}>432Hz Water Healing</div>
        <div className="footer-vertical-divider" style={styles.footerDivider} />
        <div className="footer-mobile-divider" style={styles.mobileDivider} />

        <div style={styles.footerItem}>
          INDIEGOGO PRELAUNCH CAMPAIGN TARGET
        </div>
      </div>
    </>
  );
};

export default ReservePage;