
import { useState } from 'react';
import './App.css';
import emailIcon from './assets/Images/Email2.png';
import eyeIcon from './assets/Images/eye.png'
import eyeCloseIcon from './assets/Images/eyeClose.png'
import Rectangle from './components/Background';






function App() {
  const [show, setShow] = useState(true);
  const [status,setStatus]=useState(false);
  const [userData, setUserData] = useState({ fullName: "", email: "", password: "", againPassword: "" })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((pre) => ({ ...pre, [name]: value }))
  }


  const handleSubmit = async (e) => {
    const {name,email, password} = userData
    e.preventDefault();
    for (let key in userData) {
      if (userData[key] === "") {
        alert("All fields are mondatory");
        return;
      }
    }
    if(userData.password.length<6)
      {
        alert("Passward must greater than 6 characters");
        return;
      }
    if (userData.password !== userData.againPassword) {
      alert("Password must be same");
      return;
    }
    

    try {
      const savedData = await fetch('http://localhost:4000/api/createuser', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name : userData.fullName ,email : userData.email ,password : userData.password})
      });
       setUserData({ fullName: "", email: "", password: "", againPassword: "" })
       setStatus({status:true,text:"Form submitted successflly"})
    } catch (error) {
      setStatus({status:false,text:"Not submitted. Please try again"})
      console.log("Error in saving data",error.message)
    }

  }
  return (
    <>
      <div className='absolute -z-10'>
        <Rectangle/>
      </div>
      {status && <div>
      <div className={`text-center  py-4 absolute w-full text-2xl ${status.status?"bg-green-500":"bg-red-500"}`}>
         {status.text}
      </div>
      <button onClick={()=>{setStatus(false)}} className='text-2xl font-bold top-3 absolute right-4'>X</button>
      </div>}
      <div className="h-screen w-screen border-2 flex justify-center items-center ">
        <form onSubmit={handleSubmit}>
          <div className="innerDiv my-0 py-10 px-32  rounded-3xl">
            <h1 className="text-2xl  text-center  mb-8 font-extrabold">Signup</h1>
            <div className="bg-white  flex mb-6  rounded-3xl overflow-hidden px-4 py-2">
              <label htmlFor="name">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd" />
                </svg>
              </label>
              <input value={userData.fullName} onChange={handleChange} className="ml-2 w-72 bg-transparent outline-none  font-semibold" id="name" name="fullName" type="text" placeholder="Full Name " />
            </div>
            <div className="bg-white flex  mb-6  rounded-3xl overflow-hidden px-4 py-2">
              <label htmlFor="email">
                <img src={emailIcon} alt="" className="w-6 h-6" />
              </label>
              <input value={userData.email} onChange={handleChange} className="ml-2 w-72 bg-transparent outline-none font-semibold" name="email" id="email" type="email" placeholder="Email ID " />
            </div>
            <div className="bg-white flex  mb-6  rounded-3xl overflow-hidden px-4 py-2">
              <label htmlFor="password">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clipRule="evenodd" />
                </svg>
              </label>
              <input value={userData.password} onChange={handleChange} id="password" name="password" className="ml-2 w-72 bg-transparent outline-none font-semibold" type="password" placeholder="Create a Password " />
            </div>
            <div className="bg-white flex  mb-6  rounded-3xl overflow-hidden px-4 py-2">

              <input value={userData.againPassword} onChange={handleChange} className="ml-2 w-72 outline-none bg-transparent font-semibold" type={show ? "password" : "text"} name="againPassword" placeholder="Confirm Password " />
              {!show && <img onClick={() => { setShow(!show) }} src={eyeIcon} alt="" className="w-6 h-6" />}
              {show && <img onClick={() => { setShow(!show) }} src={eyeCloseIcon} alt="" className="w-6 h-6" />}
            </div>
            <div className="text-center">
              <button className="signBTN font-bold  px-6 py-1 text-white rounded-md mb-2">Signup</button>
            </div>
            <div className="flex justify-center">
              <p className="font-semibold">Already have an Account? </p>
              <a href="" className="text-red-600 underline font-semibold">Login</a>
            </div>


          </div>
        </form>

      </div>
    </>
  );
}

export default App;
