import { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Gift, Trophy, Crown, Star } from 'lucide-react';

interface Winner {
  name: string;
  prize: string;
  amount: number;
  icon: 'gift' | 'trophy' | 'crown' | 'star';
}

const winnersData: Winner[] = [
  { name: 'Elaine So**', prize: 'Apple Watch Ultra', amount: 9000, icon: 'gift' },
  { name: 'Carlos M***', prize: 'iPhone 15 Pro', amount: 8500, icon: 'trophy' },
  { name: 'Ana Lu***', prize: 'Notebook Gamer', amount: 7200, icon: 'crown' },
  { name: 'Pedro S****', prize: 'PlayStation 5', amount: 4500, icon: 'star' },
  { name: 'Julia O***', prize: 'AirPods Pro', amount: 2800, icon: 'gift' },
  { name: 'Marco A****', prize: 'Samsung Galaxy', amount: 6500, icon: 'trophy' },
  { name: 'Fernanda L***', prize: 'iPad Pro', amount: 5200, icon: 'crown' },
  { name: 'Roberto P***', prize: 'MacBook Air', amount: 9800, icon: 'star' },
];

const iconComponents = {
  gift: Gift,
  trophy: Trophy,
  crown: Crown,
  star: Star,
};

export function WinnersCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      dragFree: true,
      containScroll: 'trimSnaps',
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi]);

  return (
    <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-4 rounded-xl border border-primary/30 overflow-hidden">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-3">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-semibold text-green-400 text-sm">AO VIVO</span>
        </div>
        <span className="text-muted-foreground text-sm">Últimos ganhadores</span>
      </div>

      {/* Carrossel */}
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {/* Live indicator card */}
          <div className="embla__slide flex-[0_0_auto] mr-3">
            <div className="flex items-center justify-center py-2 px-6 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-colors duration-300">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold text-sm whitespace-nowrap">🟢 AO VIVO</span>
              </div>
            </div>
          </div>

          {/* Winner cards */}
          {winnersData.map((winner, index) => {
            const IconComponent = iconComponents[winner.icon];
            return (
              <div key={index} className="embla__slide flex-[0_0_auto] mr-3">
                <div className="flex items-center py-2 px-6 bg-card/80 border border-border/50 rounded-lg hover:bg-secondary/80 transition-all duration-300 gap-3 min-w-fit">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/20 rounded-full">
                    <IconComponent className="w-4 h-4 text-primary" />
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <span className="text-foreground font-medium text-sm whitespace-nowrap">
                        {winner.name}
                      </span>
                      <span className="text-muted-foreground text-xs">ganhou</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground text-xs whitespace-nowrap">
                        {winner.prize}
                      </span>
                      <span className="text-green-400 font-bold text-sm whitespace-nowrap">
                        R$ {winner.amount.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Duplicate for seamless loop */}
          {winnersData.map((winner, index) => {
            const IconComponent = iconComponents[winner.icon];
            return (
              <div key={`duplicate-${index}`} className="embla__slide flex-[0_0_auto] mr-3">
                <div className="flex items-center py-2 px-6 bg-card/80 border border-border/50 rounded-lg hover:bg-secondary/80 transition-all duration-300 gap-3 min-w-fit">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/20 rounded-full">
                    <IconComponent className="w-4 h-4 text-primary" />
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <span className="text-foreground font-medium text-sm whitespace-nowrap">
                        {winner.name}
                      </span>
                      <span className="text-muted-foreground text-xs">ganhou</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground text-xs whitespace-nowrap">
                        {winner.prize}
                      </span>
                      <span className="text-green-400 font-bold text-sm whitespace-nowrap">
                        R$ {winner.amount.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}