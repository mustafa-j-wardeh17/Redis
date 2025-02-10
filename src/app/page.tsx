import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
