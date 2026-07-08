(function(){
  var path = location.pathname.replace(/\/+$/, "") || "/";
  var local = location.protocol === "file:";
  if ((!local && !/^\/(about-3|aboutus3)$/i.test(path)) || document.getElementById("qc-aboutus3")) return;

  var css = [
    '@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600;700&family=Inter:wght@500;600;700;800&family=Josefin+Sans:wght@700&display=swap");',
    '@font-face{font-family:Sukhumvit;src:url(https://cdn.jsdelivr.net/gh/bluenex/baansuan_prannok/fonts/sukhumvit-set/SukhumvitSet-Text.ttf);font-weight:400;font-display:swap}',
    '@font-face{font-family:Sukhumvit;src:url(https://cdn.jsdelivr.net/gh/bluenex/baansuan_prannok/fonts/sukhumvit-set/SukhumvitSet-Bold.ttf);font-weight:600 900;font-display:swap}',
    'html.qc-about-open,html.qc-about-open body{margin:0!important;background:#020403!important;overflow:hidden!important}',
    '#qc-aboutus3{position:fixed;inset:0;z-index:2147483450;overflow:auto;background:#020403;color:#eafbf1;font-family:Inter,Sukhumvit,system-ui,sans-serif;-webkit-font-smoothing:antialiased}',
    '#qc-aboutus3 *{box-sizing:border-box}#qc-aboutus3 a{color:inherit;text-decoration:none}.qa-mono{font-family:"IBM Plex Mono",ui-monospace,monospace}',
    '.qa-bg{position:fixed;inset:0;pointer-events:none;background:linear-gradient(180deg,#020403,#030806 46%,#010202);overflow:hidden}',
    '.qa-bg-video{position:absolute;inset:0;z-index:0;width:100%;height:100%;object-fit:cover;opacity:.28;filter:brightness(.42) saturate(.42);transform:scale(1.08)}',
    '.qa-bg:before{content:"";position:absolute;inset:0;z-index:1;background-image:linear-gradient(rgba(105,240,174,.028) 1px,transparent 1px),linear-gradient(90deg,rgba(105,240,174,.022) 1px,transparent 1px);background-size:42px 42px;mask-image:linear-gradient(180deg,rgba(0,0,0,.85),rgba(0,0,0,.35) 52%,transparent 100%);opacity:.46}',
    '.qa-bg:after{content:"";position:absolute;inset:-20%;z-index:2;background:repeating-linear-gradient(0deg,rgba(105,240,174,.035) 0 1px,transparent 1px 7px);opacity:.1;animation:qaDrift 18s linear infinite}.qa-scan{position:fixed;left:0;right:0;top:0;height:120px;z-index:1;pointer-events:none;background:linear-gradient(180deg,transparent,rgba(105,240,174,.05),transparent);animation:qaScan 7s linear infinite}',
    '.qa-shell{position:relative;min-height:100%;padding:0 0 54px;overflow:hidden}',
    '.qa-top{height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 clamp(28px,4vw,56px);border-bottom:1px solid rgba(105,240,174,.15);background:#060a09}',
    '.qa-brand{color:#69f0ae;font-size:15px;font-weight:700;letter-spacing:.02em;white-space:nowrap}',
    '.qa-nav{display:flex;gap:clamp(18px,2.4vw,30px);align-items:center;color:rgba(244,251,247,.65);font-size:14px;font-weight:700}.qa-nav a{transition:color .22s ease,opacity .22s ease}.qa-nav a:last-child{color:#03dac6}.qa-nav a:hover,.qa-nav .on{color:#69f0ae}.qa-nav a:focus-visible,.qa-btn:focus-visible,.qa-cmd:focus-visible,.qa-audio:focus-visible{outline:2px solid rgba(105,240,174,.72);outline-offset:4px}',
    '.qa-tools{display:flex;align-items:center;gap:10px;margin-left:18px}.qa-status{min-height:34px;display:flex;align-items:center;gap:8px;border:1px solid var(--qa-status-border,rgba(105,240,174,.35));border-radius:6px;background:rgba(2,10,6,.74);color:var(--qa-status-color,#69f0ae);padding:0 11px;font-size:11px}.qa-status-dot{width:7px;height:7px;border-radius:50%;background:currentColor;animation:qaBlink 1.4s step-end infinite}.qa-audio{min-height:34px;border:1px solid rgba(105,240,174,.35);border-radius:6px;background:rgba(2,10,6,.74);color:#69f0ae;padding:0 10px;font-size:11px;cursor:pointer}',
    '.qa-menu{display:none;width:38px;height:38px;border:1px solid rgba(105,240,174,.35);border-radius:999px;background:transparent;color:#f4fbf7;padding:0;transition:border-color .22s ease,background .22s ease}.qa-menu:hover{border-color:rgba(105,240,174,.72);background:rgba(105,240,174,.08)}.qa-menu span{display:block;width:16px;height:1.5px;margin:4px auto;border-radius:999px;background:currentColor;transition:transform .24s ease,opacity .18s ease}.qa-open-menu .qa-menu span:nth-child(1){transform:translateY(5.5px) rotate(45deg)}.qa-open-menu .qa-menu span:nth-child(2){opacity:0}.qa-open-menu .qa-menu span:nth-child(3){transform:translateY(-5.5px) rotate(-45deg)}',
    '.qa-term{max-width:1220px;margin:18px auto 0;border:1px solid rgba(105,240,174,.22);border-radius:8px;background:rgba(1,5,3,.89);box-shadow:0 30px 88px rgba(0,0,0,.72),0 0 0 1px rgba(255,255,255,.025) inset;overflow:hidden}',
    '.qa-bar{display:flex;align-items:center;gap:9px;padding:11px 16px;border-bottom:1px solid rgba(105,240,174,.16);background:linear-gradient(180deg,rgba(105,240,174,.055),rgba(105,240,174,.018))}',
    '.qa-dot{width:9px;height:9px;border-radius:50%}.qa-red{background:#ff6e6e}.qa-yellow{background:#ffd54f}.qa-green{background:#69f0ae}.qa-title{flex:1;text-align:center;color:rgba(105,240,174,.74);font-size:11px;letter-spacing:.13em}',
    '.qa-body{position:relative;padding:34px clamp(18px,3.4vw,46px) 38px}.qa-body:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 28% 12%,rgba(105,240,174,.08),transparent 34%);pointer-events:none}',
    '.qa-line{position:relative;color:rgba(105,240,174,.62);font-size:12px}.qa-hero{position:relative;display:grid;grid-template-columns:minmax(0,760px);gap:42px;margin-top:16px;align-items:end}',
    '.qa-kicker{margin:0 0 16px;color:#03dac6;font-size:18px;letter-spacing:.22em;text-transform:uppercase}.qa-h1{margin:0;font-family:"Josefin Sans",Inter,Sukhumvit,sans-serif;font-size:clamp(56px,8vw,116px);line-height:.9;color:#f7fff9;letter-spacing:0;text-shadow:0 0 32px rgba(105,240,174,.08)}',
    '.qa-h1 span{display:block;margin-top:12px;font-family:Sukhumvit,Inter,sans-serif;font-size:.32em;line-height:1.22;color:#69f0ae;text-shadow:none}',
    '.qa-progress{margin-top:24px;display:flex;align-items:center;gap:12px;max-width:520px}.qa-track{height:8px;flex:1;border:1px solid rgba(105,240,174,.2);border-radius:99px;background:rgba(255,255,255,.035);overflow:hidden}.qa-fill{height:100%;width:25%;background:linear-gradient(90deg,#03dac6,#69f0ae);transition:width .32s cubic-bezier(.16,1,.3,1)}.qa-pct{min-width:58px;text-align:right;color:#dffbea;font-size:11px}',
    '.qa-cmds{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:26px;min-width:0}.qa-cmd{min-height:48px;border:1px solid rgba(105,240,174,.2);border-radius:6px;background:rgba(255,255,255,.018);color:#a8e9c8;text-align:left;padding:0 14px;cursor:pointer;transition:.18s ease;font-size:13px;white-space:nowrap}.qa-cmd b{color:rgba(105,240,174,.58);margin-right:8px}.qa-cmd i{float:right;color:rgba(105,240,174,.42);font-style:normal}.qa-cmd.done i{color:rgba(105,240,174,.76)}.qa-cmd:hover,.qa-cmd.on{border-color:rgba(105,240,174,.72);background:rgba(105,240,174,.075);color:#f6fff9}',
    '.qa-panel{position:relative;margin-top:24px;border-top:1px solid rgba(105,240,174,.16);padding-top:24px;display:grid;grid-template-columns:minmax(0,1fr) 310px;gap:34px;min-width:0}.qa-text{min-width:0}.qa-filetag{color:rgba(105,240,174,.64);font-size:12px;margin-bottom:12px}.qa-text h2{margin:0 0 12px;font-family:Sukhumvit,Inter,sans-serif;font-size:30px;line-height:1.22;color:#f6fff9}.qa-text p{margin:0;color:rgba(234,251,241,.76);font-family:Sukhumvit,Inter,sans-serif;font-size:16px;line-height:2;max-width:760px;overflow-wrap:anywhere;word-break:break-word}',
    '.qa-card{border:1px solid rgba(105,240,174,.14);border-radius:7px;background:rgba(255,255,255,.018);padding:16px}.qa-card h3{margin:0 0 12px;color:#69f0ae;font-size:12px;letter-spacing:.14em}.qa-stat{display:flex;justify-content:space-between;gap:12px;padding:9px 0;border-top:1px solid rgba(255,255,255,.065);font-size:12px;color:rgba(234,251,241,.6)}.qa-stat:first-of-type{border-top:0}.qa-stat b{color:rgba(234,251,241,.82)}',
    '.qa-actions{position:relative;display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}.qa-btn{min-height:48px;display:inline-flex;align-items:center;justify-content:center;border-radius:6px;padding:0 20px;font-weight:800;font-family:Sukhumvit,Inter,sans-serif}.qa-primary{background:#69f0ae;color:#03100a}.qa-secondary{border:1px solid rgba(105,240,174,.24);color:#69f0ae;background:rgba(255,255,255,.012)}.qa-primary:hover{background:#8ef5c1}.qa-secondary:hover{background:rgba(105,240,174,.06)}.qa-achieve{display:none;margin-top:18px;border:1px solid rgba(255,213,79,.48);background:rgba(255,213,79,.07);border-radius:7px;padding:13px 16px;color:rgba(234,251,241,.72);font-size:13px}.qa-achieve b{display:block;color:#ffd54f;letter-spacing:.08em;margin-bottom:3px}.qa-unlocked .qa-achieve{display:block}',
    '@keyframes qaDrift{from{transform:translateY(0)}to{transform:translateY(84px)}}@keyframes qaScan{0%{transform:translateY(-130px)}100%{transform:translateY(100vh)}}@keyframes qaBlink{0%,49%{opacity:1}50%,100%{opacity:0}}',
    '@media(max-width:980px){.qa-tools{margin-left:auto}.qa-status{display:none}}',
    '@media(max-width:860px){.qa-bg-video{opacity:.2;filter:brightness(.36) saturate(.34);transform:scale(1.16)}.qa-shell{padding:0 12px 24px}.qa-top{height:62px;margin:0 -12px;padding:0 18px}.qa-brand{font-size:13px}.qa-nav{position:absolute;left:12px;right:12px;top:70px;z-index:9;display:grid;gap:0;padding:8px;border:1px solid rgba(105,240,174,.22);border-radius:8px;background:rgba(6,10,9,.98);box-shadow:0 24px 70px rgba(0,0,0,.42);opacity:0;visibility:hidden;transform:translateY(-8px);transition:opacity .2s ease,visibility .2s ease,transform .2s ease}.qa-open-menu .qa-nav{opacity:1;visibility:visible;transform:translateY(0)}.qa-nav a{min-height:42px;display:flex;align-items:center;padding:0 10px;border-radius:6px}.qa-menu{display:block}.qa-audio{display:none}.qa-term{margin-top:14px;border-radius:8px}.qa-title{text-align:left;font-size:10px}.qa-body{padding:18px 16px 86px}.qa-hero{grid-template-columns:1fr;gap:18px}.qa-kicker{font-size:14px;margin-bottom:10px}.qa-h1{font-size:clamp(50px,15vw,68px)}.qa-cmds{display:flex;overflow-x:auto;scrollbar-width:none}.qa-cmds::-webkit-scrollbar{display:none}.qa-cmd{flex:0 0 auto;min-width:154px}.qa-panel{grid-template-columns:1fr;gap:16px}.qa-text h2{font-size:24px}.qa-text p{font-size:14.5px}.qa-card{display:none}.qa-btn{width:100%}}',
    '@media(prefers-reduced-motion:reduce){#qc-aboutus3 *,#qc-aboutus3 *:before,#qc-aboutus3 *:after{animation:none!important;transition:none!important}}'
  ].join("");

  var vsrc = local ? "./uploads/quantcorner-matrix-bg-muted-web.mp4" : "https://video.wixstatic.com/video/fcac87_3e043ab4e01f426abaf10bda5c0718e0/file";
  var psrc = local ? "./uploads/quantcorner-matrix-bg-muted-poster.jpg" : "https://static.wixstatic.com/media/fcac87_5ab38cf9fcb84261a74c4f2763886184~mv2.jpg";

  var data = [
    ["whoami","identity.txt","whoami","เราเป็นใคร","พวกเราสร้าง QuantCorner ขึ้นเพื่อรวบรวมคนที่สนใจการเงินเชิงปริมาณ ให้มีพื้นที่แบ่งปันความรู้ เครื่องมือ ข้อมูล และงานทดลองที่ตรวจสอบได้"],
    ["mission","mission.txt","cat mission.txt","ภารกิจ","เปลี่ยนตลาดจากเรื่องเล่า เป็นสิ่งที่ทดสอบได้ ผ่านบทความ เครื่องมือ และเส้นทางเรียนรู้ที่ช่วยให้คนไทยคุยเรื่อง factor, portfolio, risk และ backtest ได้เป็นระบบ"],
    ["quant","quant.md","open quant.md","Quant คืออะไร","Quant หรือ Quantitative Analysis คือการใช้คณิตศาสตร์ สถิติ ข้อมูล และการเขียนโปรแกรมมาช่วยวิเคราะห์ตลาด สร้างสมมติฐาน ทดสอบกลยุทธ์ และประเมินความเสี่ยง แทนการตัดสินใจจากความรู้สึกหรือคำฟันธง"],
    ["guild","guild.key","./join.sh","เข้าร่วมกิลด์","ถ้าคุณชอบทดลองมากกว่าท่องจำ ชอบดู distribution มากกว่าฟังคำทำนาย และอยากเรียน Quant แบบมีโครงสร้าง QuantCorner กับ QuantSeras คือทางเข้าเดียวกันของระบบนิเวศนี้"]
  ];
  var active = 0;
  var done = { whoami: true };
  var muted = true;
  var ac = null;

  function beep(freq, dur, type, vol, wait) {
    if (muted) return;
    try {
      if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)();
      if (ac.state === "suspended") ac.resume();
      var t = ac.currentTime + (wait || 0);
      var o = ac.createOscillator();
      var g = ac.createGain();
      o.type = type || "square";
      o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(vol || .035, t);
      g.gain.exponentialRampToValueAtTime(.0001, t + (dur || .08));
      o.connect(g); g.connect(ac.destination);
      o.start(t); o.stop(t + (dur || .08) + .02);
    } catch (e) {}
  }

  function unlockSound() {
    beep(523,.09,"triangle",.055,0);
    beep(659,.09,"triangle",.055,.1);
    beep(784,.16,"triangle",.055,.2);
  }

  var root = document.createElement("div");
  root.id = "qc-aboutus3";
  root.innerHTML = ''
    + '<div class="qa-bg"><video class="qa-bg-video" autoplay muted loop playsinline preload="metadata" poster="' + psrc + '" aria-hidden="true"><source src="' + vsrc + '" type="video/mp4"></video></div><div class="qa-scan"></div>'
    + '<div class="qa-shell">'
    + '<header class="qa-top"><a class="qa-brand qa-mono" href="/">▚ QUANTCORNER</a><nav class="qa-nav qa-mono" aria-label="QuantCorner navigation"><a href="/articles">/articles</a><a href="/?roadmap=1">/series</a><a href="/?tools=1">/tools</a><a class="on" href="/about-3">/about</a><a href="https://www.quantseras.com/" target="_blank" rel="noopener">/quantseras</a></nav><div class="qa-tools qa-mono"><div class="qa-status"><span class="qa-status-dot"></span><span class="qa-status-text">ACCESS: GUEST</span></div><button class="qa-audio" type="button">SOUND: OFF</button></div><button class="qa-menu" type="button" aria-label="เปิดเมนู" aria-expanded="false"><span></span><span></span><span></span></button></header>'
    + '<main class="qa-term"><div class="qa-bar"><span class="qa-dot qa-red"></span><span class="qa-dot qa-yellow"></span><span class="qa-dot qa-green"></span><span class="qa-title qa-mono">QC_TERMINAL - about_us3.exe</span><span class="qa-mono" style="color:rgba(255,255,255,.38);font-size:11px">tty1</span></div>'
    + '<section class="qa-body"><div class="qa-line qa-mono">$ mount /quantcorner/about --dark-mode</div><div class="qa-hero"><div><p class="qa-kicker qa-mono">VERIFIED, NOT TOLD.</p><h1 class="qa-h1">About Us<span>ถอดรหัสมุมของคนรัก QUANT</span></h1><div class="qa-progress"><div class="qa-track"><div class="qa-fill"></div></div><div class="qa-pct qa-mono">25%</div></div></div></div>'
    + '<div class="qa-cmds"></div><div class="qa-panel"><div class="qa-text"><div class="qa-filetag qa-mono">[DECRYPTING] whoami -> identity.txt</div><h2>เราเป็นใคร</h2><p></p></div><aside class="qa-card"><h3 class="qa-mono">SYSTEM CHECK</h3><div class="qa-stat"><span>Evidence</span><b>required</b></div><div class="qa-stat"><span>Prediction hype</span><b>blocked</b></div><div class="qa-stat"><span>Backtest leakage</span><b>scan</b></div><div class="qa-stat"><span>Access level</span><b class="qa-level">GUEST</b></div></aside></div>'
    + '<div class="qa-achieve qa-mono"><b>ACHIEVEMENT UNLOCKED - ACCESS LEVEL: INSIDER</b><span>คุณถอดรหัสครบทุกไฟล์แล้ว เหลือแค่เลือกเส้นทางเรียนรู้หรือเข้าไปอ่าน research log ต่อ</span></div>'
    + '<div class="qa-actions"><a class="qa-btn qa-primary" href="/articles">อ่านบทความ -></a><a class="qa-btn qa-secondary" href="/?roadmap=1">เปิด Roadmap</a><a class="qa-btn qa-secondary" href="https://www.quantseras.com/" target="_blank" rel="noopener">QuantSeras</a></div></section></main></div>';

  var style = document.createElement("style");
  style.id = "qc-aboutus3-style";
  style.textContent = css;
  document.head.appendChild(style);
  document.documentElement.classList.add("qc-about-open");
  document.documentElement.appendChild(root);
  var bgv = root.querySelector(".qa-bg-video");
  if (bgv) {
    var play = bgv.play && bgv.play();
    if (play && play.catch) play.catch(function(){});
  }

  var cmds = root.querySelector(".qa-cmds");
  var fill = root.querySelector(".qa-fill");
  var pct = root.querySelector(".qa-pct");
  var tag = root.querySelector(".qa-filetag");
  var h2 = root.querySelector(".qa-text h2");
  var p = root.querySelector(".qa-text p");
  var level = root.querySelector(".qa-level");
  var status = root.querySelector(".qa-status");
  var statusText = root.querySelector(".qa-status-text");
  var audio = root.querySelector(".qa-audio");

  data.forEach(function(d, i){
    var button = document.createElement("button");
    button.className = "qa-cmd qa-mono" + (i === 0 ? " on done" : "");
    button.dataset.id = d[0];
    button.onclick = function(){
      var wasUnlocked = Object.keys(done).length === data.length;
      active = i;
      done[d[0]] = true;
      beep(220,.045,"square",.025,0);
      beep(330,.055,"square",.025,.045);
      render();
      if (!wasUnlocked && Object.keys(done).length === data.length) unlockSound();
    };
    cmds.appendChild(button);
  });

  function render() {
    var d = data[active];
    tag.textContent = "[DECRYPTING] " + d[0] + " -> " + d[1];
    h2.textContent = d[3];
    p.textContent = d[4];
    var count = Object.keys(done).length;
    var v = Math.round((count / data.length) * 100);
    var unlocked = count === data.length;
    fill.style.width = v + "%";
    pct.textContent = count + " / " + data.length + " FILES";
    level.textContent = unlocked ? "INSIDER" : "GUEST+";
    if (status) {
      status.style.setProperty("--qa-status-color", unlocked ? "#ffd54f" : "#69f0ae");
      status.style.setProperty("--qa-status-border", unlocked ? "rgba(255,213,79,.5)" : "rgba(105,240,174,.35)");
    }
    if (statusText) statusText.textContent = unlocked ? "ACCESS: INSIDER" : "ACCESS: GUEST";
    root.classList.toggle("qa-unlocked", unlocked);
    root.querySelectorAll(".qa-cmd").forEach(function(btn, i){
      var id = data[i][0];
      btn.classList.toggle("on", i === active);
      btn.classList.toggle("done", !!done[id]);
      btn.innerHTML = "<b>$</b>" + data[i][2] + "<i>" + (done[id] ? "OK" : (i + 1) + "/4") + "</i>";
    });
  }

  var menu = root.querySelector(".qa-menu");
  if (menu) {
    menu.addEventListener("click", function(){
      var open = root.classList.toggle("qa-open-menu");
      menu.setAttribute("aria-expanded", open ? "true" : "false");
    });
    root.querySelectorAll(".qa-nav a").forEach(function(link){
      link.addEventListener("click", function(){
        root.classList.remove("qa-open-menu");
        menu.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (audio) {
    audio.addEventListener("click", function(){
      muted = !muted;
      audio.textContent = muted ? "SOUND: OFF" : "SOUND: ON";
      if (!muted) beep(660,.08,"triangle",.045,0);
    });
  }

  render();
})();
