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
        // this.handleClick = this.handleClick.bind(this);
    }


    addEventListeners() {
        this.form.addEventListener('change', this.handleChange);
        this.btn.addEventListener('click', this.handleClick);
    }

    handleChange() {
        const petValue = this.pet.value.toUpperCase();
        const idadeValue = this.petIdade.value;
        const pesoValue = this.petPeso.value;
        console.log(petValue);
        if(this.arrayFelino.includes(petValue)) {
            this.containerPeso.classList.add('inativo');
            console.log('faz parte')
        } else {
            this.containerPeso.classList.remove('inativo');

        }
    }

    handleClick() {
        const petValue = this.pet.value;
        const idadeValue = this.petIdade.value;
        const pesoValue = this.petPeso.value;
    }

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


