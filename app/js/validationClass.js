'use strict';

class CheckEmpty extends Error {
    constructor( message ) {
        super( message );
        this.name = 'CheckEmpty';
    }
}

class NameValidationError extends Error {
    constructor( message ) {
        super( message );
        this.name = 'NameValidationError';
    }
}

class CheckLength extends Error {
    constructor( message ) {
        super( message );
        this.name = 'CheckLength';
    }
}

class CheckEmail extends  Error {
    constructor( message ) {
        super( message );
        this.name = 'CheckEmail';
    }
}

class CheckPhone extends  Error {
    constructor( message ) {
        super( message );
        this.name = 'CheckPhone';
    }
}

class CheckCheckbox extends  Error {
    constructor( message ) {
        super( message );
        this.name = 'CheckCheckbox';
    }
}

class CheckPassword extends  Error {
    constructor( message ) {
        super( message );
        this.name = 'CheckPassword';
    }
}

class Validation {
    constructor( options ) {
        this.wrap = document.querySelector(options.wrap);
        this.submitBtn = this.wrap.querySelector(options.submitBtn);
        this.inputs = {
            lastName: this.wrap.querySelector(options.lastName),
            firstName: this.wrap.querySelector(options.firstName),
            phone: this.wrap.querySelector(options.phone),
            email: this.wrap.querySelector(options.email),
            checkbox: this.wrap.querySelector(options.checkbox),
            checkbox1: this.wrap.querySelector(options.checkbox1),
            password: this.wrap.querySelector(options.password),
        };

        this.success = false;
    }

    checkEmpty( inputValue ) {
        if( inputValue === '' ) {
            throw new CheckEmpty( 'Заполните это поле' );
        }

        return inputValue;
    }

    checkLength( inputValue, minLength, maxLength ) {
        const inputLength = inputValue.length;

        if( inputLength < minLength ) {
            throw new CheckLength( `Нужно как минимум ${minLength} символов` );
        }
        if( inputLength > maxLength ) {
            throw new CheckLength( `The number of characters is more than ${maxLength}. Enter the correct data` );
        }

    }

    checkName( input ) {
        const inputValue = input.value;

        this.checkEmpty( inputValue );
        this.checkLength( inputValue, 2, 50 );

        /*const regExp = /^[а-яА-Я]+$/;

        if( !regExp.test( inputValue ) ) {
            throw new NameValidationError( 'Допустимы только русские буквы' );
        }*/

        return inputValue;
    }

    checkCheckbox( input ) {
        const inputValue = input.checked;

        if( !inputValue ) {
            throw new CheckCheckbox( 'Это обязательное поле' );
        }

        return inputValue;
    }

    checkPhone( input ) {
        const inputValue = input.value;

        this.checkEmpty( inputValue );

        const numberLength = 16;
        const regExp = /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/;

        if( !regExp.test( inputValue ) || inputValue.length !== numberLength ) {
            throw new CheckPhone( 'Невеный номер телефона' );
        }

        return inputValue;
    }

    maskPhone( input ) {
        new IMask( input, {
            mask: '+{7}(000)000-00-00',
        });
    }

    checkEmail( input ) {
        const inputValue = input.value;

        this.checkEmpty( inputValue );
        this.checkLength( inputValue, 3, 50);

        const regExp = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;

        if( !regExp.test(inputValue) ) {
            throw new CheckEmail( 'Неверный формат Email' );
        }

        return inputValue;
    }

    checkPassword( input ) {
        const inputValue = input.value;

        this.checkEmpty( inputValue );

        return inputValue;
    }

    createWarningMessage(  message ) {
        const paragraph = document.createElement('p');
        paragraph.className = 'warning';
        paragraph.innerHTML = message;
        return paragraph;
    }

    catchErrors( input, e, ...args ) {
        for( const argsItem of args ) {
            if( e instanceof argsItem ) {
                // const messageElement = this.createWarningMessage( e.message );
                // input.parentElement.appendChild( messageElement );

            }
            input.parentElement.classList.add('warn');
        }
    }

    check() {

        const errors = [];

        for( const input in this.inputs ) {
            const elem = this.inputs[input];

            if( !elem ) {
                continue;
            }

            switch( input ) {
                case 'firstName':
                    try {
                        this.checkName( elem );
                    } catch (e) {
                        this.catchErrors( elem, e, CheckEmpty, CheckLength, NameValidationError );
                        errors.push(e);
                    }
                    break;
                case 'lastName':
                    try {
                        this.checkName( elem );
                    } catch (e) {
                        this.catchErrors( elem, e, CheckEmpty, CheckLength, NameValidationError );
                        errors.push(e);
                    }
                    break;
                case 'phone':
                    try {
                        this.checkPhone( elem );
                    } catch (e) {
                        this.catchErrors( elem, e, CheckEmpty, CheckPhone );
                        errors.push(e);
                    }
                    break;
                case 'email':
                    try {
                        this.checkEmail( elem );
                    } catch (e) {
                        this.catchErrors( elem, e, CheckEmpty, CheckLength, CheckEmail );
                        errors.push(e);
                    }
                    break;
                case 'checkbox' :
                    try {
                        this.checkCheckbox( elem );
                    } catch (e) {
                        this.catchErrors( elem, e, CheckCheckbox );
                        errors.push(e);
                    }
                    break;
                case 'checkbox1' :
                    try {
                        this.checkCheckbox( elem );
                    } catch (e) {
                        this.catchErrors( elem, e, CheckCheckbox );
                        errors.push(e);
                    }
                    break;
                case 'password' :
                    try {
                        this.checkPassword( elem );
                    } catch (e) {
                        this.catchErrors( elem, e, CheckPassword );
                        errors.push(e);
                    }
                    break;
            }
        }

        if( errors.length === 0 ) {
            this.success = true;
        }
    }

    init() {
        if (this.inputs.phone) {
            this.maskPhone( this.inputs.phone );
        }
        this.submitBtn.addEventListener('click',  (e) => {
            e.preventDefault();

            const warningMessages = document.getElementsByClassName('warning');
            let invalidInputs = document.getElementsByClassName('warn');

            if( warningMessages[0] ) {
                while( warningMessages.length ) {
                    warningMessages[0].parentNode.removeChild( warningMessages[0] );
                }
            }

            if( invalidInputs ) {
                invalidInputs = Array.prototype.slice.call(invalidInputs);
                for( let i = 0, length = invalidInputs.length; i < length; i++ ) {
                    if( invalidInputs[i].classList.contains('warn') ) {
                        invalidInputs[i].classList.remove('warn');
                    }
                }
            }


            this.check();
        });

        return this.success;
    }
}

export { Validation };