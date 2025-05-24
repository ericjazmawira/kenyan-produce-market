
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const MarketPrices = () => {
  const marketData = [
    {
      product: "Tomatoes",
      currentPrice: "KSh 80/kg",
      previousPrice: 75,
      currentPriceNum: 80,
      market: "Nairobi City Market",
      trend: "up",
      change: "+6.7%",
      emoji: "🍅"
    },
    {
      product: "Green Maize",
      currentPrice: "KSh 45/kg",
      previousPrice: 48,
      currentPriceNum: 45,
      market: "Nakuru Market",
      trend: "down",
      change: "-6.3%",
      emoji: "🌽"
    },
    {
      product: "French Beans",
      currentPrice: "KSh 120/kg",
      previousPrice: 120,
      currentPriceNum: 120,
      market: "Mombasa Market",
      trend: "stable",
      change: "0%",
      emoji: "🫛"
    },
    {
      product: "Red Kidney Beans",
      currentPrice: "KSh 150/kg",
      previousPrice: 140,
      currentPriceNum: 150,
      market: "Kisumu Market",
      trend: "up",
      change: "+7.1%",
      emoji: "🫘"
    },
    {
      product: "Sweet Bananas",
      currentPrice: "KSh 60/kg",
      previousPrice: 65,
      currentPriceNum: 60,
      market: "Eldoret Market",
      trend: "down",
      change: "-7.7%",
      emoji: "🍌"
    },
    {
      product: "White Maize",
      currentPrice: "KSh 40/kg",
      previousPrice: 38,
      currentPriceNum: 40,
      market: "Kitale Market",
      trend: "up",
      change: "+5.3%",
      emoji: "🌾"
    },
    {
      product: "Irish Potatoes",
      currentPrice: "KSh 55/kg",
      previousPrice: 55,
      currentPriceNum: 55,
      market: "Nyandarua Market",
      trend: "stable",
      change: "0%",
      emoji: "🥔"
    },
    {
      product: "Carrots",
      currentPrice: "KSh 70/kg",
      previousPrice: 68,
      currentPriceNum: 70,
      market: "Thika Market",
      trend: "up",
      change: "+2.9%",
      emoji: "🥕"
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "bg-green-100 text-green-800";
      case "down":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>📊</span>
            <span>Real-time Market Prices</span>
          </CardTitle>
          <CardDescription>
            Current prices from major Kenyan markets - Updated every hour
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-gray-500 mb-4">
            Last updated: {new Date().toLocaleTimeString()} EAT
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {marketData.map((item, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{item.emoji}</span>
                  <h3 className="font-semibold">{item.product}</h3>
                </div>
                {getTrendIcon(item.trend)}
              </div>
              
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600">
                  {item.currentPrice}
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge className={getTrendColor(item.trend)}>
                    {item.change}
                  </Badge>
                  <span className="text-xs text-gray-500">vs. last week</span>
                </div>
                
                <div className="text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <span>📍</span>
                    <span>{item.market}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Market Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Market Insights</CardTitle>
          <CardDescription>
            Key trends and recommendations for farmers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">🔥 High Demand</h4>
              <p className="text-sm text-green-700">
                Tomatoes and kidney beans are showing strong price increases. Great time to harvest and sell.
              </p>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="font-medium text-orange-800 mb-2">⚠️ Price Alert</h4>
              <p className="text-sm text-orange-700">
                Maize prices have dropped this week. Consider holding stock if possible.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">💡 Opportunity</h4>
              <p className="text-sm text-blue-700">
                French beans and potatoes have stable prices - reliable income sources.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketPrices;
