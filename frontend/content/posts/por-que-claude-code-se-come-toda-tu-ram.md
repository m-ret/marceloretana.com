---
title: "Por Qué Claude Code Se Come Toda Tu RAM (Y Cómo Solucionarlo)"
excerpt: "Ghostty mostrando 207GB en una Mac de 32GB. Memory leaks de 129GB en Linux. No son solo malos hábitos — hay culpables técnicos reales escondidos en tu sistema. Esto es lo que realmente está pasando."
publishedAt: 2026-02-17
lang: es
tags:
  - Claude Code
  - IA
  - herramientas dev
  - rendimiento
  - productividad
---

Un tweet se volvió viral esta semana: un desarrollador mostrando Ghostty usando **207GB de RAM** en una Mac de 32GB. El culpable? Claude Code.

Las respuestas fueron predecibles: "Cámbiate a Warp," "Usá iTerm," "Ghostty es el problema."

Mi primera reacción fue que se trata de malos hábitos — no manejar el context window, no usar `/clear`, dejar sesiones corriendo por horas. Y en parte es cierto. Pero después de investigar más a fondo los issues de GitHub, threads de Reddit, y mi propio sistema, la realidad es más compleja de lo que pensé inicialmente.

**Hay al menos cuatro cosas distintas que pueden comerse tu RAM, y solo una es tu culpa.**

## Los Cuatro Culpables

### 1. Logs de Sesión Inflados (El Asesino Silencioso)

Este es el que más me sorprendió. Claude Code guarda logs de sesión como archivos JSONL en `~/.claude/projects/`. Estos archivos registran cada conversación, cada lectura de archivo, cada output de herramientas.

El problema? **Pueden crecer silenciosamente a 1-10GB por proyecto.**

Un desarrollador en GitHub reportó que Claude Code intentaba procesar estos archivos JSONL masivos al iniciar, congelando todo su sistema. Borrar los archivos grandes resolvió el problema inmediatamente.

Peor aún: si estás usando servidores MCP como Playwright, las capturas de pantalla se guardan como datos base64 dentro de estos archivos JSONL. Cada screenshot. Cada sesión. Un desarrollador encontró sus logs llenos de cientos de screenshots codificadas en base64 — gigabytes de datos de imagen en un archivo de log que Claude intenta cargar en memoria.

**Revisá los tuyos ahora mismo:**

```bash
find ~/.claude -name "*.jsonl" -size +100M -exec ls -lh {} \;
```

Si ves archivos de más de 100MB, probablemente ese sea tu problema. Podés borrar los logs de sesiones viejas sin riesgo.

### 2. Servidores MCP y Hooks

Los servidores MCP (Model Context Protocol) extienden las capacidades de Claude Code. Pero corren como procesos separados, y pueden tener fugas de memoria independientemente.

Un usuario de Reddit pasó días debuggeando lo que pensaba que era un memory leak de Claude Code. Resultó que su **hook personalizado** — una notificación de audio en macOS que reproducía un sonido cuando Claude terminaba una tarea — llamaba a `coreaudiod` cada vez, y `coreaudiod` estaba perdiendo memoria. No era culpa de Claude.

Otros culpables reportados:

- **Playwright MCP** guardando screenshots en logs de sesión
- **Filesystem MCP** vigilando demasiados archivos
- **Hooks personalizados** que crean procesos que no se limpian
- **Múltiples servidores MCP** corriendo simultáneamente, cada uno consumiendo recursos

Revisá qué servidores MCP tenés configurados:

```bash
cat ~/.claude/settings.json | grep -A 20 "mcpServers"
```

Cada servidor MCP es un proceso que se mantiene vivo durante tu sesión. Auditalos.

### 3. El Bug de Ghostty (Corregido)

