import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Play } from "lucide-react";

interface GameCardProps {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  price: number;
  maxPrize: number;
  onPlay: () => void;
  onViewPrizes: () => void;
}

export function GameCard({ title, subtitle, image, price, maxPrize, onPlay, onViewPrizes }: GameCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-primary/50 transition-all duration-300 group">
      {/* Imagem de fundo */}
      <div className="relative h-40 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Subtitle no topo */}
        {subtitle && (
          <div className="absolute top-4 left-4 right-4">
            <h3 className="text-white font-black text-xl leading-tight drop-shadow-lg">
              {subtitle}
            </h3>
          </div>
        )}
      </div>

      {/* Conteúdo na parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
        {/* Título do jogo */}
        <h4 className="text-white font-semibold text-sm">{title}</h4>
        
        {/* Valor do prêmio */}
        <div className="text-yellow-400 font-bold text-xs">
          PRÊMIOS DE ATÉ R$ {maxPrize.toLocaleString('pt-BR')}
        </div>

        {/* Botões */}
        <div className="flex space-x-2">
          <button
            onClick={onPlay}
            className="flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-2 px-4 rounded-md text-sm transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>Jogar</span>
            <span className="bg-black/20 px-2 py-1 rounded text-xs">
              R$ {price.toFixed(2).replace('.', ',')}
            </span>
          </button>
          
          <button
            onClick={onViewPrizes}
            className="bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-3 rounded-md text-xs transition-colors duration-200 border border-white/20"
          >
            VER PRÊMIOS
          </button>
        </div>
      </div>
    </div>
  );
}

interface GameCardHorizontalProps extends GameCardProps {
  isDesktop?: boolean;
}

export function GameCardHorizontal({ title, image, price, maxPrize, onPlay, onViewPrizes }: GameCardHorizontalProps) {
  return (
    <div className="card-dark hover:border-primary/30 transition-all duration-300 group">
      <div className="flex space-x-4">
        {/* Imagem */}
        <div className="relative overflow-hidden rounded-lg w-20 h-14 sm:w-24 sm:h-16 md:w-28 md:h-18 flex-shrink-0">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Conteúdo */}
        <div className="flex-1 space-y-1 sm:space-y-2 min-w-0">
          <div>
            <h3 className="font-semibold text-xs sm:text-sm text-foreground line-clamp-1">{title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-1">
              ATÉ R$ {maxPrize.toLocaleString('pt-BR')}
            </p>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button onClick={onPlay} className="btn-neon text-xs px-2 sm:px-3 py-1 h-7 sm:h-8 flex-1 sm:flex-none">
              <span className="hidden sm:inline">Jogar </span>R$ {price.toFixed(2).replace('.', ',')}
            </Button>
            
            <Button 
              onClick={onViewPrizes} 
              variant="outline" 
              size="sm"
              className="h-7 sm:h-8 px-2 border-border hover:border-primary/50 flex-shrink-0"
            >
              <Eye className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}