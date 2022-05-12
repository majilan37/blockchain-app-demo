import { Contract } from "ethers";

declare global {
  interface Window {
    ethereum: ExternalProvider;
  }
}

interface Transaction {
  sender: string;
  receiver: string;
  amount: number;
  message: string;
  timestamp: numbestringr;
  keyword: string;
}

declare module "ethers" {
  interface Contract {
    addToBlockchain: (
      receiver: string,
      amount: string,
      message: string,
      keyword: string
    ) => Promise<any>;

    getAllTransactions: () => Promise<Transaction[]>;

    getTransactionCount: () => Promise<number>;
  }
}

export type Styles = Record<string, SxProps<Theme>>;

export type ExternalProvider = {
  isMetaMask?: boolean;
  isStatus?: boolean;
  host?: string;
  path?: string;
  sendAsync?: (
    request: { method: string; params?: Array<any> },
    callback: (error: any, response: any) => void
  ) => void;
  send?: (
    request: { method: string; params?: Array<any> },
    callback: (error: any, response: any) => void
  ) => void;
  request?: (request: { method: string; params?: Array<any> }) => Promise<any>;
};