Ghostty tenía un memory leak real, y Claude Code lo activó con fuerza. Mitchell Hashimoto, el creador de Ghostty, [escribió sobre esto en detalle](https://mitchellh.com/writing/ghostty-memory-leak-fix). La versión corta:

- Ghostty usa páginas de memoria asignadas con mmap para el scrollback
- Al manejar contenido Unicode pesado (markdown, bloques de código, caracteres especiales), asigna "páginas no estándar"
- **El bug:** Al limpiar scrollback viejo, estas páginas no estándar se devolvían a un pool de memoria en vez de liberarse correctamente con `munmap()`
- Memory leak clásico. Claude Code simplemente lo activó más rápido y más fuerte que el uso normal

Esto ya está corregido en Ghostty nightly y saldrá en la versión 1.3.

Pero el bug de Ghostty por sí solo no explica 129GB. Eso nos lleva al cuarto culpable.

### 4. La Gestión de Memoria de Claude Code

El proceso de Claude Code tiene problemas de memoria documentados. El [issue #11315 en GitHub](https://github.com/anthropics/claude-code/issues/11315) muestra un proceso de Claude con:

```
VmPeak:    135,508,316 kB  (129 GB!)
VmSize:     75,721,528 kB  (72 GB)
VmRSS:         425,416 kB  (415 MB residentes)
```

129GB de memoria virtual en un sistema de 16GB. El proceso consumió toda la RAM física en 30 minutos, congeló el sistema, y requirió un reinicio forzado. Sin OOM killer, sin advertencias — simplemente se bloqueó todo.

El número de memoria virtual está inflado (incluye espacio de direcciones reservado, no solo RAM física), pero que VmRSS crezca de ~2GB a ~12GB en 30 minutos sin ninguna otra aplicación corriendo es un leak real.

Causas potenciales según la investigación de la comunidad:

- **Acumulación sin límite de secuencias de escape ANSI** en el renderizado de terminal
- **Recursos de streams no liberados** después de comandos de shell
- **Memoria de subagentes no liberada** después de completar tareas
- **Acumulación de contexto** sin garbage collection adecuado

Esto es un bug en Claude Code. Anthropic ha etiquetado el issue con `perf:memory` y `bug`. Como usuarios no podemos arreglarlo — pero podemos mitigarlo.

## Las Soluciones (Por Culpable)

### Corregir Logs de Sesión Inflados

```bash
# Encontrar logs de sesión grandes
find ~/.claude -name "*.jsonl" -size +100M -exec ls -lh {} \;

# Borrar logs de sesión viejos/grandes (seguro — es solo historial)
find ~/.claude -name "*.jsonl" -size +500M -delete

# Monitorear crecimiento
du -sh ~/.claude/projects/*/
```

Hacé esto un hábito. Revisá semanalmente, o configurá un cron job.

### Auditar Servidores MCP y Hooks

Desactivá servidores MCP que no estés usando activamente. Revisá tus hooks por procesos que puedan tener fugas. Si usás Playwright MCP o cualquier cosa que genere imágenes/screenshots, sabé que los datos se están acumulando en tus logs de sesión.

### Actualizar Ghostty

Si estás en Ghostty, actualizá al nightly. El fix del leak de mmap es significativo. Pero recordá — la terminal es solo una pieza del rompecabezas.

### Manejar Tus Sesiones

Esta es la parte que SÍ depende de tus hábitos:

**Usá `/clear` entre tareas.** Cuando terminás una tarea, limpiá la sesión. Una tarea, una sesión.

**Usá `/compact` en sesiones largas.** Si no podés limpiar, `/compact` resume el contexto para reducir su tamaño.

**Usá TASKS.md para memoria persistente.** La razón por la que la gente evita `/clear` es el miedo a perder contexto. Dale a Claude un archivo donde guardar estado:

```markdown
## Trabajo Actual
- [x] Corregido bug de auth en login
- [ ] Actualizar rate limiting del API
- [ ] Bloqueado: esperando migración de BD

## Notas
- Tokens de auth expiran a las 24h (no 1h como dicen los docs)
- Config del rate limiter está en /config/limits.yaml
```

Antes de limpiar, pedile a Claude que actualice TASKS.md. Después de limpiar, Claude lo lee y retoma donde lo dejó. `/clear` deja de significar "empezar de cero" y pasa a significar "empezar fresco."

**Reiniciá después de sesiones maratón.** Si llevás más de 3 horas, reiniciá. Tu terminal acumuló scrollback masivo, y la memoria del proceso de Claude creció. Un reinicio toma 10 segundos.

**Limitá instancias concurrentes.** Mantené 1-2 sesiones activas. Cada una mantiene su propio contexto, memoria de proceso, y output de terminal.

## No Es Sobre la Terminal

Cuando este tema se volvió viral, vi gente sugiriendo "simplemente cámbiate a Warp, está escrito en Rust." Eso es 100% incorrecto.

Yo me cambié de Warp a Ghostty hace dos semanas. El problema de memoria me siguió — porque nunca fue sobre la terminal. Ghostty, Warp, iTerm, Alacritty — todos guardan scrollback en memoria. Si tirás 200,000 líneas de output de Claude Code en cualquier terminal, va a usar mucha RAM.

Ghostty sí tenía un bug real que lo empeoraba, y ya fue corregido. Pero los problemas de fondo — logs de sesión inflados, servidores MCP con fugas, la gestión de memoria de Claude Code — son independientes de la terminal.

## El Panorama General

Este es un nuevo tipo de problema. Nunca habíamos tenido herramientas de desarrollo que:

- Generen miles de líneas de output de terminal por minuto
- Mantengan estado de conversación persistente en memoria
- Creen subprocesos (servidores MCP) que corren junto a ellas
- Guarden cada interacción en archivos de log append-only
- Intenten recargar historiales de sesión completos al iniciar

Nuestras terminales, nuestras expectativas de manejo de memoria, y nuestros hábitos de trabajo no fueron diseñados para esto.

La solución no es una sola cosa. Es una combinación:

- **Anthropic** necesita arreglar los memory leaks del proceso e implementar rotación de logs
- **Los autores de terminales** necesitan manejar output pesado más eficientemente (Ghostty ya arregló su parte)
- **Nosotros** necesitamos manejar sesiones, auditar nuestros servidores MCP, y limpiar nuestros logs

La herramienta es poderosa. Pero ahora mismo, usarla bien significa entender estos puntos filosos.

---

**Te está pasando esto?** Revisá mi [configuración de Claude Code](https://github.com/m-ret/awesome-claude-code) — incluye comandos de manejo de sesión, templates de TASKS.md, y el flujo de trabajo exacto que mantiene mi sistema estable.
