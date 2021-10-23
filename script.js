const validation = {
    handleSubmit: (event) => {
        //Cancela o evento se for cancelável
        event.preventDefault();

        let send = true;
        let allInputs = form.querySelectorAll('input');

        //Função que limpa os erros se as condiçoes forem atendidas
        validation.clearErrors();

        //Verifica individualmente cada input
        for (let i = 0; i < allInputs.length; i++) {
            //Input recebe cada item dentro da NodeList inputs
            let input = allInputs[i];

            //Recebe o resultado da funçao que checa os inputs
            let check = validation.checkInput(input);

            if (check !== true) {
                //Se for diferente de true(deu algum erro)
                send = false; //Não envie o formulário
                validation.showError(input, check); //ShowError irá tratar do erro
            }
        }

        if (send) {
            form.submit();
        }
    },
    checkInput: (input) => {
        //Pega o atributo data-rules dentro do argumento passado na função
        let rules = input.getAttribute('data-rules');

        //Se for diferente de null, ou seja existe alguma regra
        if (rules !== null) {
            //Separa as regras utilizando a "|" como padrão
            //Cada regra separada se torna um array
            rules = rules.split('|');

            for (let k in rules) {
                //Verifica cada uma das regras

                // Para regras que tem valores associados a um nome
                // Como por exemplo min = 2, minimo de 2 caracters
                // Separa o min e o numero em um array especifico
                let rDetails = rules[k].split('=');

                switch (rDetails[0]) {
                    case 'required':
                        if (input.value === '') {
                            return 'O campo não pode estar vazio!';
                        }

                        break;
                }
            }
        }

        return true;
    },
    //Recebe o elemento input e a própria mensagem de erro
    showError: (input, error) => {
        //As bordas dos campos que estiverem com erro ficaram vermelhas
        input.style.borderColor = '#ff0000';

        //Para exibir uma mensagem é preciso criar um elemento e joga-lo na tela
        //Criamos uma div, add a class error a ela e add o conteudo de do argumento error
        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        // Posicionamos o elemento na tela
        // Para posicionar o conteudo embaixo de outro elemento use esse "macete"
        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    //Responsavel por remover os campos com erros que já cumpriram as condiçoes da verificação
    clearErrors: () => {
        // Seleciona os elementos inputs do html
        let inputs = document.querySelectorAll('inputs');

        //Vefica todos os elementos selecionas, e remove a estilização de todos eles, ou seja remove a border color
        for (i = 0; i < inputs.length; i++) {
            inputs[i].style = ' ';
        }

        // Seleciona todas as divs que  tiverem a class error
        let errorElement = document.querySelectorAll('.error');

        //Verifica todos os elementos com a class error e os remove
        for (i = 0; i < errorElement.length; i++) {
            errorElement[i].remove();
        }
    },
};
// Armazena o formulário em uma variavel
const form = document.querySelector('.validation');

//Adiciona um evento que cancela todo os submits dentro de form
form.addEventListener('submit', validation.handleSubmit);
