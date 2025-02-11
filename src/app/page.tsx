import { client } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

// Pipline to get books from Redis
const getBooks = async () => {
  const result = await client.zRangeWithScores("books", 0, -1);

  const books = await Promise.all(
    result.map((b) => {
      return client.hGetAll(`books:${b.score}`)
    })
  )

  return books;
}
export default async function Home() {
  const books: Record<string, string>[] = await getBooks()
  return (
    <main>
      <nav className="flex justify-between">
        <h1 className='font-bold'>Books on Redis!</h1>
        <Link href="/create" className="btn">Add a new book</Link>
      </nav>

      {
        books?.map((book) => (
          <div key={book.id} className="card">
            <h2>{book.title}</h2>
            <p>By {book.author}</p>
            <p>{book.blurb}</p>
            <p>Rating: {book.rating}</p>
          </div>
        ))
      }
    </main>
  );
}
