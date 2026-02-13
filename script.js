const IMAGE_SRC = "picture.jpeg";
const GRID = 3;

const puzzle = document.getElementById("puzzle");
const startScreen = document.getElementById("startScreen");
const game = document.getElementById("game");

let correctOrder = [];
let tiles = [];

// Envelope click
startScreen.onclick = () => {
  startScreen.classList.add("hidden");
  game.classList.remove("hidden");
  sliceImage();
};

function sliceImage(){
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = IMAGE_SRC;

  img.onload = ()=>{
    const w = img.width/GRID;
    const h = img.height/GRID;

    for(let y=0;y<GRID;y++){
      for(let x=0;x<GRID;x++){
        const c=document.createElement("canvas");
        const ctx=c.getContext("2d");
        c.width=w;
        c.height=h;

        ctx.drawImage(img,x*w,y*h,w,h,0,0,w,h);
        correctOrder.push(c.toDataURL());
      }
    }

    tiles=[...correctOrder];
    shuffle();
    render();
  };
}

function shuffle(){
  for(let i=tiles.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [tiles[i],tiles[j]]=[tiles[j],tiles[i]];
  }
}

function render(){
  puzzle.innerHTML="";

  tiles.forEach((src,i)=>{
    const img=document.createElement("img");
    img.src=src;
    img.className="tile";

    img.onclick=()=>{
      if(i>0){
        [tiles[i],tiles[i-1]]=[tiles[i-1],tiles[i]];
        render();
        checkSolved();
      }
    };

    puzzle.appendChild(img);
  });
}

function checkSolved(){
  if(tiles.every((v,i)=>v===correctOrder[i])){
    document.getElementById("message").style.display="block";
  }
}
