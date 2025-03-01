// Wallet Connection
let isConnected = false;
const connectWalletBtn = document.getElementById('connectWalletBtn');

connectWalletBtn.addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            isConnected = true;
            connectWalletBtn.textContent = `Connected: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`;
        } catch (error) {
            alert('Failed to connect wallet!');
        }
    } else {
        alert('Please install MetaMask!');
    }
});

// Language Toggle
const languageBtn = document.getElementById('languageBtn');
const welcomeText = document.getElementById('welcomeText');
let isEnglish = true;

const hindiContent = `<b>मनी प्लांट एमएलएम सिस्टम</b> में आपका स्वागत है। यह एक पूरी तरह से विकेंद्रीकृत प्रणाली है जहां मालिक का नियंत्रण नहीं है और केवल उपयोगकर्ता मालिक हैं।<br><br><b>यहां आप अपने पैसे को सुरक्षित रूप से बढ़ा सकते हैं और वित्तीय स्वतंत्रता प्राप्त कर सकते हैं!</b><br><br>यह प्रणाली एक <b>स्मार्ट कॉन्ट्रैक्ट</b> पर काम करती है जो पारदर्शी तरीके से पुरस्कार वितरित करती है।`;

languageBtn.addEventListener('click', () => {
    isEnglish = !isEnglish;
    languageBtn.textContent = isEnglish ? 'English / हिंदी' : 'हिंदी / English';
    welcomeText.innerHTML = isEnglish ? 
        'Welcome to <b>Money Plant MLM System</b>... (Original English Text)' : 
        hindiContent;
});

// Modals
function openModal(type) {
    document.getElementById(`${type}Modal`).style.display = 'block';
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Activate Funds Distribution
function distributeFunds() {
    alert('Funds distributed successfully!');
    const activateModal = document.getElementById('activateModal');
    activateModal.innerHTML += `
        <div class="congrats">
            <h3>🎉 Congratulations! You're Activated!</h3>
            <p>Your Referral Link: <b>https://moneyplant.com/ref?user=USER_ADDRESS</b></p>
        </div>
    `;
}

// Quit Me Function
function handleQuit() {
    if (confirm('Are you sure? You will get refunds daily.')) {
        alert('You will receive 0.27 USDT daily at 4 AM IST.');
        document.getElementById('quitBtn').style.display = 'none';
    }
}
