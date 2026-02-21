import React from 'react';
import FonLine from "./assets/fonline.svg";
import Navbar from './component/header/navbar';


function App() {
  return (
    <section className="relative bg-[#1F242E]">
      <img src={FonLine} alt="background-line" className="absolute w-full top-0 left-0 z-0 " />

      <div className='relative z-10 px-[182px] py-[166px]'>
        <div className='bg-[#111111] w-full rounded-[40px] p-[45px]'>
          <Navbar />
        </div>
      </div>

    </section>
  );
}

export default App;