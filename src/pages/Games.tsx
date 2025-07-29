import { useState } from "react";
import { GameCard, GameCardHorizontal } from "@/components/GameCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Grid3X3, List, Filter } from "lucide-react";
import game1 from "@/assets/game1.jpg";
import game2 from "@/assets/game2.jpg";
import game3 from "@/assets/game3.jpg";
import game4 from "@/assets/game4.jpg";
import game5 from "@/assets/game5.jpg";
import game6 from "@/assets/game6.jpg";
import game7 from "@/assets/game7.jpg";

interface GamesProps {
  onPlayGame: (gameId: string) => void;
}

const gamesData = [
  {
    id: '1',
    title: 'PIX NA HORA!',
    image: game1,
    price: 0.50,
    maxPrize: 1000000,
    category: 'popular'
  },
  {
    id: '2', 
    title: 'Sorte Instantânea',
    image: game2,
    price: 1.00,
    maxPrize: 2500000,
    category: 'popular'
  },
  {
    id: '3',
    title: 'Raspadinha Suprema',
    image: game3, 
    price: 2.50,
    maxPrize: 5000000,
    category: 'premium'
  },
  {
    id: '4',
    title: 'Raspa Relâmpago',
    image: game4,
    price: 5.00,
    maxPrize: 10000000,
    category: 'premium'
  },
  {
    id: '5',
    title: 'Raspadinha Mágica',
    image: game5,
    price: 20.00,
    maxPrize: 30000000,
    category: 'premium'
  },
  {
    id: '6',
    title: 'Raspa e Ganha',
    image: game6,
    price: 100.00,
    maxPrize: 50000000,
    category: 'vip'
  },
  {
    id: '7',
    title: 'Raspadinha Ômega',
    image: game7,
    price: 500.00,
    maxPrize: 175000000,
    category: 'vip'
  }
];

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'popular', label: 'Populares' },
  { id: 'premium', label: 'Premium' },
  { id: 'vip', label: 'VIP' },
];

export function Games({ onPlayGame }: GamesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredGames = gamesData.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Raspadinhas</h1>
          
          {/* View toggle */}
          <div className="hidden sm:flex items-center space-x-2 bg-muted/20 p-1 rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'btn-neon' : ''}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'btn-neon' : ''}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar raspadinhas..."
            className="input-dark pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category filters */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={`whitespace-nowrap ${
                selectedCategory === category.id 
                ? 'btn-neon' 
                : 'border-border hover:border-primary/50'
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Games grid/list */}
      <div className="space-y-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                id={game.id}
                title={game.title}
                image={game.image}
                price={game.price}
                maxPrize={game.maxPrize}
                onPlay={() => onPlayGame(game.id)}
                onViewPrizes={() => console.log('Ver prêmios:', game.id)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredGames.map((game) => (
              <GameCardHorizontal
                key={game.id}
                id={game.id}
                title={game.title}
                image={game.image}
                price={game.price}
                maxPrize={game.maxPrize}
                onPlay={() => onPlayGame(game.id)}
                onViewPrizes={() => console.log('Ver prêmios:', game.id)}
              />
            ))}
          </div>
        )}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhuma raspadinha encontrada</p>
          <p className="text-sm text-muted-foreground">Tente ajustar os filtros</p>
        </div>
      )}
    </div>
  );
}