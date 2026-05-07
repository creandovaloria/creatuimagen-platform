interface Props { src: string; }

export default function Intro({ src }: Props) {
  return (
    <section className="w-full leading-none" style={{ maxHeight: "55vh", overflow: "hidden" }}>
      <img
        src={src}
        alt="Invitación XV años Regina"
        className="w-full block object-cover object-top"
        style={{ height: "55vh" }}
      />
    </section>
  );
}
