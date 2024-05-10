import Image from 'next/image'
import quotes from '../assets/quote.png'
import stats from '../assets/stats.png'
import imgg from '../assets/imgg.png'
import Link from 'next/link'



const Header = () => {
  return (
    <>
    <div className='flex'>
        <div className='m-4 w-2/5'>
            <h1 className='p-4 text-6xl  font-black'>Your Ideal StudyBuddy is one step away!</h1>
            <p className='m-4'>Ready to supercharge your study sessions? Your ideal study companion is just a click away!</p>
            <button className='m-4 p-2 w-36 text-white rounded-md bg-[#F15A22]'><Link href={"/signup"}> Join us</Link></button>
        </div>
        <div className=' ml-18'>
            <Image className='mt-6'
            height={1000}
            src={imgg}
            />
        </div>
        <div className=''>
            <p className=' mt-72 mr-48 ml-16 float-right'>
                <Image
                src={quotes}
                />
                "Life-changing! My StudyBuddy helped me conquer challenges and 
                achieve outstanding results. Don't miss out!"
            </p>
        </div>
    </div>
    <div>
        <Image className='ml-24'
        src={stats}
        />

    </div>
    </>
  )
}

export default Header