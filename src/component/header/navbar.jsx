import React from 'react'
import { FaBell } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoIosSearch } from "react-icons/io";
function Navbar() {
    return (
        <>
            <section className='flex items-center justify-between mb-[30px]'>
                <div className='font-semibold text-[25px]'>Dashboard</div>

                <div className='flex relative '>
                    <IoIosSearch  className='absolute top-[14px] left-[18px] text-[22px] text-[#A1A1A1]'/>
                    <input type="text" placeholder="Search" className='text-[18px] py-[10px] pl-[54px] w-[350px] rounded-[40px] bg-[#1E1E1E] outline-none'/>
                </div>

                <div className='flex gap-8 items-center'>
                    <div className='font-semibold text-[25px]'>25*C</div>
                    <div className=' text-[25px]' ><FaBell /></div>
                    <div className=' text-[65px]'><CgProfile /></div>
                </div>
            </section>
        </>
    )
}

export default Navbar
