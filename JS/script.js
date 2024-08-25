$(function(){

    const name = $('#name');
    const email = $('#email');
    const telefone = $('#phone');
    const password = $('#password');
    const confirmPassword = $('#password-confirm');
    let enviarNome = false;
    let enviarEmail = false;
    let enviarTelefone = false;
    let enviarSenha = false;

    function passedValidation(element, label,textP){
        element.css('border', '2px solid green');
        element.css('background-color', 'rgba(0, 255, 0, 0.1)');

        label.text(textP);
        label.css('color', 'rgb(0, 185, 0)').css('display', 'inline-block');
    }

    function failedValidation(element, label,textF){
        element.css('border', '2px solid red');
        element.css('background-color', 'rgba(255, 0, 0, 0.1)');

        label.text(textF);
        label.css('color', 'red').css('display', 'inline-block');
    }

    function verificarName(){
        const nameVal = name.val()
        const nameLabel = $('#name-label')
        const amount = nameVal.split(' ').length
        const splitStr = nameVal.split(' ')

        if(amount >= 2){
            for(let i = 0; i < amount; i++){
                if(splitStr[i].match(/^[A-Z]{1}[a-z]{1,}$/)){
                    passedValidation(name, nameLabel,'passed');
                    enviarNome = true;
                }else{
                    failedValidation(name, nameLabel, 'failed');
                    enviarNome = false;
                }
            }
        }else{
            failedValidation(name, nameLabel,'failed');
            enviarNome = false;
        }
    }

    name.keyup(function(){
        verificarName();
    });

    name.keydown(function(){
        verificarName();
    });

    function verificarEmail(){
        const emailVal = email.val();
        const emailLabel = $('#email-label');

        if(emailVal.match(/^([a-z0-9-._]{1,})+@+([a-z.]{1,})$/)){
            passedValidation(email, emailLabel, 'passed');
            enviarEmail = true;
        }else{
            failedValidation(email, emailLabel, 'verifique seu email.');
            enviarEmail = false;
        }
    }

    email.keyup(function(){
        verificarEmail();
    });

    email.keydown(function(){
        verificarEmail();
    });

    function verificarNumber(){
        const telefoneVal = telefone.val();
        const telefoneLabel = $('#phone-label');

        if(telefoneVal.match(/\([0-9]{2,2}\)[0-9]{4,4}-[0-9]{4,4}/)){
            passedValidation(telefone, telefoneLabel, 'passed');
            enviarTelefone = true;
            telefoneLabel.css('fontSize', '16px').css('marginLeft', '20px');
        }else{
            failedValidation(telefone, telefoneLabel, 'verifique se seu número tem o formato (xx)xxxx-xxxx');
            telefoneLabel.css('fontSize', '14px').css('marginLeft', '-20px');
            enviarTelefone = false;
        }
    }

    telefone.keyup(function(){
        verificarNumber();
    });

    telefone.keydown(function(){
        verificarNumber();
    });

    function verificarPassword(){
        const passwordVal = password.val()
        const passwordLabel = $('#password-label');

        if(passwordVal.length < 5){
            failedValidation(password, passwordLabel, 'minimo de 5 caracteres');
            enviarSenha = false;
            
        }else{
            passedValidation(password, passwordLabel, 'passed');
            enviarSenha = true;
        }
    }

    let interval;

    password.keyup(function(){
        verificarPassword();

        clearTimeout(interval);

        interval = setTimeout(function(){
            verificarConfirmPassword();
        }, 100);

    });

    password.keydown(function(){
        verificarPassword();

        clearTimeout(interval);

        interval = setTimeout(function(){
            verificarConfirmPassword();
        }, 100);
    });

    function verificarConfirmPassword(){
        const confirmPasswordVal = confirmPassword.val()
        const confirmPasswordLabel = $('#password-confirm-label');

        if(confirmPasswordVal !== password.val()){
            failedValidation(confirmPassword, confirmPasswordLabel, 'as senhas não coincidem');
            enviarSenha = false;
        }else{
            passedValidation(confirmPassword, confirmPasswordLabel, 'passed');
            enviarSenha = true;
        }
    }

    confirmPassword.keyup(function(){
        verificarConfirmPassword();
    });

    confirmPassword.keydown(function(){
        verificarConfirmPassword();
    });

    $('form').submit(function(e){
        if(!enviarNome || !enviarEmail || !enviarTelefone || !enviarSenha){
            e.preventDefault();
            alert('Verifique os dados');
        }
    });
});