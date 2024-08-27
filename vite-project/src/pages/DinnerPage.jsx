import React from 'react';
import MealCard from '../components/MealCard';

const DinnerPage = ({ foods }) => {
  const dinnerFoods = foods.filter(food => food.mealType === 'Dinner');

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Dinner</h2>
      {dinnerFoods.length > 0 ? (
        <div className="space-y-4">
          <MealCard mealType="Dinner" foods={dinnerFoods} />
        </div>
      ) : (
        <p className="text-gray-600">No foods added for dinner yet.</p>
      )}
    </div>
  );
};

export default DinnerPage;
