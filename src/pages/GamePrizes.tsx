import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap, Play } from "lucide-react";

interface GamePrizesProps {
  gameId: string;
  gameTitle: string;
  gamePrice: number;
  onBack: () => void;
  onPlay: () => void;
}

interface ScratchCardProps {
  symbols: string[];
  onReveal: (revealed: boolean[]) => void;
}

function ScratchCard({ symbols, onReveal }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [revealed, setRevealed] = useState<boolean[]>(new Array(9).fill(false));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Desenha o fundo com os símbolos
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenha os símbolos
    ctx.font = '32px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    symbols.forEach((symbol, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      const x = col * 100 + 50;
      const y = row * 100 + 50;
      
      if (revealed[index]) {
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(col * 100 + 5, row * 100 + 5, 90, 90);
        ctx.fillStyle = '#000';
        ctx.fillText(symbol, x, y);
      } else {
        // Camada de raspagem
        ctx.fillStyle = '#6b7280';
        ctx.fillRect(col * 100 + 5, row * 100 + 5, 90, 90);
        ctx.fillStyle = '#9ca3af';
        ctx.font = '12px Arial';
        ctx.fillText('RASPE', x, y);
      }
    });
  }, [symbols, revealed]);

  const handleScratch = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const col = Math.floor(x / 100);
    const row = Math.floor(y / 100);
    const index = row * 3 + col;

    if (index >= 0 && index < 9 && !revealed[index]) {
      const newRevealed = [...revealed];
      newRevealed[index] = true;
      setRevealed(newRevealed);
      onReveal(newRevealed);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h3 className="text-lg font-bold text-white">Raspe para revelar os símbolos!</h3>
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="border border-gray-600 rounded cursor-pointer"
        onClick={handleScratch}
        onMouseMove={(e) => isScratching && handleScratch(e)}
        onMouseDown={() => setIsScratching(true)}
        onMouseUp={() => setIsScratching(false)}
        onMouseLeave={() => setIsScratching(false)}
      />
      <p className="text-sm text-gray-300">Clique nos quadrados para raspar</p>
    </div>
  );
}

