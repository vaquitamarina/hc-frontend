/* Utilities para anotar el odontograma SVG (versión completa).
   Incluye: utilidades geométricas, addCrown, modos interactivos (corona, ortho, diastema), etc.
   (Archivo modificado para añadir función: addFosasFisurasProfundas)
*/

function getSvg() {
  return document.querySelector('svg.odo');
}

function ensureOverlay(svg) {
  let overlay = svg.querySelector('#odontograma-overlay');
  if (!overlay) {
    overlay = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    overlay.setAttribute('id', 'odontograma-overlay');
    svg.appendChild(overlay);
  }
  return overlay;
}

function transformPointWithCTM(svg, ctm, x, y) {
  if (!ctm) return { x, y };
  const pt = svg.createSVGPoint();
  pt.x = x; pt.y = y;
  const p = pt.matrixTransform(ctm);
  return { x: p.x, y: p.y };
}

function parsePointsAttr(pointsAttr) {
  if (!pointsAttr) return [];
  const nums = pointsAttr.match(/-?(?:\d+|\d*\.\d+)(?:e[+\-]?\d+)?/gi);
  if (!nums) return [];
  const arr = nums.map((n) => parseFloat(n));
  const points = [];
  for (let i = 0; i + 1 < arr.length; i += 2) points.push([arr[i], arr[i + 1]]);
  return points;
}

function elementToSvgPoints(el, svg, samplePathSegments = 24) {
  const pts = [];
  if (!el || !svg) return pts;
  const tag = (el.tagName || '').toLowerCase();
  const ctm = el.getCTM ? el.getCTM() : null;
  try {
    if (tag === 'polygon' || tag === 'polyline') {
      const entries = parsePointsAttr(el.getAttribute('points') || '');
      for (const [x, y] of entries) {
        const p = transformPointWithCTM(svg, ctm, x, y);
        pts.push([p.x, p.y]);
      }
      return pts;
    }
    if (tag === 'rect') {
      const x = parseFloat(el.getAttribute('x') || 0);
      const y = parseFloat(el.getAttribute('y') || 0);
      const w = parseFloat(el.getAttribute('width') || 0);
      const h = parseFloat(el.getAttribute('height') || 0);
      const corners = [[x, y],[x + w, y],[x + w, y + h],[x, y + h]];
      for (const [cx, cy] of corners) {
        const p = transformPointWithCTM(svg, ctm, cx, cy);
        pts.push([p.x, p.y]);
      }
      return pts;
    }
    if (tag === 'circle' || tag === 'ellipse') {
      const cx = parseFloat(el.getAttribute('cx') || 0);
      const cy = parseFloat(el.getAttribute('cy') || 0);
      const rx = tag === 'circle' ? parseFloat(el.getAttribute('r') || 0) : parseFloat(el.getAttribute('rx') || 0);
      const ry = tag === 'circle' ? parseFloat(el.getAttribute('r') || 0) : parseFloat(el.getAttribute('ry') || 0);
      const steps = 12;
      for (let i = 0; i < steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        const x = cx + Math.cos(a) * rx;
        const y = cy + Math.sin(a) * ry;
        const p = transformPointWithCTM(svg, ctm, x, y);
        pts.push([p.x, p.y]);
      }
      return pts;
    }
    if (tag === 'path') {
      if (typeof el.getTotalLength === 'function' && typeof el.getPointAtLength === 'function') {
        const len = el.getTotalLength();
        const segments = Math.max(8, samplePathSegments);
        for (let i = 0; i <= segments; i++) {
          const at = (i / segments) * len;
          const pLocal = el.getPointAtLength(at);
          const p = transformPointWithCTM(svg, ctm, pLocal.x, pLocal.y);
          pts.push([p.x, p.y]);
        }
      } else {
        const b = el.getBBox();
        const corners = [[b.x, b.y],[b.x + b.width, b.y],[b.x + b.width, b.y + b.height],[b.x, b.y + b.height]];
        for (const [cx, cy] of corners) {
          const p = transformPointWithCTM(svg, ctm, cx, cy);
          pts.push([p.x, p.y]);
        }
      }
      return pts;
    }
    const b = el.getBBox();
    const corners = [[b.x, b.y],[b.x + b.width, b.y],[b.x + b.width, b.y + b.height],[b.x, b.y + b.height]];
    for (const [cx, cy] of corners) {
      const p = transformPointWithCTM(svg, ctm, cx, cy);
      pts.push([p.x, p.y]);
    }
    return pts;
  } catch (err) {
    return pts;
  }
}

function convexHull(points) {
  if (!points || points.length === 0) return [];
  const pts = points.map((p) => ({ x: p[0], y: p[1] })).sort((a,b) => (a.x === b.x ? a.y - b.y : a.x - b.x));
  const cross = (o,a,b) => (a.x - o.x)*(b.y - o.y) - (a.y - o.y)*(b.x - o.x);
  const lower = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper = [];
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  lower.pop(); upper.pop();
  const hull = lower.concat(upper);
  return hull.map((p) => [p.x, p.y]);
}

function computePointsFromParts(node, svg, partNames) {
  if (!node || !svg) return [];
  const selector = (partNames && partNames.length) ? partNames.map((n) => `[data-name="${n}"]`).join(',') : 'polygon,rect,path,polyline,ellipse,circle';
  const parts = Array.from(node.querySelectorAll(selector));
  const allPoints = [];
  for (const part of parts) {
    const pts = elementToSvgPoints(part, svg, 32);
    for (const p of pts) allPoints.push(p);
  }
  if (allPoints.length) return allPoints;

  const uses = Array.from(node.querySelectorAll('use'));
  if (uses.length === 0) return [];
  for (const useEl of uses) {
    try {
      const href = useEl.getAttribute('href') || useEl.getAttribute('xlink:href');
      if (!href) continue;
      const refId = href.replace(/^#/, '');
      const ref = svg.getElementById(refId);
      if (!ref) continue;
      const wrapper = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      try {
        const parentCTM = node.getCTM ? node.getCTM() : null;
        const useCTM = useEl.getCTM ? useEl.getCTM() : null;
        let localMatrix = null;
        if (parentCTM && typeof parentCTM.inverse === 'function' && useCTM) {
          try {
            const invParent = parentCTM.inverse();
            if (typeof invParent.multiply === 'function') localMatrix = invParent.multiply(useCTM);
            else if (typeof useCTM.multiply === 'function') localMatrix = useCTM.multiply(invParent);
            else localMatrix = useCTM;
          } catch (err) {
            localMatrix = useCTM;
          }
        } else localMatrix = null;
        if (localMatrix && typeof localMatrix.a === 'number') {
          wrapper.setAttribute('transform', `matrix(${localMatrix.a} ${localMatrix.b} ${localMatrix.c} ${localMatrix.d} ${localMatrix.e} ${localMatrix.f})`);
        } else {
          const tx = useEl.getAttribute('x') || '0';
          const ty = useEl.getAttribute('y') || '0';
          const tattr = useEl.getAttribute('transform') || '';
          const trans = (tx !== '0' || ty !== '0') ? `translate(${tx},${ty}) ${tattr}`.trim() : tattr;
          if (trans) wrapper.setAttribute('transform', trans);
        }
      } catch (err) {}
      const clone = ref.cloneNode(true);
      wrapper.appendChild(clone);
      node.appendChild(wrapper);
      const foundParts = Array.from(wrapper.querySelectorAll(selector));
      for (const pEl of foundParts) {
        const pts = elementToSvgPoints(pEl, svg, 32);
        for (const p of pts) allPoints.push(p);
      }
      try { wrapper.remove(); } catch (e) { if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper); }
    } catch (e) {
      continue;
    }
  }
  return allPoints;
}

