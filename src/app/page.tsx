import { client } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const books = await client.HGETALL("books:106172");
  console.log(books);
  return (
    <main>
      <nav className="flex justify-between">
        <h1 className='font-bold'>Books on Redis!</h1>
        <Link href="/create" className="btn">Add a new book</Link>
      </nav>

      <p>List of books here.</p>
    </main>
  );
}
