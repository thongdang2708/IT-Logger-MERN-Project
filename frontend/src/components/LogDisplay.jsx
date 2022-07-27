
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayLogs } from '../features/log/LogSlice';
import { useEffect } from 'react';
import {toast} from "react-toastify";
import { resetFunction } from '../features/log/LogSlice';
import SingleLog from './SingleComponents/SingleLog';
import PropTypes from 'prop-types';
import Spinner from './layouts/Spinner';

function LogDisplay({textSearch}) {

    let {logs, isError, isSuccess, isLoading, message} = useSelector(state => state.log);
    let dispatch = useDispatch();

    useEffect(() => {
        
        if (isError) {
            toast.error(message);
        }

        dispatch(displayLogs());
    },[]);

    let currentLogs = logs.filter((log) => {
        if (textSearch === "") {
            return log;
        } else if (log.message.toLowerCase().indexOf(textSearch) > -1 || log.technician.toLowerCase().indexOf(textSearch) > -1) {
            return log;
        }
    });

    if (isLoading) {
        return (<Spinner />);
    }
    
  return (
    <div>
        <div className="w-10/12 xl:w-7/12 lg:w-8/12 md:w-9/12 mx-auto mb-5">
            <div className="border-2 p-5">
                <h1 className='text-center font-bold text-sky-500 text-2xl'> System Log </h1>
            </div>

            <div className='border-l-2 border-r-2 border-b-2'>
                {currentLogs.map((log) => (
                    <SingleLog key={log._id} log={log}/>
                ))}
            </div>
        </div>
    </div>
  )
}

LogDisplay.propTypes = {
    textSearch: PropTypes.string
}



export default LogDisplay