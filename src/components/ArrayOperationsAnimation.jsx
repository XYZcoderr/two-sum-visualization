import React, { useState } from 'react';
import { AlertCircle, PlusCircle, MinusCircle, Search, RefreshCw } from 'lucide-react';

const ArrayOperationsAnimation = () => {
  const [basket, setBasket] = useState([1, 2, 3, 4, 5]);
  const [message, setMessage] = useState('');
  const [searchNumber, setSearchNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [addNumber, setAddNumber] = useState('');
  const [updateIndex, setUpdateIndex] = useState('');
  const [updateValue, setUpdateValue] = useState('');
  const [deleteIndex, setDeleteIndex] = useState('');

  const addBall = () => {
    if (addNumber !== '') {
      const newBall = parseInt(addNumber);
      setBasket([...basket, newBall]);
      setMessage(`Added ${newBall} to the basket!`);
      setAddNumber('');
    } else {
      setMessage("Please enter a number to add!");
    }
  };

  const removeBall = () => {
    if (deleteIndex !== '' && deleteIndex >= 0 && deleteIndex < basket.length) {
      const index = parseInt(deleteIndex);
      const removedBall = basket[index];
      const newBasket = [...basket.slice(0, index), ...basket.slice(index + 1)];
      setBasket(newBasket);
      setMessage(`Removed ${removedBall} from position ${index + 1}!`);
      setDeleteIndex('');
    } else {
      setMessage("Please enter a valid position to remove!");
    }
  };

  const updateBall = () => {
    if (updateIndex !== '' && updateValue !== '' && updateIndex >= 0 && updateIndex < basket.length) {
      const index = parseInt(updateIndex);
      const newValue = parseInt(updateValue);
      const newBasket = [...basket];
      newBasket[index] = newValue;
      setBasket(newBasket);
      setMessage(`Updated ball at position ${index + 1} to ${newValue}!`);
      setUpdateIndex('');
      setUpdateValue('');
    } else {
      setMessage("Please enter a valid position and value to update!");
    }
  };

  const searchBall = () => {
    setIsSearching(true);
    setHighlightIndex(-1);
    let currentIndex = 0;

    const searchInterval = setInterval(() => {
      if (currentIndex < basket.length) {
        setHighlightIndex(currentIndex);
        if (basket[currentIndex] === parseInt(searchNumber)) {
          clearInterval(searchInterval);
          setMessage(`Found ${searchNumber} at position ${currentIndex + 1}!`);
          setIsSearching(false);
        }
        currentIndex++;
      } else {
        clearInterval(searchInterval);
        setMessage(`${searchNumber} not found in the basket.`);
        setIsSearching(false);
        setHighlightIndex(-1);
      }
    }, 1000);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Array Operations</h2>
      
      <div className="mb-4">
        <input
          type="number"
          value={addNumber}
          onChange={(e) => setAddNumber(e.target.value)}
          className="border p-2 rounded mr-2"
          placeholder="Number to add"
        />
        <button onClick={addBall} className="bg-green-500 text-white p-2 rounded">
          <PlusCircle size={24} />
        </button>
      </div>

      <div className="mb-4">
        <input
          type="number"
          value={deleteIndex}
          onChange={(e) => setDeleteIndex(e.target.value)}
          className="border p-2 rounded mr-2"
          placeholder="Position to remove"
        />
        <button onClick={removeBall} className="bg-red-500 text-white p-2 rounded">
          <MinusCircle size={24} />
        </button>
      </div>

      <div className="mb-4">
        <input
          type="number"
          value={updateIndex}
          onChange={(e) => setUpdateIndex(e.target.value)}
          className="border p-2 rounded mr-2"
          placeholder="Position to update"
        />
        <input
          type="number"
          value={updateValue}
          onChange={(e) => setUpdateValue(e.target.value)}
          className="border p-2 rounded mr-2"
          placeholder="New value"
        />
        <button onClick={updateBall} className="bg-blue-500 text-white p-2 rounded">
          <RefreshCw size={24} />
        </button>
      </div>

      <div className="flex space-x-2 mb-4">
        <input
          type="number"
          value={searchNumber}
          onChange={(e) => setSearchNumber(e.target.value)}
          className="border p-2 rounded"
          placeholder="Number to search"
        />
        <button onClick={searchBall} disabled={isSearching} className="bg-purple-500 text-white p-2 rounded">
          <Search size={24} />
        </button>
      </div>

      <div className="flex items-center justify-center space-x-2 mb-4 h-20">
        {basket.map((ball, index) => (
          <div
            key={index}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
              index === highlightIndex ? 'bg-yellow-500 animate-bounce' : 'bg-gray-500'
            }`}
          >
            {ball}
          </div>
        ))}
      </div>

      {message && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
          <p className="font-bold">Action Result</p>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default ArrayOperationsAnimation;