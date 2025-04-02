import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {

   const [loading, setLoading] = useState(false);
   const [docImg, setDocImg] = useState(false);
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [experience, setExperience] = useState('');
   const [fees, setFees] = useState('');
   const [about, setAbout] = useState('');
   const [speciality, setSpeciality] = useState('');
   const [degree, setDegree] = useState('');
   const [address1, setAddress1] = useState('');
   const [address2, setAddress2] = useState('');

   const { backendUrl, aToken } = useContext(AdminContext);

   // Handle form Submision
   const onSubmitHandler = async (e) => {
      e.preventDefault();

      if (loading) return;

      try {
         setLoading(true);

         if (!docImg) {
            return toast.error("Image Not Selected");
         }

         // Create new form Data
         const formData = new FormData();
         formData.append("image", docImg);
         formData.append("name", name);
         formData.append("email", email);
         formData.append("password", password);
         formData.append("experience", experience);
         formData.append("fees", Number(fees));
         formData.append("about", about);
         formData.append("speciality", speciality);
         formData.append("degree", degree);
         formData.append("address", JSON.stringify({ line1: address1, line: address2 }));

         const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, { headers: { Authorization: `Bearer ${aToken}` } });

         if (data.success) {
            toast.success(data.message);

            // Clear Inputs After Submission
            setDocImg(false);
            setName("");
            setEmail("");
            setPassword("");
            setExperience("");
            setFees("");
            setAbout("");
            setSpeciality('');
            setDegree("");
            setAddress1("");
            setAddress2("");
         } else {
            toast.error(data.message);
         }

      } catch (error) {
         toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
         setLoading(false);
      }
   };

   return (
      <form onSubmit={ onSubmitHandler } className="m-5 w-full">
         <p className="mb-3 text-lg font-medium text-[#008080]">Add Doctor</p>

         <div className="bg-white px-8 py-8 border border-[#B2DFDB] rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
            {/* Upload Image Section */ }
            <div className="flex items-center gap-4 mb-8 text-[#4A4A4A]">
               <label htmlFor="doc-img">
                  <img
                     className="w-16 bg-[#E0F2F1] border border-[#B2DFDB] rounded-full cursor-pointer"
                     src={ docImg ? URL.createObjectURL(docImg) : assets.upload_area }
                     alt="upload-area"
                  />
               </label>
               <input onChange={ (e) => setDocImg(e.target.files[0]) } type="file" id="doc-img" hidden />
               <p>Upload doctor <br /> picture</p>
            </div>

            <div className="flex flex-col lg:flex-row items-start gap-10 text-[#4A4A4A]">
               {/* Left Inputs */ }
               <div className="w-full lg:flex-1 flex flex-col gap-4">
                  <div className="flex-1 flex flex-col gap-1">
                     <p>Doctor name</p>
                     <input onChange={ (e) => setName(e.target.value) } value={ name } className="border border-[#B2DFDB] rounded py-2 px-3" type="text" placeholder="Name" required />
                  </div>

                  <div className="flex-1 flex flex-col gap-4">
                     <p>Doctor Email</p>
                     <input onChange={ (e) => setEmail(e.target.value) } value={ email } className="border border-[#B2DFDB] rounded py-2 px-3" type="email" placeholder="Email" required />
                  </div>

                  <div className="flex-1 flex flex-col gap-4">
                     <p>Doctor Password</p>
                     <input onChange={ (e) => setPassword(e.target.value) } value={ password } className="border border-[#B2DFDB] rounded py-2 px-3" type="password" placeholder="Password" required />
                  </div>

                  <div className="flex-1 flex flex-col gap-4">
                     <p>Experience</p>
                     <select onChange={ (e) => setExperience(e.target.value) } value={ experience } className="border border-[#B2DFDB] rounded py-2 px-3">
                        <option value="">Select Years</option>
                        { [...Array(10)].map((_, i) => (
                           <option key={ i } value={ `${i + 1} Year` }>{ `${i + 1} Year` }</option>
                        )) }
                     </select>
                  </div>

                  <div className="flex-1 flex flex-col gap-4">
                     <p>Fees</p>
                     <input onChange={ (e) => setFees(e.target.value) } value={ fees } className="border border-[#B2DFDB] rounded py-2 px-3" type="number" min={ 1 } placeholder="Fees" required />
                  </div>
               </div>

               {/* Right Inputs */ }
               <div className="w-full lg:flex-1 flex flex-col gap-4">
                  <div className="flex-1 flex flex-col gap-4">
                     <p>Speciality</p>
                     <select onChange={ (e) => setSpeciality(e.target.value) } value={ speciality } className="border border-[#B2DFDB] rounded py-2 px-3">
                        <option value="">Select Speciality</option>
                        { ["General physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"].map((spec) => (
                           <option key={ spec } value={ spec }>{ spec }</option>
                        )) }
                     </select>
                  </div>

                  <div className="flex-1 flex flex-col gap-4">
                     <p>Education</p>
                     <input onChange={ (e) => setDegree(e.target.value) } value={ degree } className="border border-[#B2DFDB] rounded py-2 px-3" type="text" placeholder="Education" required />
                  </div>

                  <div className="flex-1 flex flex-col gap-4">
                     <p>Address</p>
                     <input onChange={ (e) => setAddress1(e.target.value) } value={ address1 } className="border border-[#B2DFDB] rounded py-2 px-3" type="text" placeholder="Address 1" required />
                     <input onChange={ (e) => setAddress2(e.target.value) } value={ address2 } className="border border-[#B2DFDB] rounded py-2 px-3" type="text" placeholder="Address 2" required />
                  </div>
               </div>
            </div>

            {/* About Doctor */ }
            <div className="flex-1 flex flex-col gap-4">
               <p className="mt-4 mb-2">About Doctor</p>
               <textarea onChange={ (e) => setAbout(e.target.value) } value={ about } className="border border-[#B2DFDB] rounded py-2 px-3" placeholder="Write about doctor..." rows={ 5 }></textarea>
            </div>

            {/* Submit Button */ }
            <button
               type="submit"
               className={ `bg-[#008080] px-10 py-3 mt-4 text-white rounded-full cursor-pointer hover:bg-[#006666] hover:scale-105 transition-all duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}` }
               disabled={ loading }
            >
               { loading ? "Adding..." : "Add Doctor" }
            </button>
         </div>
      </form>
   );
};

export default AddDoctor;
