var jogadores = []

function gerarnumerostabela(min, max) {

	var numeros = []

	while (numeros.length < 5) {

		var aleatorio = Math.floor(Math.random() * (max - min)) + min;

		if (!numeros.includes(aleatorio)) {
			numeros.push(aleatorio)
		}

	} return numeros;

}

function Desenharcartela() {
	var nome = document.getElementById("nome").value;
	if (nome.length < 1) alert("É nescessário um nome.");
	else {
		var cartela = [gerarnumerostabela(1, 16), gerarnumerostabela(16, 31),
		gerarnumerostabela(31, 45), gerarnumerostabela(46, 61),
		gerarnumerostabela(61, 76)]

		cartela[2][2] = 'X'

		jogadores.push({
			nomeJogador: nome,
			cartela: cartela,
			pontuacao: 0,
			status: ''
		});

		var div = document.createElement('div');
		div.classList.add('identificação');

		var h1 = document.createElement('h1');
		h1.innerText = nome
		div.appendChild(h1);

		var tabela = document.createElement('table');

		var thead = document.createElement('thead');

		var letras = ['B', 'I', 'N', 'G', 'O'];

		for (var i = 0; i < letras.length; i++) {
			var th = document.createElement('th');
			th.innerText = letras[i];
			thead.appendChild(th);
		}
		tabela.appendChild(thead);
		for (var i = 0; i < 5; i++) {
			var tr = document.createElement('tr');

			for (var j = 0; j < 5; j++) {
				var td = document.createElement('td');

				if (i === 2 && j === 2) {
					td.innerText = 'X';
					td.classList.add('squarefree')
					tr.appendChild(td);
				} else {
					td.innerText = cartela[j][i];
					tr.appendChild(td);
					td.classList.add('numero' + cartela[j][i])
				}
			}

			tabela.appendChild(tr);
		}

		div.appendChild(tabela)

		var espacoCartelas = document.querySelector('#container2')
		espacoCartelas.appendChild(div)
		document.getElementById('nome').value = '';
	}
}

function Começarjogo() {
    var resultados = document.getElementById("container3");
    var numerosJaSorteados = [];
    acabou = false
    totalNumeros = 75;

    function sorteio() {
        var numeroSorteado = Math.floor(Math.random() * totalNumeros) + 1;

        if (numerosJaSorteados.includes(numeroSorteado)) {
            sorteio();
        } else {
            numerosJaSorteados.push(numeroSorteado);
            console.log(numeroSorteado)

            for (i = 0; i < jogadores.length; i++) {
                var jogador = jogadores[i]
                var cartela = jogador.cartela
                for (j = 0; j < 5; j++) {
                    var subArray = cartela[j];
                    if (subArray.includes(numeroSorteado)) {
                        var marcadores = document.querySelectorAll('.numero' + numeroSorteado);
                        marcadores.forEach(function (marcador) {
                            marcador.classList.add('squarefree');
                        });
                    }
                }
            }

            var campoNumero = document.createElement('div');
			campoNumero.classList.add('identificação2');
            campoNumero.id = numeroSorteado;
            var textN = document.createTextNode(numeroSorteado);
            resultados.appendChild(campoNumero);
            campoNumero.appendChild(textN);

            for (i = 0; i < jogadores.length; i++) {
                var jogador = jogadores[i]
                var cartela = jogador.cartela
                for (j = 0; j < 5; j++) {
                    var subArray = cartela[j]
                    if (subArray.includes(numeroSorteado)) {
                        jogador.pontuacao++
                        if (jogador.pontuacao === 24) {
                            alert(jogador.nomeJogador + ' venceu')
                            acabou = true
                            jogador.status = 'venceu'
                        }
                    }
                }
            }

            if (acabou == false) {
                setTimeout(sorteio, 1000);
            }
        }
    }

    sorteio();
}

function Reniciarjogo() {
    var resultados = document.getElementById("container3");
    resultados.innerHTML = "";
    var cartela = document.getElementById("container2")
    cartela.innerHTML = '';
    jogadores = [];
}