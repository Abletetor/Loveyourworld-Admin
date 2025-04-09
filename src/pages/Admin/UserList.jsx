import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import LottieLoader from "../../components/LottieLoader";
import { MdChevronLeft, MdChevronRight, MdDelete, MdVisibility } from "react-icons/md";
import { FaLock, FaUnlock } from "react-icons/fa";
import { toast } from "react-toastify";

const UserList = () => {
   const { aToken, users, pagination, getAllUsers } = useContext(AdminContext);
   const [loading, setLoading] = useState(true);
   const limit = 5;

   useEffect(() => {
      if (aToken) {
         setLoading(true);
         getAllUsers(pagination.currentPage, limit).finally(() => setLoading(false));
      }
   }, [aToken]);

   const handlePageChange = (page) => {
      setLoading(true);
      getAllUsers(page, pagination.pageSize).finally(() => setLoading(false));
   };

   // Dummy action handlers (replace with actual logic later)
   const handleView = (user) => {
      toast.info(`Viewing profile of ${user.name}`);
   };

   const handleToggleBlock = (user) => {
      const action = user.isBlocked ? "Unblocked" : "Blocked";
      toast.success(`${user.name} has been ${action}`);
   };

   const handleDelete = (user) => {
      toast.warn(`Deleted ${user.name}`);
   };

   if (loading) {
      return <LottieLoader message="Loading Users..." size="w-100 h-100" />;
   }

   return (
      <div className="m-5 max-h-[90vh] overflow-y-scroll">
         <h1 className="text-lg font-semibold text-[#008080] mb-6">All Users</h1>

         <div className="w-full overflow-x-auto rounded-xl border border-[#B2DFDB] shadow">
            <table className="w-full text-sm text-left bg-white">
               <thead className="bg-[#E0F2F1] text-[#008080] uppercase tracking-wide text-xs">
                  <tr>
                     <th className="px-6 py-4">Profile</th>
                     <th className="px-6 py-4">Name</th>
                     <th className="px-6 py-4">Email</th>
                     <th className="px-6 py-4">Joined On</th>
                     <th className="px-6 py-4">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  { users.reverse().map((user, index) => (
                     <tr
                        key={ index }
                        className="border-t transition-all duration-200 hover:bg-[#f7faf9]"
                     >
                        <td className="px-6 py-4">
                           <img
                              src={ user.image || "/default-user.png" }
                              alt="User"
                              className="w-10 h-10 rounded-full object-cover border border-[#B2DFDB]"
                           />
                        </td>
                        <td className="px-6 py-4 font-medium text-[#4A4A4A]">{ user.name }</td>
                        <td className="px-6 py-4 text-[#4A4A4A]">{ user.email }</td>
                        <td className="px-6 py-4 text-[#4A4A4A]">
                           { user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A" }
                        </td>

                        <td className="px-6 py-4 flex gap-3 items-center">
                           <button
                              onClick={ () => handleView(user) }
                              className="text-[#008080] hover:bg-[#E0F2F1] p-2 rounded-full"
                              title="View"
                           >
                              <MdVisibility size={ 18 } />
                           </button>
                           <button
                              onClick={ () => handleToggleBlock(user) }
                              className={ `${user.isBlocked ? "text-red-500" : "text-green-600"
                                 } hover:bg-[#F1F8F6] p-2 rounded-full` }
                              title={ user.isBlocked ? "Unblock" : "Block" }
                           >
                              { user.isBlocked ? <FaUnlock size={ 16 } /> : <FaLock size={ 16 } /> }
                           </button>
                           <button
                              onClick={ () => handleDelete(user) }
                              className="text-red-600 hover:bg-[#FCEAEA] p-2 rounded-full"
                              title="Delete"
                           >
                              <MdDelete size={ 18 } />
                           </button>
                        </td>
                     </tr>
                  )) }
               </tbody>
            </table>
         </div>

         {/* Pagination Controls */ }
         <div className="flex justify-center items-center gap-4 mt-6">
            <button
               onClick={ () => handlePageChange(pagination.currentPage - 1) }
               disabled={ pagination.currentPage === 1 }
               className="text-[#008080] hover:bg-[#E0F2F1] px-3 py-1 rounded-full disabled:opacity-50"
            >
               <MdChevronLeft size={ 20 } />
            </button>
            <p className="text-sm text-[#4A4A4A]">
               Page <strong>{ pagination.currentPage }</strong> of{ " " }
               <strong>{ pagination.totalPages }</strong>
            </p>
            <button
               onClick={ () => handlePageChange(pagination.currentPage + 1) }
               disabled={ pagination.currentPage === pagination.totalPages }
               className="text-[#008080] hover:bg-[#E0F2F1] px-3 py-1 rounded-full disabled:opacity-50"
            >
               <MdChevronRight size={ 20 } />
            </button>
         </div>
      </div>
   );
};

export default UserList;
