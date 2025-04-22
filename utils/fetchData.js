
// utils/fetchData.js

export async function fetchJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al cargar: " + url);
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
