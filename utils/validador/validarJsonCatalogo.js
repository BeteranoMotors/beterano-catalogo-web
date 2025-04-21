const fs = require('fs');
const path = require('path');

const RUTA = path.resolve(__dirname, '../../97 Catalogo Web/beterano-catalogo-web/data/mensajes.json');

function contieneTelefono(texto) {
  return /(\+?\d{1,3})?\s?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}/.test(texto);
}

function contieneNombrePropio(texto) {
  return /\b(Juan|Carlos|Pedro|Luis|Ana|María|José|Miguel)\b/i.test(texto);
}

function validarMensajes(mensajes) {
  const errores = [];

  mensajes.forEach((m, i) => {
    const ubicacion = `Registro ${i + 1}`;

    if (!m.clasificacion || !m.clasificacion.vehiculo || !m.clasificacion.pieza) {
      errores.push(`${ubicacion}: Clasificación incompleta`);
    }

    if (m.usuario && contieneTelefono(m.usuario)) {
      errores.push(`${ubicacion}: Posible número de teléfono en 'usuario'`);
    }

    if (m.usuario && contieneNombrePropio(m.usuario)) {
      errores.push(`${ubicacion}: Posible nombre propio en 'usuario'`);
    }

    if (m.mensaje && (m.mensaje.includes('<script') || m.mensaje.includes('<a '))) {
      errores.push(`${ubicacion}: Contenido sospechoso en 'mensaje'`);
    }
  });

  return errores;
}

try {
  const data = fs.readFileSync(RUTA, 'utf-8');
  const mensajes = JSON.parse(data);

  const errores = validarMensajes(mensajes);
  if (errores.length > 0) {
    console.error("❌ Errores encontrados en mensajes.json:");
    errores.forEach(err => console.error(" - " + err));
    process.exit(1);
  } else {
    console.log("✅ Validación completada. No se encontraron errores.");
  }
} catch (err) {
  console.error("⚠️ Error al leer o validar el archivo:", err.message);
  process.exit(1);
}
