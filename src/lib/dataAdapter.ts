// Data Adapter for abstracting API calls.

export interface DeveloperStats {
  yearsOfExperience: number;
  productsShipped: number;
  mentees: number;
  performanceImprovementPct: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  role: string;
  description: string;
  problem: string;
  approach: string;
  impactMetrics: { label: string; value: string }[];
  tags: string[];
  sparklineData: number[];
  image?: string;
  link?: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  description: string;
}

export interface HeatmapContribution {
  date: string;
  count: number;
}

export const getStats = async (): Promise<DeveloperStats> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        yearsOfExperience: 3,
        productsShipped: 8,
        mentees: 100,
        performanceImprovementPct: 40, // 40% chatbot accuracy
      });
    }, 200);
  });
};

export const getCaseStudies = async (): Promise<CaseStudy[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'hire10x',
          title: 'Hire10x.ai — AI-Powered Hiring',
          role: 'Main Contributor',
          description: 'Next-generation AI recruitment platform automating candidate screening and resume parsing.',
          problem: 'Manual recruitment processes were time-consuming and prone to human bias.',
          approach: 'Developed Next.js frontend and Flask backend using LLMs and NLP for intelligent job matching.',
          impactMetrics: [
            { label: 'Screening', value: 'Automated' },
            { label: 'Stack', value: 'GenAI/Next' }
          ],
          tags: ['React.js', 'Next.js', 'Flask', 'LLMs', 'NLP'],
          sparklineData: [20, 30, 45, 60, 50, 75, 85, 95],
          image: '/images/ui_dashboard_mockup_1780219096446.png'
        },
        {
          id: 'flex-ui',
          title: 'Flex UI — Component Registry',
          role: 'Solo Developer',
          description: 'Advanced UI component registry inspired by shadcn/ui to browse, install, and customise reusable React components.',
          problem: 'Inconsistent UI delivery across teams leading to slower feature shipping.',
          approach: 'Built a strictly typed React component library with Next.js frontend and backend API registry.',
          impactMetrics: [
            { label: 'Delivery Time', value: '-30%' },
            { label: 'Reusability', value: 'High' }
          ],
          tags: ['React', 'TypeScript', 'Tailwind', 'NPM'],
          sparklineData: [10, 15, 25, 20, 40, 35, 60, 55, 80, 100],
          image: '/images/coding_workspace_1780219127831.png'
        },
        {
          id: 'resume-builder',
          title: 'Conversational AI Resume Builder',
          role: 'Core Developer',
          description: 'AI resume builder optimising resumes for ATS compatibility via conversation.',
          problem: 'Job seekers struggle to tailor resumes for ATS systems and specific job descriptions.',
          approach: 'Integrated FastAPI, LangChain, and prompt engineering to process and optimise resumes.',
          impactMetrics: [
            { label: 'Optimization', value: 'ATS' },
            { label: 'Accuracy', value: '+40%' }
          ],
          tags: ['React.js', 'FastAPI', 'LangChain', 'Prompt Engineering'],
          sparklineData: [10, 20, 30, 45, 60, 70, 85, 95],
          image: '/images/resume_builder_ai_1780220008041.png'
        },
        {
          id: 'wonder-ai',
          title: 'Wonder-AI — Map Chatbot',
          role: 'Solo Developer',
          description: 'Full-featured AI chatbot in Next.js with map integration and navigation services.',
          problem: 'Users needed context-aware location services via conversational interfaces.',
          approach: 'Implemented streaming via WebSockets, LLM context memory, and location-based services.',
          impactMetrics: [
            { label: 'Latency', value: 'Low' },
            { label: 'Sync', value: 'Real-time' }
          ],
          tags: ['FastAPI', 'WebSockets', 'OpenAI', 'Redis'],
          sparklineData: [50, 40, 60, 55, 75, 70, 90, 85, 110, 105],
          image: '/images/ai_neural_network_1780219111951.png'
        },
        {
          id: 'voice-agent',
          title: 'AI Voice Agent',
          role: 'Solo Developer',
          description: 'Intelligent voice agent automating email and WhatsApp communications.',
          problem: 'Manual messaging across multiple platforms creates communication bottlenecks.',
          approach: 'Used Python and LLM APIs with async processing and webhook integrations for real-time messaging.',
          impactMetrics: [
            { label: 'Messaging', value: 'Async' },
            { label: 'Platform', value: 'Multi' }
          ],
          tags: ['Python', 'LLM APIs', 'Webhooks', 'Asyncio'],
          sparklineData: [5, 10, 15, 25, 40, 50, 65, 80],
          image: '/images/voice_agent_ai_1780220023032.png'
        },
        {
          id: 'industry-pilot',
          title: 'Industry-Pilot Platform',
          role: 'Project Lead',
          description: 'Ed-Tech learning platform for beginner developers with user onboarding flows and content pipelines.',
          problem: 'Needed a scalable cross-functional platform managed via Agile sprints.',
          approach: 'Managed a team of 5+ to deliver a React.js frontend and Python microservices backend.',
          impactMetrics: [
            { label: 'Team', value: '5+' },
            { label: 'Users', value: '10k+' }
          ],
          tags: ['React.js', 'Python', 'Microservices', 'Agile'],
          sparklineData: [40, 50, 60, 55, 75, 85, 95, 100],
          image: '/images/industry_pilot_platform_1780220037774.png'
        },
        {
          id: 'industry-pilot-mobile',
          title: 'Industry-Pilot Mobile App',
          role: 'Project Lead',
          description: 'Unified cross-platform experience combining IndustryPilot, CareerPilot, and TaskPilot.',
          problem: 'Disjointed mobile experiences across iOS and Android.',
          approach: 'Led Flutter-based development and designed backend APIs for seamless cross-platform sync.',
          impactMetrics: [
            { label: 'Platform', value: 'iOS/Android' },
            { label: 'UX', value: 'Unified' }
          ],
          tags: ['Flutter', 'iOS', 'Android', 'REST APIs'],
          sparklineData: [20, 35, 50, 65, 70, 85, 90, 95],
          image: '/images/mobile_app_mockup_1780219693772.png'
        },
        {
          id: 'virtual-tryon',
          title: 'Virtual Try-On AI',
          role: 'Backend Developer',
          description: 'Online virtual clothing try-on system for retail.',
          problem: 'High return rates in online retail due to sizing uncertainty.',
          approach: 'Built REST API backend integrating computer vision models and real-time image processing.',
          impactMetrics: [
            { label: 'Processing', value: 'Real-time' },
            { label: 'API', value: 'RESTful' }
          ],
          tags: ['Python', 'Computer Vision', 'REST API', 'Image Processing'],
          sparklineData: [10, 15, 30, 45, 60, 75, 80, 90],
          image: '/images/computer_vision_ai_1780219708398.png'
        },
        {
          id: '10xscale-web',
          title: '10xScale.ai Official Web',
          role: 'Project Lead',
          description: 'Company website showcasing products and learner engagement tools.',
          problem: 'Needed a modern, high-performance web presence to showcase AI tools.',
          approach: 'Led development using Next.js for the frontend and Python for the backend.',
          impactMetrics: [
            { label: 'Performance', value: 'High' },
            { label: 'SEO', value: 'Optimized' }
          ],
          tags: ['Next.js', 'Python', 'LangChain', 'PostgreSQL'],
          sparklineData: [20, 35, 30, 55, 45, 80, 75, 95, 90, 120],
          image: '/images/modern_website_mockup_1780219724317.png'
        }
      ]);
    }, 200);
  });
};

