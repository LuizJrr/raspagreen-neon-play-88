import { useState } from "react";
import { Input } from "@/components/ui/input";
import { GameCard } from "@/components/GameCard";
import { BannerCarousel } from "@/components/BannerCarousel";
import { WinnersCarousel } from "@/components/WinnersCarousel";
import { Search, Trophy, Star } from "lucide-react";
import game1 from "@/assets/game1.jpg";
import game2 from "@/assets/game2.jpg";
import game3 from "@/assets/game3.jpg";
import game4 from "@/assets/game4.jpg";
import game5 from "@/assets/game5.jpg";
import game6 from "@/assets/game6.jpg";
import game7 from "@/assets/game7.jpg";

interface HomeProps {
  onPlayGame: (gameId: string) => void;
}

const gamesData = [
  {
    id: '1',
    title: 'Centavo da Sorte',
    subtitle: 'PIX NA HORA!',
    image: game1,
    price: 0.50,
    maxPrize: 1000000,
  },
  {
    id: '2', 
    title: 'Sorte Instantânea',
    subtitle: 'ACHE 3 IGUAIS E GANHE NA HORA',
    image: game2,
    price: 1.00,
    maxPrize: 2500000,
  },
  {
    id: '3',
    title: 'Raspadinha Suprema', 
    subtitle: 'ACHE 3 IGUAIS E GANHE NA HORA',
    image: game3,
    price: 2.50,
    maxPrize: 5000000,
  },
  {
    id: '4',
    title: 'Raspa Relâmpago',
    subtitle: 'ACHE 3 IGUAIS E GANHE NA HORA',
    image: game4,
    price: 5.00,
    maxPrize: 15000000,
  },
  {
    id: '5',
    title: 'Raspadinha Mágica',
    subtitle: 'ACHE 3 IGUAIS E GANHE NA HORA',
    image: game5,
    price: 50.00,
    maxPrize: 30000000,
  },
  {
    id: '6',
    title: 'Raspa e Ganha',
    subtitle: 'ACHE 3 IGUAIS E GANHE NA HORA',
    image: game6,
    price: 300.00,
    maxPrize: 60000000,
  }
];


export function Home({ onPlayGame }: HomeProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGames = gamesData.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-24">
      {/* Carrossel de Banners */}
      <BannerCarousel />

      {/* Carrossel de vencedores */}
      <WinnersCarousel />

      {/* Busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Pesquisar raspadinhas..."
          className="input-dark pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid de jogos */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Raspadinhas Disponíveis</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              title={game.title}
              subtitle={game.subtitle}
              image={game.image}
              price={game.price}
              maxPrize={game.maxPrize}
              onPlay={() => onPlayGame(game.id)}
              onViewPrizes={() => console.log('Ver prêmios:', game.id)}
            />
          ))}
        </div>
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhuma raspadinha encontrada</p>
        </div>
      )}
    </div>
  );
}