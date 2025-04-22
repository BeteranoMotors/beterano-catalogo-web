// scripts/main.js

async function cargarModelosPorTipo() {
    const params = new URLSearchParams(window.location.search);
    const tipoSeleccionado = params.get("tipo");
  
    if (!tipoSeleccionado) {
      document.body.innerHTML = "<p>Tipo no especificado</p>";
      return;
    }
  
    const contenedor = document.getElementById("listaModelos");
  
    try {
      const res = await fetch("https://raw.githubusercontent.com/BeteranoMotors/beterano-data/main/data/vehiculos.json");
      const data = await res.json();
  
      // Filtrar por tipo y mapear combinaciones únicas Modelo + Serie/Generacion
      const combinacionesUnicas = Array.from(
        new Set(
          data
            .filter(v => v.Tipo === tipoSeleccionado)
            .map(v => `${v.Modelo}|||${v["Serie/Generacion"]}`)
        )
      );
  
      // Renderizar tarjetas
      combinacionesUnicas.forEach(item => {
        const [modelo, serie] = item.split("|||");
  
        const card = document.createElement("div");
        card.className = "modelo-card";
  
        card.innerHTML = `
          <h3>${modelo}</h3>
          <p>${serie}</p>
          <a href="catalogo_vehiculo.html?modelo=${encodeURIComponent(modelo)}&serie=${encodeURIComponent(serie)}">Ver catálogo</a>
        `;
  
        contenedor.appendChild(card);
      });
  
    } catch (error) {
      console.error("Error cargando vehículos:", error);
      contenedor.innerHTML = "<p>Error al cargar datos de vehículos.</p>";
    }
  }
  
  cargarModelosPorTipo();
  