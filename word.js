const word_spacing = 7;
const word_line_spacing = 21;

const link_color = "#fa960a";

function make_word({text, x, y, width, event } ){

    let spread_x = 3;
    let spread_y = 3;

    let word = {
        text : text,
        text_width : width,

        x : floor(x + random(0, spread_x)),
        y : floor(y + random(-spread_y, spread_y)),

        wiggle_x : 0.5,
        wiggle_y : 0.5,
        wiggle_range : 0.1,
        max_wiggle : 4,

        delay_timer : random(0,event.delay_time_wiggle),

        is_link : false,

        kill_me : false,
        kill_timer : null
    }

    console.log(text+" delay "+word.delay_timer)

    word.box = {
        x: word.x-1,
        y: word.y+3,
        w: word.text_width+3,
        h: word_line_spacing
    }

    return word;
}


function update_word(word){
    //adjust the wiggle
    word.wiggle_x += random(-word.wiggle_range, word.wiggle_range);
    word.wiggle_y += random(-word.wiggle_range, word.wiggle_range);
    word.wiggle_x = constrain(word.wiggle_x, -word.max_wiggle, word.max_wiggle);
    word.wiggle_y = constrain(word.wiggle_y, -word.max_wiggle, word.max_wiggle);

    //check if we're dying
    if (word.kill_timer != null){
        word.kill_timer--;
        if (word.kill_timer <= 0){
            word.kill_me = true;
        }
    }
}

function draw_word(word){
    //if we're still int the delay time, bounce out
    if (word.delay_timer-- > 0 ){
        return;
    }

    //set the pos
    let this_x = floor( word.x + word.wiggle_x );
    let this_y = floor( word.y + word.wiggle_y );

    //draw it
    fbo.bitmapTextFont(bit_font_back);
    fbo.bitmapText(word.text, this_x-1, this_y+1);
    if (word.is_link){
        fbo.bitmapTextFont(bit_font_link);
    }else{
        fbo.bitmapTextFont(bit_font);
    }
    fbo.bitmapText(word.text, this_x, this_y);

    //testing
    // if (word.is_link){
    //     fbo.stroke(link_color);
    //     fbo.noFill();
    //     fbo.rect(word.box.x, word.box.y, word.box.w,word. box.h);
    // }

}

function kill_word_after(word, time){
    word.kill_timer = time;
}