async function cargarVehiculos() {
  const contenedor = document.getElementById("listaVehiculos");
  const datos = await fetch("https://raw.githubusercontent.com/BeteranoMotors/beterano-data/main/data/vehiculos.json")
    .then(r => r.json())
    .catch(error => {
      console.error("Error al cargar vehiculos.json:", error);
      return [];
    });

  const modelos = [...new Set(
    datos
      .filter(v => v.Tipo === tipoSeleccionado)  // Nota: T mayúscula
      .map(v => v.Modelo)                        // Nota: M mayúscula
  )].sort();

  modelos.forEach(modelo => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = "catalogWhatsapp.html?vehiculo=" + encodeURIComponent(modelo);
    link.textContent = modelo;
    li.appendChild(link);
    contenedor.appendChild(li);
  });
}

cargarVehiculos();
