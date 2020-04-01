const fs = require('fs');
const crypto = require("crypto");

module.exports = {
    async index (request, response) {
        
        let rawdata = fs.readFileSync('src/answer.json');
        let data = JSON.parse(rawdata);

        const encryption = data.cifrado;
        const keyEncryption = data.numero_casas;
        
        const alfabeto = "abcdefghijklmnopqrstuvwxyz".split("");
        const pontuacao = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~".split("");

        let decifrado = encryption.split("").map(item => {
            if (pontuacao.indexOf(item) >= 0) {
                return item;
            }
            let char = (alfabeto.indexOf(item) - keyEncryption) % alfabeto.length;
            if (char < 0) {
                return alfabeto[char + alfabeto.length];
            } else {
                return alfabeto[char];
            }
        }).join("");

        data.decifrado = decifrado;

        const hashSha1 = crypto.createHash("sha1").update(decifrado, "utf-8");
        
        data.resumo_criptografico = hashSha1.digest("hex");

        //função para escrever no json
        async function simpleFileWriteSync(filePath) {
            var options = {encoding:'utf-8', flag:'w'};
            fs.writeFileSync(filePath, JSON.stringify(data), options);  
        } simpleFileWriteSync('src/answer.json');

        console.log(data);

        return response.json('Frase decifrada e resumo criptografico criado');
    },
}