function getToothGroup(svg, toothDataName) {
  return svg.querySelector(`[data-name="${toothDataName}"]`);
}

function getToothBBox(svg, toothDataName) {
  const el = getToothGroup(svg, toothDataName);
  if (!el) return null;
  try {
    const pts = elementToSvgPoints(el, svg, 16);
    if (pts && pts.length) {
      const xs = pts.map((p) => p[0]);
      const ys = pts.map((p) => p[1]);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);
      return { bbox: { x: minX, y: minY, width: maxX - minX, height: maxY - minY }, node: el };
    }
    const local = el.getBBox();
    const ctm = el.getCTM();
    if (!ctm) return { bbox: { x: local.x, y: local.y, width: local.width, height: local.height }, node: el };
    const p1 = transformPointWithCTM(getSvg(), ctm, local.x, local.y);
    const p2 = transformPointWithCTM(getSvg(), ctm, local.x + local.width, local.y + local.height);
    const minX = Math.min(p1.x, p2.x);
    const minY = Math.min(p1.y, p2.y);
    const maxX = Math.max(p1.x, p2.x);
    const maxY = Math.max(p1.y, p2.y);
    return { bbox: { x: minX, y: minY, width: maxX - minX, height: maxY - minY }, node: el };
  } catch (e) {
    return null;
  }
}

function centerOfTooth(svg, toothDataName) {
  const info = getToothBBox(svg, toothDataName);
  if (!info) return null;
  const { bbox, node } = info;
  return { x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height / 2, node, bbox };
}

export function clearAnnotations() {
  const svg = getSvg();
  if (!svg) return;
  const overlay = svg.querySelector('#odontograma-overlay');
  if (overlay) overlay.innerHTML = '';
  svg.querySelectorAll('.odontograma-highlighted').forEach((el) => {
    el.classList.remove('odontograma-highlighted');
    el.style.stroke = '';
    el.style.strokeWidth = '';
    el.style.fill = '';
  });
}

function computeFixedMargin(w, h) {
  return Math.max(1, Math.min(70, Math.min(w, h) * 0.70));
}

// addCrown: draw border/hull and optionally write crown code into nearest input
export function addCrown(toothDataName, crownType = 'CM', variant = 'BE', color = 'blue', includedParts = null) {
  const svg = getSvg(); if (!svg) return false;
  const group = getToothGroup(svg, toothDataName); if (!group) return false;

  const defaultParts = [
    'raiz-izq','raiz-der','base','cingulo',
    'fosas','fosa1','fosa2','fosa3',
    'surcos','surco1','surco2','surco3',
    'paredes','lado-izq','lado-der'
  ];
  const partsToUse = (includedParts && includedParts.length) ? includedParts : defaultParts;

  const points = computePointsFromParts(group, svg, partsToUse);
  const overlay = ensureOverlay(svg);

  if (includedParts && includedParts.length) {
    if (points && points.length >= 1) {
      const xs = points.map((p) => p[0]);
      const ys = points.map((p) => p[1]);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);
      const w = Math.max(0, maxX - minX);
      const h = Math.max(0, maxY - minY);
      const margin = computeFixedMargin(w, h);
      const rx = minX - margin, ry = minY - margin, rw = w + margin * 2, rh = h + margin * 2;
      const border = document.createElementNS('http://www.w3.org/2000/svg','rect');
      border.setAttribute('x', rx); border.setAttribute('y', ry); border.setAttribute('width', rw); border.setAttribute('height', rh);
      border.setAttribute('fill','none'); border.setAttribute('stroke', color); border.setAttribute('stroke-width','3'); border.setAttribute('class','annotation crown-border parts-bbox');
      overlay.appendChild(border);
      border.setAttribute('data-id', `crown-parts-bbox-${toothDataName}-${Date.now()}`);
    } else {
      const info = getToothBBox(svg, toothDataName); if (!info) return false;
      const bbox = info.bbox;
      const margin = computeFixedMargin(bbox.width, bbox.height);
      const rx = bbox.x - margin, ry = bbox.y - margin, rw = bbox.width + margin * 2, rh = bbox.height + margin * 2;
      const border = document.createElementNS('http://www.w3.org/2000/svg','rect');
      border.setAttribute('x', rx); border.setAttribute('y', ry); border.setAttribute('width', rw); border.setAttribute('height', rh);
      border.setAttribute('fill','none'); border.setAttribute('stroke', color); border.setAttribute('stroke-width','3'); border.setAttribute('class','annotation crown-border fallback');
      overlay.appendChild(border);
      border.setAttribute('data-id', `crown-border-${toothDataName}-${Date.now()}`);
    }
  } else {
    if (points && points.length >= 3) {
      const hull = convexHull(points);
      if (hull && hull.length >= 3) {
        const polyEl = document.createElementNS('http://www.w3.org/2000/svg','polygon');
        polyEl.setAttribute('points', hull.map((p) => `${p[0]},${p[1]}`).join(' '));
        polyEl.setAttribute('fill','none'); polyEl.setAttribute('stroke', color); polyEl.setAttribute('stroke-width','2'); polyEl.setAttribute('class','annotation crown-border hull');
        overlay.appendChild(polyEl);
        polyEl.setAttribute('data-id', `crown-hull-${toothDataName}-${Date.now()}`);
      }
    } else {
      const info = getToothBBox(svg, toothDataName); if (!info) return false;
      const bbox = info.bbox;
      const margin = computeFixedMargin(bbox.width, bbox.height);
      const rx = bbox.x - margin, ry = bbox.y - margin, rw = bbox.width + margin * 2, rh = bbox.height + margin * 2;
      const border = document.createElementNS('http://www.w3.org/2000/svg','rect');
      border.setAttribute('x', rx); border.setAttribute('y', ry); border.setAttribute('width', rw); border.setAttribute('height', rh);
      border.setAttribute('fill','none'); border.setAttribute('stroke', color); border.setAttribute('stroke-width','3'); border.setAttribute('class','annotation crown-border fallback');
      overlay.appendChild(border);
      border.setAttribute('data-id', `crown-border-${toothDataName}-${Date.now()}`);
    }
  }

  // attempt to write crownType into nearest foreignObject input (autocomplete)
  try {
    const info = getToothBBox(svg, toothDataName);
    const bbox = info ? info.bbox : null;
    if (bbox) {
      const cx = bbox.x + bbox.width / 2;
      const cy = bbox.y + bbox.height / 2;
      const inputs = Array.from(svg.querySelectorAll('foreignObject'));
      let best = null; let bestDist = Infinity;
      function foCenterInSvg(fo) {
        try {
          const foBox = fo.getBBox();
          const foCTM = fo.getCTM ? fo.getCTM() : null;
          if (foCTM) {
            const pt = svg.createSVGPoint(); pt.x = foBox.x + foBox.width / 2; pt.y = foBox.y + foBox.height / 2;
            return pt.matrixTransform(foCTM);
          }
          return { x: foBox.x + foBox.width / 2, y: foBox.y + foBox.height / 2 };
        } catch (e) {
          try {
            const rect = fo.getBoundingClientRect();
            const pt = svg.createSVGPoint(); pt.x = rect.left + rect.width / 2; pt.y = rect.top + rect.height / 2;
            const screenCTM = svg.getScreenCTM(); if (!screenCTM) return null;
            const inv = screenCTM.inverse(); return pt.matrixTransform(inv);
          } catch (err) { return null; }
        }
      }
      for (const fo of inputs) {
        const c = foCenterInSvg(fo); if (!c) continue;
        const d = Math.hypot(c.x - cx, c.y - cy);
        if (d < bestDist) { bestDist = d; best = fo; }
      }
      if (best) {
        const input = best.querySelector('input, textarea');
        if (input) {
          input.value = crownType;
          input.style.border = `2px solid ${color}`;
        }
      }
    }
  } catch (e) { /* ignore */ }

  return true;
}

