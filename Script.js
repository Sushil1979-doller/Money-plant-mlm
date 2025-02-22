async function connectWallet() {
    try {
        // MetaMask/BSC Wallet Connect
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            const walletAddress = accounts[0];
            document.getElementById("walletAddress").textContent = 
                walletAddress.substring(0, 6) + "..." + walletAddress.substring(38);
            alert("Wallet Connected Successfully! 🎉");
        } else {
            alert("Please Install MetaMask Wallet! 🦊");
        }
    } catch (error) {
        console.error(error);
    }
}
