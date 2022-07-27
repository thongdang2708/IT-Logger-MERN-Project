
import React from 'react';
import Loading from "../../assets/loading.gif";

function Spinner() {
  return (
    <div className='text-center w-100'>
        <img src={Loading} alt="loading" className='inline-block' width={180}/>
    </div>
  )
}

export default Spinner