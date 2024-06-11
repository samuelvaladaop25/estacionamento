//const servidor = "http://localhost:3000"

//document.getElementById('formulario').addEventListener('submit', cadastrarVeiculo);

function cadastrarVeiculo(e) {
    var placaVeiculo = document.getElementById('placaVeiculo').value;
    var tipoVeiculo = document.getElementById('tipoVeiculo').value;
    var tipoCliente = document.getElementById('tipoCliente').value;
    var time = new Date();

    if (!placaVeiculo && !tipoVeiculo && !tipoCliente) {

        alert("Preencha todos os campos!");
        return false;
    }

    const data_e = get_data();
    const hora_e = get_hora();

    
    const veiculo = {
        "data_entrada":data_e,
        "hora_entrada":hora_e,
        "data_saida": null,
        "hora_saida":null,  
        "placa":placaVeiculo,  
        "tipo_veiculo":tipoVeiculo,
        "id_cliente":'1',
        "tipo_cliente":tipoCliente
    };

    

    console.log(JSON.stringify(veiculo));

    
    fetch("http://localhost:3000/veiculos", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(veiculo),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Dados enviados com sucesso:', data);
        alert("Veiculo cadastrado com sucesso!");
        //window.location.href = '../index.html';
    })
    .catch(error => {
        console.error('Erro ao enviar dados:', error);
    });         
    

    //document.getElementById('formulario').reset();

    e.preventDefault();
}

function removeVeiculo(placa){
	var patio = JSON.parse(localStorage.getItem('patio'));
	console.log(patio);

	 for(var i = 0 ; i < patio.length; i++){
		if(patio[i].placa == placa){
			patio.splice(i, 1);
		}
	}

	localStorage.setItem('patio', JSON.stringify(patio));

	mostraPatio();
}

function mostraPatio() {
    //alert("teste");
    console.log("mostrar Patio")
    fetch("http://localhost:3000/veiculos")
        .then(response => response.json())
        .then(veiculos => {          
            //console.log(veiculos)
                        
            let str = '';
            for (let i = 0; i < veiculos.length; i++) {
                let veiculo = veiculos[i];
                if(veiculo.data_saida==null){
                    saida = '<button class="calcular-saida-btn">Calcular Saída</button>'
                } else {
                    saida = str(veiculo.data_entrada) +  str(veiculo.hora_entrada)
                }
            
                str+= `
                <tr>
                    <td>${veiculo.placa}</td>
                    <td>${veiculo.tipo_veiculo}</td>
                    <td>${veiculo.tipo_cliente}</td>
                    <td>${veiculo.data_entrada} ${veiculo.hora_entrada}</td>
                    <td>${saida}</td>
                </tr>`
                document.querySelector('#resultados').innerHTML=str
            }
        });
}



function formatTimeUnit(unit) {
    return unit < 10 ? '0' + unit : unit;
}

function get_data() {
    const now = new Date();
    
    // Obter partes da data
    const year = now.getFullYear();
    const month = formatTimeUnit(now.getMonth() + 1); // Os meses são de 0 a 11
    const day = formatTimeUnit(now.getDate());
    // Formatar a data e hora
    const date = `${day}/${month}/${year}`;
    
    // Exibir a data e hora
    //document.getElementById('datetime').textContent = `${date} ${time}`;
    return date;

}

function get_hora() {
    const now = new Date();
    
    // Obter partes da hora
    const hours = formatTimeUnit(now.getHours());
    const minutes = formatTimeUnit(now.getMinutes());
    const seconds = formatTimeUnit(now.getSeconds());

    // Formatar a data e hora
    
    const time = `${hours}:${minutes}:${seconds}`;
    
    // Exibir a data e hora
    //document.getElementById('datetime').textContent = `${date} ${time}`;
    return time;
}