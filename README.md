# BETERANO | Catálogo Web

Este repositorio contiene la interfaz web de visualización de piezas y mensajes técnicos extraídos desde grupos de WhatsApp, utilizando la base técnica centralizada de BETERANO y datos dinámicos alojados en hojas Excel.

## 🌐 Enlace al catálogo publicado

> https://beteranomotors.github.io/beterano-catalogo-web/

## 📁 Estructura del proyecto

📁 beterano-catalogo-web
├── catalogo_index.html             # Página principal: selección de tipo de vehículo (SUV / Wagon)
├── catalogo_Typ_index.html        # Página intermedia: muestra los modelos de un tipo (SUV o Wagon)
├── catalogo_vehiculo.html         # Página final: muestra piezas del modelo seleccionado
├── styles/
│   ├── config.css                 # Clases tipográficas reutilizables
│   └── style.css                  # Estilos generales
├── scripts/
│   ├── main.js                    # Script de carga de filtros y renderizado de tarjetas
│   └── helpers.js                 # Funciones auxiliares de parsing, búsqueda, etc.
├── utils/
│   └── fetchData.js               # Módulo para cargar y procesar datos externos
└── data/                          # (vacía en este repo; los datos se cargan desde URLs externas)


## 🧠 Concepto

El catálogo se alimenta de tres fuentes:

- **vehiculos.json** → extraído desde:  
  `https://raw.githubusercontent.com/BeteranoMotors/beterano-data/main/data/vehiculos.json`
  
- **biblioteca_piezas.json** → extraído desde:  
  `https://raw.githubusercontent.com/BeteranoMotors/beterano-data/main/data/biblioteca_piezas.json`

- **mensajes (WhatsApp)** → archivo Excel generado por el proyecto [`whatsapp-talks-catcher`](https://github.com/BeteranoMotors/whatsapp-talks-catcher)

Cada nivel de navegación filtra los datos según la selección anterior:
1. Se elige tipo de vehículo (SUV o Wagon)
2. Se muestra una lista de modelos únicos por tipo y generación (ej. "Range Rover | Classic")
3. Se carga la vista de catálogo con filtros dinámicos (ensamblaje, categoría, subcategoría...)

## 🔁 Reutilización del sistema

Este sistema puede adaptarse a cualquier otro catálogo técnico simplemente cambiando el archivo Excel de entrada. Se recomienda mantener la estructura actual para máxima compatibilidad.

## 🔧 Por hacer

- Mejorar diseño responsive y aspecto visual final
- Añadir filtros adicionales por año, combustible o motor
- Permitir descargas o exportación de los mensajes filtrados

## ✍️ Licencia

MIT — desarrollado por [Beterano Motors](https://beteranomotors.github.io)
