import React, { useState, useEffect } from 'react';
import { styles } from './styles';
// import { StartModal } from './components/StartModal';
import { isWord } from '../../Utils/words';

const GRID_SIZE = 6;
const CELL_SIZE = 50; // Size of the cell in pixels

export const LetterIntersection = () => {
  const [grid, setGrid] = useState(createInitialGrid(GRID_SIZE));
  const [selectedCells, setSelectedCells] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState([]);
  const [intersections, setIntersections] = useState([]);
  const [wordList, setWordList] = useState([]);
  const [validWord, setValidWord] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => {
    // Get the stored time left from local storage, or default to 90 seconds
    const savedTimeLeft = localStorage.getItem('timeLeft');
    return savedTimeLeft ? parseInt(savedTimeLeft, 10) : 90;
  });
  const [isActive, setIsActive] = useState(false);
  const [bonusTime, setBonusTime] = useState(0);

  useEffect(() => {
    localStorage.setItem('timeLeft', timeLeft.toString());
  }, [timeLeft]);

  const startGame = () => {
    setIsActive(true);
    const startTime = localStorage.getItem('startTime');
    if (!startTime) {
      const now = new Date().getTime();
      localStorage.setItem('startTime', now);
    }
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = prevTimeLeft - 1;
          if (newTimeLeft <= 0) {
            clearInterval(interval);
            setIsActive(false);
            localStorage.removeItem('timeLeft'); // Clear the stored time
            // Other end-of-game operations
          }
          return newTimeLeft;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (bonusTime > 0) {
      setTimeLeft((prevTimeLeft) => {
        const newTimeLeft = prevTimeLeft + bonusTime;
        localStorage.setItem('timeLeft', newTimeLeft.toString()); // Update local storage
        return newTimeLeft;
      });
      setBonusTime(0);
    }
  }, [bonusTime]);

  function createInitialGrid(size) {
    let letterWeights = {
      E: 12,
      A: 9,
      I: 9,
      O: 8,
      N: 6,
      R: 6,
      T: 6,
      L: 4,
      S: 4,
      U: 4,
      D: 4,
      G: 3,
      B: 2,
      C: 2,
      F: 2,
      H: 2,
      M: 2,
      W: 2,
      Y: 2,
      P: 2,
      K: 2,
      V: 2,
      J: 1,
      X: 1,
      Q: 1,
      Z: 1
    };

    // Function to generate a letter based on the current weights
    const generateWeightedLetter = (exclude = []) => {
      const picklist = [];
      Object.keys(letterWeights).forEach((letter) => {
        if (!exclude.includes(letter)) {
          for (let i = 0; i < letterWeights[letter]; i++) {
            picklist.push(letter);
          }
        }
      });

      const chosenLetter = picklist[Math.floor(Math.random() * picklist.length)];
      // Reduce the weight of the chosen letter to decrease its future selection probability
      letterWeights[chosenLetter] = Math.max(1, letterWeights[chosenLetter] - 3);
      return chosenLetter;
    };

    // Initialize grid with empty strings
    let newGrid = Array.from({ length: size }, () => Array.from({ length: size }, () => ''));

    // Define the positions of the grid edges without the corners
    const positions = [
      ...Array.from({ length: size - 2 }, (_, i) => ({ x: i + 1, y: 0 })),
      ...Array.from({ length: size - 2 }, (_, i) => ({ x: i + 1, y: size - 1 })),
      ...Array.from({ length: size - 2 }, (_, i) => ({ x: 0, y: i + 1 })),
      ...Array.from({ length: size - 2 }, (_, i) => ({ x: size - 1, y: i + 1 }))
    ];

    // Randomly populate the edges with weighted letters
    positions.forEach((pos) => {
      newGrid[pos.y][pos.x] = generateWeightedLetter();
    });

    // Function to ensure at least one vowel on each edge
    const ensureAtLeastOneVowel = (edge) => {
      if (!edge.some((pos) => 'AEIOU'.includes(newGrid[pos.y][pos.x]))) {
        const randomPos = edge[Math.floor(Math.random() * edge.length)];
        newGrid[randomPos.y][randomPos.x] = 'AEIOU'[Math.floor(Math.random() * 5)];
      }
    };

    // Ensure at least one vowel on each side
    const topEdge = positions.filter((pos) => pos.y === 0);
    const bottomEdge = positions.filter((pos) => pos.y === size - 1);
    const leftEdge = positions.filter((pos) => pos.x === 0);
    const rightEdge = positions.filter((pos) => pos.x === size - 1);

    ensureAtLeastOneVowel(topEdge);
    ensureAtLeastOneVowel(bottomEdge);
    ensureAtLeastOneVowel(leftEdge);
    ensureAtLeastOneVowel(rightEdge);

    return newGrid;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function shuffleEdge(array) {
    // Remove the corner cells before shuffling
    const edgeWithoutCorners = array.slice(1, -1);
    shuffleArray(edgeWithoutCorners);

    // Reinsert the empty corner cells
    return [''].concat(edgeWithoutCorners).concat('');
  }

  function shuffleSides(grid) {
    const newGrid = [...grid];
    const size = grid.length;

    // Shuffle top and bottom edges
    newGrid[0] = shuffleEdge(newGrid[0]);
    newGrid[size - 1] = shuffleEdge(newGrid[size - 1]);

    // Extract, shuffle, and replace left and right edges
    let leftColumn = newGrid.map((row) => row[0]).slice(1, -1);
    let rightColumn = newGrid.map((row) => row[size - 1]).slice(1, -1);

    shuffleArray(leftColumn);
    shuffleArray(rightColumn);

    // Assign shuffled values back to the grid, skipping the corners
    for (let i = 1; i < size - 1; i++) {
      newGrid[i][0] = leftColumn[i - 1];
      newGrid[i][size - 1] = rightColumn[i - 1];
    }

    return newGrid;
  }

  const handleShuffle = () => {
    const newGrid = shuffleSides(grid);
    setGrid(newGrid);
  };

  const handleCellClick = (row, col) => {
    const isAlreadySelected = selectedCells.some((cell) => cell.row === row && cell.col === col);
    // Avoid adding the same cell or non-edge cells
    if (grid[row][col] !== '' && !isCornerCell(row, col) && !isAlreadySelected) {
      const lastSelectedCell = selectedCells[selectedCells.length - 1];
      // Check if the new cell is from a different side
      if (
        !lastSelectedCell ||
        row === 0 ||
        row === GRID_SIZE - 1 ||
        col === 0 ||
        col === GRID_SIZE - 1
      ) {
        if (
          !lastSelectedCell ||
          (lastSelectedCell.row === 0 && row !== 0) ||
          (lastSelectedCell.row === GRID_SIZE - 1 && row !== GRID_SIZE - 1) ||
          (lastSelectedCell.col === 0 && col !== 0) ||
          (lastSelectedCell.col === GRID_SIZE - 1 && col !== GRID_SIZE - 1)
        ) {
          const newSelectedCells = [...selectedCells, { row, col }];
          setSelectedCells(newSelectedCells);
          setCurrentWord(currentWord + grid[row][col]);
          const validWord = isWord(currentWord + grid[row][col]);
          setValidWord(validWord);

          // Add a new line if there is more than one cell selected
          if (newSelectedCells.length > 1) {
            const lastCell = newSelectedCells[newSelectedCells.length - 2];

            // Function to get the center point of the side of the cell opposite to the grid center
            const getCenterPointOfSide = (cellRow, cellCol) => {
              const centerPoint = {
                x: cellCol * CELL_SIZE + CELL_SIZE / 2,
                y: cellRow * CELL_SIZE + CELL_SIZE / 2
              };

              // On the top row, start from the bottom middle of the cell
              if (cellRow === 0) {
                centerPoint.y += CELL_SIZE / 2;
              }
              // On the bottom row, start from the top middle of the cell
              else if (cellRow === grid.length - 1) {
                centerPoint.y -= CELL_SIZE / 2;
              }
              // On the left edge, start from the right middle of the cell
              else if (cellCol === 0) {
                centerPoint.x += CELL_SIZE / 2;
              }
              // On the right edge, start from the left middle of the cell
              else if (cellCol === grid[0].length - 1) {
                centerPoint.x -= CELL_SIZE / 2;
              }
              return centerPoint;
            };

            // Get the start and end points for the line
            const startPoint = getCenterPointOfSide(lastCell.row, lastCell.col);
            const endPoint = getCenterPointOfSide(row, col);

            const newLine = { x1: startPoint.x, y1: startPoint.y, x2: endPoint.x, y2: endPoint.y };

            // Check for intersections with existing lines
            const newIntersections = findIntersections(
              newLine,
              lines.filter((_, i) => i < lines.length - 1)
            );
            setLines([...lines, newLine]);
            setIntersections([...intersections, ...newIntersections]);
            // Increment score by the number of new intersections
            setScore(score + newIntersections.length);
          }
        }
      }
    }
  };

  function isCornerCell(row, col) {
    return (
      (row === 0 && col === 0) ||
      (row === 0 && col === GRID_SIZE - 1) ||
      (row === GRID_SIZE - 1 && col === 0) ||
      (row === GRID_SIZE - 1 && col === GRID_SIZE - 1)
    );
  }

  function findIntersections(newLine, existingLines) {
    const foundIntersections = [];
    existingLines.forEach((line) => {
      const point = getLineIntersection(newLine, line);
      if (point) {
        foundIntersections.push(point);
      }
    });
    return foundIntersections;
  }
  const handleSubmitWord = () => {
    // Simple scoring for demonstration: number of intersections times word length
    const wordScore = intersections.length;
    setScore(score + wordScore);

    // Update word list with the new word and its score
    setWordList([...wordList, { word: currentWord, score: wordScore }]);

    let timeBonus = 0;
    const numberOfIntersections = intersections.length;
    if (numberOfIntersections === 1) {
      timeBonus = 1;
    } else if (numberOfIntersections === 2) {
      timeBonus = 2;
    } else if (numberOfIntersections === 3) {
      timeBonus = 3;
    } else if (numberOfIntersections === 4) {
      timeBonus = 5;
    } else if (numberOfIntersections > 4) {
      timeBonus = 10;
    }
    setBonusTime(bonusTime + timeBonus);

    // Reset the current word, selected cells, and lines
    setSelectedCells([]);
    setCurrentWord('');
    setLines([]);
    setScore(0);
    setIntersections([]);
  };

  const calculateTotalScore = () => {
    return wordList.reduce((total, wordItem) => total + wordItem.score, 0);
  };

  const handleReset = () => {
    setSelectedCells([]);
    setCurrentWord('');
    setLines([]);
    setIntersections([]);
  };

  const resetGame = () => {
    localStorage.removeItem('startTime');
    setIsActive(false);
    setTimeLeft(90);
    setWordList([]);
    handleReset();
  };
  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        <div style={styles.timer}>{timeLeft}</div>
        <svg width={GRID_SIZE * CELL_SIZE} height={GRID_SIZE * CELL_SIZE}>
          {lines.map((line, index) => (
            <line
              key={index}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="royalblue"
              strokeWidth="2"
            />
          ))}
          {intersections.map((point, index) => (
            <circle key={index} cx={point.x} cy={point.y} r={8} fill="red" />
          ))}
          {grid.map((row, rowIndex) =>
            row.map((cell, cellIndex) => (
              <Cell
                key={`${rowIndex}-${cellIndex}`}
                letter={cell}
                row={rowIndex}
                col={cellIndex}
                onCellClick={handleCellClick}
                isSelected={selectedCells.some(
                  (selectedCell) => selectedCell.row === rowIndex && selectedCell.col === cellIndex
                )}
              />
            ))
          )}
        </svg>
      </div>
      <div style={styles.wordSubmit}>
        <button style={styles.submitButton} disabled={!validWord} onClick={handleSubmitWord}>
          Submit Word
        </button>
        <p>Current Word: {currentWord}</p>

        <h4>Total Score: {calculateTotalScore()}</h4>
      </div>
      <div style={styles.buttonsContainer}>
        <button style={styles.gamesButton} onClick={resetGame}>
          Reset Game
        </button>
        <button style={styles.gamesButton} onClick={handleReset}>
          Reset
        </button>
        <button style={styles.gamesButton} onClick={handleShuffle}>
          Shuffle
        </button>
        {!isActive && (
          <button style={styles.gamesButton} onClick={startGame}>
            Start Game
          </button>
        )}
      </div>

      <p>Score: {score}</p>
      <div style={styles.wordList}>
        <h3>Submitted Words</h3>
        <ul>
          {wordList.map((wordItem, index) => (
            <li key={index}>
              {wordItem.word} - {wordItem.score} points
            </li>
          ))}
        </ul>
      </div>

      {/* {!isActive && <StartModal startGame={startGame} />} */}
    </div>
  );
};

