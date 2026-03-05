"use client";

import { useState } from "react";

export default function Home() {
  const [complaint, setComplaint] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (complaint.trim()) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setComplaint("");
    setSubmitted(false);
  };

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            sans-serif;
          background: linear-gradient(135deg, #e0f7ef 0%, #f0fdf4 50%, #e8f5e9 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
      `}</style>

      <main style={styles.card}>
        {!submitted ? (
          <>
            <h1 style={styles.title}>
              COMPLAINT
              <br />
              BOX
            </h1>
            <p style={styles.subtitle}>
              We value your feedback. Please tell us what&apos;s wrong.
            </p>
            <textarea
              style={styles.textarea}
              placeholder="Type your complaint here..."
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              rows={6}
            />
            <button
              style={{
                ...styles.button,
                opacity: complaint.trim() ? 1 : 0.6,
                cursor: complaint.trim() ? "pointer" : "not-allowed",
              }}
              onClick={handleSubmit}
              disabled={!complaint.trim()}
            >
              SUBMIT COMPLAINT
            </button>
          </>
        ) : (
          <>
            <h1 style={styles.title}>
              SUBMISSION
              <br />
              RECEIVED
            </h1>
            <h2 style={styles.narcTitle}>
              YOU ARE
              <br />A NARC
            </h2>
            <p style={styles.subtitle}>
              Your complaint has been filed in the &quot;Nobody Cares&quot;
              department.
              <br />
              Snitches get stitches.
            </p>
            <button style={styles.resetButton} onClick={handleReset}>
              Submit Another (Narc)
            </button>
          </>
        )}
      </main>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: "white",
    borderRadius: 24,
    padding: "48px 32px",
    maxWidth: 420,
    width: "100%",
    boxShadow: "0 8px 40px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: 900,
    color: "#2DD4A8",
    letterSpacing: "-0.02em",
    lineHeight: 1.05,
  },
  narcTitle: {
    fontSize: 56,
    fontWeight: 900,
    color: "#2DD4A8",
    letterSpacing: "-0.02em",
    lineHeight: 1.05,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    lineHeight: 1.6,
  },
  textarea: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    border: "2px solid #e8e8e8",
    fontSize: 15,
    fontFamily: "inherit",
    resize: "vertical" as const,
    outline: "none",
    transition: "border-color 0.2s",
    color: "#333",
    background: "#fafafa",
  },
  button: {
    width: "100%",
    padding: "18px 32px",
    borderRadius: 50,
    border: "none",
    background: "linear-gradient(135deg, #2DD4A8, #22c997)",
    color: "white",
    fontSize: 18,
    fontWeight: 800,
    letterSpacing: "0.05em",
    transition: "transform 0.15s, box-shadow 0.15s",
    boxShadow: "0 4px 20px rgba(45, 212, 168, 0.35)",
  },
  resetButton: {
    padding: "12px 28px",
    borderRadius: 8,
    border: "2px solid #333",
    background: "transparent",
    color: "#333",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  },
};
