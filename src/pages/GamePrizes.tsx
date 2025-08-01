import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap, RotateCcw } from "lucide-react";
import { ScratchCard } from "@/components/ScratchCard";

interface GamePrizesProps {
  gameId: string;
  gameTitle: string;
  gamePrice: number;
  onBack: () => void;
  onPlay: () => void;
}

export function GamePrizes({ gameId, gameTitle, gamePrice, onBack, onPlay }: GamePrizesProps) {
  const [showScratchCard, setShowScratchCard] = useState(false);
  const [gameResult, setGameResult] = useState<any>(null);
  
  console.log("GamePrizes render - showScratchCard:", showScratchCard);
  const prizes = [
    { name: "1000 Reais", value: "R$ 1.000,00", image: "/lovable-uploads/3e406ba9-d423-44f9-9dd3-16e543628cda.png" },
    { name: "700 Reais", value: "R$ 700,00", image: "/lovable-uploads/3e406ba9-d423-44f9-9dd3-16e543628cda.png" },
    { name: "500 Reais", value: "R$ 500,00", image: "/lovable-uploads/3e406ba9-d423-44f9-9dd3-16e543628cda.png" },
    { name: "200 Reais", value: "R$ 200,00", image: "/lovable-uploads/3e406ba9-d423-44f9-9dd3-16e543628cda.png" },
    { name: "Smartwatch D20", value: "R$ 150,00", image: "/lovable-uploads/3e406ba9-d423-44f9-9dd3-16e543628cda.png" },
    { name: "100 Reais", value: "R$ 100,00", image: "/lovable-uploads/3e406ba9-d423-44f9-9dd3-16e543628cda.png" },
    { name: "PowerBank", value: "R$ 60,00", image: "/lovable-uploads/3e406ba9-d423-44f9-9dd3-16e543628cda.png" },
    { name: "50 Reais", value: "R$ 50,00", image: "/lovable-uploads/3e406ba9-d423-44f9-9dd3-16e543628cda.png" },
    { name: "20 Reais", value: "R$ 20,00", image: "/lovable-uploads/3e406ba9-d423-44f9-9dd3-16e543628cda.png" },
    { name: "15 Reais", value: "R$ 15,00", image: "/lovable-uploads/3e406ba9-d423-44f9-9dd3-16e543628cda.png" },
    { name: "10 Reais", value: "R$ 10,00", image: "/lovable-uploads/3e406ba9-d423-44f9-9dd3-16e543628cda.png" },
    { name: "5 Reais", value: "R$ 5,00", image: "/lovable-uploads/3e406ba9-d423-44f9-9dd3-16e543628cda.png" },
    { name: "4 Reais", value: "R$ 4,00", image: "/lovable-uploads/3e406ba9-d423-44f9-9dd3-16e543628cda.png" },
    { name: "3 Reais", value: "R$ 3,00", image: "/lovable-uploads/3e406ba9-d423-44f9-9dd3-16e543628cda.png" },
    { name: "2 Reais", value: "R$ 2,00", image: "/lovable-uploads/3e406ba9-d423-44f9-9dd3-16e543628cda.png" },
    { name: "1 Real", value: "R$ 1,00", image: "/lovable-uploads/3e406ba9-d423-44f9-9dd3-16e543628cda.png" },
    { name: "0,50 Centavos", value: "R$ 0,50", image: "/lovable-uploads/3e406ba9-d423-44f9-9dd3-16e543628cda.png" }
  ];

  const handleBuyGame = () => {
    console.log("Botão Comprar clicado!");
    setShowScratchCard(true);
    console.log("showScratchCard definido como true");
  };

  const handleScratchComplete = (prize: any) => {
    setGameResult(prize);
    setShowScratchCard(false);
    // Aqui você pode chamar onPlay() para processar o resultado
    setTimeout(() => {
      onPlay();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header com PIX Banner */}
      <div className="relative">
        <div className="bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <h1 className="text-4xl font-black text-yellow-300 drop-shadow-lg relative z-10">
            PIX NA HORA!
          </h1>
          <div className="absolute right-4 top-4 opacity-30">
            <div className="w-20 h-12 bg-green-100 rounded border-2 border-green-300"></div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Game Info Section */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎲</span>
            </div>
            <div>
              <h2 className="text-xl font-bold">Centavo da Sorte</h2>
              <p className="text-sm text-gray-400">Comprar por R$ 0,50</p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-300 mb-4">
            <p>Pressione <span className="bg-gray-700 px-1 rounded">ctrl</span> + <span className="bg-gray-700 px-1 rounded">s</span> para comprar.</p>
            <p>Pressione <span className="bg-gray-700 px-1 rounded">ctrl</span> + <span className="bg-gray-700 px-1 rounded">s</span> para revelar.</p>
            <p>Pressione <span className="bg-gray-700 px-1 rounded">ctrl</span> + <span className="bg-gray-700 px-1 rounded">s</span> para revelar rápido.</p>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <Zap className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-green-400">
              Ache 3 imagens iguais e conquiste seu prêmio!
            </span>
          </div>

          <div className="text-xs text-gray-400 space-y-1">
            <p>O valor correspondente será creditado automaticamente na sua conta.</p>
            <p>Se preferir receber o produto físico, basta entrar em contato com o nosso suporte.</p>
          </div>

          <div className="flex space-x-3 mt-4">
            <Button 
              onClick={handleBuyGame}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded"
            >
              Comprar R$ {gamePrice.toFixed(2).replace('.', ',')}
            </Button>
            
            <Button 
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 flex items-center space-x-2"
            >
              <Zap className="w-4 h-4" />
              <span>Rodada Automática</span>
            </Button>
          </div>
        </div>

        {/* Prizes Section */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Prêmios da Raspadinha:</h3>
          
          <div className="grid grid-cols-4 gap-3">
            {prizes.map((prize, index) => (
              <div 
                key={index}
                className="bg-gray-800 border border-gray-600 rounded-lg p-3 text-center hover:border-gray-500 transition-colors"
              >
                <div className="w-full h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded mb-2 flex items-center justify-center overflow-hidden">
                  {prize.name.includes("Smartwatch") ? (
                    <div className="w-8 h-8 bg-black rounded border border-gray-400"></div>
                  ) : prize.name.includes("PowerBank") ? (
                    <div className="w-10 h-6 bg-gray-300 rounded"></div>
                  ) : prize.name.includes("Centavos") ? (
                    <div className="w-8 h-8 bg-yellow-600 rounded-full border-2 border-yellow-400"></div>
                  ) : (
                    <div className="w-12 h-8 bg-green-200 border border-green-400 rounded flex items-center justify-center">
                      <span className="text-green-800 font-bold text-xs">R$</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  <p className="font-bold text-xs text-white">{prize.name}</p>
                  <p className="text-xs font-semibold text-green-400">{prize.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="fixed top-4 left-4">
        <Button 
          variant="ghost" 
          onClick={onBack} 
          className="text-white hover:bg-gray-800 p-2 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Scratch Card Modal */}
      {showScratchCard && (
        <ScratchCard
          onClose={() => setShowScratchCard(false)}
          onRevealComplete={handleScratchComplete}
          gamePrice={gamePrice}
        />
      )}
    </div>
  );
}