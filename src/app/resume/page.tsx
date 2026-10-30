"use client";

export default function ResumePage() {
  const handlePrint = () => window.print();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'Inter', sans-serif;
          background: #f0f0f0;
          color: #1a1a1a;
        }

        /* ─── Print bar ─────────────────────────────────────── */
        .print-bar {
          position: fixed; top: 0; left: 0; right: 0;
          background: #1a1a2e; color: white;
          display: flex; justify-content: space-between; align-items: center;
          padding: 10px 28px; z-index: 999; gap: 16px;
        }
        .print-bar span { font-size: 13px; opacity: 0.7; }
        .print-bar-btns { display: flex; gap: 10px; }
        .btn-print {
          background: #00b4d8; color: white; border: none;
          padding: 7px 18px; border-radius: 5px; font-size: 13px;
          font-weight: 600; cursor: pointer;
        }
        .btn-back {
          background: transparent; color: white;
          border: 1px solid rgba(255,255,255,0.3);
          padding: 7px 18px; border-radius: 5px;
          font-size: 13px; cursor: pointer; text-decoration: none;
        }

        /* ─── Page wrapper ──────────────────────────────────── */
        .page-wrap {
          margin-top: 52px;
          display: flex; justify-content: center;
          padding: 28px 16px 60px;
        }

        /* ─── A4 card ────────────────────────────────────────── */
        .resume {
          width: 860px;
          background: white;
          box-shadow: 0 4px 32px rgba(0,0,0,0.15);
          padding: 40px 44px 48px;
        }

        /* ─── Header ────────────────────────────────────────── */
        .r-name {
          font-size: 38px; font-weight: 800;
          letter-spacing: 1px; text-transform: uppercase;
          color: #111; line-height: 1.1; margin-bottom: 4px;
        }
        .r-role {
          font-size: 16px; font-weight: 600;
          color: #00b4d8; margin-bottom: 10px;
        }
        .r-contacts {
          display: flex; flex-wrap: wrap; gap: 6px 20px;
          font-size: 12.5px; color: #444; margin-bottom: 4px;
        }
        .r-contacts span { display: flex; align-items: center; gap: 5px; }
        .r-contacts a { color: #00b4d8; text-decoration: none; }
        .r-location { font-size: 12.5px; color: #444; margin-top: 2px;
          display: flex; align-items: center; gap: 5px; }
        .header-divider {
          border: none; border-top: 2px solid #e0e0e0;
          margin: 14px 0 20px;
        }

        /* ─── Two-column body ───────────────────────────────── */
        .r-body {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 32px;
        }

        /* ─── Section title ─────────────────────────────────── */
        .sec-title {
          font-size: 13px; font-weight: 800;
          text-transform: uppercase; letter-spacing: 1.2px;
          color: #111; padding-bottom: 5px;
          border-bottom: 2.5px solid #111;
          margin-bottom: 14px;
        }
        .section { margin-bottom: 24px; }

        /* ─── Experience / Project items ─────────────────────── */
        .item { margin-bottom: 16px; padding-bottom: 16px;
          border-bottom: 1px dashed #ddd; }
        .item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .item-title { font-size: 14px; font-weight: 700; color: #111; margin-bottom: 1px; }
        .item-company { font-size: 13px; font-weight: 600; color: #00b4d8; margin-bottom: 4px; }
        .item-meta {
          display: flex; align-items: center; gap: 14px;
          font-size: 11.5px; color: #666; margin-bottom: 7px;
        }
        .item-meta span { display: flex; align-items: center; gap: 4px; }
        .item-bullets { padding-left: 16px; }
        .item-bullets li {
          font-size: 12.5px; line-height: 1.7; color: #333;
          margin-bottom: 2px; list-style: disc;
        }

        /* ─── Skills ─────────────────────────────────────────── */
        .skill-cat {
          font-size: 12.5px; font-weight: 700; color: #00b4d8;
          margin-bottom: 7px; margin-top: 10px;
        }
        .skill-cat:first-child { margin-top: 0; }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 2px; }
        .skill-tag {
          border: 1px solid #bbb; border-radius: 4px;
          padding: 3px 9px; font-size: 11.5px; color: #222; background: #fff;
        }
        .skill-divider { border: none; border-top: 1px dashed #ddd; margin: 8px 0; }

        /* ─── Summary ────────────────────────────────────────── */
        .summary-text {
          font-size: 12.5px; line-height: 1.75; color: #333;
        }

        /* ─── Cert / Training items ──────────────────────────── */
        .cert-item { margin-bottom: 10px; padding-bottom: 10px;
          border-bottom: 1px dashed #ddd; }
        .cert-item:last-child { border-bottom: none; }
        .cert-name { font-size: 13px; font-weight: 700; color: #111; }
        .cert-issuer { font-size: 12px; color: #444; margin-top: 1px; }

        @media print {
          .print-bar { display: none !important; }
          .page-wrap { margin-top: 0; padding: 0; background: white; }
          .resume { box-shadow: none; padding: 28px 36px 36px; }
          body { background: white; }
          @page { margin: 0; size: A4; }
        }
      `}</style>

      {/* Top bar */}
      <div className="print-bar">
        <span>Ajay Padilam — Resume</span>
        <div className="print-bar-btns">
          <a href="/" className="btn-back">← Portfolio</a>
          <button className="btn-print" onClick={handlePrint}>⬇ Download PDF</button>
        </div>
      </div>

      <div className="page-wrap">
        <div className="resume">

          {/* ── HEADER ── */}
          <div className="r-name">Ajay Padilam</div>
          <div className="r-role">Senior Android Developer &amp; Team Lead</div>
          <div className="r-contacts">
            <span>📞 +919705068539</span>
            <span>✉️ ajaypadilam1999@gmail.com</span>
            <span>🔗 <a href="https://www.linkedin.com/in/ajay-padilam-985174311" target="_blank" rel="noreferrer">linkedin.com/in/ajay-padilam-985174311</a></span>
          </div>
          <div className="r-location">📍 Kakinada, Andhra Pradesh</div>
          <hr className="header-divider" />

          {/* ── BODY ── */}
          <div className="r-body">

            {/* ════ LEFT COLUMN ════ */}
            <div>

              {/* EXPERIENCE */}
              <div className="section">
                <div className="sec-title">Experience</div>

                <div className="item">
                  <div className="item-title">Senior Android Developer &amp; Team Lead</div>
                  <div className="item-company">Krify Software Solutions</div>
                  <div className="item-meta">
                    <span>🗓 12/2024 – Present</span>
                    <span>📍 Kakinada, AP</span>
                  </div>
                  <ul className="item-bullets">
                    <li>Architected Android POS workflows including product lookup, cart management, discounts, and payment flows.</li>
                    <li>Integrated payment terminal SDKs, POS printers (BT/USB/ETH) via ESC commands, cash drawers &amp; dual screens.</li>
                    <li>Designed offline-first architectures using Room DB, caching layers, and WorkManager for auto background sync.</li>
                    <li>Led development of ZPOS — Phase 1 on inbuilt terminals, Phase 2 landscape version for dedicated POS devices.</li>
                    <li>Mentored junior developers and drove architectural decisions, coding standards &amp; optimization strategies.</li>
                  </ul>
                </div>

                <div className="item">
                  <div className="item-title">Android Developer</div>
                  <div className="item-company">Krify Software Solutions</div>
                  <div className="item-meta">
                    <span>🗓 12/2022 – 12/2024</span>
                    <span>📍 Kakinada, AP</span>
                  </div>
                  <ul className="item-bullets">
                    <li>Built and maintained core features for enterprise Android applications across POS and field-force domains.</li>
                    <li>Developed modular Jetpack Compose UIs for complex booking flows (GoMyTrip, Avfuel) using MVVM.</li>
                    <li>Integrated Firebase services (Firestore, Crashlytics, FCM) and REST APIs for real-time app features.</li>
                  </ul>
                </div>

                <div className="item">
                  <div className="item-title">Junior Android Developer</div>
                  <div className="item-company">Krify Software Solutions</div>
                  <div className="item-meta">
                    <span>🗓 12/2021 – 12/2022</span>
                    <span>📍 Kakinada, AP</span>
                  </div>
                  <ul className="item-bullets">
                    <li>Assisted in migrating legacy Java code to Kotlin and building responsive XML layouts.</li>
                    <li>Fixed critical production bugs and worked closely with QA for pre-release validation.</li>
                  </ul>
                </div>
              </div>

              {/* EDUCATION */}
              <div className="section">
                <div className="sec-title">Education</div>

                <div className="item">
                  <div className="item-title">B.Tech – Computer Science Engineering</div>
                  <div className="item-company">Kakinada Institute of Technology &amp; Science</div>
                  <div className="item-meta">
                    <span>🗓 08/2017 – 05/2021</span>
                    <span>📍 Kakinada, India</span>
                  </div>
                  <ul className="item-bullets"><li>68%</li></ul>
                </div>

                <div className="item">
                  <div className="item-title">Board of Intermediate Education</div>
                  <div className="item-company">Smt B.S.R Junior College, Gokavaram</div>
                  <div className="item-meta">
                    <span>🗓 06/2015 – 05/2017</span>
                    <span>📍 Gokavaram, India</span>
                  </div>
                  <ul className="item-bullets"><li>89%</li></ul>
                </div>

                <div className="item">
                  <div className="item-title">S.S.C</div>
                  <div className="item-company">M.J. PAPBCWR School, Kakinada</div>
                  <div className="item-meta">
                    <span>🗓 06/2015 – 05/2015</span>
                    <span>📍 Kakinada, India</span>
                  </div>
                  <ul className="item-bullets"><li>9.2 CGPA</li></ul>
                </div>
              </div>

              {/* PROJECTS */}
              <div className="section">
                <div className="sec-title">Projects</div>

                {[
                  {
                    title: "ZPOS – Point of Sale System",
                    date: "12/2022 – Present",
                    points: [
                      "Completed Phase 1 for Android inbuilt terminals; currently building landscape version for dedicated POS devices.",
                      "Integrated payment SDKs, ESC/POS printers, cash drawers, and offline-first data architecture.",
                    ]
                  },
                  {
                    title: "Refuelex – Fuel Ordering & Delivery Suite",
                    date: "12/2022 – 12/2023",
                    points: [
                      "Built 3 apps (Customer, Employee, Agent) with GPS-based delivery, push notifications & offline-first sync.",
                      "Published on Google Play Store.",
                    ]
                  },
                  {
                    title: "Handdy – Employee Monitoring App",
                    date: "12/2021 – 12/2022",
                    points: [
                      "Implemented Room DB + WorkManager offline sync for field agents in low-connectivity environments.",
                      "Built time tracking, GPS monitoring, and biometric authentication modules.",
                    ]
                  },
                  {
                    title: "Avfuel – Aviation Fuel Dispensing Tablet App",
                    date: "12/2021 – 12/2022",
                    points: [
                      "Built offline data handling for remote airfields; integrated signature capture and ESC/POS invoice printing.",
                    ]
                  },
                  {
                    title: "GoMyTrip – Travel Booking Platform",
                    date: "12/2021 – 12/2022",
                    points: [
                      "Developed modular MVVM booking flows with offline caching for trips and itineraries.",
                    ]
                  },
                  {
                    title: "TuneConnect – Music & Social Platform",
                    date: "12/2021 – 12/2022",
                    points: [
                      "Integrated Firebase Firestore for real-time chat, likes, and listener tracking with offline playlist caching.",
                    ]
                  },
                ].map(p => (
                  <div key={p.title} className="item">
                    <div className="item-title">{p.title}</div>
                    <div className="item-meta"><span>🗓 {p.date}</span></div>
                    <ul className="item-bullets">
                      {p.points.map((pt, i) => <li key={i}>{pt}</li>)}
                    </ul>
                  </div>
                ))}
              </div>

            </div>

            {/* ════ RIGHT COLUMN ════ */}
            <div>

              {/* SUMMARY */}
              <div className="section">
                <div className="sec-title">Summary</div>
                <p className="summary-text">
                  Senior Android Developer &amp; Team Lead with <strong>4.8 years of experience</strong> delivering high-performance Android applications across diverse domains — including eCommerce, travel booking, real-time chat &amp; calling apps, POS systems, and field-force solutions. Proficient in <strong>Kotlin, Jetpack Compose, and MVVM/MVI</strong> architectures. Hands-on expertise in payment gateway integrations, in-app subscriptions (Google Play Billing), offline-first architectures using Room DB &amp; WorkManager, POS hardware integrations (ESC/POS printers, payment terminals, cash drawers), and end-to-end app submission &amp; release management on the Google Play Console. Experienced in leading development teams and mentoring junior developers.
                </p>
              </div>

              {/* TRAINING / COURSES */}
              <div className="section">
                <div className="sec-title">Training / Courses</div>
                <div className="cert-item">
                  <div className="cert-name">AI Fluency: Framework &amp; Foundations,<br/>AI Fluency: AI Capabilities &amp; Limitations</div>
                  <div className="cert-issuer">Anthropic</div>
                </div>
                <div className="cert-item">
                  <div className="cert-name">AI Fluency for Small Businesses</div>
                  <div className="cert-issuer">Anthropic &amp; PayPal</div>
                </div>
                <div className="cert-item">
                  <div className="cert-name">Claude 101</div>
                  <div className="cert-issuer">Anthropic</div>
                </div>
              </div>

              {/* SKILLS */}
              <div className="section">
                <div className="sec-title">Skills</div>

                <div className="skill-cat">Android Development</div>
                <div className="skill-tags">
                  {["Kotlin","Java","Jetpack Compose","Android SDK","Material 3","XML UI","Coroutines","StateFlow","Hilt/Dagger","WorkManager"].map(s => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>
                <hr className="skill-divider" />

                <div className="skill-cat">Architecture &amp; Patterns</div>
                <div className="skill-tags">
                  {["MVVM","MVI","Clean Architecture","Repository Pattern","Offline-first","Modularization"].map(s => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>
                <hr className="skill-divider" />

                <div className="skill-cat">POS &amp; Hardware</div>
                <div className="skill-tags">
                  {["ESC/POS Printers (BT/USB/ETH)","Payment Terminal SDKs","Cash Drawer","Dual Screen"].map(s => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>
                <hr className="skill-divider" />

                <div className="skill-cat">Backend &amp; Tools</div>
                <div className="skill-tags">
                  {["Firebase","Retrofit","Room DB","Postman","Swagger","YouTrack","Git","Play Console","Google Cloud","Figma"].map(s => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>
                <hr className="skill-divider" />

                <div className="skill-cat">AI Tools</div>
                <div className="skill-tags">
                  {["Claude Code","ChatGPT","Gemini","Antigravity"].map(s => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>
              </div>

              {/* CERTIFICATIONS */}
              <div className="section">
                <div className="sec-title">Certifications</div>
                {[
                  { name: "Claude 101", issuer: "Anthropic" },
                  { name: "AI Fluency for Small Businesses", issuer: "Anthropic & PayPal" },
                  { name: "AI Fluency: Framework & Foundations", issuer: "Anthropic" },
                  { name: "AI Fluency: AI Capabilities & Limitations", issuer: "Anthropic" },
                ].map(c => (
                  <div key={c.name} className="cert-item">
                    <div className="cert-name">{c.name}</div>
                    <div className="cert-issuer">{c.issuer}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
