import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

   const currencySymbol = '$';

   // **Calculate Age**
   const calculateAge = (dob) => {
      if (!dob) return "None";

      const birthdate = new Date(dob);
      if (isNaN(birthdate.getTime())) return "None";

      const today = new Date();
      let age = today.getFullYear() - birthdate.getFullYear();

      // Optional: adjust for month/day not reached yet
      const m = today.getMonth() - birthdate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
         age--;
      }

      return age;
   };


   // **Date Formater**
   const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

   const slotDateFormat = (slotDate) => {
      const dateArray = slotDate.split('-');
      return `${dateArray[0]} - ${months[Number(dateArray[1])]} - ${dateArray[2]}`;
   };

   const value = {
      currencySymbol,
      calculateAge,
      slotDateFormat
   };

   return (
      <AppContext.Provider value={ value }>
         { props.children }
      </AppContext.Provider>
   );
};

export default AppContextProvider;