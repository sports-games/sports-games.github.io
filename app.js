// Sports Games - Main Game Engine
// Handles Grid, Guesser, and Career Path modes for Cricket, Football, F1, and NBA

const CONFIG = {
  cricket: {
    db: 'data/cricket.json',
    rows: ['India', 'Pakistan', 'Australia', 'England', 'CSK', 'RCB', 'MI', 'Right-hand bat', 'Left-hand bat'],
    cols: ['RCB', 'MI', 'CSK', 'KKR', 'RR', 'SRH', 'World Cup Winner', '300+ Wickets', '10k+ International Runs', 'Wicketkeeper'],
    nationalTeams: ["India", "Pakistan", "Australia", "England", "South Africa", "West Indies", "New Zealand", "Bangladesh", "Sri Lanka", "Afghanistan"],
    compare: (guess, target) => {
      const gNation = guess.teams.find(t => CONFIG.cricket.nationalTeams.includes(t)) || "Other";
      const tNation = target.teams.find(t => CONFIG.cricket.nationalTeams.includes(t)) || "Other";
      const sharedTeams = guess.teams.filter(t => target.teams.includes(t) && !CONFIG.cricket.nationalTeams.includes(t));
      
      const gBat = guess.attributes.find(a => a.includes("bat")) || "Right-hand bat";
      const tBat = target.attributes.find(a => a.includes("bat")) || "Right-hand bat";
      const gBowl = guess.attributes.find(a => a.includes("bowler")) || "None";
      const tBowl = target.attributes.find(a => a.includes("bowler")) || "None";

      return [
        { label: "Nation", value: gNation, status: gNation === tNation ? "match" : "no-match" },
        { label: "IPL Team", value: sharedTeams.length > 0 ? sharedTeams.join(", ") : "None", status: sharedTeams.length > 0 ? "match" : "no-match" },
        { label: "Batting", value: gBat, status: gBat === tBat ? "match" : "no-match" },
        { label: "Bowling", value: gBowl, status: gBowl === tBowl ? "match" : "no-match" },
        { label: "Keeper", value: guess.attributes.includes("Wicketkeeper") ? "Yes" : "No", status: guess.attributes.includes("Wicketkeeper") === target.attributes.includes("Wicketkeeper") ? "match" : "no-match" }
      ];
    }
  },
  football: {
    db: 'data/football.json',
    rows: ['Real Madrid', 'Barcelona', 'Manchester United', 'Manchester City', 'Liverpool', 'PSG', 'Bayern Munich', 'Forward', 'Midfielder'],
    cols: ['Chelsea', 'Arsenal', 'PSG', 'Bayern Munich', 'Argentina', 'Portugal', 'Brazil', 'France', 'England', 'Champions League Winner', 'World Cup Winner', "Ballon d'Or Winner"],
    nationalities: ["Argentina", "Portugal", "Brazil", "France", "England", "Spain", "Germany", "Italy", "Netherlands", "Belgium", "Croatia", "Poland", "Uruguay", "Colombia", "Belgium"],
    compare: (guess, target) => {
      const gNation = guess.attributes.find(a => CONFIG.football.nationalities.includes(a)) || "Other";
      const tNation = target.attributes.find(a => CONFIG.football.nationalities.includes(a)) || "Other";
      const sharedClubs = guess.teams.filter(t => target.teams.includes(t));
      
      const positions = ["Forward", "Midfielder", "Defender", "Goalkeeper"];
      const gPos = guess.attributes.find(a => positions.includes(a)) || "Midfielder";
      const tPos = target.attributes.find(a => positions.includes(a)) || "Midfielder";

      const gUcl = guess.attributes.includes("Champions League Winner") ? "Yes" : "No";
      const tUcl = target.attributes.includes("Champions League Winner") ? "Yes" : "No";
      const gBdor = guess.attributes.includes("Ballon d'Or Winner") ? "Yes" : "No";
      const tBdor = target.attributes.includes("Ballon d'Or Winner") ? "Yes" : "No";

      return [
        { label: "Nation", value: gNation, status: gNation === tNation ? "match" : "no-match" },
        { label: "Clubs", value: sharedClubs.length > 0 ? sharedClubs.join(", ") : "None", status: sharedClubs.length > 0 ? "match" : "no-match" },
        { label: "Position", value: gPos, status: gPos === tPos ? "match" : "no-match" },
        { label: "UCL Cup", value: gUcl, status: gUcl === tUcl ? "match" : "no-match" },
        { label: "Ballon d'Or", value: gBdor, status: gBdor === tBdor ? "match" : "no-match" }
      ];
    }
  },
  f1: {
    db: 'data/f1.json',
    rows: ['Ferrari', 'Red Bull', 'Mercedes', 'McLaren', 'Renault', 'United Kingdom', 'Germany', 'Spain', 'France'],
    cols: ['McLaren', 'Ferrari', 'Red Bull', 'Mercedes', 'Aston Martin', 'Williams', 'Toro Rosso', 'Sauber', 'World Champion', '10+ GP Wins', 'Pole Position Winner', 'Podium Finisher'],
    nationalities: ["United Kingdom", "Netherlands", "Germany", "France", "Spain", "Australia", "Finland", "Brazil", "Canada", "Japan", "Monaco", "Italy", "Austria", "Sweden", "Mexico"],
    compare: (guess, target) => {
      const gNation = guess.attributes.find(a => CONFIG.f1.nationalities.includes(a)) || "Other";
      const tNation = target.attributes.find(a => CONFIG.f1.nationalities.includes(a)) || "Other";
      const sharedTeams = guess.teams.filter(t => target.teams.includes(t));
      
      const gActive = guess.attributes.includes("Active Driver") ? "Active" : "Retired";
      const tActive = target.attributes.includes("Active Driver") ? "Active" : "Retired";
      const gChamp = guess.attributes.includes("World Champion") ? "Yes" : "No";
      const tChamp = target.attributes.includes("World Champion") ? "Yes" : "No";

      return [
        { label: "Nation", value: gNation, status: gNation === tNation ? "match" : "no-match" },
        { label: "Teams", value: sharedTeams.length > 0 ? sharedTeams.join(", ") : "None", status: sharedTeams.length > 0 ? "match" : "no-match" },
        { label: "Status", value: gActive, status: gActive === tActive ? "match" : "no-match" },
        { label: "Champion", value: gChamp, status: gChamp === tChamp ? "match" : "no-match" },
        { label: "Podiums", value: guess.attributes.includes("Podium Finisher") ? "Yes" : "No", status: guess.attributes.includes("Podium Finisher") === target.attributes.includes("Podium Finisher") ? "match" : "no-match" }
      ];
    }
  },
  nba: {
    db: 'data/nba.json',
    rows: ['Lakers', 'Warriors', 'Suns', 'Bucks', 'Nuggets', 'Sixers', 'Mavericks', 'Celtics', 'Heat'],
    cols: ['Heat', 'Warriors', 'Lakers', 'Nets', 'Clippers', 'Thunder', 'Mavericks', 'Guard', 'Forward', 'Center', 'NBA Champion', 'MVP Winner', 'All-Star'],
    compare: (guess, target) => {
      const positions = ["Guard", "Forward", "Center"];
      const gPos = guess.attributes.find(a => positions.includes(a)) || "Forward";
      const tPos = target.attributes.find(a => positions.includes(a)) || "Forward";
      const sharedTeams = guess.teams.filter(t => target.teams.includes(t));

      const gChamp = guess.attributes.includes("NBA Champion") ? "Yes" : "No";
      const tChamp = target.attributes.includes("NBA Champion") ? "Yes" : "No";
      const gMvp = guess.attributes.includes("MVP Winner") ? "Yes" : "No";
      const tMvp = target.attributes.includes("MVP Winner") ? "Yes" : "No";
      const gStar = guess.attributes.includes("All-Star") ? "Yes" : "No";
      const tStar = target.attributes.includes("All-Star") ? "Yes" : "No";

      return [
        { label: "Position", value: gPos, status: gPos === tPos ? "match" : "no-match" },
        { label: "Teams", value: sharedTeams.length > 0 ? sharedTeams.join(", ") : "None", status: sharedTeams.length > 0 ? "match" : "no-match" },
        { label: "Champion", value: gChamp, status: gChamp === tChamp ? "match" : "no-match" },
        { label: "MVP", value: gMvp, status: gMvp === tMvp ? "match" : "no-match" },
        { label: "All-Star", value: gStar, status: gStar === tStar ? "match" : "no-match" }
      ];
    }
  }
};

