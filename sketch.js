let town = [];
let snow = [];
let groundY;
let camX = 0;
let camXtarget = 0;
let day = 1;
let count = 0;
let camDist = 0.4;
let camDistTarget = camDist;
let subject = [
  {
    main:"함수",
    sub:"기본도형 활용하여 그리기"
  },
    {
    main:"변수",
    sub: "인터랙티브 구현하기",
  },
  {
    main:"조건문",
    sub:"애니메이션 구현하기"
  },
    {
    main:"연산",
    sub:"공간감 표현하기"
  },
  {
    main:"객체",
    sub:"제네레이티브하게 표현하기"
  },
  {
    main:"배열",
    sub:"여러개의 개체 표현하기"
  },
];

let mainColor;
let subColor;
let isColor = false;
let isStartMoving = false;
let padding = 0;

function setup() {
  createCanvas(windowWidth>=540?540:windowWidth, windowHeight);
  textFont('Noto Sans KR');
  strokeJoin(ROUND);
  
  
  

  padding = (height - width)/4;
  if(padding<0)padding = 0;
  groundY = height/2 + 50;

  resetScene();
  count = 0;
}

function windowResized(){
  createCanvas(windowWidth>=540?540:windowWidth, windowHeight);
  padding = (height - width)/2;
  if(padding<0)padding = 0;
}

function draw() {
  
  
  if(day>=3&&town[1]&&town[1].size >= town[1].maxSize-20)isColor=true;
    
  if(isColor)subColor = lerpColor(subColor,color("black"),0.05);
  if(day>=4 && isStartMoving)camXtarget = mouseX - width/2;
  camDist = lerp(camDist,camDistTarget,0.1);
  camX = lerp(camX,camXtarget,0.1);
  background(255);
  
//   if(town.find(function(house){return house.size>99})){
//     if(frameCount%10==1)generateSnow();
//     // background(0);
//   }
//   else{
    
//   }
  
  cursor(ARROW);
//   snow.forEach(function(snowflake,index){
//     snowflake.display();
//   });
  
//   snow = snow.filter(function(snowflake,index){return snowflake.pos.y<groundY});
  
  if(day == 6 && frameCount%10 == 1 && town.length < 80) GenerateHouse(width/2+random(-width,width),groundY,random(1.6,3.3),0,undefined,undefined,undefined,true);
  
  town.sort(function(a,b){return a.dist-b.dist});
  town.forEach(function(house,index){
    house.isHover = false;
    house.hover();
    house.display();
  });
  
  if(day == 1 || (day == 6&&town.length>50) )cursor(HAND);
   if(day == 4)cursor(MOVE);
  
  noStroke();
  fill(0);
  textSize(70);
  textAlign(CENTER,BOTTOM);
  text("집 짓 기",width/2,height-100);
  textSize(22);
  text("p5.js로 배우는 JavaScript",width/2,height-60);
  
  textSize(25);
  let txt = "Day "+day + " : " + subject[day-1].main;
  let tw = textWidth(txt);
  fill(0);
  rectMode(CENTER);
  let dayY = 70;
  rect(width/2,dayY,30+tw,40,20);
  
  textAlign(CENTER,CENTER);
  fill(255);
  text(txt,width/2,dayY);
  
  fill(0);
  textSize(20);
  text(subject[day-1].sub,width/2,dayY+40);
  
  if(town.length>50){
    textAlign(LEFT,BOTTOM);
    fill(0);
    textSize(12);
    let txt = "Click to restart";
    let tw = textWidth(txt);
    rectMode(CORNER);
    rect(mouseX,mouseY - 21,tw+12,20,5);
    fill(255);
    text(txt,mouseX + 5,mouseY - 5);
  }
}

let moveTime = 0;

function touchStarted(){
  if(day==4)moveTime +=20;
  moving();
}
function touchMoved(){
  if(day==4)moveTime ++;
  moving();
  
}

function moving(){
  if(day == 4){
    isStartMoving = true;
    
    if(moveTime > 100){
      day++;
      if(day == 5)camDistTarget = 1.3;
      if(day == 5 && town.length==3){
         GenerateHouse(
           width/2,
           groundY,
           1.4,0,100,60,30,
           true,true
         );
      }
    }
  }
}

function touchEnded(){
  interect();
}

