#!/bin/bash

# Verifica se o usuário forneceu um diretório como argumento
if [ -z "$1" ]; then
    echo "Uso: $0 src"
    exit 1
fi

# Verifica se o argumento é um diretório válido
if [ ! -d "$1" ]; then
    echo "Erro: $1 não é um diretório válido."
    exit 1
fi

# Lista todos os arquivos com caminho completo e exibe o conteúdo
find "$1" -type f | while read -r file; do
    echo "Arquivo: $file"
    echo "Conteúdo:"
    cat "$file"
    echo -e "\n---\n"
done
