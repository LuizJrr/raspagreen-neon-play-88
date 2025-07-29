import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GameCard } from "@/components/GameCard";

interface LandingPageProps {
  onShowLogin: () => void;
  onShowRegister: () => void;
}

export function LandingPage({ onShowLogin, onShowRegister }: LandingPageProps) {
  // Dados dos jogos em destaque para a landing page
  const featuredGames = [
    {
      id: "1",
      name: "Centavo da Sorte",
      image: "/src/assets/game1.jpg",
      price: 0.50,
      maxPrize: 1000,
      category: "PIX NA HORA!"
    },
    {
      id: "2", 
      name: "Sorte Instantânea",
      image: "/src/assets/game2.jpg",
      price: 1.00,
      maxPrize: 2500,
      category: "ACHE 3 IGUAIS E GANHE NA HORA!"
    },
    {
      id: "3",
      name: "Raspadinha Suprema", 
      image: "/src/assets/game3.jpg",
      price: 2.50,
      maxPrize: 5000,
      category: "ACHE 3 IGUAIS E GANHE NA HORA!"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-neon rounded-lg flex items-center justify-center">
                <span className="text-background font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold text-neon">RASPA GREEN</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-foreground/80 hover:text-neon transition-colors">
                🏠 Início
              </a>
              <a href="#" className="text-foreground/80 hover:text-neon transition-colors">
                🎯 Raspadinhas
              </a>
              <a href="#" className="text-foreground/80 hover:text-neon transition-colors">
                💰 Indique e Ganhe
              </a>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={onShowLogin}
                className="border-primary/30 text-foreground hover:bg-primary/10"
              >
                Entrar
              </Button>
              <Button 
                onClick={onShowRegister}
                className="btn-neon"
              >
                Registrar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/20 to-neon/20 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left mb-8 lg:mb-0">
              <Badge className="mb-4 bg-neon/20 text-neon border-neon/30">
                ✨ Novo no RaspaGreen ✨
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-foreground">ACHE 3 IGUAIS E</span>
                <br />
                <span className="text-neon glow">GANHE NA HORA!</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
                Comece com apenas R$ 0,50 e concorra a prêmios de até R$ 100.000! 
                Pagamento instantâneo via PIX.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  onClick={onShowRegister}
                  className="btn-neon text-lg px-8 py-4"
                >
                  🎮 Começar a Jogar
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={onShowLogin}
                  className="border-primary/30 text-foreground hover:bg-primary/10 text-lg px-8 py-4"
                >
                  Já tenho conta
                </Button>
              </div>
            </div>

            {/* Hero Image/Animation */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-neon/30 to-primary/30 rounded-full flex items-center justify-center animate-pulse">
                  <div className="text-6xl md:text-7xl">🎯</div>
                </div>
                <div className="absolute -top-4 -right-4 bg-neon text-background px-3 py-1 rounded-full text-sm font-bold animate-bounce">
                  PIX INSTANTÂNEO!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              🔥 Destaques
            </h2>
            <p className="text-muted-foreground text-lg">
              Os jogos mais populares da plataforma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGames.map((game) => (
              <Card key={game.id} className="bg-card border-border hover:border-primary/30 transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={game.image} 
                    alt={game.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-neon/90 text-background text-xs">
                    {game.category}
                  </Badge>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{game.name}</h3>
                  <p className="text-muted-foreground mb-4">
                    Prêmios de até R$ {game.maxPrize.toLocaleString('pt-BR')}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-neon">
                      R$ {game.price.toFixed(2).replace('.', ',')}
                    </div>
                    <Button 
                      onClick={onShowRegister}
                      className="btn-neon"
                    >
                      Jogar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-neon/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pronto para ganhar?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de jogadores que já estão ganhando dinheiro real no RaspaGreen. 
            Cadastre-se agora e receba seu primeiro jogo grátis!
          </p>
          <Button 
            size="lg" 
            onClick={onShowRegister}
            className="btn-neon text-xl px-12 py-6"
          >
            🚀 Criar Conta Grátis
          </Button>
        </div>
      </section>
    </div>
  );
}