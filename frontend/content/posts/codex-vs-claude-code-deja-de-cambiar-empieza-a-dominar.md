---
title: "Codex vs Claude Code: Dejá de Cambiar, Empezá a Dominar"
excerpt: "Cada vez que sale una herramienta de IA nueva, los devs saltan de barco. El problema no es la herramienta — es nunca profundizar lo suficiente con ninguna. Acá va una comparación honesta y por qué dominar gana siempre."
publishedAt: 2026-02-18
lang: es
tags:
  - Claude Code
  - Codex
  - IA
  - herramientas dev
  - productividad
---

La semana pasada respondí un tweet: "¿Codex vs Claude Code?"

Mi respuesta: **"Algunos devs están saltando de una herramienta a otra sin siquiera dominar una. Quedate con la que te da resultados."**

Las respuestas se dividieron. La mitad estuvo de acuerdo. La otra mitad quería una comparación real. Así que acá van las dos cosas — la comparación que pidieron, y el argumento de por qué casi no importa si seguís cambiando cada dos semanas.

## El Problema de Saltar de Herramienta

Este es el ciclo que veo constantemente:

1. Sale nueva herramienta de IA para código
2. Twitter explota con demos
3. El dev se cambia, corre un comando, postea "esto es una locura"
4. No la configura. No lee la documentación. Obtiene resultados mediocres
5. Sale otra herramienta dos semanas después. Repetir desde el paso 1

El problema no es Codex. No es Claude Code. **Es el hábito de nunca profundizar lo suficiente con ninguna herramienta como para realmente ser bueno usándola.**

He visto desarrolladores saltar entre Cursor, Copilot, Claude Code, Codex, Aider y Windsurf — todo en tres meses. Nunca configuraron ninguna. Nunca crearon comandos custom, nunca configuraron memoria de proyecto, nunca aprendieron los atajos de teclado. Y después se quejan de que "las herramientas de IA para código están sobrevaloradas."

No. Simplemente nunca te quedaste lo suficiente como para pasar de la fase tutorial.

## La Comparación Honesta

Dicho eso — las herramientas sí son genuinamente diferentes, y las diferencias importan. Esto es lo que encontré después de usar Claude Code diariamente por más de un año y probar Codex extensivamente.

### Codex CLI

