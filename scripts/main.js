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
    div.className = "tarjeta-modelo";

    const imageName = `${modelo}-${generacion}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const imageUrl = `https://raw.githubusercontent.com/BeteranoMotors/beterano-data/main/img/vehiculos/modelo/${imageName}.jpg`;

    div.style.backgroundImage = `url('${imageUrl}')`;
    div.style.backgroundSize = 'cover';
    div.style.backgroundPosition = 'center';

    div.innerHTML = `
      <div class="tarjeta-overlay">
        <h2 class="titulo-modelo">${modelo} ${generacion}</h2>
        <a href="catalogo_vehiculo.html?modelo=${encodeURIComponent(modelo)}&generacion=${encodeURIComponent(generacion)}">Ver catálogo</a>
      </div>
    `;

    contenedor.appendChild(div);
  });
}
