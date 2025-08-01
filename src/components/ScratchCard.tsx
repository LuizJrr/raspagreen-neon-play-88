import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Trophy } from "lucide-react";

interface ScratchCardProps {
  onClose: () => void;
  onRevealComplete: (prize: any) => void;
  gamePrice: number;
}

export function ScratchCard({ onClose, onRevealComplete, gamePrice }: ScratchCardProps) {
  console.log("ScratchCard renderizado!", { gamePrice });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchedPercentage, setScratchedPercentage] = useState(0);
  const [prize, setPrize] = useState<any>(null);

  // Gerar prêmio aleatório
  useEffect(() => {
    const prizes = [
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
      const winningPrizes = prizes.filter(p => p.type === "money");
      setPrize(winningPrizes[Math.floor(Math.random() * winningPrizes.length)]);
    } else {
      setPrize(prizes[prizes.length - 1]); // Perder
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configurar canvas
    canvas.width = 350;
    canvas.height = 200;

    // Desenhar fundo com prêmios
    drawPrizeBackground(ctx);
    
    // Desenhar camada de raspagem
    drawScratchLayer(ctx);

  }, [prize]);

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
    
    // Texto de instrução
    ctx.fillStyle = "#666";
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "center";
    ctx.fillText("RASPE AQUI", 175, 100);
    ctx.font = "14px Arial";
    ctx.fillText("Deslize para revelar seu prêmio", 175, 130);
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
        onRevealComplete(prize);
      }, 1000);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsScratching(true);
    const pos = getMousePos(e);
    scratch(pos.x, pos.y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;
    const pos = getMousePos(e);
    scratch(pos.x, pos.y);
  };

  const handleMouseUp = () => {
    setIsScratching(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4 border border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span>Raspadinha</span>
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Scratch Card */}
        <div className="mb-4">
          <canvas
            ref={canvasRef}
            className="w-full border border-gray-600 rounded-lg cursor-pointer"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>

        {/* Progress */}
        <div className="mb-4">
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

        {/* Instructions */}
        <div className="text-center text-sm text-gray-400">
          <p>Deslize o mouse sobre a área cinza para raspar</p>
        </div>
      </div>
    </div>
  );
}