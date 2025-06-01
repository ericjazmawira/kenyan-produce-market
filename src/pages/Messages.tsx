
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { MessageSquare, Send, Search, Phone, User } from "lucide-react";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface Chat {
  id: string;
  participant: string;
  role: "Farmer" | "Buyer" | "Transporter";
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>("1");
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [chats] = useState<Chat[]>([
    {
      id: "1",
      participant: "John Kamau",
      role: "Farmer",
      lastMessage: "The tomatoes are ready for pickup tomorrow",
      timestamp: "2 mins ago",
      unread: 2,
      online: true
    },
    {
      id: "2",
      participant: "Mary Wanjiku",
      role: "Buyer",
      lastMessage: "Can you deliver 50kg of carrots by Friday?",
      timestamp: "1 hour ago",
      unread: 0,
      online: false
    },
    {
      id: "3",
      participant: "Peter Mwangi",
      role: "Transporter",
      lastMessage: "I'm on my way to the pickup location",
      timestamp: "3 hours ago",
      unread: 1,
      online: true
    }
  ]);

  const [messages] = useState<{ [chatId: string]: Message[] }>({
    "1": [
      {
        id: "1",
        sender: "John Kamau",
        content: "Hello! I have fresh tomatoes available.",
        timestamp: "10:30 AM",
        isOwn: false
      },
      {
        id: "2",
        sender: "You",
        content: "Great! How much per kg?",
        timestamp: "10:32 AM",
        isOwn: true
      },
      {
        id: "3",
        sender: "John Kamau",
        content: "KSh 80 per kg. Premium quality organic tomatoes.",
        timestamp: "10:35 AM",
        isOwn: false
      },
      {
        id: "4",
        sender: "You",
        content: "Perfect! I need 100kg. When can I collect?",
        timestamp: "10:37 AM",
        isOwn: true
      },
      {
        id: "5",
        sender: "John Kamau",
        content: "The tomatoes are ready for pickup tomorrow",
        timestamp: "10:40 AM",
        isOwn: false
      }
    ],
    "2": [
      {
        id: "1",
        sender: "Mary Wanjiku",
        content: "Hi, I'm looking for fresh carrots for my restaurant.",
        timestamp: "Yesterday",
        isOwn: false
      },
      {
        id: "2",
        sender: "You",
        content: "I have organic carrots available. How much do you need?",
        timestamp: "Yesterday",
        isOwn: true
      },
      {
        id: "3",
        sender: "Mary Wanjiku",
        content: "Can you deliver 50kg of carrots by Friday?",
        timestamp: "2 hours ago",
        isOwn: false
      }
    ]
  });

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      console.log(`Sending message: ${newMessage} to chat ${selectedChat}`);
      setNewMessage("");
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.participant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedChatData = chats.find(chat => chat.id === selectedChat);
  const currentMessages = selectedChat ? messages[selectedChat] || [] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Messages" />
      
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Chat List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Conversations</span>
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 border-l-4 ${
                      selectedChat === chat.id 
                        ? "border-green-500 bg-green-50" 
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-green-600" />
                          </div>
                          {chat.online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">{chat.participant}</h3>
                          <Badge variant="outline" className="text-xs">
                            {chat.role}
                          </Badge>
                        </div>
                      </div>
                      {chat.unread > 0 && (
                        <Badge className="bg-green-600 text-white text-xs">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    <p className="text-xs text-gray-400 mt-1">{chat.timestamp}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Messages */}
          <Card className="lg:col-span-2 flex flex-col">
            {selectedChatData ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-green-600" />
                        </div>
                        {selectedChatData.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{selectedChatData.participant}</h3>
                        <p className="text-sm text-gray-600">
                          {selectedChatData.online ? "Online" : "Offline"}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {currentMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.isOwn
                              ? "bg-green-600 text-white"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.isOwn ? "text-green-100" : "text-gray-500"
                            }`}
                          >
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4" />
                  <p>Select a conversation to start messaging</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;
