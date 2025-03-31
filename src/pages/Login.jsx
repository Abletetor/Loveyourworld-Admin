import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { handleError } from '../hooks/handleError';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {

   const { setAToken, backendUrl } = useContext(AdminContext);
   const { setDToken } = useContext(DoctorContext);

   const [state, setState] = useState("Admin");
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(false);

   // **Form submission handler**
   const onSubmitHandler = async (e) => {
      e.preventDefault();

      if (loading) return;

      try {

         setLoading(true);

         if (state === "Admin") {
            const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });

            if (data.success) {
               localStorage.setItem("aToken", data.token);
               setAToken(data.token);
               toast.success("Login successful!");
            } else {
               toast.error(data.message || "An error occurred");
            }
         } else {
            const { data } = await axios.post(`${backendUrl}/api/doctor/login`, { email, password });

            if (data.success) {
               localStorage.setItem("dToken", data.token);
               setDToken(data.token);
               toast.success("Login successful!");
               console.log(data.token);
            }
         }

      } catch (error) {
         handleError(error);
      } finally {
         setLoading(false);
      }
   };

   return (
   <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center justify-center">
      <div className="flex flex-col gap-4 p-8 min-w-[340px] sm:min-w-96 border border-[#B2DFDB] rounded-xl bg-[#E0F2F1] text-[#4A4A4A] text-sm shadow-md">
         <p className="text-2xl font-semibold text-[#008080]">{ state } Login</p>
         <p className="text-[#4A4A4A]">Log in to manage the system</p>

         <div className="w-full">
            <label className="font-medium text-[#4A4A4A]">Email</label>
            <input
               className="border border-[#B2DFDB] rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#008080]"
               type="email"
               onChange={(e) => setEmail(e.target.value)}
               value={email}
               required
            />
         </div>

         <div className="w-full">
            <label className="font-medium text-[#4A4A4A]">Password</label>
            <input
               className="border border-[#B2DFDB] rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#008080]"
               type="password"
               onChange={(e) => setPassword(e.target.value)}
               value={password}
               required
            />
         </div>

         <button
            type="submit"
            className={`w-full bg-[#008080] py-2 rounded-md text-base text-white cursor-pointer transition-all duration-300 hover:bg-[#006666] hover:scale-105 ${
               loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
         >
            {loading ? "Logging in..." : "Login"}
         </button>

         {state === "Admin" ? (
            <p>
               Doctor Login?{" "}
               <span
                  onClick={() => setState("Doctor")}
                  className="text-[#008080] font-medium cursor-pointer hover:underline"
               >
                  Click here
               </span>
            </p>
         ) : (
            <p>
               Admin Login?{" "}
               <span
                  onClick={() => setState("Admin")}
                  className="text-[#008080] font-medium cursor-pointer hover:underline"
               >
                  Click here
               </span>
            </p>
         )}
      </div>
   </form>
);
};

export default Login;
