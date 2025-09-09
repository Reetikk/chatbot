import React, { useState } from 'react';

const StudyTools = () => {
  const [activeCalculator, setActiveCalculator] = useState('basic');
  const [basicInput, setBasicInput] = useState('');
  const [unitFrom, setUnitFrom] = useState('');
  const [unitTo, setUnitTo] = useState('');
  const [unitValue, setUnitValue] = useState('');

  const calculators = {
    basic: 'Basic Calculator',
    scientific: 'Scientific Calculator',
    unit: 'Unit Converter',
    gpa: 'GPA Calculator',
    geometry: 'Geometry Helper',
    statistics: 'Statistics Calculator',
    graph: 'Graph Plotter'
  };

  const BasicCalculator = () => {
    const calculate = () => {
      try {
        const result = eval(basicInput.replace(/[^0-9+\-*/().]/g, ''));
        setBasicInput(result.toString());
      } catch (error) {
        setBasicInput('Error');
      }
    };

    const addToInput = (value) => {
      setBasicInput(prev => prev + value);
    };

    return (
      <div className="space-y-4">
        <input
          type="text"
          value={basicInput}
          onChange={(e) => setBasicInput(e.target.value)}
          className="w-full px-4 py-3 text-xl text-right border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-100"
          placeholder="0"
        />
        <div className="grid grid-cols-4 gap-3">
          {['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((btn, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (btn === 'C') setBasicInput('');
                else if (btn === '=') calculate();
                else if (btn === '×') addToInput('*');
                else if (btn === '÷') addToInput('/');
                else addToInput(btn);
              }}
              className={`p-4 rounded-lg font-semibold transition-colors ${
                ['C', '±', '%', '÷', '×', '-', '+', '='].includes(btn)
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-gray-100'
              } ${btn === '0' ? 'col-span-2' : ''}`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const UnitConverter = () => {
    const conversions = {
      // Length conversions (all to meters)
      length: { 
        m: 1, 
        km: 1000, 
        cm: 0.01, 
        mm: 0.001, 
        ft: 0.3048, 
        in: 0.0254,
        yd: 0.9144,
        mi: 1609.34
      },
      // Weight conversions (all to kg)
      weight: { 
        kg: 1, 
        g: 0.001, 
        lb: 0.453592, 
        oz: 0.0283495,
        ton: 1000
      },
      // Temperature needs special handling
      temperature: { c: 'celsius', f: 'fahrenheit', k: 'kelvin' }
    };

    const getUnitCategory = (unit) => {
      for (const [category, units] of Object.entries(conversions)) {
        if (units[unit]) return category;
      }
      return null;
    };

    const convertUnits = () => {
      if (!unitValue || !unitFrom || !unitTo) return 'Enter values to convert';
      
      const fromCategory = getUnitCategory(unitFrom);
      const toCategory = getUnitCategory(unitTo);
      
      if (fromCategory !== toCategory) return 'Units must be of the same type';
      
      const value = parseFloat(unitValue);
      if (isNaN(value)) return 'Invalid number';

      if (fromCategory === 'temperature') {
        return convertTemperature(value, unitFrom, unitTo);
      } else {
        // Convert to base unit, then to target unit
        const baseValue = value * conversions[fromCategory][unitFrom];
        const result = baseValue / conversions[fromCategory][unitTo];
        return result.toFixed(6).replace(/\.?0+$/, '');
      }
    };

    const convertTemperature = (value, from, to) => {
      let celsius = value;
      
      // Convert to Celsius first
      if (from === 'f') celsius = (value - 32) * 5/9;
      else if (from === 'k') celsius = value - 273.15;
      
      // Convert from Celsius to target
      if (to === 'f') return ((celsius * 9/5) + 32).toFixed(2);
      else if (to === 'k') return (celsius + 273.15).toFixed(2);
      else return celsius.toFixed(2);
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            value={unitValue}
            onChange={(e) => setUnitValue(e.target.value)}
            placeholder="Enter value"
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-100"
          />
          <select
            value={unitFrom}
            onChange={(e) => setUnitFrom(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="">From Unit</option>
            <optgroup label="Length">
              <option value="m">Meters</option>
              <option value="km">Kilometers</option>
              <option value="cm">Centimeters</option>
              <option value="mm">Millimeters</option>
              <option value="ft">Feet</option>
              <option value="in">Inches</option>
              <option value="yd">Yards</option>
              <option value="mi">Miles</option>
            </optgroup>
            <optgroup label="Weight">
              <option value="kg">Kilograms</option>
              <option value="g">Grams</option>
              <option value="lb">Pounds</option>
              <option value="oz">Ounces</option>
              <option value="ton">Tons</option>
            </optgroup>
            <optgroup label="Temperature">
              <option value="c">Celsius</option>
              <option value="f">Fahrenheit</option>
              <option value="k">Kelvin</option>
            </optgroup>
          </select>
          <select
            value={unitTo}
            onChange={(e) => setUnitTo(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="">To Unit</option>
            <optgroup label="Length">
              <option value="m">Meters</option>
              <option value="km">Kilometers</option>
              <option value="cm">Centimeters</option>
              <option value="mm">Millimeters</option>
              <option value="ft">Feet</option>
              <option value="in">Inches</option>
              <option value="yd">Yards</option>
              <option value="mi">Miles</option>
            </optgroup>
            <optgroup label="Weight">
              <option value="kg">Kilograms</option>
              <option value="g">Grams</option>
              <option value="lb">Pounds</option>
              <option value="oz">Ounces</option>
              <option value="ton">Tons</option>
            </optgroup>
            <optgroup label="Temperature">
              <option value="c">Celsius</option>
              <option value="f">Fahrenheit</option>
              <option value="k">Kelvin</option>
            </optgroup>
          </select>
        </div>
        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">
            Result: {convertUnits()}
          </p>
        </div>
      </div>
    );
  };

  const ScientificCalculator = () => {
    const [sciInput, setSciInput] = useState('');
    const [memory, setMemory] = useState(0);

    const scientificCalculate = () => {
      try {
        let expression = sciInput
          .replace(/sin\(/g, 'Math.sin(')
          .replace(/cos\(/g, 'Math.cos(')
          .replace(/tan\(/g, 'Math.tan(')
          .replace(/log\(/g, 'Math.log10(')
          .replace(/ln\(/g, 'Math.log(')
          .replace(/sqrt\(/g, 'Math.sqrt(')
          .replace(/π/g, 'Math.PI')
          .replace(/e/g, 'Math.E')
          .replace(/\^/g, '**');
        
        const result = eval(expression);
        setSciInput(result.toString());
      } catch (error) {
        setSciInput('Error');
      }
    };

    const addSciInput = (value) => {
      setSciInput(prev => prev + value);
    };

    const scientificButtons = [
      ['C', '±', '%', '÷', 'sin(', 'cos(', 'tan('],
      ['7', '8', '9', '×', 'log(', 'ln(', 'sqrt('],
      ['4', '5', '6', '-', 'π', 'e', '^'],
      ['1', '2', '3', '+', '(', ')', 'M+'],
      ['0', '.', '=', 'MC', 'MR', 'MS', 'M-']
    ];

    return (
      <div className="space-y-4">
        <input
          type="text"
          value={sciInput}
          onChange={(e) => setSciInput(e.target.value)}
          className="w-full px-4 py-3 text-xl text-right border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-100"
          placeholder="0"
        />
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Memory: {memory}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {scientificButtons.flat().map((btn, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (btn === 'C') setSciInput('');
                else if (btn === '=') scientificCalculate();
                else if (btn === '×') addSciInput('*');
                else if (btn === '÷') addSciInput('/');
                else if (btn === 'M+') setMemory(prev => prev + parseFloat(sciInput || 0));
                else if (btn === 'M-') setMemory(prev => prev - parseFloat(sciInput || 0));
                else if (btn === 'MC') setMemory(0);
                else if (btn === 'MR') setSciInput(memory.toString());
                else if (btn === 'MS') setMemory(parseFloat(sciInput || 0));
                else addSciInput(btn);
              }}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                ['='].includes(btn)
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : ['C', '±', '%', '÷', '×', '-', '+'].includes(btn)
                  ? 'bg-orange-500 hover:bg-orange-600 text-white'
                  : ['sin(', 'cos(', 'tan(', 'log(', 'ln(', 'sqrt(', 'π', 'e', '^', '(', ')'].includes(btn)
                  ? 'bg-purple-500 hover:bg-purple-600 text-white'
                  : ['M+', 'M-', 'MC', 'MR', 'MS'].includes(btn)
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200'
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Functions: sin, cos, tan (in radians), log (base 10), ln (natural log), sqrt, π, e, ^ (power)
        </div>
      </div>
    );
  };

  const GPACalculator = () => {
    const [courses, setCourses] = useState([{ name: '', credits: '', grade: '' }]);
    const [gpa, setGPA] = useState(null);

    const gradePoints = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    };

    const addCourse = () => {
      setCourses([...courses, { name: '', credits: '', grade: '' }]);
    };

    const removeCourse = (index) => {
      setCourses(courses.filter((_, i) => i !== index));
    };

    const updateCourse = (index, field, value) => {
      const updated = courses.map((course, i) => 
        i === index ? { ...course, [field]: value } : course
      );
      setCourses(updated);
    };

    const calculateGPA = () => {
      let totalPoints = 0;
      let totalCredits = 0;

      for (const course of courses) {
        if (course.credits && course.grade && gradePoints[course.grade] !== undefined) {
          const credits = parseFloat(course.credits);
          const points = gradePoints[course.grade];
          totalPoints += credits * points;
          totalCredits += credits;
        }
      }

      if (totalCredits > 0) {
        setGPA((totalPoints / totalCredits).toFixed(2));
      } else {
        setGPA(null);
      }
    };

    return (
      <div className="space-y-6">
        <div className="space-y-4">
          {courses.map((course, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <input
                type="text"
                placeholder="Course Name"
                value={course.name}
                onChange={(e) => updateCourse(index, 'name', e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-100"
              />
              <input
                type="number"
                placeholder="Credits"
                value={course.credits}
                onChange={(e) => updateCourse(index, 'credits', e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-100"
              />
              <select
                value={course.grade}
                onChange={(e) => updateCourse(index, 'grade', e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="">Select Grade</option>
                {Object.keys(gradePoints).map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
              <button
                onClick={() => removeCourse(index)}
                className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={addCourse}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Add Course
          </button>
          <button
            onClick={calculateGPA}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            Calculate GPA
          </button>
        </div>

        {gpa !== null && (
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
            <p className="text-lg font-semibold text-green-800 dark:text-green-200">
              Your GPA: {gpa}
            </p>
          </div>
        )}
      </div>
    );
  };

  const GeometryHelper = () => {
    const [shape, setShape] = useState('circle');
    const [dimensions, setDimensions] = useState({ radius: '', length: '', width: '', height: '' });
    const [result, setResult] = useState(null);

    const calculateGeometry = () => {
      const { radius, length, width, height } = dimensions;
      let calculation = {};

      switch (shape) {
        case 'circle':
          if (radius) {
            const r = parseFloat(radius);
            calculation = {
              area: (Math.PI * r * r).toFixed(2),
              circumference: (2 * Math.PI * r).toFixed(2)
            };
          }
          break;
        case 'rectangle':
          if (length && width) {
            const l = parseFloat(length);
            const w = parseFloat(width);
            calculation = {
              area: (l * w).toFixed(2),
              perimeter: (2 * (l + w)).toFixed(2)
            };
          }
          break;
        case 'triangle':
          if (length && height) {
            const b = parseFloat(length);
            const h = parseFloat(height);
            calculation = {
              area: (0.5 * b * h).toFixed(2)
            };
          }
          break;
        default:
          break;
      }
      setResult(calculation);
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={shape}
            onChange={(e) => setShape(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="circle">Circle</option>
            <option value="rectangle">Rectangle</option>
            <option value="triangle">Triangle</option>
          </select>
          <button
            onClick={calculateGeometry}
            className="px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            Calculate
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shape === 'circle' && (
            <input
              type="number"
              placeholder="Radius"
              value={dimensions.radius}
              onChange={(e) => setDimensions(prev => ({ ...prev, radius: e.target.value }))}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-100"
            />
          )}
          {shape === 'rectangle' && (
            <>
              <input
                type="number"
                placeholder="Length"
                value={dimensions.length}
                onChange={(e) => setDimensions(prev => ({ ...prev, length: e.target.value }))}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-100"
              />
              <input
                type="number"
                placeholder="Width"
                value={dimensions.width}
                onChange={(e) => setDimensions(prev => ({ ...prev, width: e.target.value }))}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-100"
              />
            </>
          )}
          {shape === 'triangle' && (
            <>
              <input
                type="number"
                placeholder="Base"
                value={dimensions.length}
                onChange={(e) => setDimensions(prev => ({ ...prev, length: e.target.value }))}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-100"
              />
              <input
                type="number"
                placeholder="Height"
                value={dimensions.height}
                onChange={(e) => setDimensions(prev => ({ ...prev, height: e.target.value }))}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-100"
              />
            </>
          )}
        </div>

        {result && Object.keys(result).length > 0 && (
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">Results:</h3>
            {Object.entries(result).map(([key, value]) => (
              <p key={key} className="text-green-700 dark:text-green-300">
                {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  };

  const StatisticsCalculator = () => {
    const [numbers, setNumbers] = useState('');
    const [stats, setStats] = useState(null);

    const calculateStats = () => {
      const numArray = numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
      
      if (numArray.length === 0) return;

      const sorted = [...numArray].sort((a, b) => a - b);
      const sum = numArray.reduce((acc, num) => acc + num, 0);
      const mean = sum / numArray.length;
      
      const median = numArray.length % 2 === 0
        ? (sorted[numArray.length / 2 - 1] + sorted[numArray.length / 2]) / 2
        : sorted[Math.floor(numArray.length / 2)];

      const variance = numArray.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / numArray.length;
      const stdDev = Math.sqrt(variance);

      setStats({
        count: numArray.length,
        sum: sum.toFixed(2),
        mean: mean.toFixed(2),
        median: median.toFixed(2),
        min: Math.min(...numArray).toFixed(2),
        max: Math.max(...numArray).toFixed(2),
        stdDev: stdDev.toFixed(2)
      });
    };

    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <textarea
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            placeholder="Enter numbers separated by commas (e.g., 1, 2, 3, 4, 5)"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-100"
            rows="3"
          />
          <button
            onClick={calculateStats}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
          >
            Calculate Statistics
          </button>
        </div>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                </p>
                <p className="text-xl font-bold text-purple-800 dark:text-purple-200">{value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const GraphPlotter = () => {
    const [equation, setEquation] = useState('x^2');
    const [xRange, setXRange] = useState({ min: -10, max: 10 });
    const [points, setPoints] = useState([]);

    const plotGraph = () => {
      const newPoints = [];
      const step = (xRange.max - xRange.min) / 100;
      
      for (let x = xRange.min; x <= xRange.max; x += step) {
        try {
          let expr = equation
            .replace(/\^/g, '**')
            .replace(/x/g, `(${x})`)
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            .replace(/log/g, 'Math.log');
          
          const y = eval(expr);
          if (!isNaN(y) && isFinite(y)) {
            newPoints.push({ x: x.toFixed(2), y: y.toFixed(2) });
          }
        } catch (error) {
          // Skip invalid points
        }
      }
      setPoints(newPoints.slice(0, 20)); // Show first 20 points
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            placeholder="Enter equation (e.g., x^2, sin(x))"
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-100"
          />
          <input
            type="number"
            value={xRange.min}
            onChange={(e) => setXRange(prev => ({ ...prev, min: parseFloat(e.target.value) }))}
            placeholder="Min X"
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-100"
          />
          <input
            type="number"
            value={xRange.max}
            onChange={(e) => setXRange(prev => ({ ...prev, max: parseFloat(e.target.value) }))}
            placeholder="Max X"
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
        
        <button
          onClick={plotGraph}
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
        >
          Plot Graph
        </button>

        {points.length > 0 && (
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-4">
              Sample Points for y = {equation}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              {points.map((point, idx) => (
                <div key={idx} className="text-yellow-700 dark:text-yellow-300">
                  ({point.x}, {point.y})
                </div>
              ))}
            </div>
            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
              Note: This shows coordinate points. For visual graphs, use specialized graphing tools.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Study Tools
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Essential calculators and converters for your studies
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Tools</h2>
              <div className="space-y-2">
                {Object.entries(calculators).map(([key, name]) => (
                  <button
                    key={key}
                    onClick={() => setActiveCalculator(key)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeCalculator === key
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Tools */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Quick Tools</h2>
              <div className="space-y-3">
                <button 
                  onClick={() => setActiveCalculator('geometry')}
                  className="w-full px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                >
                  📐 Geometry Helper
                </button>
                <button 
                  onClick={() => setActiveCalculator('statistics')}
                  className="w-full px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                >
                  🧮 Statistics Calculator
                </button>
                <button 
                  onClick={() => setActiveCalculator('graph')}
                  className="w-full px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
                >
                  📊 Graph Plotter
                </button>
              </div>
            </div>
          </div>

          {/* Main Tool Area */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                {calculators[activeCalculator]}
              </h2>

              {activeCalculator === 'basic' && <BasicCalculator />}
              {activeCalculator === 'unit' && <UnitConverter />}
              {activeCalculator === 'scientific' && <ScientificCalculator />}
              {activeCalculator === 'gpa' && <GPACalculator />}
              {activeCalculator === 'geometry' && <GeometryHelper />}
              {activeCalculator === 'statistics' && <StatisticsCalculator />}
              {activeCalculator === 'graph' && <GraphPlotter />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyTools;
