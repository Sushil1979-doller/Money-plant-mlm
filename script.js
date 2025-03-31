// Global Variables
let web3;
let userAccount;
let currentSponsor = "0x80e4CbEffc6D76E516FFe60392C39Af42132602A";

// Wallet Connection
async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      userAccount = accounts[0];
      const connectBtn = document.getElementById('connectWalletBtn');
      connectBtn.textContent = `Connected: ${userAccount.substring(0,6)}...${userAccount.slice(-4)}`;
      connectBtn.classList.replace('disconnected', 'connected');
      document.getElementById('directSponsor').value = currentSponsor;
    } catch (error) {
      alert("Approve in MetaMask!");
    }
  } else {
    alert("Install MetaMask!");
  }
}
document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);

// FAQ Content (English & Hindi)
const faqEnglish = `
  <div class="faq-container">
    <h2>Money Plant MLM System - FAQ</h2>
    <!-- 1 -->
    <div class="faq-item">
      <p class="faq-question">1. What is Money Plant MLM System?</p>
      <p class="faq-answer">
        Money Plant is a fully decentralized MLM system based on donations and distribution. Every user gets a golden opportunity to activate their ID using a referral from their sponsor.
      </p>
    </div>
    <!-- 2 -->
    <div class="faq-item">
      <p class="faq-question">2. How does Money Plant MLM System work?</p>
      <p class="faq-answer">
        Users deposit 27 USDT in their wallet and distribute it across 18 designated wallet addresses. Once done, their ID is activated and they can build their team to earn rewards.
      </p>
    </div>
    <!-- 3 -->
    <div class="faq-item">
      <p class="faq-question">3. Does my money go to the company or directly to users?</p>
      <p class="faq-answer">
        All funds are distributed directly among users. No money is held by the company except a minimal 1 USDT royalty to the admin, ensuring your investment remains fully in your hands.
      </p>
    </div>
    <!-- 4 -->
    <div class="faq-item">
      <p class="faq-question">4. Why can’t the admin scam or rugpull?</p>
      <p class="faq-answer">
        The system is entirely powered by smart contracts and blockchain, ensuring complete transparency and security for every transaction.
      </p>
    </div>
    <!-- 5 -->
    <div class="faq-item">
      <p class="faq-question">5. How long will Money Plant MLM System run?</p>
      <p class="faq-answer">
        The system will run indefinitely as new users keep joining, offering continuous and unlimited economic opportunities.
      </p>
    </div>
    <!-- 6 -->
    <div class="faq-item">
      <p class="faq-question">6. How do I activate my ID?</p>
      <p class="faq-answer">
        Simply obtain a referral link from your sponsor, deposit 27 USDT, and distribute it across the 18 designated wallet addresses to instantly activate your ID.
      </p>
    </div>
    <!-- 7 -->
    <div class="faq-item">
      <p class="faq-question">7. How do I distribute my funds?</p>
      <p class="faq-answer">
        Distribute 27 USDT across the 18 wallet addresses as defined by the system. The process is fully automated via smart contract for your complete peace of mind.
      </p>
    </div>
    <!-- 8 -->
    <div class="faq-item">
      <p class="faq-question">8. Is Money Plant completely decentralized?</p>
      <p class="faq-answer">
        Absolutely! The system is built on blockchain, ensuring all transactions are completely decentralized and secure.
      </p>
    </div>
    <!-- 9 -->
    <div class="faq-item">
      <p class="faq-question">9. Can the creator run away with funds?</p>
      <p class="faq-answer">
        No. The system is automated by smart contracts, leaving no room for any manipulation of funds.
      </p>
    </div>
    <!-- 10 -->
    <div class="faq-item">
      <p class="faq-question">10. Can a user's money be lost?</p>
      <p class="faq-answer">
        Not at all! With just 3 direct referrals, your full principal of 27 USDT is returned, and additional referrals multiply your earnings rapidly.
      </p>
    </div>
    <!-- 11 -->
    <div class="faq-item">
      <p class="faq-question">11. Can any ID be blocked or restricted?</p>
      <p class="faq-answer">
        No, the decentralized nature of the system ensures every user enjoys equal rights without restrictions.
      </p>
    </div>
    <!-- 12 -->
    <div class="faq-item">
      <p class="faq-question">12. How many direct referrals can one make?</p>
      <p class="faq-answer">
        There is no limit. You can make unlimited direct referrals, which exponentially increases your earning potential.
      </p>
    </div>
    <!-- 13 -->
    <div class="faq-item">
      <p class="faq-question">13. How much income do I get from a direct referral?</p>
      <p class="faq-answer">
        Every direct referral rewards you with 9 USDT. With just 3 referrals, your principal of 27 USDT is automatically returned, and extra referrals multiply your earnings further. 9 USDT is an excellent reward!
      </p>
    </div>
    <!-- 14 -->
    <div class="faq-item">
      <p class="faq-question">14. How much income do I get from indirect referrals and up to what levels?</p>
      <p class="faq-answer">
        For every new user, each of your 15 uplines receives 1 USDT, providing you with continuous income as your team grows.
      </p>
    </div>
    <!-- 15 -->
    <div class="faq-item">
      <p class="faq-question">15. What is the "Quit Me" button?</p>
      <p class="faq-answer">
        The "Quit Me" button is for users who haven’t secured any referrals and wish to exit the system without any loss. It allows you to safely recover your full principal of 27 USDT via the refund pool, which distributes funds daily (capped at 0.27 USDT per day) until you are fully refunded.
      </p>
    </div>
    <!-- 16 -->
    <div class="faq-item">
      <p class="faq-question">16. What is the "Replace Me" button?</p>
      <p class="faq-answer">
        The "Replace Me" button lets users who haven't added any referrals—and who prefer not to receive gradual refunds—sell their ID to a new user. This instantly returns your full principal of 27 USDT, while your direct sponsor remains unchanged.
      </p>
    </div>
    <!-- 17 -->
    <div class="faq-item">
      <p class="faq-question">17. How can I quit and what are the conditions?</p>
      <p class="faq-answer">
        You can quit only if you haven’t secured any referrals. Once you quit, your 27 USDT principal starts being refunded daily (max 0.27 USDT per day) until you receive your full amount.
      </p>
    </div>
    <!-- 18 -->
    <div class="faq-item">
      <p class="faq-question">18. Who can use the "Replace Me" button and what are its conditions?</p>
      <p class="faq-answer">
        Only users without any referrals—and who prefer not to withdraw funds gradually—can use the "Replace Me" button. This option allows you to transfer your ID to a new user by providing their wallet address, instantly reclaiming your full principal while your direct sponsor remains the same.
      </p>
    </div>
    <!-- 19 -->
    <div class="faq-item">
      <p class="faq-question">19. How do I get my principal of 27 USDT back if I secure no referrals?</p>
      <p class="faq-answer">
        If you're unable to secure any referrals, you can either use the "Quit Me" button to receive gradual refunds or use "Replace Me" to instantly reclaim your full principal. This ensures you never suffer a loss.
      </p>
    </div>
    <!-- 20 -->
    <div class="faq-item">
      <p class="faq-question">20. How can I sell my ID if I no longer wish to participate?</p>
      <p class="faq-answer">
        Use the "Replace Me" button to transfer your ID to a new user, instantly receiving your full principal of 27 USDT—a risk-free exit option.
      </p>
    </div>
    <!-- 21 -->
    <div class="faq-item">
      <p class="faq-question">21. How do I copy my referral link?</p>
      <p class="faq-answer">
        When you click the Activate button, you'll see a "Distribute Funds" button. Once you click it, your funds are automatically distributed and that button disappears forever. At the same place, you'll then see a "Copy Referral Link" button and a "Join Telegram" button. Only activated users can copy their referral link, so you must distribute your funds first.
      </p>
    </div>
    <!-- 22 -->
    <div class="faq-item">
      <p class="faq-question">22. How do I add a new user to my team?</p>
      <p class="faq-answer">
        Share your referral link to invite new users, thereby expanding your team and increasing your earning opportunities.
      </p>
    </div>
    <!-- 23 -->
    <div class="faq-item">
      <p class="faq-question">23. Is Money Plant a scam-free project?</p>
      <p class="faq-answer">
        Absolutely! Money Plant is transparent, secure, and fully blockchain-based, ensuring your investment remains safe.
      </p>
    </div>
    <!-- 24 -->
    <div class="faq-item">
      <p class="faq-question">24. Can a user who quits rejoin with a new ID?</p>
      <p class="faq-answer">
        Yes, after quitting, you can easily rejoin with a new referral link and activate a new ID.
      </p>
    </div>
    <!-- 25 -->
    <div class="faq-item">
      <p class="faq-question">25. Can a user who replaces their ID rejoin later?</p>
      <p class="faq-answer">
        Certainly! Even after using the "Replace Me" option, you can rejoin with a new ID and continue enjoying the benefits.
      </p>
    </div>
  </div>
`;

