
let sounds = [];
let amp_wave_speed = [];

let quick_hits = []

let next_sound = 0;

let volume = 0.3;
let quick_hit_volume = 0.4;

let rate_range = 0.03;

//fbo fuckery
let screen_w = 128*1;
let screen_h = 128*1;
let fbo, fbo_buffer;



function setup() {
    //createCanvas(window.innerWidth,window.innerHeight);//.parent("canvasParent").id("drawingCanvas");
    createCanvas(screen_w*1, screen_h*1);

    //FBO stuff

    // on retina displays, the pixel density will often be 2. This doubles the size of the FBOs
    const original_pixel_density = pixelDensity();
    console.log(`original pixel density: ${original_pixel_density}`);
    // setting it to 1 so our FBOs have a 1:1 pixel size
    // this keeps the FBOs from doubling in size
    pixelDensity(1);

    //make the buffers
    fbo = createGraphics(screen_w, screen_h);
    fbo_buffer = createGraphics(screen_w, screen_h);

    // put it back otherwise everyhting renders blurry
    //pixelDensity(original_pixel_density);
    
    //main audio
    for (let i=0; i<30; i++){
        let sound = loadSound("audio/riff_3.wav");
        sound.setLoop(true);
        sounds.push(sound);
        amp_wave_speed.push( random(0.9,1.1));
    }

    //quick hits

    quick_hits.push( make_quick_hit("audio/bastards.wav", 0.75, 0.9));
    quick_hits.push( make_quick_hit("audio/light_of_day.wav", 0.9, 1.2));
    quick_hits.push( make_quick_hit("audio/solo1_fade.wav", 0.96, 1.04));
    // quick_hits.push([]);
    // for (let i=0; i<num_quick_samples; i++){
    //     let sound = loadSound("audio/bastards.wav");
    //     quick_hits[quick_hits.length-1].push(sound);
    // }

    // quick_hits.push([]);
    // for (let i=0; i<num_quick_samples; i++){
    //     let sound = loadSound("audio/light_of_day.wav");
    //     quick_hits[quick_hits.length-1].push(sound);
    // }


    //big up the screen
    document.getElementById("defaultCanvas0").style = "width: 512px; height: 512px;"

    noSmooth();
    frameRate(30)
}

function make_quick_hit(file_name, min_speed, max_speed){
    let qh = {
        min_speed : min_speed,
        max_speed : max_speed,
        sounds : []
    }
    for (let i=0; i<5; i++){
        let sound = loadSound(file_name);
        qh.sounds.push(sound);
    }
    return qh;
}

function draw() {
    update();
    render();
}

function mousePressed(){
    
    // if (next_sound < sounds.length-1){
    //     //set the position
    //     let this_pos = sounds[0].currentTime();
    //     //randomize the rate
    //     let this_rate = random(1.0-rate_range, 1.0+rate_range);
    //     //except for the first one
    //     if (next_sound == 0){
    //         this_rate = 1.0;
    //     }
    //     //play the sound
    //     sounds[next_sound].play(0, this_rate, volume, this_pos);
        
    //     console.log("start "+next_sound)
    //     next_sound++;
    // }

    //console.log(fbo)

    //fuck_about();

}

function mouseDragged() {
}

function mouseReleased(){
}

function update(){
    let time_sec = millis() / 1000.0
    for (let i=0; i<sounds.length; i++){
        let wave_pos = i*(6.28 / sounds.length) + time_sec * amp_wave_speed[i];
        sounds[i].setVolume( volume + sin(wave_pos)*0.2);
    }

}

function keyPressed(){
    // if (key == '1') play_quick_hit(0);
    // if (key == '2') play_quick_hit(1);
    // if (key == '3') play_quick_hit(2);
    
}

function play_quick_hit(id){
    let qh = quick_hits[id];
    for (let i=0; i<qh.sounds.length; i++){
        let this_rate = random(qh.min_speed, qh.max_speed);
        qh.sounds[i].play(0, this_rate, quick_hit_volume, 0);
    }
}


function render(){
    background(100);

    if (frameCount == 3 ){
        //slam the current fbo into the buffer
        fbo_buffer.image(fbo,0,0);
        //fade just a bit - not using tint because tint tanks performance
        fbo_buffer.noStroke();
        fbo_buffer.fill(0,0,0,1);
        fbo_buffer.rect(0,0,screen_w, screen_h);
    }

    fuck_about()

    //now draw the real fbo
    fbo.background(0);

    //testing
    //fuck_about()
    
    //throw down the last frame
    // fbo.push()
    // fbo.translate(screen_w/2, screen_h/2);
    // fbo.rotate(0.01)
    // let new_w = screen_w-4;
    // let new_h = screen_h-4;
    // fbo.image(fbo_buffer, -new_w/2, -new_h/2, new_w, new_h);
    // fbo.pop()

    fbo.image(fbo_buffer, 0,0);

    // fbo.push()
    // fbo.translate(screen_w/2, screen_h/2);
    // fbo.rotate(0.1)
    // fbo.image(fbo_buffer, -fbo_buffer.width/2, -fbo_buffer.height/2);
    // fbo.pop()


    fbo.noStroke();
    fbo.fill(255)
    fbo.rect( Math.floor(mouseX-10),  Math.floor(mouseY-10), 20,20)

    //fbo.textFont("Courier New");
    fbo.textSize(15)
    fbo.textAlign(CENTER)
    fbo.fill(255);
    fbo.stroke(100,0,0)
    fbo.strokeWeight(1)
    fbo.text("Hell yeah man", screen_w/2, 25);

    fbo.text("Look out", screen_w/2, screen_h-10);


    //random blips
    fbo.noStroke();
    fbo.fill( random(100,250));
    fbo.circle(random(0, screen_w), random(0, screen_h), random(1,3))
    
    //draw the fbo
    image(fbo, 0, 0);

    //image(fbo_buffer, screen_w+10,0)


    fill(255,0,0);
    text("fps: "+Math.floor(frameRate()), width-45,15);
}


