export type Project = {
  title: string;
  description: string;
  category: 'React & Next.js' | 'Shopify' | 'WordPress';
  url: string;
  tags: string[];
  accent: string;
};

export const projects: Project[] = [
  { title: 'Five Star Rentals', description: 'A polished property services experience built to turn local searches into bookings.', category: 'React & Next.js', url: 'https://fivestarrentals.netlify.app/', tags: ['React', 'Tailwind', 'SEO'], accent: 'from-amber-300/80 via-orange-500/60 to-zinc-950' },
  { title: 'Fone Fixer', description: 'A clear, conversion-led mobile repair website with a frictionless service journey.', category: 'React & Next.js', url: 'https://fone-fixer.netlify.app/', tags: ['React', 'UX', 'Netlify'], accent: 'from-yellow-200/90 via-lime-400/50 to-zinc-950' },
  { title: 'Core Chiropractic', description: 'Trust-first healthcare landing page designed around clarity, credibility, and calls.', category: 'React & Next.js', url: 'https://core-chiropractic.netlify.app/', tags: ['Next.js', 'Responsive', 'CRO'], accent: 'from-lime-300/80 via-emerald-400/40 to-zinc-950' },
  { title: 'Delishtans', description: 'A bright, energetic body tan brand presence with a simple booking-focused flow.', category: 'React & Next.js', url: 'https://delishtans.netlify.app/', tags: ['React', 'Branding', 'Motion'], accent: 'from-orange-300/90 via-yellow-400/50 to-zinc-950' },
  { title: 'YiSourcing', description: 'A modern sourcing services platform that makes a complex offer feel approachable.', category: 'React & Next.js', url: 'https://yisourcing.netlify.app/', tags: ['Next.js', 'API', 'UX'], accent: 'from-sky-200/80 via-cyan-500/40 to-zinc-950' },
  { title: 'Proper Lawn Care', description: 'A local service site shaped for quick scanning, trust signals, and quote requests.', category: 'React & Next.js', url: 'https://properlawncare.netlify.app/', tags: ['React', 'Local SEO', 'Vercel'], accent: 'from-green-300/80 via-lime-500/40 to-zinc-950' },
  { title: 'Klara Cosmetics', description: 'Performance-minded Shopify work for a beauty brand with an editorial edge.', category: 'Shopify', url: 'https://klaracosmetics.com', tags: ['Liquid', 'CRO', 'Klaviyo'], accent: 'from-rose-200/80 via-orange-300/40 to-zinc-950' },
  { title: 'Sechi', description: 'A refined store experience balancing product discovery with premium storytelling.', category: 'Shopify', url: 'https://sechi.com.au', tags: ['Shopify', 'Liquid', 'SEO'], accent: 'from-stone-200/80 via-amber-300/40 to-zinc-950' },
  { title: 'Sechi Academy', description: 'An education-led Shopify storefront with thoughtful content hierarchy.', category: 'Shopify', url: 'https://sechiacademy.com.au', tags: ['Shopify', 'Sections', 'UX'], accent: 'from-yellow-100/90 via-teal-400/40 to-zinc-950' },
];