// startCoronaMode: click a un grupo tooth-group aplicará addCrown con crownType
export function startCoronaMode(crownType = 'CM', color = 'blue') {
  const svg = getSvg();
  if (!svg) return { stop() {} };

  function findToothGroupFromEvent(target) {
    let el = target;
    while (el && el !== svg) {
      if (el.classList && el.classList.contains('tooth-group') && el.getAttribute('data-name')) return el;
      el = el.parentNode;
    }
    return null;
  }

  function onClick(e) {
    try {
      const g = findToothGroupFromEvent(e.target);
      if (!g) return;
      const name = g.getAttribute('data-name');
      if (!name) return;
      addCrown(name, crownType, 'BE', color, null);
    } catch (err) {
      console.error('startCoronaMode onClick error', err);
    }
  }

  function onKey(e) { if (e.key === 'Escape') cleanup(); }

  function cleanup() {
    try { svg.removeEventListener('click', onClick); } catch (e) {}
    try { window.removeEventListener('keydown', onKey); } catch (e) {}
  }

  svg.addEventListener('click', onClick);
  window.addEventListener('keydown', onKey);

  return { stop: cleanup };
}

// small helper to create "hand drawn" polyline points with slight jitter along perpendicular
function makeScribblePolylinePoints(x1, y1, x2, y2, segments = 6, jitter = 1.2, perpendicularOffset = 0) {
  const pts = [];
  const vx = x2 - x1;
  const vy = y2 - y1;
  const len = Math.hypot(vx, vy) || 1;
  const px = -vy / len;
  const py = vx / len;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const cx = x1 + vx * t;
    const cy = y1 + vy * t;
    const jitterAmt = (Math.sin(i * 2.3) * 0.5 + (Math.random() - 0.5) * 0.6) * jitter;
    const ox = px * (perpendicularOffset + jitterAmt);
    const oy = py * (perpendicularOffset + jitterAmt);
    pts.push(`${cx + ox},${cy + oy}`);
  }
  return pts.join(' ');
}

// addDiastemaAtPoint: draws a stylized X (scribble) centered at (x,y)
export function addDiastemaAtPoint(svg, x, y, color = 'blue', sizeX = 18, sizeY = 44, strokeWidth = 1) {
  try {
    const overlay = ensureOverlay(svg);
    const idBase = `diastema-${Date.now()}`;
    const created = [];

    const ax1 = x - sizeX, ay1 = y - sizeY;
    const ax2 = x + sizeX, ay2 = y + sizeY;
    const offsetsA = [-1.5, 0, 1.5];
    for (let i = 0; i < offsetsA.length; i++) {
      const pts = makeScribblePolylinePoints(ax1, ay1, ax2, ay2, 6, 1.0, offsetsA[i]);
      const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      poly.setAttribute('points', pts);
      poly.setAttribute('fill', 'none');
      poly.setAttribute('stroke', color);
      poly.setAttribute('stroke-width', String(strokeWidth));
      poly.setAttribute('stroke-linecap', 'round');
      poly.setAttribute('stroke-linejoin', 'round');
      poly.setAttribute('class', 'annotation diastema scribble');
      poly.setAttribute('data-id', `${idBase}-a-${i}`);
      overlay.appendChild(poly);
      created.push(poly);
    }

    const bx1 = x + sizeX, by1 = y - sizeY;
    const bx2 = x - sizeX, by2 = y + sizeY;
    const offsetsB = [1.5, 0, -1.5];
    for (let i = 0; i < offsetsB.length; i++) {
      const pts = makeScribblePolylinePoints(bx1, by1, bx2, by2, 6, 1.0, offsetsB[i]);
      const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      poly.setAttribute('points', pts);
      poly.setAttribute('fill', 'none');
      poly.setAttribute('stroke', color);
      poly.setAttribute('stroke-width', String(strokeWidth));
      poly.setAttribute('stroke-linecap', 'round');
      poly.setAttribute('stroke-linejoin', 'round');
      poly.setAttribute('class', 'annotation diastema scribble');
      poly.setAttribute('data-id', `${idBase}-b-${i}`);
      overlay.appendChild(poly);
      created.push(poly);
    }

    return { elements: created, id: idBase };
  } catch (err) {
    console.error('addDiastemaAtPoint error', err);
    return null;
  }
}

/*
  startDiastemaMode(color, sizeX, sizeY, strokeWidth, onDone)
  - dibuja UNA X al primer click y se detiene automáticamente
  - onDone({ cancelled, x, y }) se llama al terminar
*/
export function startDiastemaMode(color = 'blue', sizeX = 18, sizeY = 44, strokeWidth = 1, onDone) {
  const svg = getSvg();
  if (!svg) return { stop() {} };

  let active = true;

  function clientToSvgPoint(cx, cy) {
    try {
      const pt = svg.createSVGPoint();
      pt.x = cx; pt.y = cy;
      const screenCTM = svg.getScreenCTM();
      if (!screenCTM) return { x: cx, y: cy };
      return pt.matrixTransform(screenCTM.inverse());
    } catch (err) {
      return { x: cx, y: cy };
    }
  }

  function cleanup() {
    if (!active) return;
    try { svg.removeEventListener('click', onClick); } catch (e) {}
    try { window.removeEventListener('keydown', onKey); } catch (e) {}
    active = false;
  }

  function onKey(e) {
    if (e.key === 'Escape') {
      cleanup();
      if (typeof onDone === 'function') onDone({ cancelled: true });
    }
  }

  function onClick(e) {
    try {
      if (!svg.contains(e.target)) return;
      const p = clientToSvgPoint(e.clientX, e.clientY);
      addDiastemaAtPoint(svg, p.x, p.y, color, sizeX, sizeY, strokeWidth);
      cleanup();
      if (typeof onDone === 'function') onDone({ cancelled: false, x: p.x, y: p.y });
    } catch (err) {
      console.error('diastema onClick error', err);
    }
  }

  svg.addEventListener('click', onClick);
  window.addEventListener('keydown', onKey);

  return {
    stop: cleanup,
    isActive: () => active,
  };
}

