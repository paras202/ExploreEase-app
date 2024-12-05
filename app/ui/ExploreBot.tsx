"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { 
  MapPin, 
  MessageCircle, 
  Send, 
  X, 
  Compass,
  User,
  Info
} from 'lucide-react';
import { useUser } from '@clerk/nextjs';

// Enhanced Message Interface
interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp?: Date;
  type?: 'welcome' | 'info' | 'standard';
}

// User Interface
interface UserInfo {
  id?: string;
  username?: string | null;
  email?: string;
  imageUrl?: string;
}

const ExploreBotComponent: React.FC = () => {
  // State Management
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Use Clerk's useUser hook to get user information
  const { user } = useUser();

  // Website Context with Dynamic Content
  const websiteContext = `
  This is a comprehensive website providing cutting-edge solutions.
  Key pages and features:
  - Homepage: You can search for any place and a particular attraction to find the place in map with some details  and weather condition of that place
  - Services: You can talk with our explore bot AI and you can book ticket to the attraction (with qr) you want to visit also which will be used to scan over the place
  have scheduler to maintain plannings also dashboard and navigation
  - About Us: Expert team dedicated to technological excellence
  - Contact: Multiple ways to connect with our team mainly exploreease39@gmail.com

  Communication Guidelines:
  - Be helpful and proactive
  - Guide users to relevant website sections
  - Provide clear, concise information
  - Maintain a professional yet friendly tone
  `;

  // Initialize Gemini AI
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

  // Generate Personalized Welcome Message
  const generateWelcomeMessage = useCallback(() => {
    if (user) {
      const welcomeMessage: Message = {
        text: `Welcome, ${user.username || user.fullName || 'valued user'}! 👋 I'm ExploreBot, your AI assistant. How can I help you navigate our website or answer your questions today?`,
        sender: 'bot',
        type: 'welcome',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [user]);

  // Trigger welcome message when user is available
  useEffect(() => {
    if (messages.length === 0) {
      generateWelcomeMessage();
    }
  }, [messages.length, generateWelcomeMessage]);

  // Advanced Message Handling
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    // Update messages with user input
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro"});
      
      // Enhanced Prompt with User Context
      const enhancedPrompt = `
      Website Context: ${websiteContext}
      
      User Profile:
      - Username: ${user?.username || user?.fullName || 'Anonymous'}
      - Interaction Type: Website Navigation Assistance

      User Query: ${input}
      
      Guidelines:
      1. Understand the user's intent
      2. Provide clear, actionable guidance
      3. Reference specific website sections when relevant
      4. Maintain a helpful, professional tone

      Respond with:
      - Direct answer to the query
      - Suggested website sections to explore
      - Optional additional context or assistance
      `;

      const result = await model.generateContent(enhancedPrompt);
      const response = result.response.text();

      const botMessage: Message = {
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      // Update messages with bot response
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        text: 'Oops! I\'m experiencing some technical difficulties. Please try again or contact support.',
        sender: 'bot',
        type: 'info'
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Advanced Features: Intent Detection and Routing
  const detectIntent = (message: string) => {
    const intents = [
      { 
        keywords: ['pricing', 'cost', 'price'], 
        action: 'Navigate to Pricing Page',
        icon: <Info className="text-blue-500" />
      },
      { 
        keywords: ['contact', 'reach out', 'support'], 
        action: 'Open Contact Form',
        icon: <User className="text-green-500" />
      }
    ];

    const matchedIntent = intents.find(intent => 
      intent.keywords.some(keyword => 
        message.toLowerCase().includes(keyword)
      )
    );

    return matchedIntent;
  };

  // Render Method
  return (
    <>
      {/* Floating Chat Toggle */}
      <div 
        className="fixed bottom-6 right-6 z-50 cursor-pointer"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform">
            {isChatOpen ? (
              <X className="text-white w-8 h-8" />
            ) : (
              <div className="relative">
                <MessageCircle className="text-white w-8 h-8" />
                {!user && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    1
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Container */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
          <div 
            className="w-full max-w-md bg-white h-3/4 md:h-full shadow-2xl flex flex-col"
            style={{
              backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(240,249,255,0.9))',
              backgroundBlendMode: 'overlay'
            }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Compass className="w-8 h-8" />
                <h2 className="text-xl font-bold">ExploreBot AI</h2>
              </div>
              {user && user.imageUrl && (
                <div className="relative w-10 h-10">
                  <Image 
                    src={user.imageUrl} 
                    alt="User Profile" 
                    fill
                    className="rounded-full border-2 border-white object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
            </div>

            {/* Chat Messages Container */}
            <div className="flex-grow p-4 overflow-y-auto space-y-3">
              {messages.map((message, index) => {
                const intent = message.sender === 'user' ? detectIntent(message.text) : null;
                
                return (
                  <div 
                    key={index}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div 
                      className={`p-3 rounded-xl max-w-[80%] ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      } ${
                        message.type === 'welcome' ? 'bg-green-100 text-green-800' : ''
                      }`}
                      style={{
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)'
                      }}
                    >
                      {message.text}
                      {intent && (
                        <div className="flex items-center mt-2 text-xs">
                          {intent.icon}
                          <span className="ml-2">{intent.action}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {isLoading && (
                <div className="text-center text-gray-500 animate-pulse">
                  ExploreBot is thinking...
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-2">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={`Ask ExploreBot anything, ${user?.username || user?.fullName || 'guest'}...`}
                  className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full hover:opacity-90 disabled:opacity-50 transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExploreBotComponent;