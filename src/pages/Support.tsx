
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import { HelpCircle, Mail, Phone, MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const Support = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [supportForm, setSupportForm] = useState({
    name: "",
    email: "",
    category: "Account Issues",
    subject: "",
    message: ""
  });

  const categories = ["All", "Account Issues", "Orders", "Deliveries", "Technical Support"];

  const [faqs] = useState<FAQ[]>([
    {
      id: "1",
      category: "Account Issues",
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking the 'Forgot Password' link on the login page. Enter your email address and we'll send you a reset link."
    },
    {
      id: "2",
      category: "Account Issues",
      question: "How do I change my profile information?",
      answer: "Go to your Profile page from the main navigation. Click the 'Edit' button to update your personal and professional details."
    },
    {
      id: "3",
      category: "Orders",
      question: "How do I place an order?",
      answer: "Browse the marketplace, find the produce you want, and click 'Add to Cart'. Review your order and contact the farmer directly to confirm details and payment."
    },
    {
      id: "4",
      category: "Orders",
      question: "Can I cancel my order?",
      answer: "You can cancel orders that are still in 'Pending' status. Contact the farmer directly or reach out to our support team for assistance."
    },
    {
      id: "5",
      category: "Deliveries",
      question: "How do I track my delivery?",
      answer: "Go to your Orders page to see the current status of all your deliveries. You can also contact the transporter directly for real-time updates."
    },
    {
      id: "6",
      category: "Deliveries",
      question: "What if my delivery is late?",
      answer: "If your delivery is significantly delayed, contact the transporter first. If you can't reach them, use our support form to report the issue."
    },
    {
      id: "7",
      category: "Technical Support",
      question: "The app is not loading properly",
      answer: "Try refreshing your browser or clearing your cache. If the problem persists, check your internet connection or contact technical support."
    },
    {
      id: "8",
      category: "Technical Support",
      question: "I can't upload my profile photo",
      answer: "Ensure your image is in JPG or PNG format and under 5MB. If you're still having trouble, try using a different browser or device."
    }
  ]);

  const filteredFAQs = faqs.filter(faq => 
    selectedCategory === "All" || faq.category === selectedCategory
  );

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!supportForm.name || !supportForm.email || !supportForm.subject || !supportForm.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    console.log("Support form submitted:", supportForm);
    
    toast({
      title: "Support Request Submitted",
      description: "We'll get back to you within 24 hours. Check your email for a confirmation."
    });

    // Reset form
    setSupportForm({
      name: "",
      email: "",
      category: "Account Issues",
      subject: "",
      message: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setSupportForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Support" />
      
      <div className="max-w-6xl mx-auto p-4 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <p className="text-gray-600">Find answers to common questions or get in touch with our support team</p>
        </div>

        {/* Quick Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="p-6">
              <Phone className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-sm text-gray-600 mb-3">Available Mon-Fri, 8AM-6PM</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('tel:+254700123456', '_self')}
                className="w-full"
              >
                <Phone className="h-4 w-4 mr-2" />
                +254 700 123 456
              </Button>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Mail className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-gray-600 mb-3">Response within 24 hours</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('mailto:help@farm2table.co.ke?subject=Support Request', '_blank')}
                className="w-full"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email Us
              </Button>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600 mb-3">Chat with our team</p>
              <Button 
                size="sm" 
                onClick={() => {
                  toast({
                    title: "Live Chat",
                    description: "Chat feature opening... You'll be connected to our support team shortly.",
                  });
                  // In a real implementation, this would open a chat widget
                  setTimeout(() => {
                    window.open('https://wa.me/254700123456?text=Hello! I need help with Farm2Table.', '_blank');
                  }, 1000);
                }}
                className="w-full"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Start Chat
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FAQs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <HelpCircle className="h-5 w-5" />
                <span>Frequently Asked Questions</span>
              </CardTitle>
              <CardDescription>Quick answers to common questions</CardDescription>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 pt-4">
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
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center justify-between w-full pr-4">
                        <span>{faq.question}</span>
                        <Badge variant="outline" className="text-xs">
                          {faq.category}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Support Form */}
          <Card>
            <CardHeader>
              <CardTitle>Submit a Support Request</CardTitle>
              <CardDescription>
                Can't find what you're looking for? Send us a message and we'll help you out.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitForm} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={supportForm.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={supportForm.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={supportForm.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Account Issues">Account Issues</option>
                    <option value="Orders">Orders</option>
                    <option value="Deliveries">Deliveries</option>
                    <option value="Technical Support">Technical Support</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={supportForm.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={supportForm.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Please describe your issue in detail..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Support;
