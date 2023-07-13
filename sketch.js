
let sounds = [];
let amp_wave_speed = [];

let quick_hits = []

let next_sound = 0;

let volume = 0.3;
let quick_hit_volume = 0.4;

let rate_range = 0.03;

//fonts
let bit_font, bit_front_back;

//fbo fuckery
let screen_w = 128*2;
let screen_h = 128*2;
let fbo, fbo_buffer;


function preload(){
    bit_font = loadBitmapFont('var_width_fonts/scumm.png', 'var_width_fonts/scumm.json');
    bit_font_back = loadBitmapFont('var_width_fonts/scumm_red.png', 'var_width_fonts/scumm.json');
}

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
    fbo.rect( Math.floor(mouseX-5),  Math.floor(mouseY-5), 10,10)

    //fbo.textFont("Courier New");
    fbo.textSize(15)
    fbo.textAlign(CENTER)
    fbo.fill(255);
    fbo.stroke(100,0,0)
    fbo.strokeWeight(1)
    
    

    //fbo.text("Hell yeah man", screen_w/2, 25);

    //fbo.text("Look out", screen_w/2, screen_h-10);


    fbo.bitmapTextFont(bit_font_back);
    fbo.bitmapText(`Hell yeah man`, 10-1, 40+1);
    fbo.bitmapTextFont(bit_font);
    fbo.bitmapText(`Hell yeah man`, 10, 40);

    fbo.bitmapTextFont(bit_font);
    fbo.bitmapText("Look Out", 40, screen_h-40);


    //random blips
    fbo.noStroke();
    for (let i=0; i<2; i++){
        fbo.fill( random(100,250));
        fbo.circle(random(0, screen_w), random(0, screen_h), random(1,6))
    }
    
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

    let shrink_prc = 1.03;// 1.01 + sin(time * 0.7) * 0.1;

    let noise_shuffle_chance = 0.1;
   
    let center_move_dist = 3;
    //let curve = 1;

    let center_x = fbo_buffer.width/2 + sin(time) * center_move_dist;
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
            if (fbo_buffer.pixels[p+i] > 200){
                fbo_buffer.pixels[p+i] *= 0.7
            }else{
                fbo_buffer.pixels[p+i] *= 0.95
            }
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





