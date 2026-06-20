
/* =========================
   📖 CARGAR VERSÍCULO DEL DÍA
========================= */
async function loadVerse() {
  try {
    const res = await fetch("http://localhost:3000/api/verse");
    const data = await res.json();

    document.getElementById("verse").innerText = data.verse;
    document.getElementById("reference").innerText = data.reference;

  } catch (error) {
    document.getElementById("verse").innerText = "Error cargando versículo";
  }
}

loadVerse();

/* =========================
   🧠 ESTADO EMOCIONAL
========================= */
async function getEmotion() {
  try {
    const res = await fetch("http://localhost:3000/api/emotion");
    const data = await res.json();

    document.getElementById("emotion").innerText = data.emotion;

  } catch (error) {
    document.getElementById("emotion").innerText = "Error emocional";
  }
}

getEmotion();

/* =========================
   🤖 IA BÍBLICA
========================= */
async function askAI() {
  const question = document.getElementById("question").value;
  const emotion = document.getElementById("emotionInput").value;

  if (!question) {
    alert("Escribe una pregunta primero");
    return;
  }

  document.getElementById("answer").innerText = "Pensando... 🤖";

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

    document.getElementById("answer").innerText = data.answer;

  } catch (error) {
    document.getElementById("answer").innerText = "Error en IA";
  }
}

/* =========================
   📚 BIBLIA (BASE SIMPLE)
   =========================
   (estructura lista para expandir a Biblia completa real)
========================= */

const books = [
  "genesis",
  "exodus",
  "leviticus",
  "numbers",
  "deuteronomy",
  "matthew",
  "mark",
  "luke",
  "john"
];

async function loadBooks() {
  const select = document.getElementById("bookSelect");

  books.forEach(book => {
    const option = document.createElement("option");
    option.value = book;
    option.innerText = book.toUpperCase();
    select.appendChild(option);
  });
}

loadBooks();

async function loadChapter() {
  const book = document.getElementById("bookSelect").value;

  if (!book) return;

  document.getElementById("chapter").innerText = "Cargando capítulo...";

  try {
    const res = await fetch(`https://bible-api.com/${book}+1`);
    const data = await res.json();

    document.getElementById("chapter").innerText = data.text;

  } catch (error) {
    document.getElementById("chapter").innerText = "Error cargando Biblia";
  }
}