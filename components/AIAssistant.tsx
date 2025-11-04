import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { runChat } from '../services/geminiService';

interface AIAssistantProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, setIsOpen }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { sender: 'ai', text: 'Hello! I am your SPPU AI Assistant. How can I help you with your studies today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage: ChatMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const aiResponse = await runChat(input);
            const aiMessage: ChatMessage = { sender: 'ai', text: aiResponse };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error with AI chat:', error);
            const errorMessage: ChatMessage = { sender: 'ai', text: 'Sorry, I encountered an error. Please try again.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 z-50"
                aria-label="Toggle AI Assistant"
            >
                {isOpen ? <CloseIcon /> : <HelpIcon />}
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-6 w-full max-w-sm h-[60vh] bg-white dark:bg-gray-800 rounded-lg shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">
                        <h3 className="font-bold text-lg">AI Study Assistant</h3>
                        <button onClick={() => setIsOpen(false)} className="text-indigo-200 hover:text-white">
                           <CloseIcon />
                        </button>
                    </header>
                    <main className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 transition-colors duration-300 ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'}`}>
                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                           <div className="flex justify-start">
                             <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 rounded-lg px-4 py-2 transition-colors duration-300">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                </div>
                             </div>
                           </div>
                        )}
                        <div ref={messagesEndRef} />
                    </main>
                    <footer className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask a question..."
                                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-transparent"
                                disabled={isLoading}
                            />
                            <button onClick={handleSend} disabled={isLoading} className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300">
                                <SendIcon />
                            </button>
                        </div>
                    </footer>
                </div>
            )}
        </>
    );
};

const HelpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const SendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
