"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Script from "next/script";

declare global {
  interface Window {
    QRCode: any;
  }
}

const regionData = {
  SG: {
    name: "Cindy Goh",
    title: "Chief Executive Officer",
    company: "MNEX",
    address: "Mnex Singapore, 8 Temasek Blvd,<br>Suntec Tower 3, #44-02, Singapore 038988",
    phone: "++6591891000",
    whatsapp: "+6591891000",
    email: "cindy.goh@mnexprecision.com",
    website: "https://www.mnexprecision.com",
    location: "https://maps.app.goo.gl/NU4qLn5fHSEoi3PHA",
    vcf: "/static/ebiz-card/cindy.vcf"
  },
  CN: {
    name: "吴淑敏",
    title: "首席执行官",
    company: "MNEX",
    address: "铭板精密科技（中山）有限公司<br>广东省中山市板芙镇智能制造装备产业园智慧路1号<br>纳税识别号: 9144200076380367XK",
    phone: "+86 13917511111",
    whatsapp: "+6591891000",
    email: "cindy.goh@mnexprecision.com",
    website: "https://www.mnexprecision.com/zh",
    location: "https://maps.app.goo.gl/nJqBAGHmTs37s6te7",
    vcf: "/static/ebiz-card/cindy-cn.vcf"
  }
};

