// Global Variables
let web3;
let userAccount;
let currentSponsor = "0x80e4CbEffc6D76E516FFe60392C39Af42132602A"; // Default Sponsor

// Wallet Connection
async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            const connectBtn = document.getElementById('connectWalletBtn');
            connectBtn.textContent = `Connected: ${userAccount.substring(0,6)}...${userAccount.slice(-4)}`;
            connectBtn.classList.replace('disconnected', 'connected');
            
            // Auto-fill Direct Sponsor
            document.getElementById('directSponsor').value = currentSponsor;
        } catch (error) {
            alert("Approve the connection in MetaMask!");
        }
    } else {
        alert("Install MetaMask!");
    }
}
document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);

// Language Toggle
const englishWelcomeText = document.getElementById('welcomeText').innerHTML;
const hindiWelcomeText = `
<b>मनी प्लांट एमएलएम</b> में आपका स्वागत है। यह एक पूरी तरह विकेंद्रीकृत प्रणाली है जहां मालिक का कोई नियंत्रण नहीं है। 
<br><br>
<b>यहां आप अपने पैसे को सुरक्षित रूप से बढ़ा सकते हैं और वित्तीय स्वतंत्रता प्राप्त कर सकते हैं!</b>
<br><br>
यह प्रणाली एक <b>स्मार्ट कॉन्ट्रैक्ट</b> पर काम करती है जो सीधे यूजर से यूजर भुगतान करती है (बिना किसी बिचौलिए के)। 
<br><br>
🌟 <b>100% सुरक्षित</b> - कोई एडमिन नियंत्रण नहीं।<br>
🌟 <b>तुरंत भुगतान</b> - किसी प्रतीक्षा की आवश्यकता नहीं।<br>
🌟 <b>असीमित कमाई</b> - टीम बनाएं, आय बढ़ाएं।
`;

document.getElementById('languageBtn').addEventListener('click', () => {
    const isEnglish = document.getElementById('languageBtn').textContent.includes('English');
    document.getElementById('welcomeText').innerHTML = isEnglish ? hindiWelcomeText : englishWelcomeText;
    document.getElementById('languageBtn').textContent = isEnglish ? 'हिंदी / English' : 'English / हिंदी';
});

// Modals
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.classList.add('modal-open');
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
    document.body.classList.remove('modal-open');
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

// Team View
function loadTeamLevels() {
    const teamLevels = document.querySelector('.team-levels');
    let total = 0;
    teamLevels.innerHTML = "";
    for (let i = 1; i <= 16; i++) {
        const members = Math.floor(Math.random() * 5);
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

// Distribute Funds
function distributeFunds() {
    document.querySelector('.distribute-btn').style.display = 'none';
    const referralLink = `https://moneyplant.com/ref?user=${userAccount}`;
    document.getElementById('activateModal').innerHTML += `
        <div class="congrats-msg">
            <h3>🎉 Activation Successful!</h3>
            <p>Permanent Referral Link:<br>
            <a href="${referralLink}" class="referral-link">${referralLink}</a></p>
        </div>
    `;
}

// Replace Me
function openReplaceModal() {
    document.getElementById('sponsorLink').value = `https://moneyplant.com/ref?user=${currentSponsor}`;
    openModal('replaceModal');
}

function replaceUser() {
    const newAddress = document.getElementById('newAddress').value;
    if (newAddress) {
        currentSponsor = userAccount;
        userAccount = newAddress;
        document.getElementById('connectWalletBtn').textContent = `Connected: ${newAddress.slice(0,6)}...${newAddress.slice(-4)}`;
        document.getElementById('directSponsor').value = currentSponsor;
        alert(`Replaced! New Referral Link: https://moneyplant.com/ref?user=${newAddress}`);
        closeModal();
    } else {
        alert("Enter New Wallet Address!");
    }
}

// Quit Me
function handleQuit() {
    if (confirm('You will get 0.27 USDT daily. Confirm?')) {
        alert('Refunds start tomorrow at 4 AM IST.');
        document.getElementById('quitBtn').style.display = 'none';
    }
}
