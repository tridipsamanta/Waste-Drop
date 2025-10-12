import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Leaf, Mail, Lock, User, Sparkles, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { toast } from "sonner";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const password = (form.elements.namedItem("password") as HTMLInputElement)?.value;
    if (isLogin && password !== "password123") {
      toast.error("Wrong password. Try 'password123'.");
      return;
    }
    localStorage.setItem("demo_logged_in", "1");
    toast.success(isLogin ? "Welcome back! 🌍" : "Account created successfully! 🎉");
    setTimeout(() => navigate("/dashboard"), 800);
  };

  const features = [
    "AI-powered waste verification",
    "Instant cashback rewards",
    "Track your environmental impact"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left side - Branding */}
        <div className="hidden md:block space-y-8 animate-slide-in-left">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-2xl group-hover:scale-110 transition-transform shadow-xl">
              <Leaf className="h-10 w-10 text-primary-foreground" />
            </div>
            <span className="font-bold text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              WasteDrop
            </span>
          </Link>

          <div className="space-y-6">
            <div>
              <h1 className="text-5xl font-bold mb-4 leading-tight">
                Turn Waste into
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Rewards
                </span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Join thousands making money while saving the planet
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-8 pt-8">
            <div>
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">$10K+</div>
              <div className="text-sm text-muted-foreground">Rewards Paid</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">25T</div>
              <div className="text-sm text-muted-foreground">Waste Recycled</div>
            </div>
          </div>
        </div>

        {/* Right side - Auth form */}
        <div className="w-full max-w-md mx-auto animate-slide-in-right">
          {/* Mobile logo */}
          <Link to="/" className="flex md:hidden items-center justify-center gap-2 mb-8 group">
            <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-xl group-hover:scale-110 transition-transform">
              <Leaf className="h-8 w-8 text-primary-foreground" />
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              WasteDrop
            </span>
          </Link>

          <Card className="border-2 shadow-2xl backdrop-blur-sm bg-card/95">
            <CardHeader className="space-y-2 pb-6">
              <div className="inline-flex items-center gap-2 text-primary mb-2">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-medium">Get Started Free</span>
              </div>
              <h2 className="text-3xl font-bold">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-muted-foreground">
                {isLogin ? "Sign in to continue your eco-journey" : "Start earning rewards for recycling"}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="name" 
                        type="text" 
                        placeholder="John Doe" 
                        className="pl-11 h-12 text-base" 
                        required 
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-11 h-12 text-base"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-11 h-12 text-base pr-11"
                      required
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary focus:outline-none"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {isLogin && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-border w-4 h-4" />
                      <span className="text-muted-foreground">Remember me</span>
                    </label>
                    <a href="#" className="text-primary hover:underline font-medium">
                      Forgot password?
                    </a>
                  </div>
                )}

                <Button type="submit" variant="eco" size="lg" className="w-full h-12 text-base font-semibold">
                  {isLogin ? "Sign In" : "Create Account"}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    {isLogin ? "New to WasteDrop?" : "Already have an account?"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsLogin(!isLogin)}
                className="w-full text-center text-sm font-medium text-primary hover:underline"
              >
                {isLogin ? "Create a free account" : "Sign in to your account"}
              </button>

              <p className="text-center text-xs text-muted-foreground pt-4">
                By continuing, you agree to our{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
