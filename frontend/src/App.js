import React from 'react';
import SearchHeader from './components/SearchHeader';
import LogDisplay from './components/LogDisplay';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddLog from './components/SingleComponents/AddLog';
import Modal from "react-modal";
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { displayTechs } from './features/technician/TechSlice';
import { addForLog } from './features/log/LogSlice';
import { addTechs } from './features/technician/TechSlice';
import SingleTech from './components/SingleComponents/SingleTech';


//Style for modal 
const customStyles = {
    content: {
      position: "relative",
      width: "800px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
}

//Set Modal
Modal.setAppElement("#root");

function App() {

  // Set states for add-log modal
  let [modalLog, setModalLog] = useState(false);
  let [selectBox, setSelectBox] = useState("Select Technician");
  let [addForm, setAddForm] = useState({
    firstname: "",
    lastname: ""
  });
  let [attention, setCheckAttention] = useState(false);
  let [modalAddTech, setModalAddTech] = useState(false);

  //Global States for technician state
  let {techs, isError, message} = useSelector(state => state.tech);

  //Set text for search bar

  let [textSearch, setTextSearch] = useState("");

  //Function to set change for text for search bar

  const changeText = (inputText) => {
    setTextSearch(inputText);
  }

  //Call Dispatch 
  let dispatch = useDispatch();


  //Set state for technician-list modal

  let [modalList, setModalList] = useState(false);

  //Set for opening and closing technician-list modal

  let openModalList = () => setModalList(true);
  let closeModalList = () => setModalList(false);
  

   //Set effect for App component

   useEffect(() => {

    if (isError) {
      toast.error(message);
    }

    dispatch(displayTechs());
},[])


  //Set functions for opening and closing a modal to add logs
  let openModalLog = () => setModalLog(true);
  let closeModalLog = () => {
    setFormData({
      message: "",
      technician: "Select Technician",
    });

    setModalLog(false);
    setCheckAttention(false);
  };

  //Set state for add-log modal
  let [formData, setFormData] = useState({
    message: "",
    technician: "Select Technician",
  });

  //Set close button for add-log modal
  const closeAddLog = () => {
    
    closeModalLog();
 
  };

  //Set changes for add-log modal
  const handleChange = (e) => {

    let {name, value} = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  };


  //Set Change for Check Box
  const handleCheckBox = (ey) => {

    if (ey.currentTarget.checked) {
      setCheckAttention(true);
    } else if (!ey.currentTarget.checked) {
      setCheckAttention(false);
    }
  }

 
  
  //Submit form for adding logs

  const handleSubmit = (et) => {
    et.preventDefault();

    if (formData.message === "" || formData.technician === "Select Technician") {
        toast.error("Please fill enough information!")
    } else {
      let inputData = {
        message: formData.message,
        technician: formData.technician,
        attention: attention
      }

  
      dispatch(addForLog(inputData));
      closeModalLog();
      setFormData({
        message: "",
        technician: "Select Technician",
      });
      setCheckAttention(false);
    }
   
}

   //Function to close add-technician modal 
   let closeModalAdd = () => {
    setAddForm({
      firstname: "",
      lastname: ""
    });
    setModalAddTech(false);
  }
  let openModalAdd = () => setModalAddTech(true);



  //Set changes for add-technician modal

    const handleChangeAddTech = (ej) => {
        let {name, value} = ej.target;

        setAddForm((prevState) => ({
          ...prevState,
          [name]: value
        }))
    } 

  // Submit form for adding technicians
  const handleSubmitAddTech = (eo) => {
      eo.preventDefault();

      if (!addForm.firstname || !addForm.lastname) {
          toast.error("Please fill enough information!")
      } else {
          let inputData = {
            firstname: addForm.firstname,
            lastname: addForm.lastname
          }

          dispatch(addTechs(inputData));

          setAddForm({
            firstname: "",
            lastname: ""
          });
          setModalAddTech(false);
      }
  }


  return (
    <>
    <div className="App">

        {/* Header Component */}
        <SearchHeader changeText={changeText}/>

        {/* Display Logs */}
        <LogDisplay textSearch={textSearch}/>
        <AddLog openModal={openModalLog} openAdd={openModalAdd} openList={openModalList}/>

        {/* Add-Log Modal */}
        <Modal isOpen={modalLog} onRequestClose={closeModalLog} style={customStyles} contentLabel="Add Log">
          
            <div className='flex items-center justify-between'>
            <h1 className="text-2xl font-bold text-sky-500 my-5"> Enter System Log </h1>
            <div>
              <FaTimes color={"red"} className="font-bold inline-block cursor-pointer" onClick={closeAddLog}/>
            </div>
            </div>
            

            <div className='form'>
                <form onSubmit={handleSubmit}>
                    <div className='form-group mb-5'>
                    <input type="text" name="message" id="message" value={formData.message} onChange={handleChange} className='w-full focus:outline-0 border-b-2 border-b-gray-500 pb-3 border-t-0 border-l-0 border-r-0' placeholder='Enter message...!'/>
                    </div>

                    <div className='form-group mb-5'>
                          <select name="technician" id="technician" value={formData.technician} onChange={handleChange} className="input input-lg w-full focus:outline-0 bg-slate-500 text-white my-10 cursor-pointer">
                            <option value={formData.technician} disabled> Select Technician </option>
                            {techs.map((tech) => (
                              <option value={`${tech.firstname} ${tech.lastname}`} key={tech._id}> {`${tech.firstname} ${tech.lastname}`}</option>
                            ))}
                        </select>
                    </div>

                    <div className='form-group mb-5'>
                        <input type="checkbox" name="attention" onChange={handleCheckBox} id="attention" className='cursor-pointer'/>
                        <label htmlFor='attention' className='text-xl text-black font-bold text-pink-300'> Needs Attention? </label>
                    </div>

                    <div className='form-group mb-5'>
                        <button type="submit" className='btn btn-lg w-full hover:bg-gray-500 bg-sky-600 focus:outline-0'> Enter </button>
                    </div>
                </form>
            </div>
        </Modal>

        {/* Add-Technician Modal */}

        <Modal isOpen={modalAddTech} onRequestClose={closeModalAdd} style={customStyles} contentLabel="Add Technician">
           
                <div className='text-right'>
                  <FaTimes className='inline-block text-right cursor-pointer' color={"pink"} onClick={closeModalAdd}/>
                </div>
           
            <h1 className='text-2xl font-bold text-sky-600 text-center'> New Technician </h1> 

            <div className='form'>
                <form onSubmit={handleSubmitAddTech}>
                    <div className='form-group flex flex-col my-6'>
                    <label htmlFor="firstname" className='mb-2 text-black font-bold text-xl'> First Name: </label>
                    <input type="text" name="firstname" id="firstname" value={addForm.firstname} onChange={handleChangeAddTech} className='pb-4 border-t-0 border-l-0 border-r-0 focus:outline-0 border-b-2 border-gray-600'/>
                    </div>

                    <div className='form-group flex flex-col mb-6'>
                    <label htmlFor="lastname" className='mb-2 text-black font-bold text-xl'> Last Name: </label>
                    <input type="text" name="lastname" id="lastname" value={addForm.lastname} onChange={handleChangeAddTech} className='pb-4 border-t-0 border-l-0 border-r-0 focus:outline-0 border-b-2 border-gray-600'/>
                    </div>

                    <div className='form-group'>
                      <button type='submit' className='w-full btn btn-lg bg-sky-600 focus:outline-0 hover:bg-slate-200'> Add Technician </button>
                    </div>
                </form>
            </div>
        </Modal>
        
        {/* Modal to show technician list */}
        <Modal isOpen={modalList} onRequestClose={closeModalList} style={customStyles} contentLabel="Add Technician">
                 <div className='text-right'>
                  <FaTimes className='inline-block text-right cursor-pointer' color={"pink"} onClick={closeModalList}/>
                </div>
            <h1 className='text-sky-500 font-bold text-3xl mb-5 text-center'> Technician List </h1>
            {techs.map((tech) => (
                <SingleTech key={tech._id} tech={tech}/>
            ))}
        </Modal>
    </div>

    {/* For Toast Functionality */}
    <ToastContainer />
    </>
  );
}

export default App;
