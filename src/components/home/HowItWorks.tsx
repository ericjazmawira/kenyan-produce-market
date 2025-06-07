
import { UserPlus, Search, Truck } from "lucide-react";

export const HowItWorks = () => {
  const howItWorksSteps = [
    {
      step: 1,
      title: "Sign Up",
      description: "Create your account as a farmer, buyer, or transporter",
      icon: UserPlus,
      color: "bg-blue-500"
    },
    {
      step: 2,
      title: "List or Browse",
      description: "Farmers list produce, buyers browse fresh options",
      icon: Search,
      color: "bg-green-500"
    },
    {
      step: 3,
      title: "Connect & Deliver",
      description: "Connect directly and arrange delivery through transporters",
      icon: Truck,
      color: "bg-purple-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Get started in three simple steps</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {howItWorksSteps.map((step, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-all duration-300">
              <div className={`${step.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}>
                <step.icon className="h-10 w-10 text-white" />
              </div>
              <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-gray-600 font-bold">
                {step.step}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
