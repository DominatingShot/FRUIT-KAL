import React, { useState } from 'react';
import axios from 'axios';

const AddFoodModal = ({ isOpen, onClose, onSave }) => {
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [mealType, setMealType] = useState('Breakfast');
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10)); 
  const [time, setTime] = useState(new Date().toISOString().substr(11, 5)); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    if (foodName && calories && protein && carbs && fat && date && time) {
      const user_id = localStorage.getItem('userId'); 
      if (!user_id) {
        setError('User ID not found. Please log in again.');
        setIsSubmitting(false);
        return;
      }

      const newFood = {
        name: foodName,
        calories: parseInt(calories, 10),
        protein: parseInt(protein, 10),
        carbs: parseInt(carbs, 10),
        fat: parseInt(fat, 10),
        category: mealType,
        date: date,
        time: time,
        user_id: user_id
      };

      try {
        const response = await axios.post('http://127.0.0.1:5000/add-food', newFood);
        if (response.status === 201) {
          onSave(newFood); // Update the state in the Dashboard component
          onClose(); // Close the modal
        }
      } catch (err) {
        console.error('Error adding food:', err);
        setError('Error adding food. Please try again.');
      } finally {
        setIsSubmitting(false); // Reset submission status
      }
    } else {
      setError('Please fill out all fields.');
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Add New Food</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Food Name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Protein (g)"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Carbs (g)"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Fat (g)"
            value={fat}
            onChange={(e) => setFat(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />

          {/* Meal Type Selection */}
          <div className="mt-4">
            <label className="block font-semibold mb-2">Select Meal Type</label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>

          {/* Date Selection */}
          <div className="mt-4">
            <label className="block font-semibold mb-2">Select Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Time Selection */}
          <div className="mt-4">
            <label className="block font-semibold mb-2">Select Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
        </form>
        <div className="flex justify-end space-x-4 mt-6">
          <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 rounded-lg">
            Cancel
          </button>
          <button type="button" onClick={handleSave} className="py-2 px-4 bg-blue-500 text-white rounded-lg" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Food'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFoodModal;
