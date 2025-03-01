// Wallet Connection
let web3;
let userAccount;

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            document.getElementById('connectWalletBtn').textContent = 
                `Connected: ${userAccount.substring(0, 6)}...${userAccount.slice(-4)}`;
        } catch (error) {
            alert("Connection failed! Approve in MetaMask.");
        }
    } else {
        alert("Install MetaMask!");
    }
}
document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);

// Language Toggle
let isEnglish = true;
const englishWelcomeText = document.getElementById('welcomeText').innerHTML;
const hindiWelcomeText = `<b>मनी प्लांट एमएलएम</b> में आपका स्वागत है। यह एक पूरी तरह विकेंद्रीकृत प्रणाली है...`; // Full Hindi Text

document.getElementById('languageBtn').addEventListener('click', () => {
    isEnglish = !isEnglish;
    document.getElementById('welcomeText').innerHTML = isEnglish ? englishWelcomeText : hindiWelcomeText;
    document.getElementById('languageBtn').textContent = isEnglish ? 'English / हिंदी' : 'हिंदी / English';
});

// Modals
function openModal(type) {
    document.getElementById(`${type}Modal`).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
    document.body.style.overflow = 'auto';
}

// Load Uplines
function loadUplines() {
    const uplineList = document.getElementById('uplineList');
    for (let i = 15; i >= 1; i--) {
        uplineList.innerHTML += `
            <div class="beneficiary-item">
                <span>🤠 Upline ${i}</span>
                <input type="text" placeholder="Address pending..." readonly>
                <span class="amount">1 USDT</span>
            </div>
        `;
    }
}
loadUplines();

// Load Team Levels
function loadTeamLevels() {
    const teamLevels = document.querySelector('.team-levels');
    for (let i = 1; i <= 16; i++) {
        teamLevels.innerHTML += `
            <div>
                <span>Level ${i}:</span>
                <span>0 Members</span>
            </div>
        `;
    }
}
loadTeamLevels();

// Distribute Funds
function distributeFunds() {
    alert('Funds distributed successfully!');
    document.getElementById('activateModal').innerHTML += `
        <div class="congrats-msg">
            <h3>🎉 Activation Successful!</h3>
            <p>Your Referral Link: <b>https://moneyplant.com/ref?user=${userAccount}</b></p>
        </div>
    `;
}

// Quit Me
function handleQuit() {
    if (confirm('You will get 0.27 USDT daily. Confirm?')) {
        alert('Refunds start tomorrow at 4 AM IST.');
        document.getElementById('quitBtn').style.display = 'none';
    }
}

// Replace User
function replaceUser() {
    const newAddress = document.getElementById('newAddress').value;
    const sponsorLink = document.getElementById('sponsorLink').value;
    if (newAddress && sponsorLink) {
        alert(`Account replaced by ${newAddress}`);
        closeModal();
    } else {
        alert('Fill all fields!');
    }
}
