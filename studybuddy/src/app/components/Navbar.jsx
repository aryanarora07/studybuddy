"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'



const Navbar = () => {
  const pathname = usePathname();
  return (
    <div>
        <nav className='flex justify-end p-2'>
            <Link  href={"/"} className='p-4 mr-2'> About Us</Link>
            <Link  href={"/"} className='p-4 mr-2'> Contact</Link>
            <Link  href={"/login"} className={clsx(
              'p-4 mr-2', {
                'h-10 px-2  border-b-2 border-[#F15A22]': pathname === "////",
              },
            )}> Log In</Link>
            <Link href={"/signup"} className='text-white p-4 ml-2  bg-[#F15A22] rounded-full'> Join Us</Link>
        </nav>
    </div>
  )
}

export default Navbar