# Materiales de Three.js

## Lista de Materiales

1. **MeshBasicMaterial**

   - El material más simple
   - No se ve afectado por luces
   - Útil para objetos que no necesitan sombreado
   - Ideal para wireframes o objetos planos

2. **MeshLambertMaterial**

   - Material mate sin brillos
   - Responde a la iluminación
   - Bueno para objetos no brillantes como madera o papel
   - Menos costoso computacionalmente que Phong

3. **MeshPhongMaterial**

   - Material brillante con reflejos especulares
   - Responde a la iluminación
   - Ideal para objetos plásticos o metálicos
   - Más realista que Lambert pero más costoso

4. **MeshStandardMaterial**

   - Material basado en Physically Based Rendering (PBR)
   - Propiedades `roughness` y `metalness`
   - Más realista que Phong
   - Ideal para materiales modernos y realistas

5. **MeshPhysicalMaterial**

   - Extensión de StandardMaterial
   - Añade propiedades como `clearcoat`, `transmission`, `iridescence`
   - El más realista de todos
   - Ideal para vidrio, metal pulido, materiales con capas

6. **MeshToonMaterial**

   - Crea un efecto de sombreado tipo cartoon/cel-shading
   - No tiene brillos suaves
   - Ideal para estilos anime o cómic
   - Los gradientes de sombreado son escalonados

7. **MeshNormalMaterial**

   - Mapea los normales del objeto a colores RGB
   - Útil para debugging
   - No responde a luces
   - Cada cara muestra el color según su dirección

8. **MeshDepthMaterial**

   - Renderiza la profundidad de los objetos en escala de grises
   - Útil para efectos de post-procesamiento
   - No responde a luces
   - Blanco (cerca) a negro (lejos)

9. **ShaderMaterial**

   - Material personalizado usando shaders GLSL
   - Control total sobre el renderizado
   - Más complejo de implementar
   - Máximo rendimiento y flexibilidad

10. **RawShaderMaterial**
    - Similar a ShaderMaterial pero sin predefinidos
    - Requiere definir todos los atributos y uniforms
    - Control absoluto sobre el pipeline de renderizado
    - Para usuarios avanzados

## Parámetros de Materiales

### Parámetros Básicos (compartidos por la mayoría de materiales)

- `color`: Color base del material (ejemplo: `0xff0000` o `"#ff0000"`)
- `transparent`: Booleano para habilitar transparencia
- `opacity`: Valor entre 0 y 1 para la transparencia
- `side`: Define qué lado de la cara se renderiza (`THREE.FrontSide`, `THREE.BackSide`, `THREE.DoubleSide`)
- `visible`: Booleano para mostrar/ocultar el material
- `wireframe`: Booleano para mostrar solo los bordes del objeto

### Parámetros de Mapeo de Texturas

- `map`: Textura principal del material
- `normalMap`: Textura para simular detalles de relieve
- `bumpMap`: Textura para simular relieves (más simple que normalMap)
- `displacementMap`: Textura para desplazamiento real de la geometría
- `alphaMap`: Textura para controlar la transparencia
- `aoMap`: Textura para oclusión ambiental

### Parámetros de Materiales con Luz (Lambert, Phong, Standard)

- `emissive`: Color que emite el material independiente de la iluminación
- `emissiveIntensity`: Intensidad de la emisión
- `emissiveMap`: Textura para las áreas emisivas

### Parámetros Específicos de MeshPhongMaterial

- `shininess`: Intensidad del brillo especular
- `specular`: Color del brillo especular
- `flatShading`: Booleano para sombreado plano vs suave

### Parámetros de MeshStandardMaterial

- `roughness`: Qué tan áspero es el material (0 a 1)
- `metalness`: Qué tan metálico es el material (0 a 1)
- `roughnessMap`: Textura para controlar la aspereza
- `metalnessMap`: Textura para controlar el aspecto metálico

### Parámetros de MeshPhysicalMaterial

