import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, Eye, Users, Star, TrendingUp, Link2, CheckCircle, UserPlus, Info } from "lucide-react";
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

  // Mock data dos resultados do afiliado
  const referralResults = {
    totalReferrals: 5,
    totalDeposits: 3,
    users: [
      { email: "joao@***", status: "Depositou", joinedAt: "2024-01-15" },
      { email: "maria@***", status: "Apenas cadastrado", joinedAt: "2024-01-14" },
      { email: "carlos@***", status: "Depositou", joinedAt: "2024-01-13" },
      { email: "ana@***", status: "Depositou", joinedAt: "2024-01-12" },
      { email: "pedro@***", status: "Apenas cadastrado", joinedAt: "2024-01-11" }
    ]
  };

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

      {/* Link de Afiliado */}
      <Card className="card-dark border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Link2 className="w-5 h-5 text-primary" />
            <span>Link de Afiliado</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Compartilhe com seus amigos. Quando se cadastrarem e depositarem, você ganha comissão!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Seu Código</label>
            <div className="flex space-x-2 mt-1">
              <div className="flex-1 bg-muted/20 p-3 rounded-lg border border-border">
                <span className="font-mono text-primary font-semibold text-lg">{referralCode}</span>
              </div>
              <Button
                onClick={generateNewCode}
                className="btn-neon"
              >
                Gerar Novo
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Link Completo</label>
            <div className="flex space-x-2 mt-1">
              <div className="flex-1 bg-muted/20 p-3 rounded-lg border border-border overflow-hidden">
                <span className="text-sm text-muted-foreground truncate block">
                  {referralLink}
                </span>
              </div>
              <Button
                onClick={copyReferralLink}
                className="btn-neon px-4"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copiar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados do Afiliado */}
      <Card className="card-dark border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Seus Resultados</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/20 p-4 rounded-lg text-center border border-primary/20">
              <div className="text-2xl font-bold text-primary">{referralResults.totalReferrals}</div>
              <div className="text-sm text-muted-foreground">Cadastros via Link</div>
            </div>
            
            <div className="bg-muted/20 p-4 rounded-lg text-center border border-primary/20">
              <div className="text-2xl font-bold text-primary">{referralResults.totalDeposits}</div>
              <div className="text-sm text-muted-foreground">Depositaram</div>
            </div>
          </div>

          {referralResults.users.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Usuários que usaram seu link:</h4>
              <div className="space-y-2">
                {referralResults.users.map((user, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted/10 p-3 rounded-lg border border-border">
                    <div className="flex items-center space-x-3">
                      <div className="text-sm font-medium text-foreground">{user.email}</div>
                      <Badge 
                        variant={user.status === "Depositou" ? "default" : "secondary"}
                        className={user.status === "Depositou" ? "bg-primary/20 text-primary" : ""}
                      >
                        {user.status === "Depositou" ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <UserPlus className="w-3 h-3 mr-1" />
                        )}
                        {user.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(user.joinedAt).toLocaleDateString("pt-BR")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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

      {/* Como Funciona o Programa */}
      <Card className="card-dark border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-primary" />
            <span>Como Funciona o Programa</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-muted/10 rounded-lg border border-primary/20">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold">1</span>
              </div>
              <div>
                <div className="font-medium text-foreground">Compartilhe seu link</div>
                <div className="text-sm text-muted-foreground">Envie seu link de referência para amigos e familiares</div>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-muted/10 rounded-lg border border-primary/20">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold">2</span>
              </div>
              <div>
                <div className="font-medium text-foreground">Eles se cadastram e jogam</div>
                <div className="text-sm text-muted-foreground">Quando depositarem e jogarem, você ganha comissão automaticamente</div>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-muted/10 rounded-lg border border-primary/20">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold">3</span>
              </div>
              <div>
                <div className="font-medium text-foreground">Evolua seu nível</div>
                <div className="text-sm text-muted-foreground">Quanto mais XP, maior seu nível e taxa de comissão</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}