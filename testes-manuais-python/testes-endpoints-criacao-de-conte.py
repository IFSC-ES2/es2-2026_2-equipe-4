#!/usr/bin/env python3
"""
Testes dos endpoints do AccountController (Spring Boot).


Uso:
    pip install requests
    python test_endpoints.py                      # http://localhost:8080
    python test_endpoints.py http://localhost:8080

Endpoints cobertos:
    GET    /run
    POST   /novousers
    POST   /atualizar
    DELETE /delete/{id}
"""
import json
import sys
import time
import uuid

import requests

BASE_URL = (sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8080/api/v1/users/createAccount/0.0.1").rstrip("/")
TIMEOUT = 10

# ---------------------------------------------------------------------------
def build_user(email=None, name="Usuario Teste"):
    return {
        "nome": name,
        "email": email or f"teste_{uuid.uuid4().hex[:8]}@ifsc.edu.br",
        "password": "Senha@12345",
    }

def user_id_for_delete(response):
    try:
        return response.json().get("userId") if response else None
    except (AttributeError, ValueError):
        return None

# Chaves onde o corpo JSON pode carregar o "status" lógico (UserSummaryResponse).
STATUS_KEYS = ("status", "statusCode", "code", "statusResponse")

# ---------------------------------------------------------------------------
G, R, Y, C, B, X = "\033[92m", "\033[91m", "\033[93m", "\033[96m", "\033[1m", "\033[0m"
results = []


def pretty(text):
    try:
        return json.dumps(json.loads(text), indent=2, ensure_ascii=False)
    except Exception:
        return text if text else "(vazio)"


def body_status(resp):
    try:
        data = resp.json()
    except Exception:
        return None
    if isinstance(data, dict):
        for k in STATUS_KEYS:
            if k in data:
                return data[k]
    return None


def run_case(name, method, path, expected_http, *, json_body=None, raw_body=None,
             headers=None, body_contains=None, expected_body_status=None, note=None):
    url = BASE_URL + path
    hdrs = dict(headers or {})
    if json_body is not None and "Content-Type" not in hdrs:
        hdrs["Content-Type"] = "application/json"
    if raw_body is not None and "Content-Type" not in hdrs:
        hdrs["Content-Type"] = "application/json"

    print(f"\n{B}{C}{'=' * 78}{X}")
    print(f"{B}[{len(results) + 1:02d}] {name}{X}")
    print(f"{C}{'-' * 78}{X}")
    print(f"{B}Requisição{X}")
    print(f"  {method} {url}")
    for k, v in hdrs.items():
        print(f"  Header: {k}: {v}")
    if json_body is not None:
        print("  Body:\n" + "\n".join("    " + l for l in json.dumps(json_body, indent=2, ensure_ascii=False).splitlines()))
    elif raw_body is not None:
        print(f"  Body (bruto): {raw_body!r}")
    else:
        print("  Body: (nenhum)")

    exp = f"HTTP {expected_http}"
    if expected_body_status is not None:
        exp += f" | status no corpo = {expected_body_status}"
    if body_contains:
        exp += f" | corpo contém {body_contains!r}"
    print(f"{B}Esperado{X}\n  {exp}")
    if note:
        print(f"  {Y}Obs.: {note}{X}")

    try:
        t0 = time.perf_counter()
        resp = requests.request(method, url, headers=hdrs,
                                json=json_body if raw_body is None else None,
                                data=raw_body, timeout=TIMEOUT)
        elapsed = (time.perf_counter() - t0) * 1000
    except requests.exceptions.RequestException as e:
        print(f"{B}Resposta{X}\n  {R}Falha de conexão: {e}{X}")
        print(f"{B}Resultado:{X} {R}FALHOU{X}")
        results.append((name, False, "erro de conexão"))
        return None

    print(f"{B}Resposta{X}")
    print(f"  HTTP {resp.status_code} {resp.reason}  ({elapsed:.1f} ms)")
    for k in ("Content-Type", "Content-Length", "Allow"):
        if k in resp.headers:
            print(f"  Header: {k}: {resp.headers[k]}")
    print("  Body:\n" + "\n".join("    " + l for l in pretty(resp.text).splitlines()))

    checks = [("HTTP status", resp.status_code == expected_http,
               f"esperado {expected_http}, obtido {resp.status_code}")]
    if expected_body_status is not None:
        got = body_status(resp)
        checks.append(("status no corpo", got == expected_body_status,
                       f"esperado {expected_body_status}, obtido {got}"))
    if body_contains:
        checks.append(("corpo contém texto", body_contains.lower() in resp.text.lower(),
                       f"procurando {body_contains!r}"))

    print(f"{B}Verificações{X}")
    ok = True
    for label, passed, detail in checks:
        ok &= passed
        print(f"  {G + '✔' if passed else R + '✘'}{X} {label}: {detail}")
    print(f"{B}Resultado:{X} {G + 'PASSOU' if ok else R + 'FALHOU'}{X}")
    results.append((name, ok, "; ".join(d for _, p, d in checks if not p)))
    return resp


def main():
    print(f"{B}Testando API em {BASE_URL}{X}")

    # ---------------- 1) GET /run ----------------
    run_case("GET /run – API no ar (sucesso)", "GET", "/run", 200,
             body_contains="Api running successfully")
    run_case("GET /run – método errado (POST)", "POST", "/run", 405,
             note="Falha esperada: o endpoint só aceita GET")

    # ---------------- 2) POST /novousers ----------------
    user = build_user()
    created_response = run_case("POST /novousers – criação válida (sucesso)", "POST", "/novousers", 200,
                                json_body=user, expected_body_status=200,
                                body_contains="Usuário criado com sucesso")
    run_case("POST /novousers – usuário duplicado (falha)", "POST", "/novousers", 409,
             json_body=user, expected_body_status=409,
             body_contains="já está em uso")
    run_case("POST /novousers – campos vazios (falha de validação)", "POST", "/novousers", 400,
             json_body={}, note="Depende das anotações @Valid no CreateUserRequest")
    run_case("POST /novousers – JSON malformado (falha)", "POST", "/novousers", 400,
             raw_body='{"nome": "abc", ')
    run_case("POST /novousers – sem body (falha)", "POST", "/novousers", 400)
    run_case("POST /novousers – método errado (GET)", "GET", "/novousers", 405)

    # ---------------- 3) POST /atualizar ----------------
    updated = dict(user, nome="Nome Atualizado")
    run_case("POST /atualizar – usuário existente (sucesso)", "POST", "/atualizar", 200,
             json_body=updated, expected_body_status=200)
    run_case("POST /atualizar – usuário inexistente", "POST", "/atualizar", 404,
             json_body=build_user(), expected_body_status=404)
    run_case("POST /atualizar – JSON malformado (falha)", "POST", "/atualizar", 400,
             raw_body="{ nao eh json")
    run_case("POST /atualizar – sem body (falha)", "POST", "/atualizar", 400)

    # ---------------- 4) DELETE /delete/{id} ----------------
    uid = user_id_for_delete(created_response)
    if uid:
        run_case("DELETE /delete/{id} – usuário existente (sucesso)", "DELETE", f"/delete/{uid}", 204)
        run_case("DELETE /delete/{id} – já removido (falha)", "DELETE", f"/delete/{uid}", 404,
                 expected_body_status=404)
    else:
        results.append(("DELETE /delete/{id} – usuário existente (sucesso)", False,
                        "a criação não retornou userId"))
        results.append(("DELETE /delete/{id} – já removido (falha)", False,
                        "a criação não retornou userId"))
    run_case("DELETE /delete/{id} – id inexistente (falha)", "DELETE",
             f"/delete/{uuid.uuid4().hex}", 404, expected_body_status=404)
    run_case("DELETE /delete/{id} – método errado (POST)", "POST", f"/delete/{uid or uuid.uuid4().hex}", 405)

    # ---------------- Resumo ----------------
    total = len(results)
    passed = sum(1 for _, ok, _ in results if ok)
    print(f"\n{B}{C}{'=' * 78}\nRESUMO\n{'=' * 78}{X}")
    for i, (name, ok, why) in enumerate(results, 1):
        mark = f"{G}PASSOU{X}" if ok else f"{R}FALHOU{X}"
        print(f"  {i:02d}. [{mark}] {name}" + (f"  → {why}" if why else ""))
    print(f"\n{B}{passed}/{total} testes passaram.{X}")
    sys.exit(0 if passed == total else 1)


if __name__ == "__main__":
    main()