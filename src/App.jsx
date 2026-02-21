import React from 'react';
import FonLine from "./assets/fonline.svg";
import Navbar from './component/header/navbar';
import Aside from './component/aside/aside';


function App() {
  return (
    <section className="relative bg-[#1F242E]">
      <img src={FonLine} alt="background-line" className="absolute w-full top-0 left-0 z-0 " />

      <div className='relative z-10 px-[120px] py-[130px]'>
        <div className='bg-[#111111] w-full rounded-[40px] p-[45px]'>
          <Navbar />

          <div className='flex items-center'>
            <div>
              <Aside />
            </div>

            <div></div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default App;