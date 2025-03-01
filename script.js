// Wallet Connection
let isConnected = false;
document.getElementById('connectWalletBtn').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            isConnected = true;
            document.getElementById('connectWalletBtn').textContent = 
                `Connected: ${accounts[0].substring(0,6)}...${accounts[0].substring(38)}`;
        } catch (error) {
            alert('Error connecting wallet!');
        }
    } else {
        alert('Please install MetaMask!');
    }
});

// Language Toggle
let isEnglish = true;
document.getElementById('languageBtn').addEventListener('click', () => {
    isEnglish = !isEnglish;
    document.getElementById('languageBtn').textContent = isEnglish ? 'English / हिंदी' : 'हिंदी / English';
    // Add Hindi text for all elements here
});

// Modals
function openModal(type) {
    document.getElementById(`${type}Modal`).style.display = 'block';
}
function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
}

// Activate Function
function distributeFunds() {
    alert('Funds distributed successfully!');
    document.getElementById('activateModal').innerHTML += `
        <div class="congrats-msg">
            <h3>🎉 Congratulations! You're Activated!</h3>
            <p>Your Referral Link: <b>https://moneyplant.com/ref?user=YOUR_ADDRESS</b></p>
        </div>
    `;
}

// Quit Me Function
function quitMe() {
    if (confirm('Are you sure? You will get refunds daily.')) {
        alert('You will receive 0.27 USDT every day at 4 AM IST.');
        document.getElementById('quitBtn').style.display = 'none';
    }
}

// Replace Me Function
function replaceUser() {
    const newAddress = document.getElementById('newUserAddress').value;
    const sponsorLink = document.getElementById('sponsorLink').value;
    alert(`Replaced with ${newAddress}!`);
    closeModal();
}
