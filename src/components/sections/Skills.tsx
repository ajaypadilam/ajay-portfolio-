"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import { SectionHeader } from "../ui/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Badge } from "../ui/Badge";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Technical Skills" 
          description="A comprehensive overview of my technical expertise, categorized by domain."
        />
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skills.map((skillGroup) => {
            const Icon = skillGroup.icon;
            return (
              <motion.div
                key={skillGroup.category}
                variants={item}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full border border-border/50 hover:border-primary/40 hover:shadow-[0_0_24px_rgba(139,92,246,0.15)] transition-all duration-300 cursor-default">
                  <CardHeader className="pb-4 flex flex-row items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">{skillGroup.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, idx) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.04 }}
                          viewport={{ once: true }}
                        >
                          <Badge variant="secondary" className="px-3 py-1 text-sm font-normal hover:bg-primary/20 hover:text-primary transition-colors cursor-default">
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
