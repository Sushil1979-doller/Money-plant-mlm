// Global Variables
let web3;
let userAccount;
let currentSponsor = "0x80e4CbEffc6D76E516FFe60392C39Af42132602A";

// Wallet Connection
async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      userAccount = accounts[0];
      const connectBtn = document.getElementById("connectWalletBtn");
      connectBtn.textContent = `Connected: ${userAccount.substring(0,6)}...${userAccount.slice(-4)}`;
      connectBtn.classList.replace("disconnected", "connected");
      const dsElement = document.getElementById("directSponsor");
      if (dsElement) { dsElement.value = currentSponsor; }
    } catch (error) {
      alert("Approve in MetaMask!");
    }
  } else {
    alert("Install MetaMask!");
  }
}
document.getElementById("connectWalletBtn").addEventListener("click", connectWallet);

// Store original welcome text
const englishWelcomeText = document.getElementById("welcomeText").innerHTML;
const hindiWelcomeText = `
  <b>मनी प्लांट एमएलएम</b> में आपका स्वागत है। यह एक पूरी तरह विकेंद्रीकृत प्रणाली है जहाँ मालिक का कोई नियंत्रण नहीं है और सिर्फ उपयोगकर्ता ही मालिक हैं।<br><br>
  <b>यहाँ आप अपने पैसे को सुरक्षित रूप से बढ़ा सकते हैं और वित्तीय स्वतंत्रता प्राप्त कर सकते हैं!</b><br><br>
  यह प्रणाली एक <b>स्मार्ट कॉन्ट्रैक्ट</b> पर काम करती है जो पारदर्शी तरीके से सीधे यूजर से यूजर भुगतान करती है। एक बार पंजीकरण करने के बाद, आप सीधे और अप्रत्यक्ष रेफरल से कमीशन कमाना शुरू कर देंगे।<br><br>
  🌟 <b>100% सुरक्षित</b> - कोई एडमिन नियंत्रण नहीं, पूरी तरह विकेंद्रीकृत।<br>
  🌟 <b>तुरंत भुगतान</b> - प्रतीक्षा नहीं, तुरंत पैसा प्राप्त करें।<br>
  🌟 <b>असीमित कमाई</b> - अपना नेटवर्क बढ़ाएं, आय बढ़ाएं।<br><br>
  <b>पारदर्शिता:</b> फंड बिना किसी बिचौलिए के सीधे यूजर-टू-यूजर वितरित किए जाते हैं। मनी प्लांट एक दायित्व-मुक्त परियोजना है और हमेशा आपके साथ रहेगी।
`;

// Function to load FAQ content from external file based on language
function loadFAQ(language) {
  const faqContainer = document.getElementById("faqContainer");
  const faqFile = language === "en" ? "faq-en.html" : "faq-hi.html";
  fetch(faqFile)
    .then(response => response.text())
    .then(html => {
      faqContainer.innerHTML = html;
      attachFAQToggle();
    })
    .catch(error => {
      console.error("Error loading FAQ:", error);
      faqContainer.innerHTML = "<p>Error loading FAQ.</p>";
    });
}

// Attach toggle functionality for FAQ items
function attachFAQToggle() {
  document.querySelectorAll(".faq-question").forEach(function (item) {
    item.addEventListener("click", function () {
      const answer = this.nextElementSibling;
      answer.style.display = answer.style.display === "block" ? "none" : "block";
    });
  });
}

// Set default language to English and load FAQ
let currentLanguage = "en";
loadFAQ(currentLanguage);

// Language Toggle Functionality
document.getElementById("languageBtn").addEventListener("click", function () {
  currentLanguage = currentLanguage === "en" ? "hi" : "en";
  document.getElementById("welcomeText").innerHTML = currentLanguage === "en" ? englishWelcomeText : hindiWelcomeText;
  document.getElementById("languageBtn").textContent = currentLanguage === "en" ? "English / हिंदी" : "हिंदी / English";
  loadFAQ(currentLanguage);
});

// Dummy implementations for modals and other functions

function openModal(modalId) {
  document.body.classList.add("modal-open");
  document.getElementById(modalId).style.display = "flex"; // Using flex to center modal content
}

function closeModal() {
  document.body.classList.remove("modal-open");
  document.querySelectorAll(".modal").forEach(modal => modal.style.display = "none");
}

function loadUplines() {
  const uplineList = document.getElementById("uplineList");
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

function loadTeamLevels() {
  const teamLevels = document.querySelector(".team-levels");
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
  document.getElementById("totalMembers").textContent = total;
}
loadTeamLevels();

function distributeFunds() {
  const btn = document.querySelector(".distribute-btn");
  if (btn) { btn.style.display = "none"; }
  alert("Funds distributed! Referral link and Telegram join button will now appear.");
  // यहां आप referral link copy और Telegram join बटन दिखाने का कोड जोड़ सकते हैं।
}

function copyReferral() {
  navigator.clipboard.writeText(`https://moneyplant.com/ref?user=${userAccount}`);
  alert("Referral link copied!");
}

function openReplaceModal() {
  document.getElementById("sponsorLink").value = `https://moneyplant.com/ref?user=${currentSponsor}`;
  openModal("replaceModal");
}

function replaceUser() {
  const newAddress = document.getElementById("newAddress").value;
  if (newAddress) {
    currentSponsor = userAccount;
    userAccount = newAddress;
    document.getElementById("connectWalletBtn").textContent = `Connected: ${newAddress.slice(0,6)}...${newAddress.slice(-4)}`;
    document.getElementById("directSponsor").value = currentSponsor;
    alert(`Replaced! New Link: https://moneyplant.com/ref?user=${newAddress}`);
    closeModal();
  } else {
    alert("Enter New Wallet!");
  }
}

function handleQuit() {
  if (confirm("You will get 0.27 USDT daily. Confirm?")) {
    alert("Refunds start tomorrow at 4 AM IST.");
    document.getElementById("quitBtn").style.display = "none";
  }
}

/* Video & PDF Upload Functions */
function uploadVideo() {
  const videoInput = document.getElementById("videoUpload");
  const videoDisplay = document.getElementById("videoDisplay");
  if (videoInput.files.length > 0) {
    // यहाँ आप अपना वीडियो अपलोड लॉजिक जोड़ सकते हैं।
    videoDisplay.innerHTML = `<p>Uploaded Video: ${videoInput.files[0].name}</p>`;
  } else {
    alert("Please select a video file.");
  }
}

function uploadPDF() {
  const pdfInput = document.getElementById("pdfUpload");
  const pdfDisplay = document.getElementById("pdfDisplay");
  if (pdfInput.files.length > 0) {
    // यहाँ आप अपना PDF अपलोड लॉजिक जोड़ सकते हैं।
    pdfDisplay.innerHTML = `<p>Uploaded PDF: ${pdfInput.files[0].name}</p>`;
  } else {
    alert("Please select a PDF file.");
  }
}
