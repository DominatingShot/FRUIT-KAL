import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import CircularProgressBar from '../components/CircularProgressBar';
import NutritionCard from '../components/NutritionCard';
import AddFoodModal from '../components/AddFoodModal';

const Dashboard = () => {
  const [foods, setFoods] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState('');

  // Get the user ID from localStorage
  const userId = localStorage.getItem('userId');

  // Fetch foods from the backend when the component mounts
  useEffect(() => {
    if (userId) {
      axios.get(`http://127.0.0.1:5000/get_foods/${userId}`)
        .then(response => {
          setFoods(response.data);
        })
        .catch(error => {
          console.error('Error fetching food data:', error);
        });
    }
  }, [userId]);

  // Calculate the total calories from all added foods
  const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0);

  // Maximum calorie goal
  const maxCalories = 650;

  const addFood = (newFood) => {
    if (userId) {
      axios.post('http://127.0.0.1:5000/add-food', { ...newFood, user_id: userId })
        .then(() => {
          axios.get(`http://127.0.0.1:5000/get_foods/${userId}`)
            .then(response => {
              setFoods(response.data);
            })
            .catch(error => {
              console.error('Error fetching food data:', error);
            });
        })
        .catch(error => {
          console.error('Error adding food item:', error);
        });
    }
  };

  // Get the latest 3 added foods for the "Recently Added" section
  const recentlyAddedFoods = foods.slice(-3).reverse();

  // Filter foods based on the selected meal
  const filteredFoods = foods.filter((food) => food.category === selectedMeal);

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
                    selectedMeal === meal ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
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
                foodName={food.name}
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
                    foodName={food.name}
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
