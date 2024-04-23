import { Search, Send } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react'

function dashHeader() {

  const session = useSession();
  const user: any = session?.data?.user;

  return (
    <div className='flex justify-end w-full items-center gap-2'>
      <div className='flex gap-2 items-center border border-gray-400 rounded-md px-2 py-1'> 
        <Search className='h-4 w-4'/>
        <input type="text" placeholder='Search' className='outline-none '/>
      </div>

      <div>
        <Image src={user?.image} alt='user' width={30} height={30} className='rounded-full'/>
      </div>

      <button className='flex items-center justify-center px-2 py-1 rounded-md text-white gap-2 h-8 bg-blue-600 hover:bg-blue-700 text-sm'>
        <Send className='h-4 w-4'/>
        Invite
      </button>
    </div>
  )
}

export default dashHeader;