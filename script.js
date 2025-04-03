// Array para armazenar os dados dos alunos cadastrados
let alunos = [];

// Variável para armazenar o índice do aluno que está sendo editado (null se nenhum aluno estiver sendo editado)
let alunoEditando = null;

// Adiciona um evento ao formulário para lidar com o envio
document.getElementById("formulario").addEventListener("submit", (event) => {
    event.preventDefault(); // Evita o comportamento padrão de recarregar a página
    if (alunoEditando !== null) {
        atualizarAluno(alunoEditando); // Atualiza o aluno em edição
    } else {
        adicionarAluno(); // Adiciona um novo aluno
    }
});

// Função para adicionar um novo aluno
const adicionarAluno = () => {
    // Obtém os valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value);
    const curso = document.getElementById('curso').value;
    const notaFinal = parseFloat(document.getElementById('notaFinal').value);

    // Verifica se os valores são válidos
    if (nome && !isNaN(idade) && curso && !isNaN(notaFinal)) {
        // Determina a situação do aluno com base na nota final
        const situacao = notaFinal >= 7 ? "Aprovado" : "Reprovado";

        // Adiciona o aluno ao array
        alunos.push({ nome, idade, curso, notaFinal, situacao });

        // Atualiza a tabela e limpa o formulário
        atualizarTabela();
        limparFormulario();

        // Exibe uma mensagem de sucesso
        alert("Aluno cadastrado com sucesso!");
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
};

// Função para atualizar os dados de um aluno existente
const atualizarAluno = (index) => {
    // Atualiza os dados do aluno no array
    alunos[index].nome = document.getElementById('nome').value;
    alunos[index].idade = parseInt(document.getElementById('idade').value);
    alunos[index].curso = document.getElementById('curso').value;
    alunos[index].notaFinal = parseFloat(document.getElementById('notaFinal').value);
    alunos[index].situacao = alunos[index].notaFinal >= 7 ? "Aprovado" : "Reprovado";

    // Reseta o estado de edição
    alunoEditando = null;

    // Atualiza a tabela e limpa o formulário
    atualizarTabela();
    limparFormulario();

    // Exibe uma mensagem de sucesso
    alert("Aluno atualizado com sucesso!");
};

// Função para atualizar a tabela com os dados dos alunos
const atualizarTabela = () => {
    const tbody = document.getElementById('tabela-body');
    tbody.innerHTML = ''; // Limpa o conteúdo atual da tabela

    // Adiciona uma linha para cada aluno no array
    alunos.forEach((aluno, index) => {
        let row = `<tr>
            <td>${aluno.nome}</td>
            <td>${aluno.idade}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.notaFinal.toFixed(1)}</td>
            <td>${aluno.situacao}</td>
            <td>
                <button class="editar" onclick="editarAluno(${index})">Editar</button>
                <button class="excluir" onclick="excluirAluno(${index})">Excluir</button>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
};

// Função para excluir um aluno
const excluirAluno = (index) => {
    alunos.splice(index, 1); // Remove o aluno do array
    atualizarTabela(); // Atualiza a tabela
    alert("Aluno excluído com sucesso!");
};

// Função para carregar os dados de um aluno no formulário para edição
const editarAluno = (index) => {
    alunoEditando = index; // Define o índice do aluno em edição
    document.getElementById('nome').value = alunos[index].nome;
    document.getElementById('idade').value = alunos[index].idade;
    document.getElementById('curso').value = alunos[index].curso;
    document.getElementById('notaFinal').value = alunos[index].notaFinal;
};

// Função para listar os alunos aprovados
const listarAprovados = () => {
    limparRelatorio();
    const aprovados = alunos.filter(aluno => aluno.notaFinal >= 7).map(aluno => aluno.nome);
    atualizarRelatorio("Aprovados: " + (aprovados.length ? aprovados.join(", ") : "Nenhum aluno aprovado."));
};

// Função para calcular a média das notas
const calcularMediaNotas = () => {
    limparRelatorio();
    if (alunos.length === 0) return atualizarRelatorio("Nenhum aluno cadastrado.");
    const media = alunos.reduce((acc, aluno) => acc + aluno.notaFinal, 0) / alunos.length;
    atualizarRelatorio("Média das Notas: " + media.toFixed(2));
};

// Função para calcular a média das idades
const calcularMediaIdades = () => {
    limparRelatorio();
    if (alunos.length === 0) return atualizarRelatorio("Nenhum aluno cadastrado.");
    const media = alunos.reduce((acc, aluno) => acc + aluno.idade, 0) / alunos.length;
    atualizarRelatorio("Média das Idades: " + media.toFixed(2));
};

// Função para listar os nomes dos alunos em ordem alfabética
const listarNomesOrdenados = () => {
    limparRelatorio();
    if (alunos.length === 0) return atualizarRelatorio("Nenhum aluno cadastrado.");
    const nomesOrdenados = alunos.map(aluno => aluno.nome).sort();
    atualizarRelatorio("Nomes em Ordem Alfabética: " + nomesOrdenados.join(", "));
};

// Função para contar a quantidade de alunos por curso
const quantidadeAlunosPorCurso = () => {
    limparRelatorio();
    if (alunos.length === 0) return atualizarRelatorio("Nenhum aluno cadastrado.");
    const contagem = alunos.reduce((acc, aluno) => {
        acc[aluno.curso] = (acc[aluno.curso] || 0) + 1;
        return acc;
    }, {});
    const resultado = Object.entries(contagem).map(([curso, qtd]) => `${curso}: ${qtd}`).join(", ");
    atualizarRelatorio("Quantidade por Curso: " + resultado);
};

// Função para adicionar um item ao relatório
const atualizarRelatorio = (texto) => {
    const relatorio = document.getElementById("relatorio");
    let item = document.createElement("li");
    item.textContent = texto;
    relatorio.appendChild(item);
};

// Função para limpar o relatório
const limparRelatorio = () => {
    document.getElementById("relatorio").innerHTML = "";
};

// Função para limpar os campos do formulário
const limparFormulario = () => {
    document.getElementById('nome').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('curso').value = '';
    document.getElementById('notaFinal').value = '';
};