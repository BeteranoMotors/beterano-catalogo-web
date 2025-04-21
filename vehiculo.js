async function cargarVehiculos() {
  const contenedor = document.getElementById("listaVehiculos");
  const datos = await fetch("https://raw.githubusercontent.com/BeteranoMotors/beterano-data/main/vehiculos.json").then(r => r.json());
  const modelos = [...new Set(datos.filter(v => v.tipo === tipoSeleccionado).map(v => v.modelo))].sort();
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
