import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Star, X } from "lucide-react";

interface GamePrizesProps {
  gameId: string;
  gameTitle: string;
  gamePrice: number;
  onBack: () => void;
  onPlay: () => void;
}

// Dados dos prêmios baseados no valor do jogo
const getPrizesForGame = (price: number) => {
  if (price === 0.5) {
    return [
      { value: 1000, quantity: 5, odds: "1 em 10.000" },
      { value: 500, quantity: 10, odds: "1 em 5.000" },
      { value: 200, quantity: 25, odds: "1 em 2.000" },
      { value: 100, quantity: 50, odds: "1 em 1.000" },
      { value: 50, quantity: 100, odds: "1 em 500" },
      { value: 25, quantity: 200, odds: "1 em 250" },
      { value: 10, quantity: 500, odds: "1 em 100" },
      { value: 5, quantity: 1000, odds: "1 em 50" },
      { value: 2, quantity: 2000, odds: "1 em 25" },
      { value: 1, quantity: 5000, odds: "1 em 10" }
    ];
  }
  
  const baseMultipliers = [2000, 1000, 400, 200, 100, 50, 20, 10, 4, 2];
  return baseMultipliers.map((multiplier, index) => ({
    value: price * multiplier,
    quantity: Math.floor(50 / (index + 1)) + 5,
    odds: `1 em ${multiplier * 5}`
  }));
};

export function GamePrizes({ gameId, gameTitle, gamePrice, onBack, onPlay }: GamePrizesProps) {
  const prizes = getPrizesForGame(gamePrice);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="flex items-center justify-between p-4">
          <Button 
            variant="ghost" 
            onClick={onBack} 
            className="text-white hover:bg-gray-700 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Saldo</span>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 text-sm rounded"
            >
              + 1,9%
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* PIX Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-lg p-4 text-center">
          <h1 className="text-2xl font-bold text-white">PIX NA HORA!</h1>
        </div>

        {/* Game Info Card */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 bg-yellow-500 rounded"></div>
            <h2 className="text-lg font-bold">{gameTitle}</h2>
          </div>
          
          <div className="space-y-1 text-sm text-gray-300">
            <p>Probabilidade: R$ 0,01 a cada R$ {gamePrice.toFixed(2).replace('.', ',')}</p>
            <p>Faça três símbolos consecutivos dos mesmos símbolos para ganhar prêmios em dinheiro.</p>
            <p>Os cartões virtuais e prêmios fiscais estão sendo concedidos com base na sorte.</p>
          </div>
        </div>

        {/* Prizes Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Prêmios de Raspadinhas</h3>
          
          <div className="grid grid-cols-4 gap-3">
            {prizes.map((prize, index) => (
              <div 
                key={index}
                className="bg-gray-800 border border-gray-600 rounded-lg p-3 text-center"
              >
                <div className="w-full h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded mb-2 flex items-center justify-center">
                  <span className="text-black font-bold text-xs">R$</span>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-xs">R$ {prize.value.toLocaleString('pt-BR')}</p>
                  <p className="text-xs text-gray-400">{prize.quantity} cartões</p>
                  <p className="text-xs text-gray-400">{prize.odds}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lula Ocasional Section */}
        <div>
          <h4 className="text-lg font-bold mb-3">Lula Ocasional</h4>
          <div className="bg-gray-800 border border-gray-600 rounded-lg p-3">
            <div className="grid grid-cols-4 gap-3">
              <div className="text-center">
                <div className="w-full h-12 bg-gradient-to-br from-amber-400 to-orange-600 rounded mb-2 flex items-center justify-center">
                  <div className="w-6 h-6 bg-black/20 rounded-full"></div>
                </div>
                <p className="text-xs font-bold">R$ 1,00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Play Button */}
      <div className="fixed bottom-4 left-4 right-4">
        <Button 
          onClick={onPlay}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 text-lg rounded-lg"
        >
          JOGAR R$ {gamePrice.toFixed(2).replace('.', ',')}
        </Button>
      </div>
    </div>
  );
}