import React from 'react'
import {  FaPhoneAlt } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { BsCameraFill } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";

function Aside() {

    const menuItems = [
        { id: 1, icon: <GoHomeFill /> },
        { id: 2, icon: <BsCameraFill /> },
        { id: 3, icon: <FaPhoneAlt /> },
        { id: 4, icon: <FaCirclePlay /> },
        { id: 5, icon: <IoSettingsSharp /> }
    ];

    return (
        <>
            <section className='flex flex-col gap-5'>
                {
                    menuItems.map(item => (
                        <div key={item.id} className='text-[25px] text-[#A1A1A1] w-[70px] h-[70px] rounded-[50%] bg-[#1E1E1E] flex justify-center items-center'>
                            {item.icon}
                        </div>
                    ))
                }

            </section>
        </>
    )
}

export default Aside
