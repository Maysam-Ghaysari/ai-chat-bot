'use client'
import React, { useState } from "react";

type Message = {
  id: number;
  sender: "user" | "assistant";
  text: string;
};

export default function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "assistant", text: "سلام! من دستیار شما هستم. هر چیزی بپرسید." },
  ]);

  async function newMessage(message: string) {
    
    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "user",
        text: message
      }
    ]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: message }),
    });

    const {answer} = await res.json(); 

    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "assistant",
        text: answer 
      }
    ]);
  }

  return [messages, newMessage] as const;
}
