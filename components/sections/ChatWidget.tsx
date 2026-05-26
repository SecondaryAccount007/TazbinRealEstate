'use client';

import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

type ChatSettings = {
  enabled?: boolean;
  webhook_url?: string;
  bot_name?: string;
  initial_message?: string;
};

export default function ChatWidget({ settings }: { settings?: ChatSettings }) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const webhookUrl = settings?.webhook_url || '';
  const isEnabled = settings?.enabled !== false;
  const botName = settings?.bot_name || "Taz's Assistant";
  const initialMessage = settings?.initial_message || "Hello! I'm here to help you find your perfect property in Dubai. How can I assist you today?";

  useEffect(() => {
    setMounted(true);

    // Only load n8n chat if webhook URL is configured
    if (!webhookUrl || !isEnabled) return;

    // Load n8n chat CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
    document.head.appendChild(link);

    // Load n8n chat script
    const script = document.createElement('script');
    script.type = 'module';
    script.innerHTML = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
      createChat({
        webhookUrl: '${webhookUrl}',
        target: '#n8n-chat',
        mode: 'window',
        chatInputKey: 'chatInput',
        chatSessionKey: 'sessionId',
        metadata: {},
        showWelcomeScreen: false,
        defaultLanguage: 'en',
        initialMessages: ['${initialMessage.replace(/'/g, "\\'")}'],
        i18n: {
          en: {
            title: '${botName.replace(/'/g, "\\'")}',
            subtitle: 'Ask me about any property in Dubai.',
            footer: '',
            getStarted: 'Start Chat',
            inputPlaceholder: 'Type your message...',
          },
        },
      });
    `;
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, [webhookUrl, isEnabled, botName, initialMessage]);

  if (!mounted || !isEnabled) return null;

  // If n8n webhook is configured, the widget handles itself
  if (webhookUrl) {
    return <div id="n8n-chat" />;
  }

  // Fallback custom chat button (when no webhook yet)
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-4 w-80 bg-obsidian-100 border border-gold/20 shadow-2xl">
          <div className="flex items-center justify-between p-4 border-b border-white/5 bg-gold">
            <div className="flex items-center gap-3">
              <MessageCircle size={18} className="text-obsidian" />
              <div>
                <p className="font-sans text-obsidian font-semibold text-sm">{botName}</p>
                <p className="font-sans text-obsidian/70 text-xs">Ask about any property</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-obsidian/60 hover:text-obsidian transition-colors">
              <X size={18} />
            </button>
          </div>
          <div className="p-4">
            <div className="bg-obsidian-200 p-3 mb-4 text-sm text-white/70 font-sans leading-relaxed">
              {initialMessage}
            </div>
            <p className="text-white/30 text-xs font-sans text-center">
              Chat widget will be active once webhook is configured.
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-gold hover:bg-gold-light shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Chat with us"
      >
        {open ? (
          <X size={22} className="text-obsidian" />
        ) : (
          <MessageCircle size={22} className="text-obsidian" />
        )}
      </button>
    </div>
  );
}
