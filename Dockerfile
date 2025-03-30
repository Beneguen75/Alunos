# Usando uma imagem do Node.js
FROM node:18

# Criando um diretório de trabalho
WORKDIR /app

# Copiando os arquivos do projeto para dentro do container
COPY . .

# Instalando um servidor HTTP simples
RUN npm install -g serve

# Expondo a porta 3000
EXPOSE 3000

# Comando para rodar o servidor
CMD ["serve", "-s", "."]