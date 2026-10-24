import { useQuiz } from '../context.js';
import { fill } from '../lib/text.js';

// HTML vindo do quiz.json (editor Quill) já com as {{respostas}} preenchidas
export default function Rich({ html, className = '' }) {
  const { answers } = useQuiz();
  return <div className={`rich ${className}`} dangerouslySetInnerHTML={{ __html: fill(html, answers) }} />;
}
