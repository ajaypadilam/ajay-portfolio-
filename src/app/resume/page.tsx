"use client";

import { useEffect } from "react";

export default function ResumePage() {
  useEffect(() => {
    document.title = "Resume – Ajay Padilam";
  }, []);

  const handlePrint = () => window.print();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'Inter', sans-serif;
          background: #f5f5f5;
          color: #1a1a1a;
        }

        .print-bar {
          position: fixed;
          top: 0; left: 0; right: 0;
          background: #1a1a2e;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 32px;
          z-index: 999;
          gap: 16px;
        }
        .print-bar span { font-size: 14px; opacity: 0.8; }
        .print-bar-btns { display: flex; gap: 12px; }
        .btn-print {
          background: #6c63ff;
          color: white;
          border: none;
          padding: 8px 20px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .btn-back {
          background: transparent;
          color: white;
          border: 1px solid rgba(255,255,255,0.3);
          padding: 8px 20px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          text-decoration: none;
        }

        .page-wrap {
          margin-top: 56px;
          display: flex;
          justify-content: center;
          padding: 32px 16px 64px;
        }

        .resume {
          width: 794px;
          min-height: 1123px;
          background: white;
          box-shadow: 0 4px 40px rgba(0,0,0,0.15);
          padding: 48px 52px;
        }

        /* HEADER */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 20px;
          border-bottom: 2.5px solid #6c63ff;
          margin-bottom: 24px;
        }
        .header-left h1 {
          font-size: 30px;
          font-weight: 700;
          color: #1a1a2e;
          letter-spacing: -0.5px;
        }
        .header-left h2 {
          font-size: 15px;
          font-weight: 500;
          color: #6c63ff;
          margin-top: 4px;
        }
        .header-right {
          text-align: right;
          font-size: 12.5px;
          color: #555;
          line-height: 1.9;
        }
        .header-right a { color: #6c63ff; text-decoration: none; }

        /* SECTION */
        .section { margin-bottom: 22px; }
        .section-title {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #6c63ff;
          border-bottom: 1px solid #e8e4ff;
          padding-bottom: 5px;
          margin-bottom: 12px;
        }

        /* PROFILE */
        .profile-text {
          font-size: 13px;
          line-height: 1.75;
          color: #333;
        }

        /* SKILLS GRID */
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 24px;
        }
        .skill-group { }
        .skill-cat {
          font-size: 11.5px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 4px;
        }
        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        .skill-tag {
          background: #f0eeff;
          color: #6c63ff;
          font-size: 10.5px;
          font-weight: 500;
          padding: 2px 8px;
          border-radius: 20px;
          border: 1px solid #d4cfff;
        }

        /* EXPERIENCE */
        .exp-item { margin-bottom: 18px; }
        .exp-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2px;
        }
        .exp-title {
          font-size: 13.5px;
          font-weight: 700;
          color: #1a1a2e;
        }
        .exp-date {
          font-size: 11.5px;
          color: #888;
          white-space: nowrap;
          margin-left: 8px;
        }
        .exp-company {
          font-size: 12px;
          color: #6c63ff;
          font-weight: 500;
          margin-bottom: 6px;
        }
        .exp-list {
          padding-left: 16px;
          list-style: disc;
        }
        .exp-list li {
          font-size: 12px;
          line-height: 1.7;
          color: #444;
          margin-bottom: 2px;
        }

        /* PROJECTS */
        .proj-item { margin-bottom: 14px; }
        .proj-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }
        .proj-title {
          font-size: 13px;
          font-weight: 700;
          color: #1a1a2e;
        }
        .proj-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 3px;
          margin-bottom: 5px;
        }
        .proj-tag {
          background: #f0eeff;
          color: #6c63ff;
          font-size: 9.5px;
          font-weight: 600;
          padding: 1px 6px;
          border-radius: 10px;
          border: 1px solid #d4cfff;
        }
        .proj-list {
          padding-left: 16px;
          list-style: disc;
        }
        .proj-list li {
          font-size: 11.5px;
          line-height: 1.65;
          color: #444;
          margin-bottom: 2px;
        }

        /* CERTS */
        .cert-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .cert-item {
          background: #f8f7ff;
          border: 1px solid #e8e4ff;
          border-radius: 6px;
          padding: 8px 12px;
        }
        .cert-name { font-size: 12px; font-weight: 600; color: #1a1a2e; }
        .cert-issuer { font-size: 11px; color: #6c63ff; margin-top: 2px; }

        /* EDUCATION */
        .edu-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 0;
          border-bottom: 1px solid #f0f0f0;
        }
        .edu-row:last-child { border-bottom: none; }
        .edu-name { font-size: 12.5px; font-weight: 600; color: #1a1a2e; }
        .edu-sub { font-size: 11.5px; color: #666; margin-top: 1px; }
        .edu-grade { font-size: 12px; font-weight: 600; color: #6c63ff; }

        /* TWO-COLUMN LAYOUT */
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }

        @media print {
          .print-bar { display: none !important; }
          .page-wrap { margin-top: 0; padding: 0; background: white; }
          .resume { box-shadow: none; padding: 36px 44px; }
          body { background: white; }
          @page { margin: 0; size: A4; }
        }
      `}</style>

      {/* Top bar (hidden on print) */}
      <div className="print-bar">
        <span>📄 Ajay Padilam — Resume Preview</span>
        <div className="print-bar-btns">
          <a href="/" className="btn-back">← Back to Portfolio</a>
          <button className="btn-print" onClick={handlePrint}>
            ⬇ Download / Print PDF
          </button>
        </div>
      </div>

      <div className="page-wrap">
        <div className="resume">

          {/* HEADER */}
          <div className="header">
            <div className="header-left">
              <h1>Ajay Padilam</h1>
              <h2>Senior Android Developer &amp; Team Lead</h2>
            </div>
            <div className="header-right">
              <div>📧 ajaypadilam1999@gmail.com</div>
              <div>📱 +91 9705068539</div>
              <div>📍 Kakinada, Andhra Pradesh</div>
              <div><a href="https://www.linkedin.com/in/ajay-padilam-985174311">linkedin.com/in/ajay-padilam</a></div>
              <div><a href="https://github.com/ajaypadilam">github.com/ajaypadilam</a></div>
            </div>
          </div>

          {/* PROFILE */}
          <div className="section">
            <div className="section-title">Professional Profile</div>
            <p className="profile-text">
              Senior Android Developer &amp; Team Lead with <strong>4.8 years of experience</strong> building high-performance, 
              offline-first Android applications using <strong>Kotlin, Jetpack Compose, MVVM/MVI</strong> and POS hardware integrations. 
              Specializes in architecting robust offline-first solutions, integrating payment terminal SDKs, and setting up 
              POS printers (Bluetooth, USB, Ethernet) via ESC/POS commands. Experienced in leading development teams, 
              mentoring junior developers, and delivering complex workflow-driven POS and enterprise mobile applications.
            </p>
          </div>

          {/* SKILLS */}
          <div className="section">
            <div className="section-title">Technical Skills</div>
            <div className="skills-grid">
              <div className="skill-group">
                <div className="skill-cat">Android Development</div>
                <div className="skill-tags">
                  {["Kotlin","Java","Jetpack Compose","Android SDK","Material 3","XML UI","Coroutines","StateFlow"].map(s => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>
              </div>
              <div className="skill-group">
                <div className="skill-cat">Architecture &amp; Patterns</div>
                <div className="skill-tags">
                  {["MVVM","MVI","Clean Architecture","Repository Pattern","Hilt/Dagger","Offline-first","WorkManager"].map(s => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>
              </div>
              <div className="skill-group" style={{marginTop: '10px'}}>
                <div className="skill-cat">POS &amp; Hardware</div>
                <div className="skill-tags">
                  {["ESC/POS Printers (BT/USB/ETH)","Payment Terminal SDKs","Cash Drawer","Dual Screen","Offline-first"].map(s => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>
              </div>
              <div className="skill-group" style={{marginTop: '10px'}}>
                <div className="skill-cat">Backend &amp; Tools</div>
                <div className="skill-tags">
                  {["Firebase","Retrofit","Room DB","SQLite","Git","Play Console","Google Cloud","Figma"].map(s => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>
              </div>
              <div className="skill-group" style={{marginTop: '10px'}}>
                <div className="skill-cat">AI Tools</div>
                <div className="skill-tags">
                  {["Claude Code","ChatGPT","Gemini","Antigravity"].map(s => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="section">
            <div className="section-title">Professional Experience</div>

            <div className="exp-item">
              <div className="exp-header">
                <span className="exp-title">Senior Android Developer &amp; Team Lead</span>
                <span className="exp-date">Dec 2024 – Present</span>
              </div>
              <div className="exp-company">Krify Software Solutions · Kakinada, AP</div>
              <ul className="exp-list">
                <li>Architected Android POS workflows including product lookup, cart management, discounts, and payment flows.</li>
                <li>Integrated payment terminal SDKs, POS printers (BT/USB/ETH) via ESC commands, cash drawers &amp; dual screens.</li>
                <li>Designed offline-first architectures using Room DB, caching layers, and WorkManager for auto background sync.</li>
                <li>Led development of ZPOS — Phase 1 on inbuilt terminals, Phase 2 landscape version for dedicated POS devices.</li>
                <li>Mentored junior developers and drove architectural decisions, coding standards &amp; optimization strategies.</li>
              </ul>
            </div>

            <div className="exp-item">
              <div className="exp-header">
                <span className="exp-title">Android Developer</span>
                <span className="exp-date">Dec 2022 – Dec 2024</span>
              </div>
              <div className="exp-company">Krify Software Solutions · Kakinada, AP</div>
              <ul className="exp-list">
                <li>Built and maintained core features for enterprise Android applications across POS and field-force domains.</li>
                <li>Developed modular Jetpack Compose UIs for complex booking flows (GoMyTrip, Avfuel) using MVVM.</li>
                <li>Integrated Firebase services (Firestore, Crashlytics, FCM) and REST APIs for real-time app features.</li>
              </ul>
            </div>

            <div className="exp-item">
              <div className="exp-header">
                <span className="exp-title">Junior Android Developer</span>
                <span className="exp-date">Dec 2021 – Dec 2022</span>
              </div>
              <div className="exp-company">Krify Software Solutions · Kakinada, AP</div>
              <ul className="exp-list">
                <li>Assisted in migrating legacy Java code to Kotlin and building responsive XML layouts.</li>
                <li>Fixed critical production bugs and worked closely with QA for pre-release validation.</li>
              </ul>
            </div>
          </div>

          {/* PROJECTS */}
          <div className="section">
            <div className="section-title">Key Projects</div>

            {[
              {
                title: "ZPOS – Point of Sale System",
                tags: ["Kotlin","Jetpack Compose","MVVM","Room DB","Hardware SDKs"],
                points: [
                  "Completed Phase 1 for Android inbuilt terminals; currently building landscape version for dedicated POS devices.",
                  "Integrated payment SDKs, ESC/POS printers, cash drawers, and offline-first data architecture.",
                ]
              },
              {
                title: "Refuelex – Fuel Ordering & Delivery Suite",
                tags: ["Kotlin","Jetpack Compose","MVVM","WorkManager","GPS"],
                points: [
                  "Built 3 apps (Customer, Employee, Agent) with GPS-based delivery, push notifications & offline-first sync.",
                  "Published on Google Play Store.",
                ]
              },
              {
                title: "Handdy – Employee Monitoring App",
                tags: ["Kotlin","Room DB","GPS","WorkManager","Biometric API"],
                points: [
                  "Implemented Room DB + WorkManager offline sync for field agents in low-connectivity environments.",
                  "Built time tracking, GPS monitoring, and biometric authentication modules.",
                ]
              },
              {
                title: "Avfuel – Aviation Fuel Dispensing Tablet App",
                tags: ["Java/Kotlin","Retrofit","POS Printer SDK"],
                points: [
                  "Built offline data handling for remote airfields; integrated signature capture and ESC/POS invoice printing.",
                ]
              },
              {
                title: "GoMyTrip – Travel Booking Platform",
                tags: ["Kotlin","MVVM","Firebase","Retrofit"],
                points: [
                  "Developed modular MVVM booking flows with offline caching for trips and itineraries.",
                ]
              },
            ].map(p => (
              <div key={p.title} className="proj-item">
                <div className="proj-title">{p.title}</div>
                <div className="proj-tags">{p.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}</div>
                <ul className="proj-list">
                  {p.points.map((pt, i) => <li key={i}>{pt}</li>)}
                </ul>
              </div>
            ))}
          </div>

          {/* CERTIFICATIONS */}
          <div className="section">
            <div className="section-title">Certifications</div>
            <div className="cert-grid">
              {[
                { name: "Claude 101", issuer: "Anthropic · 2024" },
                { name: "AI Fluency for Small Businesses", issuer: "Anthropic & PayPal · 2024" },
                { name: "AI Fluency: Framework & Foundations", issuer: "Anthropic · 2024" },
                { name: "AI Fluency: AI Capabilities & Limitations", issuer: "Anthropic · 2024" },
              ].map(c => (
                <div key={c.name} className="cert-item">
                  <div className="cert-name">{c.name}</div>
                  <div className="cert-issuer">{c.issuer}</div>
                </div>
              ))}
            </div>
          </div>

          {/* EDUCATION */}
          <div className="section">
            <div className="section-title">Education</div>
            <div className="edu-row">
              <div>
                <div className="edu-name">B.Tech – Computer Science Engineering</div>
                <div className="edu-sub">Kakinada Institute of Technology &amp; Science · 2017–2021</div>
              </div>
              <div className="edu-grade">68%</div>
            </div>
            <div className="edu-row">
              <div>
                <div className="edu-name">Board of Intermediate Education</div>
                <div className="edu-sub">Smt B.S.R Junior College, Gokavaram · 2015–2017</div>
              </div>
              <div className="edu-grade">89%</div>
            </div>
            <div className="edu-row">
              <div>
                <div className="edu-name">S.S.C</div>
                <div className="edu-sub">M.J. PAPBCWR School, Kakinada · 2015</div>
              </div>
              <div className="edu-grade">9.2 CGPA</div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
