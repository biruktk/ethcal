
// Compact Ethiopian calendar conversion (algorithm adapted from common civil formulas)
const MONTHS=["Meskerem","Tikimt","Hidar","Tahsas","Tir","Yekatit","Megabit","Miazia","Ginbot","Sene","Hamle","Nehase","Pagume"];
function isEthLeap(y){return y%4===3}
function ethToJdn(y,m,d){return Math.floor(1723856 + 365*(y-1) + Math.floor(y/4) + 30*(m-1) + d - 1)}
function jdnToGreg(jdn){
  const a=jdn+32044; const b=Math.floor((4*a+3)/146097); const c=a-Math.floor(146097*b/4);
  const d=Math.floor((4*c+3)/1461); const e=c-Math.floor(1461*d/4); const m=Math.floor((5*e+2)/153);
  const day=e-Math.floor((153*m+2)/5)+1; const month=m+3-12*Math.floor(m/10); const year=100*b+d-4800+Math.floor(m/10);
  return {year,month,day};
}
function gregToJdn(y,m,d){
  const a=Math.floor((14-m)/12); y=y+4800-a; m=m+12*a-3;
  return d+Math.floor((153*m+2)/5)+365*y+Math.floor(y/4)-Math.floor(y/100)+Math.floor(y/400)-32045;
}
function jdnToEth(jdn){
  const r=jdn-1723856; const n=Math.floor(r/1461); const rem=r-1461*n; const a=Math.floor((rem)/365)-(rem===1460?1:0);
  const year=4*n+a; const rem2=rem-365*a; const month=Math.floor(rem2/30)+1; const day=rem2%30+1; return {year,month,day};
}
document.getElementById("g").valueAsDate=new Date();
document.getElementById("toEth").onclick=()=>{
  const v=document.getElementById("g").valueAsDate; if(!v)return;
  const j=gregToJdn(v.getFullYear(), v.getMonth()+1, v.getDate());
  const e=jdnToEth(j);
  document.getElementById("out").textContent=`${e.day} ${MONTHS[e.month-1]} ${e.year}\\n(${e.year}-${e.month}-${e.day})`;
  document.getElementById("ey").value=e.year; document.getElementById("em").value=e.month; document.getElementById("ed").value=e.day;
};
document.getElementById("toGreg").onclick=()=>{
  const y=+ey.value,m=+em.value,d=+ed.value; const j=ethToJdn(y,m,d); const g=jdnToGreg(j);
  const iso=`${g.year}-${String(g.month).padStart(2,"0")}-${String(g.day).padStart(2,"0")}`;
  document.getElementById("out").textContent=iso; document.getElementById("g").value=iso;
};
document.getElementById("toEth").click();
