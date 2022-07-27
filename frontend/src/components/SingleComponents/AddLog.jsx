
import React from 'react';
import {FaPlus} from "react-icons/fa";
import {AiOutlineUser} from "react-icons/ai";
import {AiOutlineUsergroupAdd} from "react-icons/ai";

function AddLog({openModal, openAdd, openList}) {
  return (
    <div className='fixed bottom-20 right-10 border-2'>
        <div className='fab rounded-full shadow-lg rounded-full bg-gray-500 p-5 absolute -bottom-15 right-0 cursor-pointer' onClick={openModal}>
            <FaPlus />
        </div>

        <div className='userlist absolute bottom-5 right-0'>
            <div className='rounded-full p-5 shadow-lg bg-emerald-500 cursor-pointer mb-5' onClick={openList}>
                <AiOutlineUser />
            </div>

            <div className='rounded-full p-5 shadow-lg bg-pink-500 cursor-pointer' onClick={openAdd}>
                <AiOutlineUsergroupAdd />
            </div>
        </div>
    
    </div>
  )
}

export default AddLog