export function GamePrizes({ gameId, gameTitle, gamePrice, onBack, onPlay }: GamePrizesProps) {
  const [canPurchase, setCanPurchase] = useState(true);
  const [showScratchCard, setShowScratchCard] = useState(false);
  const [gameSymbols] = useState(['💎', '🍀', '💰', '🎁', '⭐', '💎', '🔥', '🍀', '💰']);

  const handleBuyGame = () => {
    setCanPurchase(false);
    setShowScratchCard(true);
  };

  const handleReveal = (revealed: boolean[]) => {
    // Verifica se existem 3 símbolos iguais revelados
    const revealedSymbols = gameSymbols.filter((_, index) => revealed[index]);
    const symbolCounts = revealedSymbols.reduce((acc, symbol) => {
      acc[symbol] = (acc[symbol] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const hasWon = Object.values(symbolCounts).some(count => count >= 3);
    if (hasWon && revealed.filter(Boolean).length >= 3) {
      setTimeout(() => {
        alert('Parabéns! Você ganhou!');
      }, 500);
    }
  };

  const prizes = [
    { name: "1000 Reais", value: "R$ 1.000,00", image: "" },
    { name: "700 Reais", value: "R$ 700,00", image: "" },
    { name: "500 Reais", value: "R$ 500,00", image: "" },
    { name: "200 Reais", value: "R$ 200,00", image: "" },
    { name: "Smartwatch D20...", value: "R$ 150,00", image: "" },
    { name: "100 Reais", value: "R$ 100,00", image: "" },
    { name: "PowerBank", value: "R$ 60,00", image: "" },
    { name: "50 Reais", value: "R$ 50,00", image: "" },
    { name: "20 Reais", value: "R$ 20,00", image: "" },
    { name: "15 Reais", value: "R$ 15,00", image: "" },
    { name: "10 Reais", value: "R$ 10,00", image: "" },
    { name: "5 Reais", value: "R$ 5,00", image: "" },
    { name: "4 Reais", value: "R$ 4,00", image: "" },
    { name: "3 Reais", value: "R$ 3,00", image: "" },
    { name: "2 Reais", value: "R$ 2,00", image: "" },
    { name: "1 Real", value: "R$ 1,00", image: "" },
    { name: "0,50 Centavos", value: "R$ 0,50", image: "" },
  ];

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
        {/* Layout de duas colunas igual à imagem */}
        <div className="flex space-x-6">
          {/* Coluna esquerda - Compra */}
          <div className="w-80 bg-gray-800/50 rounded-lg p-6">
            <div className="flex flex-col items-center space-y-4">
              {/* Círculo branco com ícone */}
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <span className="text-4xl">🎲</span>
              </div>
              
              {/* Texto e botão */}
              <div className="text-center space-y-4">
                <p className="text-white font-medium">Comprar por R$ {gamePrice.toFixed(2).replace('.', ',')}</p>
                
                <Button 
                  onClick={handleBuyGame}
                  disabled={!canPurchase}
                  className={`w-full font-bold px-6 py-2 rounded ${
                    canPurchase 
                      ? 'bg-green-600 hover:bg-green-700 text-black' 
                      : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  {canPurchase ? `Comprar R$ ${gamePrice.toFixed(2).replace('.', ',')}` : 'Comprado'}
                </Button>
              </div>
            </div>
          </div>

          {/* Coluna direita - Informações do jogo */}
          <div className="flex-1 bg-gray-800 rounded-lg p-6 border border-gray-700">
            {/* Header do jogo */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
                <span className="text-lg">🎯</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Centavo da Sorte</h2>
            </div>

            {/* Instruções de teclado */}
            <div className="space-y-2 text-sm text-gray-300 mb-6">
              <p>Pressione <span className="bg-gray-700 px-2 py-1 rounded text-green-400">ctrl</span> + <span className="bg-gray-700 px-2 py-1 rounded text-green-400">s</span> para comprar.</p>
              <p>Pressione <span className="bg-gray-700 px-2 py-1 rounded text-green-400">ctrl</span> + <span className="bg-gray-700 px-2 py-1 rounded text-green-400">s</span> para revelar.</p>
              <p>Pressione <span className="bg-gray-700 px-2 py-1 rounded text-green-400">ctrl</span> + <span className="bg-gray-700 px-2 py-1 rounded text-green-400">s</span> para revelar rápido.</p>
            </div>

            {/* Texto principal com ícone */}
            <div className="flex items-center space-x-3 mb-6">
              <Zap className="w-5 h-5 text-green-400" />
              <span className="text-lg font-semibold text-green-400">
                Ache 3 imagens iguais e conquiste seu prêmio!
              </span>
            </div>

            {/* Texto explicativo */}
            <div className="text-sm text-gray-400 space-y-2 mb-6">
              <p>O valor correspondente será creditado automaticamente na sua conta.</p>
              <p>Se preferir receber o produto físico, basta entrar em contato com o nosso suporte.</p>
            </div>

            {/* Botões inferiores */}
            <div className="flex space-x-4">
              <Button 
                onClick={handleBuyGame}
                disabled={!canPurchase}
                className={`font-bold px-6 py-2 rounded ${
                  canPurchase 
                    ? 'bg-green-600 hover:bg-green-700 text-black' 
                    : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                }`}
              >
                {canPurchase ? `Comprar R$ ${gamePrice.toFixed(2).replace('.', ',')}` : 'Comprado'}
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
        </div>

        {/* Interface da Raspadinha */}
        {showScratchCard ? (
          <div className="mt-8 flex justify-center">
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <ScratchCard symbols={gameSymbols} onReveal={handleReveal} />
              <div className="flex justify-center mt-6">
                <Button 
                  onClick={() => setShowScratchCard(false)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Voltar
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Prêmios da Raspadinha:</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {prizes.map((prize, index) => (
                <div 
                  key={index}
                  className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-green-400 transition-all"
                >
                  {/* Placeholder para imagem */}
                  <div className="w-full h-20 bg-gray-700 rounded mb-2 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">IMG</span>
                  </div>
                  
                  {/* Nome do prêmio */}
                  <h3 className="text-white text-sm font-medium text-center mb-1">
                    {prize.name}
                  </h3>
                  
                  {/* Valor do prêmio */}
                  <div className="bg-green-600 text-black text-xs font-bold text-center py-1 px-2 rounded">
                    {prize.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
    </div>
  );
}