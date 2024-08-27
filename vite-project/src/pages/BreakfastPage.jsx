import React from 'react';
import MealCard from '../components/MealCard';

const BreakfastPage = ({ foods }) => {
  const breakfastFoods = foods.filter(food => food.mealType === 'Breakfast');

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Breakfast</h2>
      {breakfastFoods.length > 0 ? (
        <div className="space-y-4">
          <MealCard mealType="Breakfast" foods={breakfastFoods} />
        </div>
      ) : (
        <p className="text-gray-600">No foods added for breakfast yet.</p>
      )}
    </div>
  );
};

export default BreakfastPage;
