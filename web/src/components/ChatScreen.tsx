import { useEffect, useRef } from "react";

type ChatMessage = { sender: string; content: string };

type ChatScreenProps = {
  username: string | undefined;
  messages: ChatMessage[];
};

export default function ChatScreen({ username, messages }: ChatScreenProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  return (
    <section className="chat-body" ref={containerRef}>
      {messages.map((m, idx) => {
        const isOwn = username === m.sender;
        return (
          <div key={idx} className={isOwn ? "message right" : "message left"}>
            {!isOwn && <div className="message-sender">{m.sender}</div>}
            <div className="message-bubble">{m.content}</div>
          </div>
        );
      })}
    </section>
  );
}


