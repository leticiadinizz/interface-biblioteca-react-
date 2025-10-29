import { JSX, useState } from "react";
import UsuarioRequests from "../../../fetch/UsuarioRequests";
import estilo from './FormUsuario.module.css';

function FormUsuario(): JSX.Element {
    const [formData, setFormData] = useState({
        nome: '',
        username: '',
        email: '',
        senha: '',
        imagemPerfil: '' as string | File
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;

        if (name === 'imagemPerfil' && files) {
            setFormData({
                ...formData,
                [name]: files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);

        // enviar o formulário para o arquivo de requests
        const resposta = await UsuarioRequests.enviarFormularioUsuario(formData);

        resposta ? alert(`Usuario cadastrado com sucesso!`) : alert(`Erro ao cadastrar usuario.`)
        };

    return (
        <section className={estilo['sec-form-usuario']}>
            <h1>Cadastro Usuário</h1>
            <form onSubmit={handleSubmit} className={estilo['form-usuario']}>
                <div className={estilo['input-group']}>
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={estilo['input-group']}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={estilo['input-group']}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={estilo['input-group']}>
                    <label htmlFor="senha">Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        value={formData.senha}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={estilo['input-group']}>
                    <label htmlFor="imagePerfil">Imagem De Perfil</label>
                    <input 
                    type=""
                    name="imagemPerfil"
                    id="imagemPerfil"
                    accept="image/*"
                    onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </section>
    );
}

export default FormUsuario;