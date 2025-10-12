import { TrendingUp, Leaf, DollarSign, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Progress } from "@/ui/progress";
import { Button } from "@/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    {
      icon: Leaf,
      label: "Total Verified Drops",
      value: "147",
      change: "+12 this week",
      color: "text-primary",
    },
    {
      icon: TrendingUp,
      label: "Waste Recycled",
      value: "42.5 kg",
      change: "+5.2 kg this week",
      color: "text-accent",
    },
    {
      icon: DollarSign,
      label: "Cashback Balance",
      value: "$127.50",
      change: "+$15.20 this week",
      color: "text-primary",
    },
    {
      icon: Award,
      label: "Eco Score",
      value: "875",
      change: "Top 15%",
      color: "text-accent",
    },
  ];

  const recentActivity = [
    { date: "Today", items: "5 plastic bottles", points: "+25" },
    { date: "Yesterday", items: "10 aluminum cans", points: "+40" },
    { date: "2 days ago", items: "3 paper boxes", points: "+15" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Track your eco-impact and rewards</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Progress Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Monthly Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Recycling Goal</span>
                  <span className="text-sm text-muted-foreground">85/100 items</span>
                </div>
                <Progress value={85} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Eco Score Level</span>
                  <span className="text-sm text-muted-foreground">875/1000 pts</span>
                </div>
                <Progress value={87.5} className="h-3" />
              </div>
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 text-center">
                <h3 className="font-semibold mb-2">You're doing great! 🌟</h3>
                <p className="text-sm text-muted-foreground">
                  Just 15 more verified drops to reach Gold status and unlock exclusive rewards!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between pb-4 border-b last:border-b-0">
                    <div>
                      <p className="font-medium text-sm">{activity.items}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                    <div className="text-primary font-semibold">{activity.points}</div>
                  </div>
                ))}
              </div>
              <Link to="/upload">
                <Button variant="eco" className="w-full mt-4">
                  Upload More
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Redeem CTA */}
        <Card className="mt-6 bg-gradient-to-r from-primary to-accent text-primary-foreground"
        >
          <CardContent className="p-8 text-center">
            
            <h2 className="text-2xl font-bold mb-2">Ready to Redeem Your Rewards?</h2>
            <p className="mb-6 opacity-90">
              You have ₹{1270.50} in cashback available
            </p>
            <Link to="/rewards">
              
              <Button variant="hero" size="lg" className="bg-gray-800 text-white hover:bg-gray-700">
                View Rewards
              </Button>

            </Link>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
