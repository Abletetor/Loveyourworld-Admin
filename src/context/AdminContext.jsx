import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { handleError } from "../hooks/handleError";


export const AdminContext = createContext();

const AdminContextProvider = (props) => {

   const backendUrl = import.meta.env.VITE_BACKEND_URL;
   const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : "");
   const [doctors, setDoctors] = useState([]);
   const [users, setUsers] = useState([]);
   const [appointments, setAppointments] = useState([]);
   const [dashData, setDashData] = useState(false);
   const [dashMessages, setDashMessages] = useState(false);

   // pagination state
   const [pagination, setPagination] = useState({
      totalDocs: 0,
      totalPages: 0,
      currentPage: 1,
      pageSize: 10
   });

   // **Get All Doctors (Admin with Pagination)**
   const getAllDoctors = async (page = 1, limit = 10) => {
      try {
         const { data } = await axios.get(
            `${backendUrl}/api/admin/all-doctors?page=${page}&limit=${limit}`,
            {
               headers: { Authorization: `Bearer ${aToken}` }
            }
         );

         if (data.success) {
            setDoctors(data.doctors);
            setPagination(data.pagination);
         } else {
            toast.error(data.message);
         }
      } catch (error) {
         handleError(error);
      }
   };

   // Get All Users
   const getAllUsers = async (page = 1, limit = 5) => {
      try {
         const { data } = await axios.get(
            `${backendUrl}/api/admin/all-users?page=${page}&limit=${limit}`,
            {
               headers: { Authorization: `Bearer ${aToken}` }
            }
         );

         if (data.success) {
            setUsers(data.users);
            setPagination(data.pagination);
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
         const { data } = await axios.post(`${backendUrl}/api/admin/change-availability`, { docId }, { headers: { Authorization: `Bearer ${aToken}` } });

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
         const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, { headers: { Authorization: `Bearer ${aToken}` } });

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
         const { data } = await axios.post(`${backendUrl}/api/admin/cancel-appointment`, { appointmentId }, { headers: { Authorization: `Bearer ${aToken}` } });
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
         const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, { headers: { Authorization: `Bearer ${aToken}` } });
         data.success ? setDashData(data.dashData) : toast.error(data.message);
      } catch (error) {
         handleError(error);
      }
   };

   // **Get All Messages**
   const getAllMessages = async () => {
      try {
         const { data } = await axios.get(`${backendUrl}/api/admin/messages`, { headers: { Authorization: `Bearer ${aToken}` } });
         data.success ? setDashMessages(data.messages) : toast.error(data.message);
      } catch (error) {
         handleError(error);
      }
   };

   // **Delete Message**
   const deleteMessageById = async (id) => {
      try {
         const { data } = await axios.delete(`${backendUrl}/api/admin/messages/${id}`, { headers: { Authorization: `Bearer ${aToken}` } });
         data.success ? toast.success(data.message) : toast.error(data.message);
      } catch (error) {
         handleError(error);
         console.log(error);
      }
   };

   // **Reply to Message**
   const replyToMessage = async (id, subject, replyText) => {
      try {
         const { data } = await axios.post(`${backendUrl}/api/admin/messages/reply/${id}`, { subject, replyText }, { headers: { Authorization: `Bearer ${aToken}` } });
         data.success ? toast.success(data.message) : toast.error(data.message);
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
      getAllMessages, dashMessages, setDashMessages,
      replyToMessage, deleteMessageById,
      pagination, getAllUsers, users,
   };

   return (
      <AdminContext.Provider value={ value }>
         { props.children }
      </AdminContext.Provider>
   );
};

export default AdminContextProvider;