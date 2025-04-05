import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import LottieLoader from '../../components/LottieLoader';
import { toast } from 'react-toastify';


const Messages = () => {

   const { getAllMessages, dashMessages, aToken, replyToMessage, deleteMessageById } = useContext(AdminContext);

   const [replyModal, setReplyModal] = useState(null);
   const [subject, setSubject] = useState('');
   const [replyText, setReplyText] = useState('');
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if (aToken) {
         setLoading(true);
         getAllMessages().finally(() => setLoading(false));
      }
   }, [aToken]);

   // **Handle Delete button**
   const handleDelete = async (id) => {
      await deleteMessageById(id);
      getAllMessages();
   };

   // **Handle Reply button**
   const handleReply = async (id) => {
      if (!subject || !replyText) return toast.error("Please fill all fields");
      await replyToMessage(id, subject, replyText);
      setReplyModal(null);
      setSubject('');
      setReplyText('');
   };


   if (loading) {
      return (
         <LottieLoader message="Loading Messages..." size="w-100 h-100" />
      );
   }

   return (
      dashMessages && (
         <div className="p-5 md:px-10 lg:px-20">
            <h2 className="text-2xl font-semibold text-[#008080] mb-6">Contact Form Messages</h2>

            { dashMessages.length === 0 ? (
               <p className="text-[#4A4A4A]">No messages yet.</p>
            ) : (
               <div className="space-y-5">
                  { dashMessages.map((msg) => (
                     <div
                        key={ msg._id }
                        className="w-full border border-[#B2DFDB] p-4 rounded-md shadow-sm bg-[#E0F2F1]"
                     >
                        <p className="text-sm text-[#4A4A4A] mt-1">
                           <strong className='text-[#008080] text-lg font-medium'>Name:</strong> { msg.name }
                        </p>
                        <p className="text-sm text-[#4A4A4A] mt-1">
                           <strong className='text-[#008080] text-lg font-medium'>Email:</strong> { msg.email }
                        </p>
                        <p className="text-sm text-[#4A4A4A] mt-1">
                           <strong className='text-[#008080] text-lg font-medium'>Message:</strong> { msg.message }
                        </p>
                        <p className="text-sm text-[#4A4A4A] mt-1">
                           <strong className='text-[#008080] text-lg font-medium'>Date:</strong> { new Date(msg.createdAt).toLocaleString() }
                        </p>

                        <div className="flex gap-4 mt-4">
                           <button
                              onClick={ () => handleDelete(msg._id) }
                              className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600 cursor-pointer"
                           >
                              Delete
                           </button>
                           <button
                              onClick={ () => setReplyModal(msg._id) }
                              className="bg-[#008080] text-white px-4 py-1 rounded-full hover:bg-[#006666] cursor-pointer"
                           >
                              Reply
                           </button>
                        </div>

                        { replyModal === msg._id && (
                           <div className="mt-4 p-4 bg-white border border-[#B2DFDB] rounded">
                              <input
                                 type="text"
                                 value={ subject }
                                 onChange={ (e) => setSubject(e.target.value) }
                                 placeholder="Subject"
                                 className="w-full mb-2 p-2 border rounded"
                              />
                              <textarea
                                 value={ replyText }
                                 onChange={ (e) => setReplyText(e.target.value) }
                                 rows={ 4 }
                                 placeholder="Reply message..."
                                 className="w-full p-2 border rounded"
                              />
                              <div className="flex justify-end mt-2 gap-2">
                                 <button onClick={ () => setReplyModal(null) } className="text-gray-600 px-4 py-1">Cancel</button>
                                 <button onClick={ () => handleReply(msg._id) } className="bg-[#008080] text-white px-4 py-1 rounded hover:bg-[#006666] cursor-pointer">Send Reply</button>
                              </div>
                           </div>
                        ) }
                     </div>
                  )) }
               </div>
            ) }
         </div>
      )
   );

};

export default Messages;
