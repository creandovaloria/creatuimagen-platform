interface Props { src: string; }
export default function Tira({ src }: Props) {
  return (
    <section className="w-full leading-none reveal">
      <img src={src} alt="My Story - Regina" className="w-full h-auto block" />
    </section>
  );
}
