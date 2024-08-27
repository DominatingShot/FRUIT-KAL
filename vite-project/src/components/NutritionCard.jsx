import React from 'react';

const NutritionCard = ({ name, calories, protein, carbs, fat }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-gray-600">{calories} kcal</p>
      </div>
      <div className="flex space-x-4 text-gray-700">
        <div className="text-sm">
          <p>Protein</p>
          <p>{protein}g</p>
        </div>
        <div className="text-sm">
          <p>Carbs</p>
          <p>{carbs}g</p>
        </div>
        <div className="text-sm">
          <p>Fat</p>
          <p>{fat}g</p>
        </div>
      </div>
    </div>
  );
};

export default NutritionCard;
