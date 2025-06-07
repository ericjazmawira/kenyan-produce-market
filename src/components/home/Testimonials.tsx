
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Star, User } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "John Kimani",
      role: "Farmer, Kiambu",
      content: "Farm2Table has connected me directly with buyers. I've increased my income by 40% since joining!",
      rating: 5
    },
    {
      name: "Mary Wanjiku",
      role: "Restaurant Owner, Nairobi",
      content: "Fresh produce delivered straight from the farm. Quality is exceptional and prices are fair.",
      rating: 5
    },
    {
      name: "Peter Otieno",
      role: "Transporter, Nakuru",
      content: "Great platform for finding delivery jobs. The route optimization helps me serve more customers efficiently.",
      rating: 5
    }
  ];

  return (
    <section className="bg-gradient-to-r from-green-900 to-blue-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">What Our Users Say</h2>
          <p className="text-xl text-green-100">Real stories from our farming community</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-green-100 text-base leading-relaxed">
                  "{testimonial.content}"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-green-200 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
