export default class PetsIdade {
    constructor(pet, petIdade, petPeso, form, btn, result, containerPeso, erroPet, erroIdd, erroPeso) {
        this.pet = pet;
        this.petIdade = petIdade;
        this.petPeso = petPeso;
        this.form = form;
        this.btn = btn;
        this.result = result;
        this.containerPeso = containerPeso;
        this.arrayFelino = ['gato', 'gata'];
        this.arrayCannis = ['cão', 'cao', 'cachorro', 'cachorra', 'cadela'];
        this.petsCadastrados = this.arrayCannis.concat(this.arrayFelino);
        this.erroPet = erroPet;
        this.erroIdd = erroIdd;
        this.erroPeso = erroPeso;

        //binds
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this)
    }


    addEventListeners() {
        this.form.addEventListener('change', this.handleChange);
        this.btn.addEventListener('click', this.handleClick);
    }

    handleChange() {
        const petValue = this.pet.value.toLowerCase();
        const idadeValue = this.petIdade.value;
        const pesoValue = this.petPeso.value;
        if(this.arrayFelino.includes(petValue)) {
            this.containerPeso.classList.add('inativo');
            console.log('faz parte')
        } else {
            this.containerPeso.classList.remove('inativo');

        }
        this.verificarInfo(petValue, idadeValue, pesoValue);
    }

    handleClick() {
        const petValue = this.pet.value.toLowerCase().trim();
        const idadeValue = this.petIdade.value;
        const pesoValue = this.petPeso.value;
        // console.log(petValue, idadeValue, pesoValue)
        const iddValueExtenso = this.numParaExtenso(idadeValue);

        this.buscarIdade(petValue, iddValueExtenso, pesoValue);
        this.verificarInfo(petValue, idadeValue, pesoValue);
    }

    buscarIdade(petValue, iddValueExtenso, pesoValue) {
        console.log(petValue, iddValueExtenso, pesoValue);
        if(this.arrayCannis.includes(petValue)) {
            this.dadosDog(petValue, iddValueExtenso, pesoValue);
            console.log('the chosen one was a dog');
        } else if(this.arrayFelino.includes(petValue)) {
            this.dadosCat(petValue, iddValueExtenso)
        }
    }

    dadosDog(petValue, iddValueExtenso, pesoValue) {
        fetch('JS/dados-pets.json')
        .then(response => {
            console.log(response)
            const jsonPets = response.json()
            jsonPets.then(jsonContent => {
                let iddDogHuman
                console.log(jsonContent)
                if(pesoValue < 10) {
                    iddDogHuman = jsonContent.dezmenos[iddValueExtenso];
                } else if(pesoValue >= 10 && pesoValue < 22) {
                    iddDogHuman = jsonContent.dezevintedois[iddValueExtenso];
                }  else if(pesoValue >= 22) {
                    iddDogHuman = jsonContent.vintedoismais[iddValueExtenso];
                }
                // fazer tratamento de string e retornar nome do 
                // pet com 1º letra maiuscula
                const petValueTratado = petValue.charAt(0).toUpperCase() + petValue.slice(1);
                console.log(petValueTratado);
                if (!this.result.classList.contains('ativo')) {
                    this.result.classList.add('ativo');
                }
                
                // verificando se é masculino ou feminino, para mudar o pronome
                if(petValue === 'cão' || petValue === 'cao' || petValue === 'cachorro') {
                    this.result.innerText = `A idade do seu ${petValueTratado} equivale a ${iddDogHuman} anos para os humanos.`;
                } else if(petValue === 'cadela' || petValue === 'cachorra') {
                    this.result.innerText = `A idade da sua ${petValueTratado} equivale a ${iddDogHuman} anos para os humanos.`;
                }
            })
        });
    }

    dadosCat(petValue, iddValueExtenso) {
        // fazer tratamento de string e retornar nome do 
        // pet com 1º letra maiuscula
        const petValueTratado = petValue.charAt(0).toUpperCase() + petValue.slice(1);
        console.log(petValueTratado);

        fetch('JS/dados-pets.json')
        .then(response => {
            const jsonPets = response.json();
            jsonPets.then(jsonContent => {
                const iddCatHuman = jsonContent.gatos[iddValueExtenso];
                if (!this.result.classList.contains('ativo')) {
                    this.result.classList.add('ativo');
                }

                // verificando se é masculino ou feminino, para mudar o pronome
                if (petValue === 'gato') {
                    this.result.innerText = `A idade do seu ${petValueTratado} equivale a ${iddCatHuman} anos para os humanos. `
                } else if(petValue === 'gata') {
                    this.result.innerText = `A idade da sua ${petValueTratado} equivale a ${iddCatHuman} anos para os humanos. `
                }
            })
        })
    }

    // Verifica se o que o usuário colocou no forms está cadastrado
    // como: ver se há informações para determinado animal ou se 
    // o usuário colocou as informações idade e peso dentro dos limites
    verificarInfo(petValue, idadeValue, pesoValue) {
        if(!this.petsCadastrados.includes(petValue)) {
            this.erroPet.innerText = 'Ainda não temos dados sobre essa espécie, tente novamente com outro(Cão, gato...).';
            this.result.innerText = '';    
        } if(this.petsCadastrados.includes(petValue)) {
            this.erroPet.innerText = '';
        }
        if(idadeValue < 1 || idadeValue > 15) {
            this.erroIdd.innerText = 'Os estudos sobre pets demonstram com idades de 1 a 15 anos.';
            console.log(idadeValue);
        } if(idadeValue > 1 && idadeValue < 16) {
            this.erroIdd.innerText = '';
        }

    }


    // Transforma o numeral em extenso
    // nesse caso o valor da idade 
    // para poder acessar o objeto no arquivo JSON
    numParaExtenso(numero) {
        const unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
        const menorQueVinte = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
        if(numero < 10) {
            return unidades[numero];
        }else if(numero < 20) {
            return menorQueVinte[numero - 10];
        }   
    }

    // Método inicial, de onde todos os outros sairam, pois 
    // utilizei uma forma de função chamando função durante a classe
    init() {
        this.addEventListeners();
    }
}


