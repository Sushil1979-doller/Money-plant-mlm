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
async function activateID() {
    const sponsorAddress = document.getElementById("sponsorAddress").value;
    if (!sponsorAddress) {
        alert("Please enter sponsor address!");
        return;
    }
    
    try {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const amount = web3.utils.toWei("27", "ether"); // 27 USDT (BSC पर 1 USDT = 1e18 wei)
        
        // Transaction भेजें
        await web3.eth.sendTransaction({
            from: accounts[0],
            to: "ADMIN_WALLET_ADDRESS", // अपना Admin Wallet डालें
            value: amount,
            data: web3.utils.asciiToHex(sponsorAddress) // Sponsor Address पास करें
        });
        
        alert("Activation Successful! 🎉");
    } catch (error) {
        alert("Error: " + error.message);
    }
}
