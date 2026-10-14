#!/usr/bin/env python3
"""Gera os PDFs de /material/pdf a partir de content.py e do conteúdo do app (app-src/src/content).

Uso (na raiz do repositório):  python3 material/src/build.py
Requer Node 22+ e Playwright (usa o Chromium para imprimir o HTML em PDF).
"""
import html, json, os, shutil, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
OUT = os.path.join(ROOT, 'material', 'pdf')
sys.path.insert(0, HERE)
from content import MATERIALS, NEW_EX, RECIPES, DISCLAIMER  # noqa: E402

CAT = {'respiracao': 'Respiração', 'mobilidade': 'Mobilidade', 'forca': 'Força', 'core': 'Core e abdômen',
       'equilibrio': 'Equilíbrio', 'alongamento': 'Alongamento'}
LIMIT = {'joelhos': 'joelhos', 'lombar': 'lombar', 'punhos': 'punhos', 'ombros': 'ombros', 'pescoco': 'pescoço'}


def load_app():
    """Lê exercícios e plano de 21 dias direto dos .ts do app."""
    src = os.path.join(ROOT, 'app-src', 'src', 'content')
    tmp = tempfile.mkdtemp()
    for f in ('exercises.ts', 'program.ts'):
        s = open(os.path.join(src, f), encoding='utf-8').read()
        s = s.replace("from '@/lib/types'", "from './types.ts'").replace("from './exercises'", "from './exercises.ts'")
        open(os.path.join(tmp, f), 'w', encoding='utf-8').write(s)
    open(os.path.join(tmp, 'types.ts'), 'w').write('export {}\n')
    open(os.path.join(tmp, 'dump.mjs'), 'w').write(
        "import { EXERCISES } from './exercises.ts'; import { DAYS, PHASES } from './program.ts';\n"
        "process.stdout.write(JSON.stringify({ EXERCISES, DAYS, PHASES }));\n")
    out = subprocess.run(['node', '--experimental-strip-types', '--no-warnings', 'dump.mjs'], cwd=tmp,
                         capture_output=True, text=True, check=True).stdout
    shutil.rmtree(tmp)
    return json.loads(out)


APP = load_app()
EX = {e['id']: e for e in APP['EXERCISES']}
EX.update({k: dict(v, id=k) for k, v in NEW_EX.items()})
e = html.escape


def img(path):
    return 'file://' + os.path.join(ROOT, path)


def ex_card(ex_id, presc=''):
    x = EX[ex_id]
    side = ' · cada lado' if x.get('perSide') and presc and 'lado' not in presc else ''
    rows = [
        f'<div class="ex-head"><h4>{e(x["name"])}</h4>' + (f'<span class="presc">{e(presc)}{side}</span>' if presc else '') + '</div>',
        '<div class="chips">' + ''.join(f'<span>{e(m)}</span>' for m in x.get('muscles', [])) + '</div>',
        f'<p><b>Posição:</b> {e(x["position"])}</p>',
        '<ol>' + ''.join(f'<li>{e(s)}</li>' for s in x['steps']) + '</ol>',
        f'<p><b>Respiração:</b> {e(x["breathing"])}</p>',
    ]
    if x.get('errors'):
        rows.append('<p><b>Evite:</b> ' + ' '.join(e(s) for s in x['errors']) + '</p>')
    if x.get('easier'):
        rows.append(f'<p><b>Versão mais fácil:</b> {e(x["easier"])}</p>')
    if x.get('safety'):
        rows.append(f'<p class="safe"><b>Segurança:</b> {e(x["safety"])}</p>')
    if x.get('avoid') and x.get('alt') in EX:
        rows.append(f'<p class="safe"><b>Tem dor ou limitação em {", ".join(LIMIT.get(a, a) for a in x["avoid"])}?</b> '
                    f'Troque por: {e(EX[x["alt"]]["name"])}.</p>')
    return '<div class="ex">' + ''.join(rows) + '</div>'


def workout(title, items, note=''):
    li = ''.join(f'<tr><td>{i}</td><td>{e(EX[x]["name"])}</td><td>{e(p)}</td></tr>' for i, (x, p) in enumerate(items, 1))
    return (f'<div class="wo"><div class="wo-t">{e(title)}</div><table>{li}</table>'
            + (f'<div class="wo-n">{e(note)}</div>' if note else '') + '</div>')


def table(head, rows):
    h = ''.join(f'<th>{e(c)}</th>' for c in head)
    b = ''.join('<tr>' + ''.join(f'<td>{c}</td>' for c in r) + '</tr>' for r in rows)
    return f'<table class="tb"><thead><tr>{h}</tr></thead><tbody>{b}</tbody></table>'


def recipe(n, r):
    name, time, yld, ing, steps = r
    return (f'<div class="rc"><div class="rc-h"><span class="rc-n">{n:02d}</span><h4>{e(name)}</h4></div>'
            f'<div class="rc-m">⏱ {e(time)} · 🍽 {e(yld)}</div>'
            '<div class="rc-b"><div><b>Ingredientes</b><ul>' + ''.join(f'<li>{e(i)}</li>' for i in ing) + '</ul></div>'
            '<div><b>Modo de preparo</b><ol>' + ''.join(f'<li>{e(s)}</li>' for s in steps) + '</ol></div></div></div>')