export const getEducation = async (): Promise<Education[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          degree: 'Bachelor of Science — Computer Science',
          institution: 'Government Arts and Science College, Coimbatore',
          period: 'Graduated: 2023',
          details: [
            'Focused on software engineering, database management, and modern web technologies.',
            'Built foundational skills in full-stack architecture and computer science principles.'
          ]
        }
      ]);
    }, 200);
  });
};

export const getCertifications = async (): Promise<Certification[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          title: 'AWS Certified Cloud Practitioner',
          issuer: 'Amazon Web Services',
          year: '2023',
          description: 'Demonstrated fundamental understanding of IT services and their uses in the AWS Cloud.'
        },
        {
          title: 'Microsoft Azure Fundamentals (AZ-900)',
          issuer: 'Microsoft',
          year: '2023',
          description: 'Validated foundational knowledge of cloud services and how those services are provided with Microsoft Azure.'
        }
      ]);
    }, 200);
  });
};

export const getHeatmapData = async (): Promise<HeatmapContribution[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data: HeatmapContribution[] = [];
      const today = new Date();
      for (let i = 89; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        
        const isWeekend = d.getDay() === 0 || d.getDay() === 6;
        let maxCount = isWeekend ? 3 : 10;
        
        if (i < 14) maxCount += 5;

        data.push({
          date: d.toISOString().split('T')[0],
          count: Math.floor(Math.random() * maxCount)
        });
      }
      resolve(data);
    }, 200);
  });
};

