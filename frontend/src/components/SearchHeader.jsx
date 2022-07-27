
import React from 'react';
import {RiPhoneFindLine} from "react-icons/ri";
import { useState } from 'react';

function SearchHeader({changeText}) {

    let [text, setText] = useState("");

    const handleChange = (e) => {
        setText(e.target.value);
        changeText(e.target.value.trim().toLowerCase());
    }

  return (
    <div className='bg-sky-500 p-8 mb-10'>
        <div className='w-10/12 mx-auto flex'>
            <div className='mr-5'>
                <RiPhoneFindLine className='inline-block h-full' size={40} color={"white"}/>
            </div>

            <div className='w-full'>
                <input type="text" name="text" id="text" value={text} onChange={handleChange} className='input input-md bg-sky-500 hover:bg-white focus:outline-0 w-full text-gray-500 placeholder-gray-500 font-fold' placeholder='Search Information...!'/>
            </div>
        </div>
    </div>
  )
}



export default SearchHeader