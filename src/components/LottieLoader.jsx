import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loader.json";

const LottieLoader = ({ size = "w-28 h-28", message = "Loading..." }) => {
   return (
      <div className="flex flex-col justify-center items-center w-full min-h-[200px]">
         <Lottie animationData={ loadingAnimation } loop={ true } className={ size } />
         <p className="text-gray-600 text-sm mt-2">{ message }</p>
      </div>
   );
};

export default LottieLoader;