def block(b):
    k = b[0]
    if k == 'h2': return f'<h2>{e(b[1])}</h2>'
    if k == 'h3': return f'<h3>{e(b[1])}</h3>'
    if k == 'p': return f'<p>{b[1]}</p>'
    if k == 'list': return '<ul class="ul">' + ''.join(f'<li>{i}</li>' for i in b[1]) + '</ul>'
    if k == 'steps': return '<ol class="ol">' + ''.join(f'<li>{i}</li>' for i in b[1]) + '</ol>'
    if k == 'tip': return f'<div class="tip"><b>{e(b[1])}</b><p>{b[2]}</p></div>'
    if k == 'warn': return f'<div class="tip warn"><p>{b[1]}</p></div>'
    if k == 'ex': return ex_card(b[1], b[2] if len(b) > 2 else '')
    if k == 'newex': return ex_card(b[1])
    if k == 'workout': return workout(*b[1:])
    if k == 'table': return table(b[1], b[2])
    if k == 'check': return '<div class="ck">' + ''.join(f'<div><i></i>{e(i)}</div>' for i in b[1]) + '</div>'
    if k == 'grid30': return '<div class="g30">' + ''.join(f'<div><span>{i}</span></div>' for i in range(1, 31)) + '</div>'
    if k == 'pagebreak': return '<div class="pb"></div>'
    raise ValueError(k)


def program_body():
    """Guia principal: como usar, os 21 dias e a biblioteca de exercícios do app."""
    out = [
        ('h2', 'Bem-vinda ao seu Desafio'),
        ('p', 'Durante 21 dias você vai treinar poucos minutos por dia usando só uma parede e um tapete. '
              'Os treinos foram organizados em <b>3 fases</b>, que começam com respiração e mobilidade e terminam com '
              'força, equilíbrio e uma postura nova. Este guia traz o plano completo e a explicação de cada exercício.'),
        ('tip', 'Como usar este guia', 'Siga um dia por vez, na ordem. Faça o <b>aquecimento</b>, o <b>treino principal</b> e a '
              '<b>volta à calma</b>. Quando aparecer "2 x 10", faça 2 séries de 10 repetições, descansando o tempo indicado. '
              'Na dúvida sobre um exercício, procure o nome dele na <b>Biblioteca</b>, no fim do guia.'),
        ('h2', 'Antes de começar'),
        ('list', ['Um espaço de 2 metros perto de uma parede livre, sem quadros ou tomadas.',
                  'Um tapete de yoga ou uma toalha dobrada.', 'Roupa confortável e os pés descalços ou de meia antiderrapante.',
                  'Uma garrafa de água por perto.', 'Respire sempre: expire no momento de maior esforço.']),
        ('h2', 'As 3 fases'),
        ('table', ['Fase', 'Dias', 'O que acontece'],
         [[f'<b>{e(p["name"])}</b>', f'{p["days"][0]} a {p["days"][1]}', e(p['desc'])] for p in APP['PHASES']]),
    ]
    html_parts = [block(b) for b in out]

    def item(i):
        name = e(EX[i['ex']]['name'])
        if i.get('reps') and i.get('sets'): d = f'{i["sets"]} x {i["reps"]}'
        elif i.get('reps'): d = f'{i["reps"]} repetições'
        elif i.get('secs') and i.get('sets'): d = f'{i["sets"]} x {i["secs"]} s'
        else: d = f'{i.get("secs", 0)} s'
        if EX[i['ex']].get('perSide'): d += ' (cada lado)'
        if i.get('rest'): d += f' · descanso {i["rest"]} s'
        return f'<li><span>{name}</span><em>{d}</em></li>'

    for ph in APP['PHASES']:
        html_parts.append(f'<div class="pb"></div><div class="phase"><span>FASE {ph["n"]}</span><h2>{e(ph["name"])}</h2>'
                          f'<p>{e(ph["desc"])}</p></div>')
        for d in APP['DAYS']:
            if d['phase'] != ph['n']:
                continue
            parts = [f'<div class="day"><div class="day-h"><span class="dn">DIA {d["n"]}</span><h3>{e(d["name"])}</h3></div>',
                     f'<p class="goal">{e(d["goal"])}</p>']
            for key, label in (('warmup', 'Aquecimento'), ('main', 'Treino principal'), ('cooldown', 'Volta à calma')):
                if d.get(key):
                    parts.append(f'<div class="seg"><b>{label}</b><ul>' + ''.join(item(i) for i in d[key]) + '</ul></div>')
            parts.append(f'<p class="lili">💗 {e(d["lili"])}</p></div>')
            html_parts.append(''.join(parts))
    html_parts.append('<div class="pb"></div><h2>Biblioteca de exercícios</h2>'
                      '<p>Todos os exercícios do desafio, organizados por tipo. Leia com calma antes do primeiro treino.</p>')
    for cat, label in CAT.items():
        exs = [x for x in APP['EXERCISES'] if x['category'] == cat]
        if exs:
            html_parts.append(f'<h3 class="cat">{label}</h3>' + ''.join(ex_card(x['id']) for x in exs))
    return ''.join(html_parts)


