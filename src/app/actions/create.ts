'use server'

import { client } from '@/lib/db'
// import { client } from "@/lib/db"
import { redirect } from 'next/navigation'

export async function createBook(formData: FormData) {
    const { title, rating, author, blurb } = Object.fromEntries(formData);

    // Convert FormDataEntryValue to string
    const bookData = {
        title: title.toString(),
        rating: rating.toString(),
        author: author.toString(),
        blurb: blurb.toString()
    };

    //  create book id
    const id = Math.floor(Math.random() * 1000000)


    // add the book to the sorted set
    const unique = await client.ZADD('books', {
        value: bookData.title,
        score: id
    }, { NX: true }) // only add if the book doesn't exist

    if (!unique) {
        return { error: 'Book already exists' }
    }

    // save new hash for the book
    await client.hSet(`books:${id}`, bookData)

    redirect('/')
}