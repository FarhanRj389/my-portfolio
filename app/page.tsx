"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { projects } from "@/data/projects";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Code2,
  Cpu,
  Download,
  ExternalLink,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Palette,
  Send,
  Server,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sun,
  Wrench,
  X,
  Zap,
} from "lucide-react";

const roles = [
  "Web Developer",
  "Shopify Performance Developer",
  "WordPress Specialist",
  "Amazon Product Hunter",
  "Electronics Engineer",
];
const accentOptions = [
  { name: "Yellow", value: "#facc15" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Lime", value: "#a3e635" },
  { name: "Orange", value: "#fb923c" },
];
const skillGroups = [
  [
    "Frontend",
    ["HTML", "CSS", "JavaScript", "React.js", "Next.js", "Tailwind CSS"],
    Code2,
  ],
  ["Backend", ["Node.js", "REST APIs", "Supabase", "n8n automation"], Server],
  [
    "CMS & E-commerce",
    [
      "WordPress",
      "Elementor",
      "WooCommerce",
      "Shopify",
      "Liquid",
      "Theme Development",
      "Store Management",
    ],
    ShoppingBag,
  ],
  [
    "Amazon eCommerce",
    [
      "Product Hunting",
      "Helium 10",
      "Product Research",
      "Keyword Research",
      "Competitor Analysis",
      "Alibaba Research",
    ],
    Globe2,
  ],
  [
    "IT & Electronics",
    [
      "PCB Design",
      "OrCAD / KiCad",
      "Arduino",
      "PLC",
      "Hardware Troubleshooting",
    ],
    Cpu,
  ],
  [
    "AI & Dev Tools",
    [
      "Cursor AI",
      "Windsurf",
      "Bolt AI",
      "ChatGPT",
      "Git",
      "GitHub",
      "Vercel",
      "Netlify",
    ],
    Sparkles,
  ],
] as const;
const services = [
  [
    "Shopify Development & CRO",
    "Custom Liquid themes and high-impact storefront improvements.",
    ShoppingBag,
  ],
  [
    "WordPress & WooCommerce",
    "Fast, flexible websites that are easy to manage and built to convert.",
    Layers3,
  ],
  [
    "React / Next.js Web Apps",
    "Modern interfaces, integrations, and experiences that feel effortless.",
    Code2,
  ],
  [
    "Amazon Product Research",
    "Evidence-led product hunting and market research with Helium 10.",
    Globe2,
  ],
  [
    "n8n Automation & APIs",
    "Connect your tools, remove repetitive work, and create smarter workflows.",
    Zap,
  ],
  [
    "IT Support & Electronics",
    "A rare blend of practical troubleshooting, hardware, and engineering depth.",
    Wrench,
  ],
] as const;
const experience = [
  {
    role: "Shopify Performance Developer",
    company: "Eve Boss Australia",
    date: "Feb 2026 — Jul 2026",
    text: "CRO-focused custom Liquid themes, technical SEO audits, Core Web Vitals, Meta Pixel, Clarity heatmaps, Klaviyo flows, and product catalog sync.",
    links: ["klaracosmetics.com", "sechi.com.au", "sechiacademy.com.au"],
  },
  {
    role: "Web Developer",
    company: "DigitronCX · Karachi",
    date: "Apr 2025 — Jan 2026",
    text: "Built React and Tailwind booking platforms, integrated APIs and payments, customized WordPress and Shopify builds, and improved performance and SEO.",
    links: [],
  },
  {
    role: "SMT Machine Technician",
    company: "Factor LED · Karachi",
    date: "Oct 2024 — Mar 2025",
    text: "Monitored automated SMT systems, diagnosed hardware and software errors, handled preventive maintenance, and maintained clear SOPs and reports.",
    links: [],
  },
  {
    role: "WordPress Developer · Intern",
    company: "Silicon Power · Karachi",
    date: "Jun 2024 — Sep 2024",
    text: "Set up WooCommerce, customized Elementor builds, managed hosting, DNS, migrations and SMTP, and performed cross-browser testing.",
    links: [],
  },
  {
    role: "Freelance Web Developer",
    company: "Independent · Local & international",
    date: "May 2021 — Present",
    text: "WordPress business sites, Shopify stores, Liquid customization, React and Next.js landing pages, deployments, integrations, SEO, and n8n automations.",
    links: [],
  },
  {
    role: "Electronics & IT Support Engineer",
    company: "Silicon Solar Science System · Karachi",
    date: "Dec 2017 — May 2024",
    text: "First-level helpdesk, LAN and Wi-Fi troubleshooting, inventory and backups, multilayer PCB design, Arduino LCD/HMI, PLC and inverter repair, and naval electronics support.",
    links: [],
  },
];
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};
const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(3, "Please add a subject"),
  message: z.string().min(15, "Please share a little more detail"),
  website: z.string().optional(),
});
type ContactValues = z.infer<typeof contactSchema>;

