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
async function exportarRegistrosPDF() {
  const { jsPDF } = window.jspdf;
  const registros = JSON.parse(localStorage.getItem("registros")) || [];

  if (registros.length === 0) {
    alert("Nenhum registro encontrado para exportar.");
    return;
  }

  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("Registros de Carga Máxima - Meu PR", 10, 15);

  let y = 25;
  registros.forEach((reg, i) => {
    doc.text(`${i + 1}. ${reg.exercicio} | ${reg.carga} ${reg.unidade} | ${reg.tipo} | ${reg.data || ''}`, 10, y);
    y += 10;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("meus-prs.pdf");
}

window.onload = exibirRegistros;