const faqHindi = `
  <div class="faq-container">
    <h2>Money Plant MLM System - FAQ</h2>
    <!-- 1 -->
    <div class="faq-item">
      <p class="faq-question">1. Money Plant MLM System क्या है?</p>
      <p class="faq-answer">
        Money Plant एक पूरी तरह से विकेंद्रीकृत (Decentralized) MLM सिस्टम है जो डोनेशन और डिस्ट्रिब्यूशन पर आधारित है। यहाँ हर यूजर को अपनी ID एक्टिवेट करने का सुनहरा अवसर मिलता है।
      </p>
    </div>
    <!-- 2 -->
    <div class="faq-item">
      <p class="faq-question">2. Money Plant MLM System किस तरह से काम करता है?</p>
      <p class="faq-answer">
        यूजर अपने वॉलेट में 27 USDT जमा करते हैं और निर्धारित 18 वॉलेट एड्रेस पर राशि वितरित करते हैं। इसके बाद उनकी ID सक्रिय हो जाती है और वे अपनी टीम बनाकर कमाई कर सकते हैं।
      </p>
    </div>
    <!-- 3 -->
    <div class="faq-item">
      <p class="faq-question">3. मेरा पैसा कंपनी के पास जाता है या डायरेक्ट यूजर्स के पास?</p>
      <p class="faq-answer">
        आपका पैसा पूरी तरह से यूजर्स के बीच वितरित होता है। केवल एडमिन को मामूली 1 USDT रॉयल्टी के रूप में प्राप्त होता है।
      </p>
    </div>
    <!-- 4 -->
    <div class="faq-item">
      <p class="faq-question">4. एडमिन किसी भी प्रकार का स्कैम या रगपुल क्यों नहीं कर सकता?</p>
      <p class="faq-answer">
        सिस्टम पूरी तरह से स्मार्ट कॉन्ट्रैक्ट और ब्लॉकचेन पर आधारित है, जिससे सभी लेन-देन पारदर्शी और सुरक्षित रहते हैं।
      </p>
    </div>
    <!-- 5 -->
    <div class="faq-item">
      <p class="faq-question">5. Money Plant MLM System कब तक चलेगा?</p>
      <p class="faq-answer">
        यह सिस्टम अनिश्चितकाल तक चल सकता है क्योंकि नए यूजर्स के जुड़ते रहने से यह निरंतर विकसित होता रहता है।
      </p>
    </div>
    <!-- 6 -->
    <div class="faq-item">
      <p class="faq-question">6. मैं अपनी ID एक्टिवेट कैसे कर सकता हूँ?</p>
      <p class="faq-answer">
        अपने स्पॉन्सर से रेफरल लिंक प्राप्त करें, 27 USDT जमा करें और निर्धारित 18 वॉलेट एड्रेस पर राशि वितरित करें। आपकी ID तुरंत एक्टिव हो जाती है।
      </p>
    </div>
    <!-- 7 -->
    <div class="faq-item">
      <p class="faq-question">7. मैं अपना फंड कैसे डिस्ट्रीब्यूट करूँ?</p>
      <p class="faq-answer">
        आपको 27 USDT को 18 वॉलेट एड्रेस पर बांटना होता है। यह प्रक्रिया पूरी तरह से स्मार्ट कॉन्ट्रैक्ट द्वारा संचालित होती है।
      </p>
    </div>
    <!-- 8 -->
    <div class="faq-item">
      <p class="faq-question">8. क्या Money Plant पूरी तरह से विकेंद्रीकृत है?</p>
      <p class="faq-answer">
        बिल्कुल! यह सिस्टम ब्लॉकचेन पर आधारित है और सभी लेन-देन सीधे यूजर्स के बीच होते हैं।
      </p>
    </div>
    <!-- 9 -->
    <div class="faq-item">
      <p class="faq-question">9. क्या क्रिएटर किसी के फंड को लेकर भाग सकता है?</p>
      <p class="faq-answer">
        नहीं, पूरा सिस्टम स्मार्ट कॉन्ट्रैक्ट द्वारा ऑटोमेटेड है, जिससे किसी भी प्रकार की छेड़छाड़ संभव नहीं है।
      </p>
    </div>
    <!-- 10 -->
    <div class="faq-item">
      <p class="faq-question">10. क्या किसी यूजर का पैसा डूब सकता है?</p>
      <p class="faq-answer">
        बिल्कुल नहीं! यदि आप 3 डायरेक्ट रेफरल करते हैं तो आपका मूलधन (27 USDT) वापस मिल जाता है, और अतिरिक्त रेफरल से आपकी कमाई कई गुना बढ़ जाती है।
      </p>
    </div>
    <!-- 11 -->
    <div class="faq-item">
      <p class="faq-question">11. क्या किसी की ID को ब्लॉक या रिस्ट्रिक्ट किया जा सकता है?</p>
      <p class="faq-answer">
        नहीं, यह एक विकेंद्रीकृत सिस्टम है जहाँ हर यूजर को समान अधिकार प्राप्त हैं।
      </p>
    </div>
    <!-- 12 -->
    <div class="faq-item">
      <p class="faq-question">12. कोई यूजर कितना डायरेक्ट रेफरल कर सकता है?</p>
      <p class="faq-answer">
        कोई सीमा नहीं है। आप अनलिमिटेड डायरेक्ट रेफरल कर सकते हैं, जिससे आपकी कमाई के अवसर तेजी से बढ़ते हैं।
      </p>
    </div>
    <!-- 13 -->
    <div class="faq-item">
      <p class="faq-question">13. Direct रेफरल से कितनी इनकम होती है?</p>
      <p class="faq-answer">
        हर डायरेक्ट रेफरल से आपको 9 USDT प्राप्त होती है। 3 रेफरल करने से आपका 27 USDT मूलधन स्वतः वापस हो जाता है, और अधिक रेफरल करने से आपकी कमाई तेजी से कई गुना बढ़ जाती है।
      </p>
    </div>
    <!-- 14 -->
    <div class="faq-item">
      <p class="faq-question">14. InDirect रेफरल से कितने लेवल तक इनकम मिलेगी और कितनी?</p>
      <p class="faq-answer">
        आपके 15 अपलाइन में से हर एक को 1 USDT प्राप्त होती है, जिससे आपकी टीम बढ़ने पर निरंतर आय प्राप्त होती रहती है।
      </p>
    </div>
    <!-- 15 -->
    <div class="faq-item">
      <p class="faq-question">15. Quit Me बटन क्या है?</p>
      <p class="faq-answer">
        यह बटन उन यूजर्स के लिए है जो एक भी रेफरल नहीं जोड़ पाते और बिना किसी नुकसान के सिस्टम से बाहर निकलना चाहते हैं। इससे आप अपना पूरा 27 USDT मूलधन सुरक्षित रूप से refund pool से (रोजाना अधिकतम 0.27 USDT) वापस प्राप्त कर सकते हैं।
      </p>
    </div>
    <!-- 16 -->
    <div class="faq-item">
      <p class="faq-question">16. Replace Me बटन क्या है?</p>
      <p class="faq-answer">
        यदि कोई यूजर 1 भी रेफरल नहीं जोड़ पाता और धीरे-धीरे रिफंड लेना पसंद नहीं करता, तो वह Replace Me बटन का उपयोग कर सकता है। इससे वह अपनी ID किसी नए यूजर को बेचकर तुरंत अपना 27 USDT मूलधन वापस पा लेता है, और आपका direct sponsor वैसा ही रहता है।
      </p>
    </div>
    <!-- 17 -->
    <div class="faq-item">
      <p class="faq-question">17. किस तरह से quit किया जा सकता है और इसकी क्या शर्तें हैं?</p>
      <p class="faq-answer">
        यदि आपने कोई रेफरल नहीं जोड़ा है, तभी आप Quit Me बटन का उपयोग कर सकते हैं। एक बार quit करने के बाद, आपका 27 USDT मूलधन रोज (अधिकतम 0.27 USDT/24 घंटे) के हिसाब से refund pool से वापस मिलता रहता है।
      </p>
    </div>
    <!-- 18 -->
    <div class="faq-item">
      <p class="faq-question">18. Replace Me बटन कौन उपयोग कर सकता है और इसकी क्या शर्तें हैं?</p>
      <p class="faq-answer">
        केवल वही यूजर जिनके नीचे कोई रेफरल नहीं है और जो धीरे-धीरे रिफंड नहीं लेना चाहते, Replace Me का उपयोग कर सकते हैं। इससे आप अपनी ID नए यूजर को ट्रांसफर कर तुरंत अपना 27 USDT मूलधन वापस प्राप्त कर सकते हैं।
      </p>
    </div>
    <!-- 19 -->
    <div class="faq-item">
      <p class="faq-question">19. यदि मैं एक भी रेफरल नहीं जोड़ पाता हूँ तो मेरा मूलधन 27 USDT कैसे वापस मिलेगा?</p>
      <p class="faq-answer">
        यदि आप रेफरल नहीं जोड़ पाते, तो आपके पास दो विकल्प हैं: Quit Me का उपयोग कर धीरे-धीरे refund pool से अपना मूलधन प्राप्त करें, या Replace Me का उपयोग कर तुरंत अपना पूरा 27 USDT वापस लें। इससे आपको कभी भी नुकसान नहीं होगा।
      </p>
    </div>
    <!-- 20 -->
    <div class="faq-item">
      <p class="faq-question">20. यदि मैं Money Plant में काम नहीं करना चाहता तो अपनी ID कैसे बेच सकता हूँ?</p>
      <p class="faq-answer">
        आप Replace Me बटन का उपयोग करके अपनी ID को किसी नए यूजर को ट्रांसफर कर सकते हैं, जिससे आपको तुरंत अपना 27 USDT मूलधन वापस मिल जाता है।
      </p>
    </div>
    <!-- 21 -->
    <div class="faq-item">
      <p class="faq-question">21. अपना रेफरल लिंक कैसे कॉपी करें?</p>
      <p class="faq-answer">
        जब आप Activate बटन पर क्लिक करते हैं तो आपको "Distribute Funds" बटन दिखेगा। इस बटन को क्लिक करने के बाद आपका फंड ऑटोमैटिकली डिस्ट्रीब्यूट हो जाता है और वह बटन हमेशा के लिए गायब हो जाता है। उसी जगह पर आपको "Copy Referral Link" और "Join Telegram" के बटन दिखाई देते हैं। केवल Activated यूजर ही अपना रेफरल लिंक कॉपी कर सकते हैं, इसलिए पहले फंड डिस्ट्रीब्यूट करना जरूरी है।
      </p>
    </div>
    <!-- 22 -->
    <div class="faq-item">
      <p class="faq-question">22. किसी नए यूजर को अपनी टीम में कैसे जोड़ें?</p>
      <p class="faq-answer">
        अपने रेफरल लिंक को शेयर करें और नए यूजर्स को शामिल करके अपनी टीम को बढ़ाएँ, जिससे आपकी कमाई के अवसर बढ़ते हैं।
      </p>
    </div>
    <!-- 23 -->
    <div class="faq-item">
      <p class="faq-question">23. क्या Money Plant एक स्कैम-फ्री प्रोजेक्ट है?</p>
      <p class="faq-answer">
        जी हाँ, यह एक पारदर्शी, सुरक्षित और पूरी तरह से ब्लॉकचेन आधारित प्रोजेक्ट है, जिससे आपका निवेश हमेशा सुरक्षित रहता है।
      </p>
    </div>
    <!-- 24 -->
    <div class="faq-item">
      <p class="faq-question">24. क्या जिसने Quit कर लिया है वह दुबारा अपनी नई ID बना सकता है?</p>
      <p class="faq-answer">
        बिल्कुल, Quit करने के बाद आप आसानी से नए रेफरल लिंक के साथ अपनी नई ID बना सकते हैं।
      </p>
    </div>
    <!-- 25 -->
    <div class="faq-item">
      <p class="faq-question">25. क्या जिसने खुद को Replace कर लिया है वह दुबारा अपनी नई ID बना सकता है?</p>
      <p class="faq-answer">
        हाँ, Replace Me के उपयोग के बाद भी आप नई ID के साथ फिर से जुड़ सकते हैं और नए अवसरों का लाभ उठा सकते हैं।
      </p>
    </div>
  </div>
`;

    // Set default language to English
    let currentLanguage = "en";
    document.getElementById("faqContainer").innerHTML =
      currentLanguage === "en" ? faqEnglish : faqHindi;

    // Language Toggle Functionality
    document.getElementById("languageBtn").addEventListener("click", function () {
      // Toggle language
      currentLanguage = currentLanguage === "en" ? "hi" : "en";
      
      // Update welcome text
      document.getElementById("welcomeText").innerHTML =
        currentLanguage === "en" ? englishWelcomeText : hindiWelcomeText;
      
      // Update language button text
      document.getElementById("languageBtn").textContent =
        currentLanguage === "en" ? "English / हिंदी" : "हिंदी / English";
      
      // Update FAQ container content
      document.getElementById("faqContainer").innerHTML =
        currentLanguage === "en" ? faqEnglish : faqHindi;
      
      // Reattach toggle functionality for FAQ items
      document.querySelectorAll(".faq-question").forEach(function (item) {
        item.addEventListener("click", function () {
          const answer = this.nextElementSibling;
          answer.style.display =
            answer.style.display === "block" ? "none" : "block";
        });
      });
    });

    // Attach toggle functionality on initial load for FAQ items
    document.querySelectorAll(".faq-question").forEach(function (item) {
      item.addEventListener("click", function () {
        const answer = this.nextElementSibling;
        answer.style.display =
          answer.style.display === "block" ? "none" : "block";
      });
    });

    // Note: Other functions like loadUplines, loadTeamLevels, distributeFunds, copyReferral, openReplaceModal, replaceUser, handleQuit are assumed to be defined below or in this file.
    
    // Dummy impl