let currentSport = 'cricket';
let gameMode = 'grid'; // grid, guesser, career
let currentDb = [];

// Daily Seed parameters
let todayStr = new Date().toISOString().split('T')[0];
let dailySeed = 0;

// Game state variables
let rowCriteria = [];
let colCriteria = [];
let activeCell = null; // { row, col, index }
let guessesLeft = 9;
let gridState = Array(9).fill(null);

let mysteryPlayer = null;
let playerGuesses = []; // list of guessed player names

// Seeded LCG
function SeededRandom(seed) {
  this.seed = seed;
  this.next = function() {
    this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
    return this.seed / 4294967296;
  };
}

function getSeedFromDate(dateStr) {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = dateStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

// Check player attributes
function playerMatchesCriteria(player, criterion) {
  return player.teams.includes(criterion) || player.attributes.includes(criterion);
}

function hasValidIntersection(playerList, crit1, crit2) {
  return playerList.some(player => 
    playerMatchesCriteria(player, crit1) && playerMatchesCriteria(player, crit2)
  );
}

function generateSolvableGrid(playerList, sportConfig, baseSeed) {
  let seedOffset = 0;
  while (true) {
    const prng = new SeededRandom(baseSeed + seedOffset);
    const rows = [];
    const cols = [];
    
    const rowPool = [...sportConfig.rows];
    while (rows.length < 3 && rowPool.length > 0) {
      const idx = Math.floor(prng.next() * rowPool.length);
      rows.push(rowPool.splice(idx, 1)[0]);
    }
    
    const colPool = [...sportConfig.cols];
    while (cols.length < 3 && colPool.length > 0) {
      const idx = Math.floor(prng.next() * colPool.length);
      const chosen = colPool.splice(idx, 1)[0];
      if (!rows.includes(chosen)) {
        cols.push(chosen);
      }
    }

    if (rows.length < 3 || cols.length < 3) {
      seedOffset++;
      continue;
    }

    let solvable = true;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (!hasValidIntersection(playerList, rows[r], cols[c])) {
          solvable = false;
          break;
        }
      }
      if (!solvable) break;
    }
    
    if (solvable) {
      return { rows, cols };
    }
    seedOffset++;
  }
}

