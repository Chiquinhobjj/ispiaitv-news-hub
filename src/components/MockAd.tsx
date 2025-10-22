import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { Cloud, Brain, Cpu, GraduationCap, Shield } from "lucide-react";

type MockAdSize = "leaderboard" | "rectangle" | "mobile";
type MockAdVariant = 1 | 2 | 3 | 4 | 5;

interface MockAdProps {
  size: MockAdSize;
  variant?: MockAdVariant;
  randomize?: boolean;
  className?: string;
}

const mockAdContent = {
  1: {
    icon: Cloud,
    title: "AWS Cloud",
    description: "Escale sua IA com 99.99% de uptime",
    cta: "Teste Grátis",
    gradient: "from-orange-500 via-pink-500 to-rose-500",
  },
  2: {
    icon: Brain,
    title: "ChatGPT Enterprise",
    description: "IA generativa para sua empresa",
    cta: "Saiba Mais",
    gradient: "from-blue-600 via-purple-600 to-violet-600",
  },
  3: {
    icon: Cpu,
    title: "NVIDIA RTX 5090",
    description: "Potência máxima para Machine Learning",
    cta: "Compre Agora",
    gradient: "from-green-600 via-emerald-600 to-teal-600",
  },
  4: {
    icon: GraduationCap,
    title: "Coursera",
    description: "Deep Learning com 50% OFF",
    cta: "Inscreva-se",
    gradient: "from-indigo-600 via-blue-500 to-cyan-500",
  },
  5: {
    icon: Shield,
    title: "CrowdStrike",
    description: "Proteja sua infraestrutura de IA",
    cta: "Teste 14 Dias",
    gradient: "from-red-600 via-orange-500 to-amber-500",
  },
};

export const MockAd = ({ size, variant, randomize = false, className = "" }: MockAdProps) => {
  const selectedVariant = useMemo(() => {
    if (randomize) {
      return (Math.floor(Math.random() * 5) + 1) as MockAdVariant;
    }
    return variant || 1;
  }, [variant, randomize]);

  const content = mockAdContent[selectedVariant];
  const Icon = content.icon;

  if (size === "leaderboard") {
    return (
      <div className={`relative rounded-lg overflow-hidden ${className}`}>
        <div className={`bg-gradient-to-r ${content.gradient} p-6 md:p-8`}>
          <Badge variant="secondary" className="absolute top-3 left-3 bg-black/60 text-white border-0 text-xs">
            Anúncio
          </Badge>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center justify-center w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1">
                  {content.title}
                </h3>
                <p className="text-sm md:text-base text-white/90">{content.description}</p>
              </div>
            </div>
            <Button 
              variant="secondary" 
              size="lg"
              className="shrink-0 bg-white text-gray-900 hover:bg-white/90 font-semibold"
            >
              {content.cta}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (size === "rectangle") {
    return (
      <div className={`relative rounded-lg overflow-hidden ${className}`}>
        <div className={`bg-gradient-to-br ${content.gradient} h-[250px] flex flex-col justify-between p-4`}>
          <Badge variant="secondary" className="self-start bg-black/60 text-white border-0 text-xs">
            Anúncio
          </Badge>
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <div className="flex items-center justify-center w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm">
              <Icon className="w-10 h-10 text-white" />
            </div>
            <div className="text-center">
              <h4 className="text-lg font-bold text-white mb-1">{content.title}</h4>
              <p className="text-sm text-white/90">{content.description}</p>
            </div>
          </div>
          <Button 
            size="sm" 
            className="w-full bg-white text-gray-900 hover:bg-white/90 font-semibold"
          >
            {content.cta}
          </Button>
        </div>
      </div>
    );
  }

  // Mobile sticky
  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      <div className={`bg-gradient-to-r ${content.gradient} h-[50px] flex items-center justify-between px-4 gap-3`}>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Icon className="w-5 h-5 text-white shrink-0" />
          <span className="text-white text-sm font-semibold truncate">{content.title}</span>
        </div>
        <Button 
          size="sm" 
          className="h-8 bg-white text-gray-900 hover:bg-white/90 font-semibold shrink-0 text-xs px-3"
        >
          {content.cta}
        </Button>
      </div>
    </div>
  );
};
