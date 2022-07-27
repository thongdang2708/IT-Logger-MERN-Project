

import React from 'react';
import PropTypes from 'prop-types';
import {BsTrash} from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { deleteForLog } from '../../features/log/LogSlice';

function SingleLog({log}) {

    let dispatch = useDispatch();

    const handleClick = (id) => {
        dispatch(deleteForLog(id));
    };

  return (
        <div className='border-b-2 last:border-0 p-5'>
            <div className='flex items-center justify-between'>
                <div>
                   {log.attention ? (<h4 className='text-pink-500 mb-5'> {log.message} </h4>) : (<h4 className='text-sky-600 mb-5'> {log.message} </h4>)} 
                    <p className="text-gray-500"> <span className='text-black font-bold'> ID {log._id}</span> last updated by <span className='text-black font-bold'> {log.technician}</span> on {new Date(log.createdAt).toLocaleString("en-US")}</p>
                </div>

                <div>
                    <BsTrash color={"pink"} className="inline-block cursor-pointer" size={30} onClick={() => handleClick(log._id)}/>
                </div>
            </div>  
        </div>
  )
};

SingleLog.propTypes = {
    log: PropTypes.object.isRequired
};

export default SingleLog


