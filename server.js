import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* =========================
   🤖 CONFIGURACIÓN OPENAI
========================= */
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/* =========================
   🤖 IA BÍBLICA REAL
========================= */
app.post("/api/ai", async (req, res) => {
  try {
    const { question, emotion } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
Eres "Biblia Book IA".

Tu función:
- Ayudar espiritualmente
- Explicar Biblia de forma clara
- Acompañar emocionalmente
- Dar respuestas neutrales (sin imponer religión)
- Ser cálida, empática y respetuosa

No juzgas. No impones doctrinas.
`
        },
        {
          role: "user",
          content: `
Pregunta: ${question}
Estado emocional: ${emotion || "no especificado"}
`
        }
      ]
    });

    res.json({
      answer: response.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en la IA" });
  }
});

/* =========================
   📖 VERSÍCULO DEL DÍA (BIBLIA REAL API)
========================= */
app.get("/api/verse", async (req, res) => {
  try {
    const response = await fetch("https://bible-api.com/john 3:16");
    const data = await response.json();

    res.json({
      verse: data.text,
      reference: data.reference
    });

  } catch (error) {
    res.status(500).json({ error: "Error al obtener Biblia" });
  }
});

/* =========================
   🧠 TEST EMOCIONAL DIARIO
========================= */
app.get("/api/emotion", (req, res) => {
  const emotions = [
    "Feliz",
    "Triste",
    "Ansiosa",
    "Confundida",
    "Esperanzada",
    "Motivada",
    "Agotada",
    "Agradecida"
  ];

  const random = emotions[Math.floor(Math.random() * emotions.length)];

  res.json({
    emotion: random
  });
});

/* =========================
   🚀 INICIAR SERVIDOR
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("📖 Biblia Book activo en puerto " + PORT);
});