export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  features: string[];
}

export const getServices = async (): Promise<Service[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'frontend',
          title: 'Frontend Architecture',
          icon: 'LayoutTemplate',
          description: 'Pixel-perfect, high-performance UIs built with React and Next.js. Specializing in component-driven architecture, complex state management, and buttery-smooth GSAP animations.',
          features: ['React & Next.js', 'Tailwind & Shadcn UI', 'GSAP Motion Design']
        },
        {
          id: 'genai',
          title: 'GenAI & RAG Engineering',
          icon: 'BrainCircuit',
          description: 'Architecting intelligent AI pipelines. Integrating LLMs with proprietary data using LangChain, Vector Databases, and advanced prompt engineering.',
          features: ['LangChain & LLMs', 'RAG Pipelines', 'Vector Databases']
        },
        {
          id: 'backend',
          title: 'Scalable Backend APIs',
          icon: 'Server',
          description: 'Robust server-side logic and microservices using Python. Building scalable REST APIs and WebSocket endpoints for real-time applications.',
          features: ['Python & FastAPI', 'Microservices', 'Real-time WebSockets']
        }
      ]);
    }, 200);
  });
};

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
}

export const getTestimonials = async (): Promise<Testimonial[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 't1',
          name: 'Sarah Jenkins',
          role: 'Product Manager',
          company: '10xScale.ai',
          text: 'Tamilarasan is an exceptional engineer. He took our AI-powered CRM from concept to a production-ready application serving 10,000+ users. His ability to bridge complex backend GenAI logic with beautiful frontend UI is rare.'
        },
        {
          id: 't2',
          name: 'David Chen',
          role: 'Engineering Lead',
          company: 'Industry-Pilot',
          text: 'Leading a cross-functional team, Tamil delivered our Ed-Tech platform ahead of schedule. The Flex UI component registry he built completely transformed how fast our team can ship features.'
        },
        {
          id: 't3',
          name: 'Priya Sharma',
          role: 'CEO',
          company: 'Wonder-AI',
          text: 'I was blown away by the real-time websocket integration in the map chatbot Tamil built. The latency is incredible, and the UX is world-class.'
        }
      ]);
    }, 200);
  });
};

export interface Insight {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
}

export const getInsights = async (): Promise<Insight[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'i1',
          title: 'Architecting Production RAG Pipelines with LangChain',
          category: 'GenAI',
          date: 'May 12, 2026',
          readTime: '8 min read'
        },
        {
          id: 'i2',
          title: 'Optimizing Next.js App Router for Core Web Vitals',
          category: 'Frontend',
          date: 'April 28, 2026',
          readTime: '6 min read'
        },
        {
          id: 'i3',
          title: 'Real-time WebSockets with FastAPI: A Deep Dive',
          category: 'Backend',
          date: 'March 15, 2026',
          readTime: '10 min read'
        },
        {
          id: 'i4',
          title: 'Building a Shadcn-inspired Component Registry',
          category: 'Architecture',
          date: 'February 04, 2026',
          readTime: '7 min read'
        }
      ]);
    }, 200);
  });
};
