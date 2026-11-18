"""Turn faces.json (Vision output) into focus boxes and rewrite the PHOTOS table in app.js."""
import json
import re
import sys

faces_path, app_path = sys.argv[1], sys.argv[2]
d = json.load(open(faces_path))


def union(bs):
    return [min(b[0] for b in bs), min(b[1] for b in bs), max(b[2] for b in bs), max(b[3] for b in bs)]


def head(p):  # top part of a detected person = head and shoulders
    return [p[0], p[1], p[2], p[1] + (p[3] - p[1]) * 0.28]


rows = []
for k in sorted(d, key=int):
    v = d[k]
    fs = v["faces"]
    ps = sorted(v["people"], key=lambda b: -(b[2] - b[0]) * (b[3] - b[1]))[:2]
    boxes = []
    if fs:
        b = union(fs)
        w, h = b[2] - b[0], b[3] - b[1]
        boxes.append([b[0] - w * 0.15, b[1] - h * 0.35, b[2] + w * 0.15, b[3] + h * 0.2])
    if len(fs) < 2 and ps:
        boxes += [head(p) for p in ps]
    b = union(boxes) if boxes else [0.3, 0.2, 0.7, 0.6]
    b = [round(min(1, max(0, x)), 3) for x in b]
    src = "faces" if fs else ("people" if ps else "default")
    print(f"{k:>3} {v['w']}x{v['h']} faces={len(fs)} people={len(v['people'])} {src} {b}")
    rows.append(f"    {k}: [{v['w']}, {v['h']}, {', '.join(str(x) for x in b)}],")

s = open(app_path, encoding="utf-8").read()
new_block = "  const PHOTOS = {\n" + "\n".join(rows) + "\n  };"
s2, n = re.subn(r"  const PHOTOS = \{\n.*?\n  \};", lambda m: new_block, s, count=1, flags=re.S)
if n != 1:
    raise SystemExit("PHOTOS block not found")
open(app_path, "w", encoding="utf-8").write(s2)
print("PHOTOS updated")
