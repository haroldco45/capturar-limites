# Capturar límites

Herramienta de campo para recorrer un barrio a pie y capturar sus límites con el GPS del celular.
Se instala como aplicación, funciona sin conexión y exporta el contorno en un archivo listo para
cargar en un mapa.

Nació para delimitar tres barrios de Caucasia, Antioquia, pero sirve para cualquier sector: veredas,
manzanas, zonas de reparto, predios.

Desarrollada por **Vibras Positivas HM** — Derechos de Autor Reservados.

---

## Publicar con GitHub Pages

1. Sube esta carpeta a un repositorio nuevo.
2. Entra a **Settings → Pages**.
3. En *Source* elige la rama `main` y la carpeta `/ (root)`. Guarda.

A los pocos minutos queda en `https://TU-USUARIO.github.io/capturar-limites/`.

GitHub Pages sirve por HTTPS, que es justo lo que el navegador exige para entregar la ubicación. Con
`http://` normal el GPS queda bloqueado sin decir por qué.

Después de publicar, ajusta en `index.html` las cuatro etiquetas que llevan la dirección
(`og:url`, `og:image`, `twitter:image` y `canonical`) para que apunten a tu dirección real. Solo
afectan cómo se ve el enlace al compartirlo por WhatsApp.

## Instalarla en el celular

Abre la dirección en Chrome y usa **Menú → Instalar aplicación** (o *Agregar a pantalla de inicio*).
Queda con ícono propio y abre a pantalla completa, sin la barra del navegador: bastante más cómodo
para andar con el celular en la mano.

## Antes de salir a caminar

- Batería cargada. El GPS y la pantalla encendida consumen.
- Ubicación en **alta precisión** (Ajustes → Ubicación).
- Toca **Guardar mapa** con wifi, en la casa. Descarga las imágenes de la zona que estás viendo para
  que el mapa se vea aunque salgas sin datos. Si quieres cubrir más, aleja el mapa y vuelve a entrar.
- Sal temprano o al final de la tarde: al mediodía la pantalla no se lee.

## Los dos modos

**Marcar esquina** — párate en la esquina, espera a que el indicador de arriba se ponga verde, y
toca el botón grande. Es lo más exacto. De 6 a 12 esquinas bastan para un barrio.

**Grabar caminata** — deja puntos solo mientras caminas, sin tocar nada. Sirve cuando el borde no
son esquinas rectas sino una calle curva o un caño. Al detenerla, reduce el recorrido a las esquinas
que de verdad importan, usando el algoritmo de Douglas-Peucker.

Los dos se pueden combinar en el mismo barrio.

## Reglas de la caminada

1. Recorre el perímetro **en un solo sentido**, sin devolverte, o el contorno sale cruzado.
2. Cierra donde empezaste. El primer punto queda marcado en negro para ubicarlo.
3. Si el indicador está en rojo, quédate quieto unos segundos: la señal se afina sola.
4. **Quitar último** deshace el punto anterior si te equivocaste de esquina.

El indicador de precisión es verde bajo 12 m, ámbar hasta 25 m y rojo por encima. Marcar en rojo
pide confirmación.

## Qué revisar de las cifras

Perímetro y área te dicen de una si el contorno tiene sentido. Un barrio de manzanas normales suele
dar entre 0,5 y 3 hectáreas. Un número disparatado significa casi siempre que el recorrido se cruzó
o que quedó un punto perdido: usa **Quitar último** o vuelve a recorrer ese tramo.

## El trabajo no se pierde

Cada punto se guarda en el celular al instante, en el almacenamiento del propio navegador. Puedes
bloquear la pantalla, contestar una llamada o cerrar el navegador: al volver, todo sigue ahí y te
avisa por dónde ibas.

Aun así, **exporta al terminar cada barrio**. Si borras los datos del navegador o cambias de
dispositivo, se pierde.

## El archivo que produce

**Exportar** genera un `barrios.json` así:

```json
{
  "municipio": "Caucasia",
  "departamento": "Antioquia",
  "actualizado": "2026-09-07",
  "barrios": [
    {
      "id": "colinas-del-portal",
      "nombre": "Colinas del Portal",
      "color": "#1F5E4B",
      "centro": [7.98329, -75.20240],
      "radio_m": 130,
      "poligono": [[7.9840, -75.2032], [7.9840, -75.2016], [7.9826, -75.2016]]
    }
  ]
}
```

El `centro` se recalcula solo a partir de las esquinas marcadas. El `poligono` va en pares
`[latitud, longitud]`, en el orden en que se recorrió.

Puedes descargarlo, enviarlo por WhatsApp o copiarlo al portapapeles.

## Nada sale del celular

La herramienta no tiene servidor ni envía datos a ninguna parte. Todo se calcula y se guarda en el
propio navegador. Lo único que sale a internet son las imágenes del mapa, que vienen de
OpenStreetMap y no requieren llave ni registro.

## Qué hay adentro

```
index.html      la herramienta completa
manifest.json   para instalarla como aplicación
sw.js           service worker: funciona sin conexión
vendor/         Leaflet, servido desde el propio repositorio
img/            íconos y portada
```

Sin dependencias, sin compilación, sin `npm install`. Se puede abrir directo desde el disco: Chrome
trata los archivos locales como seguros, así que el GPS también funciona por `file://`.

---

**Desarrollada por Vibras Positivas HM — Derechos de Autor Reservados**
Caucasia, Antioquia · Colombia
