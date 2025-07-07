export interface ICadastroUsuarioFormProps {
  nome: string;
  setNome: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  senha: string;
  setSenha: (value: string) => void;
  senhaRepetida: string;
  setSenhaRepetida: (value: string) => void;
  erro: string;
  setErro: (value: string) => void;
  onSubmit: (fotoFile?: File | null) => Promise<void>;
  imagem: File | null;
  setImagem: (file: File) => void;
}
