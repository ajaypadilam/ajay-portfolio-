"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import { SectionHeader } from "../ui/SectionHeader";
import { Card, CardContent } from "../ui/Card";
import { Briefcase } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="py-20 bg-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Professional Experience" 
          description="My journey and progression as an Android developer and technical leader."
        />
        
        <div className="relative border-l border-primary/20 ml-3 md:ml-6 space-y-12">
          {experience.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline dot */}
              <div className="absolute left-[-20px] top-4 md:left-[-24px] bg-background border-2 border-primary w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-sm">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              
              <Card className="hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold">{exp.title}</h3>
                      <p className="text-lg font-medium text-primary mt-1">{exp.company}</p>
                    </div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium whitespace-nowrap h-fit">
                      {exp.date}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    {exp.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-3 text-primary mt-1.5 flex-shrink-0">•</span>
                        <span className="text-foreground/90">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