// startFixedOrthoMode and startRemovableOrthoMode are kept (simple implementations)
export function startFixedOrthoMode(color = 'blue') {
  const svg = getSvg(); if (!svg) return { stop() {} };
  const overlay = ensureOverlay(svg);
  const pts = []; const markers = [];
  function clientToSvgPoint(cx, cy) { const pt = svg.createSVGPoint(); pt.x = cx; pt.y = cy; const ctm = svg.getScreenCTM(); if (!ctm) return { x: cx, y: cy }; return pt.matrixTransform(ctm.inverse()); }
  function onClick(e) { if (!svg.contains(e.target)) return; const p = clientToSvgPoint(e.clientX, e.clientY); const c = document.createElementNS('http://www.w3.org/2000/svg','circle'); c.setAttribute('cx',p.x); c.setAttribute('cy',p.y); c.setAttribute('r','4'); c.setAttribute('fill','red'); overlay.appendChild(c); markers.push(c); pts.push(p); if (pts.length===2) { const l=document.createElementNS('http://www.w3.org/2000/svg','line'); l.setAttribute('x1',pts[0].x); l.setAttribute('y1',pts[0].y); l.setAttribute('x2',pts[1].x); l.setAttribute('y2',pts[1].y); l.setAttribute('stroke',color); l.setAttribute('stroke-width','4'); overlay.appendChild(l); cleanup(); } }
  function onKey(e) { if (e.key === 'Escape') cleanup(); }
  function cleanup() { svg.removeEventListener('click', onClick); window.removeEventListener('keydown', onKey); markers.forEach(m=>m.remove()); }
  svg.addEventListener('click', onClick); window.addEventListener('keydown', onKey);
  return { stop: cleanup };
}

export function startRemovableOrthoMode(color = 'blue', steps = 10, amplitude = 10) {
  const svg = getSvg(); if (!svg) return { stop() {} };
  const overlay = ensureOverlay(svg);
  const points = []; const markers = [];
  function clientToSvgPoint(cx, cy) { const pt = svg.createSVGPoint(); pt.x = cx; pt.y = cy; const ctm = svg.getScreenCTM(); if (!ctm) return { x: cx, y: cy }; return pt.matrixTransform(ctm.inverse()); }
  function onClick(e) { if (!svg.contains(e.target)) return; const p = clientToSvgPoint(e.clientX, e.clientY); const c = document.createElementNS('http://www.w3.org/2000/svg','circle'); c.setAttribute('cx',p.x); c.setAttribute('cy',p.y); c.setAttribute('r','4'); c.setAttribute('fill','red'); overlay.appendChild(c); markers.push(c); points.push(p); if (points.length===2) { const p1=points[0], p2=points[1]; const vx=p2.x-p1.x, vy=p2.y-p1.y, len=Math.hypot(vx,vy)||1, nx=-vy/len, ny=vx/len; const ptsArr=[]; for (let i=0;i<=steps;i++){ const t=i/steps; const xi=p1.x+vx*t; const yi=p1.y+vy*t; const off=(i%2===0)?amplitude:-amplitude; ptsArr.push(`${xi+nx*off},${yi+ny*off}`); } const poly=document.createElementNS('http://www.w3.org/2000/svg','polyline'); poly.setAttribute('points', ptsArr.join(' ')); poly.setAttribute('stroke', color); poly.setAttribute('stroke-width','3'); poly.setAttribute('fill','none'); overlay.appendChild(poly); cleanup(); } }
  function onKey(e) { if (e.key === 'Escape') cleanup(); }
  function cleanup() { svg.removeEventListener('click', onClick); window.removeEventListener('keydown', onKey); markers.forEach(m=>m.remove()); }
  svg.addEventListener('click', onClick); window.addEventListener('keydown', onKey);
  return { stop: cleanup };
}

export function addRemovableOrtho(startTooth, endTooth, color = 'blue', steps = 8, amplitude = 8) {
  const svg = getSvg(); if (!svg) return false;
  const s = centerOfTooth(svg, startTooth); const e = centerOfTooth(svg, endTooth); if (!s || !e) return false;
  const overlay = ensureOverlay(svg);
  const vx = e.x - s.x, vy = e.y - s.y, len = Math.hypot(vx, vy) || 1, nx = -vy / len, ny = vx / len;
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps; const xi = s.x + vx * t; const yi = s.y + vy * t; const off = (i % 2 === 0) ? amplitude : -amplitude;
    pts.push(`${xi + nx * off},${yi + ny * off}`);
  }
  const poly = document.createElementNS('http://www.w3.org/2000/svg','polyline'); poly.setAttribute('points', pts.join(' ')); poly.setAttribute('stroke', color); poly.setAttribute('stroke-width','3'); poly.setAttribute('fill','none'); overlay.appendChild(poly);
  return true;
}

export function highlightToothBox(toothDataName, color = 'red') {
  const svg = getSvg(); if (!svg) return false;
  const info = getToothBBox(svg, toothDataName); if (!info) return false;
  const { bbox } = info;
  const overlay = ensureOverlay(svg);
  const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
  rect.setAttribute('x', bbox.x - 2); rect.setAttribute('y', bbox.y - 2);
  rect.setAttribute('width', bbox.width + 4); rect.setAttribute('height', bbox.height + 4);
  rect.setAttribute('fill', 'none'); rect.setAttribute('stroke', color); rect.setAttribute('stroke-width', '2'); rect.setAttribute('class', 'annotation highlight-box');
  overlay.appendChild(rect);
  rect.setAttribute('data-id', `box-${toothDataName}-${Date.now()}`);
  return true;
}

/* ------------------------------------------------------------------
   NUEVO: addDefect - comportamientos para "Defectos de desarrollo del esmalte"
   - Dibuja marcador y etiqueta en el centro del diente (o cerca)
   - No interfiere con otros modos
   ------------------------------------------------------------------ */
export function addDefect(toothDataName, defectText = 'O', color = 'red') {
  try {
    const svg = getSvg();
    if (!svg) return false;
    const info = getToothBBox(svg, toothDataName);
    if (!info) return false;
    const { bbox, node } = info;
    const overlay = ensureOverlay(svg);

    // safe placement values
    const cx = bbox.x + bbox.width / 2;
    const cy = bbox.y + bbox.height / 2;
    const markerOffsetX = Math.max(4, bbox.width * 0.18);
    const markerR = Math.max(3, Math.min(8, Math.min(bbox.width, bbox.height) * 0.06));

    // place small circle marker slightly to the right of center
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', cx + markerOffsetX);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', String(markerR));
    circle.setAttribute('fill', color);
    circle.setAttribute('class', 'annotation defect-marker');
    circle.setAttribute('data-id', `defect-marker-${toothDataName}-${Date.now()}`);
    overlay.appendChild(circle);

    // small text label (defectText)
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', cx + markerOffsetX + markerR + 4);
    text.setAttribute('y', cy + (markerR / 2));
    text.setAttribute('fill', color);
    text.setAttribute('font-size', String(Math.max(10, Math.min(14, markerR * 2))));
    text.setAttribute('class', 'annotation defect-label');
    text.setAttribute('data-id', `defect-label-${toothDataName}-${Date.now()}`);
    text.textContent = defectText;
    overlay.appendChild(text);

    return { circle, text };
  } catch (err) {
    console.error('addDefect error', err);
    return null;
  }
}

