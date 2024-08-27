import React from 'react';
import MealCard from '../components/MealCard';

const LunchPage = ({ foods }) => {
  const lunchFoods = foods.filter(food => food.mealType === 'Lunch');

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lunch</h2>
      {lunchFoods.length > 0 ? (
        <div className="space-y-4">
          <MealCard mealType="Lunch" foods={lunchFoods} />
        </div>
      ) : (
        <p className="text-gray-600">No foods added for lunch yet.</p>
      )}
    </div>
  );
};

export default LunchPage;
