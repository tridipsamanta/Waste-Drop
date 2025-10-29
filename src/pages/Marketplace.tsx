import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { Button } from "@/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/ui/card";
import { Input } from "@/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import recyclablesImg from "@/assets/recyclables.jpg";

const Marketplace = () => {
  const [filter, setFilter] = useState("all");

  const items = [
    {
      id: 1,
      image: "/mixed_plastic.jpg",
      title: "Mixed Plastic Bottles",
      category: "Plastic",
      price: "₹1,040",
      weight: "5 kg",
      seller: "EcoCollector247",
    },
    {
      id: 2,
      image: "/aluminum_can.jpg",
      title: "Aluminum Cans Bundle",
      category: "Metal",
      price: "₹2,080",
      weight: "10 kg",
      seller: "RecycleKing",
    },
    {
      id: 3,
      image: "/cardbox.png",
      title: "Cardboard Boxes",
      category: "Paper",
      price: "₹670",
      weight: "15 kg",
      seller: "GreenTrader",
    },
    {
      id: 4,
      image: "/glass_bottol.jpeg",
      title: "Glass Bottles",
      category: "Glass",
      price: "₹1,250",
      weight: "8 kg",
      seller: "EcoWarrior",
    },
    {
      id: 5,
      image: "/paper.png",
      title: "Paper & Magazines",
      category: "Paper",
      price: "₹540",
      weight: "12 kg",
      seller: "PaperPro",
    },
    {
      id: 6,
      image: "/metal.jpg",
      title: "Metal Scraps",
      category: "Metal",
      price: "₹2,900",
      weight: "20 kg",
      seller: "MetalMaster",
    },
  ];

  const categories = ["all", "Plastic", "Metal", "Paper", "Glass"];

  const filteredItems = filter === "all"
    ? items
    : items.filter(item => item.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Marketplace</h1>
          <p className="text-muted-foreground">Buy and sell recyclable materials</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search recyclables..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap ${filter === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Weight:</span>
                    <span className="font-medium">{item.weight}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Buyer:</span>
                    <span className="font-medium">{item.seller}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="text-2xl font-bold text-primary">{item.price}</div>
                <Button variant="eco">Buy Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Floating Upload Button */}
        <Button
          variant="hero"
          size="lg"
          className="fixed bottom-8 right-8 rounded-full shadow-2xl z-40 animate-float"
        >
          <Plus className="mr-2" />
          Upload Item
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default Marketplace;
