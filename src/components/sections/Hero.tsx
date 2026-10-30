"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { Button } from "../ui/Button";
import Link from "next/link";
import { Download, Mail, ArrowRight } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";
import { ParticleBackground } from "../ui/ParticleBackground";
import { AnimatedCounter } from "../ui/AnimatedCounter";

const roles = [
  "Senior Android Developer",
  "Team Lead",
  "Jetpack Compose Expert",
  "Offline-First Architect",
  "POS Systems Builder",
];

function TypewriterText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 dark:to-blue-400">
      {displayed}
      <span className="animate-pulse text-primary">|</span>
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Particle background */}
      <ParticleBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for opportunities
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Hi, I&apos;m {personalInfo.name.split(" ")[0]}
            </h1>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 min-h-[1.2em]">
              <TypewriterText />
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8"
          >
            Building high-performance, offline-first Android applications.
            Leading teams to deliver exceptional mobile experiences.
          </motion.p>

          {/* Stats counters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-8 mb-10"
          >
            {[
              { value: 4.8, suffix: "+", label: "Years Exp." },
              { value: 6, suffix: "+", label: "Apps Built" },
              { value: 3, suffix: "+", label: "Play Store" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-extrabold text-primary">
                  <AnimatedCounter to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Button asChild size="lg" className="group">
              <Link href="#projects">
                View Projects{" "}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/resume" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 w-4 h-4" /> Download Resume
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-10 flex gap-4"
          >
            <Button asChild variant="ghost" size="icon" className="hover:text-primary hover:scale-110 transition-transform">
              <Link href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="hover:text-primary hover:scale-110 transition-transform">
              <Link href={`mailto:${personalInfo.email}`}>
                <Mail className="w-5 h-5" />
                <span className="sr-only">Email</span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Background glows */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-3xl -z-10 animate-pulse hidden md:block" />
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl -z-10 hidden md:block" />
      <div className="absolute top-20 right-40 w-[200px] h-[200px] bg-purple-500/10 rounded-full blur-2xl -z-10 hidden md:block" />
    </section>
  );
}
