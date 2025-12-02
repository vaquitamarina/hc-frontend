// src/pages/hc/ExamenFisico/odonto.jsx
import React, { useEffect } from 'react';
import OdontogramaToolsPanel from './odotools';

/**
 * Página principal del odontograma: SVG (clase "odo") y panel de herramientas.
 * He sustituido todos los <use href=... /> por <use xlinkHref=... /> y añadido xmlnsXlink.
 */

export default function Odontograma() {
  useEffect(() => {
    // Intentamos cargar el script visorOdonto.js desde la raíz pública (si lo usas)
    const script = document.createElement('script');
    script.src = '/visorOdonto.js';
    script.async = false;
    document.body.appendChild(script);

    return () => {
      try {
        document.body.removeChild(script);
      } catch {
        /*ignore*/
      }
    };
  }, []);

  return (
    <div
      className="flex gap-4 p-4"
      style={{ minHeight: '80vh', background: '#f8fafc' }}
    >
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          background: 'white',
          padding: 12,
          borderRadius: 8,
        }}
      >
        <style>{`
          .letra {
            border: 1px solid #000;
            padding: 4px;
            border-radius: 4px;
          }
          .line {stroke-width: 2;}
          .thin { stroke-width: 1 !important; }
          .posnumber { font-size: 10px; fill: #333; }
          .tooth-name { font-size: 10px; fill: #111; pointer-events: none; }
          .part { cursor: pointer; stroke: black; fill: none; }
          .tooth-group:hover .highlight rect,
          .tooth-group:hover .highlight polygon,
          .tooth-group:hover .highlight path { stroke: #e33; stroke-width: 2.5; }
          input.letra { font-size:12px; }
        `}</style>

        {/* SVG completo */}
        <svg
          className="odo"
          width="1400"
          height="1000"
          viewBox="0 0 1400 1000"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          style={{
            background: 'white',
            fontFamily: 'Arial, sans-serif',
            display: 'block',
          }}
        >
          {/* ======= DEFINICIÓN DE LOS 8 DISEÑOS (design1..design8) ======= */}
          <defs>
            {/* DESIGN 1 */}
            <g id="design1">
              <polygon
                id="d1_part1"
                className="part line"
                points="50,100 80,100 80,70 50,30"
                data-name="corona-izq"
              />
              <polygon
                id="d1_part2"
                className="part line"
                points="80,70 100,30 120,70 120,100 80,100"
                data-name="corona-centro"
              />
              <polygon
                id="d1_part3"
                className="part line"
                points="150,100 120,100 120,70 150,30"
                data-name="corona-der"
              />
              <polygon
                id="d1_part4"
                className="part line"
                points="50,200 78,170 78,130 50,100"
                data-name="raiz-izq"
              />
              <polygon
                id="d1_part5"
                className="part line"
                points="150,200 120,170 120,130 150,100"
                data-name="raiz-der"
              />
              <polygon
                id="d1_part6"
                className="part line"
                points="150,200 120,170 80,170 50,200"
                data-name="base"
              />
              <polygon
                id="d1_part7"
                className="part line"
                points="50,100 80,130 120,130 150,100"
                data-name="cingulo"
              />
              <rect
                id="d1_part8"
                className="part thin"
                x="78"
                y="130"
                width="14"
                height="20"
                data-name="fosa1"
              />
              <rect
                id="d1_part9"
                className="part thin"
                x="93"
                y="130"
                width="12"
                height="20"
                data-name="fosa2"
              />
              <rect
                id="d1_part10"
                className="part thin"
                x="106"
                y="130"
                width="13"
                height="20"
                data-name="fosa3"
              />
              <rect
                id="d1_part11"
                className="part thin"
                x="78"
                y="150"
                width="14"
                height="20"
                data-name="surco1"
              />
              <rect
                id="d1_part12"
                className="part thin"
                x="93"
                y="150"
                width="12"
                height="20"
                data-name="surco2"
              />
              <rect
                id="d1_part13"
                className="part thin"
                x="106"
                y="150"
                width="13"
                height="20"
                data-name="surco3"
              />
              <title>Design 1 (13 partes)</title>
            </g>

            {/* DESIGN 2 */}
            <g id="design2">
              <g transform="rotate(180,100,100)">
                <polygon
                  id="d2_part1"
                  className="part line"
                  points="50,70 75,30 100,70 100,100 50,100"
                  data-name="corona-izq"
                />
                <polygon
                  id="d2_part2"
                  className="part line"
                  points="100,70 120,30 150,70 150,100 100,100"
                  data-name="corona-der"
                />
                <polygon
                  id="d2_part3"
                  className="part line"
                  points="50,200 78,170 78,130 50,100"
                  data-name="raiz-izq"
                />
                <polygon
                  id="d2_part4"
                  className="part line"
                  points="150,200 120,170 120,130 150,100"
                  data-name="raiz-der"
                />
                <polygon
                  id="d2_part5"
                  className="part line"
                  points="150,200 120,170 80,170 50,200"
                  data-name="base"
                />
                <polygon
                  id="d2_part6"
                  className="part line"
                  points="50,100 80,130 120,130 150,100"
                  data-name="cingulo"
                />
                <rect
                  id="d2_part7"
                  className="part thin"
                  x="78"
                  y="130"
                  width="14"
                  height="20"
                  data-name="fosa1"
                />
                <rect
                  id="d2_part8"
                  className="part thin"
                  x="93"
                  y="130"
                  width="12"
                  height="20"
                  data-name="fosa2"
                />
                <rect
                  id="d2_part9"
                  className="part thin"
                  x="106"
                  y="130"
                  width="13"
                  height="20"
                  data-name="fosa3"
                />
                <rect
                  id="d2_part10"
                  className="part thin"
                  x="78"
                  y="150"
                  width="14"
                  height="20"
                  data-name="surco1"
                />
                <rect
                  id="d2_part11"
                  className="part thin"
                  x="93"
                  y="150"
                  width="12"
                  height="20"
                  data-name="surco2"
                />
                <rect
                  id="d2_part12"
                  className="part thin"
                  x="106"
                  y="150"
                  width="13"
                  height="20"
                  data-name="surco3"
                />
                <title>Design 2 (12 partes) - girado</title>
              </g>
            </g>

            {/* DESIGN 3 */}
            <g id="design3">
              <polygon
                id="d3_part1"
                className="part line"
                points="100,30 70,100 130,100"
                data-name="corona-tri"
              />
              <polygon
                id="d3_part2"
                className="part line"
                points="50,200 78,170 78,130 50,100"
                data-name="raiz-izq"
              />
              <polygon
                id="d3_part3"
                className="part line"
                points="150,200 120,170 120,130 150,100"
                data-name="raiz-der"
              />
              <polygon
                id="d3_part4"
                className="part line"
                points="150,200 120,170 80,170 50,200"
                data-name="base"
              />
              <polygon
                id="d3_part5"
                className="part line"
                points="50,100 80,130 120,130 150,100"
                data-name="cingulo"
              />
              <rect
                id="d3_part6"
                className="part thin"
                x="78"
                y="130"
                width="42"
                height="20"
                data-name="fosas"
              />
              <rect
                id="d3_part7"
                className="part thin"
                x="78"
                y="150"
                width="42"
                height="20"
                data-name="surcos"
              />
              <title>Design 3 (7 partes)</title>
            </g>

            {/* DESIGN 4 */}
            <g id="design4">
              <g transform="rotate(180,100,120)">
                <polygon
                  id="d4_part1"
                  className="part line"
                  points="100,30 70,100 130,100"
                  data-name="corona-tri"
                />
                <polygon
                  id="d4_part2"
                  className="part line"
                  points="50,200 78,170 78,130 50,100"
                  data-name="raiz-izq"
                />
                <polygon
                  id="d4_part3"
                  className="part line"
                  points="150,200 120,170 120,130 150,100"
                  data-name="raiz-der"
                />
                <polygon
                  id="d4_part4"
                  className="part line"
                  points="150,200 120,170 80,170 50,200"
                  data-name="base"
                />
                <polygon
                  id="d4_part5"
                  className="part line"
                  points="50,100 80,130 120,130 150,100"
                  data-name="cingulo"
                />
                <rect
                  id="d4_part6"
                  className="part thin"
                  x="78"
                  y="130"
                  width="42"
                  height="20"
                  data-name="fosas"
                />
                <rect
                  id="d4_part7"
                  className="part thin"
                  x="78"
                  y="150"
                  width="42"
                  height="20"
                  data-name="surcos"
                />
                <title>Design 4 (7 partes) - girado</title>
              </g>
            </g>

            {/* DESIGN 5 */}
            <g id="design5">
              <polygon
                id="d5_part1"
                className="part line"
                points="80,30 60,100 100,100"
                data-name="corona-l1"
              />
              <polygon
                id="d5_part2"
                className="part line"
                points="120,30 100,100 140,100"
                data-name="corona-l2"
              />
              <polygon
                id="d5_part3"
                className="part line"
                points="50,200 78,170 78,130 50,100"
                data-name="raiz-izq"
              />
              <polygon
                id="d5_part4"
                className="part line"
                points="150,200 120,170 120,130 150,100"
                data-name="raiz-der"
              />
              <polygon
                id="d5_part5"
                className="part line"
                points="150,200 120,170 80,170 50,200"
                data-name="base"
              />
              <polygon
                id="d5_part6"
                className="part line"
                points="50,100 80,130 120,130 150,100"
                data-name="cingulo"
              />
              <title>Design 5 (1.4)</title>
            </g>

            {/* DESIGN 6 */}
            <g id="design6">
              <polygon
                id="d6_part1"
                className="part line"
                points="80,30 60,100 100,100"
                data-name="corona-l1"
              />
              <polygon
                id="d6_part2"
                className="part line"
                points="120,30 100,100 140,100"
                data-name="corona-l2"
              />
              <polygon
                id="d6_part3"
                className="part line"
                points="50,200 78,170 78,130 50,100"
                data-name="raiz-izq"
              />
              <polygon
                id="d6_part4"
                className="part line"
                points="150,200 120,170 120,130 150,100"
                data-name="raiz-der"
              />
              <polygon
                id="d6_part5"
                className="part line"
                points="150,200 120,170 80,170 50,200"
                data-name="base"
              />
              <polygon
                id="d6_part6"
                className="part line"
                points="50,100 80,130 120,130 150,100"
                data-name="cingulo"
              />
              <rect
                id="d6_part7"
                className="part thin"
                x="78"
                y="130"
                width="42"
                height="20"
                data-name="fosas"
              />
              <rect
                id="d6_part8"
                className="part thin"
                x="78"
                y="150"
                width="42"
                height="20"
                data-name="surcos"
              />
              <title>Design 6 (8 partes)</title>
            </g>

            {/* DESIGN 7 */}
            <g id="design7">
              <polygon
                id="d7_part1"
                className="part line"
                points="100,30 50,100 150,100"
                data-name="corona"
              />
              <polygon
                id="d7_part2"
                className="part line"
                points="50,100 80,150 120,150 150,100"
                data-name="paredes"
              />
              <polygon
                id="d7_part3"
                className="part line"
                points="150,200 120,150 80,150 50,200"
                data-name="base"
              />
              <polygon
                id="d7_part4"
                className="part line"
                points="50,100 50,200 80,150"
                data-name="lado-izq"
              />
              <polygon
                id="d7_part5"
                className="part line"
                points="150,100 150,200 120,150"
                data-name="lado-der"
              />
              <title>Design 7 (5 partes)</title>
            </g>

            {/* DESIGN 8 */}
            <g id="design8">
              <g transform="rotate(180,100,120)">
                <polygon
                  id="d8_part1"
                  className="part line"
                  points="100,30 50,100 150,100"
                  data-name="corona"
                />
                <polygon
                  id="d8_part2"
                  className="part line"
                  points="50,100 80,150 120,150 150,100"
                  data-name="paredes"
                />
                <polygon
                  id="d8_part3"
                  className="part line"
                  points="150,200 120,150 80,150 50,200"
                  data-name="base"
                />
                <polygon
                  id="d8_part4"
                  className="part line"
                  points="50,100 50,200 80,150"
                  data-name="lado-izq"
                />
                <polygon
                  id="d8_part5"
                  className="part line"
                  points="150,100 150,200 120,150"
                  data-name="lado-der"
                />
                <title>Design 8 (5 partes) - girado</title>
              </g>
            </g>
          </defs>

          {/* FILAS (1..52) */}
          {/* ----------------- FILA 1 (1..16) ----------------- */}
          <g id="fila1" transform="translate(20,60)">
            <g
              id="tooth_1_8"
              className="tooth-group"
              data-name="1.8"
              transform="translate(0,0) scale(0.6)"
            >
              <use xlinkHref="#design1" />
            </g>
            <text x="55" y="-2" className="tooth-name">
              1.8
            </text>
            <foreignObject x="25" y="-45" width="68" height="30" id="input1">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_1_7"
              className="tooth-group"
              data-name="1.7"
              transform="translate(80,0) scale(0.6)"
            >
              <use xlinkHref="#design1" />
            </g>
            <text x="135" y="-2" className="tooth-name">
              1.7
            </text>
            <foreignObject x="105" y="-45" width="68" height="30" id="input2">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_1_6"
              className="tooth-group"
              data-name="1.6"
              transform="translate(160,0) scale(0.6)"
            >
              <use xlinkHref="#design1" />
            </g>
            <text x="215" y="-2" className="tooth-name">
              1.6
            </text>
            <foreignObject x="185" y="-45" width="68" height="30" id="input3">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_1_5"
              className="tooth-group"
              data-name="1.5"
              transform="translate(240,0) scale(0.6)"
            >
              <use xlinkHref="#design3" />
            </g>
            <text x="295" y="-2" className="tooth-name">
              1.5
            </text>
            <foreignObject x="265" y="-45" width="68" height="30" id="input4">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_1_4"
              className="tooth-group"
              data-name="1.4"
              transform="translate(320,0) scale(0.6)"
            >
              <use xlinkHref="#design5" />
            </g>
            <text x="375" y="-2" className="tooth-name">
              1.4
            </text>
            <foreignObject x="345" y="-45" width="68" height="30" id="input5">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_1_3"
              className="tooth-group"
              data-name="1.3"
              transform="translate(400,0) scale(0.6)"
            >
              <use xlinkHref="#design7" />
            </g>
            <text x="455" y="-2" className="tooth-name">
              1.3
            </text>
            <foreignObject x="430" y="-45" width="60" height="30" id="input6">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_1_2"
              className="tooth-group"
              data-name="1.2"
              transform="translate(480,0) scale(0.6)"
            >
              <use xlinkHref="#design7" />
            </g>
            <text x="530" y="-2" className="tooth-name">
              1.2
            </text>
            <foreignObject x="506" y="-45" width="60" height="30" id="input7">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_1_1"
              className="tooth-group"
              data-name="1.1"
              transform="translate(560,0) scale(0.6)"
            >
              <use xlinkHref="#design7" />
            </g>
            <text x="603" y="-2" className="tooth-name">
              1.1
            </text>
            <foreignObject x="583" y="-45" width="60" height="30" id="input8">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_2_1"
              className="tooth-group"
              data-name="2.1"
              transform="translate(640,0) scale(0.6)"
            >
              <use xlinkHref="#design7" />
            </g>
            <text x="685" y="-2" className="tooth-name">
              2.1
            </text>
            <foreignObject x="660" y="-45" width="60" height="30" id="input9">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_2_2"
              className="tooth-group"
              data-name="2.2"
              transform="translate(720,0) scale(0.6)"
            >
              <use xlinkHref="#design7" />
            </g>
            <text x="765" y="-3" className="tooth-name">
              2.2
            </text>
            <foreignObject x="740" y="-45" width="60" height="30" id="input10">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_2_3"
              className="tooth-group"
              data-name="2.3"
              transform="translate(800,0) scale(0.6)"
            >
              <use xlinkHref="#design7" />
            </g>
            <text x="845" y="-3" className="tooth-name">
              2.3
            </text>
            <foreignObject x="820" y="-45" width="60" height="30" id="input11">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_2_4"
              className="tooth-group"
              data-name="2.4"
              transform="translate(880,0) scale(0.6)"
            >
              <use xlinkHref="#design6" />
            </g>
            <text x="930" y="-3" className="tooth-name">
              2.4
            </text>
            <foreignObject x="900" y="-45" width="68" height="30" id="input12">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_2_5"
              className="tooth-group"
              data-name="2.5"
              transform="translate(960,0) scale(0.6)"
            >
              <use xlinkHref="#design3" />
            </g>
            <text x="1015" y="-3" className="tooth-name">
              2.5
            </text>
            <foreignObject x="985" y="-45" width="68" height="30" id="input13">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_2_6"
              className="tooth-group"
              data-name="2.6"
              transform="translate(1040,0) scale(0.6)"
            >
              <use xlinkHref="#design1" />
            </g>
            <text x="1090" y="-3" className="tooth-name">
              2.6
            </text>
            <foreignObject x="1060" y="-45" width="68" height="30" id="input14">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_2_7"
              className="tooth-group"
              data-name="2.7"
              transform="translate(1120,0) scale(0.6)"
            >
              <use xlinkHref="#design1" />
            </g>
            <text x="1175" y="-3" className="tooth-name">
              2.7
            </text>
            <foreignObject x="1145" y="-45" width="68" height="30" id="input15">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_2_8"
              className="tooth-group"
              data-name="2.8"
              transform="translate(1200,0) scale(0.6)"
            >
              <use xlinkHref="#design1" />
            </g>
            <text x="1250" y="-3" className="tooth-name">
              2.8
            </text>
            <foreignObject x="1220" y="-45" width="68" height="30" id="input16">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>
          </g>

          {/* FILA 2 (17..26) */}
          <g id="fila2" transform="translate(261,270)">
            <g
              id="tooth_5_1"
              className="tooth-group"
              data-name="5.5"
              transform="translate(0,0) scale(0.6)"
            >
              <use xlinkHref="#design1" />
            </g>
            <text x="55" y="1" className="tooth-name">
              5.5
            </text>
            <foreignObject x="20" y="-45" width="68" height="30" id="input17">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_5_2"
              className="tooth-group"
              data-name="5.4"
              transform="translate(80,0) scale(0.6)"
            >
              <use xlinkHref="#design1" />
            </g>
            <text x="135" y="1" className="tooth-name">
              5.4
            </text>
            <foreignObject x="100" y="-45" width="68" height="30" id="input18">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_5_3"
              className="tooth-group"
              data-name="5.3"
              transform="translate(160,0) scale(0.6)"
            >
              <use xlinkHref="#design7" />
            </g>
            <text x="210" y="1" className="tooth-name">
              5.3
            </text>
            <foreignObject x="180" y="-45" width="60" height="30" id="input19">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_5_4"
              className="tooth-group"
              data-name="5.2"
              transform="translate(240,0) scale(0.6)"
            >
              <use xlinkHref="#design7" />
            </g>
            <text x="285" y="1" className="tooth-name">
              5.2
            </text>
            <foreignObject x="255" y="-45" width="60" height="30" id="input20">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_5_5"
              className="tooth-group"
              data-name="5.1"
              transform="translate(320,0) scale(0.6)"
            >
              <use xlinkHref="#design7" />
            </g>
            <text x="365" y="1" className="tooth-name">
              5.1
            </text>
            <foreignObject x="335" y="-45" width="60" height="30" id="input21">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_6_1"
              className="tooth-group"
              data-name="6.1"
              transform="translate(400,0) scale(0.6)"
            >
              <use xlinkHref="#design7" />
            </g>
            <text x="445" y="1" className="tooth-name">
              6.1
            </text>
            <foreignObject x="415" y="-45" width="60" height="30" id="input22">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_6_2"
              className="tooth-group"
              data-name="6.2"
              transform="translate(480,0) scale(0.6)"
            >
              <use xlinkHref="#design7" />
            </g>
            <text x="525" y="1" className="tooth-name">
              6.2
            </text>
            <foreignObject x="495" y="-45" width="60" height="30" id="input23">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_6_3"
              className="tooth-group"
              data-name="6.3"
              transform="translate(560,0) scale(0.6)"
            >
              <use xlinkHref="#design7" />
            </g>
            <text x="605" y="1" className="tooth-name">
              6.3
            </text>
            <foreignObject x="575" y="-45" width="60" height="30" id="input24">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_6_4"
              className="tooth-group"
              data-name="6.4"
              transform="translate(640,0) scale(0.6)"
            >
              <use xlinkHref="#design1" />
            </g>
            <text x="700" y="1" className="tooth-name">
              6.4
            </text>
            <foreignObject x="670" y="-45" width="68" height="30" id="input25">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_6_5"
              className="tooth-group"
              data-name="6.5"
              transform="translate(720,0) scale(0.6)"
            >
              <use xlinkHref="#design1" />
            </g>
            <text x="780" y="1" className="tooth-name">
              6.5
            </text>
            <foreignObject x="750" y="-45" width="68" height="30" id="input26">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>
          </g>

          {/* FILA 3 (27..36) */}
          <g id="fila3" transform="translate(261,520)">
            <g
              id="tooth_8_5"
              className="tooth-group"
              data-name="8.5"
              transform="translate(0,-70) scale(0.6)"
            >
              <use xlinkHref="#design2" />
            </g>
            <text x="55" y="63" className="tooth-name">
              8.5
            </text>
            <foreignObject x="25" y="70" width="68" height="30" id="input27">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_8_4"
              className="tooth-group"
              data-name="8.4"
              transform="translate(80,-70) scale(0.6)"
            >
              <use xlinkHref="#design2" />
            </g>
            <text x="140" y="63" className="tooth-name">
              8.4
            </text>
            <foreignObject x="105" y="70" width="68" height="30" id="input28">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_8_3"
              className="tooth-group"
              data-name="8.3"
              transform="translate(160,-95) scale(0.6)"
            >
              <use xlinkHref="#design8" />
            </g>
            <text x="205" y="63" className="tooth-name">
              8.3
            </text>
            <foreignObject x="185" y="70" width="55" height="30" id="input29">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_8_2"
              className="tooth-group"
              data-name="8.2"
              transform="translate(240,-95) scale(0.6)"
            >
              <use xlinkHref="#design8" />
            </g>
            <text x="285" y="63" className="tooth-name">
              8.2
            </text>
            <foreignObject x="260" y="70" width="60" height="30" id="input30">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_8_1"
              className="tooth-group"
              data-name="8.1"
              transform="translate(320,-95) scale(0.6)"
            >
              <use xlinkHref="#design8" />
            </g>
            <text x="365" y="63" className="tooth-name">
              8.1
            </text>
            <foreignObject x="340" y="70" width="60" height="30" id="input31">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_7_1"
              className="tooth-group"
              data-name="7.1"
              transform="translate(400,-95) scale(0.6)"
            >
              <use xlinkHref="#design8" />
            </g>
            <text x="440" y="63" className="tooth-name">
              7.1
            </text>
            <foreignObject x="420" y="70" width="65" height="30" id="input32">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_7_2"
              className="tooth-group"
              data-name="7.2"
              transform="translate(480,-95) scale(0.6)"
            >
              <use xlinkHref="#design8" />
            </g>
            <text x="525" y="63" className="tooth-name">
              7.2
            </text>
            <foreignObject x="500" y="70" width="60" height="30" id="input33">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_7_3"
              className="tooth-group"
              data-name="7.3"
              transform="translate(560,-95) scale(0.6)"
            >
              <use xlinkHref="#design8" />
            </g>
            <text x="605" y="63" className="tooth-name">
              7.3
            </text>
            <foreignObject x="575" y="70" width="65" height="30" id="input34">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_7_4"
              className="tooth-group"
              data-name="7.4"
              transform="translate(640,-70) scale(0.6)"
            >
              <use xlinkHref="#design2" />
            </g>
            <text x="700" y="63" className="tooth-name">
              7.4
            </text>
            <foreignObject x="665" y="70" width="68" height="30" id="input35">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_7_5"
              className="tooth-group"
              data-name="7.5"
              transform="translate(720,-70) scale(0.6)"
            >
              <use xlinkHref="#design2" />
            </g>
            <text x="780" y="63" className="tooth-name">
              7.5
            </text>
            <foreignObject x="750" y="70" width="68" height="30" id="input36">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>
          </g>

          {/* FILA 4 (37..52) */}
          <g id="fila4" transform="translate(20,745)">
            <g
              id="tooth_4_8"
              className="tooth-group"
              data-name="4.8"
              transform="translate(0,-80) scale(0.6)"
            >
              <use xlinkHref="#design2" />
            </g>
            <text x="55" y="50" className="tooth-name">
              4.8
            </text>
            <foreignObject x="30" y="60" width="60" height="30" id="input37">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_4_7"
              className="tooth-group"
              data-name="4.7"
              transform="translate(80,-80) scale(0.6)"
            >
              <use xlinkHref="#design2" />
            </g>
            <text x="135" y="50" className="tooth-name">
              4.7
            </text>
            <foreignObject x="110" y="60" width="60" height="30" id="input38">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_4_6"
              className="tooth-group"
              data-name="4.6"
              transform="translate(160,-80) scale(0.6)"
            >
              <use xlinkHref="#design2" />
            </g>
            <text x="215" y="50" className="tooth-name">
              4.6
            </text>
            <foreignObject x="190" y="60" width="60" height="30" id="input39">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_4_5"
              className="tooth-group"
              data-name="4.5"
              transform="translate(240,-105) scale(0.6)"
            >
              <use xlinkHref="#design4" />
            </g>
            <text x="290" y="50" className="tooth-name">
              4.5
            </text>
            <foreignObject x="265" y="60" width="60" height="30" id="input40">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_4_4"
              className="tooth-group"
              data-name="4.4"
              transform="translate(320,-105) scale(0.6)"
            >
              <use xlinkHref="#design4" />
            </g>
            <text x="375" y="50" className="tooth-name">
              4.4
            </text>
            <foreignObject x="350" y="60" width="60" height="30" id="input41">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_4_3"
              className="tooth-group"
              data-name="4.3"
              transform="translate(400,-105) scale(0.6)"
            >
              <use xlinkHref="#design8" />
            </g>
            <text x="445" y="50" className="tooth-name">
              4.3
            </text>
            <foreignObject x="430" y="60" width="60" height="30" id="input42">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_4_2"
              className="tooth-group"
              data-name="4.2"
              transform="translate(480,-105) scale(0.6)"
            >
              <use xlinkHref="#design8" />
            </g>
            <text x="525" y="50" className="tooth-name">
              4.2
            </text>
            <foreignObject x="505" y="60" width="60" height="30" id="input43">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_4_1"
              className="tooth-group"
              data-name="4.1"
              transform="translate(560,-105) scale(0.6)"
            >
              <use xlinkHref="#design8" />
            </g>
            <text x="605" y="50" className="tooth-name">
              4.1
            </text>
            <foreignObject x="580" y="60" width="60" height="30" id="input44">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_3_1"
              className="tooth-group"
              data-name="3.1"
              transform="translate(640,-105) scale(0.6)"
            >
              <use xlinkHref="#design8" />
            </g>
            <text x="685" y="50" className="tooth-name">
              3.1
            </text>
            <foreignObject x="662" y="60" width="55" height="30" id="input45">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_3_2"
              className="tooth-group"
              data-name="3.2"
              transform="translate(720,-105) scale(0.6)"
            >
              <use xlinkHref="#design8" />
            </g>
            <text x="765" y="50" className="tooth-name">
              3.2
            </text>
            <foreignObject x="740" y="60" width="60" height="30" id="input46">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_3_3"
              className="tooth-group"
              data-name="3.3"
              transform="translate(800,-105) scale(0.6)"
            >
              <use xlinkHref="#design8" />
            </g>
            <text x="845" y="50" className="tooth-name">
              3.3
            </text>
            <foreignObject x="820" y="60" width="60" height="30" id="input47">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_3_4"
              className="tooth-group"
              data-name="3.4"
              transform="translate(880,-105) scale(0.6)"
            >
              <use xlinkHref="#design4" />
            </g>
            <text x="935" y="50" className="tooth-name">
              3.4
            </text>
            <foreignObject x="910" y="60" width="60" height="30" id="input48">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_3_5"
              className="tooth-group"
              data-name="3.5"
              transform="translate(960,-105) scale(0.6)"
            >
              <use xlinkHref="#design4" />
            </g>
            <text x="1010" y="50" className="tooth-name">
              3.5
            </text>
            <foreignObject x="990" y="60" width="60" height="30" id="input49">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_3_6"
              className="tooth-group"
              data-name="3.6"
              transform="translate(1040,-80) scale(0.6)"
            >
              <use xlinkHref="#design2" />
            </g>
            <text x="1095" y="50" className="tooth-name">
              3.6
            </text>
            <foreignObject x="1070" y="60" width="60" height="30" id="input50">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_3_7"
              className="tooth-group"
              data-name="3.7"
              transform="translate(1120,-80) scale(0.6)"
            >
              <use xlinkHref="#design2" />
            </g>
            <text x="1175" y="50" className="tooth-name">
              3.7
            </text>
            <foreignObject x="1150" y="60" width="60" height="30" id="input51">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>

            <g
              id="tooth_3_8"
              className="tooth-group"
              data-name="3.8"
              transform="translate(1200,-80) scale(0.6)"
            >
              <use xlinkHref="#design2" />
            </g>
            <text x="1255" y="50" className="tooth-name">
              3.8
            </text>
            <foreignObject x="1230" y="60" width="65" height="30" id="input52">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <input type="text" className="letra" />
              </div>
            </foreignObject>
          </g>
        </svg>
      </div>

      <div style={{ width: 360 }}>
        <OdontogramaToolsPanel />
      </div>
    </div>
  );
}
