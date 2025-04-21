async function cargarDatos() {
  const [mensajes, vehiculos] = await Promise.all([
    fetch('data/mensajes.json').then(r => r.json()),
    fetch('data/vehiculos.json').then(r => r.json())
  ]);

  const tabla = document.querySelector('#tablaPiezas tbody');
  const selector = document.getElementById('vehiculoSelect');
  const busquedaInput = document.getElementById('busquedaInput');

  const vehiculosUnicos = [...new Set(mensajes.map(m => m.clasificacion?.vehiculo || 'Desconocido'))];
  vehiculosUnicos.forEach(v => {
    const opt = document.createElement('option');
    opt.value = v;
    opt.textContent = v;
    selector.appendChild(opt);
  });

  function mostrarFiltrados(filtroVehiculo = '', texto = '') {
    const textoLower = texto.toLowerCase();
    tabla.innerHTML = '';
    mensajes
      .filter(m =>
        (!filtroVehiculo || m.clasificacion?.vehiculo === filtroVehiculo) &&
        (
          m.mensaje?.toLowerCase().includes(textoLower) ||
          m.clasificacion?.pieza?.toLowerCase().includes(textoLower) ||
          m.usuario?.toLowerCase().includes(textoLower)
        )
      )
      .forEach(m => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${m.clasificacion?.vehiculo || ''}</td>
          <td>${m.clasificacion?.pieza || ''}</td>
          <td>${m.mensaje}</td>
          <td>${m.usuario || ''}</td>
        `;
        tabla.appendChild(row);
      });
  }

  selector.addEventListener('change', () => {
    mostrarFiltrados(selector.value, busquedaInput.value);
  });

  busquedaInput.addEventListener('input', () => {
    mostrarFiltrados(selector.value, busquedaInput.value);
  });

  mostrarFiltrados();
}

cargarDatos();
