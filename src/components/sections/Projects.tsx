"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { SectionHeader } from "../ui/SectionHeader";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { FaGooglePlay } from "react-icons/fa";

export function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Featured Projects" 
          description="A selection of applications I've developed, showcasing my expertise in Android architecture and integrations."
        />
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="h-full flex flex-col hover:shadow-lg transition-all border-border/50 hover:border-primary/50 group">
                <CardHeader>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <p className="text-muted-foreground mt-4 line-clamp-2">
                    {project.description}
                  </p>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <Badge key={tech} variant="secondary" className="bg-secondary/50 font-normal">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Key Responsibilities</h4>
                    <ul className="space-y-2">
                      {project.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <span className="mr-2 text-primary">✓</span>
                          <span className="text-foreground/80">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                
                <CardFooter className="pt-4 border-t border-border/50 gap-4 mt-auto">
                  {project.playStore && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      asChild
                    >
                      <a href={project.playStore} target="_blank" rel="noopener noreferrer">
                        <FaGooglePlay className="w-4 h-4 mr-2" /> Play Store
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
