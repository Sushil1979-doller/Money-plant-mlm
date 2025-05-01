// plan.js — dynamically injects Plan modal, styles, language toggle, copy functionality, and the "View Plan" button into the download links

// 1. Inject CSS dynamically
(function() {
  const style = document.createElement('style');
  style.textContent = `
    /* Plan Modal Styles */
    .modal { display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.6); z-index:10000; }
    .plan-modal-content { max-width:800px; margin:5% auto; background:#fff; padding:2rem; border-radius:12px; font-family:'Segoe UI',sans-serif; line-height:1.6; position:relative; }
    .plan-modal-content h2 { color:#2e7d32; text-align:center; margin-bottom:1rem; }
    .plan-modal-content ul, .plan-modal-content ol { padding-left:1.2rem; margin-bottom:1rem; }
    .plan-modal-content li { margin-bottom:0.75rem; }
    .plan-modal-content p { margin-bottom:1rem; }
    .plan-modal-footer { display:flex; justify-content:space-between; margin-top:1.5rem; flex-wrap:wrap; gap:0.5rem; }
    .plan-btn { padding:0.5rem 1rem; font-weight:bold; border:none; border-radius:5px; cursor:pointer; }
    .lang-btn { background-color:#1976d2; color:white; }
    .copy-btn { background-color:#388e3c; color:white; }
    .close-btn { background-color:#d32f2f; color:white; position:absolute; top:1rem; right:1rem; font-size:1.2rem; line-height:1; width:2rem; height:2rem; text-align:center; border-radius:50%; }
    /* Inherit download-links <a> styling for viewPlanBtn */
    .download-links a { padding:20px 30px; border-radius:50px; text-decoration:none; color:white; font-size:18px; font-weight:bold; background:brown; }
    @media (max-width:600px) {
      .plan-modal-content { padding:1rem; margin:10% auto; }
      .plan-modal-footer { flex-direction:column; }
    }
  `;
  document.head.appendChild(style);
})();

