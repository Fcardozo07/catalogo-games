export type Marca = {
  id: number;
  descricao: string;
};



export interface ITableJogosProps {
  itensFiltrados: any[];
  marcas: any[];
  modelos: any[];
  handledeletar: (id: number) => void;
}


export interface Jogo {
    id: number;
    titulo: string;
    id_marca: number;
    id_modelo: number;
    descricao: string;
    valor: number;
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

export type Foto = {
  id: string;
  url: string;
};

export interface IFormNovoJogoProps {
  titulo: string;
  setTitulo: React.Dispatch<React.SetStateAction<string>>;
  descricao: string;
  setDescricao: React.Dispatch<React.SetStateAction<string>>;
  valor: number;
  setValor: React.Dispatch<React.SetStateAction<number>>;
  id_marca: string;
  setMarca: React.Dispatch<React.SetStateAction<string>>;
  id_modelo: string;
  setModelo: React.Dispatch<React.SetStateAction<string>>;
  botaoSalvarDesabilitado: boolean;
  setBotaoSalvarDesabilitado: React.Dispatch<React.SetStateAction<boolean>>;
  marcas: Array<{ id: string; descricao: string }>;
  modelos: Array<{ id: string; descricao: string; id_marca: string }>;
  fotos: Foto[];
  imagem: File | null;
  setImagem: React.Dispatch<React.SetStateAction<File | null>>;
  handleUploadImagem: () => void;
  idJogoCriado: string | null;
  setIdJogoCriado: React.Dispatch<React.SetStateAction<string | null>>;
  criarJogo: () => void;
  carregarImagens: () => void;
}


export interface IFormEditarJogoProps {
  marca: number | "";
  setMarca: React.Dispatch<React.SetStateAction<number | "">>;
  modelo: number | "";
  setModelo: React.Dispatch<React.SetStateAction<number | "">>;
  titulo: string;
  setTitulo: React.Dispatch<React.SetStateAction<string>>;
  descricao: string;
  setDescricao: React.Dispatch<React.SetStateAction<string>>;
  valor: number;
  setValor: React.Dispatch<React.SetStateAction<number>>;
  marcas: Array<{ id: number; descricao: string }>;
  modelos: Array<{ id: number; descricao: string }>;
  fotos: Foto[];
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileUpload: () => void;
  handleDeleteFoto: (id: string) => void;
  imagemSelecionada: string | null;
  setImagemSelecionada: React.Dispatch<React.SetStateAction<string | null>>;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  novasImagens: File[];
  setNovasImagens: React.Dispatch<React.SetStateAction<File[]>>;
}

