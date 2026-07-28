/**
 * Revela um texto caractere por caractere ao montar (usado nos headings da Galeria e da
 * Central de Prospecção). `delayMs` controla o espaçamento entre caracteres — cada tela usa
 * um valor próprio, mas a animação em si (`name-reveal`, ver `globals.css`) é a mesma.
 */
export function AnimatedRevealText({ text, delayMs = 40 }: { text: string; delayMs?: number }) {
  return (
    <span aria-label={text}>
      {text.split("").map((character, index) => (
        <span
          key={`${character}-${index}`}
          aria-hidden="true"
          className="inline-block animate-[name-reveal_700ms_ease-out_both] motion-reduce:animate-none"
          style={{ animationDelay: `${index * delayMs}ms` }}
        >
          {character === " " ? " " : character}
        </span>
      ))}
    </span>
  );
}
