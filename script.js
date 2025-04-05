// Wallet Connection Code
let web3;
let userAccount;
let currentSponsor = "0x80e4CbEffc6D76E516FFe60392C39Af42132602A";

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      userAccount = accounts[0];
      const connectBtn = document.getElementById('connectWalletBtn');
      connectBtn.textContent = `Connected: ${userAccount.substring(0,6)}...${userAccount.slice(-4)}`;
      connectBtn.classList.replace('disconnected', 'connected');
      // यदि directSponsor फील्ड मौजूद हो तो अपडेट करें
      if(document.getElementById('directSponsor')){
        document.getElementById('directSponsor').value = currentSponsor;
      }
    } catch (error) {
      alert("Approve in MetaMask!");
    }
  } else {
    alert("Install MetaMask!");
  }
}
document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);

// Language Toggle Code
const englishWelcomeText = document.getElementById('welcomeText').innerHTML;
const hindiWelcomeText = `<strong>मनी प्लांट एमएलएम</strong> में आपका स्वागत है। यह एक पूरी तरह विकेंद्रीकृत प्रणाली है जहां मालिक का कोई नियंत्रण नहीं है और सिर्फ उपयोगकर्ता ही मालिक हैं।<br>
<strong>यहां आप अपने पैसे को सुरक्षित रूप से बढ़ा सकते हैं और वित्तीय स्वतंत्रता प्राप्त कर सकते हैं!</strong><br>
यह प्रणाली एक <strong>स्मार्ट कॉन्ट्रैक्ट</strong> पर काम करती है जो पारदर्शी तरीके से सीधे यूजर से यूजर भुगतान करती है। एक बार पंजीकरण करने के बाद, आप सीधे और अप्रत्यक्ष रेफरल से कमीशन कमाना शुरू कर देंगे।<br>
🌟 <strong>100% सुरक्षित</strong> - कोई एडमिन नियंत्रण नहीं, पूरी तरह विकेंद्रीकृत।<br>
🌟 <strong>तुरंत भुगतान</strong> - प्रतीक्षा नहीं, तुरंत पैसा प्राप्त करें।<br>
🌟 <strong>असीमित कमाई</strong> - अपना नेटवर्क बढ़ाएं, आय बढ़ाएं।<br>
<strong>पारदर्शिता:</strong> फंड बिना किसी बिचौलिए के सीधे यूजर-टू-यूजर वितरित किए जाते हैं। मनी प्लांट एक दायित्व-मुक्त परियोजना है और हमेशा आपके साथ रहेगी।`;

document.getElementById('languageBtn').addEventListener('click', () => {
  const isEnglish = document.getElementById('languageBtn').textContent.includes('English');
  document.getElementById('welcomeText').innerHTML = isEnglish ? hindiWelcomeText : englishWelcomeText;
  document.getElementById('languageBtn').textContent = isEnglish ? 'हिंदी / English' : 'English / हिंदी';
});

// Button Functions (Placeholders)
function activateAccount() {
  alert("Activate functionality invoked.");
}
function teamView() {
  alert("Team View functionality invoked.");
}
function incomeHistory() {
  alert("Income History functionality invoked.");
}
function refundHistory() {
  alert("Refund History functionality invoked.");
}
function quitMe() {
  alert("Quit Me functionality invoked.");
}
function replaceMe() {
  alert("Replace Me functionality invoked.");
}

// Attach event listeners to buttons
document.querySelector('.btn-activate').addEventListener('click', activateAccount);
document.querySelector('.btn-team').addEventListener('click', teamView);
document.querySelector('.btn-income').addEventListener('click', incomeHistory);
document.querySelector('.btn-refund').addEventListener('click', refundHistory);
document.querySelector('.btn-quit').addEventListener('click', quitMe);
document.querySelector('.btn-replace').addEventListener('click', replaceMe);
