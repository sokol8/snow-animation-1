window.onload = function() {
    
    // get the canvas and context
    var canvas = document.getElementById("winter");
    var ctx = canvas.getContext("2d")

    var W = window.innerWidth;
    var H = window.innerHeight;

    canvas.width = W;
    canvas.height = H;

    var image = new Image();
    image.src = 'm.png';
    
    var imageH = image.height / 2;
    var imageW = image.width / 2;
    var posX = (W - imageW) / 2;
    var posY = H - imageH;


    var maxFlakes = 100;
    var flakes = [];
    var snowdrift = [];

    for(var i = 0; i < maxFlakes; i++) {
        flakes.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 4 + 2,
            d: Math.random() + 0.001
        });
    }

    function drawSnowdrift() {
        ctx.beginPath();
        for(var i = 0; i < snowdrift.length; i++) {
            var sd = snowdrift[i];
            ctx.moveTo(sd.x, sd.y);
            ctx.arc(sd.x, sd.y, sd.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
    }

    function drawFlakes() {
        ctx.clearRect(0, 0, W, H);
        
        ctx.fillStyle = "white";

        ctx.drawImage(image, posX, posY, imageW, imageH);
        
        ctx.beginPath();
        for(var i = 0; i < maxFlakes; i++) {
            var f = flakes[i];
            ctx.moveTo(f.x, f.y);
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
        }

        ctx.fill();
            
        drawSnowdrift();
        moveFlakes();
    }

    var angle = 0; 

    function moveFlakes() {
        angle += 0.01; 
        for(var i = 0; i < maxFlakes; i++) {
            var f = flakes[i];

            f.y += Math.pow(f.d, 2) + 1;
            f.x += Math.sin(angle) * 0.5;

            if(f.y > (H - f.r)) {
                snowdrift.push({
                    x: flakes[i].x,
                    y: H - flakes[i].r,
                    r: flakes[i].r
                });
                
                flakes[i] = {
                    x: Math.random() * W,
                    y: 0,
                    r: f.r,
                    d: f.d
                }

            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        drawFlakes();
    }
    
    animate();

}