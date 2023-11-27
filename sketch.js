//debug stuff
const click_anywhere_to_advance = true;
const disable_sound = false;
const debug_fast_reveal = true;
let show_debug = false;
const debug_start_step = 0;


//sounds
let sounds = [];
let amp_wave_speed = [];

let quick_hits = []

let next_sound = 0;

let volume = 0.3;
let quick_hit_volume = 0.4;

let rate_range = 0.03;

//adjusted mouse position
let mouse_x;
let mouse_y;

//fonts
let bit_font, bit_font_link, bit_front_back;

//fbo fuckery
let screen_w = 256;
let screen_h = 256;
let fbo, fbo_buffer;

//positioning on screen
let canvas_w = screen_w;
let canvas_h = screen_h;
let canvas_x = 0;
let canvas_y = 0;
let scale_steps = 1;

//text objects
let words = [];

//events
let event_list = [];
let cur_event = null;

//into
let in_intro = true;

let bg_color_start = 0.95;
let bg_color_end = 0.05;


function preload(){
    //word events
    event_list = [];
    setup_events();

    //fonts
    bit_font = loadBitmapFont('var_width_fonts/scumm_red2.png', 'var_width_fonts/scumm.json');
    bit_font_link = loadBitmapFont('var_width_fonts/scumm_orange.png', 'var_width_fonts/scumm.json');
    bit_font_back = loadBitmapFont('var_width_fonts/scumm_white.png', 'var_width_fonts/scumm.json');

    //main audio
    if(!disable_sound){
        for (let i=0; i<event_list.length; i++){
            let sound = loadSound("audio/riff_3.wav");
            sound.setLoop(true);
            sounds.push(sound);
            amp_wave_speed.push( random(0.9,1.1));
        }
    }
}

function setup() {
    createCanvas(screen_w, screen_h);

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
    
    

    //quick hits
    quick_hits.push( make_quick_hit("audio/sabbath_bloody_sabbath.wav", "sabbath_bloody_sabbath", 0.75, 0.9));
    quick_hits.push( make_quick_hit("audio/bastards.wav", "bastards", 0.75, 0.9));
    quick_hits.push( make_quick_hit("audio/light_of_day.wav", "light_of_day", 0.5, 0.9));
    quick_hits.push( make_quick_hit("audio/mind_away.wav", "mind_away", 0.9, 1.2));
    quick_hits.push( make_quick_hit("audio/execution_long.wav", "execution", 0.9, 1.2));
    quick_hits.push( make_quick_hit("audio/lies.wav", "lies", 0.9, 1.2));
    quick_hits.push( make_quick_hit("audio/no_return.wav", "no_return", 0.9, 1.2));
    quick_hits.push( make_quick_hit("audio/nobody.wav", "nobody", 0.9, 1.2));
    quick_hits.push( make_quick_hit("audio/solo1_fade.wav", "solo1", 0.96, 1.04));
    quick_hits.push( make_quick_hit("audio/solo_isolated.wav", "solo2", 0.96, 1.04));
    quick_hits.push( make_quick_hit("audio/acrobat2.wav", "acrobat", 0.96, 1.04));
    
    

    resize_window();

    noSmooth();
    frameRate(30);

    if (debug_start_step){
        event_list.splice(0, debug_start_step);
        in_intro = false;
        cue_next_event();
    }

}

function windowResized(){
    resize_window();
}

function resize_window(){

    // console.log("screen W "+window.innerWidth);
    // console.log("screen H "+window.innerHeight);

    let smaller_dimension = min(window.innerWidth, window.innerHeight);
    
    scale_steps = max(1, floor(smaller_dimension / screen_w) );
    
    canvas_w = screen_w * scale_steps;
    canvas_h = screen_h * scale_steps;

    canvas_x = (window.innerWidth-canvas_w)/2;
    canvas_y = (window.innerHeight-canvas_h)/2;

    //big up the screen
    let style = "width: "+canvas_w+"px;";
    style +=  "height: "+canvas_h+"px;";
    style +=  "padding-left: "+canvas_x+"px;";
    style +=  "padding-top: "+canvas_y+"px;";
    document.getElementById("defaultCanvas0").style = style;

}

//make an array of one-off sound effects
function make_quick_hit(file_name, id, min_speed, max_speed){
    let qh = {
        min_speed : min_speed,
        max_speed : max_speed,
        sounds : [],
        id : id
    }
    for (let i=0; i<5; i++){
        let sound = loadSound(file_name);
        qh.sounds.push(sound);
    }
    return qh;
}

//Actual draw loop
function draw() {
    update();
    render();
}



