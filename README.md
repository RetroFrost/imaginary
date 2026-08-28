# Ribbon reference prototype

Disposable proof-of-concept for recreating the attached WatchData video format specifically. This is **not** a generic comparison renderer.

Current measured facts from the source video:

- 1920×1080, 60 fps, 218.732 s
- artwork region ends at y=871
- title band y=872–963 (92 px), near RGB 242/242/242
- description band begins y=965 and runs to about y=1074, measured near `#635E57`
- ~7 px `#111111` separators
- 470 px card width, 477 px card pitch
- opening uses explicit per-slot entrances and staged badge resizing
- steady strip motion begins around 8.7 s
- start-up scroll transitions into a measured constant ~133.6 px/s leftward motion
- badge body is effectively flat `#D30809`; depth comes from shadow + one-shot shine
- steady badges are layered globally above the carousel and use a measured hero/fall/settle lifecycle
- the outro uses measured 60 fps wipe/panel/credits/subscribe choreography
- Pin Sans is the measured typography target; Nunito remains only a browser fallback where the bundle font asset is unavailable

`index.html` is the prototype UI. Edit the JSON and scrub the timeline.

## Ribbon Bundles

Ribbon's project/package format is `.rbn` (**Ribbon Bundle**). Importing a bundle imports its complete contents as one unit: data, artwork, renderer preset, animation measurements, colours, typography references, audio, metadata and artwork transforms.

See [`RBN_SPEC.md`](RBN_SPEC.md) for the v1 format and [`artwork/dimensions.example.json`](artwork/dimensions.example.json) for artwork sizing/placement rules.

`rbn.js` contains the v1 dimensions/transform resolution model. Artwork transforms are non-destructive and intended to be edited directly on the preview canvas: select, drag, scale, rotate and crop/reframe. Optional blurred crop-fill is generated from the same source image and never requires image generation.

The illustration layer is still being extracted/connected separately from the renderer geometry so artwork can remain freely replaceable without changing animation timing.
