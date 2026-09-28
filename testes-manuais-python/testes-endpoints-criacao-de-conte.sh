#!/bin/sh


# teste para rodar no terminal 
# Caso não tenha python na maquina
BASE_URL="${BASE_URL:-http://localhost:8080/api/v1/users/createAccount/0.0.1}"


PASS=0
FAIL=0

echo "=========================================="
echo " TESTES DA API"
echo " Base URL: $BASE_URL"
echo "=========================================="
echo

run_test() {
    NAME="$1"
    EXPECTED="$2"
    METHOD="$3"
    URL="$4"
    DATA="$5"

    echo "------------------------------------------"
    echo "TESTE: $NAME"
    echo "$METHOD $URL"

    if [ -n "$DATA" ]; then
        RESPONSE=$(curl -s -o /tmp/api_response.txt \
            -w "%{http_code}" \
            -X "$METHOD" \
            "$URL" \
            -H "Content-Type: application/json" \
            -d "$DATA")
    else
        RESPONSE=$(curl -s -o /tmp/api_response.txt \
            -w "%{http_code}" \
            -X "$METHOD" \
            "$URL")
    fi

    BODY=$(cat /tmp/api_response.txt)

    echo "Esperado: HTTP $EXPECTED"
    echo "Recebido: HTTP $RESPONSE"
    echo "Resposta:"
    echo "$BODY"
    echo

    if [ "$RESPONSE" = "$EXPECTED" ]; then
        echo "✅ PASSOU"
        PASS=$((PASS + 1))
    else
        echo "❌ FALHOU"
        FAIL=$((FAIL + 1))
    fi

    echo
}


# ==========================================================
# 1. GET /run
# ==========================================================

run_test \
    "API funcionando" \
    "200" \
    "GET" \
    "$BASE_URL/run"


# ==========================================================
# 2. POST /novousers
# ==========================================================

echo "=========================================="
echo " CREATE USER"
echo "=========================================="

# IMPORTANTE:
# Ajuste os nomes dos campos abaixo de acordo com CreateUserRequest.
#
# Exemplo:
# {
#   "username": "joao",
#   "email": "joao@email.com",
#   "password": "123456"
# }

USER_JSON='{
    "username": "teste_sh",
    "email": "teste_sh@email.com",
    "password": "123456"
}'

run_test \
    "Criar usuário válido" \
    "200" \
    "POST" \
    "$BASE_URL/novousers" \
    "$USER_JSON"


# Usuário provavelmente já existente
run_test \
    "Criar usuário duplicado" \
    "409" \
    "POST" \
    "$BASE_URL/novousers" \
    "$USER_JSON"


# JSON vazio
run_test \
    "Criar usuário com JSON vazio" \
    "400" \
    "POST" \
    "$BASE_URL/novousers" \
    '{}'


# Campos obrigatórios ausentes
run_test \
    "Criar usuário sem campos obrigatórios" \
    "400" \
    "POST" \
    "$BASE_URL/novousers" \
    '{
        "username": "somente_usuario"
    }'


# JSON inválido
run_test \
    "Criar usuário com JSON inválido" \
    "400" \
    "POST" \
    "$BASE_URL/novousers" \
    '{
        "username": "teste",
        "email":
    }'


# Body vazio
run_test \
    "Criar usuário sem body" \
    "400" \
    "POST" \
    "$BASE_URL/novousers" \
    ''


# ==========================================================
# 3. POST /atualizar
# ==========================================================

echo "=========================================="
echo " UPDATE USER"
echo "=========================================="

run_test \
    "Atualizar usuário válido" \
    "201" \
    "POST" \
    "$BASE_URL/atualizar" \
    "$USER_JSON"


run_test \
    "Atualizar usuário com JSON vazio" \
    "201" \
    "POST" \
    "$BASE_URL/atualizar" \
    '{}'


run_test \
    "Atualizar usuário com JSON inválido" \
    "400" \
    "POST" \
    "$BASE_URL/atualizar" \
    '{
        "username":
    }'


# ==========================================================
# 4. DELETE /delete/{id}
# ==========================================================

echo "=========================================="
echo " DELETE USER"
echo "=========================================="

# ID que provavelmente não existe
run_test \
    "Deletar usuário inexistente" \
    "404" \
    "DELETE" \
    "$BASE_URL/delete/usuario-que-nao-existe"


# ID vazio
run_test \
    "Deletar sem ID" \
    "404" \
    "DELETE" \
    "$BASE_URL/delete/"


# ID aleatório
run_test \
    "Deletar ID inválido" \
    "404" \
    "DELETE" \
    "$BASE_URL/delete/abc-999999"


echo
echo "=========================================="
echo " RESULTADO FINAL"
echo "=========================================="
echo "✅ Passaram: $PASS"
echo "❌ Falharam: $FAIL"
echo "=========================================="

if [ "$FAIL" -eq 0 ]; then
    echo "Tudo passou!"
    exit 0
else
    echo "Existem testes falhando."
    exit 1
fi