function cue_next_event(){
    if (event_list.length == 0){
        console.log("NO MORE EVENTS");
        return;
    }

    //grab our new event
    let ev = event_list.shift();

    //set the delay
    if (ev.delay_timer == null){
        ev.delay_timer = default_event_delay_time;
    }
    if (ev.delay_time_wiggle == null){
        ev.delay_time_wiggle = default_delay_wiggle;
    }

    //start a timer
    if (!ev.link_word_timer && ev.link_word){
        ev.link_word_timer = default_time_for_link;
    }
    //ev.link_word_timer += ev.delay_time;

    //debug fuckery
    if (debug_fast_reveal){
        console.log("MAKE GO FAST");
        ev.delay_timer = 1;
        ev.delay_time_wiggle = 0;
        ev.link_word_timer = 2;
    }

    //stre the event
    cur_event = ev;

    //by default, make all existing words die
    if (!ev.do_not_clear_old_words){
        words.forEach( word => {
            let kill_time =  random(10,40);
            if (ev.insta_kill_other_text){
                kill_time = 0;
            }
            kill_word_after(word, kill_time);
        })
    }


    //play another sound
    if (next_sound < sounds.length-1 && !disable_sound){
        //set the position
        let this_pos = sounds[0].currentTime();
        //randomize the rate
        let this_rate = random(1.0-rate_range, 1.0+rate_range);
        //except for the first one
        if (next_sound == 0){
            this_rate = 1.0;
        }
        //play the sound
        sounds[next_sound].play(0, this_rate, volume, this_pos);
        
        //console.log("start "+next_sound)
        next_sound++;

        //move up the background
        let bg_prc = next_sound / sounds.length;
        let bg_val = (1.0-bg_prc) * bg_color_start + bg_prc * bg_color_end;
        document.body.style.backgroundColor = "rgba(0,0,0,"+bg_val+")";
    }
}

function trigger_event(ev){
    //do we have a sound cue?
    if (ev.quick_hit_sound && !disable_sound){
        play_quick_hit(ev.quick_hit_sound);
    }
    //set the words for this event
    set_words_from_event(ev);
}

function set_words_from_event(ev){
    console.log("set words: "+ev.text)
    console.log(ev)
    texts = ev.text.split(" ");


    let cur_x = ev.x;
    let cur_y = ev.y;

    let max_x = screen_w - 15;
    if (ev.max_width){
        max_x = ev.x + ev.max_width;
    }

    fbo.bitmapTextFont(bit_font);

    texts.forEach( text => {

        let width = fbo.bitmapStringWidth(text);

        
        //time for a new line?
        if (cur_x + width > max_x){
            cur_x = ev.x;
            cur_y += word_line_spacing;
        }

        //make it
        word = make_word({
            text : text,
            x : cur_x,
            y : cur_y,
            width : width,
            event : ev
        })
        //word.text_width = width;

        //is this the link word?
        if (text == cur_event.link_word){
            console.log("link word: "+text);
        }


        words.push(word);

        cur_x = word.x + width + word_spacing;

    })


}

function mouseDragged() {
}

function mouseReleased(){
}

function mousePressed(){

    //clikcing to exit the intro
    if (in_intro){
        in_intro = false;
        cue_next_event();
        return;
    }

    //debug tool
    if (click_anywhere_to_advance){
        cue_next_event();
        return;
    }
    
    //did they click a link word?
    words.forEach( word =>{
        if (word.is_link && mouse_x >= word.box.x && mouse_x <= word.box.x+word.box.w && mouse_y >= word.box.y && mouse_y <= word.box.y + word.box.h){
            //do we have a sound cue?
            if (cur_event.quick_hit_on_click && !disable_sound){
                play_quick_hit(cur_event.quick_hit_on_click);
            }
            cue_next_event();
            word.is_link = false;
        }
    })

}

function update(){
    //get the adjusted mouse position
    //little mouse effect
    mouse_x = (winMouseX - canvas_x) / scale_steps;
    mouse_y = (winMouseY - canvas_y) / scale_steps;

    //should we hide the cursor?
    if (mouse_x > 0 && mouse_y > 0 && mouse_x < screen_w && mouse_y < screen_h){
        noCursor();
    }else{
        cursor(CROSS);
    }

    //adjusting clip volume
    let time_sec = millis() / 1000.0
    for (let i=0; i<sounds.length; i++){
        let wave_pos = i*(6.28 / sounds.length) + time_sec * amp_wave_speed[i];
        sounds[i].setVolume( volume + sin(wave_pos)*0.1);
    }

    //checking on current event
    if (cur_event){
        //start with the delay
        if (cur_event.delay_timer > 0){
            cur_event.delay_timer--;
            //console.log("delay: "+cur_event.delay_timer);
            if (cur_event.delay_timer <= 0){
                trigger_event(cur_event);
            }
        }
        else{
            //auto advance
            if (cur_event.auto_advance_timer){
                cur_event.auto_advance_timer --;
                if(cur_event.auto_advance_timer <= 0){
                    cue_next_event();
                }
            }

            //turning on the link word
            if (cur_event.link_word_timer){
                cur_event.link_word_timer --;
                if (cur_event.link_word_timer <= 0){
                    cur_event.link_word_timer = null;
                    console.log("time to set link word for: "+cur_event.text+". Word is: "+cur_event.link_word)
                    //find the word
                    words.forEach( word => {
                        if (word.text == cur_event.link_word){
                            word.is_link = true;
                            console.log("set word.text");
                        }
                    })
                }
            }
        }
    }
}