// Initializer
async function initEngine() {
  // Parse Mode and Sport from URL
  const urlParams = new URLSearchParams(window.location.search);
  currentSport = urlParams.get('sport') || 'cricket';
  
  const path = window.location.pathname;
  if (path.includes('grid')) {
    gameMode = 'grid';
  } else if (path.includes('guesser')) {
    gameMode = 'guesser';
  } else if (path.includes('career')) {
    gameMode = 'career';
  }
  
  // Set Theme Class
  document.getElementById('body-theme').className = 'theme-' + currentSport;
  
  // Highlight active nav link
  const navLink = document.getElementById('nav-' + currentSport);
  if (navLink) navLink.classList.add('active');
  
  // Load database
  const config = CONFIG[currentSport];
  try {
    const res = await fetch(config.db);
    currentDb = await res.json();
  } catch (err) {
    console.error("Failed to load player database:", err);
    return;
  }
  
  dailySeed = getSeedFromDate(todayStr + '-' + currentSport + '-' + gameMode);
  
  if (gameMode === 'grid') {
    initGridMode(config);
  } else {
    initGuesserMode();
  }
}

// Mode 1: Grid Game
function initGridMode(config) {
  const grid = generateSolvableGrid(currentDb, config, dailySeed);
  rowCriteria = grid.rows;
  colCriteria = grid.cols;
  
  guessesLeft = 9;
  gridState = Array(9).fill(null);
  
  // Restore State
  const key = `sportsgrid_grid_${currentSport}_${todayStr}`;
  const dataStr = localStorage.getItem(key);
  if (dataStr) {
    const data = JSON.parse(dataStr);
    gridState = data.gridState;
    guessesLeft = data.guessesLeft;
  }
  
  renderGrid();
  updateGuessesUI();
  updateStatsUI();
}