def recipes_body():
    parts = [block(b) for b in [
        ('h2', 'Proteína gostosa, todo dia'),
        ('p', 'Proteína ajuda a manter a saciedade, preserva os músculos enquanto você emagrece e dá firmeza ao corpo. '
              'Aqui estão <b>51 receitas</b> rápidas, com ingredientes de supermercado, para todas as refeições do dia.'),
        ('tip', 'Dicas para a semana', 'Cozinhe ovos e desfie frango no domingo: muitas receitas ficam prontas em 5 minutos. '
              'Onde aparecer adoçante, use o de sua preferência ou um pouco de mel. "Colher" é colher de sopa, salvo indicação.'),
    ]]
    n = 0
    for k, (sec, items) in enumerate(RECIPES.items()):
        parts.append(('<div class="pb"></div>' if k else '') + f'<h2>{e(sec)}</h2>')
        for r in items:
            n += 1
            parts.append(recipe(n, r))
    assert n == 51, n
    return ''.join(parts)


CSS = open(os.path.join(HERE, 'pdf.css'), encoding='utf-8').read()


def doc(m):
    body = program_body() if m.get('auto') == 'program' else recipes_body() if m.get('auto') == 'recipes' \
        else ''.join(block(b) for b in m['body'])
    cover = (f'<section class="cover"><div class="c-k">{e(m["kicker"])}</div>'
             f'<h1>{e(m["title"])}<br><span>{e(m["title2"])}</span></h1>'
             f'<div class="c-img"><img src="{img(m["cover"])}"></div>'
             f'<p class="c-d">{e(m["desc"])}</p><div class="c-f">Pilates na Parede · Desafio 21 Dias</div></section>')
    return (f'<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>{e(m["title"])} {e(m["title2"])}</title>'
            '<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap" rel="stylesheet">'
            f'<style>{CSS}</style></head><body>{cover}<main>{body}<div class="disc">{e(DISCLAIMER)}</div></main></body></html>')


def main():
    only = set(sys.argv[1:])
    os.makedirs(OUT, exist_ok=True)
    tmp = tempfile.mkdtemp()
    jobs = []
    for m in MATERIALS:
        if only and m['slug'] not in only:
            continue
        p = os.path.join(tmp, m['slug'] + '.html')
        open(p, 'w', encoding='utf-8').write(doc(m))
        jobs.append({'html': p, 'pdf': os.path.join(OUT, m['slug'] + '.pdf'), 'title': f'{m["title"]} {m["title2"]}'})
    subprocess.run(['node', os.path.join(HERE, 'render.mjs'), json.dumps(jobs)], check=True)
    # Lista usada pela página /material
    meta = [{k: m[k] for k in ('slug', 'group', 'title', 'title2', 'kicker', 'desc', 'cover')} for m in MATERIALS]
    for x in meta:
        f = os.path.join(OUT, x['slug'] + '.pdf')
        x['kb'] = round(os.path.getsize(f) / 1024) if os.path.exists(f) else None
    write_page(meta)
    shutil.rmtree(tmp)


GROUPS = [('programa', 'Seu programa'), ('bonus', 'Seus bônus'), ('extra', 'Conteúdos extras')]
DL = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" '
      'stroke-linejoin="round"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14"/></svg>')


def write_page(meta):
    """Gera material/index.html com a lista de PDFs."""
    parts = []
    for g, label in GROUPS:
        items = [m for m in meta if m['group'] == g]
        if not items:
            continue
        parts.append(f'<div class="label">{label}</div><div class="list">')
        for m in items:
            size = f' · {m["kb"] / 1024:.1f} MB'.replace('.', ',') if m['kb'] and m['kb'] >= 1024 else (f' · {m["kb"]} KB' if m['kb'] else '')
            tab = ' tab' if 'tablet' in m['cover'] else ''
            parts.append(
                f'<a class="card" data-slug="{m["slug"]}" href="/material/pdf/{m["slug"]}.pdf" download="{m["slug"]}.pdf">'
                f'<div class="thumb{tab}"><img src="/{m["cover"]}" alt="" loading="lazy"></div>'
                f'<div class="info"><span class="kick">{e(m["kicker"])}</span><h3>{e(m["title"])} {e(m["title2"])}</h3>'
                f'<p>{e(m["desc"])}</p><span class="dl">{DL}Baixar PDF{size}</span></div>'
                f'<span class="go">{DL}</span></a>')
        parts.append('</div>')
    page = open(os.path.join(HERE, 'page.html'), encoding='utf-8').read().replace('<!--LIST-->', '\n  '.join(parts))
    open(os.path.join(ROOT, 'material', 'index.html'), 'w', encoding='utf-8').write(page)


if __name__ == '__main__':
    main()
