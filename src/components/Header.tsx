import { Link } from "react-router-dom";
import { Search, Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import logoPadrao from "@/assets/logo-padrao.webp";
import logoPadraoFallback from "@/assets/logo-padrao.png";
import logoBranco from "@/assets/logo-branco.webp";
import logoBrancoFallback from "@/assets/logo-branco.png";
import iconOlho from "@/assets/icon-olho.png";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" aria-label="IspiAI - Home">
            {/* Desktop: Logo completo */}
            <picture className="hidden md:block">
              <source srcSet={darkMode ? logoBranco : logoPadrao} type="image/webp" />
              <img 
                src={darkMode ? logoBrancoFallback : logoPadraoFallback} 
                alt="IspiAI - Jornalismo Investigativo em IA e Tecnologia" 
                className="h-8 w-auto"
              />
            </picture>
            
            {/* Mobile: Apenas ícone */}
            <img 
              src={iconOlho} 
              alt="IspiAI" 
              className="h-10 w-10 md:hidden"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium transition-smooth hover:text-primary">
              Home
            </Link>
            <Link to="/busca" className="text-sm font-medium transition-smooth hover:text-primary">
              Busca
            </Link>
            <Link to="/campanhas" className="text-sm font-medium transition-smooth hover:text-primary">
              Campanhas
            </Link>
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Buscar..." 
                className="pl-9 w-64"
              />
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
