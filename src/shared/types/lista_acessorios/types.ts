export interface IFormEditarAcessoriosProps {
  nome: string;
  setNome: React.Dispatch<React.SetStateAction<string>>;
  descricao: string;
  setDescricao: React.Dispatch<React.SetStateAction<string>>;
  valor: number | "";
  setValor: React.Dispatch<React.SetStateAction<number | "">>;
  marca: number | "";
  setMarca: React.Dispatch<React.SetStateAction<number | "">>;
  modelo: number | "";
  setModelo: React.Dispatch<React.SetStateAction<number | "">>;
  marcas: Array<{ id: number; descricao: string }>;
  modelos: Array<{ id: number; descricao: string }>;
  fotos: Array<{ id: string; url: string }>;
  novasImagens: File[];
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileUpload: () => void;
  handleDeleteFoto: (id: string) => void;
  imagemSelecionada: string | null;
  setImagemSelecionada: React.Dispatch<React.SetStateAction<string | null>>;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface IFormNovoAcessorioProps {
  descricao: string;
  setDescricao : React.Dispatch<React.SetStateAction<string>>;
  valor: number;
  setValor: React.Dispatch<React.SetStateAction<number>>;
  id_marca: string;  
  setMarca: React.Dispatch<React.SetStateAction<string>>;
  id_modelo: string;
  setModelo: React.Dispatch<React.SetStateAction<string>>;
  id_console: string;
  setConsole: React.Dispatch<React.SetStateAction<string>>;
  tipo: string;
  setTipo: React.Dispatch<React.SetStateAction<string>>;
  botaoSalvarDesabilitado: boolean;
  setBotaoSalvarDesabilitado: React.Dispatch<React.SetStateAction<boolean>>;
  marcas: Array<{ id: string; descricao: string }>;
  modelos: Array<{ id: string; descricao: string; id_marca: string }>;
  consoles: Array<{ id: string; descricao: string }>;
  fotos: string[];
  imagem: File | null;
  setImagem: React.Dispatch<React.SetStateAction<File | null>>;
  handleUploadImagem: () => void;
  handleSalvarEVoltar: () => void;
  idAcessorioCriado: string | null;
  setIdAcessorioCriado: React.Dispatch<React.SetStateAction<string | null>>;
  criarAcessorio: () => void;
  carregarImagens: () => void;  

}


  export interface Acessorio {
    id: number;
    tipo: string;
    id_marca: number;
    id_modelo: number;
    descricao: string;
    valor: number;
}

  export interface Marca {
    id: number;
    descricao: string;
}

  export interface Modelo {
    id: number;
    id_marca: number;
    descricao: string;
  
}


export interface IItem {
    id: string;
    descricao: string;
    id_marca: string;
}