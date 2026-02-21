import React from 'react'
import MusicImg from '../../assets/musicimg.svg'
import { Play, Pause, SkipBack, SkipForward, Rewind, FastForward } from 'lucide-react';
function Music() {
    return (
        <>
            <section>
                <div className='bg-[#1E1E1E] h-[100px] w-full my-4 rounded-[12px] p-[10px] flex items-center gap-4'>
                    <img src={MusicImg} alt='music img' className='h-full rounded-[8px] object-cover' />

                    <div>
                        <div className="text-white text-sm font-semibold truncate w-32">Love me like you do</div>
                        <div className="text-gray-400 text-xs">Ellie Goulding</div>
                    </div>

                    <div className="flex-1 px-2">
                        <div className="flex justify-between text-gray-400 text-[10px] mb-1 font-mono">
                            <span>0:00</span>
                            <span>2:20</span>
                        </div>

                        <div className="h-1 w-full bg-gray-700 rounded-full mb-3 relative cursor-pointer group">
                            <div className="absolute top-0 left-0 h-full w-[30%] bg-[#84cc16] rounded-full group-hover:bg-[#a3e635] transition-colors"></div>
                        </div>

                        <div className="flex items-center justify-between max-w-[200px] mx-auto">
                            <button className="text-gray-300 hover:text-white transition-colors">
                                <Rewind size={18} fill="currentColor" />
                            </button>

                            <button className="text-gray-300 hover:text-white transition-colors">
                                <SkipBack size={18} fill="currentColor" />
                            </button>

                            <button className="text-white hover:scale-110 transition-transform">
                                <Pause size={22} fill="currentColor" />
                            </button>

                            <button className="text-gray-300 hover:text-white transition-colors">
                                <SkipForward size={18} fill="currentColor" />
                            </button>

                            <button className="text-gray-300 hover:text-white transition-colors">
                                <FastForward size={18} fill="currentColor" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Music
