// Black Bank shared script: side menu, install button, service worker, mobile tweaks.
(function(){
  var links=[["index.html","Home"],["order.html","Order a card"],["balance.html","Account"],["admin.html","Banker login"]];
  var here=location.pathname.split("/").pop()||"index.html";
  var standalone=(window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches)||navigator.standalone;
  var ios=/iphone|ipad|ipod/i.test(navigator.userAgent);
  var css=document.createElement("style");
  css.textContent=".bbm{position:fixed;top:calc(12px + env(safe-area-inset-top,0px));left:12px;z-index:50;width:44px;height:44px;border-radius:12px;border:1px solid #2a2a2e;background:rgba(17,17,20,.85);color:#c9a24b;font-size:1.2rem;cursor:pointer;backdrop-filter:blur(6px)}"+
  ".bbd{position:fixed;inset:0 auto 0 0;width:270px;max-width:82vw;background:#0b0b0d;border-right:1px solid #2a2a2e;z-index:60;padding:calc(70px + env(safe-area-inset-top,0px)) 22px 22px;transform:translateX(-105%);transition:transform .3s ease;font-family:Georgia,serif}"+
  ".bbd.open{transform:none}.bbd b{position:absolute;top:calc(24px + env(safe-area-inset-top,0px));left:22px;letter-spacing:6px;color:#f4f1ea;font-weight:600;font-size:.95rem}"+
  ".bbd a{display:block;padding:16px 0;color:#8d8a82;text-decoration:none;letter-spacing:2px;text-transform:uppercase;font-size:.85rem;border-bottom:1px solid #1b1b1f}"+
  ".bbd a.on,.bbd a:hover{color:#c9a24b}.bbd a.bbi{color:#c9a24b;display:none}.bbs{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:55;display:none}.bbs.open{display:block}"+
  "html{-webkit-text-size-adjust:100%}body{-webkit-tap-highlight-color:transparent;overscroll-behavior-y:none}button,a,input,select{touch-action:manipulation}"+
  "input,select,textarea{font-size:max(16px,1em)}@media (pointer:coarse){button:not(.sm){min-height:44px}}";
  document.head.appendChild(css);
  var s=document.createElement("div");s.className="bbs";
  var d=document.createElement("nav");d.className="bbd";
  var t=document.createElement("b");t.textContent="BLACK BANK";d.appendChild(t);
  links.forEach(function(l){var a=document.createElement("a");a.href=l[0];a.textContent=l[1];if(l[0]===here)a.className="on";d.appendChild(a)});
  var inst=document.createElement("a");inst.href="#";inst.className="bbi";inst.textContent="Install app";d.appendChild(inst);
  var m=document.createElement("button");m.className="bbm";m.textContent="\u2630";m.setAttribute("aria-label","Menu");
  function tog(){d.classList.toggle("open");s.classList.toggle("open")}
  m.onclick=tog;s.onclick=tog;
  document.body.append(s,d,m);

  // Install button: Android/Chrome offers a real prompt; iPhone needs Share > Add to Home Screen.
  var dp=null;
  if(!standalone&&ios)inst.style.display="block";
  window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();dp=e;if(!standalone)inst.style.display="block"});
  window.addEventListener("appinstalled",function(){inst.style.display="none"});
  inst.onclick=function(e){
    e.preventDefault();
    if(dp){dp.prompt();dp.userChoice.then(function(){dp=null;inst.style.display="none"})}
    else alert("To install: tap the Share button in Safari, then choose Add to Home Screen.");
  };

  if("serviceWorker" in navigator&&(location.protocol==="https:"||location.hostname==="localhost")){
    window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js").catch(function(){})});
  }
})();
