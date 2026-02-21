import React from 'react'
import Img1 from '../../assets/img1.svg'
import Music from './music'
function HomePage() {
    return (
        <>
            <section>
                <div>
                    <div className='flex gap-4'>
                        <div>
                            <img src={Img1} alt='img-one ' className='h-[400px]' />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <div className='bg-[#1E1E1E] rounded-[15px] h-[200px] w-[220px]'>
                            </div>
                            <div className='bg-[#1E1E1E] rounded-[15px] h-[185px] w-[220px]'>
                            </div>
                        </div>
                    </div>

                    <Music />
                </div>
            </section>

        </>
    )
}

export default HomePage