/* ------------------------------------------------------------------
   NUEVO: addFosasFisurasProfundas
   - Escribe la sigla "FFP" en el input (foreignObject) asociado al diente
     y dibuja una etiqueta "FFP" azul sobre el diente en el overlay SVG.
   - Uso: addFosasFisurasProfundas('2.7', 'blue')
   ------------------------------------------------------------------ */
export function addFosasFisurasProfundas(toothDataName, color = 'blue') {
  try {
    const svg = getSvg();
    if (!svg) return false;
    const info = getToothBBox(svg, toothDataName);
    if (!info) return false;
    const { bbox } = info;
    const toothCenter = { x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height / 2 };

    // Helper: compute foreignObject bounding box in SVG coords (best-effort)
    function foreignObjectBBoxInSvg(fo) {
      try {
        const foBox = fo.getBBox();
        const foCTM = fo.getCTM ? fo.getCTM() : null;
        if (foCTM) {
          const pt1 = svg.createSVGPoint(); pt1.x = foBox.x; pt1.y = foBox.y;
          const pt2 = svg.createSVGPoint(); pt2.x = foBox.x + foBox.width; pt2.y = foBox.y + foBox.height;
          const t1 = pt1.matrixTransform(foCTM);
          const t2 = pt2.matrixTransform(foCTM);
          const minX = Math.min(t1.x, t2.x);
          const minY = Math.min(t1.y, t2.y);
          const maxX = Math.max(t1.x, t2.x);
          const maxY = Math.max(t1.y, t2.y);
          return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
        }
      } catch (e) { /* fallback below */ }

      try {
        const rect = fo.getBoundingClientRect();
        const screenCTM = svg.getScreenCTM();
        if (!screenCTM) return null;
        const inv = screenCTM.inverse();
        const pTL = svg.createSVGPoint(); pTL.x = rect.left; pTL.y = rect.top;
        const pBR = svg.createSVGPoint(); pBR.x = rect.right; pBR.y = rect.bottom;
        const tTL = pTL.matrixTransform(inv);
        const tBR = pBR.matrixTransform(inv);
        const minX = Math.min(tTL.x, tBR.x);
        const minY = Math.min(tTL.y, tBR.y);
        const maxX = Math.max(tTL.x, tBR.x);
        const maxY = Math.max(tTL.y, tBR.y);
        return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
      } catch (err) {
        return null;
      }
    }

    function rectIntersectionArea(a, b) {
      const x1 = Math.max(a.x, b.x);
      const y1 = Math.max(a.y, b.y);
      const x2 = Math.min(a.x + a.width, b.x + b.width);
      const y2 = Math.min(a.y + a.height, b.y + b.height);
      if (x2 <= x1 || y2 <= y1) return 0;
      return (x2 - x1) * (y2 - y1);
    }

    // choose the best foreignObject to write into
    const fObjects = Array.from(svg.querySelectorAll('foreignObject'));
    let bestFo = null;
    let bestOverlap = -1;
    let bestByDist = null;
    let bestDist = Infinity;

    for (const fo of fObjects) {
      const foBox = foreignObjectBBoxInSvg(fo);
      if (!foBox) continue;
      const overlap = rectIntersectionArea(foBox, bbox);
      if (overlap > bestOverlap) {
        bestOverlap = overlap;
        bestFo = fo;
      }
      const foCenter = { x: foBox.x + foBox.width / 2, y: foBox.y + foBox.height / 2 };
      const dist = Math.hypot(foCenter.x - toothCenter.x, foCenter.y - toothCenter.y);
      if (dist < bestDist) { bestDist = dist; bestByDist = fo; }
    }

    const chosenFo = bestOverlap > 0 ? bestFo : (bestByDist || bestFo);

    if (chosenFo) {
      const input = chosenFo.querySelector('input, textarea');
      if (input) {
        input.value = 'FFP';
        input.style.border = `2px solid ${color}`;
        input.style.color = color;
      }
    }

    // draw a visible "FFP" label on the overlay near the center of the tooth
    const overlay = ensureOverlay(svg);
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    const fontSize = Math.max(10, Math.min(20, Math.floor(Math.min(bbox.width, bbox.height) * 0.18)));
    text.setAttribute('x', String(toothCenter.x));
    // nudge slightly downward so text is visually centered
    text.setAttribute('y', String(toothCenter.y + Math.max(3, fontSize / 3)));
    text.setAttribute('fill', color);
    text.setAttribute('font-size', String(fontSize));
    text.setAttribute('font-weight', '700');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('class', 'annotation ffp-label');
    text.setAttribute('data-id', `ffp-${toothDataName}-${Date.now()}`);
    text.textContent = 'FFP';
    overlay.appendChild(text);

    return true;
  } catch (err) {
    console.error('addFosasFisurasProfundas error', err);
    return false;
  }
}

/* ------------------------------------------------------------------
   NUEVO: addImplant
   - Escribe la sigla "IMP" (color especificado) en el input (foreignObject)
     y dibuja una etiqueta "IMP" del color sobre el diente en el overlay SVG.
   - Uso: addImplant('2.7', 'red') o addImplant('2.7', 'blue')
   ------------------------------------------------------------------ */
