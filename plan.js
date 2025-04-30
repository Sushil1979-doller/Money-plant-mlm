// plan.js — handles Plan modal display, language toggle, and copy function

// HTML content for the Plan in both languages
const planContent = {
  en: `
    <h2>🌿 Money Plant Plan</h2>
    <h3>Introduction</h3>
    <p>Money Plant MLM System is a fully decentralized, blockchain-based project where your 27 USDT is distributed directly user-to-user via a verified smart contract, ensuring complete transparency and no middlemen.</p>
    <h3>Objectives</h3>
    <ul>
      <li>Eliminate traditional scams in MLM</li>
      <li>Provide generation-to-generation income</li>
      <li>Empower financial freedom with trust</li>
    </ul>
    <h3>Distribution (27 USDT)</h3>
    <ul>
      <li>9 USDT → Direct Sponsor</li>
      <li>1 USDT × 15 uplines → Level income</li>
      <li>2 USDT → Refund Pool</li>
      <li>1 USDT → Admin (Creator royalty)</li>
    </ul>
    <h3>Income &amp; Tree Structure</h3>
    <p>You earn 9 USDT per direct referral, and 1 USDT on up to 16 levels of indirect referrals.</p>
    <h3>Capital Return Options</h3>
    <ol>
      <li><b>Add Free Partner</b>: Add one free partner to grow your team; 50/50 profit share; removable if inactive for 30 days.</li>
      <li><b>Replace Me</b>: Transfer your ID for 27 USDT to a new user; full return of capital.</li>
      <li><b>Quit Me</b>: Withdraw up to 0.27 USDT daily from the refund pool until your 27 USDT is fully returned.</li>
    </ol>
    <h3>Why Money Plant?</h3>
    <ul>
      <li>100% Scam-Free &amp; Decentralized</li>
      <li>Smart Contract–Automated Distribution</li>
      <li>Unlimited Growth with Three Easy Options</li>
    </ul>
  `,
  hi: `
    <h2>🌿 मनी प्लांट प्लान</h2>
    <h3>परिचय</h3>
    <p>Money Plant MLM सिस्टम एक पूर्ण रूप से विकेंद्रीकृत, ब्लॉकचेन-आधारित प्रोजेक्ट है जहाँ आपका 27 USDT सत्यापित स्मार्ट कॉन्ट्रैक्ट के माध्यम से सीधे यूज़र-टू-यूज़र वितरित होता है, जिससे पूर्ण पारदर्शिता और कोई मध्यस्थ नहीं।</p>
    <h3>उद्देश्य</h3>
    <ul>
      <li>परंपरागत MLM घोटालों को समाप्त करना</li>
      <li>पीढ़ी-दर-पीढ़ी निरंतर आय प्रदान करना</li>
      <li>विश्वास के साथ आर्थिक आज़ादी सशक्त करना</li>
    </ul>
    <h3>वितरण (27 USDT)</h3>
    <ul>
      <li>9 USDT → डायरेक्ट स्पॉन्सर</li>
      <li>1 USDT × 15 उप्लाइन → लेवल आय</li>
      <li>2 USDT → रिफंड पूल</li>
      <li>1 USDT → एडमिन (क्रिएटर रॉयल्टी)</li>
    </ul>
    <h3>इनकम &amp; ट्री स्ट्रक्चर</h3>
    <p>आप प्रत्येक डायरेक्ट रेफरल पर 9 USDT और 16 स्तरों तक अप्रत्यक्ष रेफरल पर 1 USDT कमाते हैं।</p>
    <h3>मूलधन वापसी के विकल्प</h3>
    <ol>
      <li><b>एड फ्री पार्टनर</b>: एक मुफ्त पार्टनर जोड़ें; 50/50 लाभ साझा; 30 दिन inactivity पर हटाएँ।</li>
      <li><b>रिप्लेस मी</b>: नई यूज़र को 27 USDT में अपनी ID ट्रांसफ़र करें; पूरा मूलधन प्राप्त करें।</li>
      <li><b>क्विट मी</b>: रिफंड पूल से दैनिक 0.27 USDT तक निकासी जब तक 27 USDT पूर्ण न हो जाए।</li>
    </ol>
    <h3>क्यों Money Plant?</h3>
    <ul>
      <li>100% Scam-Free और विकेंद्रीकृत</li>
      <li>स्मार्ट कॉन्ट्रैक्ट–स्वचालित वितरण</li>
      <li>तीन आसान विकल्पों के साथ असीमित विकास</li>
    </ul>
  `
};

