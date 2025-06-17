function salvarRegistro() {
  const exercicio = document.getElementById('exercicio').value.trim();
  const carga = document.getElementById('carga').value;
  const unidade = document.getElementById('unidade').value;
  const tipo = document.getElementById('tipo').value;

  if (!exercicio || !carga) {
    alert("Preencha todos os campos!");
    return;
  }

  const novoRegistro = {
    exercicio,
    carga: parseFloat(carga),
    unidade,
    tipo,
    data: new Date().toLocaleDateString()
  };

  const registros = JSON.parse(localStorage.getItem("registros")) || [];
  registros.push(novoRegistro);
  localStorage.setItem("registros", JSON.stringify(registros));

  exibirRegistros();
  limparFormulario();
}

function exibirRegistros() {
  const lista = document.getElementById("listaRegistros");
  lista.innerHTML = "";

  const registros = JSON.parse(localStorage.getItem("registros")) || [];

  registros.forEach((reg, index) => {
    const item = document.createElement("li");
    item.innerText = `${reg.exercicio} | ${reg.carga} ${reg.unidade} | ${reg.tipo} | ${reg.data}`;
    lista.appendChild(item);
  });
}

function limparFormulario() {
  document.getElementById("exercicio").value = "";
  document.getElementById("carga").value = "";
  document.getElementById("unidade").value = "kg";
  document.getElementById("tipo").value = "LPO";
}

window.onload = exibirRegistros;