export function addImplant(toothDataName, color = 'red') {
  try {
    const svg = getSvg();
    if (!svg) return false;
    const info = getToothBBox(svg, toothDataName);
    if (!info) return false;
    const { bbox } = info;
    const toothCenter = { x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height / 2 };

    // Helper: compute foreignObject bounding box in SVG coords (best-effort)
    function foreignObjectBBoxInSvg(fo) {
      try {
        const foBox = fo.getBBox();
        const foCTM = fo.getCTM ? fo.getCTM() : null;
        if (foCTM) {
          const pt1 = svg.createSVGPoint(); pt1.x = foBox.x; pt1.y = foBox.y;
          const pt2 = svg.createSVGPoint(); pt2.x = foBox.x + foBox.width; pt2.y = foBox.y + foBox.height;
          const t1 = pt1.matrixTransform(foCTM);
          const t2 = pt2.matrixTransform(foCTM);
          const minX = Math.min(t1.x, t2.x);
          const minY = Math.min(t1.y, t2.y);
          const maxX = Math.max(t1.x, t2.x);
          const maxY = Math.max(t1.y, t2.y);
          return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
        }
      } catch (e) { /* fallback below */ }

      try {
        const rect = fo.getBoundingClientRect();
        const screenCTM = svg.getScreenCTM();
        if (!screenCTM) return null;
        const inv = screenCTM.inverse();
        const pTL = svg.createSVGPoint(); pTL.x = rect.left; pTL.y = rect.top;
        const pBR = svg.createSVGPoint(); pBR.x = rect.right; pBR.y = rect.bottom;
        const tTL = pTL.matrixTransform(inv);
        const tBR = pBR.matrixTransform(inv);
        const minX = Math.min(tTL.x, tBR.x);
        const minY = Math.min(tTL.y, tBR.y);
        const maxX = Math.max(tTL.x, tBR.x);
        const maxY = Math.max(tTL.y, tBR.y);
        return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
      } catch (err) {
        return null;
      }
    }

    function rectIntersectionArea(a, b) {
      const x1 = Math.max(a.x, b.x);
      const y1 = Math.max(a.y, b.y);
      const x2 = Math.min(a.x + a.width, b.x + b.width);
      const y2 = Math.min(a.y + a.height, b.y + b.height);
      if (x2 <= x1 || y2 <= y1) return 0;
      return (x2 - x1) * (y2 - y1);
    }

    // choose the best foreignObject to write into
    const fObjects = Array.from(svg.querySelectorAll('foreignObject'));
    let bestFo = null;
    let bestOverlap = -1;
    let bestByDist = null;
    let bestDist = Infinity;

    for (const fo of fObjects) {
      const foBox = foreignObjectBBoxInSvg(fo);
      if (!foBox) continue;
      const overlap = rectIntersectionArea(foBox, bbox);
      if (overlap > bestOverlap) {
        bestOverlap = overlap;
        bestFo = fo;
      }
      const foCenter = { x: foBox.x + foBox.width / 2, y: foBox.y + foBox.height / 2 };
      const dist = Math.hypot(foCenter.x - toothCenter.x, foCenter.y - toothCenter.y);
      if (dist < bestDist) { bestDist = dist; bestByDist = fo; }
    }

    const chosenFo = bestOverlap > 0 ? bestFo : (bestByDist || bestFo);

    if (chosenFo) {
      const input = chosenFo.querySelector('input, textarea');
      if (input) {
        input.value = 'IMP';
        input.style.border = `2px solid ${color}`;
        input.style.color = color;
      }
    }

    // draw a visible "IMP" label on the overlay near the center of the tooth
    const overlay = ensureOverlay(svg);
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    const fontSize = Math.max(10, Math.min(20, Math.floor(Math.min(bbox.width, bbox.height) * 0.18)));
    text.setAttribute('x', String(toothCenter.x));
    // nudge slightly downward so text is visually centered
    text.setAttribute('y', String(toothCenter.y + Math.max(3, fontSize / 3)));
    text.setAttribute('fill', color);
    text.setAttribute('font-size', String(fontSize));
    text.setAttribute('font-weight', '700');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('class', 'annotation implant-label');
    text.setAttribute('data-id', `imp-${toothDataName}-${Date.now()}`);
    text.textContent = 'IMP';
    overlay.appendChild(text);

    return true;
  } catch (err) {
    console.error('addImplant error', err);
    return false;
  }
}

/* ------------------------------------------------------------------
   NUEVO: Edentulous lines (líneas rectas para edéntulo superior/inferior)
   - addEdentulousLineBetween(startTooth, endTooth, color, strokeWidth)
   - dibuja línea recta entre centros de dos dientes y la agrega al overlay
   ------------------------------------------------------------------ */
export function addEdentulousLineBetween(startTooth, endTooth, color = 'black', strokeWidth = 3, options = {}) {
  try {
    const svg = getSvg();
    if (!svg) return false;

    const s = centerOfTooth(svg, startTooth);
    const e = centerOfTooth(svg, endTooth);
    if (!s || !e) {
      console.warn('addEdentulousLineBetween: no se pudo obtener centro de diente', startTooth, endTooth);
      return false;
    }

    const overlay = ensureOverlay(svg);

    // Presets automáticos basados en el par de dientes (funciona si llamas desde panel sin options)
    const pairKey = `${startTooth}->${endTooth}`;
    const autoPresets = {
      '1.8->2.8': { downward: 22, extraStart: 32, extraEnd: 32 },   // edéntulo superior (bajar la línea)
      '2.8->1.8': { downward: 15, extraStart: 15, extraEnd: 15 },
      '4.8->3.8': { downward: -22, extraStart: 32, extraEnd: 32 },  // edéntulo inferior (subir la línea)
      '3.8->4.8': { downward: -10, extraStart: 12, extraEnd: 12 },
    };

    // If a preset string was provided in options, map it to values
    const presetName = typeof options.preset === 'string' ? options.preset.toLowerCase() : null;
    let presetVals = {};
    if (presetName === 'superior') {
      presetVals = { downward: 10, extraStart: 10, extraEnd: 10 };
    } else if (presetName === 'inferior') {
      presetVals = { downward: -10, extraStart: 12, extraEnd: 12 };
    } else if (autoPresets[pairKey]) {
      presetVals = autoPresets[pairKey];
    }

    // Valores finales: options explicit override preset values; otherwise use preset or defaults
    const downward = typeof options.downward === 'number' ? options.downward
                     : (typeof presetVals.downward === 'number' ? presetVals.downward : 0);

    const extraStart = typeof options.extraStart === 'number' ? options.extraStart
                      : (typeof presetVals.extraStart === 'number' ? presetVals.extraStart : 0);

    const extraEnd = typeof options.extraEnd === 'number' ? options.extraEnd
                    : (typeof presetVals.extraEnd === 'number' ? presetVals.extraEnd : 0);

    // vector from start to end
    const vx = e.x - s.x;
    const vy = e.y - s.y;
    const len = Math.hypot(vx, vy) || 1;

    // unit vector along the line
    const ux = vx / len;
    const uy = vy / len;

    // perpendicular unit vector (rotated 90deg)
    const px = -uy;
    const py = ux;

    // compute extended & offset points
    const x1 = s.x - ux * extraStart + px * downward;
    const y1 = s.y - uy * extraStart + py * downward;
    const x2 = e.x + ux * extraEnd + px * downward;
    const y2 = e.y + uy * extraEnd + py * downward;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', String(x1));
    line.setAttribute('y1', String(y1));
    line.setAttribute('x2', String(x2));
    line.setAttribute('y2', String(y2));
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', String(strokeWidth));
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('class', 'annotation edentulous-line');
    line.setAttribute('data-id', `edentulous-${startTooth}-${endTooth}-${Date.now()}`);
    overlay.appendChild(line);

    // Devuelve información útil para debugging o manipulación posterior
    return {
      line,
      params: { startTooth, endTooth, color, strokeWidth, downward, extraStart, extraEnd, x1, y1, x2, y2 }
    };
  } catch (err) {
    console.error('addEdentulousLineBetween error', err);
    return null;
  }
}

