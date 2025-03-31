import { useState, createContext } from "react";
import axios from 'axios';
import { handleError } from "../hooks/handleError";
import { toast } from 'react-toastify';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

   const backendUrl = import.meta.env.VITE_BACKEND_URL;
   const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : "");
   const [appointments, setAppointments] = useState([]);
   const [dashData, setDashData] = useState(false);
   const [profileData, setProfileData] = useState(false);

   // ** Get Appointments**
   const getDoctorAppointments = async () => {
      try {
         const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, { headers: { dToken } });

         if (data.success) {
            setAppointments(data.appointments);
         } else {
            toast.error(data.message);
         }
      } catch (error) {
         handleError(error);
      }
   };

   // **Complete Appointment**
   const completeAppointment = async (appointmentId) => {
      try {
         const { data } = await axios.post(`${backendUrl}/api/doctor/complete-appointment`, { appointmentId }, { headers: { dToken } });

         if (data.success) {
            toast.success(data.message);
            getDoctorAppointments();
         } else {
            toast.error(data.message);
         }
      } catch (error) {
         handleError(error);
      }
   };

   // **Cancel Appointment**
   const cancelAppointment = async (appointmentId) => {
      try {
         const { data } = await axios.post(`${backendUrl}/api/doctor/cancel-appointment`, { appointmentId }, { headers: { dToken } });

         if (data.success) {
            toast.success(data.message);
            getDoctorAppointments();
         }
      } catch (error) {
         handleError(error);
      }
   };

   // **Get Dashboard Data**
   const getDashboardData = async () => {
      try {
         const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, { headers: { dToken } });
         data.success ? setDashData(data.dashData) : toast.error(data.message);
      } catch (error) {
         handleError(error);
      }
   };

   // **Get Doctor Profile**
   const getDoctorProfile = async () => {
      try {

         const { data } = await axios.get(`${backendUrl}/api/doctor/profile`, { headers: { dToken } });

         if (data.success) {
            setProfileData(data.profileData);
         }
      } catch (error) {
         handleError(error);
      }
   };
   const value = {
      backendUrl, dToken, setDToken,
      appointments, setAppointments, getDoctorAppointments,
      completeAppointment, cancelAppointment,
      getDashboardData, dashData, setDashData,
      getDoctorProfile, profileData, setProfileData,
   };

   return (
      <DoctorContext.Provider value={ value }>
         { props.children }
      </DoctorContext.Provider>
   );
};

export default DoctorContextProvider;