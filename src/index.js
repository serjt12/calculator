import './styles/main.scss';

const yearsSlider = document.getElementById('years-of-mortgage');
const rateSlider = document.getElementById('rate-of-interest');
const loanAmountBox = document.getElementById('loan-amount');
const annualTaxBox = document.getElementById('annual-tax');
const annualInsuranceBox = document.getElementById('annual-insurance');
const monthlyTaxBox = document.getElementById('tax');
const monthlyInsuranceBox = document.getElementById('monthly-insurance');
const principalAndInterestBox = document.getElementById('principal-interest');
const textsBoxes = document.querySelectorAll('.main-container-inner__sliders-group__text')
const calculateButton = document.getElementById("calculate-button");
const warningLoan = document.getElementById('warning-loan');
const warningTax = document.getElementById('warning-tax');
const warningInsurance = document.getElementById('warning-insurance');

textsBoxes[0].value = yearsSlider.value;
textsBoxes[1].value = rateSlider.value;

yearsSlider.oninput = function() {
    textsBoxes[0].value = this.value;
}
rateSlider.oninput = function() {
    textsBoxes[1].value = this.value;
}

addEventListenerToElement(textsBoxes[0], 'input', setYearSliderValue);
addEventListenerToElement(textsBoxes[1], 'input', setRateSliderValue);
addEventListenerToElement(loanAmountBox, 'input', checkOnlyNumbers);
addEventListenerToElement(annualTaxBox, 'input', checkOnlyNumbers);
addEventListenerToElement(annualInsuranceBox, 'input', checkOnlyNumbers);

function checkEmptyBox(element, warningElement) {
    if (element.value === "$ " || element.value === "") {
        element.classList.add('main-container-inner__texts-group__loan-amount-box-error');
        warningElement.classList.remove('main-container-inner__texts-group__warning-hidden');
        warningElement.classList.add('main-container-inner__texts-group__warning-visible');
    } else {
        element.classList.remove('main-container-inner__texts-group__loan-amount-box-error');
        warningElement.classList.remove('main-container-inner__texts-group__warning-visible');
        warningElement.classList.add('main-container-inner__texts-group__warning-hidden');
    }
}
function checkOnlyNumbers(e) {
    const isNumber = e.data ? onlyNumberKey(e.data.charCodeAt(0)) : true;
    if (!isNumber) {
        this.value = this.value.slice(0, -1);
    }
}

function setYearSliderValue(e) {
    const isNumber = e.data ? onlyNumberKey(e.data.charCodeAt(0)) : true;
    if (!isNumber) this.value = "";
    if (this.value > 40) this.value = 40;

    yearsSlider.value = this.value
}

function setRateSliderValue(e) {
    const isNumber = e.data ? onlyNumberKey(e.data.charCodeAt(0)) : true;
    if (!isNumber) this.value = "";
    if (this.value > 10) {
        this.value = 10;
    }

    rateSlider.value = this.value;
}

calculateButton.addEventListener("click", function(e) {
    checkEmptyBox(loanAmountBox, warningLoan);
    checkEmptyBox(annualTaxBox, warningTax);
    checkEmptyBox(annualInsuranceBox, warningInsurance);
    calculatePrincipalAndInterest();
    calculateMonthlyTax();
    calculateMonthlyInsurance();
    calculateMonthlyPayment();
    document.getElementById('results-container').classList.remove('main-container__results-hidden-mobile');
    document.getElementById('results-container').classList.add('main-container__results');
}, false);

function addEventListenerToElement(element, event, callback) {
    element.addEventListener(event, callback);
}

function onlyNumberKey(ASCIICode) {
    if (ASCIICode > 31  && (ASCIICode < 46 || ASCIICode > 57))
        return false;
    return true;
}

function calculatePrincipalAndInterest() {
    const loanAmount = parseInt(loanAmountBox.value.replace('$', ''));
    const annualTax = parseInt(annualTaxBox.value.replace('$', ''));
    const annualInsurance = parseInt(annualInsuranceBox.value.replace('$', ''));
    const years = yearsSlider.value;
    const rate = rateSlider.value;

    const monthlyTax = annualTax / 12;
    const monthlyInsurance = annualInsurance / 12;

    const monthlyRate = rate / 100 / 12;

    const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -years * 12));

    const principalAndInterest = monthlyPayment - monthlyTax - monthlyInsurance;

    document.getElementById('principal-interest').innerHTML = "$ " + principalAndInterest.toFixed(2);
}

function calculateMonthlyTax() {
    const annualTax = parseInt(annualTaxBox.value.replace('$', ''));
    const monthlyTax = annualTax / 12;

    document.getElementById('tax').innerHTML = "$ " + monthlyTax.toFixed(2);
}

function calculateMonthlyInsurance() {
    const annualInsurance = parseInt(annualInsuranceBox.value.replace('$', ''));
    const monthlyInsurance = annualInsurance / 12;

    document.getElementById('monthly-insurance').innerHTML = "$ " + monthlyInsurance.toFixed(2);
}

function calculateMonthlyPayment() {
    const principalAndInterest = parseInt(principalAndInterestBox.innerHTML.replace('$', ''));
    const monthlyTax = parseInt(monthlyTaxBox.innerHTML.replace('$', ''));
    const monthlyInsurance = parseInt(monthlyInsuranceBox.innerHTML.replace('$', ''));
    const monthlyPayment = principalAndInterest + monthlyTax + monthlyInsurance;

    document.getElementById('total-monthly').innerHTML = "$ " + monthlyPayment.toFixed(2);
}
