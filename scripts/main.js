import { fetchJSON } from '../utils/fetchData.js';

// Función para renderizar los modelos en la página intermedia
export async function renderModelosPorTipo(tipo) {
  const contenedor = document.getElementById("contenedorModelos");
  const data = await fetchJSON('https://raw.githubusercontent.com/BeteranoMotors/beterano-data/main/data/vehiculos.json');

  const modelosUnicos = new Map();

  data.forEach(v => {
    if (v.Tipo === tipo) {
      const key = `${v.Modelo}|${v["Serie/Generacion"]}`;
      if (!modelosUnicos.has(key)) {
        modelosUnicos.set(key, {
          modelo: v.Modelo,
          generacion: v["Serie/Generacion"]
        });
      }
    }
  });

  modelosUnicos.forEach(({ modelo, generacion }) => {
    const div = document.createElement("div");
    div.className = "tarjeta";

    div.innerHTML = `
      <h3>${modelo}</h3>
      <p>${generacion}</p>
      <a href="catalogo_vehiculo.html?modelo=${encodeURIComponent(modelo)}&generacion=${encodeURIComponent(generacion)}">Ver catálogo</a>
    `;

    contenedor.appendChild(div);
  });
}