function renderGrid() {
  const container = document.getElementById('grid-layout');
  if (!container) return;
  container.innerHTML = '';
  
  const corner = document.createElement('div');
  corner.className = 'grid-cell grid-corner';
  container.appendChild(corner);
  
  for (let c = 0; c < 3; c++) {
    const header = document.createElement('div');
    header.className = 'grid-cell grid-header';
    header.innerText = colCriteria[c];
    container.appendChild(header);
  }
  
  for (let r = 0; r < 3; r++) {
    const header = document.createElement('div');
    header.className = 'grid-cell grid-header';
    header.innerText = rowCriteria[r];
    container.appendChild(header);
    
    for (let c = 0; c < 3; c++) {
      const idx = r * 3 + c;
      const cell = document.createElement('div');
      cell.className = 'grid-cell grid-play-cell';
      cell.dataset.index = idx;
      
      const solved = gridState[idx];
      if (solved) {
        cell.classList.add(solved.correct ? 'correct' : 'incorrect');
        if (solved.correct) {
          cell.innerHTML = `<div class="player-name">${solved.name}</div><div class="player-stat">✓</div>`;
        } else {
          cell.innerHTML = `<div class="player-name">X</div>`;
        }
      } else {
        if (guessesLeft > 0) {
          cell.addEventListener('click', () => openGuessModal(r, c, idx));
        }
      }
      container.appendChild(cell);
    }
  }
}

// Mode 2 & 3: Guesser and Career
function initGuesserMode() {
  const prng = new SeededRandom(dailySeed);
  
  // Pick target player (must have valid team list for career mode)
  let validPlayers = currentDb;
  if (gameMode === 'career') {
    validPlayers = currentDb.filter(p => p.teams.length >= 2);
  }
  
  mysteryPlayer = validPlayers[Math.floor(prng.next() * validPlayers.length)];
  
  guessesLeft = 6;
  playerGuesses = [];
  
  // Restore State
  const key = `sportsgrid_${gameMode}_${currentSport}_${todayStr}`;
  const dataStr = localStorage.getItem(key);
  if (dataStr) {
    const data = JSON.parse(dataStr);
    playerGuesses = data.guesses;
    guessesLeft = data.guessesLeft;
  }
  
  if (gameMode === 'career') {
    const timeline = mysteryPlayer.teams.join(" ➔ ");
    const clueBox = document.getElementById('career-clue-box');
    if (clueBox) clueBox.innerText = timeline;
  }
  
  renderGuessesLog();
  updateGuessesUI();
  updateStatsUI();
}

