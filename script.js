// Global Variables
let web3;
let userAccount;
let currentSponsor = "0x80e4CbEffc6D76E516FFe60392C39Af42132602A"; // Default Sponsor (Admin)

// Wallet Connection
async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            const connectBtn = document.getElementById('connectWalletBtn');
            connectBtn.textContent = `Connected: ${userAccount.slice(0,6)}...${userAccount.slice(-4)}`;
            connectBtn.classList.replace('disconnected', 'connected');
            
            // Auto-fill Direct Sponsor
            document.getElementById('directSponsor').value = currentSponsor;
        } catch (error) {
            alert("Connection failed!");
        }
    } else {
        alert("Install MetaMask!");
    }
}
document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);

// Replace Me Modal (Auto-fill Sponsor Link)
function openReplaceModal() {
    document.getElementById('sponsorLink').value = `https://moneyplant.com/ref?user=${currentSponsor}`;
    openModal('replace');
}

// Replace User Function
function replaceUser() {
    const newAddress = document.getElementById('newAddress').value;
    if (newAddress) {
        // Update Current User & Sponsor
        currentSponsor = userAccount; // Old user becomes sponsor
        userAccount = newAddress;
        
        // Update UI
        document.getElementById('connectWalletBtn').textContent = `Connected: ${newAddress.slice(0,6)}...${newAddress.slice(-4)}`;
        document.getElementById('directSponsor').value = currentSponsor;
        
        // Generate New Referral Link
        const referralLink = `https://moneyplant.com/ref?user=${newAddress}`;
        alert(`Account Replaced! New Referral Link: ${referralLink}`);
        closeModal();
    } else {
        alert("Enter New Wallet Address!");
    }
}

// Distribute Funds (Hide Button After Click)
function distributeFunds() {
    document.querySelector('.distribute-btn').style.display = 'none';
    const referralLink = `https://moneyplant.com/ref?user=${userAccount}`;
    document.getElementById('activateModal').innerHTML += `
        <div class="congrats-msg">
            <h3>🎉 Activation Successful!</h3>
            <p>Permanent Referral Link: 
            <a href="${referralLink}" class="referral-link">${referralLink}</a></p>
        </div>
    `;
}

// Load Team Levels with Total
function loadTeamLevels() {
    const teamLevels = document.querySelector('.team-levels');
    let total = 0;
    for (let i = 1; i <= 16; i++) {
        const members = Math.floor(Math.random() * 5); // Demo Data
        total += members;
        teamLevels.innerHTML += `
            <div class="level">
                <span>Level ${i}:</span>
                <span>${members} Members</span>
            </div>
        `;
    }
    document.getElementById('totalMembers').textContent = total;
}
loadTeamLevels();

// Hindi Welcome Text
const hindiWelcomeText = `मनी प्लांट एमएलएम में आपका स्वागत है... (पूरा हिंदी कंटेंट यहाँ डालें)`;
