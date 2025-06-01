
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "@/components/Header";
import { TrendingUp, TrendingDown, Search, Filter } from "lucide-react";

interface MarketPrice {
  id: string;
  crop: string;
  category: string;
  region: string;
  currentPrice: number;
  previousPrice: number;
  unit: string;
  lastUpdated: string;
  trend: "up" | "down" | "stable";
}

const MarketPrices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortField, setSortField] = useState<keyof MarketPrice>("crop");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [marketData] = useState<MarketPrice[]>([
    {
      id: "1",
      crop: "Tomatoes",
      category: "Vegetables",
      region: "Nairobi",
      currentPrice: 80,
      previousPrice: 75,
      unit: "per kg",
      lastUpdated: "2 hours ago",
      trend: "up"
    },
    {
      id: "2",
      crop: "Maize",
      category: "Grains",
      region: "Nakuru",
      currentPrice: 45,
      previousPrice: 50,
      unit: "per kg",
      lastUpdated: "1 hour ago",
      trend: "down"
    },
    {
      id: "3",
      crop: "Carrots",
      category: "Vegetables",
      region: "Kiambu",
      currentPrice: 60,
      previousPrice: 60,
      unit: "per kg",
      lastUpdated: "3 hours ago",
      trend: "stable"
    },
    {
      id: "4",
      crop: "Bananas",
      category: "Fruits",
      region: "Meru",
      currentPrice: 120,
      previousPrice: 110,
      unit: "per dozen",
      lastUpdated: "1 hour ago",
      trend: "up"
    },
    {
      id: "5",
      crop: "Green Beans",
      category: "Vegetables",
      region: "Eldoret",
      currentPrice: 150,
      previousPrice: 160,
      unit: "per kg",
      lastUpdated: "4 hours ago",
      trend: "down"
    },
    {
      id: "6",
      crop: "Rice",
      category: "Grains",
      region: "Kisumu",
      currentPrice: 90,
      previousPrice: 85,
      unit: "per kg",
      lastUpdated: "2 hours ago",
      trend: "up"
    }
  ]);

  const categories = ["All", "Vegetables", "Fruits", "Grains", "Legumes"];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const calculatePercentageChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(1);
  };

  const filteredData = marketData
    .filter(item => 
      item.crop.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || item.category === selectedCategory)
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

  const handleSort = (field: keyof MarketPrice) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Market Prices" />
      
      <div className="max-w-6xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Real-Time Market Prices</h1>
          <p className="text-gray-600">Track current produce prices across different regions</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search crops..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Market Prices</span>
            </CardTitle>
            <CardDescription>
              Click column headers to sort. Prices are updated regularly throughout the day.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort("crop")}
                    >
                      Crop {sortField === "crop" && (sortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort("category")}
                    >
                      Category {sortField === "category" && (sortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort("region")}
                    >
                      Region {sortField === "region" && (sortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort("currentPrice")}
                    >
                      Current Price {sortField === "currentPrice" && (sortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item) => (
                    <TableRow key={item.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{item.crop}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>{item.region}</TableCell>
                      <TableCell className="font-semibold">
                        KSh {item.currentPrice} {item.unit}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {getTrendIcon(item.trend)}
                        </div>
                      </TableCell>
                      <TableCell className={getTrendColor(item.trend)}>
                        {item.trend !== "stable" && (
                          <>
                            {item.trend === "up" ? "+" : ""}
                            {calculatePercentageChange(item.currentPrice, item.previousPrice)}%
                          </>
                        )}
                        {item.trend === "stable" && "No change"}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {item.lastUpdated}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketPrices;
