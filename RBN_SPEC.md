# Ribbon Bundle (`.rbn`) v1

A `.rbn` file is a complete Ribbon project bundle. Importing one imports **everything in the bundle** as a unit: data, artwork, renderer configuration, animation measurements, colours, typography references, audio, metadata and artwork transform state.

The container is ZIP-compatible internally but uses the `.rbn` extension externally.

## Layout

```text
example.rbn
├── manifest.json
├── data.json
├── renderer.json
├── artwork/
│   ├── dimensions.json
│   ├── 0001.webp
│   ├── 0002.webp
│   └── ...
├── animations/
│   ├── opening.json
│   ├── carousel.json
│   ├── badges.json
│   └── outro.json
├── audio/
└── preview.webp
```

## Import semantics

Ribbon never treats an `.rbn` as an artwork-only pack. Import means opening the entire bundle and applying its complete renderer/data/assets state.

Unknown optional files may be preserved. Required files that fail validation should make the import fail with a useful error rather than silently falling back to a generic renderer.

## `artwork/dimensions.json`

This file controls placement and transform behaviour for artwork. `all` supplies defaults. `artworks` supplies per-file overrides.

```json
{
  "version": 1,
  "all": {
    "width": 470,
    "height": 872,
    "fit": "cover",
    "blurCroppedArea": true,
    "blurRadius": 28,
    "positionX": 0.5,
    "positionY": 0.5,
    "rotation": 0,
    "flipX": false,
    "flipY": false
  },
  "artworks": {
    "0002.webp": {
      "fit": "contain",
      "blurCroppedArea": false,
      "positionY": 0.35
    }
  }
}
```

### Blur fill

`blurCroppedArea` is optional. When enabled, Ribbon uses the same source image as a behind-image fill layer, scaled to cover the target area and blurred. The foreground artwork remains independently fitted/transformed. This is deterministic and does not invoke image generation.

## Direct artwork transforms

Artwork is transformed directly on the preview canvas:

- click/tap artwork to select it
- drag to move
- drag corner handles to scale
- use the rotation handle (or two-finger gesture on touch) to rotate
- double-click/double-tap to enter crop/reframe mode
- click/tap outside to deselect
- Reset restores the bundle/default transform

Transforms are non-destructive. Ribbon keeps the original asset and stores only transform state.

Example persisted state:

```json
{
  "0002.webp": {
    "x": 24,
    "y": -18,
    "width": 522,
    "height": 910,
    "rotation": 0,
    "crop": {
      "x": 0,
      "y": 0,
      "width": 1,
      "height": 1
    },
    "blurCroppedArea": true,
    "blurRadius": 28
  }
}
```

Coordinates are stored in renderer-space pixels unless explicitly normalised (crop values are 0–1).

## Renderer fidelity

A bundle may carry a measured renderer preset. Editable artwork/data must not change the renderer's animation choreography. The current reference preset keeps carousel movement, badge hierarchy, shine, title/description bands, opening and outro as separate layers so artwork can be replaced without changing timing.
