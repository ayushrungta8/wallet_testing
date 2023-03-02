import { ethers } from "ethers";
import { useState } from "react";
import { useAccount, useSigner, useWaitForTransaction } from "wagmi";

function MyForm() {
  const [toAddress, setToAddress] = useState("");
  const [value, setValue] = useState("");
  const { data: signer } = useSigner();
  const [hash, setHash] = useState(null);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: hash,
  });
  const { address } = useAccount();

  const handleSubmit = (e) => {
    console.log("running");
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    setToAddress(data.toAddress);
    setValue(data.value);
    const tx = {
      from: address,
      to: data.toAddress,
      value: ethers.utils.parseEther(data.value),
    };
    signer.sendTransaction(tx).then((transaction) => {
      setHash(transaction.hash);
    });
  };
  return (
    <form
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
      onSubmit={handleSubmit}
    >
      <div>Wallet: {address}</div>
      <label>
        To Address:
        <input type="text" id="toAddress" name="toAddress" />
      </label>

      <label>
        Value (ETH):
        <input type="text" id="value" name="value" />
      </label>
      <br />
      <button type="submit" id="sendBtn">
        {isLoading ? "Sending..." : "Send"}
      </button>
      {hash && (
        <p id="txHash">{hash.length > 20 ? hash.slice(0, 20) + "..." : hash}</p>
      )}
      {isSuccess && (
        <div>
          Successfully sent {value} ether to {toAddress}
          <div>
            <a href={`https://goerli.etherscan.io/tx/${hash}`} target="_blank">
              Etherscan
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
export default MyForm;
