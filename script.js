// Global Variables
let web3;
let userAccount;
let currentSponsor = "0x80e4CbEffc6D76E516FFe60392C39Af42132602A";

// Activation and partner related flags
let isActivated = false;
let isPartner = false;
let partnerExists = false;
let partnerAddressStored = "";
let partnerReferralCount = 0;
let partnerReferralDate = null;

// Wallet Connection
async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      userAccount = accounts[0];
      const connectBtn = document.getElementById('connectWalletBtn');
      connectBtn.textContent = `Connected: ${userAccount.substring(0,6)}...${userAccount.slice(-4)}`;
      connectBtn.classList.replace('disconnected', 'connected');
      document.getElementById('yourWallet').value = userAccount;
      document.getElementById('newAddress').value = userAccount;
      document.getElementById('sponsorLink').value = userAccount;
      document.getElementById('directSponsor').value = currentSponsor;
    } catch (error) {
      alert("Approve in MetaMask!");
    }
  } else {
    alert("Install MetaMask!");
  }
}
document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);

// Language Toggle
let currentLanguage = 'en';
const englishWelcomeText = document.getElementById('welcomeText').innerHTML;
const hindiWelcomeText = `
  <b>मनी प्लांट एमएलएम</b> में आपका स्वागत है। यह एक पूरी तरह विकेंद्रीकृत प्रणाली है जहां मालिक का कोई नियंत्रण नहीं है और सिर्फ उपयोगकर्ता ही मालिक हैं।<br><br>
  <b>यहां आप अपने पैसे को सुरक्षित<br> बढ़ा सकते हैंऔर वित्तीय स्वतंत्रता<br>प्राप्त कर सकते हैं!</b><br><br>
  ... (बाँकी हिंदी टेक्स्ट)
`;

document.getElementById('languageBtn').addEventListener('click', () => {
  const isEnglish = document.getElementById('languageBtn').textContent.includes('English');
  if (isEnglish) {
    currentLanguage = 'hi';
    document.getElementById('welcomeText').innerHTML = hindiWelcomeText;
    document.getElementById('languageBtn').textContent = 'हिंदी / English';
  } else {
    currentLanguage = 'en';
    document.getElementById('welcomeText').innerHTML = englishWelcomeText;
    document.getElementById('languageBtn').textContent = 'English / हिंदी';
  }
  renderFAQ();
});

// FAQ Rendering
const faqData = [ /* 25 items */ ];
function renderFAQ() { /* same as before */ }
renderFAQ();

// Modal functions
function openModal(id) { /* same */ }
function closeModal() { /* same */ }
function loadUplines() { /* same */ }
function loadTeamLevels() { /* same */ }
function hideAllButtons() { /* same */ }
function distributeFunds() { /* same */ }
function copyReferral() { /* same */ }
function replaceUser() { /* same */ }
function handleQuit() { /* same */ }

// Add Partner functionality
function addPartner() {
  if (!isActivated) {
    alert("Please activate your account by depositing 27 USDT first!");
    return;
  }
  if (isPartner) {
    alert("You are a Partner and cannot add a new Partner!");
    return;
  }
  if (partnerExists) {
    alert("A Partner has already been added. Remove the existing Partner to add a new one.");
    return;
  }
  const partnerAddr = document.getElementById('partnerAddress').value.trim();
  if (partnerAddr === "") {
    alert("Please enter Partner Wallet Address!");
    return;
  }
  partnerExists = true;
  partnerAddressStored = partnerAddr;
  partnerReferralDate = new Date();
  partnerReferralCount = 0;
  alert(`Partner Added Successfully!\nYour Partner Referral Link: https://moneyplant.com/ref?partner=${partnerAddr}`);
  closeModal();
}

// Remove Partner functionality
function removePartner() {
  if (!partnerExists) {
    alert("No Partner exists to remove!");
    return;
  }
  if (partnerReferralCount >= 2) {
    alert("This Partner has generated at least 2 referrals in the last 30 days and cannot be removed.");
    return;
  }
  if (confirm("Are you sure you want to remove the current Partner?")) {
    partnerExists = false;
    partnerAddressStored = "";
    partnerReferralCount = 0;
    partnerReferralDate = null;
    document.getElementById('partnerAddress').value = "";
    alert("Partner removed successfully. You can now add a new Partner for free.");
  }
}
