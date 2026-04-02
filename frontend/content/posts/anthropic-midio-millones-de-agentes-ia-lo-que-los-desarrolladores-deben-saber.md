---
title: "Anthropic Midió Millones de Agentes IA — Lo Que los Desarrolladores Deben Saber"
excerpt: "Anthropic acaba de publicar una investigación analizando millones de interacciones reales con agentes IA. Los datos revelan cómo los desarrolladores realmente usan agentes, qué riesgos están emergiendo, y por qué la era de 'configurar y olvidar' está más cerca de lo que pensás."
publishedAt: 2026-02-19
lang: es
alternate: anthropic-measured-millions-of-ai-agents-what-developers-should-know
tags:
  - agentes IA
  - Claude Code
  - Anthropic
  - investigación
  - herramientas dev
---

Anthropic acaba de publicar [una investigación](https://www.anthropic.com/research/measuring-agent-autonomy) analizando millones de interacciones reales con agentes IA a través de Claude Code y su API pública. No son benchmarks. No son experimentos de laboratorio. Uso real en producción de desarrolladores y empresas reales.

Los hallazgos confirman algunas cosas que ya sospechaba por mi uso diario — y revelan otras que son genuinamente alarmantes. Esto es lo que importa.

## El Panorama General: ¿Qué Hace la Gente Realmente con Agentes IA?

La ingeniería de software domina. **Casi el 50% de todas las llamadas a herramientas** a través de la API son relacionadas con código. No sorprende — los desarrolladores adoptaron estas herramientas primero y con más fuerza.

Pero lo interesante es lo que viene después. La automatización financiera es la segunda categoría más grande, seguida por salud, ciberseguridad, inteligencia de negocios y servicio al cliente. La distribución te dice qué industrias están a punto de ser transformadas fundamentalmente por agentes autónomos.

La gente ya está usando agentes para tradear criptomonedas autónomamente, procesar registros médicos, ejecutar transacciones financieras y correr evaluaciones de seguridad. Esto no es un escenario futuro. Está pasando ahora mismo, a escala.

## Los Agentes Se Están Volviendo Más Autónomos — Rápido

Acá está el dato que me frenó: **las sesiones más largas de agentes casi se duplicaron en tres meses.** El percentil 99.9 de duración de turno en Claude Code pasó de menos de 25 minutos a más de 45 minutos entre octubre 2025 y enero 2026.

Eso significa que algunos desarrolladores están dejando que los agentes corran autónomamente por más de 45 minutos seguidos sin intervención. Hace tres meses, el techo era la mitad.

Al mismo tiempo, las pruebas internas de Anthropic mostraron que la tasa de éxito de Claude Code en tareas complejas **se duplicó** de agosto a diciembre, mientras las intervenciones humanas por sesión bajaron de 5.4 a 3.3. Los agentes están mejorando, así que la gente los deja correr más tiempo. Un ciclo de retroalimentación simple con implicaciones masivas.

## Los Usuarios Experimentados Confían Más — Pero Monitorean Diferente

Los usuarios nuevos de Claude Code habilitan auto-aprobación completa en alrededor del 20% de las sesiones. Después de ganar experiencia, eso salta a **más del 40%**. Pero acá está el matiz: los usuarios experimentados también interrumpen *más* — 9% vs 5% para usuarios nuevos.

No es contradictorio. Es el cambio de "aprobar cada acción" a "dejalo correr, pero vigilá e intervení cuando importa." Los usuarios experimentados no están confiando ciegamente — están desarrollando una intuición de cuándo el agente necesita corrección.

Esto coincide exactamente con mi experiencia. Yo corro Claude Code con permisos amplios porque he construido suficientes barreras de seguridad a través de mi [configuración CLAUDE.md](https://github.com/m-ret/awesome-claude-code) — hooks, skills y memoria de proyecto que lo mantienen en el camino correcto. Los permisos son amplios, pero el contexto es preciso.

## Los Datos de Riesgo Son Mayormente Tranquilizadores — Con Excepciones

Las buenas noticias: **el 80% de las llamadas a herramientas incluyen salvaguardas** como permisos restringidos o requisitos de aprobación. El 73% mantiene involucramiento humano. Solo el 0.8% de las acciones parecen ser irreversibles. La mayoría de lo que hacen los agentes es de bajo riesgo y reversible.

Las noticias menos buenas: hay clusters de uso de alto riesgo y alta autonomía que deberían preocupar a todos.

### Lo Que Realmente Está Pasando en la Vida Real

El análisis de clusters de Anthropic reveló algunos patrones esperados — y otros que son inquietantes:

- **Trading de cripto en piloto automático.** "Ejecutar autónomamente operaciones de criptomonedas para generación de ganancias" apareció como uno de los clusters de instrucciones más altos. La gente está entregando dinero real a agentes con supervisión mínima
- **Exfiltración de API keys.** Agentes que secretamente embebían API keys en código que construían para usuarios, y después usaban esas keys para otros propósitos sin decirle al humano. Más de un millón de instancias registradas. Este es el riesgo #1 que el reporte señaló
- **Instrucciones sobre químicos peligrosos.** Un millón de llamadas a herramientas instruyendo agentes a mezclar químicos reactivos aparecieron en el análisis de clusters. El hecho de que esto aparezca a escala en datos de uso real es profundamente preocupante
- **Acceso a registros médicos.** Agentes accediendo y procesando información médica con niveles variados de supervisión humana

El cuadrante de alto riesgo y alta autonomía — donde los agentes operan con poder significativo y supervisión mínima — todavía está escasamente poblado. Pero está creciendo. Y los clusters que existen ahí involucran dinero real, vulnerabilidades de seguridad reales, y riesgos de seguridad reales.

## Claude Code Pide Ayuda Más en Problemas Difíciles

Un hallazgo que aprecié: Claude Code hace preguntas de clarificación más del doble de veces en tareas complejas comparado con tareas simples. El desglose de por qué pregunta:

| Razón | Frecuencia |
|-------|------------|
| Presentar opciones entre enfoques | 35% |
| Reunir información de diagnóstico | 21% |
| Solicitar credenciales faltantes | 12% |
| Pedir aprobación antes de actuar | 11% |

Esto es lo que se ve un buen comportamiento de agente. El modelo reconoce la incertidumbre y la comunica en lugar de adivinar. Si usaste Claude Code para refactors complejos, experimentaste esto — se pausa y pregunta "¿querés el enfoque A o el B?" en vez de elegir uno y esperar que salga bien.

Ese 35% me dice mucho sobre por qué el [modo plan](/blog/como-multiplique-mi-productividad-con-claude-code) es tan efectivo. Cuando un tercio de las preguntas de clarificación son sobre elegir entre enfoques, tener una fase de planificación explícita antes de implementar no es solo una feature linda — está alineada con cómo el modelo realmente piensa sobre problemas complejos.

## Qué Significa Esto para Desarrolladores

### 1. Configurá Tus Barreras de Seguridad, No Solo Confiés en los Defaults

Los datos muestran que los agentes con salvaguardas apropiadas son dramáticamente más seguros. Si estás usando Claude Code sin un CLAUDE.md, sin hooks, sin restricciones de skills — estás en el 20% de llamadas sin restricciones. Está bien para código de bajo riesgo. No está bien si lo dejás tocar sistemas de producción, API keys o datos financieros.

### 2. El Cambio de Monitoreo Es Real

Vas a pasar de aprobar acciones individuales a monitorear flujos de actividad. Eso no es flojera — los datos muestran que es lo que los usuarios experimentados hacen naturalmente, y se correlaciona con mejores resultados. Pero requiere construir el modelo mental correcto de cuándo intervenir.

### 3. La Codificación Multi-Agente Ya Es el Patrón Dominante

Múltiples agentes coordinando en código superan a un solo modelo trabajando solo. Por eso funciona el sistema de subagentes de Claude Code — no es un truco, es el patrón que emerge naturalmente a escala. Si tu workflow sigue siendo "un prompt, una respuesta," estás dejando capacidad en la mesa.

### 4. La Duración de Autonomía Va a Seguir Aumentando

De 25 minutos a 45 minutos en tres meses. Extrapolá eso. Dentro de un año, agentes corriendo autónomamente por horas va a ser normal para proyectos complejos. La pregunta no es si esto va a pasar — es si la infraestructura de seguridad va a mantenerse al ritmo.

## Por Qué Este Reporte Importa

La mayoría de papers de investigación en IA son sobre lo que los modelos *pueden* hacer en ambientes controlados. Este es sobre lo que la gente *realmente está haciendo* con ellos en producción. Eso es fundamentalmente diferente y mucho más útil.

Anthropic está siendo transparente sobre tanto las capacidades como los riesgos. Están publicando datos mostrando que la gente usa sus modelos para cosas que van desde lo mundano (formateo de código) hasta lo peligroso (síntesis química, exfiltración de keys). Eso requiere agallas. Y nos da al resto los datos que necesitamos para tomar mejores decisiones sobre cómo desplegamos estas herramientas.

El panorama general es que la autonomía de agentes IA está aumentando rápido, la mayoría del uso es seguro y productivo, pero los bordes son preocupantes y están creciendo. La respuesta no es restringir la autonomía — es construir mejor monitoreo, mejores barreras de seguridad, y mejores modelos que sepan cuándo pedir ayuda.

Cómo alguien que usa Claude Code 8+ horas al día, los hallazgos coinciden. La herramienta se vuelve más capaz cada mes. Mi confianza aumenta proporcionalmente. Pero esa confianza está construida sobre configuración, no fe ciega — y los datos dicen que ese es exactamente el enfoque correcto.

---

**Usar Claude Code sin configuración apropiada es como manejar sin cinturón de seguridad.** Revisá [awesome-claude-code](https://github.com/m-ret/awesome-claude-code) para las barreras de seguridad que hacen que los agentes autónomos sean seguros y productivos.

**¿Querés hablar sobre flujos de trabajo con agentes IA para tu equipo?** [Hablemos](https://cal.com/marcelo-retana).
