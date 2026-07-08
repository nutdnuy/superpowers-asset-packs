(function(){
  var q = new URLSearchParams(location.search);
  var path = location.pathname.replace(/\/+$/, "") || "/";
  var local = location.protocol === "file:" || /wix-series-quant-pathway-embed\.html$/i.test(path);
  var onPage = (path === "/" && (q.get("roadmap") === "1" || q.get("series") === "1")) || path === "/series";
  if ((!local && !onPage) || document.getElementById("qc-pathway-page")) return;

  var video = local ? "./uploads/quantcorner-matrix-bg-muted-web.mp4" : "https://video.wixstatic.com/video/fcac87_3e043ab4e01f426abaf10bda5c0718e0/file";
  var poster = local ? "./uploads/quantcorner-matrix-bg-muted-poster.jpg" : "https://static.wixstatic.com/media/fcac87_5ab38cf9fcb84261a74c4f2763886184~mv2.jpg";

  var classes = [
    {
      id: "pm",
      short: "PM",
      label: "PORTFOLIO COMMANDER",
      name: "Quantitative Portfolio Manager",
      thai: "สร้างพอร์ตจาก signals, constraints และ risk budget",
      color: "#8FE7BA",
      glow: "rgba(143,231,186,.22)",
      stats: [["MATH",4],["CODE",3],["MARKET",5],["RISK",5]],
      output: "Portfolio policy + attribution dashboard",
      unlocked: "Factor portfolio, allocation, risk budget, attribution"
    },
    {
      id: "pricing",
      short: "PR",
      label: "MODEL PRICER",
      name: "Quantitative Pricing",
      thai: "ตีราคา product, hedge risk และตรวจ model assumption",
      color: "#D9C86A",
      glow: "rgba(217,200,106,.2)",
      stats: [["MATH",5],["CODE",4],["MODEL",5],["MARKET",3]],
      output: "Pricing model + hedge explanation",
      unlocked: "No-arbitrage, Greeks, volatility, numerical pricing"
    },
    {
      id: "trader",
      short: "TR",
      label: "EXECUTION TRADER",
      name: "Quantitative Trader",
      thai: "เปลี่ยน signal เป็น order, execution และ live risk control",
      color: "#72D2C8",
      glow: "rgba(114,210,200,.21)",
      stats: [["MATH",4],["CODE",5],["MARKET",5],["SPEED",4]],
      output: "Signal-to-execution trading playbook",
      unlocked: "Microstructure, alpha signal, TCA, trading controls"
    },
    {
      id: "risk",
      short: "RM",
      label: "RISK SENTINEL",
      name: "Risk Manager",
      thai: "วัดความเสี่ยง ตั้ง limit และ stress-test ระบบลงทุน",
      color: "#B7A7E6",
      glow: "rgba(183,167,230,.2)",
      stats: [["MATH",4],["CODE",3],["GOV",5],["RISK",5]],
      output: "Risk control room + stress-testing checklist",
      unlocked: "VaR/ES, stress testing, model risk, governance"
    }
  ];

  var nodes = [
    {id:"f1",branch:"core",type:"foundation",x:34,y:96,title:"Probability & Statistics",tag:"FOUNDATION",max:"MAX LV 8",sym:"ST",desc:"distribution, sampling, hypothesis test, uncertainty",gets:["อ่าน distribution ของ return ได้","แยก signal จาก noise","รู้ว่า sample ไหนยังอ่อน"],exercise:"เขียน assumption ก่อนดูผล backtest"},
    {id:"f2",branch:"core",type:"foundation",x:34,y:246,title:"Python / Data Stack",tag:"FOUNDATION",max:"MAX LV 8",sym:"PY",desc:"pandas, numpy, data cleaning, reproducible notebooks",gets:["จัด data pipeline ขั้นต้น","กัน survivorship/lookahead bias","ทำ notebook ที่รันซ้ำได้"],exercise:"สร้าง clean dataset พร้อม data dictionary"},
    {id:"f3",branch:"core",type:"foundation",x:34,y:396,title:"Markets & Instruments",tag:"FOUNDATION",max:"MAX LV 6",sym:"MK",desc:"asset classes, order types, derivatives basics, benchmarks",gets:["รู้ว่า product สร้าง P/L จากอะไร","เลือก benchmark ได้เหมาะสม","เข้าใจ cost และ liquidity"],exercise:"อธิบาย P/L driver ของสินทรัพย์หนึ่งตัว"},
    {id:"f4",branch:"core",type:"foundation",x:34,y:546,title:"Backtest & Validation",tag:"GATEWAY",max:"MAX LV 10",sym:"BT",desc:"out-of-sample, transaction cost, slippage, walk-forward",gets:["เขียน backtest spec ได้","ตรวจ leakage ก่อนเชื่อผล","อ่าน drawdown และ turnover เป็น"],exercise:"ทำ checklist ก่อน publish ผล backtest"},

    {id:"pm1",branch:"pm",type:"skill",x:292,y:52,title:"Asset Allocation",tag:"PM PATH",max:"MAX EP 8",sym:"AA",desc:"strategic/tactical allocation, constraints, rebalance rules",gets:["แปลง objective เป็น allocation rule","รู้จัก rebalance policy","ตั้ง constraint แบบไม่หลอกตัวเอง"],exercise:"ออกแบบ policy portfolio 60/40 เวอร์ชัน quant"},
    {id:"pm2",branch:"pm",type:"skill",x:470,y:52,title:"Factor Portfolio",tag:"PM PATH",max:"MAX EP 10",sym:"FA",desc:"factor exposure, signal weighting, turnover and capacity",gets:["รวม signals เป็นพอร์ต","ตรวจ exposure และ crowding","วัด turnover/capacity"],exercise:"สร้าง factor score แล้วจัด portfolio แบบ rule-based"},
    {id:"pm3",branch:"pm",type:"skill",x:648,y:52,title:"Risk Budgeting",tag:"PM PATH",max:"MAX EP 8",sym:"RB",desc:"risk contribution, concentration, drawdown and mandate limits",gets:["กำหนด risk budget","อ่าน concentration risk","เชื่อม sizing กับ mandate"],exercise:"ทำ risk contribution table ของพอร์ตตัวอย่าง"},
    {id:"job_pm",branch:"pm",type:"job",x:838,y:42,title:"Portfolio Manager",tag:"JOB UNLOCK",max:"MAX CLASS",sym:"PM",desc:"ตัดสินใจเชิงระบบ: research -> portfolio -> risk -> review",gets:["จัด mandate","อธิบาย attribution","คุมพอร์ตข้าม regime"],exercise:"เขียน investment committee memo 1 หน้า"},

    {id:"pr1",branch:"pricing",type:"skill",x:292,y:202,title:"No-Arbitrage Logic",tag:"PRICING PATH",max:"MAX EP 7",sym:"NA",desc:"discounting, replication, forward pricing and arbitrage bounds",gets:["คิดราคาแบบ replication","จับ assumption ที่ผิดราคา","อ่าน term structure ขั้นต้น"],exercise:"derive forward price พร้อม cost-of-carry"},
    {id:"pr2",branch:"pricing",type:"skill",x:470,y:202,title:"Greeks & Hedging",tag:"PRICING PATH",max:"MAX EP 9",sym:"GR",desc:"delta, gamma, vega, theta, hedge error and P/L attribution",gets:["เข้าใจ option risk","แยก P/L จาก Greeks","ออกแบบ hedge loop"],exercise:"อธิบาย delta hedge error จาก scenario ง่าย ๆ"},
    {id:"pr3",branch:"pricing",type:"skill",x:648,y:202,title:"Numerical Models",tag:"PRICING PATH",max:"MAX EP 10",sym:"NM",desc:"binomial tree, Monte Carlo, finite difference, calibration",gets:["เลือก numerical method ให้ถูกงาน","รู้ข้อจำกัดของ simulation","validate model output"],exercise:"เทียบ binomial กับ Monte Carlo สำหรับ option เดียวกัน"},
    {id:"job_pricing",branch:"pricing",type:"job",x:838,y:192,title:"Pricing Quant",tag:"JOB UNLOCK",max:"MAX CLASS",sym:"PR",desc:"สร้าง pricing model ที่ hedge ได้ อธิบายได้ และทดสอบ sensitivity ได้",gets:["ทำ model validation","คุยกับ trader/risk ได้","เขียน hedge note"],exercise:"ทำ pricing memo พร้อม Greeks และ stress table"},

    {id:"tr1",branch:"trader",type:"skill",x:292,y:352,title:"Market Microstructure",tag:"TRADER PATH",max:"MAX EP 7",sym:"MM",desc:"spread, depth, latency, order book, market impact",gets:["เข้าใจ cost ที่ backtest มักซ่อน","อ่าน order-flow เบื้องต้น","รู้ว่า strategy ตายเพราะ execution ได้อย่างไร"],exercise:"แยก gross alpha กับ net alpha หลัง cost"},
    {id:"tr2",branch:"trader",type:"skill",x:470,y:352,title:"Alpha Signal",tag:"TRADER PATH",max:"MAX EP 10",sym:"AS",desc:"signal design, feature stability, forecast horizon and decay",gets:["เปลี่ยน hypothesis เป็น signal","วัด decay และ horizon","กัน overfitting ระดับ signal"],exercise:"ทำ signal card: logic, horizon, expected failure"},
    {id:"tr3",branch:"trader",type:"skill",x:648,y:352,title:"Execution / TCA",tag:"TRADER PATH",max:"MAX EP 8",sym:"EX",desc:"order scheduling, slippage analysis, execution benchmark",gets:["เลือก execution benchmark","วัด slippage","ตั้ง control ก่อน live"],exercise:"ทำ TCA mini report จาก mock trades"},
    {id:"job_trader",branch:"trader",type:"job",x:838,y:342,title:"Quant Trader",tag:"JOB UNLOCK",max:"MAX CLASS",sym:"TR",desc:"ดูแล signal-to-order system แบบไม่ปล่อยให้ model วิ่งเกิน risk",gets:["run live trading loop","จับ kill switch","คุย research/tech/risk ได้"],exercise:"เขียน live trading runbook พร้อม stop conditions"},

    {id:"rk1",branch:"risk",type:"skill",x:292,y:502,title:"VaR / Expected Shortfall",tag:"RISK PATH",max:"MAX EP 8",sym:"VR",desc:"tail risk, confidence level, historical vs parametric estimates",gets:["คำนวณ risk metric หลัก","รู้ข้อจำกัดของ VaR","อ่าน tail loss เป็น"],exercise:"เปรียบเทียบ historical VaR กับ ES"},
    {id:"rk2",branch:"risk",type:"skill",x:470,y:502,title:"Stress Testing",tag:"RISK PATH",max:"MAX EP 9",sym:"ST",desc:"scenario design, factor shocks, liquidity and concentration stress",gets:["ออกแบบ stress scenario","เชื่อม factor shock กับ P/L","มอง risk ข้าม regime"],exercise:"สร้าง 3 stress scenario ให้พอร์ตตัวอย่าง"},
    {id:"rk3",branch:"risk",type:"skill",x:648,y:502,title:"Model Risk Control",tag:"RISK PATH",max:"MAX EP 8",sym:"MR",desc:"model assumptions, challenger model, monitoring and governance",gets:["ตั้ง model monitoring","แยก validation กับ research","ทำ challenger checklist"],exercise:"เขียน model-risk checklist สำหรับ strategy ใหม่"},
    {id:"job_risk",branch:"risk",type:"job",x:838,y:492,title:"Risk Manager",tag:"JOB UNLOCK",max:"MAX CLASS",sym:"RM",desc:"ทำให้ระบบลงทุนมี limit, escalation, stress, governance และ review cycle",gets:["ตั้ง risk limit","challenge assumption","สื่อสาร risk ให้ decision-maker"],exercise:"ทำ risk dashboard spec พร้อม escalation rule"}
  ];

  var edges = [
    ["f1","f2","LV 2"],["f2","f3","LV 4"],["f3","f4","LV 6"],
    ["f4","pm1","EP 1"],["pm1","pm2","EP 4"],["pm2","pm3","EP 7"],["pm3","job_pm","MAX"],
    ["f4","pr1","EP 1"],["pr1","pr2","EP 4"],["pr2","pr3","EP 7"],["pr3","job_pricing","MAX"],
    ["f4","tr1","EP 1"],["tr1","tr2","EP 4"],["tr2","tr3","EP 7"],["tr3","job_trader","MAX"],
    ["f4","rk1","EP 1"],["rk1","rk2","EP 4"],["rk2","rk3","EP 7"],["rk3","job_risk","MAX"]
  ];

  var branchLabels = [
    {branch:"core",x:34,y:58,text:"FOUNDATION",color:"#E8F5EE"},
    {branch:"pm",x:292,y:16,text:"QUANTITATIVE PORTFOLIO MANAGER",color:"#8FE7BA"},
    {branch:"pricing",x:292,y:166,text:"QUANTITATIVE PRICING",color:"#D9C86A"},
    {branch:"trader",x:292,y:316,text:"QUANTITATIVE TRADER",color:"#72D2C8"},
    {branch:"risk",x:292,y:466,text:"RISK MANAGER",color:"#B7A7E6"}
  ];

  var activeClass = q.get("class") || "pm";
  if (!findClass(activeClass)) activeClass = "pm";
  var selectedNode = "job_" + (activeClass === "pricing" ? "pricing" : activeClass);

  var css = [
    '@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600;700;800&family=Inter:wght@500;600;700;800;900&family=Josefin+Sans:wght@600;700&display=swap");',
    '@font-face{font-family:Sukhumvit;src:url(https://cdn.jsdelivr.net/gh/bluenex/baansuan_prannok/fonts/sukhumvit-set/SukhumvitSet-Text.ttf);font-weight:400;font-display:swap}',
    '@font-face{font-family:Sukhumvit;src:url(https://cdn.jsdelivr.net/gh/bluenex/baansuan_prannok/fonts/sukhumvit-set/SukhumvitSet-Bold.ttf);font-weight:600 900;font-display:swap}',
    'html.qp-open,html.qp-open body{margin:0!important;background:#060a09!important;overflow:hidden!important}',
    '#qc-pathway-page{position:fixed;inset:0;z-index:2147483470;overflow:auto;overflow-x:hidden;scroll-behavior:smooth;background:#060a09;color:#f4fbf7;font-family:Inter,Sukhumvit,system-ui,sans-serif;-webkit-font-smoothing:antialiased}',
    '#qc-pathway-page *{box-sizing:border-box}#qc-pathway-page a{color:inherit;text-decoration:none}#qc-pathway-page button{font:inherit}#qc-pathway-page button:focus-visible,#qc-pathway-page a:focus-visible{outline:2px solid rgba(143,231,186,.78);outline-offset:3px}.qpm{font-family:"IBM Plex Mono",ui-monospace,monospace;font-variant-numeric:tabular-nums}',
    '#qc-pathway-page:before{content:"";position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.13;background-image:radial-gradient(circle at 1px 1px,rgba(244,251,247,.22) 1px,transparent 0);background-size:4px 4px;mix-blend-mode:screen}',
    '.qpbg{position:fixed;inset:0;pointer-events:none;overflow:hidden;background:#060a09}.qpbg video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.72;filter:brightness(.74) contrast(1.04) saturate(.86);transform:scale(1.02)}.qpbg:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(143,231,186,.026) 1px,transparent 1px),linear-gradient(90deg,rgba(143,231,186,.018) 1px,transparent 1px);background-size:42px 42px;opacity:.25;mask-image:linear-gradient(180deg,rgba(0,0,0,.9),rgba(0,0,0,.55) 56%,transparent 100%)}.qpbg:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(6,10,9,.78) 0%,rgba(6,10,9,.38) 48%,rgba(6,10,9,.72) 100%),linear-gradient(180deg,rgba(6,10,9,.04),rgba(6,10,9,.58) 76%,#060a09 100%),repeating-linear-gradient(180deg,rgba(244,251,247,.018) 0 1px,transparent 1px 4px)}',
    '.qpshell{position:relative;z-index:1;min-height:100%;background:linear-gradient(180deg,rgba(6,10,9,.04),rgba(6,10,9,.44) 72%,#060a09 100%)}.qph{height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 clamp(28px,4vw,56px);border-bottom:1px solid rgba(143,231,186,.15);background:#060a09}.qpbrand{color:#8fe7ba;font-size:15px;font-weight:800;white-space:nowrap}.qpnav{display:flex;gap:clamp(20px,2.8vw,34px);color:rgba(244,251,247,.65);font-size:14px;font-weight:800}.qpnav a:last-child{color:#72d2c8}.qpnav a:hover,.qpnav .on{color:#8fe7ba}.qpmenu{display:none;width:38px;height:38px;border:1px solid rgba(143,231,186,.5);border-radius:999px;background:rgba(143,231,186,.055);color:#f4fbf7;padding:0}.qpmenu span{display:block;width:16px;height:1.5px;margin:4px auto;border-radius:99px;background:currentColor;transition:transform .22s ease,opacity .18s ease}.qpopen .qpmenu span:nth-child(1){transform:translateY(5.5px) rotate(45deg)}.qpopen .qpmenu span:nth-child(2){opacity:0}.qpopen .qpmenu span:nth-child(3){transform:translateY(-5.5px) rotate(-45deg)}',
    '.qpmain{width:min(100%,1440px);margin:auto;padding:30px clamp(16px,3vw,42px) 88px}.qpj-hero{display:block;max-width:790px;margin:0 0 20px}.qpj-k{margin:0 0 9px;color:#8fe7ba;font-size:12px;font-weight:800;letter-spacing:.16em}.qpj-title{margin:0;font-family:"Josefin Sans",Inter,Sukhumvit,system-ui,sans-serif;font-size:clamp(42px,5.4vw,76px);line-height:.96;font-weight:700;letter-spacing:0;text-wrap:balance}.qpj-title span{display:block;margin-top:10px;color:#8fe7ba;font-family:Sukhumvit,Inter,sans-serif;font-size:.28em;line-height:1.2;letter-spacing:0;text-wrap:balance}.qpj-sub{max-width:560px;margin:10px 0 0;color:rgba(244,251,247,.66);font-size:15px;line-height:1.7;text-wrap:pretty}.qpj-hero-card{display:none}',
    '.qpj-game{display:grid;grid-template-columns:295px minmax(0,1fr);gap:18px;align-items:start}.qpj-classes{border:1px solid rgba(143,231,186,.16);border-radius:10px;background:linear-gradient(180deg,rgba(6,16,12,.72),rgba(2,6,4,.5));box-shadow:0 22px 64px rgba(0,31,22,.22),inset 0 1px 0 rgba(255,255,255,.04);backdrop-filter:blur(12px);padding:14px;min-width:0}.qpj-panel-title{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 12px;color:rgba(244,251,247,.74);font-size:11px;letter-spacing:.16em}.qpj-panel-title span{color:rgba(143,231,186,.82)}.qpj-class-list{display:grid;gap:10px}.qpj-class{width:100%;border:1px solid rgba(244,251,247,.095);border-radius:10px;background:rgba(255,255,255,.016);padding:13px;text-align:left;color:#f4fbf7;cursor:pointer;transition:border-color .24s cubic-bezier(.16,1,.3,1),background .24s cubic-bezier(.16,1,.3,1),box-shadow .24s cubic-bezier(.16,1,.3,1),transform .24s cubic-bezier(.16,1,.3,1)}.qpj-class:hover{transform:translateY(-2px);border-color:rgba(143,231,186,.28);background:rgba(255,255,255,.026)}.qpj-class:active{transform:translateY(0) scale(.988)}.qpj-class.on{border-color:var(--c);background:linear-gradient(135deg,var(--bg),rgba(255,255,255,.022));box-shadow:0 0 26px var(--glow),inset 0 1px 0 rgba(255,255,255,.05)}.qpj-class-head{display:flex;gap:11px;align-items:center}.qpj-avatar{display:grid;place-items:center;flex:0 0 42px;height:42px;border-radius:9px;border:1px solid var(--c);background:var(--bg);color:var(--c);font-size:13px;font-weight:900}.qpj-class b{display:block;color:var(--name,#f4fbf7);font-size:13px;line-height:1.28;text-wrap:balance}.qpj-class small{display:block;margin-top:4px;color:rgba(244,251,247,.58);font-size:11px;line-height:1.45;text-wrap:pretty}.qpj-class.on small{color:rgba(244,251,247,.72)}.qpj-class-out{display:inline-flex;margin-top:10px;border-top:1px solid rgba(244,251,247,.07);padding-top:9px;color:var(--c);font-size:10px;line-height:1.4;letter-spacing:.12em}',
    '.qpj-tree-panel{min-width:0;border:1px solid rgba(143,231,186,.16);border-radius:10px;background:linear-gradient(180deg,rgba(5,14,10,.62),rgba(2,7,5,.5));box-shadow:0 26px 90px rgba(0,31,22,.24),inset 0 1px 0 rgba(255,255,255,.04);backdrop-filter:blur(12px);overflow:hidden}.qpj-tree-top{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:18px;align-items:center;border-bottom:1px solid rgba(143,231,186,.14);padding:15px 17px;background:linear-gradient(180deg,rgba(143,231,186,.04),rgba(255,255,255,.008))}.qpj-tree-k{margin:0 0 5px;color:var(--c);font-size:11px;font-weight:800;letter-spacing:.15em}.qpj-tree-title{margin:0;color:#f4fbf7;font-size:23px;line-height:1.16;text-wrap:balance}.qpj-tree-copy{max-width:760px;margin:7px 0 0;color:rgba(244,251,247,.58);font-size:13px;line-height:1.65;text-wrap:pretty}.qpj-route{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}.qpj-chip{display:inline-flex;align-items:center;min-height:30px;border:1px solid rgba(244,251,247,.1);border-radius:7px;background:rgba(255,255,255,.018);padding:0 10px;color:rgba(244,251,247,.62);font-size:11px}.qpj-chip.hot{border-color:var(--c);color:var(--c);background:var(--bg);box-shadow:inset 0 1px 0 rgba(255,255,255,.04)}',
    '.qpj-tree-scroll{position:relative;max-width:100%;overflow-x:auto;overflow-y:hidden;overscroll-behavior-x:contain;scrollbar-width:thin;scrollbar-color:rgba(143,231,186,.38) rgba(255,255,255,.05)}.qpj-tree-scroll::-webkit-scrollbar{height:10px}.qpj-tree-scroll::-webkit-scrollbar-track{background:rgba(255,255,255,.04)}.qpj-tree-scroll::-webkit-scrollbar-thumb{background:rgba(143,231,186,.35);border-radius:99px}.qpj-canvas{position:relative;width:1032px;height:660px;min-width:1032px;background:radial-gradient(circle at 54% 52%,rgba(143,231,186,.07),transparent 34%),linear-gradient(180deg,rgba(255,255,255,.012),rgba(255,255,255,0));overflow:hidden}.qpj-canvas:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(244,251,247,.032) 1px,transparent 1px),linear-gradient(90deg,rgba(244,251,247,.024) 1px,transparent 1px);background-size:28px 28px;opacity:.55}.qpj-edges{position:absolute;inset:0;z-index:1;width:1032px;height:660px;overflow:visible}.qpj-edge{fill:none;stroke-linecap:round;stroke-linejoin:round;opacity:.52;filter:drop-shadow(0 0 8px rgba(143,231,186,.09))}.qpj-edge.hot{opacity:1;filter:drop-shadow(0 0 10px var(--glow))}.qpj-edge.dim{opacity:.18;filter:none}.qpj-edge-chip{position:absolute;z-index:3;min-width:42px;height:22px;display:grid;place-items:center;border:1px solid rgba(244,251,247,.14);border-radius:5px;background:#060a09;color:rgba(244,251,247,.5);font-size:10px;transform:translate(-50%,-50%);box-shadow:0 8px 18px rgba(0,20,14,.35)}.qpj-edge-chip.hot{border-color:var(--c);color:#06110c;background:var(--c)}.qpj-edge-chip.dim{opacity:.22}.qpj-label{position:absolute;z-index:2;color:var(--c);font-size:10px;font-weight:800;letter-spacing:.12em;text-shadow:0 0 18px var(--glow)}.qpj-label.dim{opacity:.32}.qpj-nodes{position:absolute;inset:0;z-index:4}.qpj-node{position:absolute;width:var(--w);height:var(--h);border:1.5px solid rgba(244,251,247,.14);border-radius:9px;background:linear-gradient(180deg,rgba(255,255,255,.042),rgba(255,255,255,.012));color:#f4fbf7;text-align:left;padding:9px 9px 24px;cursor:pointer;box-shadow:0 16px 36px rgba(0,23,16,.3),inset 0 1px 0 rgba(255,255,255,.035);transition:opacity .24s cubic-bezier(.16,1,.3,1),transform .24s cubic-bezier(.16,1,.3,1),border-color .24s cubic-bezier(.16,1,.3,1),box-shadow .24s cubic-bezier(.16,1,.3,1),background .24s cubic-bezier(.16,1,.3,1)}.qpj-node:hover,.qpj-node.sel{transform:translateY(-2px);border-color:var(--c);box-shadow:0 18px 48px rgba(0,23,16,.34),0 0 26px var(--glow),inset 0 1px 0 rgba(255,255,255,.05)}.qpj-node:active{transform:translateY(0) scale(.988)}.qpj-node.hot{border-color:var(--c);background:linear-gradient(180deg,var(--bg),rgba(255,255,255,.018))}.qpj-node.dim{opacity:.25;filter:saturate(.4)}.qpj-node.foundation{border-color:rgba(255,255,255,.2)}.qpj-node.foundation.hot{border-color:rgba(205,187,98,.6);background:linear-gradient(180deg,rgba(205,187,98,.14),rgba(255,255,255,.015))}.qpj-node.job{height:84px;padding-bottom:28px}.qpj-node-top{display:flex;gap:8px;align-items:center;min-width:0}.qpj-sym{display:grid;place-items:center;flex:0 0 30px;height:30px;border:1px solid var(--c);border-radius:7px;background:var(--bg);color:var(--c);font-size:10px;font-weight:900}.qpj-node-title{display:block;min-width:0;color:#f4fbf7;font-size:12px;line-height:1.22;font-weight:800;overflow-wrap:anywhere;text-wrap:balance}.qpj-node-tag{display:block;margin-top:4px;color:var(--c);font-size:9px;letter-spacing:.09em}.qpj-max{position:absolute;left:0;right:0;bottom:0;height:19px;display:grid;place-items:center;border-top:1px solid rgba(244,251,247,.1);border-radius:0 0 8px 8px;background:#050706;color:rgba(244,251,247,.72);font-size:9px;font-weight:800;letter-spacing:.06em}.qpj-node.hot .qpj-max{color:var(--c);border-color:rgba(244,251,247,.14)}.qpj-node.sel .qpj-max{background:var(--c);color:#06110c}.qpj-detail{border-top:1px solid rgba(143,231,186,.14);padding:17px}.qpj-detail-grid{display:grid;grid-template-columns:minmax(0,1fr) 280px;gap:16px}.qpj-detail h3{margin:0;color:#f4fbf7;font-size:25px;line-height:1.16;text-wrap:balance}.qpj-detail p{max-width:66ch;margin:8px 0 0;color:rgba(244,251,247,.66);font-size:14px;line-height:1.78;text-wrap:pretty}.qpj-detail ul{margin:12px 0 0;padding:0;list-style:none;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.qpj-detail li{border:1px solid rgba(244,251,247,.1);border-radius:8px;background:rgba(255,255,255,.018);padding:9px;color:rgba(244,251,247,.72);font-size:12px;line-height:1.5}.qpj-mission{border:1px solid var(--c);border-radius:9px;background:var(--bg);padding:13px;align-self:start;box-shadow:inset 0 1px 0 rgba(255,255,255,.04)}.qpj-mission b{display:block;color:var(--c);font-size:11px;letter-spacing:.12em}.qpj-mission span{display:block;margin-top:8px;color:rgba(244,251,247,.75);font-size:13px;line-height:1.65}.qpj-note{margin-top:18px;border:1px dashed rgba(114,210,200,.26);border-radius:9px;padding:14px;color:rgba(244,251,247,.62);font-size:13px;line-height:1.7}.qpj-note a{color:#72d2c8}',
    '@media(max-width:1050px){.qpj-hero{grid-template-columns:1fr}.qpj-game{grid-template-columns:1fr}.qpj-class-list{display:flex;gap:10px;overflow-x:auto;scroll-snap-type:x proximity;scroll-padding-inline:22px;scrollbar-width:none;padding:0 22px 10px 0}.qpj-class-list::-webkit-scrollbar{display:none}.qpj-class{flex:0 0 292px;scroll-snap-align:center}.qpj-tree-panel{width:100%}}',
    '@media(max-width:860px){.qph{height:62px;padding:0 18px}.qpbrand{font-size:13px}.qpmenu{display:block;position:fixed;right:18px;top:12px;z-index:2147483475;background:#8fe7ba;color:#06110c;border-color:#8fe7ba}.qpnav{position:fixed;left:12px;right:12px;top:70px;z-index:2147483474;display:grid;gap:0;padding:8px;border:1px solid rgba(143,231,186,.22);border-radius:10px;background:#060a09;box-shadow:0 24px 70px rgba(0,23,16,.46);opacity:0;visibility:hidden;transform:translateY(-8px);transition:opacity .22s ease,visibility .22s ease,transform .22s ease}.qpopen .qpnav{opacity:1;visibility:visible;transform:translateY(0)}.qpnav a{min-height:42px;display:flex;align-items:center;padding:0 10px}.qpmain{padding:28px 14px 96px}.qpj-title{font-size:clamp(38px,12vw,54px)}.qpj-sub{font-size:14.5px}.qpj-game{gap:13px}.qpj-classes{padding:12px;overflow:hidden}.qpj-class{flex-basis:266px}.qpj-tree-top{grid-template-columns:1fr;gap:10px;padding:13px}.qpj-route{justify-content:flex-start}.qpj-tree-title{font-size:20px}.qpj-tree-scroll:before{content:"เลื่อนแนวนอนเพื่อดู SKILL UNLOCK ->";position:sticky;left:12px;top:10px;z-index:9;display:inline-flex;align-items:center;height:28px;margin:10px 0 -38px 12px;border:1px solid rgba(143,231,186,.22);border-radius:7px;background:rgba(4,12,9,.88);backdrop-filter:blur(10px);padding:0 10px;color:rgba(143,231,186,.86);font:700 10px/1 "IBM Plex Mono",monospace;letter-spacing:.08em}.qpj-canvas{width:1032px;min-width:1032px;height:640px}.qpj-edges{width:1032px;height:640px}.qpj-detail-grid{grid-template-columns:1fr}.qpj-detail h3{font-size:21px}.qpj-node{touch-action:manipulation}}',
    '@media(max-width:860px){html.qp-open #qc-social-links{left:auto!important;right:12px!important;bottom:12px!important;width:auto!important;height:44px!important;display:flex!important;grid-template-columns:none!important;gap:8px!important;z-index:2147483476!important}html.qp-open #qc-social-links a{width:44px!important;min-width:44px!important;height:44px!important;border-radius:999px!important;padding:0!important;justify-content:center!important}html.qp-open #qc-social-links a span{display:none!important}html.qp-open #qc-social-links a i{margin:0!important}}',
    '@media(prefers-reduced-motion:reduce){#qc-pathway-page *,#qc-pathway-page *:before,#qc-pathway-page *:after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}'
  ].join("");

  var style = document.createElement("style");
  style.id = "qc-pathway-style";
  style.textContent = css;
  document.head.appendChild(style);
  document.documentElement.classList.add("qp-open");

  var root = document.createElement("div");
  root.id = "qc-pathway-page";
  root.innerHTML = ''
    + '<div class="qpbg"><video autoplay muted loop playsinline preload="metadata" poster="' + poster + '" aria-hidden="true"><source src="' + video + '" type="video/mp4"></video></div>'
    + '<div class="qpshell">'
    + '<header class="qph"><a class="qpbrand qpm" href="/">▚ QUANTCORNER</a><nav class="qpnav qpm" aria-label="QuantCorner navigation"><a href="/articles">/articles</a><a class="on" href="/?roadmap=1">/series</a><a href="/?tools=1">/tools</a><a href="/about-3">/about</a><a href="https://www.quantseras.com/" target="_blank" rel="noopener">/quantseras</a></nav><button class="qpmenu" type="button" aria-label="เปิดเมนู" aria-expanded="false"><span></span><span></span><span></span></button></header>'
    + '<main class="qpmain">'
    + '<section class="qpj-hero" aria-labelledby="qpj-title"><div><p class="qpj-k qpm">QUANT PATHWAY</p><h1 class="qpj-title" id="qpj-title">Quant Skills Tree</h1><p class="qpj-sub">เลือก class ด้านซ้ายเพื่อ highlight skill route ด้านขวา</p></div></section>'
    + '<section class="qpj-game" aria-label="Quant skills tree"><aside class="qpj-classes"><h2 class="qpj-panel-title qpm">SELECT CLASS <span>4 PATHS</span></h2><div class="qpj-class-list"></div></aside><section class="qpj-tree-panel"><div class="qpj-tree-top"><div><p class="qpj-tree-k qpm"></p><h2 class="qpj-tree-title"></h2><p class="qpj-tree-copy"></p></div><div class="qpj-route"></div></div><div class="qpj-tree-scroll" aria-label="Skills tree scroll area"><div class="qpj-canvas"><svg class="qpj-edges" viewBox="0 0 1032 660" preserveAspectRatio="none" aria-hidden="true"></svg><div class="qpj-labels"></div><div class="qpj-nodes"></div></div></div><div class="qpj-detail"></div></section></section>'
    + '</main></div>';
  document.documentElement.appendChild(root);

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function(c) {
      return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];
    });
  }

  function findClass(id) {
    return classes.filter(function(c) { return c.id === id; })[0];
  }

  function findNode(id) {
    return nodes.filter(function(n) { return n.id === id; })[0];
  }

  function dims(n) {
    if (n.type === "foundation") return {w: 210, h: 74};
    if (n.type === "job") return {w: 176, h: 84};
    return {w: 172, h: 64};
  }

  function activeJobId(cls) {
    return "job_" + (cls === "pricing" ? "pricing" : cls);
  }

  function hot(n) {
    return n.branch === "core" || n.branch === activeClass || n.id === activeJobId(activeClass);
  }

  function selectedColor(node) {
    if (node.branch === "core") return "#CDBB62";
    var c = findClass(node.branch);
    return c ? c.color : "#E8F5EE";
  }

  function selectedGlow(node) {
    if (node.branch === "core") return "rgba(205,187,98,.2)";
    var c = findClass(node.branch);
    return c ? c.glow : "rgba(232,245,238,.18)";
  }

  function selectedBg(node, a) {
    if (node.branch === "core") return "rgba(205,187,98," + (a || .11) + ")";
    var c = findClass(node.branch);
    if (c && c.id === "pm") return "rgba(143,231,186," + (a || .1) + ")";
    if (c && c.id === "pricing") return "rgba(217,200,106," + (a || .1) + ")";
    if (c && c.id === "trader") return "rgba(114,210,200," + (a || .1) + ")";
    if (c && c.id === "risk") return "rgba(183,167,230," + (a || .1) + ")";
    return "rgba(244,251,247,.08)";
  }

  function edgeOwner(a, b) {
    var A = findNode(a), B = findNode(b);
    if (!A || !B) return "core";
    if (A.branch !== "core" && B.branch !== "core") return A.branch;
    if (B.branch !== "core") return B.branch;
    return "core";
  }

  function edgePath(A, B) {
    var da = dims(A), db = dims(B);
    if (A.x === B.x) {
      var cx = A.x + da.w / 2;
      return {
        d: "M " + cx + " " + (A.y + da.h) + " L " + cx + " " + B.y,
        chipX: cx,
        chipY: (A.y + da.h + B.y) / 2
      };
    }
    var sx = A.x + da.w, sy = A.y + da.h / 2;
    var ex = B.x, ey = B.y + db.h / 2;
    var mx = (sx + ex) / 2;
    var d = "M " + sx + " " + sy + " L " + mx + " " + sy + " L " + mx + " " + ey + " L " + ex + " " + ey;
    return {d: d, chipX: mx, chipY: (sy + ey) / 2};
  }

  function renderClasses() {
    var html = classes.map(function(c) {
      var on = c.id === activeClass;
      return '<button class="qpj-class ' + (on ? "on" : "") + '" type="button" data-class="' + c.id + '" style="--c:' + c.color + ';--bg:' + classBg(c.id, .1) + ';--glow:' + c.glow + ';--name:' + (on ? c.color : "#f4fbf7") + '">'
        + '<div class="qpj-class-head"><span class="qpj-avatar qpm">' + esc(c.short) + '</span><span><b>' + esc(c.name) + '</b><small>' + esc(c.thai) + '</small></span></div>'
        + '</button>';
    }).join("");
    root.querySelector(".qpj-class-list").innerHTML = html;
    root.querySelectorAll("[data-class]").forEach(function(btn) {
      btn.onclick = function() {
        activeClass = btn.getAttribute("data-class");
        selectedNode = activeJobId(activeClass);
        render();
      };
    });
    var activeBtn = root.querySelector(".qpj-class.on");
    var classList = root.querySelector(".qpj-class-list");
    if (activeBtn && classList && window.matchMedia && window.matchMedia("(max-width: 1050px)").matches) {
      requestAnimationFrame(function() {
        var target = activeBtn.offsetLeft - (classList.clientWidth - activeBtn.offsetWidth) / 2;
        classList.scrollTo({left: Math.max(0, target), behavior: "smooth"});
      });
    }
  }

  function classBg(id, a) {
    if (id === "pm") return "rgba(143,231,186," + a + ")";
    if (id === "pricing") return "rgba(217,200,106," + a + ")";
    if (id === "trader") return "rgba(114,210,200," + a + ")";
    if (id === "risk") return "rgba(183,167,230," + a + ")";
    return "rgba(244,251,247," + a + ")";
  }

  function renderTop() {
    var c = findClass(activeClass);
    var top = root.querySelector(".qpj-tree-top");
    top.style.setProperty("--c", c.color);
    top.style.setProperty("--bg", classBg(c.id, .1));
    root.querySelector(".qpj-tree-k").textContent = "ACTIVE BRANCH";
    root.querySelector(".qpj-tree-title").textContent = c.name;
    root.querySelector(".qpj-tree-copy").textContent = c.thai;
    root.querySelector(".qpj-route").innerHTML = [
      '<span class="qpj-chip hot qpm" style="--c:' + c.color + ';--bg:' + classBg(c.id, .1) + '">ACTIVE ' + esc(c.short) + '</span>'
    ].join("");
  }

  function renderLabels() {
    root.querySelector(".qpj-labels").innerHTML = branchLabels.map(function(l) {
      var dim = l.branch !== "core" && l.branch !== activeClass;
      return '<div class="qpj-label qpm ' + (dim ? "dim" : "") + '" style="left:' + l.x + 'px;top:' + l.y + 'px;--c:' + l.color + ';--glow:' + (l.branch === "core" ? "rgba(205,187,98,.2)" : (findClass(l.branch) || {}).glow || "rgba(244,251,247,.2)") + '">' + esc(l.text) + '</div>';
    }).join("");
  }

  function renderEdges() {
    var chipHtml = [];
    var svg = edges.map(function(e) {
      var A = findNode(e[0]), B = findNode(e[1]);
      var p = edgePath(A, B);
      var owner = edgeOwner(e[0], e[1]);
      var isHot = owner === "core" || owner === activeClass;
      var c = owner === "core" ? "#CDBB62" : (findClass(owner) || {}).color || "#E8F5EE";
      var glow = owner === "core" ? "rgba(205,187,98,.2)" : (findClass(owner) || {}).glow || "rgba(244,251,247,.16)";
      chipHtml.push('<span class="qpj-edge-chip qpm ' + (isHot ? "hot" : "dim") + '" style="left:' + p.chipX + 'px;top:' + p.chipY + 'px;--c:' + c + '">' + esc(e[2]) + '</span>');
      return '<path class="qpj-edge ' + (isHot ? "hot" : "dim") + '" d="' + p.d + '" stroke="' + (isHot ? c : "rgba(244,251,247,.22)") + '" stroke-width="' + (isHot ? "7" : "5") + '" style="--glow:' + glow + '"></path>';
    }).join("");
    root.querySelector(".qpj-edges").innerHTML = svg;
    var existing = root.querySelectorAll(".qpj-edge-chip");
    existing.forEach(function(x){ x.remove(); });
    root.querySelector(".qpj-canvas").insertAdjacentHTML("beforeend", chipHtml.join(""));
  }

  function renderNodes() {
    root.querySelector(".qpj-nodes").innerHTML = nodes.map(function(n) {
      var d = dims(n);
      var isHot = hot(n);
      var sel = n.id === selectedNode;
      var color = selectedColor(n);
      var glow = selectedGlow(n);
      var bg = selectedBg(n, isHot ? .12 : .04);
      var cls = ["qpj-node", n.type === "foundation" ? "foundation" : "", n.type === "job" ? "job" : "", isHot ? "hot" : "dim", sel ? "sel" : ""].join(" ");
      return '<button class="' + cls + '" type="button" data-node="' + n.id + '" style="left:' + n.x + 'px;top:' + n.y + 'px;--w:' + d.w + 'px;--h:' + d.h + 'px;--c:' + color + ';--glow:' + glow + ';--bg:' + bg + '">'
        + '<span class="qpj-node-top"><span class="qpj-sym qpm">' + esc(n.sym) + '</span><span><span class="qpj-node-title">' + esc(n.title) + '</span><span class="qpj-node-tag qpm">' + esc(n.tag) + '</span></span></span>'
        + '<span class="qpj-max qpm">' + esc(n.max) + '</span>'
        + '</button>';
    }).join("");
    root.querySelectorAll("[data-node]").forEach(function(btn) {
      btn.onclick = function() {
        selectedNode = btn.getAttribute("data-node");
        renderNodes();
        renderDetail();
      };
    });
  }

  function renderDetail() {
    var n = findNode(selectedNode) || findNode(activeJobId(activeClass));
    var c = n.branch === "core" ? findClass(activeClass) : findClass(n.branch);
    var color = n.branch === "core" ? "#CDBB62" : c.color;
    var bg = n.branch === "core" ? "rgba(205,187,98,.09)" : classBg(c.id, .1);
    root.querySelector(".qpj-detail").style.setProperty("--c", color);
    root.querySelector(".qpj-detail").style.setProperty("--bg", bg);
    root.querySelector(".qpj-detail").innerHTML = '<div class="qpj-detail-grid"><div><p class="qpj-tree-k qpm" style="color:' + color + '">' + esc(n.tag) + ' / ' + esc(n.max) + '</p><h3>' + esc(n.title) + '</h3><p>' + esc(n.desc) + '</p></div><aside class="qpj-mission"><b class="qpm">EXERCISE</b><span>' + esc(n.exercise) + '</span><b class="qpm" style="margin-top:13px">OUTPUT</b><span>' + esc((n.branch === "core" ? findClass(activeClass) : c).output) + '</span></aside></div>';
  }

  function render() {
    renderClasses();
    renderTop();
    renderLabels();
    renderEdges();
    renderNodes();
    renderDetail();
    var params = new URLSearchParams(location.search);
    if (history.replaceState && params.get("class") !== activeClass) {
      params.set("class", activeClass);
      var newUrl = location.pathname + "?" + params.toString() + location.hash;
      if (location.protocol !== "file:") history.replaceState(null, "", newUrl);
    }
  }

  var menu = root.querySelector(".qpmenu");
  menu.onclick = function() {
    var open = root.classList.toggle("qpopen");
    menu.setAttribute("aria-expanded", open ? "true" : "false");
  };
  root.querySelectorAll(".qpnav a").forEach(function(a) {
    a.onclick = function() {
      root.classList.remove("qpopen");
      menu.setAttribute("aria-expanded", "false");
    };
  });

  var vid = root.querySelector("video");
  if (vid) {
    var play = vid.play && vid.play();
    if (play && play.catch) play.catch(function(){});
  }

  render();
})();
