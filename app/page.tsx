import { Inter } from "next/font/google";
import Body from "./(section)/Body";
import Form from "./(section)/Form";
import Hero from "./(section)/Hero";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${inter.className} flex flex-col mx-auto transition-all`}>
      {/* <section className="h-[80px]"></section> */}
      <Hero />
      <Body />
      <Form />
    </main>
  );
}
