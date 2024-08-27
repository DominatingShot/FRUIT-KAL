import React from 'react';

const MealCard = ({ mealName }) => {
  return (
    <button className="bg-white shadow-lg p-4 rounded-lg hover:bg-gray-100 transition font-semibold text-lg">
      {mealName}
    </button>
  );
};

export default MealCard;
