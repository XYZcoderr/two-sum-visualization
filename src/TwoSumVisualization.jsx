import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Play, Pause, SkipBack, SkipForward } from 'lucide-react';

const TwoSumVisualization = () => {
  const [nums, setNums] = useState([2, 7, 11, 15]);
  const [target, setTarget] = useState(9);
  const [step, setStep] = useState(0);
  const [hashMap, setHashMap] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [complement, setComplement] = useState(null);``
  const [solution, setSolution] = useState(null);
  const [customInput, setCustomInput] = useState('');
  const [customTarget, setCustomTarget] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [stepCount, setStepCount] = useState(0);
  const [testCases, setTestCases] = useState([
    { nums: [2, 7, 11, 15], target: 9 },
    { nums: [3, 2, 4], target: 6 },
    { nums: [3, 3], target: 6 },
  ]);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setTimeout(() => {
        handleStep();
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, step, nums, target, hashMap, currentIndex, solution]);

  const handleStep = () => {
    if (step < nums.length && !solution) {
      setStep(step + 1);
      setStepCount(stepCount + 1);
      const newHashMap = { ...hashMap };
      const newComplement = target - nums[currentIndex];
      setComplement(newComplement);

      if (newComplement in newHashMap) {
        setSolution([newHashMap[newComplement], currentIndex]);
      } else {
        newHashMap[nums[currentIndex]] = currentIndex;
        setHashMap(newHashMap);
        setCurrentIndex(currentIndex + 1);
      }
    } else {
      setIsPlaying(false);
    }
  };

  const resetVisualization = () => {
    setStep(0);
    setHashMap({});
    setCurrentIndex(0);
    setComplement(null);
    setSolution(null);
    setStepCount(0);
    setIsPlaying(false);
  };

  const addCustomTestCase = () => {
    const newNums = customInput.split(',').map(num => parseInt(num.trim()));
    const newTarget = parseInt(customTarget);
    if (newNums.every(num => !isNaN(num)) && !isNaN(newTarget)) {
      setTestCases([...testCases, { nums: newNums, target: newTarget }]);
      setCustomInput('');
      setCustomTarget('');
    } else {
      alert('Invalid input. Please enter comma-separated numbers for the array and a valid number for the target.');
    }
  };

  const runTestCase = (index) => {
    const { nums: newNums, target: newTarget } = testCases[index];
    setNums(newNums);
    setTarget(newTarget);
    resetVisualization();
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Two Sum Algorithm Visualization</h2>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">
            Input Array:
            <input
              type="text"
              value={nums.join(', ')}
              onChange={(e) => setNums(e.target.value.split(',').map(Number))}
              className="ml-2 p-1 border rounded w-full"
            />
          </label>
          <label className="block">
            Target:
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              className="ml-2 p-1 border rounded w-full"
            />
          </label>
        </div>
        <div>
          <h3 className="font-semibold">Add Custom Test Case:</h3>
          <input
            type="text"
            placeholder="Array (comma-separated)"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            className="mb-2 p-1 border rounded w-full"
          />
          <input
            type="number"
            placeholder="Target"
            value={customTarget}
            onChange={(e) => setCustomTarget(e.target.value)}
            className="mb-2 p-1 border rounded w-full"
          />
          <button
            onClick={addCustomTestCase}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
          >
            Add Custom Test Case
          </button>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Test Cases:</h3>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {testCases.map((testCase, index) => (
            <button
              key={index}
              onClick={() => runTestCase(index)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Test Case {index + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Array:</h3>
        <div className="flex space-x-2 mt-2 overflow-x-auto">
          {nums.map((num, index) => (
            <div
              key={index}
              className={`w-12 h-12 flex items-center justify-center border ${
                index === currentIndex ? 'bg-yellow-200' : ''
              } ${solution && solution.includes(index) ? 'bg-green-200' : ''}`}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Hash Map:</h3>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {Object.entries(hashMap).map(([key, value]) => (
            <div key={key} className="flex items-center">
              <div className="w-12 h-12 flex flex-col items-center justify-center border bg-blue-100">
                <div>{key}</div>
                <div className="text-xs">Value</div>
              </div>
              <ArrowRight className="mx-2" />
              <div className="w-12 h-12 flex flex-col items-center justify-center border bg-blue-100">
                <div>{value}</div>
                <div className="text-xs">Index</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Current Step Details:</h3>
        <p>
          <strong>Action:</strong>{' '}
          {solution
            ? 'Solution found'
            : step === nums.length
            ? 'No solution found'
            : `Checking if complement ${complement} exists in HashMap`}
        </p>
        <p>
          <strong>Current element:</strong> {nums[currentIndex]} at index {currentIndex}
        </p>
        <p>
          <strong>Complement:</strong> {complement}
        </p>
        <p>
          <strong>Step Count:</strong> {stepCount}
        </p>
      </div>
      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => {
            setStep(Math.max(0, step - 1));
            setStepCount(Math.max(0, stepCount - 1));
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          disabled={step === 0}
        >
          <SkipBack size={20} />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={handleStep}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          disabled={step === nums.length || solution !== null}
        >
          <SkipForward size={20} />
        </button>
        <button
          onClick={resetVisualization}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Reset
        </button>
      </div>
      {solution && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <Check className="inline-block mr-2" />
          Solution found: [{solution.join(', ')}]
        </div>
      )}
    </div>
  );
};

export default TwoSumVisualization;