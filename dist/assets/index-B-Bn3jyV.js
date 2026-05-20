(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const Q=["home","flashcard","quiz","spelling","stats"];let $={};function G(e){$=e,window.addEventListener("hashchange",V);const t=window.location.hash.slice(1)||"home";H(t)}function V(){const e=window.location.hash.slice(1)||"home";H(e)}function H(e){Q.forEach(t=>{const a=document.getElementById(`page-${t}`);a&&(a.style.display=t===e?"block":"none")}),$[e]&&$[e]()}function d(e){window.location.hash=`#${e}`}const O="ielts-vocab-state";let r;const M={words:{},progress:{flashcard:{index:0},quiz:{index:0},spelling:{index:0}},stats:{days:{},streak:0,lastStudyDate:null}};function Y(){try{const e=localStorage.getItem(O);r=JSON.parse(e||JSON.stringify(M))}catch{r=JSON.parse(JSON.stringify(M))}}function L(){localStorage.setItem(O,JSON.stringify(r))}function X(){return r}function j(e){return r.words[e]||(r.words[e]={mastery:0,reviewAt:null,mistakes:0}),r.words[e]}function Z(e,t){const a=j(e);Object.assign(a,t),L()}function E(e){return r.progress[e]}function w(e,t){r.progress[e].index=t,L()}function z(e,t){const a=new Date().toISOString().slice(0,10);if(r.stats.days[a]||(r.stats.days[a]={learned:0,correct:0}),r.stats.days[a].learned++,t&&r.stats.days[a].correct++,r.stats.lastStudyDate!==a){const n=new Date(Date.now()-864e5).toISOString().slice(0,10);r.stats.lastStudyDate===n?r.stats.streak++:r.stats.lastStudyDate!==a&&(r.stats.streak=1),r.stats.lastStudyDate=a}L()}function ee(){const e=new Date().toISOString().slice(0,10);return r.stats.days[e]||{learned:0,correct:0}}function te(){return r.stats.streak}function P(){return Object.values(r.words).filter(e=>e.mastery>=2).length}function T(e,t){return`
    <div class="progress-bar">
      <div class="progress-bar__fill" style="width:${t>0?Math.round(e/t*100):0}%"></div>
      <span class="progress-bar__text">${e} / ${t}</span>
    </div>
  `}function ae(e,t){const n=2*Math.PI*54,s=n-e/100*n;return`
    <svg class="progress-ring" viewBox="0 0 120 120">
      <circle class="progress-ring__bg" cx="60" cy="60" r="54"
        fill="none" stroke="#E8E8E0" stroke-width="8"/>
      <circle class="progress-ring__fg" cx="60" cy="60" r="54"
        fill="none" stroke="#4CAF50" stroke-width="8" stroke-linecap="round"
        stroke-dasharray="${n}" stroke-dashoffset="${s}"
        transform="rotate(-90 60 60)" style="transition: stroke-dashoffset 0.6s ease"/>
      <text class="progress-ring__pct" x="60" y="56" text-anchor="middle"
        fill="#4A4A4A" font-size="22" font-weight="700">${Math.round(e)}%</text>
      <text class="progress-ring__label" x="60" y="76" text-anchor="middle"
        fill="#8A8A80" font-size="12">${t}</text>
    </svg>
  `}const c=[{word:"abandon",phonetic:"/əˈbændən/",meaning:"放弃；抛弃",example:"He abandoned the plan.",example_cn:"他放弃了这个计划。"},{word:"abstract",phonetic:"/ˈæbstrækt/",meaning:"抽象的；摘要",example:"The concept is abstract.",example_cn:"这个概念很抽象。"},{word:"academy",phonetic:"/əˈkædəmi/",meaning:"学院；学会",example:"She studied at the Royal Academy.",example_cn:"她在皇家学院学习。"},{word:"access",phonetic:"/ˈækses/",meaning:"通道；访问；获取",example:"Students have access to the library.",example_cn:"学生可以使用图书馆。"},{word:"accommodate",phonetic:"/əˈkɒmədeɪt/",meaning:"容纳；提供住宿；适应",example:"The hotel can accommodate 200 guests.",example_cn:"酒店可容纳200位客人。"},{word:"accompany",phonetic:"/əˈkʌmpəni/",meaning:"陪伴；伴随",example:"She accompanied me to the station.",example_cn:"她陪我去车站。"},{word:"accomplish",phonetic:"/əˈkʌmplɪʃ/",meaning:"完成；实现",example:"We accomplished our goal.",example_cn:"我们实现了目标。"},{word:"accumulate",phonetic:"/əˈkjuːmjəleɪt/",meaning:"积累；积聚",example:"Dust accumulates quickly.",example_cn:"灰尘很快积聚。"},{word:"accurate",phonetic:"/ˈækjərət/",meaning:"准确的；精确的",example:"The data is accurate.",example_cn:"数据是准确的。"},{word:"achieve",phonetic:"/əˈtʃiːv/",meaning:"达到；取得",example:"She achieved her dream.",example_cn:"她实现了梦想。"},{word:"acknowledge",phonetic:"/əkˈnɒlɪdʒ/",meaning:"承认；确认",example:"He acknowledged his mistake.",example_cn:"他承认了错误。"},{word:"acquire",phonetic:"/əˈkwaɪər/",meaning:"获得；习得",example:"She acquired new skills.",example_cn:"她获得了新技能。"},{word:"adapt",phonetic:"/əˈdæpt/",meaning:"适应；改编",example:"Animals adapt to their environment.",example_cn:"动物适应环境。"},{word:"adequate",phonetic:"/ˈædɪkwət/",meaning:"足够的；适当的",example:"The supply is adequate.",example_cn:"供应是足够的。"},{word:"adjust",phonetic:"/əˈdʒʌst/",meaning:"调整；适应",example:"Adjust the seat height.",example_cn:"调整座椅高度。"},{word:"administration",phonetic:"/ədˌmɪnɪˈstreɪʃn/",meaning:"管理；行政",example:"The administration made the decision.",example_cn:"管理层做了决定。"},{word:"adolescent",phonetic:"/ˌædəˈlesnt/",meaning:"青少年",example:"The program targets adolescents.",example_cn:"该项目针对青少年。"},{word:"advocate",phonetic:"/ˈædvəkeɪt/",meaning:"倡导；提倡",example:"She advocates for animal rights.",example_cn:"她倡导动物权利。"},{word:"affect",phonetic:"/əˈfekt/",meaning:"影响；感动",example:"The weather affects crops.",example_cn:"天气影响庄稼。"},{word:"aggregate",phonetic:"/ˈæɡrɪɡət/",meaning:"总计；集合",example:"The aggregate score was 85.",example_cn:"总分为85。"},{word:"aid",phonetic:"/eɪd/",meaning:"援助；帮助",example:"First aid is essential.",example_cn:"急救是必要的。"},{word:"allocate",phonetic:"/ˈæləkeɪt/",meaning:"分配；拨出",example:"Funds were allocated for research.",example_cn:"资金被分配给研究。"},{word:"alter",phonetic:"/ˈɔːltər/",meaning:"改变；修改",example:"He altered the document.",example_cn:"他修改了文件。"},{word:"alternative",phonetic:"/ɔːlˈtɜːnətɪv/",meaning:"替代的；替代方案",example:"We need an alternative plan.",example_cn:"我们需要备选方案。"},{word:"ambiguous",phonetic:"/æmˈbɪɡjuəs/",meaning:"模棱两可的",example:"The statement was ambiguous.",example_cn:"该声明模棱两可。"},{word:"amend",phonetic:"/əˈmend/",meaning:"修改；修订",example:"The law was amended.",example_cn:"法律被修订了。"},{word:"analogy",phonetic:"/əˈnælədʒi/",meaning:"类比；比喻",example:"She used an analogy to explain.",example_cn:"她用类比来解释。"},{word:"analyse",phonetic:"/ˈænəlaɪz/",meaning:"分析",example:"We need to analyse the data.",example_cn:"我们需要分析数据。"},{word:"ancestor",phonetic:"/ˈænsestər/",meaning:"祖先；祖宗",example:"Our ancestors lived here.",example_cn:"我们的祖先住在这里。"},{word:"annual",phonetic:"/ˈænjuəl/",meaning:"年度的；每年的",example:"The annual report is published.",example_cn:"年度报告已发布。"},{word:"anticipate",phonetic:"/ænˈtɪsɪpeɪt/",meaning:"预期；期望",example:"We anticipate growth next year.",example_cn:"我们预计明年增长。"},{word:"apparent",phonetic:"/əˈpærənt/",meaning:"明显的；表面上的",example:"The reason was apparent.",example_cn:"原因很明显。"},{word:"append",phonetic:"/əˈpend/",meaning:"附加；添加",example:"Please append your signature.",example_cn:"请附上你的签名。"},{word:"appreciate",phonetic:"/əˈpriːʃieɪt/",meaning:"欣赏；感激；升值",example:"I appreciate your help.",example_cn:"我感激你的帮助。"},{word:"approach",phonetic:"/əˈprəʊtʃ/",meaning:"方法；靠近",example:"Try a different approach.",example_cn:"尝试不同的方法。"},{word:"appropriate",phonetic:"/əˈprəʊpriət/",meaning:"适当的；合适的",example:"Wear appropriate clothing.",example_cn:"穿合适的衣服。"},{word:"approximate",phonetic:"/əˈprɒksɪmət/",meaning:"大约的；近似的",example:"The approximate cost is $100.",example_cn:"大约花费100美元。"},{word:"arbitrary",phonetic:"/ˈɑːbɪtrəri/",meaning:"任意的；武断的",example:"The decision seemed arbitrary.",example_cn:"这个决定似乎很武断。"},{word:"area",phonetic:"/ˈeəriə/",meaning:"地区；领域；面积",example:"The area is rural.",example_cn:"该地区是农村。"},{word:"aspect",phonetic:"/ˈæspekt/",meaning:"方面；层面",example:"Consider every aspect.",example_cn:"考虑每个方面。"},{word:"assemble",phonetic:"/əˈsembl/",meaning:"集合；组装",example:"We assembled the furniture.",example_cn:"我们组装了家具。"},{word:"assess",phonetic:"/əˈses/",meaning:"评估；评定",example:"Teachers assess students' work.",example_cn:"老师评估学生的作业。"},{word:"assign",phonetic:"/əˈsaɪn/",meaning:"分配；指派",example:"He was assigned a new task.",example_cn:"他被分配了新任务。"},{word:"assist",phonetic:"/əˈsɪst/",meaning:"帮助；协助",example:"Can I assist you?",example_cn:"我能帮你吗？"},{word:"assume",phonetic:"/əˈsjuːm/",meaning:"假设；承担",example:"Don't assume the worst.",example_cn:"别假设最坏的情况。"},{word:"assure",phonetic:"/əˈʃʊər/",meaning:"保证；使确信",example:"I assure you it's safe.",example_cn:"我向你保证它是安全的。"},{word:"attach",phonetic:"/əˈtætʃ/",meaning:"附上；系上",example:"Attach the file to the email.",example_cn:"把文件附加到邮件。"},{word:"attain",phonetic:"/əˈteɪn/",meaning:"达到；获得",example:"She attained a high rank.",example_cn:"她获得高等级。"},{word:"attitude",phonetic:"/ˈætɪtjuːd/",meaning:"态度；看法",example:"A positive attitude helps.",example_cn:"积极的态度有帮助。"},{word:"attribute",phonetic:"/əˈtrɪbjuːt/",meaning:"属性；归因于",example:"She attributes her success to hard work.",example_cn:"她把成功归因于努力。"}];function se(){const e=document.getElementById("page-home"),t=ee(),a=c.length>0?Math.round(t.learned/c.length*100):0;e.innerHTML=`
    <div class="home__top">
      <p class="home__greeting">Hi, 今天继续加油 👋</p>
      <p class="home__date">连续打卡 <strong>${te()}</strong> 天 · 已掌握 <strong>${P()}</strong> 词</p>
      ${ae(a,"今日进度")}
    </div>
    <div class="home__cards">
      <button class="home__card" data-nav="flashcard">
        <div class="home__card-icon home__card-icon--flash">🃏</div>
        <div>
          <div class="home__card-title">闪卡模式</div>
          <div class="home__card-desc">翻卡记忆 · 自动朗读</div>
        </div>
      </button>
      <button class="home__card" data-nav="quiz">
        <div class="home__card-icon home__card-icon--quiz">🎯</div>
        <div>
          <div class="home__card-title">选择题模式</div>
          <div class="home__card-desc">四选一 · 限时作答</div>
        </div>
      </button>
      <button class="home__card" data-nav="spelling">
        <div class="home__card-icon home__card-icon--spell">✏️</div>
        <div>
          <div class="home__card-title">拼写模式</div>
          <div class="home__card-desc">看中文写英文 · 提示辅助</div>
        </div>
      </button>
    </div>
    <div class="home__footer">
      <button class="home__stats-btn" data-nav="stats">📊 学习统计</button>
    </div>
  `,e.querySelectorAll("[data-nav]").forEach(n=>n.addEventListener("click",()=>d(n.dataset.nav)))}function g(e,t="en-US"){if(!window.speechSynthesis)return;window.speechSynthesis.cancel();const a=new SpeechSynthesisUtterance(e);a.lang=t,a.rate=.85,a.pitch=1,a.volume=1,window.speechSynthesis.speak(a)}let p=0,v=!1;function ne(){const e=document.getElementById("page-flashcard");p=E("flashcard").index,v=!1,e.innerHTML=`
    <div class="page-header">
      <button class="page-header__back" data-nav="home">←</button>
      <span class="page-header__title">闪卡模式</span>
    </div>
    <div class="flashcard__container">
      <div class="flashcard__card" id="flashcard-card">
        <div class="flashcard__face flashcard__face--front" id="flashcard-front"></div>
        <div class="flashcard__face flashcard__face--back" id="flashcard-back"></div>
      </div>
    </div>
    <div id="flashcard-progress"></div>
    <div class="flashcard__actions">
      <button class="flashcard__btn flashcard__btn--forgot" id="btn-forgot">没记住</button>
      <button class="flashcard__btn flashcard__btn--knew" id="btn-knew">记住了</button>
    </div>
  `,B(e),C(),e.querySelector("#flashcard-card").addEventListener("click",ie),e.querySelector("#btn-forgot").addEventListener("click",()=>I(!1)),e.querySelector("#btn-knew").addEventListener("click",()=>I(!0)),e.querySelector("[data-nav]").addEventListener("click",()=>d("home"))}function B(e){const t=c[p],a=e.querySelector("#flashcard-front"),n=e.querySelector("#flashcard-back");a.innerHTML=`
    <div class="flashcard__word">${t.word}</div>
    <div class="flashcard__phonetic">${t.phonetic}</div>
    <button class="flashcard__speaker" id="speaker-btn" title="朗读">🔊</button>
  `,n.innerHTML=`
    <div class="flashcard__meaning">${t.meaning}</div>
    <div class="flashcard__example">${t.example}</div>
    <div class="flashcard__example-cn">${t.example_cn}</div>
  `,e.querySelector("#speaker-btn").addEventListener("click",s=>{s.stopPropagation(),g(t.word)}),g(t.word)}function ie(){v=!v,document.querySelector("#flashcard-card").classList.toggle("flashcard__card--flipped",v)}function I(e){const t=c[p];z(t.word,e),Z(t.word,{mastery:e?Math.min(2,j(t.word).mastery+1):0}),p++,p>=c.length&&(p=0),w("flashcard",p),v=!1;const a=document.getElementById("page-flashcard");a.querySelector("#flashcard-card").classList.remove("flashcard__card--flipped"),B(a),C()}function C(){document.getElementById("flashcard-progress").innerHTML=T(p,c.length)}let h=0,f=0,x=null,m=15,y=!1,k=[];function D(){const e=document.getElementById("page-quiz");h=E("quiz").index,f=0,k=[],y=!1,e.innerHTML=`
    <div class="page-header">
      <button class="page-header__back" data-nav="home">←</button>
      <span class="page-header__title">选择题模式</span>
    </div>
    <div id="quiz-word-area"></div>
    <div id="quiz-progress"></div>
    <div class="quiz__options" id="quiz-options"></div>
    <div class="quiz__feedback" id="quiz-feedback"></div>
  `,e.querySelector("[data-nav]").addEventListener("click",()=>{clearInterval(x),d("home")}),N(e),R()}function N(e){y=!1,m=15;const t=c[h],a=c.filter(l=>l.word!==t.word),n=A(a).slice(0,3),s=A([t,...n]);e.querySelector("#quiz-word-area").innerHTML=`
    <div class="quiz__word">${t.word}</div>
    <button class="flashcard__speaker" id="quiz-speaker">🔊</button>
    <div class="quiz__timer" id="quiz-timer">⏱ ${m}s</div>
  `,e.querySelector("#quiz-options").innerHTML=s.map(l=>`
    <button class="quiz__option" data-meaning="${l.meaning.replace(/"/g,"&quot;")}">${l.meaning}</button>
  `).join(""),e.querySelector("#quiz-feedback").innerHTML="",e.querySelector("#quiz-speaker").addEventListener("click",()=>g(t.word)),e.querySelectorAll(".quiz__option").forEach(l=>{l.addEventListener("click",()=>re(l,t,e))});const i=e.querySelector("#quiz-timer");clearInterval(x),x=setInterval(()=>{m--,i.textContent=`⏱ ${m}s`,m<=5&&i.classList.add("quiz__timer--warn"),m<=0&&(clearInterval(x),F(!1,t,e))},1e3),g(t.word)}function re(e,t,a){if(y)return;y=!0;const s=e.dataset.meaning===t.meaning;a.querySelectorAll(".quiz__option").forEach(i=>{i.classList.add("quiz__option--disabled"),i.dataset.meaning===t.meaning?i.classList.add("quiz__option--correct"):i===e&&i.classList.add("quiz__option--wrong")}),F(s,t,a)}function F(e,t,a){clearInterval(x),e?(f++,a.querySelector("#quiz-feedback").innerHTML=`
      <span style="color:#4CAF50">✓ 正确！</span>
      <div style="margin-top:4px">${t.example}</div>
      <div style="color:#9A9A90;font-size:13px">${t.example_cn}</div>
    `):(k.push(t),a.querySelector("#quiz-feedback").innerHTML=`
      <span style="color:#E53935">✗ 正确答案：${t.meaning}</span>
      <div style="margin-top:4px">${t.example}</div>
      <div style="color:#9A9A90;font-size:13px">${t.example_cn}</div>
    `),z(t.word,e),setTimeout(()=>le(a),2e3)}function le(e){if(h++,h>=c.length){ce(e);return}w("quiz",h),N(e),R()}function ce(e){const t=Math.round(f/c.length*100),a=t<60?"result__score--low":"";e.innerHTML=`
    <div class="page-header">
      <button class="page-header__back" data-nav="home">←</button>
      <span class="page-header__title">本轮成绩</span>
    </div>
    <div class="result">
      <div class="result__score ${a}">${t}%</div>
      <div class="result__label">正确率</div>
      <div class="result__stats">
        <div class="result__stat">
          <div class="result__stat-val">${f}</div>
          <div class="result__stat-lbl">正确</div>
        </div>
        <div class="result__stat">
          <div class="result__stat-val">${c.length-f}</div>
          <div class="result__stat-lbl">错误</div>
        </div>
      </div>
      ${k.length>0?`
        <div class="result__wrong-list">
          <p style="font-weight:600;margin-bottom:4px">错题：</p>
          <ul>${k.map(n=>`<li><b>${n.word}</b> — ${n.meaning}</li>`).join("")}</ul>
        </div>
      `:""}
      <button class="result__btn result__btn--retry" id="btn-retry-quiz">再做一轮</button>
      <button class="result__btn result__btn--home" id="btn-home-quiz">返回首页</button>
    </div>
  `,e.querySelector("#btn-retry-quiz").addEventListener("click",()=>{w("quiz",0),D()}),e.querySelector("#btn-home-quiz").addEventListener("click",()=>d("home")),e.querySelector("[data-nav]").addEventListener("click",()=>d("home"))}function R(){document.getElementById("quiz-progress").innerHTML=T(h,c.length)}function A(e){const t=[...e];for(let a=t.length-1;a>0;a--){const n=Math.floor(Math.random()*(a+1));[t[a],t[n]]=[t[n],t[a]]}return t}let o=0,b=0,u=0,_=3,S=[];function J(){const e=document.getElementById("page-spelling");o=E("spelling").index,b=0,S=[],u=0,e.innerHTML=`
    <div class="page-header">
      <button class="page-header__back" data-nav="home">←</button>
      <span class="page-header__title">拼写模式</span>
    </div>
    <div id="spelling-prompt"></div>
    <div id="spelling-progress"></div>
    <div class="spelling__input-area">
      <input class="spelling__input" id="spelling-input" type="text" autocomplete="off" autocapitalize="off" placeholder="输入英文单词...">
      <div class="spelling__hint" id="spelling-hint"></div>
      <button class="spelling__hint-btn" id="spelling-hint-btn">💡 提示 (${_})</button>
    </div>
    <div class="spelling__feedback" id="spelling-feedback"></div>
    <button class="flashcard__speaker" id="spelling-speaker" style="align-self:center">🔊</button>
  `,e.querySelector("[data-nav]").addEventListener("click",()=>d("home")),e.querySelector("#spelling-hint-btn").addEventListener("click",oe),e.querySelector("#spelling-input").addEventListener("keydown",de),e.querySelector("#spelling-speaker").addEventListener("click",()=>{const t=c[o];g(t.word)}),W(e),U(e)}function W(e){const t=c[o];e.querySelector("#spelling-prompt").innerHTML=`
    <div class="spelling__meaning">${t.meaning}</div>
    <div class="spelling__example">"${t.example_cn}"</div>
  `,e.querySelector("#spelling-hint").textContent="",e.querySelector("#spelling-input").value="",e.querySelector("#spelling-input").className="spelling__input",e.querySelector("#spelling-input").focus(),e.querySelector("#spelling-feedback").innerHTML="",e.querySelector("#spelling-feedback").className="spelling__feedback",e.querySelector("#spelling-hint-btn").textContent=`💡 提示 (${_-u})`,e.querySelector("#spelling-hint-btn").disabled=u>=_}function oe(){if(u>=_)return;const e=c[o];u++;const t=e.word[0]+"_".repeat(e.word.length-1);document.querySelector("#spelling-hint").textContent=t,document.querySelector("#spelling-hint-btn").textContent=`💡 提示 (${_-u})`,u>=_&&(document.querySelector("#spelling-hint-btn").disabled=!0)}function de(e){e.key==="Enter"&&pe()}function pe(){const e=document.querySelector("#spelling-input"),t=e.value.trim().toLowerCase(),a=c[o],n=t===a.word.toLowerCase(),s=document.querySelector("#spelling-feedback");n?(b++,e.classList.add("spelling__input--correct"),s.innerHTML="✓ 正确！",s.className="spelling__feedback spelling__feedback--correct"):(S.push({...a,userAnswer:t}),e.classList.add("spelling__input--wrong"),s.innerHTML=`✗ 正确答案：<b>${a.word}</b> — ${a.meaning}`,s.className="spelling__feedback spelling__feedback--wrong",e.value="",e.placeholder=a.word),z(a.word,n),g(a.word),setTimeout(()=>ue(),1500)}function ue(){if(o++,o>=c.length){me();return}w("spelling",o);const e=document.getElementById("page-spelling");W(e),U(e)}function me(){const e=document.getElementById("page-spelling"),t=Math.round(b/c.length*100),a=t<60?"result__score--low":"";e.innerHTML=`
    <div class="page-header">
      <button class="page-header__back" data-nav="home">←</button>
      <span class="page-header__title">本轮成绩</span>
    </div>
    <div class="result">
      <div class="result__score ${a}">${t}%</div>
      <div class="result__label">正确率</div>
      <div class="result__stats">
        <div class="result__stat">
          <div class="result__stat-val">${b}</div>
          <div class="result__stat-lbl">正确</div>
        </div>
        <div class="result__stat">
          <div class="result__stat-val">${c.length-b}</div>
          <div class="result__stat-lbl">错误</div>
        </div>
        <div class="result__stat">
          <div class="result__stat-val">${u}</div>
          <div class="result__stat-lbl">使用提示</div>
        </div>
      </div>
      ${S.length>0?`
        <div class="result__wrong-list">
          <p style="font-weight:600;margin-bottom:4px">错词：</p>
          <ul>${S.map(n=>`<li><b>${n.word}</b> — ${n.meaning}</li>`).join("")}</ul>
        </div>
      `:""}
      <button class="result__btn result__btn--retry" id="btn-retry-spell">再做一轮</button>
      <button class="result__btn result__btn--home" id="btn-home-spell">返回首页</button>
    </div>
  `,e.querySelector("#btn-retry-spell").addEventListener("click",()=>{w("spelling",0),J()}),e.querySelector("#btn-home-spell").addEventListener("click",()=>d("home")),e.querySelector("[data-nav]").addEventListener("click",()=>d("home"))}function U(e){e.querySelector("#spelling-progress").innerHTML=T(o,c.length)}function he(){const e=document.getElementById("page-stats"),a=X().stats,n=P(),s=[];for(let l=6;l>=0;l--){const q=new Date(Date.now()-l*864e5),K=q.toISOString().slice(0,10);s.push({label:`${q.getMonth()+1}/${q.getDate()}`,value:(a.days[K]||{}).learned||0})}const i=Math.max(...s.map(l=>l.value),1);e.innerHTML=`
    <div class="page-header">
      <button class="page-header__back" data-nav="home">←</button>
      <span class="page-header__title">学习统计</span>
    </div>
    <div class="stats__grid">
      <div class="stats__card">
        <div class="stats__card-val">${Object.keys(a.days).length}</div>
        <div class="stats__card-lbl">学习天数</div>
      </div>
      <div class="stats__card">
        <div class="stats__card-val">${a.streak}</div>
        <div class="stats__card-lbl">连续打卡</div>
      </div>
      <div class="stats__card">
        <div class="stats__card-val">${n}</div>
        <div class="stats__card-lbl">已掌握</div>
      </div>
      <div class="stats__card">
        <div class="stats__card-val">${c.length}</div>
        <div class="stats__card-lbl">总词汇量</div>
      </div>
    </div>
    <div class="stats__chart">
      <div class="stats__chart-title">近 7 天学习量</div>
      <div class="stats__bars">
        ${s.map(l=>`
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%">
            <span style="font-size:11px;color:#9A9A90;margin-bottom:4px">${l.value}</span>
            <div class="stats__bar" style="height:${l.value/i*100}%"></div>
            <span style="font-size:10px;color:#B0B0A8;margin-top:4px">${l.label}</span>
          </div>
        `).join("")}
      </div>
    </div>
  `,e.querySelector("[data-nav]").addEventListener("click",()=>d("home"))}Y();G({home:se,flashcard:ne,quiz:D,spelling:J,stats:he});