type IconType = typeof Code2;
function SectionHeading({
  eyebrow,
  title,
  detail,
}: {
  eyebrow: string;
  title: string;
  detail: string;
}) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[.28em] text-accent">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-7 text-zinc-400">{detail}</p>
    </div>
  );
}
function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
}
function IconBox({ icon: Icon }: { icon: IconType }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
      <Icon size={20} />
    </div>
  );
}

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All");
  const [accent, setAccent] = useState("#facc15");
  const [scroll, setScroll] = useState(0);
  const [mounted, setMounted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-accent");
    if (stored) setAccent(stored);
  }, []);
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", accent);
    window.localStorage.setItem("portfolio-accent", accent);
  }, [accent]);
  useEffect(() => {
    const timer = window.setInterval(
      () => setRoleIndex((current) => (current + 1) % roles.length),
      2600,
    );
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    const update = () =>
      setScroll(
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
          100,
      );
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );
  const onSubmit = async (values: ContactValues) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Unable to send");
      toast.success("Message sent. I’ll be in touch soon.");
      reset();
    } catch {
      toast.error(
        "Something went wrong. Please try again or email me directly.",
      );
    }
  };

  return (
    <main className="noise overflow-hidden bg-[var(--background)] text-zinc-100">
      <motion.div
        className="fixed left-0 top-0 z-[60] h-1 bg-accent"
        style={{ width: `${scroll}%` }}
      />
      <Navbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        theme={theme}
        setTheme={setTheme}
        accent={accent}
        setAccent={setAccent}
        mounted={mounted}
      />
      <section
        id="home"
        className="relative grid-bg px-6 pb-20 pt-32 sm:px-10 lg:min-h-screen lg:px-16 lg:pt-44"
      >
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-[110px]" />
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.3em] text-accent"
            >
              <span className="h-px w-8 bg-accent" /> Karachi, Pakistan
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl font-bold leading-[.98] tracking-[-.06em] text-white sm:text-7xl lg:text-[6.5rem]"
            >
              Hi, I&apos;m
              <br />
              <span className="text-accent">Farhan</span> Ahmed.
            </motion.h1>
            <div className="mt-8 flex h-9 items-center text-xl font-medium text-zinc-300 sm:text-2xl">
              <span className="mr-3 text-zinc-500">I&apos;m a</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={roles[roleIndex]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-white"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <p className="mt-7 max-w-xl text-base leading-8 text-zinc-400">
              I build fast, conversion-focused websites and e-commerce stores
              pairing digital craft with an engineer&apos;s eye for systems that
              work.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#work"
                className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-black transition hover:gap-5"
              >
                View my work <ArrowUpRight size={18} />
              </a>
              <a
                href="/Farhan_Ahmed_CV.pdf"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition hover:border-accent hover:text-accent"
              >
                <Download size={17} /> Download CV
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-2 py-3.5 text-sm font-semibold text-zinc-400 transition hover:text-accent"
              >
                Hire me <ChevronRight size={17} />
              </a>
            </div>
            <div className="mt-14 grid max-w-2xl grid-cols-2 gap-6 border-t border-white/10 pt-7 sm:grid-cols-4">
              <Stat value="6+" label="Years experience" />
              <Stat value="15+" label="Projects shipped" />
              <Stat value="3" label="Australian brands" />
              <Stat value="∞" label="Curiosity" />
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[520px] lg:mr-0">
            <div className="absolute inset-8 rounded-full bg-accent/20 blur-3xl" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-[40%] border border-dashed border-accent/50"
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900 shadow-2xl shadow-accent/10">
              <Image
                src="/Farhan_Ahmed.jpg"
                alt="Farhan Ahmed"
                width={700}
                height={800}
                priority
                className="h-auto w-full object-cover grayscale-[15%] transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </div>
            <FloatBadge label="React" className="left-0 top-16" />
            <FloatBadge label="Shopify" className="right-0 top-28" />
            <FloatBadge label="Next.js" className="bottom-20 left-2" />
            <FloatBadge label="Supabase" className="bottom-10 right-3" />
          </div>
        </div>
        <a
          href="#about"
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] font-semibold uppercase tracking-[.3em] text-zinc-500 lg:flex"
        >
          Scroll to explore <ArrowDown size={14} className="animate-bounce" />
        </a>
      </section>
      <div className="border-y border-white/10 bg-zinc-950/80 py-4">
        <div className="flex min-w-max gap-10 overflow-hidden text-xs font-bold uppercase tracking-[.24em] text-zinc-600">
          <span>Digital craft</span>
          <span className="text-accent">✦</span>
          <span>Built for impact</span>
          <span className="text-accent">✦</span>
          <span>Web · Commerce · Systems</span>
          <span className="text-accent">✦</span>
          <span>Digital craft</span>
          <span className="text-accent">✦</span>
          <span>Built for impact</span>
        </div>
      </div>
      <section id="about" className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal>
            <SectionHeading
              eyebrow="01 / About"
              title="A developer with more than one lens."
              detail="The best digital work happens when design, technology, and business all speak to each other."
            />
          </Reveal>
          <Reveal className="lg:pt-16">
            <p className="max-w-2xl text-2xl font-medium leading-[1.45] text-white sm:text-3xl">
              I turn ideas into{" "}
              <span className="text-accent">clear, useful experiences</span>
              from high-performing Shopify stores to custom web apps and the
              systems behind them.
            </p>
            <p className="mt-7 max-w-xl leading-8 text-zinc-400">
              With 6+ years across web development, e-commerce, IT support, and
              electronics engineering, I bring a practical perspective to every
              brief. I&apos;m currently pursuing BS Software Engineering at Iqra
              University.
            </p>
            <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
              <MiniHighlight title="Web dev" text="Fast, focused interfaces" />
              <MiniHighlight title="Commerce" text="Stores that sell" />
              <MiniHighlight title="Engineering" text="Systems that last" />
            </div>
          </Reveal>
        </div>
      </section>
      <section
        id="skills"
        className="border-t border-white/10 px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="02 / Capabilities"
              title="A broad toolkit. One clear goal."
              detail="From the first line of code to the final conversion, I bring the right tools to the right problem."
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map(([title, items, Icon], index) => (
              <Reveal key={title} className={`delay-${index * 100}`}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/[.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-accent/[.04]">
                  <div className="flex items-start justify-between">
                    <IconBox icon={Icon} />
                    <span className="font-display text-sm text-zinc-600">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-7 font-display text-xl font-bold text-white">
                    {title}
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-zinc-400 transition group-hover:border-accent/20 group-hover:text-zinc-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section
        id="experience"
        className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="03 / Experience"
              title="Work that compounds."
              detail="Every role has added a new layer — from hands-on hardware to high-performance commerce."
            />
          </Reveal>
          <div className="relative ml-2 border-l border-accent/30 pl-8 sm:ml-6 sm:pl-12">
            {experience.map((item, index) => (
              <Reveal
                key={item.role + item.company}
                className="relative mb-12 last:mb-0"
              >
                <span className="absolute -left-[41px] top-2 h-4 w-4 rounded-full border-4 border-[#0a0a0a] bg-accent sm:-left-[57px]" />
                <div className="grid gap-5 lg:grid-cols-[.7fr_1.3fr]">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent">
                      {item.date}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-bold text-white">
                      {item.role}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500">{item.company}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.03] p-6">
                    <p className="leading-7 text-zinc-400">{item.text}</p>
                    {item.links.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.links.map((link) => (
                          <span
                            key={link}
                            className="rounded-full bg-accent/10 px-3 py-1.5 text-xs text-accent"
                          >
                            {link}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section
        id="work"
        className="border-t border-white/10 px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="04 / Selected work"
              title="A few things I've shipped."
              detail="A selection of recent builds across services, healthcare, local business, and e-commerce."
            />
          </Reveal>
          <div className="mb-9 flex flex-wrap gap-2">
            {["All", "React & Next.js", "Shopify", "WordPress"].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${activeFilter === filter ? "bg-accent text-black" : "border border-white/10 text-zinc-400 hover:border-accent/50 hover:text-white"}`}
                >
                  {filter}
                </button>
              ),
            )}
          </div>
          <motion.div
            layout
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.map((project) => (
              <motion.a
                layout
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 transition hover:-translate-y-1 hover:border-accent/50"
              >
                <div
                  className={`relative flex aspect-[1.25] items-end overflow-hidden bg-gradient-to-br ${project.accent} p-6`}
                >
                  <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/0" />
                  <div className="absolute right-5 top-5 rounded-full border border-white/30 bg-black/20 p-2 text-white opacity-0 transition group-hover:opacity-100">
                    <ExternalLink size={16} />
                  </div>
                  <div className="relative">
                    <p className="text-xs font-semibold uppercase tracking-[.18em] text-black/60">
                      {project.category}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-zinc-950">
                      {project.title}
                    </h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm leading-6 text-zinc-400">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-zinc-600 dark:text-zinc-500"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
      <section id="services" className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="05 / Services"
              title="Useful by design."
              detail="No bloated packages. Just focused expertise shaped around what your business needs next."
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map(([title, text, Icon]) => (
              <Reveal key={title}>
                <div className="group rounded-2xl border border-white/10 p-6 transition hover:border-accent/50 hover:bg-accent/[.03]">
                  <IconBox icon={Icon} />
                  <h3 className="mt-7 font-display text-xl font-bold text-white">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-500">{text}</p>
                  <ArrowUpRight
                    className="mt-8 text-zinc-700 transition group-hover:text-accent"
                    size={20}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section
        id="amazon"
        className="border-y border-white/10 bg-accent px-6 py-24 text-black sm:px-10 lg:px-16 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.28em] text-black/60">
              Certified · JDC
            </p>
            <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-6xl">
              Finding the
              <br />
              next winner.
            </h2>
            <p className="mt-6 max-w-md leading-7 text-black/70">
              Amazon product hunting that starts with evidence, not assumptions
              from market demand to a supplier you can trust.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            {[
              ["01", "Product Research"],
              ["02", "Keyword Research"],
              ["03", "Competitor Analysis"],
              ["04", "Alibaba Sourcing"],
            ].map(([number, label]) => (
              <div key={number} className="border-t border-black/25 pt-4">
                <span className="text-xs font-bold text-black/50">
                  {number}
                </span>
                <p className="mt-8 font-display text-lg font-bold">{label}</p>
                <ChevronRight className="mt-5" size={18} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="education" className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="06 / Education"
              title="Always learning."
              detail="A foundation in engineering, an eye on software, and a habit of staying curious."
            />
            <div className="space-y-6">
              {[
                ["BS Software Engineering", "Iqra University · Since Jun 2024"],
                [
                  "DAE Electronics Engineering",
                  "Government College of Technology Karachi · 2017–2020",
                ],
                ["Matriculation · Science", "2005–2015"],
              ].map(([title, text]) => (
                <div key={title} className="border-l-2 border-accent pl-5">
                  <h3 className="font-display text-lg font-bold text-white">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">{text}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div className="rounded-2xl border border-white/10 bg-white/[.03] p-7">
              <p className="text-xs font-semibold uppercase tracking-[.2em] text-accent">
                Certificates & languages
              </p>
              <div className="mt-6 space-y-4">
                {[
                  "Amazon Product Hunting - (JDC)",
                  "MS Office Certification - (TechZone)",
                  "WordPress & Shopify Development - (TechZone)",
                  "Full-Stack Developer Training · Ongoing (TechZone)",
                ].map((item) => (
                  <p
                    key={item}
                    className="flex items-center gap-3 text-sm text-zinc-300"
                  >
                    <Check size={16} className="text-accent" /> {item}
                  </p>
                ))}
              </div>
              <div className="mt-9 border-t border-white/10 pt-6">
                <p className="text-sm text-zinc-500">Languages</p>
                <p className="mt-2 text-white">
                  Urdu <span className="text-zinc-600">Native</span> · English{" "}
                  <span className="text-zinc-600">Working proficiency</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section
        id="contact"
        className="border-t border-white/10 px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal>
            <SectionHeading
              eyebrow="07 / Contact"
              title="Have a good problem?"
              detail="Tell me what you're working on. I'll bring a clear point of view and a practical next step."
            />
            <div className="space-y-4">
              <ContactCard
                icon={Mail}
                label="Email"
                value="farhanrjcw389@gmail.com"
                href="mailto:farhanrjcw389@gmail.com"
              />
              <ContactCard
                icon={MapPin}
                label="Based in"
                value="Karachi, Pakistan"
              />
              <ContactCard
                icon={Globe2}
                label="Website"
                value="appifyinnovations.netlify.app"
                href="https://appifyinnovations.netlify.app/"
              />
            </div>
            <div className="mt-7 flex gap-3">
              <a
                href="https://github.com/Farhanrj389"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 p-3 text-zinc-400 transition hover:border-accent hover:text-accent"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/farhanrjcw389/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 p-3 text-zinc-400 transition hover:border-accent hover:text-accent"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </Reveal>
          <Reveal>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl border border-white/10 bg-white/[.03] p-6 sm:p-8"
            >
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                {...register("website")}
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your name" error={errors.name?.message}>
                  <input
                    {...register("name")}
                    placeholder="Farhan, I'm working on..."
                    className="input"
                  />
                </Field>
                <Field label="Email address" error={errors.email?.message}>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="you@company.com"
                    className="input"
                  />
                </Field>
              </div>
              <Field label="Subject" error={errors.subject?.message}>
                <input
                  {...register("subject")}
                  placeholder="Let's build something useful"
                  className="input"
                />
              </Field>
              <Field label="Message" error={errors.message?.message}>
                <textarea
                  {...register("message")}
                  rows={6}
                  placeholder="A little context about your project..."
                  className="input resize-none"
                />
              </Field>
              <button
                disabled={isSubmitting}
                className="mt-2 inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-black transition hover:gap-5 disabled:cursor-wait disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send message"}{" "}
                <Send size={16} />
              </button>
            </form>
          </Reveal>
        </div>
      </section>
      <footer className="border-t border-white/10 px-6 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-xl font-bold text-white">
              Farhan<span className="text-accent">.</span>
            </p>
            <p className="mt-1 text-xs text-zinc-600">
              © My Portfolio · Built with intent.
            </p>
          </div>
          <div className="flex items-center gap-6 text-xs font-semibold uppercase tracking-[.15em] text-zinc-500">
            <a
              href="#home"
              className="flex items-center gap-2 transition hover:text-accent"
            >
              Back to top <ArrowUp size={14} />
            </a>
            <a href="#contact" className="transition hover:text-accent">
              Let&apos;s talk
            </a>
          </div>
        </div>
      </footer>
      <a
        href="https://wa.me/923271640609"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-black shadow-lg shadow-accent/20 transition hover:scale-110"
      >
        <Send size={20} />
      </a>
    </main>
  );
}

function Navbar({
  menuOpen,
  setMenuOpen,
  theme,
  setTheme,
  accent,
  setAccent,
  mounted,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  theme?: string;
  setTheme: (theme: string) => void;
  accent: string;
  setAccent: (accent: string) => void;
  mounted: boolean;
}) {
  const links = [
    ["About", "#about"],
    ["Skills", "#skills"],
    ["Experience", "#experience"],
    ["Work", "#work"],
    ["Contact", "#contact"],
  ];
  const resolvedTheme = mounted ? theme : "dark";
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8">
      <nav className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3">
        <a href="#home" className="font-display text-lg font-bold text-white">
          FA<span className="text-accent">.</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-xs font-semibold text-zinc-400 transition hover:text-white"
            >
              {label}
            </a>
          ))}
          <div className="flex items-center gap-2 border-l border-white/10 pl-5">
            <button
              aria-label="Toggle theme"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="rounded-full p-2 text-zinc-400 hover:text-accent"
            >
              {resolvedTheme === "dark" ? (
                <Sun size={16} />
              ) : (
                <Moon size={16} />
              )}
            </button>
            <div className="group relative">
              <button
                aria-label="Choose accent color"
                className="rounded-full p-2 text-zinc-400 hover:text-accent"
              >
                <Palette size={16} />
              </button>
              <div className="absolute right-0 top-10 hidden gap-2 rounded-xl border border-white/10 bg-zinc-900 p-3 group-hover:flex">
                {accentOptions.map((option) => (
                  <button
                    key={option.name}
                    aria-label={option.name}
                    onClick={() => setAccent(option.value)}
                    className={`h-5 w-5 rounded-full border-2 ${accent === option.value ? "border-white" : "border-transparent"}`}
                    style={{ background: option.value }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <button
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-full p-2 text-zinc-300 md:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        {menuOpen && (
          <div className="absolute left-4 right-4 top-16 rounded-2xl border border-white/10 bg-zinc-900 p-5 md:hidden">
            {links.map(([label, href]) => (
              <a
                onClick={() => setMenuOpen(false)}
                key={href}
                href={href}
                className="block border-b border-white/10 py-3 text-sm text-zinc-300 last:border-0"
              >
                {label}
              </a>
            ))}
            <button
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="mt-3 flex items-center gap-2 text-sm text-zinc-400"
            >
              {resolvedTheme === "dark" ? (
                <Sun size={16} />
              ) : (
                <Moon size={16} />
              )}{" "}
              Switch theme
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-[11px] uppercase tracking-[.12em] text-zinc-600">
        {label}
      </p>
    </div>
  );
}
function FloatBadge({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute z-10 rounded-full border border-white/15 bg-zinc-900/90 px-4 py-2 text-xs font-semibold text-white shadow-xl ${className}`}
    >
      {label}
    </motion.div>
  );
}
function MiniHighlight({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <p className="text-sm font-bold text-accent">{title}</p>
      <p className="mt-1 text-xs leading-5 text-zinc-500">{text}</p>
    </div>
  );
}
function ContactCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: IconType;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 p-4 transition hover:border-accent/40">
      <IconBox icon={Icon} />
      <div>
        <p className="text-[10px] uppercase tracking-[.18em] text-zinc-600">
          {label}
        </p>
        <p className="mt-1 text-sm text-zinc-300">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
    >
      {content}
    </a>
  ) : (
    content
  );
}
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="mb-5 block text-xs font-semibold uppercase tracking-[.15em] text-zinc-500">
      {label}
      {children}
      {error && (
        <span className="mt-2 block normal-case tracking-normal text-red-400">
          {error}
        </span>
      )}
    </label>
  );
}
