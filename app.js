'use strict';

const formValidation = () => {

    const form = document.querySelector('#registrationForm');
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', e => {
        e.preventDefault();

        validateFormDetails(form)
    })

    const formElToBlur = Array.from(form)
    // console.log(formElToBlur);
    formElToBlur.forEach((formEl) => {
        formEl.addEventListener("blur", (e) => {
            validateSingleDetail(e.srcElement.parentElement.parentElement.parentElement)
        });


    })


    const validateOptions = [
        {
            attribute: 'minLength',
            isValid: input => input.value && input.value.length >= input.minLength,
            errorMessage: (input, label) => `${label.textContent} needs to be atleast ${input.minLength}characters`
        },
        {
            attribute: 'custommaxlength',
            isValid: input => input.value && input.value.length <= input.getAttribute('custommaxlength'),
            errorMessage: (input, label) => `${label.textContent} needs to be ${input.getAttribute('custommaxlength')} or less than ${input.getAttribute('custommaxlength')} characters`
        },
        {
            attribute: 'pattern',
            isValid: input => {
                const regex = new RegExp(input.pattern)
                return regex.test(input.value)
                // console.log(regex)
            },
            errorMessage: (input, label) => `${input.value} is not a valid`
        },

        {
            attribute: 'match',
            isValid: input => {
                const selectorEl = input.getAttribute('match');
                const elToMatch = form.querySelector(`#${selectorEl}`)
                return elToMatch && elToMatch.value.trim() === input.value.trim()
            },
            errorMessage: (input, label) => {
                const selectorEl = input.getAttribute('match');
                const elToMatch = form.querySelector(`#${selectorEl}`)
                const elToMatcLabel = elToMatch.parentElement.querySelector('label')
                return `${label.textContent} must match ${elToMatcLabel.textContent}`
            }


        },
        {
            attribute: 'required',
            isValid: (input) => input.value.trim() !== '',
            errorMessage: (input, label) => `${label.textContent} is required, kindly fill this field`
        }
    ]

    const validateSingleDetail = (formDetail) => {
        const label = formDetail.querySelector('label');
        const input = formDetail.querySelector('input');
        const successIcon = formDetail.querySelector('.succesCheck');
        const errorIcon = formDetail.querySelector('.errorCheck');
        const errorMessEl = formDetail.querySelector('.errorMessage');

        let errorDetail = false;


        for (const options of validateOptions) {
            if (input.hasAttribute(options.attribute) && !options.isValid(input)) {
                errorMessEl.textContent = options.errorMessage(input, label)
                input.classList.remove('greedBorder');
                input.classList.add('redBorder');
                errorIcon.style.display = 'inline'
                successIcon.style.display = 'none'

                errorDetail = true;
            }
            if (!errorDetail) {
                errorMessEl.textContent = '';
                input.classList.add('greedBorder');
                input.classList.remove('redBorder');
                successIcon.style.display = 'inline'
                errorIcon.style.display = 'none'

            }

        }
    }


    const validateFormDetails = (formToValidate) => {
        const formDetailsEl = Array.from(formToValidate.querySelectorAll('.formDetails'))
        console.log(formDetailsEl);
        formDetailsEl.forEach((formDetail) => {
            validateSingleDetail(formDetail);
        })
    }



}
formValidation()

