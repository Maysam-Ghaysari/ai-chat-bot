"use client";

import React, { useEffect, useRef, useState } from "react";
import useChat from "../utils/useChat";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Chatbot() {
  const [messages, newMessage] = useChat();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setIsTyping(true);
    await newMessage(trimmed);
    setIsTyping(false);
    setInput("");
  }

  return (
    <div className="w-full max-w-[760px] h-[540px] flex flex-col bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden" dir="ltr">

      <div className="px-5 py-3 font-semibold text-white bg-linear-to-r from-sky-500 to-blue-600">
        چت‌ بات
      </div>

      <div ref={listRef} className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto bg-white">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex w-full ${m.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`inline-block break-all px-4 py-2 rounded-xl max-w-[85%] text-right leading-relaxed ${
                m.sender === "user" ? "bg-sky-600 text-white" : "bg-gray-100 text-gray-900"
              }`}
            >
              <Markdown remarkPlugins={[[remarkGfm, {singleTilde: false}]]}>{m.text}</Markdown>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex w-full justify-start">
            <div className="inline-block break-all px-4 py-2 rounded-xl max-w-[85%] text-right leading-relaxed bg-gray-100 text-gray-900 animate-pulse">
              Chatbot در حال نوشتن است...
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-row-reverse gap-2 p-3 border-t bg-gray-50">
        <input
          aria-label="Message input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage(input);
            }
          }}
          className="flex-1 px-4 py-2 rounded-xl border border-sky-300 bg-white placeholder-gray-400 text-right focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-100"
          placeholder="پیام خود را تایپ کنید و Enter را بزنید"
        />
        <button
          onClick={() => sendMessage(input)}
          className="px-4 py-2 rounded-xl bg-sky-600 text-white hover:bg-sky-700 active:bg-sky-800 transition-colors"
        >
          ارسال
        </button>
      </div>
    </div>
  );
}
