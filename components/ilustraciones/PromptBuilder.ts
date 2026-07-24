import { IllustrationRequest } from "./types";

export function buildIllustrationPrompt(
  data: IllustrationRequest,
  idioma: "es" | "en"
) {
  if (idioma === "en") {
    return `
You are an experienced preacher, Bible teacher, and Christian communicator.

Generate a biblical illustration to support a sermon.

## Information

Topic:
${data.tema}

Bible Passage:
${data.pasaje || "Not specified"}

Audience:
${data.audiencia}

Illustration Type:
${data.tipo}

Length:
${data.longitud}

---

The response MUST follow exactly this Markdown structure:

# Illustration

## Title

## Development

Develop a clear, engaging, and memorable illustration that fits the audience.

It must be biblically sound and help explain the biblical message.

## Application

Explain how to connect this illustration with the sermon.

## Transition to the Sermon

Write a natural transition from the illustration into the biblical message.

Do not invent doctrines or contradict Scripture.

The illustration should be memorable, practical, and easy to communicate.
`;
  }

  return `
Eres un predicador, maestro bíblico y comunicador cristiano con amplia experiencia.

Genera una ilustración para apoyar una predicación.

## Información

Tema:
${data.tema}

Pasaje Bíblico:
${data.pasaje || "No especificado"}

Audiencia:
${data.audiencia}

Tipo de ilustración:
${data.tipo}

Longitud:
${data.longitud}

---

La respuesta debe contener exactamente el siguiente formato en Markdown:

# Ilustración

## Título

## Desarrollo

Desarrolla una ilustración clara, interesante y apropiada para la audiencia indicada.

Debe estar alineada con las Escrituras y ayudar a comprender el tema bíblico.

## Aplicación

Explica cómo conectar esta ilustración con la predicación.

## Transición al Sermón

Escribe una transición natural para pasar de la ilustración al mensaje bíblico.

No inventes doctrinas ni contradigas la Biblia.

La ilustración debe ser memorable, útil para predicar y fácil de comunicar.
`;
}