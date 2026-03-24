"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
interface Messages {
  _id: string;
  content: string;
  userid: string;
  userName: string;
  createdAt: string;
}
export default function ChatMessages() {
  const [messages, setMessages] = useState<Messages[]>([]);
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    async function fecthMessages() {
      const request = await fetch("/api/messages");
      if (!request.ok) {
        console.log(request.status);
        return;
      }
      const data = await request.json();
      // console.log("coucou")
      setMessages(data);
    }
    fecthMessages();
    // const interval = setInterval(fecthMessages,2000)
  }, []);
  if (messages.length === 0) {
    return <div>Aucun messages</div>;
  }

  return (
    <div>
      {messages.map((m) => {
        const isOwn = m.userid === session?.user.id
         console.log(isOwn)
        return (
          <div key={m._id}
          className={`flex flex-col rounded ${isOwn ? "items-end" : "items-start"}`}>
            {!isOwn && <p> {m.userName}</p>}
            <p>{m.content}</p>
            <p>{new Date(m.createdAt).toLocaleTimeString("fr-FR")}</p>
          </div>
        );
      })}
    </div>
  );
}
