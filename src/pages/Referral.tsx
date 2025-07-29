import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Copy, Eye, Users, Star, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReferralProps {
  user: {
    name: string;
  };
}

export function Referral({ user }: ReferralProps) {
  const [referralCode, setReferralCode] = useState('r7');
  const [showStats, setShowStats] = useState(false);
  const { toast } = useToast();

  const userLevel = 1;
  const currentXP = 0;
  const maxXP = 1000;
  const commission = 1;
  const referralLink = `https://raspagreen.com/r/${referralCode}`;

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link copiado!",
      description: "Link de referência copiado para a área de transferência",
    });
  };

  const generateNewCode = () => {
    const newCode = Math.random().toString(36).substring(2, 8);
    setReferralCode(newCode);
    toast({
      title: "Novo código gerado!",
      description: "Seu código de referência foi atualizado",
    });
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header do usuário */}
      <Card className="card-dark border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 border-2 border-primary/30">
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
                <div className="flex items-center space-x-1 bg-primary/10 px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 text-primary" />
                  <span className="text-xs font-semibold text-primary">Nível {userLevel}</span>
                </div>
              </div>
              
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Comissão {commission}%</span>
                  <span className="text-primary">{currentXP} / {maxXP} XP</span>
                </div>
                <Progress value={(currentXP / maxXP) * 100} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botão Ver níveis */}
      <Button
        onClick={() => setShowStats(!showStats)}
        variant="outline"
        className="w-full border-primary/30 text-primary hover:bg-primary/10"
      >
        <Eye className="w-4 h-4 mr-2" />
        Ver níveis
      </Button>

      {/* Link de referência */}
      <Card className="card-dark">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Link de referência</h3>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-foreground">Seu Código</label>
                <div className="flex space-x-2 mt-1">
                  <div className="flex-1 bg-muted/20 p-3 rounded-lg border border-border">
                    <span className="font-mono text-primary font-semibold">{referralCode}</span>
                  </div>
                  <Button
                    onClick={generateNewCode}
                    className="btn-neon"
                  >
                    Gerar Código
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Link completo</label>
                <div className="flex space-x-2 mt-1">
                  <div className="flex-1 bg-muted/20 p-3 rounded-lg border border-border overflow-hidden">
                    <span className="text-sm text-muted-foreground truncate block">
                      {referralLink}
                    </span>
                  </div>
                  <Button
                    onClick={copyReferralLink}
                    variant="outline"
                    className="border-primary/30 text-primary hover:bg-primary/10"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas (se visível) */}
      {showStats && (
        <Card className="card-dark border-primary/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Suas Estatísticas</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">0</div>
                  <div className="text-sm text-muted-foreground">Indicados</div>
                </div>
                
                <div className="bg-muted/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">R$ 0,00</div>
                  <div className="text-sm text-muted-foreground">Comissões</div>
                </div>
                
                <div className="bg-muted/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">0</div>
                  <div className="text-sm text-muted-foreground">Ativos</div>
                </div>
                
                <div className="bg-muted/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">{commission}%</div>
                  <div className="text-sm text-muted-foreground">Taxa atual</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Como funciona */}
      <Card className="card-dark">
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-4">Como funciona o programa</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start space-x-2">
              <span className="text-primary font-bold">1.</span>
              <span>Compartilhe seu link de referência com amigos</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-primary font-bold">2.</span>
              <span>Quando eles se cadastrarem e jogarem, você ganha comissão</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-primary font-bold">3.</span>
              <span>Quanto mais XP, maior seu nível e comissão</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}