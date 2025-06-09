"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SigninForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitButton = () => {
    router.replace("/home");
  };

  return (
    <>
      <input
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />


      <input
        type="password"
        placeholder="Digite sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSubmitButton}>Entrar</button>
    </>
  );
};

export default SigninForm;
