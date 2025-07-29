import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Play } from "lucide-react";

interface GameCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  maxPrize: number;
  onPlay: () => void;
  onViewPrizes: () => void;
}

export function GameCard({ title, image, price, maxPrize, onPlay, onViewPrizes }: GameCardProps) {
  return (
    <div className="card-dark hover:border-primary/30 transition-all duration-300 group">
      {/* Imagem do jogo */}
      <div className="relative overflow-hidden rounded-lg mb-3">
        <img 
          src={image} 
          alt={title}
          className="w-full h-28 sm:h-32 md:h-36 lg:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Badge de prêmio */}
        <Badge className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-primary text-primary-foreground font-semibold text-xs">
          ATÉ R$ {maxPrize.toLocaleString('pt-BR')}
        </Badge>
      </div>

      {/* Conteúdo */}
      <div className="space-y-2 sm:space-y-3">
        <h3 className="font-semibold text-sm sm:text-base text-foreground line-clamp-2">{title}</h3>
        
        <div className="text-xs sm:text-sm text-muted-foreground">
          PRÊMIOS DE ATÉ R$ {maxPrize.toLocaleString('pt-BR')}
        </div>

        {/* Ações */}
        <div className="flex space-x-2">
          <Button onClick={onPlay} className="btn-neon flex-1 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2">
            <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            <span className="hidden sm:inline">Jogar</span>
            <span className="font-bold">R$ {price.toFixed(2).replace('.', ',')}</span>
          </Button>
          
          <Button 
            onClick={onViewPrizes} 
            variant="outline" 
            size="sm"
            className="border-border hover:border-primary/50 px-2 sm:px-3"
          >
            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
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