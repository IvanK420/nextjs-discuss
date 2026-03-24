import Messages  from "@/types/Messages";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Cardmessage({
  m,
  userid,
}: {
  m: Messages;
  userid: string | undefined;
}) {
  const isOwn = m.userid === userid;
  async function deleteMesssage(_id:string, userid:string | undefined) {
    const request = await fetch("api/messages",{
        method: "DELETE",
        headers: {"content-Type":"application/json"},
        body:JSON.stringify({_id,userid})
    })
  }
  function handleClick(){
    deleteMesssage(m._id,userid)
  }
  return (
        <div
          key={m._id}
          className={`flex flex-col rounded ${isOwn ? "items-end" : "items-start"}`}
        >
          {!isOwn && <p> {m.userName}</p>}
          <p>{m.content}</p>
          <p>{new Date(m.createdAt).toLocaleTimeString("fr-FR")}</p>
          <button onClick={handleClick} className="cursor-pointer">
            <FaRegTrashAlt />
          </button>
        </div>
  );
}
