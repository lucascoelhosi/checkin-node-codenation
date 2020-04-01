
const axios = require('axios');
const fs = require('fs');

module.exports = {
    async index (request, response) {
        const GET_URL = "https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=TOKEN";
        
        function getInfo(){
            return axios.get(GET_URL);
        }
        var data = await getInfo();
        
        //função para escrever no json
        async function simpleFileWriteSync(filePath) {
            var options = {encoding:'utf-8', flag:'w'};
            fs.writeFileSync(filePath, JSON.stringify(data.data), options);  
        } simpleFileWriteSync('src/answer.json');
        
        return response.json("Dados recuperados e gravados com sucesso! ");
    },
}