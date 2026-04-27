export interface Lawyer {
  id: number;
  name: string;
  specialization: string;
  location: string;
  city: string;
  state: string;
  profilePhoto: string;
  availability: "Available" | "Busy" | "Offline" | string;
  rating: number;
  reviewCount: number;
  description: string;
  badges: string[];
  experience: number;
  languages: string[];
  hourlyRate: number;
  phone: string;
  email: string;
  linkedinUrl?: string;
}

export const lawyersData: Lawyer[] = [
  {
    id: 1,
    name: "Adv. Ananya Sharma",
    specialization: "Corporate Law",
    location: "Bengaluru, Karnataka",
    city: "Bengaluru",
    state: "Karnataka",
    profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    availability: "Available",
    rating: 4.9,
    reviewCount: 128,
    description: "Experienced corporate lawyer helping startups, funding rounds, contracts, and compliance with clarity and confidence.",
    badges: ["Startup Law", "Compliance", "M&A"],
    experience: 12,
    languages: ["English", "Hindi", "Kannada"],
    hourlyRate: 8500,
    phone: "+91 98765 43210",
    email: "ananya.sharma@nyayaai.com",
    linkedinUrl: "https://www.linkedin.com/in/ananya-sharma-legal"
  },
  {
    id: 2,
    name: "Adv. Rahul Verma",
    specialization: "Family Law",
    location: "Mumbai, Maharashtra",
    city: "Mumbai",
    state: "Maharashtra",
    profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    availability: "Busy",
    rating: 4.7,
    reviewCount: 96,
    description: "Trusted family law attorney specializing in divorce, child custody, and domestic mediation with a compassionate approach.",
    badges: ["Divorce", "Custody", "Mediation"],
    experience: 9,
    languages: ["English", "Hindi", "Marathi"],
    hourlyRate: 7200,
    phone: "+91 91234 56789",
    email: "rahul.verma@nyayaai.com",
    linkedinUrl: "https://www.linkedin.com/in/rahul-verma-law"
  },
  {
    id: 3,
    name: "Adv. Priya Menon",
    specialization: "Intellectual Property",
    location: "Chennai, Tamil Nadu",
    city: "Chennai",
    state: "Tamil Nadu",
    profilePhoto: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    availability: "Available",
    rating: 4.8,
    reviewCount: 87,
    description: "IP specialist advising on patents, trademarks, copyrights, and technology licensing for innovators and creators.",
    badges: ["IP", "Patents", "Trademarks"],
    experience: 11,
    languages: ["English", "Tamil"],
    hourlyRate: 9800,
    phone: "+91 99876 54321",
    email: "priya.menon@nyayaai.com",
    linkedinUrl: "https://www.linkedin.com/in/priya-menon-ip"
  },
  {
    id: 4,
    name: "Adv. Vikram Singh",
    specialization: "Real Estate Law",
    location: "Delhi, Delhi",
    city: "Delhi",
    state: "Delhi",
    profilePhoto: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=80",
    availability: "Offline",
    rating: 4.5,
    reviewCount: 72,
    description: "Real estate lawyer with deep experience in property transactions, title due diligence, and lease negotiations.",
    badges: ["Property", "Title", "Transactions"],
    experience: 8,
    languages: ["English", "Hindi"],
    hourlyRate: 6500,
    phone: "+91 91111 22222",
    email: "vikram.singh@nyayaai.com",
    linkedinUrl: "https://www.linkedin.com/in/vikram-singh-legal"
  },
  {
    id: 5,
    name: "Adv. Sneha Nair",
    specialization: "Employment Law",
    location: "Kochi, Kerala",
    city: "Kochi",
    state: "Kerala",
    profilePhoto: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80",
    availability: "Available",
    rating: 4.6,
    reviewCount: 54,
    description: "Employment law attorney counseling on workplace disputes, contracts, compliance, and labor regulations.",
    badges: ["Workplace", "Compliance", "Contracts"],
    experience: 7,
    languages: ["English", "Hindi", "Malayalam"],
    hourlyRate: 7000,
    phone: "+91 93333 44444",
    email: "sneha.nair@nyayaai.com",
    linkedinUrl: "https://www.linkedin.com/in/sneha-nair-employment"
  }
];
