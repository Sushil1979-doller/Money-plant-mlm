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
const hindiWelcomeText = `**मनी प्लांट एमएलएम** में आपका स्वागत है। यह एक पूरी तरह विकेंद्रीकृत प्रणाली है जहां मालिक का कोई नियंत्रण नहीं है और सिर्फ उपयोगकर्ता ही मालिक हैं।<br>
**यहां आप अपने पैसे को सुरक्षित रूप से बढ़ा सकते हैं और वित्तीय स्वतंत्रता प्राप्त कर सकते हैं!**<br>
यह प्रणाली एक **स्मार्ट कॉन्ट्रैक्ट** पर काम करती है जो पारदर्शी तरीके से सीधे यूजर से यूजर भुगतान करती है। एक बार पंजीकरण करने के बाद, आप सीधे और अप्रत्यक्ष रेफरल से कमीशन कमाना शुरू कर देंगे।<br>
🌟 **100% सुरक्षित** - कोई एडमिन नियंत्रण नहीं, पूरी तरह विकेंद्रीकृत।<br>
🌟 **तुरंत भुगतान** - प्रतीक्षा नहीं, तुरंत पैसा प्राप्त करें।<br>
🌟 **असीमित कमाई** - अपना नेटवर्क बढ़ाएं, आय बढ़ाएं।<br>
**पारदर्शिता:** फंड बिना किसी बिचौलिए के सीधे यूजर-टू-यूजर वितरित किए जाते हैं। मनी प्लांट एक दायित्व-मुक्त परियोजना है और हमेशा आपके साथ रहेगी।`;

document.getElementById('languageBtn').addEventListener('click', () => {
  const isEnglish = document.getElementById('languageBtn').textContent.includes('English');
  document.getElementById('welcomeText').innerHTML = isEnglish ? hindiWelcomeText : englishWelcomeText;
  document.getElementById('languageBtn').textContent = isEnglish ? 'हिंदी / English' : 'English / हिंदी';
});

// Optional: यदि आप अतिरिक्त JS (जैसे कि एनिमेशन या अन्य लॉजिक) जोड़ना चाहते हैं, तो यहां करें
