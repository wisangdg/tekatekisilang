import { useState, useEffect, useRef } from "react";
import "./Crossword.css";

function Crossword() {
  const clues = {
    across: [
      { number: 3, clue: "Benda Untuk Minum", answer: "GELAS", row: 2, col: 4 },
      { number: 6, clue: "Profesi Mengajar", answer: "GURU", row: 3, col: 11 },
      { number: 7, clue: "Binatang Melata", answer: "ULAR", row: 4, col: 7 },
      { number: 9, clue: "Tempat Menyimpan Uang", answer: "BANK", row: 5, col: 11 },
      { number: 11, clue: "Warna Langit", answer: "BIRU", row: 6, col: 8 },
      { number: 12, clue: "Kota di Jawa Tengah", answer: "KUDUS", row: 7, col: 2 },
      { number: 15, clue: "Bagian Wajah", answer: "MATA", row: 8, col: 10 },
      { number: 16, clue: "Mata Uang Indonesia", answer: "RUPIAH", row: 10, col: 5 },
      { number: 17, clue: "Tempat Duduk Raja", answer: "TAHTA", row: 11, col: 0 },
      { number: 18, clue: "Benda Untuk Menulis", answer: "PENA", row: 13, col: 4 },
    ],
    down: [
      { number: 1, clue: "Buah Berwarna Merah", answer: "APEL", row: 0, col: 5 },
      { number: 2, clue: "Tempat Tidur", answer: "KASUR", row: 1, col: 7 },
      { number: 4, clue: "Hewan Berkaki Empat", answer: "KUDA", row: 2, col: 12 },
      { number: 5, clue: "Hewan Pemakan Rumput", answer: "SAPI", row: 3, col: 9 },
      { number: 8, clue: "Tempat Belajar", answer: "SEKOLAH", row: 5, col: 2 },
      { number: 9, clue: "Benda Langit Malam", answer: "BULAN", row: 5, col: 11 },
      { number: 10, clue: "Ibukota Indonesia", answer: "JAKARTA", row: 6, col: 0 },
      { number: 11, clue: "Bahan Bakar", answer: "BENSIN", row: 6, col: 8 },
      { number: 13, clue: "Alat Musik Tiup", answer: "SERULING", row: 7, col: 6 },
      { number: 14, clue: "Lawan Dari Pagi", answer: "MALAM", row: 7, col: 13 },
    ],
  };

  const [grid, setGrid] = useState(Array(15).fill().map(() => Array(15).fill("")));
  const [focusedCell, setFocusedCell] = useState(null);
  const [direction, setDirection] = useState("across");
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ title: "", messages: [], isSuccess: false });

  const inputRefs = useRef({});

  useEffect(() => {
    const newGrid = [...grid];
    const blackCells = [
      [0,0],[0,1],[0,2],[0,3],[0,4],[0,6],[0,7],[0,8],[0,9],[0,10],[0,11],[0,12],[0,13],[0,14],
      [1,0],[1,1],[1,2],[1,3],[1,4],[1,6],[1,8],[1,9],[1,10],[1,11],[1,12],[1,13],[1,14],
      [2,0],[2,1],[2,2],[2,3],[2,9],[2,10],[2,11],[2,13],[2,14],
      [3,0],[3,1],[3,2],[3,3],[3,4],[3,6],[3,8],[3,10],
      [4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,11],[4,13],[4,14],
      [5,0],[5,1],[5,3],[5,4],[5,5],[5,6],[5,8],[5,10],
      [6,1],[6,3],[6,4],[6,5],[6,6],[6,7],[6,12],[6,13],[6,14],
      [7,1],[7,7],[7,9],[7,10],[7,12],[7,14],
      [8,1],[8,3],[8,4],[8,5],[8,7],[8,9],[8,14],
      [9,1],[9,3],[9,4],[9,5],[9,7],[9,9],[9,10],[9,12],[9,14],
      [10,1],[10,3],[10,4],[10,11],[10,12],[10,14],
      [11,5],[11,7],[11,9],[11,10],[11,11],[11,12],[11,14],
      [12,1],[12,2],[12,3],[12,4],[12,5],[12,7],[12,8],[12,9],[12,10],[12,11],[12,12],[12,13],[12,14],
      [13,0],[13,1],[13,2],[13,3],[13,8],[13,9],[13,10],[13,11],[13,12],[13,13],[13,14],
      [14,0],[14,1],[14,2],[14,3],[14,4],[14,5],[14,7],[14,8],[14,9],[14,10],[14,11],[14,12],[14,13],[14,14]
    ];

    blackCells.forEach(([row, col]) => {
      if (row < 15 && col < 15) newGrid[row][col] = null;
    });
    setGrid(newGrid);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (focusedCell) {
      const key = `${focusedCell.row}-${focusedCell.col}`;
      inputRefs.current[key]?.focus();
    }
  }, [focusedCell]);

  const cellNumbers = {};
  [...clues.across, ...clues.down].forEach((clue) => {
    cellNumbers[`${clue.row}-${clue.col}`] = clue.number;
  });

  const getActiveWordCells = () => {
    if (!focusedCell) return [];
    const { row, col } = focusedCell;
    const cells = [];
    
    if (direction === "across") {
      let startCol = col;
      while (startCol >= 0 && grid[row]?.[startCol] !== null) startCol--;
      startCol++;
      let endCol = col;
      while (endCol < 15 && grid[row]?.[endCol] !== null) endCol++;
      endCol--;
      for (let c = startCol; c <= endCol; c++) cells.push(`${row}-${c}`);
    } else {
      let startRow = row;
      while (startRow >= 0 && grid[startRow]?.[col] !== null) startRow--;
      startRow++;
      let endRow = row;
      while (endRow < 15 && grid[endRow]?.[col] !== null) endRow++;
      endRow--;
      for (let r = startRow; r <= endRow; r++) cells.push(`${r}-${col}`);
    }
    return cells;
  };

  const activeWordCells = getActiveWordCells();
  let activeClueNumber = null;
  
  if (activeWordCells.length > 0) {
    const firstCell = activeWordCells[0];
    const [startRow, startCol] = firstCell.split("-").map(Number);
    const clueList = direction === "across" ? clues.across : clues.down;
    const matchingClue = clueList.find(c => c.row === startRow && c.col === startCol);
    if (matchingClue) activeClueNumber = matchingClue.number;
  }

  const advanceCursor = (r, c, step) => {
    let nextRow = r;
    let nextCol = c;
    if (direction === "across") {
      nextCol += step;
      if (nextCol < 0 || nextCol >= 15 || grid[nextRow]?.[nextCol] === null) return;
    } else {
      nextRow += step;
      if (nextRow < 0 || nextRow >= 15 || grid[nextRow]?.[nextCol] === null) return;
    }
    setFocusedCell({ row: nextRow, col: nextCol });
  };

  const jumpToNextCell = (r, c, step) => {
    let currentIndex = direction === "across" ? r * 15 + c : c * 15 + r;
    while (true) {
      currentIndex += step;
      if (currentIndex < 0 || currentIndex >= 225) return;
      const nextRow = direction === "across" ? Math.floor(currentIndex / 15) : currentIndex % 15;
      const nextCol = direction === "across" ? currentIndex % 15 : Math.floor(currentIndex / 15);
      
      if (grid[nextRow]?.[nextCol] !== null) {
        setFocusedCell({ row: nextRow, col: nextCol });
        return;
      }
    }
  };

  const handleCellChange = (row, col, value) => {
    if (value.length > 1) value = value.slice(-1);
    const upperValue = value.toUpperCase();
    const newGrid = [...grid];
    newGrid[row][col] = upperValue;
    setGrid(newGrid);

    if (upperValue !== "") {
      advanceCursor(row, col, 1);
    }
  };

  const handleKeyDown = (e, row, col) => {
    if (e.key === "Backspace") {
      if (grid[row][col] === "") {
        e.preventDefault();
        advanceCursor(row, col, -1);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      jumpToNextCell(row, col, e.shiftKey ? -1 : 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (direction !== "across") setDirection("across");
      else advanceCursor(row, col, 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (direction !== "across") setDirection("across");
      else advanceCursor(row, col, -1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (direction !== "down") setDirection("down");
      else advanceCursor(row, col, 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (direction !== "down") setDirection("down");
      else advanceCursor(row, col, -1);
    }
  };

  const handleCellClick = (row, col) => {
    if (focusedCell?.row === row && focusedCell?.col === col) {
      setDirection(prev => prev === "across" ? "down" : "across");
    } else {
      setFocusedCell({ row, col });
    }
  };

  const checkAnswers = () => {
    let correct = true;
    let mistakes = [];

    clues.across.forEach((clue) => {
      const answer = clue.answer;
      let userAnswer = "";
      for (let i = 0; i < answer.length; i++) userAnswer += grid[clue.row]?.[clue.col + i] || "";
      if (userAnswer !== answer) {
        correct = false;
        mistakes.push(`Mendatar ${clue.number}: "${userAnswer}" seharusnya "${answer}"`);
      }
    });

    clues.down.forEach((clue) => {
      const answer = clue.answer;
      let userAnswer = "";
      for (let i = 0; i < answer.length; i++) userAnswer += grid[clue.row + i]?.[clue.col] || "";
      if (userAnswer !== answer) {
        correct = false;
        mistakes.push(`Menurun ${clue.number}: "${userAnswer}" seharusnya "${answer}"`);
      }
    });

    if (correct) {
      setModalData({
        title: "Luar Biasa!",
        messages: ["Semua jawaban Anda benar. Anda berhasil menyelesaikan teka-teki silang ini!"],
        isSuccess: true
      });
    } else {
      setModalData({
        title: "Periksa Lagi!",
        messages: mistakes,
        isSuccess: false
      });
    }
    setShowModal(true);
  };

  const onClueClick = (clue, dir) => {
    setDirection(dir);
    setFocusedCell({ row: clue.row, col: clue.col });
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      {/* Wrapper Background yang merespons dark mode */}
      <div className="min-h-screen font-sans p-4 md:p-10 flex flex-col items-center transition-colors duration-500 bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-100 text-slate-800 dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#1e1b4b] dark:to-[#09090b] dark:text-slate-200 selection:bg-emerald-500/30">
        
        {/* Toggle Switch Top Right */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="absolute top-4 right-4 md:top-8 md:right-8 p-3 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-md dark:shadow-none hover:scale-110 active:scale-95 transition-all duration-300"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.758a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        <div className="mb-10 text-center animate-fade-in-down mt-6 md:mt-0">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400 drop-shadow-sm mb-3 tracking-tight">
            CrossWise
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-lg font-medium tracking-wide">
            Teka-Teki Silang Premium
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 w-full max-w-[1400px] justify-center items-start">
          
          {/* Papan Puzzle */}
          <div className="w-full xl:w-auto bg-white/60 dark:bg-white/[0.03] backdrop-blur-2xl border border-white/50 dark:border-white/10 rounded-3xl p-6 md:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex flex-col items-center transition-colors duration-500">
            
            <div className="flex flex-col border-[2px] border-slate-300 dark:border-slate-800/80 rounded-xl overflow-hidden shadow-xl dark:shadow-2xl bg-white/50 dark:bg-slate-900/40 transition-colors duration-500">
              {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                  {row.map((cell, colIndex) => {
                    const isBlackCell = cell === null;
                    const isFocused = focusedCell?.row === rowIndex && focusedCell?.col === colIndex;
                    const isWordActive = activeWordCells.includes(`${rowIndex}-${colIndex}`);
                    
                    let cellClasses = "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border border-slate-200 dark:border-slate-700/50 relative flex items-center justify-center transition-all duration-300 ";
                    
                    if (isBlackCell) {
                      cellClasses += "bg-slate-900 dark:bg-slate-950/90"; 
                    } else {
                      if (isFocused) {
                        cellClasses += "bg-emerald-100 dark:bg-emerald-500/20 ring-inset ring-2 ring-emerald-500 dark:ring-emerald-400 scale-[1.05] shadow-[0_0_15px_rgba(16,185,129,0.3)] dark:shadow-[0_0_15px_rgba(52,211,153,0.5)] z-10 ";
                      } else if (isWordActive) {
                        cellClasses += "bg-blue-100 dark:bg-cyan-900/60 shadow-inner ";
                      } else {
                        cellClasses += "bg-white/80 hover:bg-slate-50 dark:bg-slate-800/60 dark:hover:bg-slate-700/60 ";
                      }
                    }

                    return (
                      <div 
                        key={`${rowIndex}-${colIndex}`} 
                        className={cellClasses} 
                        onClick={() => !isBlackCell && handleCellClick(rowIndex, colIndex)}
                      >
                        {!isBlackCell && (
                          <>
                            {cellNumbers[`${rowIndex}-${colIndex}`] && (
                              <span className="absolute top-0.5 left-1 text-[9px] sm:text-[11px] text-slate-400 dark:text-cyan-200/70 font-semibold select-none pointer-events-none transition-colors">
                                {cellNumbers[`${rowIndex}-${colIndex}`]}
                              </span>
                            )}
                            <input
                              ref={(el) => (inputRefs.current[`${rowIndex}-${colIndex}`] = el)}
                              type="text"
                              maxLength="1"
                              value={cell}
                              onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                              onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                              className="w-full h-full bg-transparent text-center text-lg sm:text-2xl font-bold text-slate-800 dark:text-white uppercase outline-none caret-emerald-500 dark:caret-emerald-400 cursor-default transition-colors"
                            />
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <button 
              className="mt-10 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 dark:from-cyan-600 dark:to-emerald-600 dark:hover:from-cyan-500 dark:hover:to-emerald-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl dark:shadow-[0_0_20px_rgba(16,185,129,0.3)] dark:hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-all duration-300 active:scale-95 text-lg w-full max-w-xs tracking-wide uppercase"
              onClick={checkAnswers}
            >
              Periksa Jawaban
            </button>
          </div>

          {/* Panel Daftar Pertanyaan */}
          <div className="w-full xl:w-96 bg-white/60 dark:bg-white/[0.03] backdrop-blur-2xl border border-white/50 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex flex-col min-h-[400px] xl:max-h-[820px] transition-colors duration-500">
            
            <div className="overflow-y-auto custom-scrollbar pr-3 flex-1 space-y-8">
              
              {/* Mendatar */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-cyan-400 border-b border-slate-200 dark:border-white/10 pb-3 flex items-center gap-2 transition-colors">
                  <span className="bg-blue-100 dark:bg-cyan-900/50 p-1.5 rounded-lg text-blue-600 dark:text-cyan-300 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </span>
                  Mendatar
                </h3>
                <ol className="space-y-2">
                  {clues.across.map((clue) => {
                    const isActive = direction === "across" && activeClueNumber === clue.number;
                    return (
                      <li 
                        key={`across-${clue.number}`} 
                        className={`p-3 rounded-xl cursor-pointer transition-all duration-300 transform ${isActive ? "bg-blue-100 border-l-4 border-blue-500 text-blue-900 dark:bg-cyan-500/20 dark:border-cyan-400 dark:text-white shadow-md shadow-blue-500/10 translate-x-1" : "text-slate-600 dark:text-slate-400 hover:bg-white/40 dark:hover:bg-white/5 border-l-4 border-transparent hover:text-slate-900 dark:hover:text-slate-200"}`}
                        onClick={() => onClueClick(clue, "across")}
                      >
                        <span className="font-bold mr-2 opacity-80">{clue.number}.</span>
                        {clue.clue}
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Menurun */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-emerald-600 dark:text-emerald-400 border-b border-slate-200 dark:border-white/10 pb-3 flex items-center gap-2 transition-colors">
                  <span className="bg-emerald-100 dark:bg-emerald-900/50 p-1.5 rounded-lg text-emerald-600 dark:text-emerald-300 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
                  </span>
                  Menurun
                </h3>
                <ol className="space-y-2">
                  {clues.down.map((clue) => {
                    const isActive = direction === "down" && activeClueNumber === clue.number;
                    return (
                      <li 
                        key={`down-${clue.number}`} 
                        className={`p-3 rounded-xl cursor-pointer transition-all duration-300 transform ${isActive ? "bg-emerald-100 border-l-4 border-emerald-500 text-emerald-900 dark:bg-emerald-500/20 dark:border-emerald-400 dark:text-white shadow-md shadow-emerald-500/10 translate-x-1" : "text-slate-600 dark:text-slate-400 hover:bg-white/40 dark:hover:bg-white/5 border-l-4 border-transparent hover:text-slate-900 dark:hover:text-slate-200"}`}
                        onClick={() => onClueClick(clue, "down")}
                      >
                        <span className="font-bold mr-2 opacity-80">{clue.number}.</span>
                        {clue.clue}
                      </li>
                    );
                  })}
                </ol>
              </div>

            </div>
          </div>
        </div>

        {/* Modern Modal Validation */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-slate-900/30 dark:bg-slate-950/80 backdrop-blur-sm transition-opacity" 
              onClick={() => setShowModal(false)}
            ></div>
            
            <div className={`relative w-full max-w-md bg-white dark:bg-slate-900 border transition-colors ${modalData.isSuccess ? 'border-emerald-300 dark:border-emerald-500/50 shadow-emerald-400/20 dark:shadow-[0_0_50px_rgba(16,185,129,0.3)] animate-pop' : 'border-rose-300 dark:border-rose-500/50 shadow-rose-400/20 dark:shadow-[0_0_50px_rgba(244,63,94,0.3)] animate-wiggle'} shadow-2xl rounded-3xl p-8 z-10 flex flex-col overflow-hidden`}>
              
              {/* Dekorasi Glow Latar Belakang Modal */}
              <div className={`absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-30 dark:opacity-20 pointer-events-none ${modalData.isSuccess ? 'bg-emerald-400' : 'bg-rose-400'}`}></div>
              
              <h2 className={`text-3xl font-extrabold mb-2 ${modalData.isSuccess ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
                {modalData.title}
              </h2>
              
              <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm font-medium">
                {modalData.isSuccess ? "Pekerjaan yang memuaskan!" : "Ditemukan beberapa kesalahan input."}
              </p>

              <div className="text-slate-700 dark:text-slate-200 mb-8 max-h-[40vh] overflow-y-auto custom-scrollbar pr-3 space-y-3">
                {modalData.messages.map((msg, i) => (
                  <div key={i} className="flex gap-3 bg-slate-50/80 dark:bg-white/5 p-3 rounded-lg border border-slate-100 dark:border-white/5">
                    <span className={`mt-0.5 font-bold ${modalData.isSuccess ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {modalData.isSuccess ? '✓' : '✗'}
                    </span>
                    <p className="text-sm font-medium leading-relaxed">{msg}</p>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setShowModal(false)}
                className="mt-auto w-full py-3.5 bg-slate-800 dark:bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                Kembali ke Papan
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Crossword;
