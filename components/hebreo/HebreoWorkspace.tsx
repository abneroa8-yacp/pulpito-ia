async function generar() {
  if (!data.palabra.trim()) {
    alert(
      idioma === "en"
        ? "Please enter a Hebrew word or Bible passage."
        : "Escribe una palabra hebrea o un pasaje bíblico."
    );
    return;
  }

  const referencia = data.palabra.trim();

  // Bloquear capítulos completos (ej. Salmo 23, Génesis 1)
  const soloCapitulo =
    /^([1-3]\s+)?[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]+)*\s+\d+$/.test(referencia);

  if (soloCapitulo) {
    alert(
      idioma === "en"
        ? "Only one verse or a maximum of two verses can be analyzed."
        : "Solo se puede analizar un versículo o un máximo de dos versículos."
    );
    return;
  }

  // Bloquear rangos mayores de 2 versículos
  const rango = referencia.match(/:(\d+)-(\d+)$/);

  if (rango) {
    const inicio = parseInt(rango[1], 10);
    const fin = parseInt(rango[2], 10);

    if (fin - inicio >= 2) {
      alert(
        idioma === "en"
          ? "Only up to two verses are allowed."
          : "Solo se permite analizar hasta dos versículos."
      );
      return;
    }
  }

  setLoading(true);

  try {
    const res = await fetch("/api/sermon/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        tipo: "hebreo",
        idioma,
      }),
    });

    const json = await res.json();

    if (json.error) {
      alert(json.error);
      return;
    }

    const contenido =
      json.result ||
      json.sermon ||
      "No hubo respuesta.";

    setResult(contenido);

    saveDocument({
      title: data.palabra,
      type: "hebreo",
      content: contenido,
    });

  } catch (error) {
    console.error(error);

    alert(
      idioma === "en"
        ? "Error connecting to the AI."
        : "❌ Error al conectar con la IA."
    );
  } finally {
    setLoading(false);
  }
}
