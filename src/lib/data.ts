import {
  Database,
  Cloud,
  Layers,
  Smartphone,
  Wrench,
  Server,
  Bot,
  LucideIcon
} from "lucide-react";
import portfolioData from "./portfolio-data.json";

const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  Layers,
  Database,
  Cloud,
  Server,
  Wrench,
  Bot,
};

export const personalInfo = portfolioData.personalInfo;
export const domains = portfolioData.domains;

export const skills = portfolioData.skills.map((s) => ({
  ...s,
  icon: iconMap[s.icon] || Wrench,
}));

export const experience = portfolioData.experience;
export const projects = portfolioData.projects;
export const certifications = portfolioData.certifications;
