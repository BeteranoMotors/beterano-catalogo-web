// Este script espera recibir mensajes desde un JSON generado desde Excel
async function cargarCatalogo() {
  const params = new URLSearchParams(window.location.search);
  const vehiculo = params.get('vehiculo');
  document.getElementById('tituloVehiculo').textContent = "Catálogo: " + vehiculo;

  const res = await fetch('https://TU_REPOSITORIO/tu_excel_convertido.json'); // Reemplazar
  const data = await res.json();
  const contenedor = document.getElementById('catalogo');

  const piezas = data.filter(m => m.clasificacion?.vehiculo === vehiculo);
  piezas.forEach(p => {
    const card = document.createElement('div');
    card.className = 'tarjeta';
    card.innerHTML = `<h3>${p.clasificacion?.pieza || "Parte"}</h3>
      <p>${p.mensaje}</p><small>${p.usuario || ""}</small>`;
    contenedor.appendChild(card);
  });
}
cargarCatalogo();