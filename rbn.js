// Ribbon Bundle v1 artwork model.
// Binary .rbn ZIP loading will sit above this; this file owns deterministic
// dimensions/transform resolution and stays independent of the renderer.

window.RibbonBundle = (() => {
  const DEFAULTS = Object.freeze({
    width: 470,
    height: 872,
    fit: 'cover',
    blurCroppedArea: false,
    blurRadius: 28,
    positionX: 0.5,
    positionY: 0.5,
    rotation: 0,
    flipX: false,
    flipY: false
  });

  const FITS = new Set(['cover', 'contain', 'stretch']);
  const clamp01 = n => Math.max(0, Math.min(1, Number(n)));
  const finite = (n, fallback) => Number.isFinite(Number(n)) ? Number(n) : fallback;

  function normaliseRule(rule = {}) {
    const out = { ...DEFAULTS, ...rule };
    out.width = Math.max(1, finite(out.width, DEFAULTS.width));
    out.height = Math.max(1, finite(out.height, DEFAULTS.height));
    out.fit = FITS.has(out.fit) ? out.fit : DEFAULTS.fit;
    out.blurCroppedArea = Boolean(out.blurCroppedArea);
    out.blurRadius = Math.max(0, finite(out.blurRadius, DEFAULTS.blurRadius));
    out.positionX = clamp01(out.positionX);
    out.positionY = clamp01(out.positionY);
    out.rotation = finite(out.rotation, 0);
    out.flipX = Boolean(out.flipX);
    out.flipY = Boolean(out.flipY);
    return out;
  }

  function resolveArtwork(dimensions = {}, filename) {
    const globalRule = normaliseRule(dimensions.all || {});
    const override = dimensions.artworks?.[filename] || {};
    return normaliseRule({ ...globalRule, ...override });
  }

  function defaultTransform(rule) {
    const r = normaliseRule(rule);
    return {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height,
      rotation: r.rotation,
      flipX: r.flipX,
      flipY: r.flipY,
      crop: { x: 0, y: 0, width: 1, height: 1 },
      blurCroppedArea: r.blurCroppedArea,
      blurRadius: r.blurRadius,
      fit: r.fit,
      positionX: r.positionX,
      positionY: r.positionY
    };
  }

  function normaliseTransform(transform = {}, rule = DEFAULTS) {
    const base = defaultTransform(rule);
    const crop = { ...base.crop, ...(transform.crop || {}) };
    crop.x = clamp01(crop.x);
    crop.y = clamp01(crop.y);
    crop.width = Math.max(0.001, Math.min(1 - crop.x, finite(crop.width, 1)));
    crop.height = Math.max(0.001, Math.min(1 - crop.y, finite(crop.height, 1)));

    return {
      ...base,
      ...transform,
      x: finite(transform.x, base.x),
      y: finite(transform.y, base.y),
      width: Math.max(1, finite(transform.width, base.width)),
      height: Math.max(1, finite(transform.height, base.height)),
      rotation: finite(transform.rotation, base.rotation),
      flipX: transform.flipX == null ? base.flipX : Boolean(transform.flipX),
      flipY: transform.flipY == null ? base.flipY : Boolean(transform.flipY),
      blurCroppedArea: transform.blurCroppedArea == null ? base.blurCroppedArea : Boolean(transform.blurCroppedArea),
      blurRadius: Math.max(0, finite(transform.blurRadius, base.blurRadius)),
      crop
    };
  }

  function resetArtwork(dimensions, filename) {
    return defaultTransform(resolveArtwork(dimensions, filename));
  }

  function validateDimensions(dimensions) {
    if (!dimensions || typeof dimensions !== 'object') throw new Error('artwork/dimensions.json must be an object');
    if (dimensions.version != null && dimensions.version !== 1) throw new Error(`Unsupported artwork dimensions version: ${dimensions.version}`);
    if (dimensions.artworks != null && (typeof dimensions.artworks !== 'object' || Array.isArray(dimensions.artworks))) {
      throw new Error('artworks must be an object keyed by asset filename');
    }
    normaliseRule(dimensions.all || {});
    for (const value of Object.values(dimensions.artworks || {})) normaliseRule(value);
    return true;
  }

  return {
    version: 1,
    defaults: DEFAULTS,
    validateDimensions,
    resolveArtwork,
    defaultTransform,
    normaliseTransform,
    resetArtwork
  };
})();