function keyPressed(){
    if (key == '1')     play_quick_hit("sabbath_bloody_sabbath");
    // if (key == '2')     play_quick_hit(1);
    // if (key == '4')     play_quick_hit(3);
    // if (key == '3')     play_quick_hit(2);

    if (key == 'h')     show_debug = !show_debug
    
}

function play_quick_hit(id){

    let qh = null;
    
    quick_hits.forEach( hit => {
        if (hit.id == id){
            qh = hit;
        }
    })

    if (qh == null){
        console.log("NO QUICK HIT FOR ID:"+id);
        return;
    }
    
    for (let i=0; i<qh.sounds.length; i++){
        let this_rate = random(qh.min_speed, qh.max_speed);
        qh.sounds[i].play(0, this_rate, quick_hit_volume, 0);
    }
}

//Drawing into the FBO
function render(){
    background(1);

    //going back over this code, I'm not really sure why this only happens once
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
    fbo.background(1);

    fbo.image(fbo_buffer, 0,0);

    //console.log("number of words: "+words.length)
    words.forEach( word => {
        update_word(word);
        draw_word(word);
    })

    //prune dead words
    for (let i=words.length-1; i>=0; i--){
        if (words[i].kill_me){
            words.splice(i,1);
        }
    }

    //intro
    if (in_intro){
        let intro_lines = [
            "Black Sabbath",
            "Heavy Riff",
            "",
            "turn your",
            "sound on",
            "or come back",
            "when you can",
            "",
            "click to start"
        ]

        let cur_y = 40;
        let line_count = 0;
        intro_lines.forEach( line => {
            if (frameCount * 1.5 > cur_y){
                if (line_count > 2){
                    fbo.bitmapTextFont(bit_font_back);
                }else{
                    fbo.bitmapTextFont(bit_font);
                }

                let width = fbo.bitmapStringWidth(line);
                fbo.bitmapText(line, screen_w/2 - width/2, cur_y);

                cur_y += 20;
            }
            line_count++;
        })
        
    }

    //mouse effect
    fbo.noStroke();
    fbo.fill(link_color);
    let mouse_scatter_range = 2;
    let mouse_scatter_x = mouse_x + random(-mouse_scatter_range, mouse_scatter_range);
    let mouse_scatter_y = mouse_y + random(-mouse_scatter_range, mouse_scatter_range);
    fbo.rect( Math.floor(mouse_scatter_x-2),  Math.floor(mouse_scatter_y-2), 3,3)

    //random blips
    if (!in_intro){
        fbo.noStroke();
        for (let i=0; i<2; i++){
            fbo.fill( random(100,250));
            fbo.circle(random(0, screen_w), random(0, screen_h), random(1,6))
        }
    }
    
    //draw the fbo
    image(fbo, 0, 0);

    //image(fbo_buffer, screen_w+10,0)

    if (show_debug){
        fill(255,0,0);
        text("fps: "+Math.floor(frameRate()), width-45,9);
        text("x: "+floor(mouse_x)+"\ny: "+floor(mouse_y), 1,9);
    }
}



//the thing that does the pixel vortex effect
function fuck_about(){
    //if (in_intro)   return;
    fbo.loadPixels();
    fbo_buffer.loadPixels();

    //these times should probably be consts
    let time = millis() / 6000;
    let time2 = millis() / 4751;

    if (in_intro){
        time = 3.14;
        time2 = 3.14;
    }

    let shrink_prc = 1.03;// 1.01 + sin(time * 0.7) * 0.1;

    let noise_shuffle_chance = 0.1;
   
    let center_move_dist = 128;
    //let curve = 1;

    let center_x = fbo_buffer.width/2 + sin(time) * center_move_dist;
    let center_y = fbo_buffer.height/2 + cos(time2) * center_move_dist;

    for (let p=0; p<fbo_buffer.pixels.length; p+=4){
        
        let x = (p/4)%fbo_buffer.width
        let y = Math.floor((p/4)/fbo_buffer.width)

        let x_dist_from_center = x - center_x;
        let y_dist_from_center = y - center_y;

        if (x>center_x) x_dist_from_center = Math.max(1, x_dist_from_center)
        else            x_dist_from_center = Math.min(-1, x_dist_from_center)
        if (y>center_y) y_dist_from_center = Math.max( 5, y_dist_from_center)
        else            y_dist_from_center = Math.min(-5, y_dist_from_center)

        let other_x = Math.floor( center_x + x_dist_from_center * shrink_prc );
        let other_y = Math.floor( center_y + y_dist_from_center * shrink_prc );

        //noise
        if (!in_intro){
            if (Math.random() < noise_shuffle_chance) other_x--;
            if (Math.random() < noise_shuffle_chance) other_x++;
            if (Math.random() < noise_shuffle_chance) other_y++;
            if (Math.random() < noise_shuffle_chance) other_y--;
        }

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
    }


    fbo_buffer.updatePixels();
}





