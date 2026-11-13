"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  FolderGit2,
  Briefcase,
  Wrench,
  Save,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  ExternalLink,
  Lock,
  Download,
  Copy,
  Key,
  Globe,
} from "lucide-react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  const [githubToken, setGithubToken] = useState("");
  const [tokenSaved, setTokenSaved] = useState(false);

  const [activeTab, setActiveTab] = useState<"profile" | "projects" | "experience" | "skills" | "deploy">("profile");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Check stored auth on mount
  useEffect(() => {
    const savedPass = sessionStorage.getItem("admin_pass");
    if (savedPass) {
      setPassword(savedPass);
      setIsAuthenticated(true);
    }

    const savedGh = localStorage.getItem("admin_gh_token");
    if (savedGh) {
      setGithubToken(savedGh);
    }

    fetch("/api/admin/data")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load portfolio data", err);
        setLoading(false);
      });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setAuthError("Please enter your admin password");
      return;
    }
    sessionStorage.setItem("admin_pass", password);
    setIsAuthenticated(true);
    setAuthError("");
  };

  const saveGithubToken = (tokenVal: string) => {
    setGithubToken(tokenVal);
    localStorage.setItem("admin_gh_token", tokenVal);
    setTokenSaved(true);
    setTimeout(() => setTokenSaved(false), 2500);
  };

  const handleSave = async () => {
    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          data,
          githubToken: githubToken.trim(),
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          setIsAuthenticated(false);
          sessionStorage.removeItem("admin_pass");
          setAuthError("Invalid password. Please log in again.");
          setStatusMessage({ type: "error", text: "Invalid password." });
        } else {
          setStatusMessage({ type: "error", text: result.error || "Failed to save data." });
        }
      } else {
        setStatusMessage({
          type: result.githubSaved || result.localSaved ? "success" : "error",
          text: result.message || "Changes saved!",
        });
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Network error while saving." });
    } finally {
      setSaving(false);
    }
  };

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    alert("Copied complete JSON configuration to clipboard!");
  };

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center justify-center w-14 h-14 bg-primary/10 text-primary rounded-2xl mx-auto mb-6">
            <Lock className="w-7 h-7 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">Portfolio Admin</h1>
          <p className="text-sm text-slate-400 text-center mb-6">
            Enter your admin password to manage projects, experience, skills, and bio.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 text-white placeholder-slate-500"
                autoFocus
              />
              {authError && <p className="text-xs text-rose-400 mt-2">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg transition-all"
            >
              Access Dashboard
            </button>

            <p className="text-xs text-slate-500 text-center mt-4">
              Default password: <code className="text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">ajay1234</code>
            </p>
          </form>

          <div className="mt-6 text-center border-t border-slate-800 pt-4">
            <Link href="/" className="text-xs text-cyan-400 hover:underline">
              ← Return to live portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-400 text-sm">Loading portfolio settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
            AP
          </div>
          <div>
            <h1 className="font-bold text-sm sm:text-base leading-tight">Portfolio Admin Panel</h1>
            <p className="text-xs text-slate-400">Live editor for Ajay Padilam</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={copyJson}
            title="Copy JSON to clipboard"
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors"
          >
            <Copy className="w-4 h-4" />
          </button>

          <button
            onClick={downloadJson}
            title="Download portfolio-data.json"
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs sm:text-sm rounded-xl shadow-lg transition-all disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save &amp; Publish</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* GitHub Integration Notice */}
      {!githubToken && (
        <div className="max-w-6xl mx-auto mt-4 px-4 py-3 bg-amber-950/40 border border-amber-800/50 rounded-xl flex items-center justify-between gap-4 text-xs sm:text-sm text-amber-200">
          <div className="flex items-center gap-2.5">
            <Key className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Live Auto-Deploy:</strong> To update your live Vercel website when clicking &ldquo;Save &amp; Publish&rdquo;, connect your GitHub Personal Access Token.
            </span>
          </div>
          <button
            onClick={() => setActiveTab("deploy")}
            className="shrink-0 px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-lg font-medium transition-colors"
          >
            Connect Token →
          </button>
        </div>
      )}

      {/* Status banner */}
      {statusMessage && (
        <div
          className={`max-w-6xl mx-auto mt-4 px-4 py-3 rounded-xl border flex items-center gap-3 text-sm ${
            statusMessage.type === "success"
              ? "bg-emerald-950/60 border-emerald-800/60 text-emerald-300"
              : "bg-rose-950/60 border-rose-800/60 text-rose-300"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Main container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 mt-6">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 gap-1 overflow-x-auto pb-px mb-8 scrollbar-none">
          {[
            { id: "profile", label: "Profile & Bio", icon: User },
            { id: "projects", label: `Projects (${data.projects?.length || 0})`, icon: FolderGit2 },
            { id: "experience", label: `Experience (${data.experience?.length || 0})`, icon: Briefcase },
            { id: "skills", label: "Skills & Domains", icon: Wrench },
            { id: "deploy", label: "Live Deploy Settings", icon: Globe },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm whitespace-nowrap transition-all border-b-2 ${
                  active
                    ? "border-cyan-400 text-cyan-400 bg-slate-900/50 rounded-t-lg"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ================= TAB 1: PROFILE & BIO ================= */}
        {activeTab === "profile" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-cyan-400" />
              <span>Personal Information &amp; Bio</span>
            </h2>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={data.personalInfo.name || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      personalInfo: { ...data.personalInfo, name: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Professional Role / Title
                </label>
                <input
                  type="text"
                  value={data.personalInfo.role || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      personalInfo: { ...data.personalInfo, role: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Experience Text (e.g. 4.8 years or 5 years)
                </label>
                <input
                  type="text"
                  value={data.personalInfo.experience || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      personalInfo: { ...data.personalInfo, experience: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Hero Counter Number (for counter animation e.g. 4.8 or 5)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={data.personalInfo.yearsOfExperience || 4.8}
                  onChange={(e) =>
                    setData({
                      ...data,
                      personalInfo: {
                        ...data.personalInfo,
                        yearsOfExperience: parseFloat(e.target.value) || 0,
                      },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={data.personalInfo.email || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      personalInfo: { ...data.personalInfo, email: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={data.personalInfo.phone || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      personalInfo: { ...data.personalInfo, phone: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Location (City, State)
                </label>
                <input
                  type="text"
                  value={data.personalInfo.location || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      personalInfo: { ...data.personalInfo, location: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  LinkedIn Profile URL
                </label>
                <input
                  type="text"
                  value={data.personalInfo.linkedin || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      personalInfo: { ...data.personalInfo, linkedin: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                About / Professional Summary (Appears in About Section &amp; Resume)
              </label>
              <textarea
                rows={5}
                value={data.personalInfo.about || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    personalInfo: { ...data.personalInfo, about: e.target.value },
                  })
                }
                className="w-full px-3.5 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-sm leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* ================= TAB 2: PROJECTS ================= */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-cyan-400" />
                <span>Featured Projects</span>
              </h2>

              <button
                onClick={() => {
                  const newProject = {
                    title: "New Project",
                    description: "Short description of what the application does.",
                    technologies: ["Kotlin", "Jetpack Compose", "MVVM"],
                    responsibilities: ["Built responsive UI using Jetpack Compose."],
                    playStore: "",
                    demo: "",
                  };
                  setData({ ...data, projects: [newProject, ...data.projects] });
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="space-y-5">
              {data.projects.map((proj: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => {
                        const updated = [...data.projects];
                        updated[idx].title = e.target.value;
                        setData({ ...data, projects: updated });
                      }}
                      className="text-lg font-bold bg-transparent text-white border-b border-transparent focus:border-cyan-400 focus:outline-none px-1 py-0.5"
                    />

                    <button
                      onClick={() => {
                        if (confirm(`Delete project "${proj.title}"?`)) {
                          const updated = data.projects.filter((_: any, i: number) => i !== idx);
                          setData({ ...data, projects: updated });
                        }
                      }}
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={proj.description}
                      onChange={(e) => {
                        const updated = [...data.projects];
                        updated[idx].description = e.target.value;
                        setData({ ...data, projects: updated });
                      }}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-sm"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Technologies (comma separated)
                      </label>
                      <input
                        type="text"
                        value={proj.technologies?.join(", ") || ""}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[idx].technologies = e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean);
                          setData({ ...data, projects: updated });
                        }}
                        placeholder="e.g. Kotlin, Jetpack Compose, Room"
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Google Play Store Link (optional)
                      </label>
                      <input
                        type="text"
                        value={proj.playStore || ""}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[idx].playStore = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        placeholder="https://play.google.com/..."
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Key Highlights / Responsibilities (one per line)
                    </label>
                    <textarea
                      rows={3}
                      value={proj.responsibilities?.join("\n") || ""}
                      onChange={(e) => {
                        const updated = [...data.projects];
                        updated[idx].responsibilities = e.target.value
                          .split("\n")
                          .map((s) => s.trim())
                          .filter(Boolean);
                        setData({ ...data, projects: updated });
                      }}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-sm font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: EXPERIENCE ================= */}
        {activeTab === "experience" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-cyan-400" />
                <span>Work Experience</span>
              </h2>

              <button
                onClick={() => {
                  const newExp = {
                    title: "Senior Android Developer",
                    company: "Company Name",
                    date: "Month Year - Present",
                    location: "Location",
                    description: "Role overview.",
                    responsibilities: ["Key achievement or responsibility."],
                  };
                  setData({ ...data, experience: [newExp, ...data.experience] });
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Role</span>
              </button>
            </div>

            <div className="space-y-5">
              {data.experience.map((exp: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => {
                        const updated = [...data.experience];
                        updated[idx].title = e.target.value;
                        setData({ ...data, experience: updated });
                      }}
                      className="text-lg font-bold bg-transparent text-white border-b border-transparent focus:border-cyan-400 focus:outline-none px-1 py-0.5"
                    />

                    <button
                      onClick={() => {
                        if (confirm(`Delete role "${exp.title}"?`)) {
                          const updated = data.experience.filter((_: any, i: number) => i !== idx);
                          setData({ ...data, experience: updated });
                        }
                      }}
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Delete Role"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...data.experience];
                          updated[idx].company = e.target.value;
                          setData({ ...data, experience: updated });
                        }}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Date Range
                      </label>
                      <input
                        type="text"
                        value={exp.date}
                        onChange={(e) => {
                          const updated = [...data.experience];
                          updated[idx].date = e.target.value;
                          setData({ ...data, experience: updated });
                        }}
                        placeholder="e.g. Dec 2024 - Present"
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={exp.location || ""}
                        onChange={(e) => {
                          const updated = [...data.experience];
                          updated[idx].location = e.target.value;
                          setData({ ...data, experience: updated });
                        }}
                        placeholder="e.g. Kakinada, AP"
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Responsibilities / Bullet Points (one per line)
                    </label>
                    <textarea
                      rows={4}
                      value={exp.responsibilities?.join("\n") || ""}
                      onChange={(e) => {
                        const updated = [...data.experience];
                        updated[idx].responsibilities = e.target.value
                          .split("\n")
                          .map((s) => s.trim())
                          .filter(Boolean);
                        setData({ ...data, experience: updated });
                      }}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-sm font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: SKILLS & DOMAINS ================= */}
        {activeTab === "skills" && (
          <div className="space-y-8">
            {/* App Domains */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Wrench className="w-5 h-5 text-cyan-400" />
                <span>App Domains I&apos;ve Worked In</span>
              </h2>
              <p className="text-xs text-slate-400">
                Chips shown in the About section on your website. Click any chip to remove it, or add new domains below.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {data.domains?.map((domain: string, idx: number) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 group"
                  >
                    <span>{domain}</span>
                    <button
                      onClick={() => {
                        const updated = data.domains.filter((_: any, i: number) => i !== idx);
                        setData({ ...data, domains: updated });
                      }}
                      className="text-slate-400 hover:text-rose-400 transition-colors"
                      title="Remove domain"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="pt-2 flex gap-2 max-w-md">
                <input
                  type="text"
                  id="newDomainInput"
                  placeholder="e.g. Healthcare, Fintech"
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const val = (e.target as HTMLInputElement).value.trim();
                      if (val && !data.domains?.includes(val)) {
                        setData({ ...data, domains: [...(data.domains || []), val] });
                        (e.target as HTMLInputElement).value = "";
                      }
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById("newDomainInput") as HTMLInputElement;
                    const val = input?.value.trim();
                    if (val && !data.domains?.includes(val)) {
                      setData({ ...data, domains: [...(data.domains || []), val] });
                      input.value = "";
                    }
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-cyan-400 font-medium text-sm transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Skills by Category */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white">Skills By Category</h3>

              <div className="grid md:grid-cols-2 gap-5">
                {data.skills?.map((cat: any, catIdx: number) => (
                  <div
                    key={catIdx}
                    className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3"
                  >
                    <h4 className="font-semibold text-cyan-400 text-sm">{cat.category}</h4>

                    <div className="flex flex-wrap gap-1.5">
                      {cat.items?.map((item: string, itemIdx: number) => (
                        <span
                          key={itemIdx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300"
                        >
                          <span>{item}</span>
                          <button
                            onClick={() => {
                              const updatedSkills = [...data.skills];
                              updatedSkills[catIdx].items = updatedSkills[catIdx].items.filter(
                                (_: any, i: number) => i !== itemIdx
                              );
                              setData({ ...data, skills: updatedSkills });
                            }}
                            className="text-slate-500 hover:text-rose-400"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 flex gap-2">
                      <input
                        type="text"
                        placeholder="Add skill..."
                        className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 text-xs"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const val = (e.target as HTMLInputElement).value.trim();
                            if (val && !cat.items?.includes(val)) {
                              const updatedSkills = [...data.skills];
                              updatedSkills[catIdx].items.push(val);
                              setData({ ...data, skills: updatedSkills });
                              (e.target as HTMLInputElement).value = "";
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: LIVE DEPLOY SETTINGS ================= */}
        {activeTab === "deploy" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-400" />
              <span>Live Auto-Deploy Settings</span>
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              When you click <strong>Save &amp; Publish</strong>, the admin panel commits your changes directly to your GitHub repository (<code>ajaypadilam/ajay-portfolio-</code>).
              Vercel instantly detects the commit and rebuilds your live website in ~1 minute.
            </p>

            <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <Key className="w-4 h-4" />
                <span>GitHub Personal Access Token</span>
              </div>

              <div>
                <input
                  type="password"
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 font-mono text-sm"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => saveGithubToken(githubToken.trim())}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm rounded-xl transition-all"
                >
                  Save Token in Browser
                </button>
                {tokenSaved && (
                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Token saved!
                  </span>
                )}
              </div>

              <div className="border-t border-slate-700/60 pt-4 space-y-2 text-xs text-slate-400">
                <p className="font-semibold text-slate-300">How to get your free GitHub token (Takes 1 minute):</p>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>
                    Go to{" "}
                    <a
                      href="https://github.com/settings/tokens/new"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>github.com/settings/tokens/new</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>Set Note to: <code className="bg-slate-900 px-1 py-0.5 rounded text-slate-300">Portfolio Admin</code></li>
                  <li>Select the checkbox: <code className="bg-slate-900 px-1 py-0.5 rounded text-cyan-300 font-bold">repo</code> (Full control of repositories)</li>
                  <li>Scroll to the bottom and click <strong>Generate token</strong>.</li>
                  <li>Copy the token (starts with <code className="text-slate-300">ghp_...</code>) and paste it in the box above!</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
