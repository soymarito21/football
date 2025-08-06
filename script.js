// Registro
function register() {
  const user = document.getElementById('newUser').value;
  const pass = document.getElementById('newPass').value;
  if (user && pass) {
    localStorage.setItem('user_' + user, pass);
    alert('Registrado exitosamente');
    window.location.href = 'login.html';
  } else {
    alert('Completa todos los campos');
  }
}

// Inicio de sesión
function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  const savedPass = localStorage.getItem('user_' + user);
  if (savedPass && pass === savedPass) {
    localStorage.setItem('loggedUser', user);
    window.location.href = 'create-team.html';
  } else {
    alert('Usuario o contraseña incorrectos');
  }
}

// Agregar jugador
let playerId = 0;

function addPlayer() {
  const container = document.getElementById('players');
  const div = document.createElement('div');
  div.innerHTML = `
    <h4>Jugador ${playerId + 1}</h4>
    <input placeholder="Nombre" id="name${playerId}">
    <input placeholder="Dorsal" id="number${playerId}">
    <input placeholder="Nacionalidad" id="country${playerId}">
    <input placeholder="Posición" id="position${playerId}">
    <input placeholder="Valoración (0-100)" id="rating${playerId}">
    <hr>
  `;
  container.appendChild(div);
  playerId++;
}

// Guardar equipo
function saveTeam() {
  const teamName = document.getElementById('teamName').value;
  const players = [];
  for (let i = 0; i < playerId; i++) {
    const player = {
      name: document.getElementById(`name${i}`).value,
      number: document.getElementById(`number${i}`).value,
      country: document.getElementById(`country${i}`).value,
      position: document.getElementById(`position${i}`).value,
      rating: parseInt(document.getElementById(`rating${i}`).value)
    };
    players.push(player);
  }
  const user = localStorage.getItem('loggedUser');
  if (!user) {
    alert('No has iniciado sesión');
    return;
  }
  let teams = JSON.parse(localStorage.getItem('teams_' + user) || '[]');
  teams.push({ teamName, players });
  localStorage.setItem('teams_' + user, JSON.stringify(teams));
  alert('Equipo guardado exitosamente');
}

// Enfrentar equipos
function battleTeams() {
  const user = localStorage.getItem('loggedUser');
  const teams = JSON.parse(localStorage.getItem('teams_' + user) || '[]');
  if (teams.length < 2) {
    alert('Necesitas al menos 2 equipos guardados');
    return;
  }
  const [team1, team2] = teams.slice(-2);
  const score1 = team1.players.reduce((sum, p) => sum + (p.rating || 0), 0);
  const score2 = team2.players.reduce((sum, p) => sum + (p.rating || 0), 0);
  let result = `⚽ ${team1.teamName} (${score1}) vs ${team2.teamName} (${score2})\n\n`;
  result += score1 > score2 ? `🏆 Gana ${team1.teamName}` :
            score2 > score1 ? `🏆 Gana ${team2.teamName}` :
            '🤝 ¡Empate!';
  document.getElementById('results').textContent = result;
}