function fuck_about(){
    fbo.loadPixels();
    fbo_buffer.loadPixels();

    let time = millis() / 3000;

    let shrink_prc = 1.04;// 1.01 + sin(time * 0.7) * 0.1;

    let noise_shuffle_chance = 0.1;
   
    let center_move_dist = 3;
    //let curve = 1;

    let center_x = fbo_buffer.width/4 + sin(time) * center_move_dist;
    let center_y = fbo_buffer.height/2 + cos(time) * center_move_dist;

    for (let p=0; p<fbo_buffer.pixels.length; p+=4){
        //let pixel = [fbo.pixels[p], fbo.pixels[p+1], fbo.pixels[p+2], fbo.pixels[p+3]]
        
        let x = (p/4)%fbo_buffer.width
        let y = Math.floor((p/4)/fbo_buffer.width)

        let x_dist_from_center = x - center_x;
        let y_dist_from_center = y - center_y;

        if (x>center_x) x_dist_from_center = Math.max(1, x_dist_from_center)
        else            x_dist_from_center = Math.min(-1, x_dist_from_center)
        if (y>center_y) y_dist_from_center = Math.max( 5, y_dist_from_center)
        else            y_dist_from_center = Math.min(-5, y_dist_from_center)

        // let half_w =  (fbo_buffer.width/2);
        // let half_h =  (fbo_buffer.height/2);
        // // let prc_x_dist = Math.pow( x_dist_from_center / half_w, curve) * Math.sign(x_dist_from_center);
        // // let prc_y_dist = Math.pow( y_dist_from_center / half_h, curve) * Math.sign(y_dist_from_center);
        // let prc_x_dist = x_dist_from_center / half_w;
        // let prc_y_dist = y_dist_from_center / half_h;

        // let other_x = Math.floor(x * shrink_prc);
        // let other_y = Math.floor(y * shrink_prc);

        let other_x = Math.floor( center_x + x_dist_from_center * shrink_prc );
        let other_y = Math.floor( center_y + y_dist_from_center * shrink_prc );

        //noise
        if (Math.random() < noise_shuffle_chance) other_x--;
        if (Math.random() < noise_shuffle_chance) other_x++;
        if (Math.random() < noise_shuffle_chance) other_y++;
        if (Math.random() < noise_shuffle_chance) other_y--;

        // let other_x = Math.floor( fbo.width/2  + half_w * prc_x_dist * shrink_prc );
        // let other_y = Math.floor( fbo.height/2 + half_h * prc_y_dist * shrink_prc );

        let other_p = (other_y*fbo.width + other_x)*4;    //array position

        for (let i=0; i<3; i++){
            if (other_x < fbo.width && other_x >= 0 && other_y < fbo.height && other_y >= 0){
                fbo_buffer.pixels[p+i] = fbo.pixels[other_p+i];
            }
            else{
                fbo_buffer.pixels[p+i] = 0;
            }
            
            //tint it down a bit
            if (i<4)    fbo_buffer.pixels[p+i] *= 0.9
        }
        
        // if (x > 10 && x < 20){
        //     fbo_buffer.pixels[p+2] = 255;
        // }
        // if (y > 10 && y < 20){
        //     fbo_buffer.pixels[p+1] = 255;
        // }
    }


    fbo_buffer.updatePixels();
}








//https://gist.github.com/GoToLoop/2e12acf577506fd53267e1d186624d7c
p5.Image.prototype.resizeNN = function (w, h) {
    "use strict";
  
    // Locally cache current image's canvas' dimension properties:
    const { width, height } = this.canvas;
  
    // Sanitize dimension parameters:
    w = ~~Math.abs(w), h = ~~Math.abs(h);
  
    // Quit prematurely if both dimensions are equal or parameters are both 0:
    if (w === width && h === height || !(w | h))  return this;
  
    // Scale dimension parameters:
    if (!w)  w = h*width  / height | 0; // only when parameter w is 0
    if (!h)  h = w*height / width  | 0; // only when parameter h is 0
  
    const img = new p5.Image(w, h), // creates temporary image
          sx = w / width, sy = h / height; // scaled coords. for current image
  
    this.loadPixels(), img.loadPixels(); // initializes both 8-bit RGBa pixels[]
  
    // Create 32-bit viewers for current & temporary 8-bit RGBa pixels[]:
    const pixInt = new Int32Array(this.pixels.buffer),
          imgInt = new Int32Array(img.pixels.buffer);
  
    // Transfer current to temporary pixels[] by 4 bytes (32-bit) at once:
    for (var x = 0, y = 0; y < h; x = 0) {
      const curRow = width * ~~(y/sy), tgtRow = w * y++;
  
      while (x < w) {
        const curIdx = curRow + ~~(x/sx), tgtIdx = tgtRow + x++;
        imgInt[tgtIdx] = pixInt[curIdx];
      }
    }
  
    img.updatePixels(); // updates temp 8-bit RGBa pixels[] w/ its current state
  
    // Resize current image to temporary image's dimensions:
    this.canvas.width = this.width = w, this.canvas.height = this.height = h;
    this.drawingContext.drawImage(img.canvas, 0, 0, w, h, 0, 0, w, h);
  
    return this;
  };