import { createContext, useContext, useEffect, useRef } from 'react';

// Tudo que as telas (layers) precisam do quiz: respostas, navegação e validação.
export const QuizContext = createContext(null);
export const useQuiz = () => useContext(QuizContext);

// Registra uma validação; o botão "Continuar" só avança se todas passarem.
export function useValidate(fn) {
  const { validate } = useQuiz();
  const ref = useRef(fn);
  ref.current = fn;
  useEffect(() => { return validate(() => ref.current()); }, [validate]);
}
