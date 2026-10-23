#!/usr/bin/env python3
"""Mede os dois servicos antes (git --ref) ou depois (arquivos locais)."""
import argparse
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = "src/backend/projetos/src/main/java"
SERVICES = ("ProjetoService", "ArmazenamentoArquivoService")
STORAGE_TYPES = {"GridFsTemplate", "Document", "ObjectId"}


def git(*args):
    return subprocess.check_output(
        ["git", *args], cwd=ROOT, encoding="utf-8"
    )


def measure(ref=None):
    if ref:
        paths = git("ls-tree", "-r", "--name-only", ref, "--", SOURCE).splitlines()
    else:
        paths = [p.relative_to(ROOT).as_posix()
                 for p in (ROOT / SOURCE).rglob("*.java")]
    internal_types = {Path(p).stem for p in paths if p.endswith(".java")}
    results = []
    for name in SERVICES:
        path = f"{SOURCE}/ifsc/edu/projetos/services/{name}.java"
        exists = path in paths
        code = ""
        if exists:
            code = (git("show", f"{ref}:{path}") if ref else
                    (ROOT / path).read_text(encoding="utf-8-sig"))
        # Remove textos, comentarios, imports e package; conta tipos usados no corpo.
        code = re.sub(r'"(?:\\.|[^"\\])*"|//[^\n]*|/\*[\s\S]*?\*/', "", code)
        code = re.sub(r"(?m)^\s*(?:import|package)\s+[^;]+;", "", code)
        identifiers = set(re.findall(r"\b[A-Za-z_]\w*\b", code))
        storage = sorted(identifiers & STORAGE_TYPES)
        internal = sorted((identifiers & internal_types) - {name})
        results.append({
            "classe": name,
            "existe": exists,
            "tipos_armazenamento": storage,
            "quantidade_armazenamento": len(storage),
            "dependencias_internas": internal,
            "cbo_interno": len(internal),
        })
    return {
        "referencia": ref or "arquivos locais",
        "classes": results,
        "soma_armazenamento": sum(r["quantidade_armazenamento"] for r in results),
        "soma_cbo_interno": sum(r["cbo_interno"] for r in results),
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--ref", help="Commit ou branch para medir no Git")
    args = parser.parse_args()
    print(json.dumps(measure(args.ref), ensure_ascii=False, indent=2))