// FUNCIÓN DE GERMINACIÓN — robusta y compatible con tu odontograma
export function addGerminacion(toothDataName, color = 'blue') {
  try {
    if (!toothDataName || typeof toothDataName !== 'string') {
      console.warn('addGerminacion: toothDataName inválido', toothDataName);
      return false;
    }
    const svg = getSvg();
    if (!svg) {
      console.warn('addGerminacion: no se encontró el SVG');
      return false;
    }
    const overlay = ensureOverlay(svg);
    if (!overlay) {
      console.warn('addGerminacion: no se pudo asegurar overlay');
      return false;
    }

    const offsetX = 8;
    const offsetY = -2;

    const name = toothDataName.trim();

    // 1) intentar encontrar el <text class="tooth-name"> con el contenido exacto
    const texts = Array.from(svg.querySelectorAll('text.tooth-name'));
    let textEl = texts.find(t => (t.textContent || '').trim() === name) || null;

    // 2) intentar encontrar el <g.tooth-group data-name="..."> (por si no hay <text>)
    const toothGroup = svg.querySelector(`g.tooth-group[data-name="${name}"]`);

    // función auxiliar: transformar un punto (x,y) del elemento a coordenadas del SVG
    const toSvgPoint = (el, x, y) => {
      const pt = svg.createSVGPoint();
      pt.x = Number(x);
      pt.y = Number(y);
      // si el elemento tiene transformaciones locales, getCTM() las incluye
      const ctm = el.getCTM ? el.getCTM() : null;
      if (ctm) {
        return pt.matrixTransform(ctm);
      }
      // fallback: devolver mismo punto
      return pt;
    };

    let centerSvgPoint = null;

    if (textEl) {
      // obtener x,y del atributo (pueden ser múltiples valores; usamos el primero)
      const xAttr = textEl.getAttribute('x');
      const yAttr = textEl.getAttribute('y');

      if (xAttr != null && yAttr != null) {
        // manejar casos "x" puede ser "365" o "365 370" -> tomar el primero
        const x = parseFloat(String(xAttr).trim().split(/\s+/)[0]);
        const y = parseFloat(String(yAttr).trim().split(/\s+/)[0]);
        centerSvgPoint = toSvgPoint(textEl, x, y);
      } else {
        // si no tiene atributos, usar su bbox centro (transformado)
        const bbox = textEl.getBBox();
        const cx = bbox.x + bbox.width / 2;
        const cy = bbox.y + bbox.height / 2;
        centerSvgPoint = toSvgPoint(textEl, cx, cy);
      }
    } else if (toothGroup) {
      // usar centro del bbox del grupo transformado
      const bbox = toothGroup.getBBox();
      const cx = bbox.x + bbox.width / 2;
      const cy = bbox.y + bbox.height / 2;
      centerSvgPoint = toSvgPoint(toothGroup, cx, cy);
    } else {
      console.warn(`addGerminacion: no se encontró text ni tooth-group para "${name}"`);
      return false;
    }

    if (!centerSvgPoint) {
      console.warn('addGerminacion: no se pudo calcular la posición global');
      return false;
    }

    // borrar germinación previa para este diente (evita duplicados)
    const existing = overlay.querySelectorAll(`[data-id^="germin-${name}-"]`);
    existing.forEach(e => e.remove());

    // Calcular radio: proporcional al tamaño del diente si existe bbox, sino valor por defecto
    let r = 20;
    try {
      if (toothGroup) {
        const tb = toothGroup.getBBox();
        const minSide = Math.min(tb.width, tb.height) || 20;
        // ajustar por el scale que aplica el grupo: intentamos inferir escala a partir de getCTM()
        const groupCTM = toothGroup.getCTM ? toothGroup.getCTM() : null;
        let scaleApprox = 1;
        if (groupCTM) {
          // aproximar escala por la magnitud de a (m11) y d (m22)
          scaleApprox = (Math.abs(groupCTM.a) + Math.abs(groupCTM.d)) / 2 || 1;
        }
        r = Math.max(5, Math.min(20, Math.floor((minSide * 0.20) * scaleApprox)));
      } else if (textEl) {
        const tb = textEl.getBBox();
        r = Math.max(5, Math.min(20, Math.floor(Math.max(tb.width, tb.height) * 0.9)));
      }
    } catch (e) {
      // ignore bbox problems, usar r por defecto
    }

    // crear círculo en coordenadas del SVG (overlay comparte el mismo sistema)
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', String(centerSvgPoint.x + offsetX));
    circle.setAttribute('cy', String(centerSvgPoint.y + offsetY));
    circle.setAttribute('r', String(r));

    // estilo del círculo (sin relleno, con borde)
    circle.setAttribute('fill', 'none');       // SIN FONDO
    circle.setAttribute('stroke', color);      // COLOR DEL BORDE (blue)
    circle.setAttribute('stroke-width', '2');  // GROSOR DEL BORDE
    circle.setAttribute('opacity', '1');       // OPACIDAD TOTAL

    circle.setAttribute('class', 'annotation germination-circle');
    circle.setAttribute('data-id', `germin-${name}-${Date.now()}`);
    circle.setAttribute('data-tooth', name);

    overlay.appendChild(circle);

    return true;
  } catch (err) {
    console.error('addGerminacion error', err);
    return false;
  }
}


// FUSIÓN ---------------------------------------------------

export function addFusion(toothName, color = 'blue') {
  try {
    if (!toothName || typeof toothName !== 'string') return false;

    const svg = getSvg();
    if (!svg) return false;

    const overlay = ensureOverlay(svg);
    if (!overlay) return false;

    const name = toothName.trim();

    // ============================================
    // 1) Determinar posibles vecinos (left / right)
    // ============================================
    const num = parseFloat(name);
    if (isNaN(num)) return false;

    const left  = (num - 0.1).toFixed(1);
    const right = (num + 0.1).toFixed(1);

    const exists = (n) =>
      svg.querySelector(`g.tooth-group[data-name="${n}"]`) ||
      Array.from(svg.querySelectorAll('text.tooth-name'))
        .find(t => (t.textContent || '').trim() === n);

    const validLeft  = exists(left);
    const validRight = exists(right);

    if (!validLeft && !validRight) {
      alert(`El diente ${name} no tiene dientes vecinos para fusionar.`);
      return false;
    }

    // ===============================================
    // 2) Verificar si esos dientes YA ESTÁN OCUPADOS
    // ===============================================

    const hasFusionCircle = (d) =>
      overlay.querySelector(`.fusion-circle[data-tooth="${d}"]`);

    const leftBusy  = validLeft  && hasFusionCircle(left);
    const rightBusy = validRight && hasFusionCircle(right);

    let neighbor = null;

    // SI SOLO UNO EXISTE → usamos ese
    if (validLeft && !validRight)      neighbor = left;
    else if (!validLeft && validRight) neighbor = right;

    // SI AMBOS EXISTEN
    else if (validLeft && validRight) {

      // ⚠️ SI UNO ESTÁ OCUPADO → usar el OTRO automáticamente
      if (leftBusy && !rightBusy) {
        neighbor = right;
      } else if (!leftBusy && rightBusy) {
        neighbor = left;
      } 
      
      // ⚠️ SI AMBOS ESTÁN OCUPADOS
      else if (leftBusy && rightBusy) {
        alert(`Los dientes ${left} y ${right} ya tienen círculos de fusión.`);
        return false;
      } 
      
      // ⚠️ SI NINGUNO ESTÁ OCUPADO → PREGUNTAR
      else {
        const choice = prompt(
          `El diente ${name} puede fusionar con:\n` +
          `1) ${left}\n` +
          `2) ${right}\n\n` +
          `Escribe el número del diente que deseas usar:`
        );

        if (!choice) return false;

        const normalized = choice.trim();
        if (normalized === left || normalized === right) {
          neighbor = normalized;
        } else {
          alert(`"${choice}" no es un diente válido.`);
          return false;
        }
      }
    }

    if (!neighbor) return false;

    const teethToMark = [name, neighbor];

    // ===============================================
    // 3) DIBUJAR CÍRCULOS PARA FUSIÓN (DOS EXACTAMENTE)
    // ===============================================

    for (const d of teethToMark) {

      // eliminar círculos viejos del MISMO diente
      const previous = overlay.querySelectorAll(`.fusion-circle[data-tooth="${d}"]`);
      previous.forEach(p => p.remove());

      const textEl = Array.from(svg.querySelectorAll('text.tooth-name'))
        .find(t => (t.textContent || '').trim() === d);

      const toothGroup = svg.querySelector(`g.tooth-group[data-name="${d}"]`);

      let cx = 0, cy = 0;

      if (textEl) {
        const x = parseFloat(textEl.getAttribute('x'));
        const y = parseFloat(textEl.getAttribute('y'));
        const pt = svg.createSVGPoint();
        pt.x = x;
        pt.y = y;
        const global = pt.matrixTransform(textEl.getCTM());
        cx = global.x;
        cy = global.y;
      } else if (toothGroup) {
        const bbox = toothGroup.getBBox();
        cx = bbox.x + bbox.width / 2;
        cy = bbox.y + bbox.height / 2;
      }

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
      circle.setAttribute('cx', cx);
      circle.setAttribute('cy', cy);
      circle.setAttribute('rx', '40');
      circle.setAttribute('ry', '15');
      circle.setAttribute('fill', 'none');
      circle.setAttribute('stroke', color);
      circle.setAttribute('stroke-width', '2');
      circle.setAttribute('class', 'annotation fusion-circle');
      circle.setAttribute('data-id', `fusion-${name}-${Date.now()}`);
      circle.setAttribute('data-tooth', d);

      overlay.appendChild(circle);
    }

    return true;

  } catch (err) {
    console.error('addFusion error', err);
    return false;
  }
}

