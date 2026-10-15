document.querySelectorAll(".titulo-acordeao").forEach(botao => {
    botao.addEventListener("click", () => {
        let conteudo = botao.nextElementSibling; //pegue o próximo elemento
        let simbolo = botao.querySelector("span");

        // Alterna entre block e none usando operador ternário
        conteudo.style.display = conteudo.style.display === "block" ? "none" : "block";
        simbolo.textContent = conteudo.style.display === "block" ? "−" : "+";
    });
});




//QUIZ (DADOS E LÓGICA)
const perguntas = [
    {
        pergunta: "Qual é a média dos números 4, 6 e 8?",
        alternativas: ["5", "7", "9", "6"],
        correta: 3,
        explicacao: "(4 + 6 + 8) ÷ 3 = 6"
    },
    {
        pergunta: "Qual é a moda do conjunto 2, 3, 3, 5, 7?",
        alternativas: ["3", "2", "7", "5"],
        correta: 0,
        explicacao: "O número 3 aparece duas vezes, sendo o que mais se repete."
    },
    {
        pergunta: "Qual é a mediana do conjunto 1, 4, 6, 8, 10?",
        alternativas: ["4", "5", "6", "8"],
        correta: 2,
        explicacao: "O 6 está no centro dos valores organizados."
    },
    {
        pergunta: "Qual é a média das notas 7, 8, 9 e 10?",
        alternativas: ["8,5", "8", "7", "9,5"],
        correta: 0,
        explicacao: "(7 + 8 + 9 + 10) ÷ 4 = 8,5."
    },
    {
        pergunta: "Qual é a mediana do conjunto 9, 2, 5, 7, 3?",
        alternativas: ["3", "7", "9", "5"],
        correta: 3,
        explicacao: "Organizando: 2, 3, 5, 7, 9. O 5 está no centro."
    },
    {
        pergunta: "Qual é a moda do conjunto 1, 2, 2, 4, 4, 4, 5?",
        alternativas: ["2", "5", "3", "4"],
        correta: 3,
        explicacao: "O número 4 aparece três vezes, mais que os outros."
    },
    {
        pergunta: "Um conjunto possui os valores 2, 4, 6 e 8. Qual é a mediana?",
        alternativas: ["4", "5", "7", "6"],
        correta: 0,
        explicacao: "Os valores centrais são 4 e 6. (4 + 6) ÷ 2 = 5."
    },
    {
        pergunta: "Qual alternativa define corretamente a moda?",
        alternativas: ["O valor que está no centro do conjunto.", "O resultado da soma dos valores dividido pela quantidade.", "O valor que aparece com maior frequência.", "O maior valor do conjunto."],
        correta: 2,
        explicacao: "O valor que aparece com maior frequência. — Essa é a definição de moda."
    },
    {
        pergunta: "Para encontrar a mediana, o que devemos fazer primeiro?",
        alternativas: ["Somar todos os valores.", "Encontrar o número que mais se repete.", "Dividir os valores pela quantidade de números.", "Organizar os valores em ordem crescente ou decrescente."],
        correta: 1,
        explicacao: "Organizar os valores. — A mediana depende da posição central, então os dados precisam estar organizados."
    },
    {
        pergunta: "Considere o conjunto 2, 2, 3, 5, 8. Qual alternativa apresenta corretamente a média, mediana e moda, nessa ordem?",
        alternativas: ["4; 3; 2", "5; 3; 2", "4; 2; 3", "3; 4; 2"],
        correta: 2,
        explicacao: "4; 3; 2 — Média = 4, mediana = 3 e moda = 2."
    }
];

let perguntaAtual = 0;
let pontos = 0;

function mostrarPergunta() {
    let pergunta = perguntas[perguntaAtual];
    
    document.getElementById("progresso").textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    document.getElementById("pergunta").textContent = pergunta.pergunta;
    
    let alternativasContainer = document.getElementById("alternativas");
    alternativasContainer.innerHTML = ""; // Limpa anterior

    pergunta.alternativas.forEach((alternativa, indice) => {
        let botao = document.createElement("button");
        botao.textContent = alternativa;
        botao.onclick = () => verificarResposta(indice);
        alternativasContainer.appendChild(botao);
    });

    document.getElementById("feedback").textContent = "";
    document.getElementById("proxima").style.display = "none";
}

function verificarResposta(indice) {
    let pergunta = perguntas[perguntaAtual];
    let botoes = document.querySelectorAll("#alternativas button");

    botoes.forEach(btn => btn.disabled = true);

    if (indice === pergunta.correta) {
        botoes[indice].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta correta! ${pergunta.explicacao}`;
        pontos++;
    } else {
        botoes[indice].classList.add("errada");
        botoes[pergunta.correta].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta incorreta. ${pergunta.explicacao}`;
    }

    document.getElementById("proxima").style.display = "block";
}

function proximaPergunta() {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    let msg = pontos === perguntas.length ? "Excelente! Você acertou todas!" : 
              pontos >= 7 ? "Muito bom! Ótimo conhecimento." : "Vale a pena revisar o conteúdo.";

    document.getElementById("quiz-container").innerHTML = `
        <h3>Resultado final</h3>
        <p>Você acertou <strong>${pontos}</strong> de <strong>${perguntas.length}</strong> questões.</p>
        <p>${msg}</p>
        <button id='refazer' onclick='refazerQuiz()'>Refazer Quiz</button>
    `;
}

function refazerQuiz() {
    perguntaAtual = 0;
    pontos = 0;
    document.getElementById("quiz-container").innerHTML = `
        <p id="progresso"></p>
        <h3 id="pergunta"></h3>
        <div id="alternativas"></div>
        <p id="feedback"></p>
        <button id="proxima" onclick="proximaPergunta()">Próxima pergunta</button>
    `;
    mostrarPergunta();
}

// Inicialização automática do Quiz
if (document.getElementById("quiz-container")) {
    mostrarPergunta();
}