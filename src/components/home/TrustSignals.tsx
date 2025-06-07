
import { Shield, Zap, Heart, Award } from "lucide-react";

export const TrustSignals = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Trust Farm2Table?</h2>
          <p className="text-xl text-gray-600">Built for the Kenyan agricultural community</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Platform</h3>
            <p className="text-gray-600">Your data and transactions are protected with enterprise-grade security</p>
          </div>
          
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Fast & Reliable</h3>
            <p className="text-gray-600">Quick connections between farmers and buyers with reliable delivery tracking</p>
          </div>
          
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Community Focused</h3>
            <p className="text-gray-600">Built by Kenyans, for Kenyans. Supporting local agriculture and communities</p>
          </div>
          
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Assured</h3>
            <p className="text-gray-600">Verified farmers and quality produce with transparent rating systems</p>
          </div>
        </div>
      </div>
    </section>
  );
};
