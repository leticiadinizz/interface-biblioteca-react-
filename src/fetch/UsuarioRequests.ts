import { SERVER_CFG, APP_ROUTES } from '../appConfig';

class UsuarioRequests {
    private serverUrl: string;
    private routeCadastroUsuario: string;

    /**
     * Construtor das rotas e do endereço do servidor
     */
    constructor() {
        // endereço do servidor
        this.serverUrl = SERVER_CFG.SERVER_URL;
        // rota do servidor
        this.routeCadastroUsuario = SERVER_CFG.ENDPOINT_CADASTRO_USUARIO;
    }

    // criar função para enviar formulário do aluno
    async enviarFormularioUsuario(formulario: any): Promise<boolean>{
        const token = localStorage.getItem('token'); //pegar o token

        const formDataToSend = new FormData(); //criando o objeto FormData
        formDataToSend.append('nome', formulario.nome);
        formDataToSend.append('username', formulario.username);
        formDataToSend.append('email', formulario.email);
        formDataToSend.append('senha', formulario.senha);
        if(formulario.imagemPerfil instanceof File){
            formDataToSend.append('imagemPerfil', formulario.imagemPerfil);
        }
        
         try {
            const respostaAPI = await fetch(`${this.serverUrl}${this.routeCadastroUsuario}`, {
                method: 'POST',
                headers: {
                   'x-access-token': `${token}`
                },
                body: formDataToSend
            });

            if (!respostaAPI.ok) {
                throw new Error(`Erro ao enviar formulario, verifique se as informações estão corretas.`);
            }

            return true;

        } catch (error) {
            console.error(`Error ao fazer requisição ao servidor ${error}`);
            return false;
        }
    }
}

export default new UsuarioRequests();