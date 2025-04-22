// Cargar vehículos desde beterano-data según tipo
async function cargarModelos() {
  const params = new URLSearchParams(window.location.search);
  const tipo = params.get('tipo');
  const container = document.getElementById('vehiculos-container');
  const url = "https://raw.githubusercontent.com/BeteranoMotors/beterano-data/main/data/vehiculos.json";

  const res = await fetch(url);
  const data = await res.json();
  const modelos = data.filter(v => v.Tipo === tipo);

  modelos.forEach(v => {
    const card = document.createElement('div');
    card.className = 'tarjeta';
    card.innerHTML = `<h3>${v.Modelo}</h3><p>${v.Motor || ''}</p>
      <a href="catalogo_vehiculo.html?vehiculo=${encodeURIComponent(v.Modelo)}">Ver catálogo</a>`;
    container.appendChild(card);
  });
}
cargarModelos();