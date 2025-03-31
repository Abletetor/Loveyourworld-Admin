import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

   const currencySymbol = '$';
   // **Calculate Age**
   const calculateAge = (dob) => {
      const today = new Date();
      const birthdate = new Date(dob);

      let age = today.getFullYear() - birthdate.getFullYear();
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