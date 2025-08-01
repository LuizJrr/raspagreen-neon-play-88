import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Star } from "lucide-react";

interface GamePrizesProps {
  gameId: string;
  gameTitle: string;
  gamePrice: number;
  onBack: () => void;
  onPlay: () => void;
}

// Dados dos prêmios baseados no valor do jogo
const getPrizesForGame = (price: number) => {
  const baseMultipliers = [1000, 500, 200, 100, 50, 25, 10, 5, 2];
  
  return baseMultipliers.map((multiplier, index) => ({
    id: index + 1,
    value: price * multiplier,
    quantity: Math.floor(Math.random() * 50) + 10,
    odds: `1 em ${multiplier * 10}`
  }));
};

export function GamePrizes({ gameId, gameTitle, gamePrice, onBack, onPlay }: GamePrizesProps) {
  const prizes = getPrizesForGame(gamePrice);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </Button>
          
          <div className="text-center">
            <h1 className="font-bold text-lg">{gameTitle}</h1>
            <p className="text-sm text-muted-foreground">Prêmios disponíveis</p>
          </div>
          
          <div className="w-20" />
        </div>
      </div>

      {/* Banner PIX */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 m-4 rounded-lg">
        <div className="flex items-center justify-center space-x-2">
          <Trophy className="w-6 h-6" />
          <span className="font-bold text-lg">PIX NA HORA!</span>
        </div>
      </div>

      {/* Game Info */}
      <div className="bg-card border border-border rounded-lg m-4 p-4">
        <h2 className="font-bold text-lg mb-2 flex items-center space-x-2">
          <Star className="w-5 h-5 text-primary" />
          <span>{gameTitle}</span>
        </h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Probabilidade: R$ 0,01 a cada R$ {gamePrice.toFixed(2).replace('.', ',')}</p>
          <p>Faça três linhas consecutivas dos mesmos símbolos para ganhar prêmios em dinheiro.</p>
          <p>Os cartões virtuais e prêmios fiscais estão sendo concedidos com base na sorte.</p>
        </div>
      </div>

      {/* Prizes Grid */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-4">Prêmios de Raspadinhas</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {prizes.map((prize) => (
            <div 
              key={prize.id}
              className="bg-card border border-border rounded-lg p-3 text-center hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded mx-auto mb-2 flex items-center justify-center">
                <span className="text-black font-bold text-xs">R$</span>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-sm">R$ {prize.value.toLocaleString('pt-BR')}</p>
                <p className="text-xs text-muted-foreground">{prize.quantity} unidades</p>
                <p className="text-xs text-muted-foreground">{prize.odds}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instant Win Section */}
      <div className="p-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-bold text-lg mb-2">Lula Ocasional</h4>
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg p-2 text-center">
              <div className="w-8 h-8 bg-white/20 rounded-full mx-auto mb-1"></div>
              <p className="text-xs font-bold text-black">R$ 1,00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Play Button */}
      <div className="fixed bottom-20 left-4 right-4">
        <Button 
          onClick={onPlay}
          className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-4 text-lg"
        >
          Jogar por R$ {gamePrice.toFixed(2).replace('.', ',')}
        </Button>
      </div>
    </div>
  );
}