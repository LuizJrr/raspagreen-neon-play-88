import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap } from "lucide-react";

interface GamePrizesProps {
  gameId: string;
  gameTitle: string;
  gamePrice: number;
  onBack: () => void;
  onPlay: () => void;
}

export function GamePrizes({ gameId, gameTitle, gamePrice, onBack, onPlay }: GamePrizesProps) {
  const [canPurchase, setCanPurchase] = useState(true);
  const [canScratch, setCanScratch] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchedPercentage, setScratchedPercentage] = useState(0);
  const [prize, setPrize] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Gerar prêmio quando componente monta
  useEffect(() => {
    const gamePrizes = [
      { type: "money", value: 1000, image: "💰" },
      { type: "money", value: 500, image: "💵" },
      { type: "money", value: 200, image: "💸" },
      { type: "money", value: 100, image: "💳" },
      { type: "money", value: 50, image: "🏆" },
      { type: "money", value: 20, image: "🎯" },
      { type: "money", value: 10, image: "⭐" },
      { type: "money", value: 5, image: "🎊" },
      { type: "money", value: 2, image: "🍀" },
      { type: "money", value: 1, image: "🎉" },
      { type: "lose", value: 0, image: "😢" }
    ];
    
    // 30% chance de ganhar
    const won = Math.random() < 0.3;
    if (won) {
      const winningPrizes = gamePrizes.filter(p => p.type === "money");
      setPrize(winningPrizes[Math.floor(Math.random() * winningPrizes.length)]);
    } else {
      setPrize(gamePrizes[gamePrizes.length - 1]); // Perder
    }
  }, []);

  // Inicializar canvas quando prêmio estiver definido
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !prize) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configurar canvas
    canvas.width = 350;
    canvas.height = 200;

    // Desenhar fundo com prêmios
    drawPrizeBackground(ctx);
    
    // Desenhar camada de raspagem
    drawScratchLayer(ctx);
  }, [prize, canScratch]);

  const drawPrizeBackground = (ctx: CanvasRenderingContext2D) => {
    // Fundo gradiente
    const gradient = ctx.createLinearGradient(0, 0, 350, 200);
    gradient.addColorStop(0, "#1a1a2e");
    gradient.addColorStop(1, "#16213e");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 350, 200);

    if (prize) {
      // Desenhar prêmio no centro
      ctx.fillStyle = "#FFD700";
      ctx.font = "bold 48px Arial";
      ctx.textAlign = "center";
      ctx.fillText(prize.image, 175, 80);
      
      if (prize.type === "money") {
        ctx.fillStyle = "#00FF00";
        ctx.font = "bold 24px Arial";
        ctx.fillText(`R$ ${prize.value},00`, 175, 120);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "16px Arial";
        ctx.fillText("PARABÉNS!", 175, 150);
      } else {
        ctx.fillStyle = "#FF6B6B";
        ctx.font = "bold 20px Arial";
        ctx.fillText("Tente novamente!", 175, 120);
      }
    }
  };

  const drawScratchLayer = (ctx: CanvasRenderingContext2D) => {
    // Camada de raspagem
    const gradient = ctx.createLinearGradient(0, 0, 350, 200);
    gradient.addColorStop(0, "#C0C0C0");
    gradient.addColorStop(0.5, "#E5E5E5");
    gradient.addColorStop(1, "#A8A8A8");
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 350, 200);
    
    // Texto de instrução baseado no estado
    ctx.fillStyle = "#666";
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "center";
    
    if (!canScratch) {
      ctx.fillText("CLIQUE EM COMPRAR", 175, 90);
      ctx.font = "14px Arial";
      ctx.fillText("para habilitar a raspagem", 175, 115);
    } else {
      ctx.fillText("RASPE AQUI", 175, 100);
      ctx.font = "14px Arial";
      ctx.fillText("Deslize para revelar seu prêmio", 175, 130);
    }
  };

  const handleBuyGame = () => {
    setCanPurchase(false);
    setCanScratch(true);
  };

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const scratch = (x: number, y: number) => {
    if (!canScratch) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();

    // Calcular porcentagem raspada
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    
    const percentage = (transparent / (canvas.width * canvas.height)) * 100;
    setScratchedPercentage(percentage);

    // Se raspou mais de 50%, revelar completamente
    if (percentage > 50) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawPrizeBackground(ctx);
      setTimeout(() => {
        onPlay();
      }, 2000);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canScratch) return;
    setIsScratching(true);
    const pos = getMousePos(e);
    scratch(pos.x, pos.y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isScratching || !canScratch) return;
    const pos = getMousePos(e);
    scratch(pos.x, pos.y);
  };

  const handleMouseUp = () => {
    setIsScratching(false);
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

        {/* Scratch Card - Always Visible */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-lg font-bold mb-4 text-white">Quadro de Raspagem:</h3>
          
          <div className="flex flex-col items-center space-y-4">
            <canvas
              ref={canvasRef}
              className={`border border-gray-600 rounded-lg ${
                canScratch ? 'cursor-pointer' : 'cursor-not-allowed opacity-75'
              }`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            
            {/* Progress Bar */}
            {canScratch && (
              <div className="w-full max-w-xs">
                <div className="bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-green-500 h-full transition-all duration-300"
                    style={{ width: `${scratchedPercentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-1 text-center">
                  {scratchedPercentage < 50 
                    ? "Continue raspando para revelar seu prêmio..." 
                    : "Prêmio revelado!"
                  }
                </p>
              </div>
            )}
            
            {!canScratch && (
              <p className="text-sm text-gray-400 text-center">
                Clique em "Comprar" para habilitar a raspagem
              </p>
            )}
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
    </div>
  );
}