// Plain-text fallback for clipboard copy
const planText = {
  en: `
🌿 Money Plant Plan

Introduction:
Money Plant MLM System is a fully decentralized, blockchain-based project where your 27 USDT is distributed directly user-to-user via a verified smart contract, ensuring complete transparency and no middlemen.

Objectives:
- Eliminate traditional scams in MLM
- Provide generation-to-generation income
- Empower financial freedom with trust

Distribution (27 USDT):
- 9 USDT → Direct Sponsor
- 1 USDT × 15 uplines → Level income
- 2 USDT → Refund Pool
- 1 USDT → Admin (Creator royalty)

Income & Tree Structure:
You earn 9 USDT per direct referral, and 1 USDT on up to 16 levels of indirect referrals.

Capital Return Options:
1. Add Free Partner: Add one free partner to grow your team; 50/50 profit share; removable if inactive for 30 days.
2. Replace Me: Transfer your ID for 27 USDT to a new user; full return of capital.
3. Quit Me: Withdraw up to 0.27 USDT daily from the refund pool until your 27 USDT is fully returned.

Why Money Plant?
- 100% Scam-Free & Decentralized
- Smart Contract–Automated Distribution
- Unlimited Growth with Three Easy Options
  `,
  hi: `
🌿 मनी प्लांट प्लान

परिचय:
Money Plant MLM सिस्टम एक पूर्ण रूप से विकेंद्रीकृत, ब्लॉकचेन-आधारित प्रोजेक्ट है जहाँ आपका 27 USDT सत्यापित स्मार्ट कॉन्ट्रैक्ट के माध्यम से सीधे यूज़र-टू-यूज़र वितरित होता है, जिससे पूर्ण पारदर्शिता और कोई मध्यस्थ नहीं।

उद्देश्य:
- परंपरागत MLM घोटालों को समाप्त करना
- पीढ़ी-दर-पीढ़ी निरंतर आय प्रदान करना
- विश्वास के साथ आर्थिक आज़ादी सशक्त करना

वितरण (27 USDT):
- 9 USDT → डायरेक्ट स्पॉन्सर
- 1 USDT × 15 उप्लाइन → लेवल आय
- 2 USDT → रिफंड पूल
- 1 USDT → एडमिन (क्रिएटर रॉयल्टी)

इनकम & ट्री स्ट्रक्चर:
आप प्रत्येक डायरेक्ट रेफरल पर 9 USDT और 16 स्तरों तक अप्रत्यक्ष रेफरल पर 1 USDT कमाते हैं।

मूलधन वापसी के विकल्प:
1. एड फ्री पार्टनर: एक मुफ्त पार्टनर जोड़ें; 50/50 लाभ साझा; 30 दिन inactivity पर हटाएँ।
2. रिप्लेस मी: नई यूज़र को 27 USDT में अपनी ID ट्रांसफ़र करें; पूरा मूलधन प्राप्त करें।
3. क्विट मी: रिफंड पूल से दैनिक 0.27 USDT तक निकासी जब तक 27 USDT पूर्ण न हो जाए।

क्यों Money Plant?
- 100% Scam-Free और विकेंद्रीकृत
- स्मार्ट कॉन्ट्रैक्ट–स्वचालित वितरण
- तीन आसान विकल्पों के साथ असीमित विकास
  `
};

let planLang = 'en';

function renderPlan() {
  document.getElementById('planContent').innerHTML = planContent[planLang];
  document.getElementById('planLangBtn').textContent = planLang === 'en' ? 'हिंदी' : 'English';
}

function togglePlanLang() {
  planLang = planLang === 'en' ? 'hi' : 'en';
  renderPlan();
}

function copyPlan() {
  navigator.clipboard.writeText(planText[planLang].trim());
  alert(planLang === 'en' ? 'Plan copied!' : 'प्लान कॉपी हो गया!');
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('viewPlanBtn').addEventListener('click', () => {
    openModal('planModal');
    renderPlan();
  });
  document.getElementById('planLangBtn').addEventListener('click', togglePlanLang);
  document.getElementById('copyPlanBtn').addEventListener('click', copyPlan);
});
