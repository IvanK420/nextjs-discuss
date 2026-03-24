"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Error } from "../register/page";
import { RingLoader } from "react-spinners";
import { useRouter } from "next/navigation";

export default function loginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    if (error) {
      setError(error);
      setLoading(false);
    } else {
      router.push("/chat");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit" value="Se connecter">
        {loading ? <RingLoader color="#ffff" /> : "Se connecter"}
      </button>
      <div>
        {error ? (
          <p>
            {error.code} : {error.message}{" "}
          </p>
        ) : null}
      </div>
    </form>
  );
}
