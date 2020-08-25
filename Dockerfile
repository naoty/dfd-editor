FROM node:12.18.3
WORKDIR /root/dfd-editor
COPY package.json package-lock.json /root/dfd-editor/
RUN npm install
CMD ["npm", "run", "dev"]
