//Variables

var m = Math;
document.getElementById("myImg").src = "img/hemi.png";

//Impact

function Impact() {
  var h = document.getElementById("height").value;
  document.getElementById("impact").value = m.round(m.sqrt(2*9.81*h)*100)/100;
}
//Table

var row1 =
document.getElementById("myTable").insertRow(0);
var row2 =
document.getElementById("myTable").insertRow(1);

function table(a,b) {
var cell1 = row1.insertCell();
var cell2 = row2.insertCell();
cell1.innerHTML = a;
cell2.innerHTML = b;
}
//Canopy Selector

function selector() {
  document.getElementById("cd").value = document.getElementById("canopy").value;

  if (document.getElementById("canopy").value == 0.92) {
    document.getElementById("myImg").src = "img/elli.png";
  }
  else {
    document.getElementById("myImg").src = "img/hemi.png";

  }
}

// Diameter Calculator
function Diameter() {
  var weight = document.getElementById("weight").value;
  var velocity = document.getElementById("velocity").value;
  var cd = document.getElementById("cd").value;
  var rho = document.getElementById("rho").value;
  var rR = document.getElementById("spill").value/100;
  var cs = m.pow(m.cos(rR*0.5*m.PI),2)
  var area = m.round(weight*2*981/(rho*m.pow(velocity,2)*cd*cs))/100;
  var D = 2*m.sqrt(weight*9.81/(m.PI*rho*m.pow(velocity,2)*cd*cs));
  document.getElementById("spillDia").value = m.round(rR*D*1000)/10;
  document.getElementById("area").value = area;
  document.getElementById("diameter").value = m.round(D*1000)/10;
  document.getElementById("diameterIn").value = m.round(D*1000/2.54)/10;


}

//Gore Selector
function gore() {
  var D = document.getElementById("diameter").value;
  var n = document.getElementById("no_gores").value;
  if (document.getElementById("canopy").value == 0.75) {
    hemi(D,n);
  }
  else if (document.getElementById("canopy").value == 0.92) {
    elli(D,n);
  }
  else {
    console.log("else");
  }
}

/*==============================
          HemiSphere
================================*/

var hemi = function(D,n){

var r = D*10/2; //Hemisphere radius.
var j = 0; //counter
var xc = 4*r*m.PI/n;
var yc = 1.1*r*m.PI/2 + 100;
var ya = xc/2;
var xa = yc*0.95;
document.getElementById("myCanvas").width = xc;
document.getElementById("myCanvas").height = yc;
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
console.log(" # | Rad | x | y ");

//Background
  ctx.beginPath();
  ctx.fillStyle = "lightyellow";
  ctx.fillRect(0,0,xc,yc);
  ctx.closePath();
//Background Grid
ctx.beginPath();
for (var i = 0; i <=yc; i += 0.05*yc) {
  ctx.moveTo(0,i);
  ctx.lineTo(xc,i);
}

for (var i = 0; i <=xc; i += 0.05*xc) {
  ctx.moveTo(i,0);
  ctx.lineTo(i,yc);
}
ctx.strokeStyle = "#bfbfbf";
ctx.lineWidth = 1;
ctx.stroke();
ctx.closePath();
//Axis
ctx.beginPath();
ctx.moveTo(5,xa);
ctx.lineTo(xc-5,xa);
ctx.moveTo(ya,5);
ctx.lineTo(ya,yc-5);
ctx.strokeStyle = "green";
ctx.lineWidth = 2;
ctx.fillStyle = "#000";
ctx.fillText("X-axis",5,xa-10);
ctx.fillText("Y-axis",ya+5,20);
ctx.stroke();
ctx.closePath();
//Plot
ctx.beginPath();
ctx.font = "16px Arial";
ctx.fillStyle = "red";
for (var i = 0; i <= m.PI/2;i+=m.PI/10) {
  j++
  var x = ya + (m.cos(i)*r*m.PI/n);
  var y = xa - (i*r);
  var X = m.round(x-ya);
  var Y = -m.round(y-xa);
  ctx.lineTo(x,y);
  ctx.fillText("x:"+X/10+" cm",x+15,y);
  ctx.fillText("y:"+Y/10+" cm",x+15,y-15);
  ctx.fillRect(x-5,y-5,10,10);
  table(X/10,Y/10);
  console.log( j + "|" + m.round(i*100)/100 + "|" + m.round(x)/10 + "|" + m.round(y)/10);
}
for (var i = m.PI/2-m.PI/10; i >= 0;i-=m.PI/10) {
  j++
  var x = ya - (m.cos(i)*r*m.PI/n);
  var y = xa - (i*r);
  var X = m.round(x-ya);
  var Y = -m.round(y-xa);
  ctx.fillText("x:"+X/10+" cm",x+10,y);
  ctx.fillText("y:"+Y/10+" cm",x+10,y-15);
  ctx.fillRect(x-5,y-5,10,10);
  ctx.lineTo(x,y);
  table(X/10,Y/10);
  console.log( j + "|" + m.round(i*100)/100 + "|" + m.round(x) + "|" + m.round(y));
}
ctx.lineTo(ya+r*m.PI/n,xa);
ctx.strokeStyle = "blue";
ctx.lineWidth = 3;
ctx.stroke();
ctx.closePath();
}