- `clearcoat`: Capa de barniz (0 a 1)
- `clearcoatRoughness`: Aspereza del barniz
- `transmission`: Para materiales transparentes como vidrio
- `thickness`: Grosor para materiales transparentes
- `iridescence`: Efecto de cambio de color según el ángulo

### Parámetros de MeshDepthMaterial

- `depthPacking`: Tipo de empaquetado de profundidad
- `displacementScale`: Escala del desplazamiento
- `displacementBias`: Sesgo del desplazamiento

## Tipos de Cámaras

1. **PerspectiveCamera**

   - Cámara que simula la visión humana
   - Parámetros principales:
     - `fov`: Campo de visión en grados (45-75 recomendado)
     - `aspect`: Relación de aspecto (width/height)
     - `near`: Distancia mínima de renderizado
     - `far`: Distancia máxima de renderizado
   - Ejemplo:
     ```javascript
     const camera = new THREE.PerspectiveCamera(
       75,
       window.innerWidth / window.innerHeight,
       0.1,
       1000
     );
     camera.position.set(0, 5, 10);
     ```

2. **OrthographicCamera**

   - Cámara sin perspectiva (proyección paralela)
   - Útil para vistas 2D o isométricas
   - Parámetros principales:
     - `left`, `right`, `top`, `bottom`: Límites de la vista
     - `near`, `far`: Planos de recorte
   - Ejemplo:
     ```javascript
     const camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 1000);
     camera.position.set(0, 0, 10);
     ```

3. **CubeCamera**
   - Crea un mapa de entorno en tiempo real
   - Útil para reflejos dinámicos
   - Ejemplo:
     ```javascript
     const cubeCamera = new THREE.CubeCamera(0.1, 1000, 256);
     cubeCamera.position.set(0, 0, 0);
     ```

## Tipos de Luces

1. **AmbientLight**

   - Luz ambiental que ilumina todo uniformemente
   - No tiene dirección ni posición
   - Ejemplo:
     ```javascript
     const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
     scene.add(ambientLight);
     ```

2. **DirectionalLight**

   - Luz que viene de una dirección específica
   - Simula la luz del sol
   - Ejemplo:
     ```javascript
     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
     directionalLight.position.set(5, 5, 5);
     scene.add(directionalLight);
     ```

3. **PointLight**

   - Luz que emana de un punto en todas direcciones
   - Simula una bombilla
   - Ejemplo:
     ```javascript
     const pointLight = new THREE.PointLight(0xffffff, 1, 100);
     pointLight.position.set(0, 10, 0);
     scene.add(pointLight);
     ```

4. **SpotLight**

   - Luz con forma de cono
   - Útil para focos o linternas
   - Ejemplo:
     ```javascript
     const spotLight = new THREE.SpotLight(0xffffff, 1);
     spotLight.position.set(0, 10, 0);
     spotLight.angle = Math.PI / 4;
     spotLight.penumbra = 0.1;
     scene.add(spotLight);
     ```

5. **HemisphereLight**

   - Luz que simula el cielo y el suelo
   - Útil para iluminación exterior
   - Ejemplo:
     ```javascript
     const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
     scene.add(hemisphereLight);
     ```

6. **RectAreaLight**
   - Luz que emana de un rectángulo
   - Útil para simular ventanas o pantallas
   - Ejemplo:
     ```javascript
     const rectLight = new THREE.RectAreaLight(0xffffff, 1, 4, 4);
     rectLight.position.set(0, 5, 0);
     scene.add(rectLight);
     ```

### Parámetros Comunes de Luces

- `color`: Color de la luz (hexadecimal o string)
- `intensity`: Intensidad de la luz (default: 1)
- `visible`: Booleano para mostrar/ocultar la luz
- `castShadow`: Booleano para habilitar sombras
- `shadow`: Objeto con configuraciones de sombras
  - `mapSize`: Resolución del mapa de sombras
  - `bias`: Ajuste para evitar artefactos
  - `radius`: Suavizado de bordes de sombras
