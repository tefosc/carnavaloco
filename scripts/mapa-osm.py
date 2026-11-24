# -*- coding: utf-8 -*-
"""Convierte los recuadros de OpenStreetMap en trazos SVG para el mapa del carnaval.

1. Descarga los seis recuadros (oeste,sur,este,norte) a una carpeta, como t1.osm … t6.osm:
     https://api.openstreetmap.org/api/0.6/map?bbox=-78.540,-7.185,-78.515,-7.160
     https://api.openstreetmap.org/api/0.6/map?bbox=-78.540,-7.160,-78.515,-7.135
     https://api.openstreetmap.org/api/0.6/map?bbox=-78.515,-7.185,-78.490,-7.160
     https://api.openstreetmap.org/api/0.6/map?bbox=-78.515,-7.160,-78.490,-7.135
     https://api.openstreetmap.org/api/0.6/map?bbox=-78.490,-7.185,-78.4725,-7.135
     https://api.openstreetmap.org/api/0.6/map?bbox=-78.4725,-7.185,-78.455,-7.135
2. python scripts/mapa-osm.py <carpeta> src/data/mapa.json

Datos © colaboradores de OpenStreetMap (ODbL).
"""
import glob
import json
import math
import os
import sys
import xml.etree.ElementTree as ET

LON0, LON1 = -78.540, -78.455
LAT0, LAT1 = -7.135, -7.185  # norte, sur
COS = math.cos(math.radians(7.16))
ANCHO = 1200
ESCALA = ANCHO / ((LON1 - LON0) * COS)
ALTO = round((LAT0 - LAT1) * ESCALA)

MAYORES = {'trunk', 'trunk_link', 'primary', 'primary_link', 'secondary', 'secondary_link', 'tertiary', 'tertiary_link'}
MENORES = {'residential', 'unclassified', 'living_street', 'pedestrian'}


def proyectar(lat, lon):
    return ((lon - LON0) * COS * ESCALA, (LAT0 - lat) * ESCALA)


def rdp(puntos, eps):
    """Simplificación Ramer–Douglas–Peucker."""
    if len(puntos) < 3:
        return puntos
    (x1, y1), (x2, y2) = puntos[0], puntos[-1]
    dx, dy = x2 - x1, y2 - y1
    largo = math.hypot(dx, dy)
    peor, indice = 0.0, 0
    for i in range(1, len(puntos) - 1):
        x0, y0 = puntos[i]
        if largo < 1e-6:
            # Línea cerrada (empieza y termina en el mismo punto): distancia directa
            d = math.hypot(x0 - x1, y0 - y1)
        else:
            d = abs(dy * x0 - dx * y0 + x2 * y1 - y2 * x1) / largo
        if d > peor:
            peor, indice = d, i
    if peor > eps:
        return rdp(puntos[: indice + 1], eps)[:-1] + rdp(puntos[indice:], eps)
    return [puntos[0], puntos[-1]]


def trazo_simple(lineas, eps=0.6):
    partes = []
    for linea in lineas:
        simple = rdp(linea, eps)
        if len(simple) < 2:
            continue
        cab = f'M{simple[0][0]:.1f} {simple[0][1]:.1f}'
        resto = ' '.join(f'{x:.1f} {y:.1f}' for x, y in simple[1:])
        partes.append(f'{cab}L{resto}')
    return ''.join(partes)


def encadenar(segmentos):
    """Une tramos que comparten extremos en líneas continuas."""
    segs = [list(s) for s in segmentos]
    cadenas = []
    while segs:
        cadena = segs.pop(0)
        cambio = True
        while cambio:
            cambio = False
            for i, s in enumerate(segs):
                if s[0] == cadena[-1]:
                    cadena += s[1:]
                elif s[-1] == cadena[-1]:
                    cadena += list(reversed(s))[1:]
                elif s[-1] == cadena[0]:
                    cadena = s[:-1] + cadena
                elif s[0] == cadena[0]:
                    cadena = list(reversed(s))[:-1] + cadena
                else:
                    continue
                segs.pop(i)
                cambio = True
                break
        cadenas.append(cadena)
    return cadenas