/*==============================
        0.707 Elliptic
================================*/
var elli = function(D,n) {
  var j = 0; //counter
  var a = D*10/2; //a radius
  var b = 0.707*a; //b radius
  var xc = 4*a*m.PI/n;
  var yc = 1.1*a*m.PI/2 + 100;
  var ya = xc/2; //Y-axis Position
  var xa = yc*0.95; //X-axis Position
  document.getElementById("myCanvas").width = xc;
  document.getElementById("myCanvas").height = yc;
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");

  console.log(" # | Rad | x | y ");
  // ctx.beginPath();
  // ctx.clearRect(0, 0, xc, yc);
  // ctx.closePath();

//Background
  ctx.beginPath();
  ctx.fillStyle = "lightyellow";
  ctx.fillRect(0,0,xc,yc);
  ctx.closePath();
//Background Grid
  ctx.beginPath();
  for (var i = 0; i <=yc; i += yc*0.05) {
    ctx.moveTo(0,i);
    ctx.lineTo(xc,i);
  }

  for (var i = 0; i <=xc; i += xc*0.05) {
    ctx.moveTo(i,0);
    ctx.lineTo(i,yc);
  }
  ctx.strokeStyle = "#bfbfbf";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.closePath();
//Axis
  ctx.beginPath();
  ctx.moveTo(5,xa);
  ctx.lineTo(xc-5,xa);
  ctx.moveTo(ya,5);
  ctx.lineTo(ya,yc-5);
  ctx.strokeStyle = "green";
  ctx.lineWidth = 2;
  ctx.fillStyle = "#000";
  ctx.fillText("X-axis",5,xa-10);
  ctx.fillText("Y-axis",ya+5,20);
  ctx.stroke();
  ctx.closePath();
//Plot
  ctx.beginPath();
  ctx.moveTo(ya,xa);
  ctx.font = "16px Arial";
  ctx.fillStyle = "red";
  for (var i = 0; i <= m.PI/2;i+=m.PI/10) {
    j++
    var x = ya + (m.cos(i)*a*m.PI/n);
    var y = xa - i*m.sqrt((m.pow(a,2)+m.pow(b,2))/2);
    ctx.fillText("x:"+m.round(x-ya)/10+" cm",x+15,y);
    ctx.fillText("y:"+-m.round(y-xa)/10+" cm",x+15,y-15);
    ctx.fillRect(x-5,y-5,10,10);
    ctx.lineTo(x,y);
    console.log( j + "|" + m.round(i*100)/100 + "|" + m.round(x) + "|" + m.round(y));
  }
  for (var i = m.PI/2-m.PI/10; i >= 0;i-=m.PI/10) {
    j++
    var x = ya - (m.cos(i)*a*m.PI/n);
    var y = xa - i*m.sqrt((m.pow(a,2)+m.pow(b,2))/2);
    ctx.lineTo(x,y);
    ctx.fillText("x:"+m.round(x-ya)/10+" cm",x+10,y);
    ctx.fillText("y:"+-m.round(y-xa)/10+" cm",x+10,y-15);
    ctx.fillRect(x-5,y-5,10,10);
    console.log( j + "|" + m.round(i*100)/100 + "|" + m.round(x) + "|" + m.round(y));
  }
  ctx.lineTo(ya+a*m.PI/n,xa);
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.closePath();
}
// Printing

function printCanvas()
{
    var dataUrl = document.getElementById('myCanvas').toDataURL(); //attempt to save base64 string to server using this var
    var windowContent = '<!DOCTYPE html>';
    windowContent += '<html>'
    windowContent += '<head><title>Print canvas</title></head>';
    windowContent += '<body>'
    windowContent += '<img src="' + dataUrl + '">';
    windowContent += '</body>';
    windowContent += '</html>';
    var printWin = window.open('','','width=340,height=260');
    printWin.document.open();
    printWin.document.write(windowContent);
    printWin.document.close();
    printWin.focus();
    printWin.print();
    printWin.close();
}
