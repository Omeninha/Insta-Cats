// PRECISO importar o arquivo de modulo
const User = require('../models/User')

//Dependência para criptografia
const bcrypt = require('bcryptjs')

module.exports = class AuthController{
    static login(require, response){
        // render -> diretório do projeto - nomeArquivo
        // redirect -> mandar para uma ROTA - /
        return response.render('auth/login')
    }

    static async loginPost(request, response){
        const {email, password} = request.body
    }

    static register (require, response){
        response.render('auth/register')
        return
    }
    static async registerPost(request, response){
        const {name, email, password, passwordconfirm} = request.body;

        console.log(name, email, password, passwordconfirm);

        if(password != passwordconfirm){
            request.flash("message", "As senhas não conferem, tente novamente")
            response.render("home")
            return
        }

        //Validação se o usuário já existe
        const checkIfUserExist = await User.findOne({where: {email:email}})
        if(checkIfUserExist){
            request.flash("message", "Este email já está em uso!")
            response.render("home")
            return
        }

        //Boas práticas - Criptogrfar a senha do usuário
        //
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user ={
            name,
            email,
            password: hashedPassword
        }

        try {
            await User.create(user)

            request.flash("message","Cadastro realizado com sucesso!" )
            request.session.save(() =>{
                response.redirect('/')
            })


            return 
        } catch (error) {
            console.log(error)
        }

    }


};