import { Link } from "react-router-dom";
import { Upload, ShieldCheck, Coins, TrendingUp, Recycle, Award } from "lucide-react";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const Index = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Waste",
      description: "Take a photo or record your waste drop using our easy upload system",
    },
    {
      icon: ShieldCheck,
      title: "AI Verification",
      description: "Our advanced AI analyzes and verifies your recyclable materials instantly",
    },
    {
      icon: Coins,
      title: "Earn Rewards",
      description: "Get points and cashback for every verified eco-friendly action",
    },
  ];

  const stats = [
    { icon: TrendingUp, value: "50K+", label: "Verified Drops" },
    { icon: Recycle, value: "25 Tons", label: "Waste Recycled" },
    { icon: Award, value: "$10K+", label: "Rewards Paid" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e6f9e6' }}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div
          className="absolute inset-0 z-0 w-full h-full"
          style={{
            backgroundImage: "url(/bg3.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/35 via-primary/84 to-accent/75" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,225,0.1),transparent_10%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block animate-fade-in ">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm text-primary-foreground mb-6">
                <Recycle className="h-4 w-4" />
                Making sustainability rewarding
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight animate-fade-up">
              Turn Waste into
              <span className="block bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
                Wealth
              </span>
              
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
              AI-powered verification for your recyclables. Upload, verify, and earn rewards while making a real environmental impact.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "400ms" }}>
              <Link to="/upload">
                <Button variant="hero" size="lg" className="w-full sm:w-auto group">
                  Start Earning Now
                  <TrendingUp className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-white/10 backdrop-blur-md border-white/30 text-primary-foreground hover:bg-white/20"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 group animate-scale-in" 
                style={{ animationDelay: `${600 + index * 150}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="h-12 w-12 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <stat.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="text-4xl font-bold text-primary-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/80 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* How It Works */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three simple steps to start earning rewards for your eco-friendly actions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-xl h-full">
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="relative">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                        <step.icon className="h-10 w-10 text-primary-foreground" />
                      </div>
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </CardContent>
                  
                  {/* Connection line for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                  )}
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent" 
         style={{
            backgroundImage: "url(/heroBg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          >
             <div className="absolute inset-0 bg-gradient-to-br from-primary/35 via-primary/84 to-accent/75" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,225,0.1),transparent_10%)]" />
          
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground leading-tight">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Join thousands of eco-conscious individuals earning rewards while saving the planet
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/upload">
                <Button variant="hero" size="lg" className="bg-gray-800 text-white hover:bg-gray-700 ">
                Start Recycling Now
                 <Award className="ml-2 h-5 w-5" />
              </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/10 w-full sm:w-auto">
                  Create Free Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
