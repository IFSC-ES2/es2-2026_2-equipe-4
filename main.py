"""

Arquivo para pegar o PDF do MongoDB e salvar localmente.
Teste rapido, pois a API não possui rota de busca ainda

"""

from pymongo import MongoClient
import gridfs
from pathlib import Path

# Conexão
client = MongoClient(
    "mongodb://admin:admin123@localhost:27017/?authSource=admin"
)

db = client["publicaifsc"]
fs = gridfs.GridFS(db)

# Pega o arquivo mais recente
arquivo = db.fs.files.find_one(
    {"metadata.contentType": "application/pdf"},
    sort=[("uploadDate", -1)]
)

if arquivo is None:
    raise Exception("Nenhum PDF encontrado no GridFS.")

# Nome original no GridFS
nome = arquivo["filename"]

# Nome para salvar localmente
saida = Path(nome)

# Extrai o conteúdo
grid_file = fs.get(arquivo["_id"])

with open(saida, "wb") as f:
    f.write(grid_file.read())

print(f"PDF extraído com sucesso!")
print(f"Arquivo: {saida}")
print(f"Tamanho: {saida.stat().st_size} bytes")