function renderGuessesLog() {
  const log = document.getElementById('guesses-log');
  if (!log) return;
  log.innerHTML = '';
  
  playerGuesses.forEach(gName => {
    const player = currentDb.find(p => p.name === gName);
    if (!player) return;
    
    const container = document.createElement('div');
    container.className = 'guess-row';
    
    if (gameMode === 'career') {
      const isCorrect = player.name === mysteryPlayer.name;
      container.innerHTML = `
        <div style="font-weight:700; font-size:0.9rem; color: ${isCorrect ? 'var(--correct-text)' : 'var(--incorrect-text)'}; padding: 0.5rem 0;">
          ${isCorrect ? '✓' : '✗'} ${player.name}
        </div>
      `;
    } else {
      // Compare attributes for Guesser Mode
      const comparisons = CONFIG[currentSport].compare(player, mysteryPlayer);
      
      // Add player name card first
      const nameCell = document.createElement('div');
      nameCell.className = 'guess-card-cell';
      nameCell.innerHTML = `<div class="guess-card-label">Name</div><div style="font-size:0.8rem">${player.name}</div>`;
      container.appendChild(nameCell);
      
      comparisons.forEach(c => {
        const cell = document.createElement('div');
        cell.className = `guess-card-cell ${c.status}`;
        cell.innerHTML = `
          <div class="guess-card-label">${c.label}</div>
          <div style="line-height:1.2">${c.value}</div>
        `;
        container.appendChild(cell);
      });
    }
    
    log.appendChild(container);
  });
}

// Share system builder
function shareResults() {
  let shareText = `Sports Games - ${currentSport.toUpperCase()} (${gameMode.toUpperCase()}) 🏆\n`;
  if (gameMode === 'grid') {
    for (let r = 0; r < 3; r++) {
      let rowText = '';
      for (let c = 0; c < 3; c++) {
        const solved = gridState[r * 3 + c];
        if (solved && solved.correct) {
          rowText += '🟩';
        } else {
          rowText += '🟥';
        }
      }
      shareText += rowText + '\n';
    }
  } else {
    const won = playerGuesses.includes(mysteryPlayer.name);
    shareText += won ? `Solved in ${playerGuesses.length}/6 guesses! 🎉\n` : `X/6 Guesses 🟥\n`;
    playerGuesses.forEach(gName => {
      shareText += gName === mysteryPlayer.name ? '🟩' : '🟥';
    });
    shareText += '\n';
  }
  
  shareText += `https://sports-games.github.io/`;
  
  navigator.clipboard.writeText(shareText).then(() => {
    alert("Results copied to clipboard!");
  });
}

// Local Storage triggers
function saveGameState() {
  const key = gameMode === 'grid' 
    ? `sportsgrid_grid_${currentSport}_${todayStr}` 
    : `sportsgrid_${gameMode}_${currentSport}_${todayStr}`;
    
  const data = gameMode === 'grid'
    ? { gridState, guessesLeft }
    : { guesses: playerGuesses, guessesLeft };
    
  localStorage.setItem(key, JSON.stringify(data));
}

function recordGameStats(win) {
  const statsKey = `sportsgrid_stats_${currentSport}_${gameMode}`;
  let stats = JSON.parse(localStorage.getItem(statsKey)) || { played: 0, completed: 0, streak: 0, maxStreak: 0 };
  
  stats.played += 1;
  if (win) {
    stats.completed += 1;
    stats.streak += 1;
    if (stats.streak > stats.maxStreak) stats.maxStreak = stats.streak;
  } else {
    stats.streak = 0;
  }
  
  localStorage.setItem(statsKey, JSON.stringify(stats));
  updateStatsUI();
}

function updateStatsUI() {
  const statsKey = `sportsgrid_stats_${currentSport}_${gameMode}`;
  const stats = JSON.parse(localStorage.getItem(statsKey)) || { played: 0, completed: 0, streak: 0, maxStreak: 0 };
  
  const p = document.getElementById('stat-played');
  const s = document.getElementById('stat-streak');
  const m = document.getElementById('stat-max');
  
  if (p) p.innerText = stats.played;
  if (s) s.innerText = stats.streak;
  if (m) m.innerText = stats.maxStreak;
}

