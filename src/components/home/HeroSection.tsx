
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  const { user, getUserRole } = useAuth();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [animatedText, setAnimatedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const heroWords = ["Fresh Produce,", "Direct Connection"];

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        const role = await getUserRole();
        setUserRole(role);
      }
    };
    fetchUserRole();
  }, [user, getUserRole]);

  // Typewriter animation effect
  useEffect(() => {
    if (currentWordIndex < heroWords.length) {
      const currentWord = heroWords[currentWordIndex];
      let charIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (charIndex <= currentWord.length) {
          setAnimatedText(prev => {
            if (currentWordIndex === 0) {
              return currentWord.slice(0, charIndex);
            } else {
              return heroWords[0] + " " + currentWord.slice(0, charIndex);
            }
          });
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setCurrentWordIndex(prev => prev + 1);
          }, 500);
        }
      }, 100);

      return () => clearInterval(typeInterval);
    }
  }, [currentWordIndex]);

  const handleGetStarted = () => {
    if (user) {
      if (userRole === 'admin') {
        navigate('/admin-dashboard');
      } else if (userRole === 'farmer') {
        navigate('/farmer-dashboard');
      } else if (userRole === 'buyer') {
        navigate('/buyer-marketplace');
      } else if (userRole === 'transporter') {
        navigate('/transporter-dashboard');
      } else {
        navigate('/farmer-dashboard');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <section 
      className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-blue-900/70"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 min-h-[120px] md:min-h-[160px]">
            {animatedText}
            <span className="text-green-400 block mt-2">
              {currentWordIndex >= 1 && animatedText.includes("Direct Connection") ? "" : ""}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            Farm2Table connects farmers with buyers and transporters across Kenya, 
            ensuring fresh produce reaches markets efficiently while supporting local agriculture.
          </p>
          <Button 
            onClick={handleGetStarted}
            size="lg" 
            className="bg-green-600 hover:bg-green-700 text-white px-12 py-6 text-xl font-semibold rounded-full shadow-2xl hover:shadow-green-500/25 hover:scale-105 transition-all duration-300 group"
          >
            Get Started Today
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
