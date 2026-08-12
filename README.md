# SAPA La Paz - App Móvil de Tandeo de Agua BCS 💧

Rediseño completo UI/UX de la plataforma de tandeo de agua potable para **SAPA La Paz, BCS** (Baja California Sur), construido con un enfoque **100% Mobile-First / Smartphone Viewport**, diseño institucional limpio (sin emojis saturados ni degradados excesivos) y soporte vectorial.

---

## 📱 Pantallas y Funcionalidades

### 1. Dashboard Principal de Consulta de Tandeo
- **Geolocalización Automática (GPS)**: Detecta la ubicación del usuario y selecciona automáticamente su sector o colonia en La Paz.
- **Buscador Rápido de Colonias**: Permite filtrar entre colonias (*Indeco, Centro Histórico, El Pescador, Camino Real, Bella Vista, Fidedepaz*).
- **Indicadores en Tiempo Real**: Estado de agua (*CON AGUA HOY / SIN AGUA HOY / EN MANTENIMIENTO*), horario de presurización, medición de presión en Bar, nivel de flujo y recomendaciones.
- **Acceso Directo al Calendario**: Botón directo para consultar el calendario exclusivo de la colonia activa.

### 2. Calendario Móvil de Tandeo e Incidencias Técnicas
- **Cuadrícula Táctil Mensual**: Solución al problema de listas en texto plano.
- **Percances e Incidencias por Colonia**: Renderizado de tarjetas de alerta ante:
  - 🔴 Ruptura de tuberías principales.
  - ⚡ Cortes de luz en subestaciones CFE / Pozos.
  - 🟤 Pausas por calidad/turbidez de arroyos.
  - 🟠 Mantenimiento preventivo de válvulas.

### 3. Módulo de Reportes Ciudadanos Autenticados (Anti-Reportes Falsos)
- **Selección de Origen de Fuga**: Justificación operativa especificando si proviene de *Toma Domiciliaria, Tubo Matriz de Calle, Válvula de Esquina, Alcantarilla o Tanque Elevado*.
- **Autenticación del Ciudadano**: Requiere Nombre completo, Teléfono celular, N° de Contrato SAPA y declaración bajo protesta de decir verdad.
- **Emisión de Alertas a Vecinos**: Notifica inmediatamente a los habitantes de la colonia involucrada.

### 4. Centro de Notificaciones Exclusivas
- **Selector de Prioridad**: Permite alternar entre *Alertas exclusivas de mi colonia* vs *Alertas de todo La Paz*.
- **Trazabilidad Explicativa**: Cada notificación justifica su recepción al usuario según su sector.

### 5. Guía Informativa de Uso Eficiente del Agua
- **Recomendación Dinámica Día/Noche**: Consejos prácticos sobre riego nocturno, llenado óptimo de tinacos/aljibes, duchas eficientes de 5 min y reuso de aguas grises.

---

## 🛠️ Tecnologías Utilizadas

- **Core**: React + Vite
- **Styling**: Vanilla CSS (Variables HSL, Flat Design, Mobile Frame)
- **Íconos**: Lucide React (Íconos vectoriales SVG sin emojis)
- **3D Engine**: Three.js & `@react-three/fiber` / `@react-three/drei` (Modelo anatómico de la Vaquita Marina *Phocoena sinus*)

---

## 🚀 Cómo ejecutar localmente

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo en red local (accesible desde tu celular)
npm run dev -- --host 0.0.0.0 --port 3000
```
