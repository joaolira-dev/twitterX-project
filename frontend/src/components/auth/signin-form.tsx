"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SigninForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitButton = () => {
    router.replace("/home");
  };

  return (
    <>
      <Input
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => setEmail(e)}
      />

      <Input
        password
        placeholder="Digite sua senha"
        value={password}
        onChange={(e) => setPassword(e)}
      />

      <Button label="Entrar" onClick={handleSubmitButton} size={1} />
    </>
  );
};

export default SigninForm;
