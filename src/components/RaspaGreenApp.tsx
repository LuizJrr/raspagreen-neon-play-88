import { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { LoginModal } from "@/components/LoginModal";
import { WithdrawModal } from "@/components/WithdrawModal";
import { DepositModal } from "@/components/DepositModal";
import { Home } from "@/pages/Home";
import { Games } from "@/pages/Games";
import { Profile } from "@/pages/Profile";
import { Account } from "@/pages/Account";
import { Referral } from "@/pages/Referral";
import { History } from "@/pages/History";
import { Transactions } from "@/pages/Transactions";
import { GamePrizes } from "@/pages/GamePrizes";
import { useToast } from "@/hooks/use-toast";

interface User {
  name: string;
  email: string;
  balance: number;
  joinDate: string;
}

export function RaspaGreenApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [currentGameId, setCurrentGameId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleLogin = (userData: any) => {
    setUser({
      name: userData.name,
      email: userData.email,
      balance: userData.balance || 0,
      joinDate: userData.joinDate
    });
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  const handleShowLogin = () => {
    setShowLoginModal(true);
    setShowRegisterModal(false);
  };

  const handleShowRegister = () => {
    setShowRegisterModal(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleDeposit = (amount?: number) => {
    if (!user) {
      // Se não há usuário logado, abrir modal de login
      setShowLoginModal(true);
      return;
    }

    if (amount) {
      // Processar depósito com valor específico
      setUser(prev => prev ? { ...prev, balance: prev.balance + amount } : null);
      toast({
        title: "Depósito realizado!",
        description: `R$ ${Number(amount).toFixed(2).replace('.', ',')} foram adicionados ao seu saldo`,
      });
    } else {
      // Abrir modal de depósito
      setShowDepositModal(true);
    }
  };

  const handleWithdraw = (amount: number, pixKey: string) => {
    if (user && user.balance >= amount) {
      setUser(prev => prev ? { ...prev, balance: prev.balance - amount } : null);
      toast({
        title: "Saque solicitado!",
        description: `Saque de R$ ${amount.toFixed(2).replace('.', ',')} foi solicitado para ${pixKey}`,
      });
    }
  };

  const handleViewGamePrizes = (gameId: string) => {
    setCurrentGameId(gameId);
    setCurrentPage('game-prizes');
  };

  const handlePlayGame = (gameId: string) => {
    if (!user) {
      toast({
        title: "Faça login para jogar",
        description: "Você precisa estar logado para jogar",
        variant: "destructive",
      });
      return;
    }
    
    // Simular jogo
    const gamePrice = [0.5, 1, 2.5, 5, 50, 300][parseInt(gameId) - 1];
    
    if (user.balance < gamePrice) {
      toast({
        title: "Saldo insuficiente",
        description: "Faça um depósito para continuar jogando",
        variant: "destructive",
      });
      return;
    }

    // Deduzir valor do jogo
    setUser(prev => prev ? { ...prev, balance: prev.balance - gamePrice } : null);
    
    // Simular resultado (20% chance de ganhar)
    const won = Math.random() < 0.2;
    
    if (won) {
      const prize = gamePrice * (2 + Math.random() * 8); // Prêmio entre 2x e 10x
      setUser(prev => prev ? { ...prev, balance: prev.balance + prize } : null);
      toast({
        title: "🎉 Parabéns! Você ganhou!",
        description: `Prêmio de R$ ${prize.toFixed(2).replace('.', ',')}`,
      });
    } else {
      toast({
        title: "Que pena!",
        description: "Não foi dessa vez. Tente novamente!",
        variant: "destructive",
      });
    }
    
    // Voltar para home após jogar
    setCurrentPage('home');
    setCurrentGameId(null);
  };

  const getGameData = (gameId: string) => {
    const gamesData = [
      { id: '1', title: 'Centavo da Sorte', price: 0.50 },
      { id: '2', title: 'Sorte Instantânea', price: 1.00 },
      { id: '3', title: 'Raspadinha Suprema', price: 2.50 },
      { id: '4', title: 'Raspa Relâmpago', price: 5.00 },
      { id: '5', title: 'Raspadinha Mágica', price: 50.00 },
      { id: '6', title: 'Raspa e Ganha', price: 300.00 }
    ];
    return gamesData.find(game => game.id === gameId);
  };

  const renderCurrentPage = () => {
    if (!user) return null;

    switch (currentPage) {
      case 'home':
        return <Home onPlayGame={handleViewGamePrizes} />;
      case 'games':
        return <Games onPlayGame={handleViewGamePrizes} />;
      case 'game-prizes':
        if (currentGameId) {
          const gameData = getGameData(currentGameId);
          if (gameData) {
            return (
              <GamePrizes
                gameId={currentGameId}
                gameTitle={gameData.title}
                gamePrice={gameData.price}
                onBack={() => setCurrentPage('home')}
                onPlay={() => handlePlayGame(currentGameId)}
              />
            );
          }
        }
        return <Home onPlayGame={handleViewGamePrizes} />;
      case 'profile':
        return <Profile user={user} onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'account':
        return <Account user={user} onNavigate={setCurrentPage} />;
      case 'referral':
        return <Referral user={user} />;
      case 'history':
        return <History />;
      case 'transactions':
        return <Transactions />;
      default:
        return <Home onPlayGame={handleViewGamePrizes} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={user}
        onLogin={handleShowLogin}
        onRegister={handleShowRegister}
        onLogout={handleLogout}
        onDeposit={handleDeposit}
        onWithdraw={user ? () => setShowWithdrawModal(true) : undefined}
        onNavigate={setCurrentPage}
      />
      
      <main className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 md:py-8">
        {user ? renderCurrentPage() : <Home onPlayGame={handleViewGamePrizes} />}
      </main>

      {user && (
        <>
          <BottomNav
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            onDeposit={handleDeposit}
          />
          <Footer />
        </>
      )}

      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        mode="login"
      />

      <LoginModal
        open={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onLogin={handleLogin}
        mode="register"
      />

      <WithdrawModal
        open={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        onWithdraw={handleWithdraw}
        currentBalance={user?.balance || 0}
      />

      <DepositModal
        open={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        onDeposit={handleDeposit}
      />
    </div>
  );
}