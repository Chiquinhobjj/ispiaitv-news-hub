import { Cpu, Heart, TrendingUp, BookOpen, Leaf, MapPin, LucideIcon } from 'lucide-react';

export interface CategoryConfig {
  color: string;
  textColor: string;
  icon: LucideIcon;
}

export const categoryConfig: Record<string, CategoryConfig> = {
  tecnologia: {
    color: 'bg-blue-500',
    textColor: 'text-white',
    icon: Cpu,
  },
  saude: {
    color: 'bg-green-500',
    textColor: 'text-white',
    icon: Heart,
  },
  negocios: {
    color: 'bg-orange-500',
    textColor: 'text-white',
    icon: TrendingUp,
  },
  educacao: {
    color: 'bg-purple-500',
    textColor: 'text-white',
    icon: BookOpen,
  },
  'meio-ambiente': {
    color: 'bg-teal-500',
    textColor: 'text-white',
    icon: Leaf,
  },
  local: {
    color: 'bg-amber-500',
    textColor: 'text-white',
    icon: MapPin,
  },
};

export const getCategoryConfig = (category: string): CategoryConfig => {
  return categoryConfig[category.toLowerCase()] || {
    color: 'bg-gray-500',
    textColor: 'text-white',
    icon: BookOpen,
  };
};
