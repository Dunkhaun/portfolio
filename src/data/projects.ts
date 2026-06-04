export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  goal: string;
  technologies: string[];
  features: { title: string; description: string }[];
  demoUrl: string;
  githubUrl: string;
  color: string;
}

export const projectsData: Project[] = [
  {
    id: 'landscaping',
    title: 'Landscaping Business',
    description: 'A robust online presence for a local landscaping service, focusing on lead generation and service showcase.',
    problem: 'The client needed a modern way to showcase their portfolio and allow customers to request quotes easily, replacing their outdated WordPress site.',
    goal: 'Build a blazing fast, SEO-optimized landing page with an integrated lead capture form and a dynamic portfolio gallery.',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Resend'],
    features: [
      { title: 'Dynamic Gallery', description: 'Interactive before/after image sliders for landscaping projects.' },
      { title: 'Quote Estimator', description: 'Multi-step form allowing users to get a rough estimate based on lawn size.' },
      { title: 'SEO Optimized', description: 'Server-side rendered pages ensuring top local search rankings.' }
    ],
    demoUrl: 'https://demo.landscaping.test',
    githubUrl: 'https://github.com/user/landscaping',
    color: 'from-green-500 to-emerald-700'
  },
  {
    id: 'restaurant',
    title: 'Restaurant',
    description: 'An interactive menu and reservation system for a fine dining restaurant.',
    problem: 'Managing reservations over the phone was inefficient, and the static PDF menu on their website provided a poor mobile experience.',
    goal: 'Create an app-like experience for diners to browse the menu visually and book tables in real-time.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    features: [
      { title: 'Interactive Menu', description: 'Filterable menu with dietary restriction tags and high-quality image previews.' },
      { title: 'Real-time Booking', description: 'Live availability checking and reservation management.' },
      { title: 'Admin Dashboard', description: 'Custom portal for staff to manage reservations and update menu items.' }
    ],
    demoUrl: 'https://demo.restaurant.test',
    githubUrl: 'https://github.com/user/restaurant',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'church',
    title: 'Church',
    description: 'A community hub for a local congregation, featuring live streams, event calendars, and sermon archives.',
    problem: 'During the pandemic, the church struggled to keep their congregation connected and engaged with scattered tools.',
    goal: 'Unify all digital church activities into one accessible, easy-to-manage platform.',
    technologies: ['Next.js', 'Sanity CMS', 'Tailwind', 'Mux Video'],
    features: [
      { title: 'Sermon Archive', description: 'Searchable database of past sermons with audio, video, and transcriptions.' },
      { title: 'Live Streaming Integration', description: 'Seamless embedding of weekly live streams with live chat.' },
      { title: 'Event Calendar', description: 'Dynamic calendar with RSVP functionality for church events.' }
    ],
    demoUrl: 'https://demo.church.test',
    githubUrl: 'https://github.com/user/church',
    color: 'from-blue-500 to-indigo-600'
  }
];
