"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { SectionHeader } from "../ui/SectionHeader";
import { Card, CardContent } from "../ui/Card";
import { Briefcase, GraduationCap, Code2 } from "lucide-react";

const domains = [
  "eCommerce",
  "Travel Booking",
  "Real-time Chat & Calling",
  "POS Systems",
  "Field-Force Apps",
  "On-Demand Delivery",
  "Payment Gateways",
  "In-App Subscriptions",
];

export function About() {
  return (
    <section id="about" className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader title="About Me" />

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6 md:p-8">
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {personalInfo.about}
                  </p>
                </CardContent>
              </Card>

              {/* Domain chips */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                    App Domains I&apos;ve Worked In
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {domains.map((domain) => (
                      <span
                        key={domain}
                        className="px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {domain}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Experience</h3>
                  </div>
                  <p className="text-muted-foreground">{personalInfo.experience}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Education</h3>
                  </div>
                  <p className="text-muted-foreground">{personalInfo.education}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Code2 className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Core Stack</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["Kotlin", "Jetpack Compose", "MVVM/MVI", "Room DB", "WorkManager", "Hilt", "Retrofit", "Firebase"].map(t => (
                      <span key={t} className="px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground border border-border">
                        {t}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
