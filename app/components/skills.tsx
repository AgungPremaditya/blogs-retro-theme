import { 
  FaReact, 
  FaNodeJs, 
  FaPython,
  FaDatabase,
  FaAws,
  FaJava
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiTailwindcss, 
  SiNextdotjs,
  SiMongodb,
  SiGo,
  SiSpring,
  SiNestjs
} from 'react-icons/si';
import { 
  BsCodeSlash, 
  BsGlobe 
} from 'react-icons/bs';

const skills = [
  {
    name: "React",
    icon: FaReact,
    color: "#61DAFB"
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6"
  },
  {
    name: "Java",
    icon: FaJava,
    color: "#007396"
  },
  {
    name: "Spring Boot",
    icon: SiSpring,
    color: "#6DB33F"
  },
  {
    name: "Node.js",
    icon: FaNodeJs,
    color: "#339933"
  },
  {
    name: "NestJS",
    icon: SiNestjs,
    color: "#E0234E"
  },
  {
    name: "Python",
    icon: FaPython,
    color: "#3776AB"
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "#ffffff"
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "#47A248"
  },
  {
    name: "Golang",
    icon: SiGo,
    color: "#00ADD8"
  },
  {
    name: "AWS",
    icon: FaAws,
    color: "#FF9900"
  },
  {
    name: "TailwindCSS",
    icon: SiTailwindcss,
    color: "#38B2AC"
  },
  {
    name: "Backend",
    icon: FaDatabase,
    color: "#FF6B6B"
  },
  {
    name: "Frontend",
    icon: BsCodeSlash,
    color: "#FF9900"
  }
];

export default function Skills() {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:bg-white/10 transition-all h-fit">
      <h2 className="text-2xl font-semibold mb-4">Skills</h2>
      <div className="grid grid-cols-2 gap-3">
        {skills.map((skill) => {
          const IconComponent = skill.icon;
          return (
            <div 
              key={skill.name}
              className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
            >
              <IconComponent 
                size={28} 
                style={{ color: skill.color }}
                className="transition-transform hover:scale-110"
              />
              <span className="text-sm text-blue-100 text-center">{skill.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
} 