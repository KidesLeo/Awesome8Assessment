import BookList from '@/components/BookList'
import Card from '@/components/Card'
import NavBar from '@/components/NavBar'
import Image from 'next/image'


export default async function Home() {


  return (
    <main className='w-full bg-slate-50  flex flex-row items-start justify-center min-h-screen'>
      <div className='flex flex-col justify-start items-start pb-10'>
        <NavBar />

        <BookList />
      </div>
    </main>
  )
}
