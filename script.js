// script.js

// Global Variables
let web3;
let userAccount;
let currentSponsor = "0x80e4CbEffc6D76E516FFe60392C39Af42132602A";

// Activation and partner related flags
let isActivated = false;         // true once user has deposited 27 USDT (simulated activation)
let isPartner = false;           // true if current user is a partner
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
      // Set connected wallet in Add Partner and Replace modals
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
  <b>यहां आप अपने पैसे को सुरक्षित रूप से बढ़ा सकते हैं और वित्तीय स्वतंत्रता प्राप्त कर सकते हैं!</b><br><br>
  यह प्रणाली एक <b>स्मार्ट कॉन्ट्रैक्ट</b> पर काम करती है जो पारदर्शी तरीके से सीधे यूजर से यूजर भुगतान करती है। एक बार पंजीकरण करने के बाद, आप सीधे और अप्रत्यक्ष रेफरल से कमीशन कमाना शुरू कर देंगे।<br><br>
  🌟 <b>100% सुरक्षित</b> - कोई एडमिन नियंत्रण नहीं, पूरी तरह विकेंद्रीकृत।<br>
  🌟 <b>तुरंत भुगतान</b> - प्रतीक्षा नहीं, तुरंत पैसा प्राप्त करें।<br>
  🌟 <b>असीमित कमाई</b> - अपना नेटवर्क बढ़ाएं, आय बढ़ाएं।<br><br>
  <b>पारदर्शिता:</b> फंड बिना किसी बिचौलिए के सीधे यूजर-टू-यूजर वितरित किए जाते हैं। मनी प्लांट एक दायित्व-मुक्त परियोजना है और हमेशा आपके साथ रहेगी।
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

// FAQ Data and renderFAQ() as before...
const faqData = [ /* ... */ ];
function renderFAQ() { /* ... */ }
renderFAQ();

// Modal functions (openModal, closeModal) same as before...

// Distribute Funds: Activation process
function distributeFunds() { /* ... */ }

// Copy Referral Link
function copyReferral() { /* ... */ }

// Replace Me functionality
function replaceUser() { /* ... */ }

// Quit Me functionality
function handleQuit() { /* ... */ }

// Add Partner functionality
function addPartner() {
  if(!isActivated) {
    alert("Please activate your account by depositing 27 USDT first!");
    return;
  }
  if(isPartner) {
    alert("You are a Partner and cannot add a new Partner!");
    return;
  }
  if(partnerExists) {
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
  alert(`Partner added successfully!
Your Partner Referral Link: https://moneyplant.com/ref?partner=${partnerAddr}
Note: As an activated user, you can remove and add a new Partner if needed.`);
  closeModal();
}

// Remove Partner functionality
function removePartner() {
  if(!partnerExists) {
    alert("No Partner exists to remove!");
    return;
  }
  if(partnerReferralCount >= 2) {
    alert("This Partner has generated at least 2 referrals in the last 30 days and cannot be removed.");
    return;
  }
  if (confirm("Are you sure you want to remove the current Partner?")) {
    partnerExists = false;
    partnerAddressStored = "";
    partnerReferralCount = 0;
    partnerReferralDate = null;
    document.getElementById('partnerAddress').value = "";
    alert("Partner removed successfully. You can now add a new Partner.");
  }
}

/* 
  Note: In a real-world implementation, partnerReferralCount and the 30-day window 
  would be dynamically managed on the backend.
*/
