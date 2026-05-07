interface Props { src: string; }

export default function Intro({ src }: Props) {
  return (
    <section className="w-full leading-none">
      <img
        src={src}
        alt="Invitación XV años Regina"
        className="w-full h-auto block"
      />
    </section>
  );
}
