import { useState, useEffect } from "react";
import "./Crossword.css";

function Crossword() {
  const clues = {
    across: [
      {
        number: 3,
        clue: "Benda Untuk Minum",
        answer: "GELAS",
        row: 2,
        col: 4,
      },
      { number: 6, clue: "Profesi Mengajar", answer: "GURU", row: 3, col: 11 },
      {
        number: 7,
        clue: "Binatang Melata",
        answer: "ULAR",
        row: 4,
        col: 7,
      },
      {
        number: 9,
        clue: "Tempat Menyimpan Uang",
        answer: "BANK",
        row: 5,
        col: 11,
      },
      {
        number: 11,
        clue: "Warna Langit",
        answer: "BIRU",
        row: 6,
        col: 8,
      },
      {
        number: 12,
        clue: "Kota di Jawa Tengah",
        answer: "KUDUS",
        row: 7,
        col: 2,
      },
      {
        number: 15,
        clue: "Bagian Wajah",
        answer: "MATA",
        row: 8,
        col: 10,
      },
      {
        number: 16,
        clue: "Mata Uang Indonesia",
        answer: "RUPIAH",
        row: 10,
        col: 5,
      },
      {
        number: 17,
        clue: "Tempat Duduk Raja",
        answer: "TAHTA",
        row: 11,
        col: 0,
      },
      {
        number: 18,
        clue: "Benda Untuk Menulis",
        answer: "PENA",
        row: 13,
        col: 4,
      },
    ],
    down: [
      {
        number: 1,
        clue: "Buah Berwarna Merah",
        answer: "APEL",
        row: 0,
        col: 5,
      },
      { number: 2, clue: "Tempat Tidur", answer: "KASUR", row: 1, col: 7 },
      {
        number: 4,
        clue: "Hewan Berkaki Empat",
        answer: "KUDA",
        row: 2,
        col: 12,
      },
      {
        number: 5,
        clue: "Hewan Pemakan Rumput",
        answer: "SAPI",
        row: 3,
        col: 9,
      },
      { number: 8, clue: "Tempat Belajar", answer: "SEKOLAH", row: 5, col: 2 },
      {
        number: 9,
        clue: "Benda Langit Malam",
        answer: "BULAN",
        row: 5,
        col: 11,
      },
      {
        number: 10,
        clue: "Ibukota Indonesia",
        answer: "JAKARTA",
        row: 6,
        col: 0,
      },
      {
        number: 11,
        clue: "Bahan Bakar",
        answer: "BENSIN",
        row: 6,
        col: 8,
      },
      {
        number: 13,
        clue: "Alat Musik Tiup",
        answer: "SERULING",
        row: 7,
        col: 6,
      },
      { number: 14, clue: "Lawan Dari Pagi", answer: "MALAM", row: 7, col: 13 },
    ],
  };

  const [grid, setGrid] = useState(
    Array(15)
      .fill()
      .map(() => Array(15).fill(""))
  );

  useEffect(() => {
    const newGrid = [...grid];
    const blackCells = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 6],
      [0, 7],
      [0, 8],
      [0, 9],
      [0, 10],
      [0, 11],
      [0, 12],
      [0, 13],
      [0, 14],
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 6],
      [1, 8],
      [1, 9],
      [1, 10],
      [1, 11],
      [1, 12],
      [1, 13],
      [1, 14],
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
      [2, 9],
      [2, 10],
      [2, 11],
      [2, 13],
      [2, 14],
      [3, 0],
      [3, 1],
      [3, 2],
      [3, 3],
      [3, 4],
      [3, 6],
      [3, 8],
      [3, 10],
      [4, 0],
      [4, 1],
      [4, 2],
      [4, 3],
      [4, 4],
      [4, 5],
      [4, 6],
      [4, 11],
      [4, 13],
      [4, 14],
      [5, 0],
      [5, 1],
      [5, 3],
      [5, 4],
      [5, 5],
      [5, 6],
      [5, 8],
      [5, 10],
      [6, 1],
      [6, 3],
      [6, 4],
      [6, 5],
      [6, 6],
      [6, 7],
      [6, 12],
      [6, 13],
      [6, 14],
      [7, 1],
      [7, 7],
      [7, 9],
      [7, 10],
      [7, 12],
      [7, 14],
      [8, 1],
      [8, 3],
      [8, 4],
      [8, 5],
      [8, 7],
      [8, 9],
      [8, 14],
      [9, 1],
      [9, 3],
      [9, 4],
      [9, 5],
      [9, 7],
      [9, 9],
      [9, 10],
      [9, 12],
      [9, 14],
      [10, 1],
      [10, 3],
      [10, 4],
      [10, 11],
      [10, 12],
      [10, 14],
      [10, 14],
      [11, 5],
      [11, 7],
      [11, 9],
      [11, 10],
      [11, 11],
      [11, 12],
      [11, 14],
      [12, 1],
      [12, 2],
      [12, 3],
      [12, 4],
      [12, 5],
      [12, 7],
      [12, 8],
      [12, 9],
      [12, 10],
      [12, 11],
      [12, 12],
      [12, 13],
      [12, 14],
      [13, 0],
      [13, 1],
      [13, 2],
      [13, 3],
      [13, 8],
      [13, 9],
      [13, 10],
      [13, 11],
      [13, 12],
      [13, 13],
      [13, 14],
      [14, 0],
      [14, 1],
      [14, 2],
      [14, 3],
      [14, 4],
      [14, 5],
      [14, 7],
      [14, 8],
      [14, 9],
      [14, 10],
      [14, 11],
      [14, 12],
      [14, 13],
      [14, 14],
    ];

    blackCells.forEach(([row, col]) => {
      if (row < 15 && col < 15) {
        newGrid[row][col] = null;
      }
    });
    setGrid(newGrid);
  }, []);

  const cellNumbers = {};
  [...clues.across, ...clues.down].forEach((clue) => {
    const key = `${clue.row}-${clue.col}`;
    cellNumbers[key] = clue.number;
  });

  const handleCellChange = (row, col, value) => {
    if (value.length > 1) return;

    const newGrid = [...grid];
    newGrid[row][col] = value.toUpperCase();
    setGrid(newGrid);
  };

  const checkAnswers = () => {
    let correct = true;
    let mistakes = [];

    clues.across.forEach((clue) => {
      const answer = clue.answer;
      let userAnswer = "";

      for (let i = 0; i < answer.length; i++) {
        userAnswer += grid[clue.row][clue.col + i] || "";
      }

      if (userAnswer !== answer) {
        correct = false;
        mistakes.push(
          `Mendatar ${clue.number}: "${userAnswer}" seharusnya "${answer}"`
        );
      }
    });

    clues.down.forEach((clue) => {
      const answer = clue.answer;
      let userAnswer = "";

      for (let i = 0; i < answer.length; i++) {
        userAnswer += grid[clue.row + i]?.[clue.col] || "";
      }

      if (userAnswer !== answer) {
        correct = false;
        mistakes.push(
          `Menurun ${clue.number}: "${userAnswer}" seharusnya "${answer}"`
        );
      }
    });

    if (correct) {
      alert("Selamat! Semua jawaban benar!");
    } else {
      alert(`Ada beberapa kesalahan:\n${mistakes.join("\n")}`);
    }
  };

  return (
    <div className="crossword-page">
      <h1>Teka-Teki Silang</h1>

      <div className="crossword-layout">
        <div className="crossword-container">
          <div className="crossword-grid">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="crossword-row">
                {row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`crossword-cell ${
                      cell === null ? "black-cell" : "white-cell"
                    }`}
                  >
                    {cell !== null && (
                      <>
                        {cellNumbers[`${rowIndex}-${colIndex}`] && (
                          <span className="cell-number">
                            {cellNumbers[`${rowIndex}-${colIndex}`]}
                          </span>
                        )}
                        <input
                          type="text"
                          maxLength="1"
                          value={cell}
                          onChange={(e) =>
                            handleCellChange(rowIndex, colIndex, e.target.value)
                          }
                          className="cell-input"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <button className="check-button" onClick={checkAnswers}>
            Periksa Jawaban
          </button>
        </div>

        <div className="clues-container">
          <div className="clues-section">
            <h3>Mendatar</h3>
            <ol>
              {clues.across.map((clue) => (
                <li key={`across-${clue.number}`} value={clue.number}>
                  {clue.number}. {clue.clue}
                </li>
              ))}
            </ol>
          </div>

          <div className="clues-section">
            <h3>Menurun</h3>
            <ol>
              {clues.down.map((clue) => (
                <li key={`down-${clue.number}`} value={clue.number}>
                  {clue.number}. {clue.clue}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Crossword;
