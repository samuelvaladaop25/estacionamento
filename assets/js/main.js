document.getElementById('formulario').addEventListener('submit', cadastrarVeiculo);

function cadastrarVeiculo(e) {
    var placaVeiculo = document.getElementById('placaVeiculo').value;
    var tipoVeiculo = document.getElementById('tipoVeiculo').value;
    var tipoCliente = document.getElementById('tipoCliente').value;
    var time = new Date();

    if (!placaVeiculo && !tipoVeiculo && !tipoCliente) {

        alert("Preencha todos os campos!");
        return false;
    }

    var veiculo = {
        placa: placaVeiculo,
        tipo: tipoVeiculo,
        cliente: tipoCliente,
        hora: time.getHours(),
        minutos: time.getMinutes()
    };

    if (localStorage.getItem('patio') === null) {
        var veiculos = [];
        veiculos.push(veiculo);
        localStorage.setItem('patio', JSON.stringify(veiculos));
    } else {
        var veiculos = JSON.parse(localStorage.getItem('patio'));
        veiculos.push(veiculo);
        localStorage.setItem('patio', JSON.stringify(veiculos));
    }

    document.getElementById('formulario').reset();

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
    var veiculos = JSON.parse(localStorage.getItem('patio'));
    var patioResultado = document.getElementById('resultados');

    patioResultado.innerHTML = '';

    for (var i = 0; i < veiculos.length; i++) {
        var placa = veiculos[i].placa;
        var tipo = veiculos[i].tipo;
        var cliente = veiculos[i].cliente;
        var hora = veiculos[i].hora;
        var minutos = veiculos[i].minutos;
        patioResultado.innerHTML += '<tr><td>' + placa + '</td>' +
            '<td>' + tipo + '</td>' + '<td>' + cliente + '</td>' +
            '<td>' + hora + ':' + minutos + '</td>' +
            '<td><button onclick="removeVeiculo(\'' + placa + '\')" class="btn btn-danger">Marcar Saída</button></td>' +
            '</tr>';
    }
}