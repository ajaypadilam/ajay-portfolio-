"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { SectionHeader } from "../ui/SectionHeader";
import { Mail, MessageSquare } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Get In Touch"
          description="Interested in collaborating or have an opportunity? I'd love to hear from you."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto space-y-4"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Let&apos;s Connect</h3>
          <p className="text-muted-foreground text-lg text-center mb-8">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>

          <a
            href={`mailto:${personalInfo.email}`}
            className="flex items-center p-5 bg-background border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all group"
          >
            <div className="p-3 bg-primary/10 rounded-full text-primary mr-4 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Email Me Directly</p>
              <p className="text-lg font-semibold">{personalInfo.email}</p>
            </div>
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-5 bg-background border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all group"
          >
            <div className="p-3 bg-primary/10 rounded-full text-primary mr-4 group-hover:scale-110 transition-transform">
              <FaLinkedin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">LinkedIn</p>
              <p className="text-lg font-semibold">Connect with me professionally</p>
            </div>
          </a>

          <a
            href={`mailto:${personalInfo.email}?subject=Opportunity`}
            className="flex items-center p-5 bg-background border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all group"
          >
            <div className="p-3 bg-primary/10 rounded-full text-primary mr-4 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Have an Opportunity?</p>
              <p className="text-lg font-semibold">Drop me a message</p>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
