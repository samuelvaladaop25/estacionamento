let jsonData = null;
const servidor = "http://localhost:3000";


fetch(servidor)
    .then(response => response.json())
    .then(data => {
        // JSON fornecido
        jsonData = data;
    })
    .catch(error => console.error('Erro ao buscar o arquivo:', error));



document.getElementById('login-form').onsubmit = function (event) {
    event.preventDefault();
    var user = document.getElementById('user').value;
    var password = document.getElementById('password').value;
    // Aqui você pode adicionar a lógica para validar o usuário

    jsonData.users.forEach((userObj) => {
        if(userObj.user == user){
            if(userObj.password == password){
                alert('Login realizado com sucesso!');
        // Redirecionar para index;
        window.location.href = '../index.html';
            }
            else {
                alert('Usuário ou senha incorretos!');
            }
        }
        else {
            alert('Usuário ou senha incorretos!');
        }
    });
};