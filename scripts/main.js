import { fetchJSON } from '../utils/fetchData.js';

export async function renderTipoCatalogo(tipo) {
  const contenedor = document.getElementById("vehiculos-container");
  const data = await fetchJSON('https://raw.githubusercontent.com/BeteranoMotors/beterano-data/main/data/vehiculos.json');

  const modelosUnicos = new Map();

  data.forEach(v => {
    if (v.Tipo === tipo) {
      const key = `${v.Modelo}|${v["Serie/Generacion"]}`;
      if (!modelosUnicos.has(key)) {
        modelosUnicos.set(key, v);
      }
    }
  });

  modelosUnicos.forEach(vehiculo => {
    const modelo = vehiculo.Modelo;
    const generacion = vehiculo["Serie/Generacion"];
    const nombreCompleto = `${modelo} ${generacion}`;

    const div = document.createElement("div");
    div.className = "hero-card";

    // Imagen o fallback
    div.style.backgroundImage = vehiculo.Imagen
      ? `url(${vehiculo.Imagen})`
      : `linear-gradient(to right, #222, #333)`;

    const link = document.createElement("a");
    link.href = `catalogo_vehiculo.html?modelo=${encodeURIComponent(modelo)}&generacion=${encodeURIComponent(generacion)}`;
    link.textContent = nombreCompleto;

    div.appendChild(link);
    contenedor.appendChild(div);
  });
}
