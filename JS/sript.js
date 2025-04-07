import PetsIdade from './class-pets.js'

const petInput = document.querySelector('.nome-pet');
const idadeInput = document.querySelector('.idade-pet');
const pesoInput = document.querySelector('.peso-pet');
const form = document.querySelector('[data-form="form"]');
const btnCalc = document.querySelector('[data-form="btn-calc"]');
const resultFinal = document.querySelector('[data-form="result"]');
const containerPeso = document.querySelector('.container-peso');
const erroPet = document.querySelector('.erro-pet');
const erroIdd = document.querySelector('.erro-idd');
const erroPeso = document.querySelector('.erro-peso');

const pet = new PetsIdade(petInput, idadeInput, pesoInput, form, btnCalc, resultFinal, containerPeso, erroPet, erroIdd, erroPeso);
pet.init();