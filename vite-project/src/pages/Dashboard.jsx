import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CircularProgressBar from '../components/CircularProgressBar';
import NutritionCard from '../components/NutritionCard';
import AddFoodModal from '../components/AddFoodModal';

const Dashboard = () => {
  // State to manage foods added
  const [foods, setFoods] = useState([
    { foodName: 'Pineapple Slices', calories: 294, protein: 25, carbs: 21, fat: 15, mealType: 'Breakfast' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState('');

  // Calculate the total calories from all added foods
  const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0);

  // Maximum calorie goal
  const maxCalories = 650;

  const addFood = (newFood) => {
    // Update the foods array with the newly added food item
    setFoods([...foods, newFood]);
  };

  // Get the latest 3 added foods for the "Recently Added" section
  const recentlyAddedFoods = foods.slice(-3).reverse();

  // Filter foods based on the selected meal
  const filteredFoods = foods.filter((food) => food.mealType === selectedMeal);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-8 space-y-8">
        {/* Top Section: Progress Bar and Meal Options */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-8 lg:space-y-0 lg:space-x-8">
          {/* Left: Circular Progress */}
          <div className="flex flex-col items-center lg:items-start space-y-4">
            <h2 className="font-bold text-xl">Daily Nutrition Counter</h2>
            {/* Pass the dynamically calculated totalCalories to the progress bar */}
            <CircularProgressBar value={totalCalories} max={maxCalories} />
          </div>

          {/* Right: Meal Options */}
          <div className="flex-1 lg:ml-16">
            <h2 className="font-bold text-xl mb-4 text-center lg:text-left">ADD FOOD</h2>
            <div className="flex space-x-4 justify-center lg:justify-start">
              {['Breakfast', 'Lunch', 'Dinner'].map((meal) => (
                <button
                  key={meal}
                  onClick={() => setSelectedMeal(meal)}
                  className={`shadow-md p-3 rounded-full transition font-semibold text-md ${
                    selectedMeal === meal
                      ? 'bg-blue-500 text-white' // When selected: Blue background with white text
                      : 'bg-white text-gray-700' // When not selected: White background with dark text
                  } hover:bg-blue-50`}
                >
                  {meal}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recently Added Foods Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Recently Added Foods</h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-full hover:shadow-md"
            >
              Add Food
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentlyAddedFoods.map((food, index) => (
              <NutritionCard
                key={index}
                foodName={food.foodName}
                calories={food.calories}
                protein={food.protein}
                carbs={food.carbs}
                fat={food.fat}
              />
            ))}
          </div>
        </div>

        {/* Selected Meal Section */}
        {selectedMeal && (
          <div className="mt-8">
            <h4 className="font-bold text-xl mb-4">{selectedMeal} Foods</h4>
            <div className="space-y-4">
              {filteredFoods.length > 0 ? (
                filteredFoods.map((food, index) => (
                  <NutritionCard
                    key={index}
                    foodName={food.foodName}
                    calories={food.calories}
                    protein={food.protein}
                    carbs={food.carbs}
                    fat={food.fat}
                  />
                ))
              ) : (
                <p className="text-gray-600">No foods added for {selectedMeal} yet.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Food Modal */}
      <AddFoodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addFood}
      />
    </div>
  );
};

export default Dashboard;
