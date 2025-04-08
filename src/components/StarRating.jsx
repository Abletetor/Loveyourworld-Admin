import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
   const fullStars = Math.floor(rating);
   const hasHalfStar = rating - fullStars >= 0.5;

   return (
      <div className="flex items-center gap-1">
         { [...Array(5)].map((_, i) => (
            <FaStar
               key={ i }
               size={ 16 }
               color={
                  i < fullStars
                     ? '#FF6600'
                     : i === fullStars && hasHalfStar
                        ? '#FF660080'
                        : '#ccc'
               }
            />
         )) }
         <span className="text-xs text-[#4A4A4A] ml-1">({ rating?.toFixed(1) || '0.0' })</span>
      </div>
   );
};


export default StarRating;