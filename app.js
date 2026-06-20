
/* =========================
   📚 LIBROS EN ESPAÑOL
========================= */
const books = [
  { name: "Génesis", api: "genesis" },
  { name: "Éxodo", api: "exodus" },
  { name: "Levítico", api: "leviticus" },
  { name: "Números", api: "numbers" },
  { name: "Deuteronomio", api: "deuteronomy" },
  { name: "Mateo", api: "matthew" },
  { name: "Marcos", api: "mark" },
  { name: "Lucas", api: "luke" },
  { name: "Juan", api: "john" },
  { name: "Hechos", api: "acts" },
  { name: "Romanos", api: "romans" },
  { name: "Apocalipsis", api: "revelation" }
];

/* =========================
   📖 CARGAR LIBROS EN SELECT
========================= */
function loadBooks() {
  const select = document.getElementById("bookSelect");

  if (!select) return;

  select.innerHTML = "";

  books.forEach(book => {
    const option = document.createElement("option");
    option.value = book.api;
    option.innerText = book.name;
    select.appendChild(option);
  });
}

/* =========================
   📖 CARGAR CAPÍTULO
========================= */
async function loadChapter() {
  const book = document.getElementById("bookSelect")?.value;
  const chapterBox = document.getElementById("chapter");

  if (!book) {
    alert("Selecciona un libro 📖");
    return;
  }

  if (!chapterBox) return;

  chapterBox.innerText = "Cargando capítulo...";

  try {
    const res = await fetch(`https://bible-api.com/${book}+1`);
    const data = await res.json();

    chapterBox.innerText = data.text || "Sin contenido";

  } catch (error) {
    chapterBox.innerText = "Error cargando Biblia";
  }
}

/* =========================
   ✨ VERSÍCULO DEL DÍA
========================= */
async function loadVerse() {
  const verseBox = document.getElementById("verse");
  const refBox = document.getElementById("reference");

  if (!verseBox) return;

  try {
    const res = await fetch("https://bible-api.com/john 3:16");
    const data = await res.json();

    verseBox.innerText = data.text;
    if (refBox) refBox.innerText = data.reference;

  } catch (error) {
    verseBox.innerText = "Error cargando versículo";
  }
}

/* =========================
   🧠 TEST EMOCIONAL
========================= */
async function getEmotion() {
  const emotionBox = document.getElementById("emotion");

  if (!emotionBox) return;

  try {
    const emotions = [
      "Feliz",
      "Triste",
      "Ansiosa",
      "Confundida",
      "Esperanzada",
      "Motivada",
      "Agradecida"
    ];

    const random = emotions[Math.floor(Math.random() * emotions.length)];

    emotionBox.innerText = random;

  } catch (error) {
    emotionBox.innerText = "Error emocional";
  }
}

/* =========================
   🤖 IA BÍBLICA
========================= */
async function askAI() {
  const question = document.getElementById("question")?.value;
  const emotion = document.getElementById("emotionInput")?.value;
  const answerBox = document.getElementById("answer");

  if (!question) {
    alert("Escribe una pregunta");
    return;
  }

  answerBox.innerText = "Pensando... 🤖";

  try {
    const res = await fetch("http://localhost:3000/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question,
        emotion
      })
    });

    const data = await res.json();

    answerBox.innerText = data.answer;

  } catch (error) {
    answerBox.innerText = "Error en IA";
  }
}

/* =========================
   🚀 INICIALIZACIÓN
========================= */
window.onload = function () {
  loadBooks();
  loadVerse();
  getEmotion();
};
