import React from 'react'
import { WiHumidity, WiDayCloudyWindy } from "react-icons/wi";
import { MdBluetoothDrive } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import { GiCarSeat } from "react-icons/gi";

function Footer() {
    const footerItems = [
        { id: 1, icon: <WiHumidity />, title: "Humidity" },
        { id: 2, icon: <WiDayCloudyWindy />, title: "Wind" },
        { id: 3, icon: <MdBluetoothDrive />, title: "Bluetooth" },
        { id: 4, icon: <AiOutlineMessage />, title: "Message" },
        { id: 5, icon: <GiCarSeat />, title: "" },
    ];

    return (
        <>
            <section className='grid grid-cols-5 gap-4'>
                {
                    footerItems.map(item => (
                        <div key={item.id} className='bg-[#1E1E1E] h-[85px] rounded-[15px] flex flex-col items-center justify-center' >
                            <div className='text-[30px] mb-1'>{item.icon}  </div>
                            <div className='text-[10px]'>{item.title}</div>
                        </div>
                    ))
                }

            </section>
        </>
    )
}

export default Footer