def main():
    carpeta, salida = sys.argv[1], sys.argv[2]
    nodos, vias = {}, {}
    for archivo in sorted(glob.glob(os.path.join(carpeta, 't*.osm'))):
        raiz = ET.parse(archivo).getroot()
        for n in raiz.iter('node'):
            nodos[n.get('id')] = (float(n.get('lat')), float(n.get('lon')), {t.get('k'): t.get('v') for t in n.iter('tag')})
        for w in raiz.iter('way'):
            etiquetas = {t.get('k'): t.get('v') for t in w.iter('tag')}
            vias[w.get('id')] = (etiquetas, [nd.get('ref') for nd in w.iter('nd')])

    def coords(refs):
        return [proyectar(nodos[r][0], nodos[r][1]) for r in refs if r in nodos]

    def ids(refs):
        return [r for r in refs if r in nodos]

    menores, mayores, rios, plaza = [], [], [], []
    tramos = {'ingreso': [], 'corso': [], 'entierro': []}
    for etiquetas, refs in vias.values():
        hw = etiquetas.get('highway')
        nombre = etiquetas.get('name', '')
        if hw in MAYORES:
            mayores.append(coords(refs))
        elif hw in MENORES:
            menores.append(coords(refs))
        if etiquetas.get('waterway') in ('river', 'stream'):
            rios.append(coords(refs))
        if etiquetas.get('leisure') == 'park' and nombre == 'Plaza de Armas':
            plaza.append(coords(refs))
        if hw:
            if nombre == 'Avenida Independencia':
                tramos['ingreso'].append(ids(refs))
            elif 'Evitamiento' in nombre:
                tramos['corso'].append(ids(refs))
            elif hw == 'primary' and (
                etiquetas.get('ref') == 'PE-08B' or nombre in ('Avenida Atahualpa', 'Avenida Manco Capac')
            ):
                # La carretera a Baños del Inca: Av. Atahualpa, tramo sin nombre y Av. Manco Cápac
                tramos['entierro'].append(ids(refs))

    banos = proyectar(-7.16273, -78.46376)
    plaza_xy = proyectar(-7.15700, -78.51744)
    rutas, extremos = {}, {}
    for clave, segs in tramos.items():
        cadenas = encadenar([s for s in segs if len(s) > 1])
        lineas = [[proyectar(nodos[r][0], nodos[r][1]) for r in c] for c in cadenas]
        if clave == 'entierro':
            # La ruta termina en Baños del Inca: se corta lo que sigue hacia el noreste
            lineas = [[p for p in l if p[0] <= banos[0] + 8] for l in lineas]
            lineas = [l for l in lineas if len(l) > 1]
        rutas[clave] = trazo_simple(lineas, 0.4)
        todos = [p for l in lineas for p in l]
        extremos[clave] = min(todos, key=lambda p: math.dist(p, plaza_xy))
        largo = sum(sum(math.dist(l[i], l[i + 1]) for i in range(len(l) - 1)) for l in lineas)
        print(clave, 'tramos', len(segs), 'cadenas', len(cadenas), 'largo', round(largo), 'extremo', extremos[clave])

    lugares = {
        'plaza': proyectar(-7.15700, -78.51744),
        'santaApolonia': proyectar(-7.16042, -78.51908),
        'arco': proyectar(-7.15393, -78.52226),
        'estadio': proyectar(-7.16185, -78.51079),
        'unc': proyectar(-7.16806, -78.49480),
        'banos': proyectar(-7.16273, -78.46376),
    }

    datos = {
        'ancho': ANCHO,
        'alto': ALTO,
        'menores': trazo_simple(menores, 0.7),
        'mayores': trazo_simple(mayores, 0.5),
        'rios': trazo_simple(rios, 0.8),
        'plaza': ''.join(trazo_simple([p], 0.3) + 'Z' for p in plaza),
        'rutas': rutas,
        # Punto de cada avenida más cercano a la Plaza de Armas, para unirlo con un tramo punteado
        'extremos': {k: [round(v[0], 1), round(v[1], 1)] for k, v in extremos.items()},
        'lugares': {k: [round(v[0], 1), round(v[1], 1)] for k, v in lugares.items()},
        'atribucion': '© colaboradores de OpenStreetMap',
        # Para volver de coordenadas SVG a longitud y latitud (mapa 3D)
        'proyeccion': {'lon0': LON0, 'lat0': LAT0, 'cos': COS, 'escala': ESCALA},
    }
    json.dump(datos, open(salida, 'w', encoding='utf-8'), ensure_ascii=False)
    print('alto', ALTO, 'menores', len(menores), 'mayores', len(mayores), 'rios', len(rios), 'plaza', len(plaza))
    print('tamaño', os.path.getsize(salida), 'bytes')


main()
