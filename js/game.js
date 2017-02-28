// Create the canvas
var canvas = document.createElement("canvas");//cnavas对象，定义了一个API支持脚本化客户端绘图操作
var ctx = canvas.getContext("2d");//getContext，cnavas对象的方法
canvas.width = 700;
canvas.height = 438;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
	bgReady = true;
};//支持onload事件的对象有image,layer,window
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function() {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function() {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
var hero = {
	speed: 256
};
var monster = {};
var monstersCaught = 0;//游戏角色，怪物，目标

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function(e) {//事件侦听element.addEventListener(event, function, useCapture)
	keysDown[e.keyCode] = true;
}, false);//e = widnoe.event || e;

addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
}, false);//保存用户的输入而不是立即响应

// Reset the game when the player catches a monster
var reset = function() {
	hero.x = canvas.width/2;
	hero.y = canvas.height/2;


	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function(modifier) {
	if (38 in keysDown
		&& hero.y >=10
		) {
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown
		&& hero.y <=canvas.height-32) {
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) {
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) {
		hero.x += hero.speed * modifier;
	}


	if (
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)
		) {
		++monstersCaught;
	    reset();
	}
};

// Draw everything
var render = function() {
	if(bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if(heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if(monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}


	ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("你已经抓住了" + monstersCaught + "皮皮虾！", 32, 32);
};

// The main game loop
var main = function() {
	var now = Date.now();//运行到现在时间
	var delta = now - then;//运行了多少时间

	update(delta/1000);
	render();

	then = now;


	requestAnimationFrame(main);//告知浏览器用main方法更新画面，可以用windows.或者直接调用，再传递该方法取消该次动画
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
