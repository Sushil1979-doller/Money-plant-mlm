let contract;
let userAddress;

async function connectWallet() {
    if(window.ethereum) {
        userAddress = await ethereum.request({method: 'eth_requestAccounts'});
        document.getElementById('walletStatus').innerHTML = "🟢 Connected: " + userAddress[0].slice(0,6)+"...";
        loadContract();
    }
}

async function loadContract() {
    const ABI = []; // Remix से ABI कॉपी करें
    const contractAddress = "0xYourDeployedContractAddress"; 
    contract = new web3.eth.Contract(ABI, contractAddress);
}

async function activate() {
    const sponsor = new URLSearchParams(window.location.search).get('ref') || contract.options.admin;
    await contract.methods.activate(sponsor).send({from: userAddress[0], value: '27000000000000000000'});
    alert("Activated! Referral Link: " + window.location.href + "?ref=" + userAddress[0]);
}
