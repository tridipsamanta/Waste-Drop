import { Gift, CreditCard, Coins, TrendingUp } from "lucide-react";
import { Button } from "@/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Rewards = () => {
  const rewards = [
    {
      icon: Gift,
      title: "₹800 Amazon Gift Card",
      points: 500,
      description: "Redeem your points for a ₹800 Amazon gift card",
      available: true,
    },
    {
      icon: CreditCard,
      title: "₹2,000 Cash Back",
      points: 1000,
      description: "Direct deposit to your bank account",
      available: true,
    },
    {
      icon: Coins,
      title: "500 Bonus Points",
      points: 250,
      description: "Boost your eco score with bonus points",
      available: true,
    },
    {
      icon: Gift,
      title: "₹4,000 Amazon Gift Card",
      points: 2500,
      description: "Redeem your points for a ₹4,000 Amazon gift card",
      available: false,
    },
    {
      icon: CreditCard,
      title: "₹8,000 Cash Back",
      points: 5000,
      description: "Direct deposit to your bank account",
      available: false,
    },
    {
      icon: TrendingUp,
      title: "Premium Membership",
      points: 3000,
      description: "Unlock exclusive features and higher rewards",
      available: false,
    },
  ];

  const transactions = [
    { date: "Jan 15, 2025", reward: "₹800 Amazon Gift Card", points: "-500", status: "Completed" },
    { date: "Jan 10, 2025", reward: "Bonus Points", points: "+250", status: "Completed" },
    { date: "Jan 5, 2025", reward: "₹2,000 Cash Back", points: "-1000", status: "Completed" },
  ];

  const handleRedeem = (points: number, available: boolean) => {
    if (!available) {
      toast.error("You don't have enough points for this reward");
    } else {
      toast.success(`Reward redeemed successfully! -${points} points`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Rewards</h1>
          <p className="text-muted-foreground">Redeem your eco points for amazing rewards</p>
        </div>

        {/* Balance Card */}
        <Card className="mb-8 bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-2">Available Points</p>
                <p className="text-5xl font-bold">875</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90 mb-2">Cashback Balance</p>
                <p className="text-3xl font-bold">₹1270.50</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rewards Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Available Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward, index) => (
              <Card
                key={index}
                className={`hover:shadow-lg transition-all duration-300 ${
                  !reward.available ? "opacity-60" : "hover:-translate-y-1"
                }`}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                    <reward.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{reward.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
                  <div className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{reward.points} points</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={reward.available ? "eco" : "outline"}
                    className="w-full"
                    onClick={() => handleRedeem(reward.points, reward.available)}
                    disabled={!reward.available}
                  >
                    {reward.available ? "Redeem" : "Not Enough Points"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between pb-4 border-b last:border-b-0"
                >
                  <div>
                    <p className="font-medium">{transaction.reward}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${transaction.points.startsWith('+') ? 'text-primary' : 'text-muted-foreground'}`}>
                      {transaction.points}
                    </p>
                    <p className="text-xs text-muted-foreground">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Rewards;
