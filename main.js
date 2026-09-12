// math i hate it

function interp(t, type) {
  switch (type) {
    
    case "linear":
      return t;
      
    case "smooth":
      return t * t * (3 - 2 * t);
      
    case "smoother":
      return t * t * t * (t * (t * 6 - 15) + 10);
      
    case "sineIn":
      return 1 - Math.cos(t * Math.PI / 2);
      
    case "sineOut":
      return Math.sin(t * Math.PI / 2);
      
    case "sine":
    case "sineInOut":
      return -(Math.cos(Math.PI * t) - 1) / 2;
      
      
    case "pow2In":
      return t ** 2;
    case "pow2Out":
      return 1 - (1 - t) ** 2;
      
    case "pow3In":
      return t ** 3;
    case "pow3Out":
      return 1 - (1 - t) ** 3;
      
    case "pow4In":
      return t ** 4;
    case "pow4Out":
      return 1 - (1 - t) ** 4;
      
    case "pow5In":
      return t ** 5;
    case "pow5Out":
      return 1 - (1 - t) ** 5;
      
    case "pow6In":
      return t ** 6;
    case "pow6Out":
      return 1 - (1 - t) ** 6;
      
    case "pow7In":
      return t ** 7;
    case "pow7Out":
      return 1 - (1 - t) ** 7;
      
    case "pow8In":
      return t ** 8;
    case "pow8Out":
      return 1 - (1 - t) ** 8;
      
    case "pow9In":
      return t ** 9;
    case "pow9Out":
      return 1 - (1 - t) ** 9;
      
    case "pow10In":
      return t ** 10;
    case "pow10Out":
      return 1 - (1 - t) ** 10;
      
      
    case "circleIn":
      return 1 - Math.sqrt(1 - t * t);
      
    case "circleOut":
      return Math.sqrt(1 - (t - 1) * (t - 1));
      
    case "circle":
    case "circleInOut":
      if (t <= 0.5)
        return (1 - Math.sqrt(1 - (2 * t) ** 2)) / 2;
      return (Math.sqrt(1 - (2 * t - 2) ** 2) + 1) / 2;
      
      
    case "expIn":
      return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
      
    case "expOut":
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      
    case "exp":
    case "expInOut":
      if (t === 0 || t === 1) return t;
      if (t < 0.5)
        return Math.pow(2, 20 * t - 10) / 2;
      return (2 - Math.pow(2, -20 * t + 10)) / 2;
      
      
    case "elasticIn":
      return t === 0 || t === 1 ?
        t :
        -Math.pow(2, 10 * (t - 1)) *
        Math.sin((t - 1.075) * (2 * Math.PI) / 0.3);
      
    case "elasticOut":
      return t === 0 || t === 1 ?
        t :
        Math.pow(2, -10 * t) *
        Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1;
      
      
    case "bounceOut": {
      const n = 7.5625;
      const d = 2.75;
      
      if (t < 1 / d)
        return n * t * t;
      
      if (t < 2 / d) {
        t -= 1.5 / d;
        return n * t * t + 0.75;
      }
      
      if (t < 2.5 / d) {
        t -= 2.25 / d;
        return n * t * t + 0.9375;
      }
      
      t -= 2.625 / d;
      return n * t * t + 0.984375;
    }
    
    case "bounceIn":
      return 1 - interp(1 - t, "bounceOut");
      
    case "bounce":
    case "bounceInOut":
      if (t < 0.5)
        return interp(t * 2, "bounceIn") * 0.5;
      return interp(t * 2 - 1, "bounceOut") * 0.5 + 0.5;
      
      
    case "swingIn": {
      const s = 1.70158;
      return t * t * ((s + 1) * t - s);
    }
    
    case "swingOut": {
      const s = 1.70158;
      t -= 1;
      return t * t * ((s + 1) * t + s) + 1;
    }
    
    case "swing":
    case "swingInOut": {
      const s = 1.70158 * 1.525;
      
      if (t < 0.5) {
        t *= 2;
        return 0.5 * (t * t * ((s + 1) * t - s));
      }
      
      t = t * 2 - 2;
      return 0.5 * (t * t * ((s + 1) * t + s) + 2);
    }
    
    default:
      return t;
  }
}

let canvas = document.getElementById("canvas");
let button = document.getElementById("reinit");
let input = document.getElementById("interp");
let ctx = canvas.getContext("2d");

function drawGrid(ctx, x, y, x2, y2, cols, rows) {
  const width = x2 - x;
  const height = y2 - y;
  
  ctx.beginPath();
  ctx.strokeStyle = "#69696f"
  for (let i = 0; i <= cols; i++) {
    const px = x + width * (i / cols);
    ctx.moveTo(px, y);
    ctx.lineTo(px, y2);
  }
  
  for (let i = 0; i <= rows; i++) {
    const py = y + height * (i / rows);
    ctx.moveTo(x, py);
    ctx.lineTo(x2, py);
  }
  
  ctx.stroke();
}

let time = 0;
let limit = 3;
let interpStyle = "linear";

function prog(timeLimit){
return interp(time/limit, interpStyle);
}

function drawInterp(ctx, x, y, width, height, type) {
  ctx.beginPath();
  
  for (let i = 0; i <= 500; i++) {
    let t = i / 500;
    let v = interp(t, type);
    
    let px = x + t * width;
    let py = y + height - v * height;
    
    if (i === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }
  
  ctx.stroke();
}

function render(){

time += (1 / 60);
if (time > limit) time = 0;

ctx.clearRect(0, 0, canvas.width, canvas.height);

drawGrid(ctx, 10, 10, 590, 590, 4, 4)
drawInterp(ctx, 10, 10, 580, 580, interpStyle);

let x = 570 * (time/limit) + 10
let y = (-580 * prog(limit)) + 590
  
ctx.beginPath();

ctx.strokeStyle = "#79797f";
ctx.arc(x+5, y, 10, 0, Math.PI * 2);

ctx.fill();
ctx.stroke();

requestAnimationFrame(render);

};

button.addEventListener("click", () => {

let value = Hjson.parse(input.value);
console.log(value);

interpStyle = value.interp;
limit = value.timeScale == null ? limit : value.timeScale

time = 0;

});

render();