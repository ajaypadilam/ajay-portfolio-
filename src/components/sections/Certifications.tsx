"use client";

import { motion } from "framer-motion";
import { certifications } from "@/lib/data";
import { SectionHeader } from "../ui/SectionHeader";
import { Card, CardContent } from "../ui/Card";
import { Award } from "lucide-react";

export function Certifications() {
  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Certifications" 
          description="Professional certifications and continuous learning."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:border-primary/50 transition-colors bg-secondary/5">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{cert.name}</h3>
                    <p className="text-primary font-medium text-sm mb-1">{cert.issuer}</p>
                    <div className="flex justify-between items-center text-sm text-muted-foreground mt-4">
                      <span>{cert.date}</span>
                      <span className="text-xs uppercase tracking-wider">{cert.id}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
