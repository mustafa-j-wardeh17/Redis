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

    // save new hash for the book
    await client.hSet(`books:${id}`, bookData)

    redirect('/')
}