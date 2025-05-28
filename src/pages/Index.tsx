
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Users, TrendingUp, Truck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">Farm2Table</span>
            </div>
            <div className="flex space-x-4">
              {user ? (
                <Link to="/farmer-dashboard">
                  <Button className="bg-green-600 hover:bg-green-700">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-green-600 hover:bg-green-700">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Connecting Kenyan <span className="text-green-600">Farmers</span> to <span className="text-orange-500">Markets</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Empowering smallholder farmers with direct market access, real-time pricing, and seamless buyer connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register?role=farmer">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 px-8">
                I'm a Farmer
              </Button>
            </Link>
            <Link to="/register?role=buyer">
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8">
                I'm a Buyer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Farm2Table?</h2>
            <p className="text-xl text-gray-600">Built specifically for the Kenyan agricultural market</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-800">Direct Connection</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect farmers directly with buyers, eliminating middlemen and increasing profits.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <CardTitle className="text-green-800">Real-time Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Access current market prices for tomatoes, maize, beans, and other key Kenyan produce.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Truck className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-green-800">Order Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track orders from placement to delivery with real-time status updates.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-800">Mobile Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Designed for smartphones and feature phones, accessible to all farmers.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Agricultural Business?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of Kenyan farmers and buyers already using Farm2Table
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-50 px-8">
              Start Today - It's Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-6 w-6 text-green-400" />
            <span className="text-xl font-bold">Farm2Table Kenya</span>
          </div>
          <p className="text-gray-400">Empowering smallholder farmers across Kenya</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
