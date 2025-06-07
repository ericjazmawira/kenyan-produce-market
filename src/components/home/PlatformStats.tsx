
import { Users, Package, MapPin, Star } from "lucide-react";

export const PlatformStats = () => {
  const platformStats = [
    { label: "Active Farmers", value: "2,500+", icon: Users },
    { label: "Fresh Orders Daily", value: "850+", icon: Package },
    { label: "Counties Served", value: "25", icon: MapPin },
    { label: "Customer Rating", value: "4.8/5", icon: Star }
  ];

  return (
    <section className="bg-white py-16 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Thousands Across Kenya</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Join our growing community of farmers, buyers, and transporters</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {platformStats.map((stat, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <stat.icon className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