// 2. Inject Plan Modal HTML
(function() {
  const modalHTML = `
    <div id="planModal" class="modal">
      <div class="plan-modal-content">
        <button class="close-btn" onclick="closeModal()">&times;</button>
        <div id="planContent"></div>
        <div class="plan-modal-footer">
          <button class="plan-btn lang-btn" id="planLangBtn">हिंदी</button>
          <button class="plan-btn copy-btn" id="copyPlanBtn">Copy Plan</button>
          <button class="plan-btn close-btn" onclick="closeModal()">Close</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
})();

// 3. Detailed Plan Content
const planContent = {
  en: `
    <h2>🌿 Money Plant Plan</h2>
    <h3>Introduction</h3>
    <p>Money Plant is a revolutionary, fully decentralized MLM system built on blockchain. Every 27 USDT you invest is transparently distributed via smart contracts, ensuring zero intermediaries and complete trust.</p>
    <h3>Objectives</h3>
    <ul>
      <li><b>Scam Prevention:</b> Eliminate fraud by peer-to-peer fund distribution.</li>
      <li><b>Stable Income:</b> Generate sustainable earnings for you and your network across generations.</li>
      <li><b>Financial Freedom:</b> Empower yourself with transparent, self-governed income opportunities.</li>
    </ul>
    <h3>Distribution (27 USDT)</h3>
    <ul>
      <li><b>9 USDT → Direct Sponsor:</b> Reward your direct upline for guiding you.</li>
      <li><b>1 USDT × 15 Uplines:</b> Earn level income by supporting higher tiers in your network.</li>
      <li><b>2 USDT → Refund Pool:</b> Secure capital return options for participants.</li>
      <li><b>1 USDT → Admin:</b> Cover platform maintenance and incentivize upgrades.</li>
    </ul>
    <h3>Income & Tree Structure</h3>
    <p>Earn 9 USDT instantly for each direct referral, plus 1 USDT from up to 16 levels of indirect referrals as your network expands.</p>
    <h3>Capital Return Options</h3>
    <ol>
      <li><b>Add Free Partner:</b> Invite a partner at no cost to boost team activity; profits shared 50/50; replace if inactive for 30 days.</li>
      <li><b>Replace Me:</b> Transfer your ID for 27 USDT to a new user; instantly recover your full capital.</li>
      <li><b>Quit Me:</b> Withdraw up to 0.27 USDT daily from the refund pool until your 27 USDT is fully returned.</li>
    </ol>
    <h3>Why Money Plant?</h3>
    <ul>
      <li><b>100% Transparent:</b> Smart contracts automate all distributions.</li>
      <li><b>Decentralized:</b> Community-driven growth without central authority.</li>
      <li><b>Unlimited Potential:</b> Build a vast network for exponential income.</li>
    </ul>
  `,
  hi: `
    <h2>🌿 मनी प्लांट प्लान</h2>
    <h3>परिचय</h3>
    <p>Money Plant एक क्रांतिकारी, पूर्ण विकेंद्रीकृत MLM सिस्टम है जो ब्लॉकचेन पर आधारित है। आपके 27 USDT का प्रत्येक निवेश स्मार्ट कॉन्ट्रैक्ट के माध्यम से पारदर्शी रूप से वितरित होता है, बिना किसी मध्यस्थ के।</p>
    <h3>उद्देश्य</h3>
    <ul>
      <li><b>घोटाला रोकथाम:</b> दो पक्षों के बीच सीधे फंड ट्रांसफर से धोखाधड़ी खत्म करें।</li>
      <li><b>स्थिर आय:</b> आप और आपकी टीम के लिए पीढ़ी-दर-पीढ़ी कमाई सुनिश्चित करें।</li>
      <li><b>आर्थिक स्वतंत्रता:</b> पारदर्शी और स्वयं-शासित आय के अवसर प्रदान करें।</li>
    </ul>
    <h3>वितरण (27 USDT)</h3>
    <ul>
      <li><b>9 USDT → डायरेक्ट स्पॉन्सर:</b> आपके मार्गदर्शन के लिए डायरेक्ट अपलाइन को पुरस्कृत करें।</li>
      <li><b>1 USDT × 15 उप्लाइन:</b> अपने नेटवर्क के ऊपरी स्तरों का समर्थन करके लेवल आय प्राप्त करें।</li>
      <li><b>2 USDT → रिफंड पूल:</b> प्रतिभागियों के लिए मूलधन वापसी के विकल्प सुरक्षित करें।</li>
      <li><b>1 USDT → एडमिन:</b> प्लेटफ़ॉर्म रखरखाव और उन्नयन के लिए प्रोत्साहन।</li>
    </ul>
    <h3>इनकम & ट्री स्ट्रक्चर</h3>
    <p>प्रत्येक डायरेक्ट रेफरल पर आप 9 USDT तुरंत कमाते हैं, और नेटवर्क बढ़ने पर 16 स्तरों तक अप्रत्यक्ष रेफरल से 1 USDT प्राप्त होता है।</p>
    <h3>मूलधन वापसी के विकल्प</h3>
    <ol>
      <li><b>एड फ्री पार्टनर:</b> टीम गतिविधि बढ़ाने के लिए मुफ्त पार्टनर जोड़ें; 50/50 लाभ साझा; 30 दिन inactivity पर बदलाव करें।</li>
      <li><b>रिप्लेस मी:</b> अपनी ID 27 USDT में नई यूज़र को ट्रांसफर करें; पूरा मूलधन तुरंत वापस पाएं।</li>
      <li><b>क्विट मी:</b> रिफंड पूल से दैनिक 0.27 USDT तक निकासी करें जब तक आपका 27 USDT पूर्ण रूप से वापस न हो जाए।</li>
    </ol>
    <h3>क्यों Money Plant?</h3>
    <ul>
      <li><b>100% पारदर्शी:</b> स्मार्ट कॉन्ट्रैक्ट स्वचालित रूप से सभी वितरण करता है।</li>
      <li><b>विकेंद्रीकृत:</b> केंद्रीय सत्ता के बिना समुदाय संचालित विकास।</li>
      <li><b>असीमित क्षमता:</b> व्यापक नेटवर्क बनाकर चरम सीमा तक आय बढ़ाएं।</li>
    </ul>
  `
};

// Plain-text fallback for clipboard copy
const planText = {
  en: planContent.en.replace(/<[^>]+>/g, '').trim(),
  hi: planContent.hi.replace(/<[^>]+>/g, '').trim()
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
  navigator.clipboard.writeText(planText[planLang]);
  alert(planLang === 'en' ? 'Plan copied to clipboard!' : 'प्लान क्लिपबोर्ड में कॉपी हो गया!');
}

// 4. Inject "View Plan" link into .download-links and attach click
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.download-links');
    if (container && !document.getElementById('viewPlanBtn')) {
      const viewBtn = document.createElement('a');
      viewBtn.id = 'viewPlanBtn';
      viewBtn.href = '#';
      viewBtn.textContent = planLang === 'en' ? 'View Plan' : 'प्लान देखें';
      // Insert before other links
      container.insertBefore(viewBtn, container.firstChild);
      // Attach listener to open modal
      viewBtn.addEventListener('click', e => {
        e.preventDefault();
        openModal('planModal');
        renderPlan();
      });
    }
    // Attach modal button events
    document.getElementById('planLangBtn').addEventListener('click', togglePlanLang);
    document.getElementById('copyPlanBtn').addEventListener('click', copyPlan);
  });
})();


अब plan.js में:

.download-links के अंदर “View Plan” लिंक को अपने आप जोड़ दिया जाता है, बटन ब्राउन <a> स्टाइल में दिखेगा और डाउनलोड लिंक जैसा ही रहेगा।

यह लिंक Income/Refund History से पहले सेट होगा।

क्लिक पर प्लान मिडल खुलेगा, बिना कोई HTML बदलाव किए।


बस यह फाइल सेव करें और रिफ्रेश (Ctrl+F5) कीजिए — सब अपने आप काम करना शुरु हो जाएगा।

