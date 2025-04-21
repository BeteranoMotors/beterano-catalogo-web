async function cargarVehiculos() {
  const contenedor = document.getElementById("listaVehiculos");

  try {
    const response = await fetch("https://raw.githubusercontent.com/BeteranoMotors/beterano-data/main/data/vehiculos.json");
    const datos = await response.json();

    const modelosUnicos = [...new Set(
      datos
        .filter(v => v.Tipo === tipoSeleccionado)
        .map(v => v.Modelo)
    )].sort();

    modelosUnicos.forEach(modelo => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = "catalogWhatsapp.html?vehiculo=" + encodeURIComponent(modelo);
      link.textContent = modelo;
      li.appendChild(link);
      contenedor.appendChild(li);
    });
  } catch (error) {
    console.error("❌ Error al cargar vehículos:", error);
  }
}

cargarVehiculos();
