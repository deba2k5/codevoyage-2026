export interface TriviaItem {
  title: string;
  detail: string;
}

export interface Character {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  themeColor: string;
  secondaryColor: string;
  accentColor: string;
  gradient: string;
  imageAlt: string;
  image?: string;
  domainSpecialty: string;
  hackathonConnection: string;
  trivia: TriviaItem[];
}

export const characters: Character[] = [
  {
    id: "spider-man",
    name: "SPIDER-MAN",
    subtitle: "PETER PARKER",
    description: "He is a crime-fighting hero in the Marvel universe. Peter Parker gained his powers by being bitten by a radioactive spider and follows the motto 'With great power comes great responsibility.'",
    themeColor: "#C62828", // Spider Red
    secondaryColor: "#FFFFFF", // White
    accentColor: "#0A1F44", // Dark Navy
    gradient: "linear-gradient(135deg, #C62828 0%, #EF5350 100%)",
    imageAlt: "Spider-Man hero pose",
    image: "/heroes/spiderman.jpg",
    domainSpecialty: "Web & App Development // AR & VR Systems",
    hackathonConnection: "Just as Peter Parker formulated synthetic web-fluid and engineered mechanical shooters on a high school student's budget overnight, Spider-Man embodies our Web & App and AR/VR tracks. He represents agile, user-centric prototyping during our intense 8-hour hackathon—building lightweight, lightning-fast solutions with zero bloat under extreme pressure.",
    trivia: [
      { title: "Synthetic Web-Fluid", detail: "Formulated his own tensile polymer adhesive and precision mechanical web-shooters in a high school chemistry lab." },
      { title: "Spidey-Sense Neural Alert", detail: "Possesses a precognitive sixth sense that reacts to incoming threats faster than human neural reflexes, acting as an automated real-time intrusion alarm." },
      { title: "Electrostatic Scaling", detail: "Utilizes inter-atomic Van der Waals electrostatic forces between his body and surfaces to scale vertical architecture effortlessly." }
    ]
  },
  {
    id: "iron-man",
    name: "IRON MAN",
    subtitle: "TONY STARK",
    description: "Genius. Billionaire. Playboy. Philanthropist. Tony Stark's confidence is only matched by his high-flying abilities as the hero called Iron Man.",
    themeColor: "#8B0000", // Metallic Red
    secondaryColor: "#D4AF37", // Gold
    accentColor: "#2C2C2C", // Gunmetal
    gradient: "linear-gradient(135deg, #8B0000 0%, #D4AF37 100%)",
    imageAlt: "Iron Man in armor suit",
    image: "/heroes/ironman.jpg",
    domainSpecialty: "AI & Machine Learning // IoT & Hardware",
    hackathonConnection: "Tony Stark is the patron saint of AI/ML and IoT hardware integration. Building his first Arc Reactor in a cave from scrapped parts represents the ultimate spirit of Code Voyage: transforming on-spot problem statements into functional, high-tech prototypes using state-of-the-art APIs, compute resources, and expert mentoring.",
    trivia: [
      { title: "The Cave Prototype", detail: "Engineered the first miniature Arc Reactor and powered Mark I exoskeleton in a cave under hostile conditions, proving unmatched rapid prototyping." },
      { title: "J.A.R.V.I.S. Architecture", detail: "Pioneered world-leading natural language processing and neural interface AI assistants years before mainstream adoption." },
      { title: "Vibranium Synthesis", detail: "Successfully synthesized a new clean energy element in his home laboratory by constructing a localized particle accelerator." }
    ]
  },
  {
    id: "captain-america",
    name: "CAPTAIN AMERICA",
    subtitle: "STEVE ROGERS",
    description: "From the dark days of world war to the explosive challenges of today, Super-Soldier Captain America stands ready as a shining sentinel of liberty to shield the oppressed and fight for freedom everywhere.",
    themeColor: "#1E3A8A", // Royal Blue
    secondaryColor: "#FFFFFF", // White
    accentColor: "#C62828", // Crimson Red
    gradient: "linear-gradient(135deg, #1E3A8A 0%, #FFFFFF 100%)",
    imageAlt: "Captain America with shield",
    image: "/heroes/captainamerica.jpg",
    domainSpecialty: "Cybersecurity Defense // Team Scrum Lead",
    hackathonConnection: "In a hackathon squad of 2 to 4 operatives, Captain America represents the Cybersecurity track and the critical role of agile leadership. He shields systems from vulnerabilities and keeps the squad coordinated through the 8-hour hackathon to claim top bounties and internship opportunities.",
    trivia: [
      { title: "Project Rebirth Enhancement", detail: "Enhanced to the absolute pinnacle of human physical and mental perfection, granting him eidetic memory and tactical processing speeds." },
      { title: "Vibranium Kinetic Shield", detail: "Wields a unique concave disk composed of a Proto-Adamantium and Vibranium alloy that absorbs 100% of kinetic impact with zero recoil." },
      { title: "Multidimensional Commander", detail: "Has led diverse hero rosters across galactic and multiversal crises, embodying the ultimate scrum master and team strategist." }
    ]
  },
  {
    id: "thor",
    name: "THOR",
    subtitle: "THOR ODINSON",
    description: "The God of Thunder, wielding the enchanted hammer Mjolnir and controlling lightning itself to protect the Nine Realms and Asgard.",
    themeColor: "#3B82F6", // Electric Blue
    secondaryColor: "#C0C0C0", // Silver
    accentColor: "#111827", // Black
    gradient: "linear-gradient(135deg, #2563EB 0%, #93C5FD 100%)",
    imageAlt: "Thor God of Thunder",
    image: "/heroes/thor.jpg",
    domainSpecialty: "Cloud Infrastructure // Sustainable Tech",
    hackathonConnection: "Thor channels raw atmospheric power into unstoppable energy, representing our Sustainable Tech and Open Innovation tracks. In Code Voyage, he symbolizes high-throughput cloud computing and resilient backend infrastructure that can sustain massive traffic spikes and impress expert judges during on-spot evaluations.",
    trivia: [
      { title: "Uru Biometric Enchantment", detail: "Wields Mjolnir, an enchanted Uru-metal hammer forged in the heart of a dying star and secured by a strict biometric worthiness protocol." },
      { title: "Bifrost Wormhole Navigation", detail: "Commands the Bifrost bridge, enabling instantaneous Einstein-Rosen bridge dimensional teleportation across the Nine Realms." },
      { title: "Atmospheric Power Grid", detail: "Generates and manipulates electrical thunderstorms capable of generating gigawatts of clean power on demand." }
    ]
  },
  {
    id: "hulk",
    name: "HULK",
    subtitle: "BRUCE BANNER",
    description: "Caught in a gamma bomb explosion while trying to save the life of a teenager, Dr. Bruce Banner was transformed into the incredibly powerful creature called the Hulk.",
    themeColor: "#2E7D32", // Hulk Green
    secondaryColor: "#6A1B9A", // Purple
    accentColor: "#2D2D2D", // Dark Gray
    gradient: "linear-gradient(135deg, #2E7D32 0%, #6A1B9A 100%)",
    imageAlt: "Incredible Hulk smashing",
    image: "/heroes/hulk.jpg",
    domainSpecialty: "Big Data Analytics // Heavy Backend Architecture",
    hackathonConnection: "When brute computational force is required to crunch massive datasets or smash through algorithmic bottlenecks, Hulk represents Heavy Backend Architecture and AI Model Training. Banner's 7-PhD intellect combined with Hulk's unstoppable execution is the exact formula needed to conquer our 8-hour hackathon and win the $5,000 top prize.",
    trivia: [
      { title: "Gamma Radiation Pioneer", detail: "Dr. Bruce Banner is the world's foremost authority on nuclear physics, gamma radiation transformation, and bio-informatics." },
      { title: "Infinite Auto-Scaling", detail: "Hulk's physical strength and durability scale exponentially with adrenaline and stress, functioning like an infinitely auto-scaling compute engine." },
      { title: "Dual-Consciousness Sync", detail: "Operates a complex dual-identity cognitive architecture, balancing Banner's deep analytical genius with Hulk's raw processing throughput." }
    ]
  }
];
