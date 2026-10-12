// Black Bank side menu. Add <script src="nav.js"></script> to any page.
(function(){
  var links=[["index.html","Home"],["order.html","Order a card"],["balance.html","Check balance"],["admin.html","Banker login"]];
  var here=location.pathname.split("/").pop()||"index.html";
  var css=document.createElement("style");
  css.textContent=".bbm{position:fixed;top:calc(12px + env(safe-area-inset-top,0px));left:12px;z-index:50;width:42px;height:42px;border-radius:12px;border:1px solid #2a2a2e;background:rgba(17,17,20,.85);color:#c9a24b;font-size:1.2rem;cursor:pointer;backdrop-filter:blur(6px)}"+
  ".bbd{position:fixed;inset:0 auto 0 0;width:260px;max-width:80vw;background:#0b0b0d;border-right:1px solid #2a2a2e;z-index:60;padding:70px 22px 22px;transform:translateX(-105%);transition:transform .3s ease;font-family:Georgia,serif}"+
  ".bbd.open{transform:none}.bbd b{position:absolute;top:24px;left:22px;letter-spacing:6px;color:#f4f1ea;font-weight:600;font-size:.95rem}"+
  ".bbd a{display:block;padding:14px 0;color:#8d8a82;text-decoration:none;letter-spacing:2px;text-transform:uppercase;font-size:.85rem;border-bottom:1px solid #1b1b1f}"+
  ".bbd a.on,.bbd a:hover{color:#c9a24b}.bbs{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:55;display:none}.bbs.open{display:block}";
  document.head.appendChild(css);
  var s=document.createElement("div");s.className="bbs";
  var d=document.createElement("nav");d.className="bbd";
  var t=document.createElement("b");t.textContent="BLACK BANK";d.appendChild(t);
  links.forEach(function(l){var a=document.createElement("a");a.href=l[0];a.textContent=l[1];if(l[0]===here)a.className="on";d.appendChild(a)});
  var m=document.createElement("button");m.className="bbm";m.textContent="☰";m.setAttribute("aria-label","Menu");
  function tog(){d.classList.toggle("open");s.classList.toggle("open")}
  m.onclick=tog;s.onclick=tog;
  document.body.append(s,d,m);
})();
