# Video Fallback System

Este directorio contiene los videos fallback MP4 que se utilizan cuando Mux no está disponible.

## Estructura

Coloca los archivos MP4 en esta carpeta con nombres descriptivos:

```
public/videos/fallback/
  ├── mon-cheri.mp4
  ├── frizze-1.mp4
  ├── kia.mp4
  └── ...
```

## Configuración

Para asignar un fallback a un work, edita `src/data/works.ts`:

```typescript
{
  id: '1',
  ...getMuxVideo(muxVideos.monCheri),
  fallbackVideo: '/videos/fallback/mon-cheri.mp4',  // ← Agregar esta línea
  ...
}
```

## Testing

Para forzar el uso de fallback videos durante desarrollo:

1. Crea un archivo `.env.local` en la raíz del proyecto
2. Agrega la variable:
   ```
   NEXT_PUBLIC_FORCE_VIDEO_FALLBACK=true
   ```
3. Reinicia el servidor de desarrollo

Para volver a Mux:
- Cambia a `NEXT_PUBLIC_FORCE_VIDEO_FALLBACK=false`
- O elimina la variable completamente

## Notas

- Los archivos fallback NO deben depender de infraestructura Mux
- Usa MP4 estándar codificado con H.264
- Optimiza el tamaño para web
- Si un work no tiene `fallbackVideo` definido, mostrará solo el poster en caso de fallo
