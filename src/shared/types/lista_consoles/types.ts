export interface Console {
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

export interface ITableConsolesProps {
  itensFiltrados: any[];
  marcas: any[];
  modelos: any[];
  handledeletar: (id: number) => void;
}

export interface IFormEditarConsoleProps {
  nome: string;
  tipo: string;
  setTipo: React.Dispatch<React.SetStateAction<string>>;
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


export interface IFormNovoConsoleProps {
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
  idConsoleCriado: string | null;
  setIdConsoleCriado: React.Dispatch<React.SetStateAction<string | null>>;
  criarConsole: () => void;
  carregarImagens: () => void;  

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