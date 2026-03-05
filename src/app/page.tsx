"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [complaint, setComplaint] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-3px, 3px); }
          40% { transform: translate(-3px, -3px); }
          60% { transform: translate(3px, 3px); }
          80% { transform: translate(3px, -3px); }
          100% { transform: translate(0); }
        }

        @keyframes glitchColor {
          0% { text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff; }
          25% { text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff; }
          50% { text-shadow: 2px 2px #ff00ff, -2px -2px #00ffff; }
          75% { text-shadow: -2px 2px #ff00ff, 2px -2px #00ffff; }
          100% { text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes lineExpand {
          from { width: 0; }
          to { width: 80px; }
        }

        @keyframes noise {
          0%, 100% { background-position: 0 0; }
          10% { background-position: -5% -10%; }
          20% { background-position: -15% 5%; }
          30% { background-position: 7% -25%; }
          40% { background-position: -5% 25%; }
          50% { background-position: -15% 10%; }
          60% { background-position: 15% 0%; }
          70% { background-position: 0% 15%; }
          80% { background-position: 3% 35%; }
          90% { background-position: -10% 10%; }
        }

        @keyframes textReveal {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 0 0 0); }
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          cursor: none;
        }

        html, body {
          overflow-x: hidden;
        }

        body {
          font-family: "Space Grotesk", "Inter", -apple-system, sans-serif;
          background: #0a0a0a;
          color: #e8e8e8;
          min-height: 100vh;
        }

        ::selection {
          background: #ff3c5f;
          color: #0a0a0a;
        }

        textarea::placeholder {
          color: #444;
        }

        textarea:focus {
          border-color: #ff3c5f !important;
          box-shadow: 0 0 0 1px #ff3c5f, 0 0 30px rgba(255, 60, 95, 0.1);
        }
      `}</style>

      {/* Custom cursor */}
      <div
        style={{
          position: "fixed",
          left: cursorPos.x - 10,
          top: cursorPos.y - 10,
          width: 20,
          height: 20,
          border: "2px solid #ff3c5f",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "transform 0.15s ease, opacity 0.15s ease",
          transform: isHovering ? "scale(2.5)" : "scale(1)",
          opacity: mounted ? 1 : 0,
          mixBlendMode: "difference",
        }}
      />
      <div
        style={{
          position: "fixed",
          left: cursorPos.x - 3,
          top: cursorPos.y - 3,
          width: 6,
          height: 6,
          background: "#ff3c5f",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: mounted ? 1 : 0,
        }}
      />

      {/* Noise overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.03,
          zIndex: 1,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          animation: "noise 0.5s steps(10) infinite",
        }}
      />

      {/* Background gradient accent */}
      <div
        style={{
          position: "fixed",
          top: "-30%",
          right: "-20%",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, rgba(255, 60, 95, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
          animation: "pulseGlow 4s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-30%",
          left: "-20%",
          width: "50vw",
          height: "50vw",
          background: "radial-gradient(circle, rgba(0, 255, 200, 0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
          animation: "pulseGlow 6s ease-in-out infinite",
        }}
      />

      <div
        ref={containerRef}
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "40px 24px",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        {/* Top nav line */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            padding: "24px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 10,
            animation: mounted ? "fadeIn 1s ease forwards" : "none",
            opacity: mounted ? 1 : 0,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#666",
            }}
          >
            CB/
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#444",
            }}
          >
            Est. 2025
          </span>
        </nav>

        {!submitted ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            {/* Big title */}
            <div
              style={{
                overflow: "hidden",
                animation: mounted ? "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards" : "none",
                opacity: mounted ? 1 : 0,
              }}
            >
              <h1
                style={{
                  fontSize: "clamp(56px, 12vw, 120px)",
                  fontWeight: 800,
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                  color: "#e8e8e8",
                  textTransform: "uppercase",
                }}
              >
                Complaint
              </h1>
            </div>

            <div
              style={{
                overflow: "hidden",
                animation: mounted ? "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards" : "none",
                opacity: mounted ? 1 : 0,
                display: "flex",
                alignItems: "baseline",
                gap: "0.3em",
              }}
            >
              <h1
                style={{
                  fontSize: "clamp(56px, 12vw, 120px)",
                  fontWeight: 800,
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                  color: "transparent",
                  WebkitTextStroke: "2px #e8e8e8",
                  textTransform: "uppercase",
                }}
              >
                Box
              </h1>
              <span
                style={{
                  fontSize: "clamp(56px, 10vw, 100px)",
                  color: "#ff3c5f",
                  fontWeight: 300,
                  lineHeight: 0.9,
                }}
              >
                *
              </span>
            </div>

            {/* Divider line */}
            <div
              style={{
                height: 1,
                background: "linear-gradient(90deg, #ff3c5f, transparent)",
                margin: "40px 0 32px",
                animation: mounted ? "lineExpand 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards" : "none",
                width: 0,
                maxWidth: 80,
              }}
            />

            {/* Subtitle */}
            <p
              style={{
                fontSize: "clamp(14px, 1.6vw, 18px)",
                color: "#666",
                maxWidth: 400,
                lineHeight: 1.6,
                fontWeight: 400,
                animation: mounted ? "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards" : "none",
                opacity: mounted ? 1 : 0,
                marginBottom: 40,
              }}
            >
              We value your feedback.
              <br />
              Tell us what&apos;s wrong.
            </p>

            {/* Textarea */}
            <div
              style={{
                animation: mounted ? "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards" : "none",
                opacity: mounted ? 1 : 0,
              }}
            >
              <textarea
                style={{
                  width: "100%",
                  maxWidth: 560,
                  padding: "20px 24px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid #222",
                  borderRadius: 0,
                  color: "#e8e8e8",
                  fontSize: 16,
                  fontFamily: "inherit",
                  resize: "vertical",
                  outline: "none",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  lineHeight: 1.6,
                }}
                placeholder="Type your complaint here..."
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                rows={5}
              />
            </div>

            {/* Submit button */}
            <div
              style={{
                animation: mounted ? "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards" : "none",
                opacity: mounted ? 1 : 0,
                marginTop: 24,
              }}
            >
              <button
                style={{
                  padding: "18px 48px",
                  background: complaint.trim() ? "#ff3c5f" : "transparent",
                  border: complaint.trim() ? "1px solid #ff3c5f" : "1px solid #333",
                  color: complaint.trim() ? "#0a0a0a" : "#444",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  cursor: complaint.trim() ? "none" : "not-allowed",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  fontFamily: "inherit",
                  borderRadius: 0,
                }}
                onClick={handleSubmit}
                disabled={!complaint.trim()}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Submit Complaint
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            {/* Glitch title */}
            <div
              style={{
                overflow: "hidden",
                animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              }}
            >
              <h1
                style={{
                  fontSize: "clamp(48px, 10vw, 100px)",
                  fontWeight: 800,
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                  color: "#e8e8e8",
                  textTransform: "uppercase",
                }}
              >
                Submission
              </h1>
            </div>
            <div
              style={{
                overflow: "hidden",
                animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.08s forwards",
                opacity: 0,
              }}
            >
              <h1
                style={{
                  fontSize: "clamp(48px, 10vw, 100px)",
                  fontWeight: 800,
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                  color: "transparent",
                  WebkitTextStroke: "2px #e8e8e8",
                  textTransform: "uppercase",
                }}
              >
                Received
              </h1>
            </div>

            {/* Divider */}
            <div
              style={{
                height: 1,
                background: "linear-gradient(90deg, #ff3c5f, transparent)",
                margin: "48px 0 40px",
                animation: "lineExpand 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards",
                width: 0,
                maxWidth: 80,
              }}
            />

            {/* NARC glitch */}
            <div
              style={{
                animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards",
                opacity: 0,
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(64px, 14vw, 140px)",
                  fontWeight: 900,
                  lineHeight: 0.85,
                  letterSpacing: "-0.03em",
                  color: "#ff3c5f",
                  textTransform: "uppercase",
                  animation: "glitchColor 3s ease-in-out infinite",
                  position: "relative",
                }}
              >
                You Are
                <br />
                A Narc
              </h2>
            </div>

            {/* Message */}
            <p
              style={{
                fontSize: "clamp(14px, 1.6vw, 18px)",
                color: "#555",
                maxWidth: 460,
                lineHeight: 1.7,
                fontWeight: 400,
                marginTop: 32,
                animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s forwards",
                opacity: 0,
              }}
            >
              Your complaint has been filed in the
              <span style={{ color: "#ff3c5f" }}> &quot;Nobody Cares&quot; </span>
              department. Snitches get stitches.
            </p>

            {/* Reset button */}
            <div
              style={{
                marginTop: 40,
                animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.45s forwards",
                opacity: 0,
              }}
            >
              <button
                style={{
                  padding: "16px 40px",
                  background: "transparent",
                  border: "1px solid #333",
                  color: "#888",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  cursor: "none",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  fontFamily: "inherit",
                  borderRadius: 0,
                }}
                onClick={handleReset}
                onMouseEnter={(e) => {
                  setIsHovering(true);
                  e.currentTarget.style.borderColor = "#ff3c5f";
                  e.currentTarget.style.color = "#ff3c5f";
                }}
                onMouseLeave={(e) => {
                  setIsHovering(false);
                  e.currentTarget.style.borderColor = "#333";
                  e.currentTarget.style.color = "#888";
                }}
              >
                Submit Another (Narc)
              </button>
            </div>
          </div>
        )}

        {/* Bottom text */}
        <div
          style={{
            position: "fixed",
            bottom: 24,
            left: 40,
            right: 40,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 10,
            animation: mounted ? "fadeIn 1.5s ease 0.8s forwards" : "none",
            opacity: 0,
          }}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#333",
              fontWeight: 500,
            }}
          >
            Scroll to complain
          </span>
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#333",
              fontWeight: 500,
            }}
          >
            &copy; Nobody Cares Dept.
          </span>
        </div>
      </div>
    </>
  );
}
