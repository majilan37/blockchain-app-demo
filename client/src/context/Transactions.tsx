import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { ethers } from "ethers";
import { contractAddress, contractAbi } from "../utils/constants";

type StructredTransaction = {
  addressTo: string;
  addressFrom: string;
  timestamp: string;
  message: string;
  keyword: string;
  amount: number;
};

interface ContextType {
  connectWallet: () => Promise<void>;
  currentAccount: string | null;
  formData: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sendTransaction: () => Promise<void>;
  transactions: StructredTransaction[];
  transaCationCount: number | string;
  loading: boolean;
}

const TransactionsContext = createContext<ContextType>({
  connectWallet: () => Promise.resolve(),
  currentAccount: "",
  formData: {},
  onChange: () => {},
  sendTransaction: () => Promise.resolve(),
  transactions: [],
  transaCationCount: "",
  loading: false,
});
const { ethereum } = window;

function getEthereumContract() {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContext = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );

  return transactionContext;
}

export default function TransactionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<StructredTransaction[]>([]);
  const [transaCationCount, setTransaCationCount] = useState<string | number>(
    localStorage.getItem("transactionCount") ?? "0"
  );
  const [formData, setFormData] = useState(() => ({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  }));

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(
        Object.assign({}, formData, { [e.target.name]: e.target.value })
      );
    },
    [formData]
  );

  useEffect(() => {
    checkIfWalletConnected();
    checkIfTransactionExist();
  }, []);

  const checkIfWalletConnected = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");

      const accounts = await ethereum.request!({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log("no accounts");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //   connect wallet
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const accounts = await ethereum.request!({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  // Check if transaction exist
  const checkIfTransactionExist = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionsCount = await transactionContract.getTransactionCount();

      localStorage.setItem(
        "transactionCount",
        JSON.stringify(transactionsCount)
      );
    } catch (err) {
      console.log(err);
      throw new Error("No ethereum object");
    }
  };

  // Get all transactions
  const getAllTransactions = async (): Promise<Array<{
    addressTo: string;
    addressFrom: string;
    timestamp: string;
  }> | void> => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const transactionContract = getEthereumContract();
      const transactions = await transactionContract.getAllTransactions();
      const strucerdTransactions = transactions.map((transaction) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(transaction.timestamp * 1000).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt((transaction.amount as any)._hex) / Math.pow(10, 18),
      }));

      console.log(transactions);
      setTransactions(strucerdTransactions);
    } catch (err) {
      console.log(err);
    }
  };

  //  send Transaction
  const sendTransaction = async () => {
    const { addressTo, amount, keyword, message } = formData;
    try {
      const transactionContract = getEthereumContract();
      console.log(transactionContract);
      await ethereum.request!({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: formData.addressTo,
            gas: "0x5208", // 21000 GWEI
            value: ethers.utils.parseEther(formData.amount)._hex,
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        Number(amount),
        keyword,
        message
      );

      setLoading(true);
      console.log("Loading", transactionHash.hash);
      await transactionHash.wait();
      setLoading(false);
      console.log("Success", transactionHash.hash);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransaCationCount(Number(transactionCount));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <TransactionsContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        onChange,
        sendTransaction,
        transactions,
        transaCationCount,
        loading,
      }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export const useTranscation = () => useContext(TransactionsContext);
