export interface ICardResumoProps {
  totalJogos: number;
  valorJogos: number;
  totalConsoles: number;
  valorConsoles: number;
  totalAcessorios: number;
  valorAcessorios: number;
  valorTotalGeral: number;
}

export interface IItemCaro {
  id: number;
  titulo?: string;
  descricao?: string;
  valor: number;
  id_marca: number;
  id_modelo?: number;
}

export interface ICardItemMaisCaroProps {
  jogoMaisCaro: IItemCaro | null;
  consoleMaisCaro: IItemCaro | null;
  acessorioMaisCaro: IItemCaro | null;
  fabricantePorId: { [key: number]: string };
  fotosJogoMaisCaro: { [id: number]: string };
  fotosConsoleMaisCaro: { [id: number]: string };
  fotosAcessorioMaisCaro: { [id: number]: string };
  descricaoModelo: string | null;
}