function interect(){
  if(day == 6 && town.length > 50)resetScene();
  if(day == 5 && town[3] && town[3].size > town[3].maxSize-0.1)day++;
  
  if(day == 1)count ++;
  if(count>=10 && day < 2)day++;
  if(town[0].size == town[0].maxSize && day < 3)day++;
  if(town[1]&&town[1].size >= town[1].maxSize-5 && day < 4)day++;
  
  if(day == 3)camDistTarget = 0.66;
  if(day == 3 && town.length==1)GenerateHouse(width/2-10,groundY,0.66,40,100,35,60);
  
  if(day == 4)camDistTarget = 1;
  if(day == 4 && town.length==2)GenerateHouse(width/2-10,groundY,1,100,100,35,60);
  
  
  if(day == 5)camDistTarget = 1.3;
  if(day == 5 && town.length==3){
    // GenerateHouse(width/2-170*2-35,groundY,1.2,0,30,35,70,true);
    // GenerateHouse(width/2-170-35,groundY,1.3,0,65,35,70,true);
    //  GenerateHouse(width/2+15,groundY,1.4,0,110,60,30,true);
    // GenerateHouse(width/2+170+3,groundY,1.3,0,100,30,25,true);
    // GenerateHouse(width/2+170*2+3,groundY,1.2,0,40,30,25,true);
   GenerateHouse(width/2,groundY,1.4,0,100,60,30,true,true);
  }
  
  if(day == 6)camDistTarget = 2.75;
  
  town.forEach(function(house,index){
    house.click();
  });
}

function resetScene(){
  town = [];
  day = 1;
  count = -1;
  
  GenerateHouse(width/2-10,groundY,0.4,40,100,35,60);
  
  mainColor = color(255);
  subColor = color(255);
  
  isColor = false;
  isStartMoving = false;

  camDistTarget = camDist = 0.4;
  camXtarget = camX = 0;
  moveTime = 0;
}


function GenerateHouse(x,y,d,size,maxSize,leftWidth,rightWeight,isAuto=false,isChange=false){
  let house = {};
  house.pos = {x:x,y:y};
  house.dist = d;
  house.click = HouseClick;
  house.display = HouseDisplay;
  house.hover = HouseHover;
  house.sizeTarget = house.size = size!=undefined?size:0;
  house.maxSize = maxSize!=undefined?maxSize:random(25,100);
  house.leftWidth = leftWidth!=undefined?leftWidth:random(25,65);
  house.rightWidth = rightWeight!=undefined?rightWeight:random(25,65);
  house.isAuto = isAuto;
  house.isChange = isChange;
  
  town.push(house);
}

function HouseHover(){
  if(
    mouseX > this.pos.x - this.leftWidth*(this.dist/camDist)
    && mouseX < this.pos.x + this.rightWidth*(this.dist/camDist)
    && mouseY > this.pos.y - (this.size+20)*(this.dist/camDist)
    && mouseY < this.pos.y
  ){
    cursor(HAND);
    this.isHover = true;
  }
}


function HouseClick(){
  if(
    mouseX > this.pos.x - this.leftWidth*(this.dist/camDist)
    && mouseX < this.pos.x + this.rightWidth*(this.dist/camDist)
    && mouseY > this.pos.y - (this.size+20)*(this.dist/camDist)
    && mouseY < this.pos.y
  ){
    if(day>=2 && this.size <= this.maxSize-10){
      this.sizeTarget += day>2?20:10;
    }
  }
}

function HouseDisplay(){
  
  
  if(this.isAuto && this.sizeTarget < this.maxSize)this.sizeTarget += day==5?0.3:0.75;
  
  if(this.isChange && frameCount%8==1 && this.size < this.maxSize-1){
    this.leftWidth = random(25,70);
    this.rightWidth = random(25,70);
    this.pos.x = width/2 + (this.leftWidth - this.rightWidth)/2;
  }
  
  this.size = lerp(this.size,this.sizeTarget,day>2?0.1:1);
  stroke(0);
  strokeWeight(2);
  fill(mainColor);
  
  push();
    translate(width/2,(this==town[town.length-1]&&(count>=9||day>1)&&day<4&&mouseIsPressed&&this.isHover)?2:0);
    translate((this.pos.x-width/2)*(this.dist/camDist)-camX*(this.dist/camDist),this.pos.y-200*(1-(this.dist/camDist) ) );
    scale((this.dist/camDist));
    rectMode(CENTER);
  
    // noStroke();
    stroke(0);
    strokeWeight(2);
    fill(255);
  
    if(count<9){
      if(count >= 3)
      triangle(
        -this.leftWidth,-this.size,
        -this.leftWidth/2,-this.size-20,
        0,-this.size
      );
      
      if(count >= 1)
      rect(-this.leftWidth/2,-this.size/2,this.leftWidth,this.size);
    }
    else{
      beginShape();
        vertex(-this.leftWidth,-this.size);
        vertex(-this.leftWidth/2,-this.size-20);
        vertex(0,-this.size);
        vertex(0,0);
        vertex(-this.leftWidth,0);
      endShape(CLOSE);
    }
    
    if(count >= 2){
      // if(count>9)fill(200);
      if(isColor)fill(lerpColor(subColor,color(255),0.8) );
      rect(this.rightWidth/2,-this.size/2,this.rightWidth,this.size);
    }
  
    if(count >= 4){
      // if(count>9)fill(100);
      fill(subColor);
      quad(
        -this.leftWidth/2,-this.size-20,
        0,-this.size,
        this.rightWidth,-this.size,
        this.rightWidth-this.leftWidth/2,-this.size-20
      );
    }
  
    if(count >= 5){
      // if(count>9){
      //   fill(0);
      //   noStroke();
      // }
      fill(subColor);
      if(day>=3&&isColor)strokeWeight(0);
      
      if(this.size > 20){
        rect(-this.leftWidth/2,-12,10,24,5,5,0,0);
      }
      
      // if(day==3)strokeWeight(2);
      // fill(mainColor);

      if(this.rightWidth >= this.leftWidth){
        if(this.rightWidth>=15 && this.rightWidth<40)
          type1(this.size,this.rightWidth/2);
        if(this.rightWidth>=40 && this.rightWidth<55)
          type2(this.size,this.rightWidth/2);
        if(this.rightWidth>=55)
          type3(this.size,this.rightWidth/2);
      }
      else{
        if(this.leftWidth>=15 && this.leftWidth<40)
          type4(this.size,this.leftWidth/2);
        if(this.leftWidth>=40 && this.leftWidth<55)
          type5(this.size,this.leftWidth/2);
        if(this.leftWidth>=55)
          type6(this.size,this.leftWidth/2);
      }
    }
  

  pop();
}