const Cell = ({ letter, row, col, onCellClick, isSelected }) => {
  const isEdge = row === 0 || col === 0 || row === GRID_SIZE - 1 || col === GRID_SIZE - 1;

  return (
    <>
      {isEdge && (
        <rect
          x={col * CELL_SIZE}
          y={row * CELL_SIZE}
          width={CELL_SIZE}
          height={CELL_SIZE}
          fill={isSelected ? 'royalblue' : letter ? 'lightblue' : 'none'}
          stroke={isEdge ? 'black' : 'none'} // Only draw border for edge cells
          onClick={() => onCellClick(row, col)}
        />
      )}
      {letter && (
        <text
          x={col * CELL_SIZE + CELL_SIZE / 2}
          y={row * CELL_SIZE + CELL_SIZE / 2}
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="20"
          fill={isSelected ? 'lightblue' : 'royalblue'}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
          onClick={() => onCellClick(row, col)}>
          {letter}
        </text>
      )}
    </>
  );
};

function getLineIntersection(line1, line2) {
  // Convert line1 and line2 from endpoints to the general line equation form (Ax + By = C)
  const a1 = line1.y2 - line1.y1;
  const b1 = line1.x1 - line1.x2;
  const c1 = a1 * line1.x1 + b1 * line1.y1;

  const a2 = line2.y2 - line2.y1;
  const b2 = line2.x1 - line2.x2;
  const c2 = a2 * line2.x1 + b2 * line2.y1;

  const delta = a1 * b2 - a2 * b1;

  // If lines are parallel or coincident, delta will be 0
  if (delta === 0) {
    return null; // No intersection
  }

  // Calculate the intersection point
  const x = (b2 * c1 - b1 * c2) / delta;
  const y = (a1 * c2 - a2 * c1) / delta;

  // Check if the intersection point is within both line segments
  if (isWithinLine(x, y, line1) && isWithinLine(x, y, line2)) {
    return { x, y };
  }

  return null; // The lines don't intersect within the line segments
}

function isWithinLine(x, y, line) {
  // Check if x and y are within the bounding box of the line segment
  const withinX = x >= Math.min(line.x1, line.x2) && x <= Math.max(line.x1, line.x2);
  const withinY = y >= Math.min(line.y1, line.y2) && y <= Math.max(line.y1, line.y2);
  return withinX && withinY;
}
