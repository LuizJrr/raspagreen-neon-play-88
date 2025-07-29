import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";

const gameHistory = [
  {
    id: '1',
    value: 0.50,
    action: 'Jogou',
    game: 'PIX NA HORA!',
    date: '26/07/2025',
    time: '14:30',
    roundId: 'RND001234',
    result: 'Perdeu',
    prize: 0
  },
  {
    id: '2',
    value: 1.00,
    action: 'Jogou',
    game: 'Sorte Instantânea',
    date: '26/07/2025',
    time: '14:25',
    roundId: 'RND001233',
    result: 'Ganhou',
    prize: 5.00
  },
  {
    id: '3',
    value: 2.50,
    action: 'Jogou',
    game: 'Raspadinha Suprema',
    date: '26/07/2025',
    time: '14:20',
    roundId: 'RND001232',
    result: 'Perdeu',
    prize: 0
  },
  {
    id: '4',
    value: 0.50,
    action: 'Jogou',
    game: 'PIX NA HORA!',
    date: '25/07/2025',
    time: '16:45',
    roundId: 'RND001231',
    result: 'Ganhou',
    prize: 2.50
  },
  {
    id: '5',
    value: 5.00,
    action: 'Jogou',
    game: 'Raspa Relâmpago',
    date: '25/07/2025',
    time: '15:30',
    roundId: 'RND001230',
    result: 'Perdeu',
    prize: 0
  }
];

export function History() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(gameHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = gameHistory.slice(startIndex, endIndex);

  const getResultBadge = (result: string, prize: number) => {
    if (result === 'Ganhou') {
      return (
        <Badge className="bg-primary/20 text-primary border-primary/30">
          +R$ {prize.toFixed(2).replace('.', ',')}
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground">
        Perdeu
      </Badge>
    );
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Histórico de Jogos</h1>
        
        {/* Controles */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 sm:justify-between">
          <div className="flex items-center space-x-2 text-xs sm:text-sm">
            <span className="text-muted-foreground">Mostrar</span>
            <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
              <SelectTrigger className="w-16 sm:w-20 bg-card border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-muted-foreground hidden sm:inline">registros por página</span>
            <span className="text-muted-foreground sm:hidden">por página</span>
          </div>
          
          <Button variant="outline" size="sm" className="border-border">
            <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">Filtros</span>
          </Button>
        </div>
      </div>

      {/* Tabela Mobile */}
      <div className="lg:hidden space-y-3">
        {currentItems.map((item) => (
          <Card key={item.id} className="card-dark">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{item.game}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.date} às {item.time}
                    </p>
                  </div>
                  {getResultBadge(item.result, item.prize)}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Valor:</span>
                    <p className="font-semibold text-destructive">
                      -R$ {item.value.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">ID:</span>
                    <p className="font-mono text-xs text-foreground">{item.roundId}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabela Desktop */}
      <Card className="hidden lg:block card-dark">
        <CardHeader>
          <CardTitle className="text-foreground">Jogos Recentes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Valor</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Ação</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Jogo</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Data/Hora</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">ID Rodada</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Resultado</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id} className="border-b border-border/30 hover:bg-muted/5">
                    <td className="p-4 font-semibold text-destructive">
                      -R$ {item.value.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="p-4 text-foreground">{item.action}</td>
                    <td className="p-4 text-foreground">{item.game}</td>
                    <td className="p-4 text-muted-foreground">
                      {item.date} {item.time}
                    </td>
                    <td className="p-4 font-mono text-sm text-muted-foreground">{item.roundId}</td>
                    <td className="p-4">
                      {getResultBadge(item.result, item.prize)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Paginação */}
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-0 sm:justify-between">
        <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
          Mostrando {startIndex + 1} a {Math.min(endIndex, gameHistory.length)} de {gameHistory.length} registros
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="border-border text-xs sm:text-sm px-2 sm:px-3"
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
            <span className="hidden sm:inline">Anterior</span>
          </Button>
          
          <span className="text-xs sm:text-sm text-foreground px-2">
            {currentPage} de {totalPages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="border-border text-xs sm:text-sm px-2 sm:px-3"
          >
            <span className="hidden sm:inline">Próximo</span>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 sm:ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}