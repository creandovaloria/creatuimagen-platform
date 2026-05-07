export default function Footer() {
  return (
    <footer className="border-t border-[#f0c0cc] bg-[#fff8fa] text-center px-6 py-5 flex flex-col items-center gap-1.5">
      <p className="font-lato text-[2.6vw] text-[#b5566e] tracking-tight">
        Realizado por{" "}
        <a href="https://arturobarrios.com" target="_blank" rel="noopener noreferrer" className="font-bold underline-offset-2 hover:underline">
          arturobarrios.com
        </a>
      </p>
      <span className="text-[#e0b0ba] text-[2.5vw]">✦</span>
      <p className="font-lato text-[2.6vw] text-[#b5566e]">
        En colaboración con <strong>Liz Barron Event Planner</strong>
      </p>
    </footer>
  );
}