[Open source](https://github.com/openai/codex) (Apache 2.0). Originalmente escrito en TypeScript, completamente reescrito en Rust a mediados de 2025. TUI de pantalla completa con una interfaz de terminal pulida.

**Donde brilla:**

- **Tareas en la nube** — `codex cloud` te permite lanzar tareas asincrónicamente a la nube. Delegás trabajo, volvés después. Claude Code no tiene nada equivalente
- **Open source y forkeable** — Apache 2.0 significa que podés modificar, redistribuir, construir encima. La comunidad contribuye features directamente
- **Modos de sandbox** — Tres niveles de sandboxing (solo lectura, escritura en workspace, acceso completo) con bindings nativos de Rust en Linux. La seguridad es prioridad
- **Comando `/review`** — Code review dedicado que lee un diff y da hallazgos priorizados. Integrado, no un hack de prompt
- **Acceso más amplio** — Incluido en suscripciones de ChatGPT Plus/Pro. Barrera de entrada más baja
- **Workflows multi-agente** — Configuración experimental de agentes paralelos para tareas más grandes
- **`AGENTS.md`** — Configuración a nivel de repositorio, similar en concepto a CLAUDE.md

**Modelo:** GPT-5.3-Codex (construido específicamente para código) con toda la familia de variantes GPT-5.

### Claude Code

Código cerrado. Construido sobre Node.js. Estilo de pair-programming conversacional — menos "ejecutá esta tarea" y más "trabajemos esto juntos."

**Donde brilla:**

- **Subagentes** — Claude crea agentes especializados para tareas complejas. Agente de investigación, agente de implementación, agente de verificación — todos coordinados automáticamente. Acá es donde las tareas multi-paso se hacen bien
- **CLAUDE.md + sistema de skills** — Memoria de proyecto que persiste entre sesiones, comandos slash personalizados, un ecosistema completo de skills. La profundidad de configuración no tiene comparación
- **Sistema de hooks** — Comandos de shell que se activan en eventos (pre-commit, post-tool-call, etc.). Extendé el comportamiento sin modificar la herramienta
- **Consistencia en tareas complejas** — Para refactors multi-archivo, cambios arquitectónicos, o cualquier cosa que requiera razonamiento sostenido en 10+ pasos, los outputs de Claude son más coherentes y deterministas en mi experiencia
- **Gestión de contexto** — `/clear`, `/compact`, gestión de sesiones con TASKS.md. Las herramientas para manejar sesiones largas son más maduras
- **Modo plan** — Entrás explícitamente en una fase de planificación antes de implementar. Investigás el codebase, diseñás el approach, obtenés aprobación, y después ejecutás. Codex no tiene esta separación

**Modelo:** Claude Opus 4.6 / Sonnet 4.6 (configurable por tarea).

### Cara a Cara

| Aspecto | Codex CLI | Claude Code |
|---------|-----------|-------------|
| **Licencia** | Apache 2.0 (open source) | Propietario |
| **Lenguaje** | Rust | Node.js |
| **Tareas en la nube** | Sí | No |
| **Code review** | `/review` integrado | Basado en prompts |
| **Subagentes** | Multi-agente experimental | Maduro, automático |
| **Memoria de proyecto** | AGENTS.md | CLAUDE.md + skills + hooks |
| **Sandbox** | Nativo (3 niveles) | Docker / nivel de sistema |
| **Modo plan** | No | Sí |
| **Resume de sesión** | `codex resume` / `codex fork` | `/resume` con IDs de sesión |
| **Multi-paso complejo** | Bueno | Más fuerte |
| **Velocidad (tokens/seg)** | Output más rápido | Más lento pero más deliberado |
| **Soporte MCP** | Sí | Sí |
| **Precio** | ChatGPT Plus ($20/mes) | Claude Pro ($20/mes) / Max ($100-200/mes) |

**Siendo honesto:** Codex tiene fortalezas reales. Las tareas en la nube son genuinamente útiles para trabajo asíncrono. El modelo open source significa que la comunidad impulsa features rápido. La reescritura en Rust lo hizo ágil. `/review` es algo que me gustaría que Claude Code tuviera integrado.

Pero para mi flujo de trabajo — shipping de proyectos full-stack desde arquitectura hasta deployment — Claude Code gana en las tareas que realmente toman tiempo. El sistema de subagentes, el modo plan, y la consistencia en refactors complejos son lo que me ahorra horas, no milisegundos de output de tokens más rápido.

## Por Qué Dominar Importa Más Que la Herramienta

Esto es de lo que nadie habla en estas comparaciones: **las ganancias reales de productividad vienen de la configuración, no de la capacidad.**

Las dos herramientas son lo suficientemente poderosas para multiplicar tu productividad x10. Pero solo si invertís en aprenderlas. Eso significa:

- **Configurar memoria de proyecto** — CLAUDE.md o AGENTS.md que realmente describa tu codebase, convenciones y patrones. No una línea. Un documento real que haga que cada sesión empiece con contexto
- **Crear comandos custom** — Flujos de trabajo específicos para tu proyecto. Comandos de deploy, test runners, flujos de review. Estos no se transfieren cuando cambiás de herramienta
- **Entender la gestión de contexto** — Cuándo limpiar, cuándo compactar, cuándo empezar de cero. Esto es una habilidad que desarrollás en cientos de sesiones
- **Crear skills y hooks** — Automatizaciones que se componen con el tiempo. Detección de patrones, checks pre-commit, verificación post-tarea
- **Aprender el modelo mental** — Cada herramienta tiene uno. Claude Code es un pair programmer. Codex es un ejecutor de tareas. Pensás diferente con cada una, y ese pensamiento toma tiempo desarrollar

Llevo cientos de horas construyendo mi [configuración de Claude Code](https://github.com/m-ret/awesome-claude-code). Comandos custom, 17 skills reutilizables, templates de proyecto, flujos de gestión de sesiones. Esa inversión se compone todos los días.

Cuando cambiás de herramienta, **reseteás ese interés compuesto a cero.**

Escribí sobre esto en detalle en [Cómo Multipliqué x10 Mi Velocidad de Código con Claude Code](/blog/como-multiplique-mi-productividad-con-claude-code). La velocidad no viene de que Claude sea más rápido que Codex. Viene de que Claude conoce mis convenciones, mis reglas de identidad git, mis estructuras de proyecto, y mis patrones de código — porque me tomé el tiempo de enseñarle.

## Mi Stack y Por Qué Me Quedo

He entregado más de 50 proyectos con Claude Code. Mi configuración incluye:

- CLAUDE.md global con ADN de código, protección de identidad git, detección de patrones
- 17 skills reutilizables (accesibilidad, SEO, rendimiento, diseño, específicos de framework)
- Comandos custom para sesiones de enfoque, commits seguros, revisiones de sesión
- Templates de proyecto para Next.js, Node.js, Python
- Flujo de TASKS.md para memoria persistente entre sesiones

Eso no es algo que reconstruí de cero. Son cientos de horas de iteración, refinamiento y detección de patrones. Cada vez que Claude sugiere una nueva automatización basada en mis hábitos, el sistema se vuelve un poco mejor.

Cambiarme a Codex significaría reconstruir todo eso en formato AGENTS.md. Diferente sintaxis, diferentes capacidades, diferente modelo mental. ¿Para qué? ¿Output de tokens más rápido?

La herramienta que te da resultados es la que invertiste en dominar. Para mí, esa es Claude Code. Para alguien más, podría ser Codex. **La respuesta incorrecta es cambiar cada dos semanas y no dominar ninguna.**

## Cuándo Sí Tiene Sentido Cambiar

No estoy diciendo que nunca debés cambiar. Hay razones legítimas:

- **Tu herramienta genuinamente no puede hacer algo que necesitás** — Si necesitás delegación de tareas en la nube y es parte central de tu workflow, Codex lo tiene y Claude Code no. Esa es una razón real
- **Tu equipo se estandariza en algo** — La consistencia en un equipo importa más que la preferencia individual. Adaptate
- **La herramienta está abandonada o estancada** — Si el desarrollo se detiene y los bugs se acumulan, seguí adelante
- **Genuinamente dominaste tu herramienta actual y llegaste al techo** — Palabra clave: genuinamente. No "la usé una semana y me molestó una vez"

Lo que no es buena razón:

- "Se veía cool en Twitter"
- "Alguien posteó un demo que parecía más rápido"
- "El modelo nuevo sacó mejor puntaje en un benchmark"
- "Todos están hablando de eso"

Los benchmarks no entregan tu proyecto. La configuración y la memoria muscular sí.

## Preguntas Frecuentes

### ¿Puedo usar Codex y Claude Code al mismo tiempo?

Sí, y algunos desarrolladores lo hacen. Codex para tareas async rápidas vía `codex cloud`, Claude Code para trabajo complejo multi-paso. Pero mantener configuración para ambas herramientas es doble la inversión. La mayoría de desarrolladores están mejor servidos profundizando en una.

### ¿Es Codex realmente más rápido que Claude Code?

La velocidad de output de tokens es más rápida. Pero la velocidad para completar tareas complejas depende más de la calidad de razonamiento, gestión de contexto, y qué tan bien configuraste la herramienta. Una sesión de Claude Code bien configurada que clava un refactor al primer intento es más rápida que una respuesta rápida de Codex que necesita tres correcciones.

### Estoy empezando de cero — ¿cuál debería elegir?

Cualquiera de las dos te va a servir bien. Si el open source te importa, o ya estás pagando ChatGPT Plus, Codex es un punto de partida natural. Si querés opciones de configuración más profundas, un sistema de subagentes maduro, y modo plan para proyectos complejos, Claude Code es más fuerte ahí. Elegí una, comprometete a aprenderla por al menos 3 meses antes de evaluar.

### ¿La configuración de CLAUDE.md se transfiere al AGENTS.md de Codex?

No directamente. Los conceptos son similares — ambos son archivos markdown que le dan contexto a la IA sobre tu proyecto — pero la sintaxis, features y capacidades difieren. Tendrías que reescribir tu configuración, no copiar y pegar.

### ¿Y qué pasa con Cursor, Copilot y otras herramientas basadas en IDE?

Categoría diferente. Cursor y Copilot son asistentes integrados en el IDE — funcionan dentro de tu editor. Codex y Claude Code son agentes nativos de terminal — funcionan junto a tu editor. Muchos desarrolladores usan ambos: un asistente de IDE para completions inline y un agente de terminal para tareas más grandes.

---

**¿Querés ver la configuración que hace que Claude Code funcione a este nivel?** Revisá [awesome-claude-code](https://github.com/m-ret/awesome-claude-code) — open source, probado en más de 50 proyectos.

**¿Estás construyendo algo y querés hablar sobre tu flujo de trabajo con IA?** [Hablemos](https://cal.com/marcelo-retana).
