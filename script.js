async function cargarDatos() {
  const mensajes = await fetch('data/mensajes.json').then(r => r.json());

  const tabla = document.querySelector('#tablaPiezas tbody');
  const vehiculoSelect = document.getElementById('vehiculoSelect');
  const ensamblajeSelect = document.getElementById('ensamblajeSelect');
  const categoriaSelect = document.getElementById('categoriaSelect');
  const subcategoriaSelect = document.getElementById('subcategoriaSelect');
  const busquedaInput = document.getElementById('busquedaInput');

  const [vehiculosData, piezasData] = await Promise.all([
    fetch('https://raw.githubusercontent.com/BeteranoMotors/beterano-data/main/vehiculos.json').then(r => r.json()),
    fetch('https://raw.githubusercontent.com/BeteranoMotors/beterano-data/main/biblioteca_piezas.json').then(r => r.json())
  ]);

  function llenarSelectUnico(selector, values) {
    selector.innerHTML = '<option value="">Todos</option>';
    [...new Set(values)].sort().forEach(v => {
      const opt = document.createElement('option');
      opt.value = v;
      opt.textContent = v;
      selector.appendChild(opt);
    });
  }

  llenarSelectUnico(vehiculoSelect, vehiculosData.map(v => v.modelo).filter(Boolean));
  llenarSelectUnico(ensamblajeSelect, piezasData.map(p => p.ensamblaje).filter(Boolean));
  llenarSelectUnico(categoriaSelect, piezasData.map(p => p.categoria).filter(Boolean));
  llenarSelectUnico(subcategoriaSelect, piezasData.map(p => p.subcategoria).filter(Boolean));

  function mostrarFiltrados() {
    const filtro = {
      vehiculo: vehiculoSelect.value,
      ensamblaje: ensamblajeSelect.value,
      categoria: categoriaSelect.value,
      subcategoria: subcategoriaSelect.value,
      texto: busquedaInput.value.toLowerCase()
    };

    tabla.innerHTML = '';
    mensajes
      .filter(m =>
        (!filtro.vehiculo || m.clasificacion?.vehiculo === filtro.vehiculo) &&
        (!filtro.ensamblaje || m.clasificacion?.ensamblaje === filtro.ensamblaje) &&
        (!filtro.categoria || m.clasificacion?.categoria === filtro.categoria) &&
        (!filtro.subcategoria || m.clasificacion?.subcategoria === filtro.subcategoria) &&
        (
          m.mensaje?.toLowerCase().includes(filtro.texto) ||
          m.clasificacion?.pieza?.toLowerCase().includes(filtro.texto) ||
          m.usuario?.toLowerCase().includes(filtro.texto)
        )
      )
      .forEach(m => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${m.clasificacion?.vehiculo || ''}</td>
          <td>${m.clasificacion?.ensamblaje || ''}</td>
          <td>${m.clasificacion?.categoria || ''}</td>
          <td>${m.clasificacion?.subcategoria || ''}</td>
          <td>${m.clasificacion?.pieza || ''}</td>
          <td>${m.mensaje}</td>
          <td>${m.usuario || ''}</td>
        `;
        tabla.appendChild(row);
      });
  }

  [vehiculoSelect, ensamblajeSelect, categoriaSelect, subcategoriaSelect, busquedaInput]
    .forEach(el => el.addEventListener('input', mostrarFiltrados));

  mostrarFiltrados();
}
cargarDatos();
