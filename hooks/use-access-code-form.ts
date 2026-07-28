"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { isValidAccessCode } from "@/lib/access-code";

/**
 * Estado e submit compartilhados pelas duas telas de senha (Galeria e Prospecção): campo de
 * código, erro, mostrar/ocultar. O JSX/estilo de cada tela continua próprio — só a lógica é
 * compartilhada.
 */
export function useAccessCodeForm(validCodes: string | string[], onUnlock: () => void) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
    setError(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isValidAccessCode(code, validCodes)) {
      onUnlock();
    } else {
      setError(true);
    }
  };

  return { code, error, showCode, setShowCode, handleCodeChange, handleSubmit };
}
