
/* =========================
   📖 ESTRUCTURA BASE BIBLIA BOOK
========================= */

/*
Este módulo organiza la Biblia como:
- Antiguo Testamento
- Nuevo Testamento
- Libros → capítulos → versículos
*/

export const bibleStructure = {
  oldTestament: [
    "genesis",
    "exodus",
    "leviticus",
    "numbers",
    "deuteronomy"
  ],

  newTestament: [
    "matthew",
    "mark",
    "luke",
    "john",
    "acts",
    "romans",
    "revelation"
  ]
};

/* =========================
   📚 CARGAR LIBRO
========================= */
export async function getBookChapter(book, chapter = 1) {
  try {
    const res = await fetch(`https://bible-api.com/${book}+${chapter}`);
    const data = await res.json();

    return {
      text: data.text,
      reference: data.reference,
      verses: data.verses || []
    };

  } catch (error) {
    return {
      text: "Error cargando libro",
      reference: "",
      verses: []
    };
  }
}

/* =========================
   ⭐ SISTEMA DE FAVORITOS
========================= */
export let favorites = [];

export function addFavorite(verse) {
  favorites.push({
    verse,
    date: new Date().toISOString()
  });
}

/* =========================
   📝 NOTAS ESPIRITUALES
========================= */
export let notes = [];

export function addNote(verse, note) {
  notes.push({
    verse,
    note,
    date: new Date().toISOString()
  });
}

/* =========================
   🧠 PROGRESO ESPIRITUAL
========================= */
export let progress = {
  days: 0,
  chaptersRead: 0,
  prayers: 0
};

export function updateProgress(type) {
  if (type === "chapter") progress.chaptersRead++;
  if (type === "day") progress.days++;
  if (type === "prayer") progress.prayers++;
}