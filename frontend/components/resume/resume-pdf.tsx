"use client";

import { Document, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1a1a1a",
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: "row",
    gap: 16,
    fontSize: 9,
    color: "#444",
  },
  link: {
    color: "#444",
    textDecoration: "none",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    color: "#333",
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  company: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  duration: {
    fontSize: 9,
    color: "#666",
  },
  role: {
    fontSize: 10,
    color: "#666",
    marginBottom: 4,
  },
  description: {
    fontSize: 9,
    lineHeight: 1.4,
    color: "#444",
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillCategory: {
    width: "48%",
    marginBottom: 8,
  },
  skillCategoryTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  skillItems: {
    fontSize: 9,
    color: "#444",
    lineHeight: 1.4,
  },
  venturesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  ventureItem: {
    width: "48%",
    marginBottom: 6,
  },
  ventureName: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  ventureDesc: {
    fontSize: 8,
    color: "#666",
  },
  clientsList: {
    fontSize: 9,
    color: "#444",
    lineHeight: 1.6,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 8,
    color: "#999",
    textAlign: "center",
  },
});

const experiences = [
  {
    company: "GEXP Software",
    role: "Founder & CEO",
    duration: "2017 - Present",
    description:
      "Leading a software agency delivering innovative digital products, design services, and staff augmentation for startups and enterprises worldwide.",
  },
  {
    company: "Universal Music Group",
    role: "Senior Software Developer",
    duration: "2018 - Present",
    description:
      "Full-stack development with React, Node.js, and AWS. Building dynamic interfaces and managing cloud operations for one of the world's largest music companies.",
  },
  {
    company: "Provectus",
    role: "Software Engineer",
    duration: "2020 - Present",
    description:
      "AWS Premier Consulting Partner. Working on AI solutions, MLOps, and cloud transformation projects for enterprise clients.",
  },
  {
    company: "Univision-Televisa",
    role: "Full Stack Developer",
    duration: "2016 - 2020",
    description:
      "Built and maintained high-traffic platforms including Univision.com and TUDN using Next.js, GraphQL, and modern web technologies.",
  },
  {
    company: "IBM",
    role: "Senior Software Engineer",
    duration: "2019 - 2020",
    description:
      "Built and maintained business process tools using React, Node.js, and IBM Carbon Design System.",
  },
  {
    company: "Prodigious Latin America",
    role: "Full Stack Developer",
    duration: "2013 - 2016",
    description:
      "Full-stack development for Bank of America. Built web applications following industry standards and best practices.",
  },
];

const skills = [
  {
    category: "Frontend",
    items: "React, Next.js, React Native, TypeScript, SSR/RSC, Tailwind CSS",
  },
  { category: "Backend", items: "Node.js, GraphQL, REST APIs, PostgreSQL, Redis, MongoDB" },
  { category: "Cloud & DevOps", items: "AWS, Hetzner, Coolify, Docker, CI/CD, Vercel" },
  { category: "AI & Tools", items: "Claude Code, Cursor, AI Workflows, Git, Figma" },
];

const ventures = [
  { name: "GEXP Software", desc: "Software Agency - Digital products for startups & enterprises" },
  { name: "GEXP Costa Rica", desc: "Local Services - Empowering local businesses with technology" },
  { name: "Inflafest", desc: "Events - Premier inflatable parks & festival experiences" },
  { name: "TicoGuides", desc: "Tourism - Authentic Costa Rican adventures" },
];

const clients = [
  "Bank of America",
  "IBM",
  "Universal Music",
  "BMW",
  "Mercedes Benz",
  "Pfizer",
  "Univision-Televisa",
  "Provectus",
  "Automation Anywhere",
  "3Pillar Global",
];

export function ResumePDF() {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>Marcelo Retana</Text>
          <Text style={styles.title}>Full Stack Developer & Entrepreneur</Text>
          <View style={styles.contactRow}>
            <Text>Puerto Jiménez, Costa Rica</Text>
            <Link src="mailto:info@gexpsoftware.com" style={styles.link}>
              info@gexpsoftware.com
            </Link>
            <Text>+506 7107 7969</Text>
            <Link src="https://marceloretana.com" style={styles.link}>
              marceloretana.com
            </Link>
            <Link src="https://linkedin.com/in/marceloretana" style={styles.link}>
              LinkedIn
            </Link>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summary}>
            Serial entrepreneur passionate about technology and helping businesses and people grow.
            Full-stack developer with 10+ years of experience building scalable web applications for
            Fortune 500 companies and startups. Loves getting involved with product, UX, and UI.
            Expert in React, Next.js, Node.js, and cloud architecture. Founder of GEXP Software.
          </Text>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {experiences.map((exp) => (
            <View key={exp.company} style={styles.experienceItem}>
              <View style={styles.experienceHeader}>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.duration}>{exp.duration}</Text>
              </View>
              <Text style={styles.role}>{exp.role}</Text>
              <Text style={styles.description}>{exp.description}</Text>
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          <View style={styles.skillsGrid}>
            {skills.map((skill) => (
              <View key={skill.category} style={styles.skillCategory}>
                <Text style={styles.skillCategoryTitle}>{skill.category}</Text>
                <Text style={styles.skillItems}>{skill.items}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Ventures */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ventures & Projects</Text>
          <View style={styles.venturesGrid}>
            {ventures.map((v) => (
              <View key={v.name} style={styles.ventureItem}>
                <Text style={styles.ventureName}>{v.name}</Text>
                <Text style={styles.ventureDesc}>{v.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Clients */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notable Clients</Text>
          <Text style={styles.clientsList}>{clients.join(" • ")}</Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>References available upon request • marceloretana.com</Text>
      </Page>
    </Document>
  );
}
