export function Footer() {
  const footerLinks = [
    { label: 'Ajuda', href: '#' },
    { label: 'Termos de Uso', href: '#' },
    { label: 'Política de Privacidade', href: '#' },
    { label: 'Jogo Responsável', href: '#' },
    { label: 'Suporte Técnico', href: '#' },
  ];

  return (
    <footer className="hidden lg:block bg-card border-t border-border mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-neon">RaspaGreen</span>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 RaspaGreen. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Jogue com responsabilidade. Jogos para pessoas maiores de 18 anos.
          </p>
        </div>
      </div>
    </footer>
  );
}