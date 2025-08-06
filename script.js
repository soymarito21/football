// Guardar usuario
function login() {
  const username = document.getElementById('username').value;
  if (username) {
    localStorage.setItem('user', username);
    location.href = 'create-team.html';
  } else {
    alert('Ingresa un nombre de usuario');
  }
}

// Agregar jugadores
let playerCount = 0;

function addPlayer() {
  const container = document.getElementById('players');
  const div = document.createElement('div');
  div.innerHTML = `
    <input placeholder="Nombre" id="name${playerCount}">
    <input placeholder="Dorsal" id="number${playerCount}">
    <input placeholder="Nacionalidad" id="country${playerCount}">
    <input placeholder="Posición" id="position${playerCount}">
    <input placeholder="Valoración (0-100)" id="rating${playerCount}">
    <br><br>
  `;
  container.appendChild(div);
  playerCount++;
}

// Guardar equipo
function saveTeam() {
  const teamName = document.getElementById('teamName').value;
  const players = [];
  for (let i = 0; i < playerCount; i++) {
    const player = {
      name: document.getElementById(`name${i}`).value,
      number: document.getElementById(`number${i}`).value,
      country: document.getElementById(`country${i}`).value,
      position: document.getElementById(`position${i}`).value,
      rating: parseInt(document.getElementById(`rating${i}`).value)
    };
    players.push(player);
  }
  let teams = JSON.parse(localStorage.getItem('teams') || '[]');
  teams.push({ teamName, players });
  localStorage.setItem('teams', JSON.stringify(teams));
  alert('Equipo guardado');
}

// Simular enfrentamiento
function battleTeams() {
  const teams = JSON.parse(localStorage.getItem('teams') || '[]');
  if (teams.length < 2) {
    alert('Necesitas al menos 2 equipos');
    return;
  }
  const [team1, team2] = teams.slice(-2);
  const score1 = team1.players.reduce((sum, p) => sum + p.rating, 0);
  const score2 = team2.players.reduce((sum, p) => sum + p.rating, 0);
  const result = `
${team1.teamName} (${score1}) vs ${team2.teamName} (${score2})\n
${score1 > score2 ? team1.teamName + ' gana!' :
 score2 > score1 ? team2.teamName + ' gana!' : '¡Empate!'}
  `;
  document.getElementById('results').textContent = result;
}