// GIROVERSIÓN 

export function addGiroversion(toothDataName, direction = 'right', color = 'blue') {
  try {
    const svg = getSvg();
    if (!svg) return false;
    const info = getToothBBox(svg, toothDataName);
    if (!info) return false;
    const { bbox } = info;

    const overlay = ensureOverlay(svg);

    // Verificar si ya existe giroversión en este diente
    const exists = overlay.querySelector(`[data-id^="giro-${toothDataName.replace(/\W/g, '_')}"]`);
    if (exists) {
      alert(`Este diente (${toothDataName}) ya tiene un tratamiento de giroversión aplicado.`);
      return false;
    }

    // Centro en X y Y
    const cx = bbox.x + bbox.width / 2;
    let cy = bbox.y + bbox.height / 1.2; // posición por defecto abajo

    // -----------------------------
    // REGLA DE ARRIBA/ABAJO
    // -----------------------------
    const firstDigit = toothDataName.toString()[0];
    const arrowUp = ['8', '7', '4', '3'].includes(firstDigit);

    if (arrowUp) {
      cy = bbox.y + bbox.height * -0.3; // flecha arriba
    }
    // -----------------------------

    const yOffset = Math.max(8, Math.min(24, Math.floor(bbox.height * 0.6)));
    const y = cy + yOffset;

    const halfW = Math.max(10, Math.min(38, Math.floor(bbox.width * 0.5)));

    let xStart, xEnd;
    if (direction === 'left') {
      xStart = cx - halfW;
      xEnd = cx + halfW;
      const tmp = xStart; xStart = xEnd; xEnd = tmp;
    } else {
      xStart = cx - halfW;
      xEnd = cx + halfW;
    }

    const ctrlX = (xStart + xEnd) / 2;

    // -----------------------------
    // CURVA NORMAL vs CURVA INVERTIDA
    // -----------------------------
    const curveAmount = Math.max(12, Math.floor(bbox.height * 0.28));

    // si es diente 8,7,4,3 → curva invertida
    const ctrlY = arrowUp ? (y - curveAmount) : (y + curveAmount);
    // -----------------------------

    const idBase = `giro-${toothDataName.replace(/\W/g, '_')}-${Date.now()}`;

    // PATH
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const d = `M ${xStart} ${y} Q ${ctrlX} ${ctrlY} ${xEnd} ${y}`;
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', String(Math.max(2, Math.floor(bbox.height * 0.03))));
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('class', 'annotation giroversion-path');
    path.setAttribute('data-id', `${idBase}-path`);
    overlay.appendChild(path);

    // ARROW HEAD
    const dx = (xEnd - ctrlX);
    const dy = (y - ctrlY);
    const ang = Math.atan2(dy, dx);

    const size = Math.max(6, Math.min(14, Math.floor(Math.min(bbox.width, bbox.height) * 0.18)));
    const headLength = size * 1.5;
    const headWidth  = Math.max(10, Math.floor(size * 2));

    const tipX = xEnd;
    const tipY = y;

    const bx = tipX - headLength * Math.cos(ang);
    const by = tipY - headLength * Math.sin(ang);

    const px = -Math.sin(ang);
    const py = Math.cos(ang);

    const leftX = bx + (headWidth / 2) * px;
    const leftY = by + (headWidth / 2) * py;
    const rightX = bx - (headWidth / 2) * px;
    const rightY = by - (headWidth / 2) * py;

    const points = `${tipX},${tipY} ${leftX},${leftY} ${rightX},${rightY}`;

    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    poly.setAttribute('points', points);
    poly.setAttribute('fill', color);
    poly.setAttribute('opacity', '1');
    poly.setAttribute('class', 'annotation giroversion-head');
    poly.setAttribute('data-id', `${idBase}-head`);
    overlay.appendChild(poly);

    // DECOR
    const decorR = Math.max(1, Math.floor(size * 0.20));
    const decor = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    const decorX = ctrlX;
    const decorY = y + Math.max(2, Math.floor(size * 0.5));
    decor.setAttribute('cx', String(decorX));
    decor.setAttribute('cy', String(decorY));
    decor.setAttribute('r', String(decorR));
    decor.setAttribute('fill', 'transparent');
    decor.setAttribute('opacity', '0.9');
    decor.setAttribute('class', 'annotation giroversion-decor');
    decor.setAttribute('data-id', `${idBase}-decor`);
    overlay.appendChild(decor);

    return true;

  } catch (err) {
    console.error('addGiroversion error', err);
    return false;
  }
}


// LESION 


// Default export (compatibilidad)
export default {
  getSvg,
  ensureOverlay,
  getToothBBox,
  centerOfTooth,
  clearAnnotations,
  addCrown,
  startFixedOrthoMode,
  startRemovableOrthoMode,
  addRemovableOrtho,
  startCoronaMode,
  highlightToothBox,
  addDiastemaAtPoint,
  startDiastemaMode,
  addDefect,
  addEdentulousLineBetween,
  addImplant,
  addFosasFisurasProfundas,
  addGerminacion,
  addFusion,
  addGiroversion,
};