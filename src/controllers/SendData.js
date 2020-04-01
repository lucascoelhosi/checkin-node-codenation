
const axios = require('axios');
const fs = require('fs');
const FormData = require("form-data");

module.exports = {
    async index (request, response) {
        const POST_URL = "https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=cb6c0d37493e724f9063cca1e614c566f20530c3";

        const formData = new FormData();

        formData.append("answer", fs.createReadStream("./src/answer.json"));

        const score = await axios.post(POST_URL, formData, {
            headers: formData.getHeaders()
          });
        
        console.log(score.data);
        return response.json("Dados enviados com sucesso! ");
    },
}