function updateGuessesUI() {
  const cnt = document.getElementById('guesses-counter');
  if (cnt) cnt.innerText = guessesLeft;
  
  const sc = document.getElementById('share-container');
  if (!sc) return;
  
  const isOver = gameMode === 'grid'
    ? (guessesLeft === 0 || gridState.filter(c => c && c.correct).length === 9)
    : (guessesLeft === 0 || playerGuesses.includes(mysteryPlayer.name));
    
  sc.style.display = isOver ? 'flex' : 'none';
  
  // Disable inputs if game over
  const sInput = document.getElementById('search-input');
  if (isOver && sInput) {
    sInput.disabled = true;
    sInput.placeholder = "Game Over!";
  }
}

// Modal Guess Handlers
function openGuessModal(r, c, idx) {
  activeCell = { row: r, col: c, index: idx };
  document.getElementById('guess-modal').style.display = 'flex';
  document.getElementById('row-crit-display').innerText = rowCriteria[r];
  document.getElementById('col-crit-display').innerText = colCriteria[c];
  
  const sInput = document.getElementById('search-input');
  sInput.value = '';
  sInput.focus();
  document.getElementById('autocomplete-list').style.display = 'none';
}

function closeGuessModal() {
  document.getElementById('guess-modal').style.display = 'none';
  activeCell = null;
}

function handleSearchInput(e) {
  const query = e.target.value.toLowerCase().trim();
  const list = document.getElementById('autocomplete-list');
  list.innerHTML = '';
  
  if (!query) {
    list.style.display = 'none';
    return;
  }
  
  const matches = currentDb.filter(player => player.name.toLowerCase().includes(query)).slice(0, 5);
  
  if (matches.length > 0) {
    matches.forEach(player => {
      const item = document.createElement('div');
      item.className = 'autocomplete-item';
      item.innerText = player.name;
      item.addEventListener('click', () => submitSelectedGuess(player));
      list.appendChild(item);
    });
    list.style.display = 'block';
  } else {
    list.style.display = 'none';
  }
}

function submitSelectedGuess(player) {
  const list = document.getElementById('autocomplete-list');
  if (list) list.style.display = 'none';
  
  const sInput = document.getElementById('search-input');
  if (sInput) sInput.value = '';

  if (gameMode === 'grid') {
    if (!activeCell) return;
    const rCrit = rowCriteria[activeCell.row];
    const cCrit = colCriteria[activeCell.col];
    const isCorrect = playerMatchesCriteria(player, rCrit) && playerMatchesCriteria(player, cCrit);
    
    gridState[activeCell.index] = { name: player.name, correct: isCorrect };
    guessesLeft--;
    saveGameState();
    
    if (guessesLeft === 0 || gridState.filter(c => c && c.correct).length === 9) {
      recordGameStats(gridState.filter(c => c && c.correct).length === 9);
    }
    
    closeGuessModal();
    renderGrid();
    updateGuessesUI();
  } else {
    // Guesser or Career modes
    if (playerGuesses.includes(player.name)) {
      alert("You already guessed this player!");
      return;
    }
    
    playerGuesses.push(player.name);
    guessesLeft--;
    saveGameState();
    
    const isCorrect = player.name === mysteryPlayer.name;
    if (isCorrect || guessesLeft === 0) {
      recordGameStats(isCorrect);
    }
    
    renderGuessesLog();
    updateGuessesUI();
  }
}

// Page bindings
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  if (path.includes('grid.html') || path.includes('guesser.html') || path.includes('career.html')) {
    initEngine();
    
    const cModal = document.getElementById('close-modal-btn');
    if (cModal) cModal.addEventListener('click', closeGuessModal);
    
    const sInput = document.getElementById('search-input');
    if (sInput) sInput.addEventListener('input', handleSearchInput);
    
    const sBtn = document.getElementById('share-results-btn');
    if (sBtn) sBtn.addEventListener('click', shareResults);
  }
});
