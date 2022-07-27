
import React from 'react';
import PropTypes from 'prop-types';
import {FaTrash} from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { deleteTech } from '../../features/technician/TechSlice';

function SingleTech({tech}) {

    let dispatch = useDispatch();

    const handleClick = (id) => {
        dispatch(deleteTech(id));
    };

  return (
    <div className='p-2 border-t-2 border-l-2 border-r-2 last:border-b-2 flex items-center justify-between'>
        <div>
            <h3 className='text-xl text-sky-600 font-bold'> {tech.firstname} {tech.lastname}</h3>
        </div>

        <div>   
            <FaTrash className="inline-block cursor-pointer" size={30} color={"red"} onClick={() => handleClick(tech._id)}/>
        </div>
    </div>
  )
};

SingleTech.propTypes = {
    tech: PropTypes.object.isRequired
}

export default SingleTech