function type1(size,rightCenter){
    if(size > 30){
      rect(rightCenter,-20,6,15,3,3,0,0);
    }
    if(size > 60){
      rect(rightCenter,-50,6,15,3,3,0,0);
    }
    if(size > 90){
      rect(rightCenter,-80,6,15,3,3,0,0);
    }
}

function type2(size,rightCenter){
    if(size > 30){
      rect(rightCenter+7.5,-20,6,15,3,3,0,0);
      rect(rightCenter-7.5,-20,6,15,3,3,0,0);
    }
    if(size > 60){
      rect(rightCenter+7.5,-50,6,15,3,3,0,0);
      rect(rightCenter-7.5,-50,6,15,3,3,0,0);
    }
    if(size > 90){
      rect(rightCenter+7.5,-80,6,15,3,3,0,0);
      rect(rightCenter-7.5,-80,6,15,3,3,0,0);
    }
}

function type3(size,rightCenter){
    if(size > 30){
      if(count>=8)rect(rightCenter+15,-20,6,15,3,3,0,0);
      if(count>=7)rect(rightCenter,-20,6,15,3,3,0,0);
      if(count>=6)rect(rightCenter-15,-20,6,15,3,3,0,0);
    }
    if(size > 60){
      rect(rightCenter+15,-50,6,15,3,3,0,0);
      rect(rightCenter,-50,6,15,3,3,0,0);
      rect(rightCenter-15,-50,6,15,3,3,0,0);
    }
    if(size > 90){
      rect(rightCenter+15,-80,6,15,3,3,0,0);
      rect(rightCenter,-80,6,15,3,3,0,0);
      rect(rightCenter-15,-80,6,15,3,3,0,0);
    }
}

function type4(size,leftCenter){
    if(size > 60){
      rect(-leftCenter,-50,6,15,3,3,0,0);
    }
    if(size > 90){
      rect(-leftCenter,-80,6,15,3,3,0,0);
    }
}

function type5(size,leftCenter){
    if(size > 60){
      rect(-leftCenter+7.5,-50,6,15,3,3,0,0);
      rect(-leftCenter-7.5,-50,6,15,3,3,0,0);
    }
    if(size > 90){
      rect(-leftCenter+7.5,-80,6,15,3,3,0,0);
      rect(-leftCenter-7.5,-80,6,15,3,3,0,0);
    }
}

function type6(size,leftCenter){
    if(size > 60){
      rect(-leftCenter+15,-50,6,15,3,3,0,0);
      rect(-leftCenter,-50,6,15,3,3,0,0);
      rect(-leftCenter-15,-50,6,15,3,3,0,0);
    }
    if(size > 90){
      rect(-leftCenter+15,-80,6,15,3,3,0,0);
      rect(-leftCenter,-80,6,15,3,3,0,0);
      rect(-leftCenter-15,-80,6,15,3,3,0,0);
    }
}

function generateSnow(){
  let snowflake = {};
  snowflake.display = SnowDisplay;
  snowflake.pos = {x:random(width),y:-10};
  snowflake.dist = random(1);
  snow.push(snowflake);
}

function SnowDisplay(){
  this.pos.y += 1;
  let moveX = sin(frameCount*0.01 + this.pos.x*0.1)*30;
  
  noStroke();
  fill(255);
  ellipse((this.pos.x+moveX)-camX*this.dist,this.pos.y,10*this.dist,10*this.dist);
}