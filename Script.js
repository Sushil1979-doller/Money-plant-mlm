// Wallet Connection
async function connectWallet() {
    try {
        if(window.ethereum) {
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            document.getElementById('walletBtn').textContent = 
                accounts[0].substring(0,6) + '...' + accounts[0].substring(38);
        } else {
            alert('Please install MetaMask!');
        }
    } catch(error) {
        alert('Error: ' + error.message);
    }
}

// Activation Function
async function activateID() {
    const sponsorAddress = document.getElementById('sponsorAddress').value;
    if(!sponsorAddress) return alert('Please enter sponsor address!');

    try {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        
        // Smart Contract Interaction
        const contractAddress = "YOUR_CONTRACT_ADDRESS";
        const contractABI = [...]; // Your Contract ABI
        
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        await contract.methods.activate(sponsorAddress).send({
            from: accounts[0],
            value: web3.utils.toWei('27', 'ether')
        });
        
        alert('Activation Successful!');
    } catch(error) {
        alert('Error: ' + error.message);
    }
}
