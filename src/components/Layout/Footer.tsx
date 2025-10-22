import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Mail, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/50 mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <img 
              src="/logo.png" 
              alt="IspiAI" 
              className="h-8 w-auto"
              loading="lazy"
            />
            <p className="text-sm text-muted-foreground">
              Jornalismo investigativo em inteligência artificial e tecnologia.
            </p>
            {/* Social Media */}
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Youtube className="h-4 w-4" />
                <span className="sr-only">YouTube</span>
              </Button>
            </div>
          </div>

          {/* Links - About */}
          <div>
            <h3 className="font-semibold mb-4">Sobre</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/sobre" className="text-muted-foreground hover:text-foreground transition-colors">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link to="/equipe" className="text-muted-foreground hover:text-foreground transition-colors">
                  Nossa Equipe
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/anuncie" className="text-muted-foreground hover:text-foreground transition-colors">
                  Anuncie Conosco
                </Link>
              </li>
            </ul>
          </div>

          {/* Links - Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacidade" className="text-muted-foreground hover:text-foreground transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/termos" className="text-muted-foreground hover:text-foreground transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <a href="/ads.txt" className="text-muted-foreground hover:text-foreground transition-colors">
                  Ads.txt
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Receba as últimas notícias toda semana
            </p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="seu@email.com" 
                className="h-9"
              />
              <Button type="submit" className="w-full" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Assinar
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} IspiAI. Todos os direitos reservados.</p>
          <p className="mt-2">
            Feito com ❤️ para um jornalismo mais transparente
          </p>
        </div>
      </div>
    </footer>
  );
};
