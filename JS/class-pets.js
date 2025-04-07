export default class PetsIdade {
    constructor(pet, petIdade, petPeso, form, btn, result, containerPeso) {
        this.pet = pet;
        this.petIdade = petIdade;
        this.petPeso = petPeso;
        this.form = form;
        this.btn = btn;
        this.result = result;
        this.containerPeso = containerPeso;
        this.arrayFelino = ['GATO', 'GATA'];
        this.arrayCannis = ['CÃO', 'CAO', 'CACHORRO', 'CACHORRA', 'CADELA'];

        //binds
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this)
    }


    addEventListeners() {
        this.form.addEventListener('change', this.handleChange);
        this.btn.addEventListener('click', this.handleClick);
    }

    handleChange() {
        const petValue = this.pet.value.toUpperCase();
        const idadeValue = this.petIdade.value;
        const pesoValue = this.petPeso.value;
        if(this.arrayFelino.includes(petValue)) {
            this.containerPeso.classList.add('inativo');
            console.log('faz parte')
        } else {
            this.containerPeso.classList.remove('inativo');

        }
    }

    handleClick() {
        const petValue = this.pet.value.toUpperCase().trim();
        const idadeValue = this.petIdade.value;
        const pesoValue = this.petPeso.value;
        // console.log(petValue, idadeValue, pesoValue)
        const iddValueExtenso = this.numParaExtenso(idadeValue);
        this.buscarIdade(petValue, iddValueExtenso, pesoValue);
    }

    buscarIdade(petValue, iddValueExtenso, pesoValue) {
        console.log(petValue, iddValueExtenso, pesoValue);
        if(this.arrayCannis.includes(petValue)) {
            this.dadosDog(petValue, iddValueExtenso, pesoValue);
            console.log('the chosen one was a dog')
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
                }
                this.result.innerText = `Seu pet possui em média ${iddDogHuman} anos em relação aos humanos.`;
            })
        });
    }

    // Transforma o numeral em extenso
    // nesse caso o valor da idade 
    // para poder acessar o objeto no arquivo JSON
    numParaExtenso(numero) {
        const unidades = ['', 'um', 'dois', 'tres', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
        const menorQueVinte = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
        if(numero < 10) {
            return unidades[numero];
        }else if(numero < 20) {
            return menorQueVinte[numero - 10];
        }
        
    }

    init() {
        this.addEventListeners();
    }
}


