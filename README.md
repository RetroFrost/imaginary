# Ribbon reference prototype

Disposable proof-of-concept for recreating the attached WatchData video format specifically. This is **not** a generic comparison renderer.

Current measured facts from the source video:

- 1920×1080, 60 fps, 218.732 s
- artwork region ends at y=871
- title band y=872–963 (92 px), near RGB 242/242/242
- description band begins y=965 and runs to about y=1074, near RGB 100/97/88
- ~7 px black separators
- ~477 px card pitch
- opening uses explicit per-slot entrances and staged badge resizing
- steady strip motion begins around 8.7 s
- start-up scroll accelerates/decelerates into a constant ~133.3 px/s leftward motion from ~10.5 s onward
- badge shine is a one-shot entrance effect, not a repeating loop

`index.html` is the prototype UI. Edit the JSON and scrub the timeline.

The illustration layer is still placeholder scaffolding; animation/layout measurements are being cloned first so artwork/data can remain a separate editable layer.
