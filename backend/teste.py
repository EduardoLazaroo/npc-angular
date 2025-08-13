import os
from dotenv import load_dotenv
from pathlib import Path
import mysql.connector
from qdrant_client import QdrantClient
import openai

# Carregar variáveis do .env (usando caminho absoluto)
env_path = Path(__file__).parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

# Debug: verifique se as variáveis foram carregadas
print("DB_USER:", os.getenv('DB_USER'))
print("QDRANT_URL:", os.getenv('QDRANT_URL'))
print("OPENAI_API_KEY:", os.getenv('OPENAI_API_KEY'))

# Teste conexão MySQL
def testar_mysql():
    try:
        conn = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASS'),
            database=os.getenv('DB_NAME'),
            port=int(os.getenv('DB_PORT', 3306))
        )
        print("Conexão MySQL: SUCESSO")
        conn.close()
    except Exception as e:
        print(f"Conexão MySQL: FALHOU - {e}")

# Teste conexão Qdrant
def testar_qdrant():
    try:
        client = QdrantClient(
            url=os.getenv('QDRANT_URL'),
            api_key=os.getenv('QDRANT_API_KEY')
        )
        collections = client.get_collections()
        print("Conexão Qdrant: SUCESSO")
        print("Coleções:", [c.name for c in collections.collections])
    except Exception as e:
        print(f"Conexão Qdrant: FALHOU - {e}")

# Teste conexão OpenAI
def testar_openai():
    try:
        openai.api_key = os.getenv('OPENAI_API_KEY')
        models = openai.models.list()
        print("Conexão OpenAI: SUCESSO")
        print("Modelos disponíveis:", [m.id for m in models.data])
    except Exception as e:
        print(f"Conexão OpenAI: FALHOU - {e}")

if __name__ == "__main__":
    testar_mysql()
    testar_qdrant()
    testar_openai()
