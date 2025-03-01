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
            alert("Wallet connection failed!");
        }
    } else {
        alert("Install MetaMask!");
    }
}
document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);

// Language Toggle
let isEnglish = true;
const englishContent = `Welcome to <b>Money Plant MLM System</b>...`; // Full English Text
const hindiContent = `<b>मनी प्लांट एमएलएम</b> में आपका स्वागत है...`; // Full Hindi Text

document.getElementById('languageBtn').addEventListener('click', () => {
    isEnglish = !isEnglish;
    document.getElementById('welcomeText').innerHTML = isEnglish ? englishContent : hindiContent;
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
                <input type="text" placeholder="Address will update" readonly>
                <span class="amount">1 USDT</span>
            </div>
        `;
    }
}
loadUplines();

// Team Levels
function loadTeamLevels() {
    const teamLevels = document.querySelector('.team-levels');
    for (let i = 1; i <= 16; i++) {
        teamLevels.innerHTML += `
            <div class="level">
                <span>Level ${i}:</span>
                <span>0 Members</span>
            </div>
        `;
    }
}
loadTeamLevels();

// Distribute Funds
function distributeFunds() {
    alert('Funds distributed to all beneficiaries!');
    document.getElementById('activateModal').innerHTML += `
        <div class="congrats-msg">
            <h3>🎉 Activated Successfully!</h3>
            <p>Your Referral Link: <b>https://moneyplant.com/ref?user=${userAccount}</b></p>
        </div>
    `;
}

// Quit Me
function handleQuit() {
    if (confirm('Are you sure? You will get 0.27 USDT daily.')) {
        alert('Refunds start from next cycle (4 AM IST).');
        document.getElementById('quitBtn').style.display = 'none';
    }
}

// Replace User
function replaceUser() {
    const newAddress = document.getElementById('newAddress').value;
    const sponsorLink = document.getElementById('sponsorLink').value;
    if (newAddress && sponsorLink) {
        alert(`Your account will be replaced by ${newAddress}`);
        closeModal();
    } else {
        alert('Fill all details!');
    }
}
