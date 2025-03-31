import { toast } from "react-toastify";
// **Handle API Errors**
export const handleError = (error) => {
   if (error.response) {
      toast.error(error.response.data.message || "Something went wrong!");
   } else if (error.request) {
      toast.error("No response from server. Please check your internet connection.");
   } else {
      toast.error("An unexpected error occurred.");
   }
};