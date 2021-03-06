FROM node:12.18.3
WORKDIR /root/dfd-editor
COPY package.json package-lock.json /root/dfd-editor/
RUN npm install
COPY pages /root/dfd-editor/pages/
CMD ["npm", "run", "dev"]
