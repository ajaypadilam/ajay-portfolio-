"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { SectionHeader } from "../ui/SectionHeader";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

// ── EmailJS credentials ──────────────────────────────────────────────────────
// Replace these three values with your own from https://www.emailjs.com
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // e.g. "template_xyz456"
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // e.g. "abc123XYZ"
// ─────────────────────────────────────────────────────────────────────────────

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 bg-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Get In Touch"
          description="Interested in collaborating or have an opportunity? I'd love to hear from you."
        />

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">Let&apos;s Connect</h3>
            <p className="text-muted-foreground mb-8 text-lg">
              I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>

            <div className="space-y-6">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center p-4 bg-background border border-border rounded-lg hover:border-primary/50 transition-colors group"
              >
                <div className="p-3 bg-primary/10 rounded-full text-primary mr-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Email Me</p>
                  <p className="text-lg font-semibold">{personalInfo.email}</p>
                </div>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-background border border-border rounded-lg hover:border-primary/50 transition-colors group"
              >
                <div className="p-3 bg-primary/10 rounded-full text-primary mr-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">LinkedIn</p>
                  <p className="text-lg font-semibold">Let&apos;s connect professionally</p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6 md:p-8">

                {/* Success state */}
                {status === "success" && (
                  <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                    <CheckCircle className="w-16 h-16 text-green-500" />
                    <h4 className="text-xl font-bold">Message Sent!</h4>
                    <p className="text-muted-foreground">
                      Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                    </p>
                    <Button variant="outline" onClick={() => setStatus("idle")}>
                      Send Another Message
                    </Button>
                  </div>
                )}

                {/* Error state */}
                {status === "error" && (
                  <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
                    <AlertCircle className="w-12 h-12 text-red-500" />
                    <h4 className="text-lg font-bold">Something went wrong</h4>
                    <p className="text-muted-foreground text-sm">
                      Please try again or email me directly at{" "}
                      <a href={`mailto:${personalInfo.email}`} className="text-primary underline">
                        {personalInfo.email}
                      </a>
                    </p>
                    <Button variant="outline" onClick={() => setStatus("idle")}>
                      Try Again
                    </Button>
                  </div>
                )}

                {/* Form */}
                {(status === "idle" || status === "sending") && (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="from_name" className="text-sm font-medium">Name</label>
                        <input
                          type="text"
                          id="from_name"
                          name="from_name"
                          required
                          className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="reply_to" className="text-sm font-medium">Email</label>
                        <input
                          type="email"
                          id="reply_to"
                          name="reply_to"
                          required
                          className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Project Inquiry"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        placeholder="Hi Ajay, I'd like to talk about..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={status === "sending"}
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...
                        </>
                      ) : (
                        <>
                          Send Message <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                )}

              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
