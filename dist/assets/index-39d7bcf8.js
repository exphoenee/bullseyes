(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))h(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&h(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function h(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();let g;const w=new Uint8Array(16);function Y(){if(!g&&(g=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!g))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return g(w)}const n=[];for(let e=0;e<256;++e)n.push((e+256).toString(16).slice(1));function M(e,i=0){return(n[e[i+0]]+n[e[i+1]]+n[e[i+2]]+n[e[i+3]]+"-"+n[e[i+4]]+n[e[i+5]]+"-"+n[e[i+6]]+n[e[i+7]]+"-"+n[e[i+8]]+n[e[i+9]]+"-"+n[e[i+10]]+n[e[i+11]]+n[e[i+12]]+n[e[i+13]]+n[e[i+14]]+n[e[i+15]]).toLowerCase()}const X=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),u={randomUUID:X};function y(e,i,t){if(u.randomUUID&&!i&&!e)return u.randomUUID();e=e||{};const h=e.random||(e.rng||Y)();if(h[6]=h[6]&15|64,h[8]=h[8]&63|128,i){t=t||0;for(let s=0;s<16;++s)i[t+s]=h[s];return i}return M(h)}const r="obstacle",f="egg",p="player",d="enemy",x="larva",b="particle",j={[r]:"obstacles",[f]:"eggs",[d]:"enemies",[x]:"larvas",[b]:"particles"};class O{constructor(i,t,h){this.game=i,this.name=b,this.id=y(),this.collisionX=t.x,this.collisionY=t.y,this.radius=Math.floor(Math.random()*10)+5,this.speedX=Math.random()*6-3,this.speedY=Math.random()*2+.5,this.angle=0,this.angleSpeed=Math.random()*.1+.01,this.particleTime=1500,this.color=h,this.opacity=this.color.split(", ").slice(-1)[0].slice(0,-1),this.opacityModifier=.05}draw(){this.game.context.save(),this.game.context.fillStyle=this.color,this.game.context.strokeStyle="black",this.game.context.lineWidth=2,this.game.context.beginPath(),this.game.context.arc(this.collisionX,this.collisionY,this.radius,0,Math.PI*2,!1),this.game.context.fill(),this.game.context.stroke(),this.game.context.restore()}reduceOpacity(){this.opacity-=this.opacityModifier,this.color=`${this.color.split(", ").slice(0,-1).join(", ")}, ${this.opacity<0?0:this.opacity})`}removeObject(){this.reduceOpacity(),this.opacity<=0&&(this.game.particles=this.game.particles.filter(i=>i.id!==this.id))}update(){this.draw(),this.objectMove()}}class R extends O{constructor(i,t,h){super(i,t,h)}objectMove(){this.angle+=this.angleSpeed,this.collisionX+=this.speedX*Math.cos(this.angle),this.collisionY-=this.speedY*Math.sin(this.angle),this.collisionY<0&&this.removeObject(),this.particleTime<=0&&this.removeObject(),this.particleTime-=16+Math.random()*16}}class F extends O{constructor(i,t,h){super(i,t,h)}objectMove(){this.angle+=this.angleSpeed,this.collisionX+=this.speedX,this.collisionY-=this.speedY,this.collisionY<0&&this.removeObject(),this.particleTime<=0&&this.removeObject(),this.particleTime-=16+Math.random()*16}}class c{constructor(i,{gameObjectName:t,isSingleton:h=!1,imageSettings:s={imageId,spriteWidth,spriteHeight,spriteOffsetX,spriteOffsetY,variant},animationSettings:o={animationFrames:0,animationDirection:0,spriteDirection:0,animationFrame:0},collisionProperties:a={gameObjectNames:[],collisionRadius,collisionOpacity:.5,collisionX,collisionY,margin:0},motionSettings:l={speedX:0,speedY:0,speedModifier:1}}){if(h){if(typeof c.instance=="object")return c.instance;c.instance=this}if(this.game=i,t)this.name=t;else throw new Error("gameObjectName is required");if(this.id=y(),s)this.image=document.getElementById(s.imageId),this.spriteWidth=s.spriteWidth,this.spriteHeight=s.spriteHeight,this.width=this.spriteWidth,this.height=this.spriteHeight,this.spriteOffsetX=s.spriteOffsetX,this.spriteOffsetY=s.spriteOffsetY,s!=null&&s.variant?(this.variant=s.variant,this.spriteDirection=this.variant,this.animationFrame=0):this.variant=!1;else throw new Error("imageSettings is required");l&&(this.speedX=l.speedX||0,this.speedY=l.speedY||0,this.dx,this.dy,this.speedModifier=l.speedModifier),a&&(this.collisionObjectNames=a.gameObjectNames,this.collisionRadius=a.collisionRadius,this.collisionOpacity=a.collisionOpacity,this.margin=a.margin,a.collisionX&&a.collisionY?(this.collisionX=a.collisionX,this.collisionY=a.collisionY):(this.collisionX,this.collisionY,this.initPosition())),(this.variant===void 0||this.variant===!1&&o)&&(this.animationFrames=o.animationFrames,this.animationDirection=o.animationDirection,this.spriteDirection=o.animationDirection,this.animationFrame=o.animationFrame),this.name,this.spriteX,this.spriteY,this.updateSpritePosition()}initPosition(){console.warn("initPosition() not implemented")}areYou(i){return this.name===i}draw(){this.game.context.drawImage(this.image,this.animationFrame*this.spriteWidth,this.spriteDirection*this.spriteHeight,this.spriteWidth,this.spriteHeight,this.spriteX,this.spriteY,this.width,this.height),this.drawHitbox()}drawHitbox(){this.game.debug&&(this.game.context.beginPath(),this.game.context.arc(this.collisionX,this.collisionY,this.collisionRadius,0,Math.PI*2,!1),this.game.context.save(),this.game.context.globalAlpha=this.collisionOpacity,this.game.context.fill(),this.game.context.restore(),this.game.context.stroke(),this.extraHitboxDraw&&this.extraHitboxDraw())}collision(){this.collisionObjectNames&&this.collisionObjectNames.length>0&&this.collisionObjectNames.map(i=>{const t=j[i]||i;return this.game[t]}).flat().forEach(i=>{const t=this.game.checkCollision(this,i)||{},{collision:h}=t;h&&this.pushObject(t)})}pushObject({distance:i,sumOfRadii:t,dx:h,dy:s}){this.collisionX-=h/i*(t-i),this.collisionY-=s/i*(t-i)}objectDirection(){if(this.animationDirection>=0){const i=360/this.animationDirection,t=Math.floor((Math.atan2(this.game.mouse.y-this.collisionY,this.game.mouse.x-this.collisionX)*360/(2*Math.PI)+90+360)%360);this.spriteDirection=Math.floor(t/i)}}objectMove(){console.warn("objectMove() not implemented")}updateSpritePosition(){this.spriteX=this.collisionX-this.width*this.spriteOffsetX,this.spriteY=this.collisionY-this.height*this.spriteOffsetY}reduceOpacity(){this.opacity=this.opacity-this.opacityModifier<.1?0:this.opacity-this.opacityModifier}kill(){this.reduceOpacity(),this.opacity<=0&&(this.addSpark(),this.init())}addSpark(){const i={x:this.collisionX,y:this.collisionY};for(let t=0;t<this.numberOfSparks;t++)this.game.particles.push(new R(this.game,i,this.colorOfSparks))}addFireFlies(){const i={x:this.collisionX,y:this.collisionY};for(let t=0;t<this.numberOfFireFlies;t++)this.game.particles.push(new F(this.game,i,this.colorOfFireFlies))}update(){this.draw(),this.objectMove(),this.updateSpritePosition(),this.collision(),this.objectDirection()}}class T extends c{constructor(i){super(i,{gameObjectName:p,isSingleton:!0,imageSettings:{imageId:"bull",spriteWidth:255,spriteHeight:256,spriteOffsetX:.5,spriteOffsetY:.65},animationSettings:{animationFrames:58,animationDirection:8},collisionProperties:{gameObjectNames:[r],collisionRadius:50,collisionOpacity:.5},motionSettings:{speedModifier:5}})}initPosition(){this.collisionX=this.game.width*.5,this.collisionY=this.game.height*.5}extraHitboxDraw(){this.game.context.beginPath(),this.game.context.moveTo(this.collisionX,this.collisionY),this.game.context.lineTo(this.game.mouse.x,this.game.mouse.y),this.game.context.stroke()}objectMove(){this.dx=this.game.mouse.x-this.collisionX,this.dy=this.game.mouse.y-this.collisionY;const i=Math.hypot(this.dy,this.dx);i<=this.speedModifier?(this.speedX=0,this.speedY=0):(this.speedX=this.dx/i||0,this.speedY=this.dy/i||0),this.collisionX+=this.speedX*this.speedModifier,this.collisionY+=this.speedY*this.speedModifier,this.collisionX<this.collisionRadius&&(this.collisionX=this.collisionRadius),this.collisionX>this.game.width-this.collisionRadius&&(this.collisionX=this.game.width-this.collisionRadius),this.collisionY<this.game.topMargin+this.collisionRadius&&(this.collisionY=this.game.topMargin+this.collisionRadius),this.collisionY>this.game.height-this.collisionRadius&&(this.collisionY=this.game.height-this.collisionRadius),this.animationFrame=this.animationFrame<this.animationFrames?this.animationFrame+1:0}}class I extends c{constructor(i){super(i,{gameObjectName:r,imageSettings:{imageId:"obstacles",spriteWidth:250,spriteHeight:250,spriteOffsetX:.49,spriteOffsetY:.85,variant:Math.floor(Math.random()*12)},collisionProperties:{collisionRadius:40,collisionOpacity:.5,collisionX:Math.random()*i.width,collisionY:Math.random()*i.height}})}initPosition(){this.collisionX=Math.random()*this.game.width,this.collisionY=Math.random()*this.game.height}moveObject(){}collision(){}pushObject(){}update(){this.draw(),this.moveObject(),this.collision()}}class E extends c{constructor(i,t){super(i,{gameObjectName:x,imageSettings:{imageId:"larva",spriteWidth:150,spriteHeight:150,spriteOffsetX:.5,spriteOffsetY:.7},collisionProperties:{gameObjectNames:[r,d,p,f],collisionRadius:40,collisionOpacity:.5,collisionX:t.x,collisionY:t.y},motionSettings:{speedModifier:.6,speedX:0,speedY:Math.random()*3+.5}}),this.numberOfFireFlies=15,this.colorOfFireFlies="rgba(255, 0, 0, 0.5)",this.numberOfSparks=15,this.colorOfSparks="rgba(255, 255, 0, 0.5)",this.opacity=1,this.opacityModifier=.1}initPosition(){}collision(){[this.game.player,...this.game.obstacles,...this.game.enemies,...this.game.eggs].forEach(i=>{const t=this.game.checkCollision(this,i)||{},{collision:h}=t;h&&(this.pushObject(t),i.areYou(d)&&this.eaten())})}removeObject(){this.game.larvas=this.game.larvas.filter(i=>i.id!==this.id)}reduceOpacity(){this.opacity=this.opacity-this.opacityModifier<.1?0:this.opacity-this.opacityModifier}eaten(){this.reduceOpacity(),this.opacity<=0&&(this.game.score-=1,this.removeObject(),this.addSpark())}survived(){this.reduceOpacity(),this.opacity<=0&&(this.game.score+=1,this.removeObject(),this.addFireFlies())}objectMove(){this.collisionX-=this.speedX*this.speedModifier,this.collisionY-=this.speedY*this.speedModifier,this.collisionX>this.game.width-this.collisionRadius&&(this.collisionX=this.game.width-this.collisionRadius),this.collisionY<this.game.topMargin-this.height&&this.survived(),this.collisionY>this.game.height-this.collisionRadius&&(this.collisionY=this.game.height-this.collisionRadius),this.animationFrame=this.animationFrame<this.animationFrames?this.animationFrame+1:0,this.spriteX=this.collisionX-this.width*this.spriteOffsetX,this.spriteY=this.collisionY-this.height*this.spriteOffsetY}}class S extends c{constructor(i){super(i,{gameObjectName:f,isSingleton:!1,imageSettings:{imageId:"egg",spriteWidth:110,spriteHeight:135,spriteOffsetX:.5,spriteOffsetY:.65},collisionProperties:{gameObjectNames:[r,d,p],collisionRadius:40,collisionOpacity:.5,margin:80}}),this.hatchTimer=0}initPosition(){this.collisionX=this.margin+Math.random()*(this.game.width-this.margin*2),this.collisionY=this.game.topMargin+Math.random()*(this.game.height-this.collisionRadius-this.game.topMargin)}draw(){this.game.context.drawImage(this.image,0,0,this.spriteWidth,this.spriteHeight,this.spriteX,this.spriteY,this.width,this.height);const i=Math.floor((this.game.hatchInterval-this.hatchTimer)/1e3)+1;this.game.context.save(),this.game.context.globalAlpha=.5,this.game.context.fillText(i,this.spriteX+this.width*.4,this.spriteY-this.height*.1),this.game.context.restore(),this.drawHitbox()}hatching(){if(this.hatchTimer+=16+16*Math.random(),this.hatchTimer>=this.game.hatchInterval){this.game.eggs=this.game.eggs.filter(t=>t.id!==this.id);const i={x:this.collisionX,y:this.collisionY};this.game.larvas.push(new E(this.game,i))}}objectMove(){this.spriteX=this.collisionX-this.width*this.spriteOffsetX,this.spriteY=this.collisionY-this.height*this.spriteOffsetY}update(){this.draw(),this.hatching(),this.objectMove(),this.collision()}}class k extends c{constructor(i){super(i,{gameObjectName:d,imageSettings:{imageId:"toad",spriteWidth:140,spriteHeight:260,spriteOffsetX:.4,spriteOffsetY:.5,variant:Math.floor(Math.random()*4)},collisionProperties:{gameObjectNames:[r,p],collisionRadius:50},motionSettings:{speedModifier:1,speedX:Math.random()*3+.5}}),this.lifeTime=0,this.lifeTimeLimit=2e4,this.numberOfSparks=15,this.colorOfSparks="rgba(0, 255, 0, 0.5)",this.opacity=1,this.opacityModifier=.1}initPosition(){this.collisionX=this.game.width+this.width,this.collisionY=this.game.topMargin+Math.random()*(this.game.height-this.height)}init(){this.initPosition(),this.opacity=1,this.lifeTime=0}objectMove(){this.collisionX-=this.speedX*this.speedModifier,this.collisionY-=this.speedY*this.speedModifier,this.spriteX+this.width<0&&this.init(),this.collisionX>this.game.width-this.collisionRadius&&(this.collisionX=this.game.width-this.collisionRadius),this.collisionY<this.game.topMargin+this.collisionRadius&&(this.collisionY=this.game.topMargin+this.collisionRadius),this.collisionY>this.game.height-this.collisionRadius&&(this.collisionY=this.game.height-this.collisionRadius),this.animationFrame=this.animationFrame<this.animationFrames?this.animationFrame+1:0,this.spriteX=this.collisionX-this.width*this.spriteOffsetX,this.spriteY=this.collisionY-this.height*this.spriteOffsetY,this.lifeTime+=16,this.lifeTime>this.lifeTimeLimit&&this.kill()}update(){this.draw(),this.objectMove(),this.collision()}}class m{constructor(){if(typeof m.instance=="object")return m.instance;m.instance=this,this.debug=!1,this.fps=60,this.lastRender=0,this.deltaTime=0,this.winningScore=21,this.loosingScore=-10,this.gameOver=!1,this.width=1280,this.height=720,this.topMargin=260,this.canvas=document.getElementById("canvas1"),this.canvas.width=this.width,this.canvas.height=this.height,this.context=this.canvas.getContext("2d"),this.context.fillStyle="white",this.context.strokeStyle="white",this.context.lineWidth=3,this.context.font="40px Helvetica",this.gameObjects=[],this.player=new T(this),this.score=0,this.numberOfObstacles=10,this.obstacles=[],this.minimumObstacleDistance=80,this.obstacleAttempts=5e3,this.numberOfEggs=15,this.eggs=[],this.minimumEggDistance=70,this.eggTimer=0,this.eggInterval=1e3,this.numberOfEnemies=6,this.enemies=[],this.minimumEnemyDistance=70,this.enemyTimer=0,this.enemyInterval=1e3,this.larvas=[],this.hatchInterval=5e3,this.particles=[],this.mouse={x:this.width*.5,y:this.height*.5,pressed:!1},this.canvas.addEventListener("mousedown",i=>{this.mouse.x=i.offsetX,this.mouse.y=i.offsetY,this.mouse.pressed=!0}),this.canvas.addEventListener("mouseup",i=>{this.mouse.x=i.offsetX,this.mouse.y=i.offsetY,this.mouse.pressed=!1}),this.canvas.addEventListener("mousemove",i=>{this.mouse.pressed&&(this.mouse.x=i.offsetX,this.mouse.y=i.offsetY)}),window.addEventListener("keydown",i=>{i.key=="d"&&(this.debug=!this.debug)}),window.addEventListener("keydown",i=>{i.key=="r"&&this.gameOver&&this.restart()})}restart(){this.gameOver=!1,this.score=0,this.obstacles=[],this.eggs=[],this.enemies=[],this.larvas=[],this.particles=[],this.player.initPosition(),this.enemyTimer=0,this.eggTimer=0,this.lastRender=0,this.mouse={x:this.width*.5,y:this.height*.5,pressed:!1},this.init()}render(){this.context.clearRect(0,0,this.width,this.height),this.gameObjects=[this.player,...this.obstacles,...this.eggs,...this.enemies,...this.larvas,...this.particles],this.gameObjects.sort((i,t)=>i.collisionY-t.collisionY),this.gameObjects.forEach(i=>i.update()),this.context.fillText(`Score: ${this.score}`,20,50)}winMessage(){this.context.save(),this.context.font="130px Helvetica",this.context.fillStyle="rgba(0, 0, 0, 0.5)",this.context.fillRect(0,0,this.width,this.height),this.context.fillStyle="white",this.context.textAlign="center",this.context.fillText("You Won!",this.width*.5,this.height*.5),this.context.font="40px Helvetica",this.context.fillText("Press 'R' button to restart.",this.width*.5,this.height*.5+70),this.context.restore()}looseMessage(){this.context.save(),this.context.font="130px Helvetica",this.context.fillStyle="rgba(0, 0, 0, 0.5)",this.context.fillRect(0,0,this.width,this.height),this.context.fillStyle="white",this.context.textAlign="center",this.context.fillText("Game Over!",this.width*.5,this.height*.5),this.context.font="40px Helvetica",this.context.fillText("Press 'R' button to restart.",this.width*.5,this.height*.5+70),this.context.restore()}checkCollision(i,t,h=0){const s=t.collisionX-i.collisionX,o=t.collisionY-i.collisionY,a=Math.hypot(o,s),l=i.collisionRadius+t.collisionRadius+h;if(a<l)return{collision:a<l,distance:a,sumOfRadii:l,dx:s,dy:o,names:[i.name,t.name]}}addObstacles(){let i=0;for(;this.obstacles.length<this.numberOfObstacles&&i<this.obstacleAttempts;){let t=new I(this),h=!1;[...this.obstacles].forEach(o=>{const a=t,l=o,v=150;this.checkCollision(a,l,v)&&(h=!0)});const s=t.collisionRadius+this.minimumObstacleDistance+20;!h&&t.spriteX>0&&t.spriteX<this.width-t.width&&t.collisionY>this.topMargin+s&&t.collisionY<this.height-s&&this.obstacles.push(t),i++}}addEnemy(){this.enemies.push(new k(this))}addEgg(){this.eggs.push(new S(this))}animate(i){i-this.lastRender>1e3/this.fps&&(this.render(),this.lastRender=i,this.eggTimer>this.eggInterval&&this.eggs.length<this.numberOfEggs?(this.addEgg(),this.eggTimer=0):this.eggTimer+=Math.random()*16,this.enemyTimer>this.enemyInterval&&this.enemies.length<this.numberOfEnemies?(this.addEnemy(),this.enemyTimer=0):this.enemyTimer+=Math.random()*16),this.score>=this.winningScore&&(this.winMessage(),this.gameOver=!0),this.score<=this.loosingScore&&(this.looseMessage(),this.gameOver=!0),this.gameOver||window.requestAnimationFrame(this.animate.bind(this))}init(){this.addObstacles(),this.animate(this.lastRender)}}window.addEventListener("load",function(){new m().init()});