export default function EbizCardCindy() {
  const [currentRegion, setCurrentRegion] = useState<"SG" | "CN">("SG");
  const [modalActive, setModalActive] = useState(false);
  const [modalView, setModalView] = useState<"key" | "copy" | "qr" | null>(null);
  const [qrCodeLoaded, setQrCodeLoaded] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const data = regionData[currentRegion];

  useEffect(() => {
    if (qrCodeLoaded && qrRef.current && modalView === "qr") {
      updateQRCode();
    }
  }, [qrCodeLoaded, currentRegion, modalView]);

  useEffect(() => {
    if (modalActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalActive]);

  const updateQRCode = () => {
    if (qrRef.current && window.QRCode) {
      const url = typeof window !== "undefined" 
        ? window.location.href + (currentRegion === "CN" ? "?region=CN" : "")
        : "";
      qrRef.current.innerHTML = new window.QRCode({
        content: url,
        container: "svg-viewbox",
        join: true,
        ecl: "L",
        padding: 0
      }).svg();
    }
  };

  const handleRegionToggle = () => {
    setCurrentRegion(currentRegion === "SG" ? "CN" : "SG");
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: "Cindy Goh | CEO - MNEX",
          text: "You can view my Digital Business Card here:",
          url: window.location.href
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      setModalView("copy");
      setModalActive(true);
    }
  };

  const handleShowQR = () => {
    setModalView("qr");
    setModalActive(true);
  };

  const handleCloseModal = () => {
    setModalActive(false);
    setModalView(null);
  };

  const handleCopyURL = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      handleCloseModal();
    }
  };

  return (
    <>
      <style jsx global>{`
        :root {
          --primary: #0ea5e9;
          --primary-dark: #0284c7;
          --primary-light: #38bdf8;
          --bg-dark: #0a1628;
          --bg-card: #0f172a;
          --bg-surface: #1e293b;
          --text-primary: #f1f5f9;
          --text-secondary: #94a3b8;
          --text-muted: #64748b;
          --border: rgba(255, 255, 255, 0.1);
          --shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          --gradient-1: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);
          --gradient-2: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }

        .ebiz-card-page {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: var(--bg-dark);
          color: var(--text-primary);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 2rem 1rem;
          line-height: 1.6;
          overflow-x: hidden;
          position: relative;
        }

        body {
          background: var(--bg-dark);
        }

        .bg-gradient {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(ellipse at 20% 20%, rgba(14, 165, 233, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(14, 165, 233, 0.05) 0%, transparent 70%);
          z-index: -2;
          animation: pulse 15s ease-in-out infinite;
        }

        .bg-pattern {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 30px 30px;
          z-index: -1;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .card {
          width: 100%;
          max-width: 420px;
          background: var(--bg-card);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: var(--shadow);
          border: 1px solid var(--border);
          position: relative;
          animation: slideUp 0.6s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .top-actions {
          position: fixed;
          right: 2rem;
          top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          z-index: 10;
          opacity: 1;
          transition: opacity 0.3s ease;
          pointer-events: auto;
        }

        .action-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--primary);
          backdrop-filter: blur(10px);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          box-shadow: none;
        }

        .action-icon:hover {
          background: var(--primary-light);
          transform: scale(1.1);
          box-shadow: none;
        }

        .action-icon svg {
          width: 22px;
          height: 22px;
          color: white;
        }

        .profile-section {
          padding: 2rem 2rem 1rem;
          text-align: center;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          position: relative;
        }

        .profile-section::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border), transparent);
        }

        .logo-container {
          margin-bottom: 2rem;
          margin-top: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .logo-container img,
        .logo-image {
          max-height: 80px;
          max-width: 200px;
          object-fit: contain;
          filter: brightness(1.1);
          margin: 0 auto;
          display: block;
        }

        .profile-info {
          animation: fadeIn 0.8s ease-out 0.3s both;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .name {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0rem;
          letter-spacing: -0.02em;
        }

        .title {
          font-size: 1rem;
          font-weight: 500;
          color: var(--primary-light);
          margin-bottom: 0.5rem;
        }

        .tagline {
          margin-bottom: 0.75rem;
          line-height: 1.6;
        }

        .tagline span {
          display: block;
          font-size: 1rem;
          font-weight: 500;
          background: var(--gradient-1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .company-info {
          padding: 1rem 0;
          background: transparent;
          border-radius: 0;
          border: none;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          margin-top: 0.5rem;
        }

        .company {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--primary-light);
          margin-bottom: 0.4rem;
          letter-spacing: 0.08em;
        }

        .address {
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.6;
          letter-spacing: 0.02em;
        }

        .save-contact {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin: 1rem 2rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);
          color: white;
          text-decoration: none;
          border-radius: 16px;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(14, 165, 233, 0.4);
          animation: fadeIn 0.8s ease-out 0.5s both;
        }

        .save-contact:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(14, 165, 233, 0.5);
        }

        .save-contact:active {
          transform: translateY(0);
        }

        .save-contact svg {
          width: 22px;
          height: 22px;
        }

        .divider {
          display: flex;
          align-items: center;
          margin: 0 2rem 1rem;
          animation: fadeIn 0.8s ease-out 0.6s both;
        }

        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .divider span {
          padding: 0 1rem;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          font-weight: 500;
        }

        .actions-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem;
          padding: 0 1.5rem 1rem;
        }

        .action-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.25rem;
          text-decoration: none;
          transition: all 0.3s ease;
          animation: scaleIn 0.5s ease-out both;
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .action-card:hover {
          transform: translateY(-4px);
        }

        .action-card:hover .action-icon-wrapper {
          transform: scale(1.1);
        }

        .action-icon-wrapper {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .action-icon-wrapper svg {
          width: 26px;
          height: 26px;
        }

        .action-icon-wrapper.whatsapp {
          background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
          color: white;
        }

        .action-icon-wrapper.phone {
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
          color: white;
        }

        .action-icon-wrapper.email {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
        }

        .action-icon-wrapper.website {
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
          color: white;
        }

        .action-icon-wrapper.location {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
        }

        .action-card span {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-align: center;
        }

        .action-card:hover span {
          color: var(--text-primary);
        }

        .card-footer {
          padding: 1rem 2rem;
          text-align: center;
          border-top: 1px solid var(--border);
          background: rgba(0, 0, 0, 0.2);
        }

        .region-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .toggle-switch {
          position: relative;
          width: 60px;
          height: 32px;
          background: #6E6E6E;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid var(--border);
        }

        .toggle-switch.active {
          background: var(--primary);
        }

        .toggle-slider {
          position: absolute;
          top: 4px;
          left: 4px;
          width: 24px;
          height: 24px;
          background: white;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .toggle-switch.active .toggle-slider {
          left: 32px;
        }

        .region-label {
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .card-footer .tagline {
          margin-bottom: 0.75rem;
        }

        .card-footer .tagline span {
          display: inline;
          font-size: 0.9rem;
          font-weight: 500;
          background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .card-footer .tagline span:first-child::after {
          content: ' ';
        }

        .card-footer .copyright {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(10, 22, 40, 0.95);
          backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .modal.active {
          opacity: 1;
          visibility: visible;
        }

        .modal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .modal-close svg {
          width: 24px;
          height: 24px;
          color: var(--text-primary);
        }

        .modal-content {
          display: none;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem;
          max-width: 400px;
        }

        .modal-content.active {
          display: flex;
        }

        .modal-content p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .modal-content h3 {
          color: var(--text-primary);
          margin-top: 1rem;
          font-size: 1.25rem;
        }

        #qr {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        #qr svg {
          width: 200px;
          height: 200px;
        }

        .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          border: none;
          width: 100%;
        }

        .btn-primary {
          background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(14, 165, 233, 0.4);
        }

        .btn-primary.success {
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
        }

        .btn svg {
          width: 20px;
          height: 20px;
        }

        @media (max-width: 480px) {
          .ebiz-card-page {
            padding: 0;
            align-items: stretch;
            background: var(--bg-card);
          }
          
          .bg-gradient, .bg-pattern {
            display: none;
          }
          
          .top-actions {
            right: 1rem;
            top: 1rem;
          }
          
          .card {
            max-width: 100%;
            border-radius: 0;
            border: none;
            box-shadow: none;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          
          .profile-section {
            padding: 3rem 1.5rem 1.5rem;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          
          .logo-container {
            margin-bottom: 1.5rem;
          }
          
          .logo-container img {
            max-height: 90px;
          }
          
          .name {
            font-size: 2rem;
            margin-bottom: 0rem;
          }
          
          .title {
            font-size: 1.1rem;
            margin-bottom: 1rem;
            opacity: 0.9;
          }
          
          .company-info {
            background: transparent;
            border-radius: 0;
            padding: 1rem 0;
            border-top: 1px solid var(--border);
            border-bottom: 1px solid var(--border);
            margin-top: 0.5rem;
          }
          
          .save-contact {
            margin: 1.5rem 1.5rem;
            padding: 1.1rem 2rem;
            font-size: 1.1rem;
            position: sticky;
            bottom: 2rem;
            z-index: 100;
            box-shadow: 0 10px 30px rgba(14, 165, 233, 0.3);
            backdrop-filter: blur(5px);
          }
          
          .divider {
            margin: 0 2rem 1.5rem;
          }
          
          .actions-grid {
            padding: 0 1rem 2rem;
            gap: 1rem;
          }
          
          .action-card {
            padding: 0.5rem;
          }
          
          .action-icon-wrapper {
            width: 56px;
            height: 56px;
          }
          
          .action-icon-wrapper svg {
            width: 28px;
            height: 28px;
          }
          
          .card-footer {
            padding-bottom: 4rem;
            background: transparent;
            border-top: none;
          }
        }
      `}</style>

      <Script
        src="/static/ebiz-card/qrcode.min.js"
        onLoad={() => setQrCodeLoaded(true)}
        strategy="lazyOnload"
      />

      <div className="ebiz-card-page">
        <div className="bg-gradient"></div>
        <div className="bg-pattern"></div>

        {/* Modal */}
        <div
          ref={modalRef}
          className={`modal ${modalActive ? "active" : ""}`}
          onClick={handleModalClick}
        >
          <div className="modal-close" onClick={handleCloseModal}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </div>
          <div className={`modal-content ${modalView === "key" ? "active" : ""}`}>
            <p>Use my public key to send me encrypted messages</p>
            <a
              download
              target="_blank"
              rel="noreferrer"
              href="./Cindy's public key.asc"
              className="btn btn-primary"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              <span>Download Key</span>
            </a>
          </div>
          <div className={`modal-content ${modalView === "copy" ? "active" : ""}`}>
            <p>Copy and send the URL to share my Business Card</p>
            <button
              onClick={handleCopyURL}
              className={`btn btn-primary ${copySuccess ? "success" : ""}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2"/>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
              </svg>
              <span>{copySuccess ? "Copied!" : "Copy URL"}</span>
            </button>
          </div>
          <div className={`modal-content ${modalView === "qr" ? "active" : ""}`}>
            <div id="qr" ref={qrRef}></div>
            <h3>Scan the QR Code</h3>
            <p>to view my Business Card on another device</p>
          </div>
        </div>

        {/* Main Card */}
        <div className="card">
          {/* Header Actions */}
          <div className="top-actions">
            <a className="action-icon" title="Share" onClick={handleShare}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/>
              </svg>
            </a>
            <a className="action-icon" title="QR Code" onClick={handleShowQR}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
              </svg>
            </a>
          </div>

          {/* Profile Section */}
          <div className="profile-section">
            {/* Region Toggle */}
            <div className="region-toggle">
              <span className="region-label">SG</span>
              <div
                className={`toggle-switch ${currentRegion === "CN" ? "active" : ""}`}
                onClick={handleRegionToggle}
              >
                <div className="toggle-slider"></div>
              </div>
              <span className="region-label">CN</span>
            </div>

            <div className="logo-container">
              <Image
                src="/static/ebiz-card/logo.png"
                alt="Meiban Global Logo"
                width={200}
                height={80}
                className="logo-image"
                style={{ maxHeight: "80px", maxWidth: "200px", objectFit: "contain", filter: "brightness(1.1)" }}
              />
            </div>
            <div className="profile-info">
              <h1 className="name">{data.name}</h1>
              <p className="title">{data.title}</p>
              <div className="company-info">
                <p className="company">{data.company}</p>
                <p className="address" dangerouslySetInnerHTML={{ __html: data.address }}></p>
              </div>
            </div>
          </div>

          {/* Save Contact CTA */}
          <a
            className="save-contact"
            href={data.vcf}
            download
            rel="noreferrer"
            target="_blank"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
              <polyline points="17,21 17,13 7,13 7,21"/>
              <polyline points="7,3 7,8 15,8"/>
            </svg>
            <span>Save Contact</span>
          </a>

          {/* Divider */}
          <div className="divider">
            <span>Connect with me</span>
          </div>

          {/* Action Buttons */}
          <div className="actions-grid">
            <a
              href={`https://wa.me/${data.whatsapp.replace(/\s|\+/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="action-card"
              aria-label="WhatsApp"
            >
              <div className="action-icon-wrapper whatsapp">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <span>WhatsApp</span>
            </a>
            
            <a
              href={`tel:${data.phone.replace(/\s/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="action-card"
              aria-label="Mobile"
            >
              <div className="action-icon-wrapper phone">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <span>Mobile</span>
            </a>
            
            <a
              href={`mailto:${data.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="action-card"
              aria-label="Email"
            >
              <div className="action-icon-wrapper email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <span>Email</span>
            </a>
            
            <a
              href={data.website}
              target="_blank"
              rel="noopener noreferrer"
              className="action-card"
              aria-label="Website"
            >
              <div className="action-icon-wrapper website">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                </svg>
              </div>
              <span>Website</span>
            </a>
            
            <a
              href={data.location}
              target="_blank"
              rel="noopener noreferrer"
              className="action-card"
              aria-label="Location"
            >
              <div className="action-icon-wrapper location">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <span>Location</span>
            </a>
          </div>

          {/* Footer */}
          <footer className="card-footer">
            <div className="tagline">
              <span>Shaping Precision,</span>
              <span>Engineering What Matters</span>
            </div>
            <p className="copyright">© 2025 MNEX</p>
          </footer>
        </div>
      </div>
    </>
  );
}
