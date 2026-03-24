"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { RingLoader } from "react-spinners";

export type Error = {
    code?: string | undefined;
    message?: string | undefined;
    status: number;
    statusText: string;
}
export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setLoading(true)
    const{error} = await authClient.signUp.email({ email, name, password });
    if(error){
        setError(error)
    } else{
        e.target.reset();
    }
    setLoading(false)
   
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" value="s'inscire" >
        {loading? <RingLoader  color="#ffff" /> : "S'inscrire"}
      </button>
        <div>
          {error? <p>{error.code} : {error.message} </p> : null}
        </div>
    </form>
        
  );
}
