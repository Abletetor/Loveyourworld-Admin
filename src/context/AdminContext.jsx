import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { handleError } from "../hooks/handleError";


export const AdminContext = createContext();

const AdminContextProvider = (props) => {

   const backendUrl = import.meta.env.VITE_BACKEND_URL;
   const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : "");
   const [doctors, setDoctors] = useState([]);
   const [appointments, setAppointments] = useState([]);
   const [dashData, setDashData] = useState(false);

   // **Get All Doctors**
   const getAllDoctors = async () => {

      try {
         const { data } = await axios.post(`${backendUrl}/api/admin/all-doctors`, {}, { headers: { aToken } });

         if (data.success) {
            setDoctors(data.doctors);
         } else {
            toast.error(data.message);
         }

      } catch (error) {
         handleError(error);
      }
   };

   // ** Change Availability Status**
   const changeAvailabilty = async (docId) => {

      try {
         const { data } = await axios.post(`${backendUrl}/api/admin/change-availability`, { docId }, { headers: { aToken } });

         if (data.success) {
            toast.success(data.message);
            getAllDoctors();
         } else {
            toast.error(data.message);
         }

      } catch (error) {
         handleError(error);
      }
   };

   // **Get All Appointment**
   const getAllAppointment = async () => {

      try {
         const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, { headers: { aToken } });

         if (data.success) {
            setAppointments(data.appointments);
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
         const { data } = await axios.post(`${backendUrl}/api/admin/cancel-appointment`, { appointmentId }, { headers: { aToken } });
         if (data.success) {
            toast.success(data.message);
            getAllAppointment();
         } else {
            toast.error(data.message);
         }
      } catch (error) {
         handleError(error);
      }
   };

   // **Get Dashboard Data**
   const getDashboardData = async () => {
      try {
         const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, { headers: { aToken } });
         if (data.success) {
            setDashData(data.dashData);
         } else {
            toast.error(data.message);
         }
      } catch (error) {
         handleError(error);
      }
   };

   const value = {
      aToken, setAToken,
      backendUrl, doctors,
      getAllDoctors, changeAvailabilty,
      appointments, setAppointments,
      getAllAppointment, cancelAppointment,
      getDashboardData, dashData, setDashData,
   };

   return (
      <AdminContext.Provider value={ value }>
         { props.children }
      </AdminContext.Provider>
   );
};

export default AdminContextProvider;