const word_spacing = 7;
const word_line_spacing = 21;

function make_word({text, x, y } ){

    let spread_x = 3;
    let spread_y = 3;

    let word = {
        text : text,

        x : floor(x + random(0, spread_x)),
        y : floor(y + random(-spread_y, spread_y)),

        wiggle_x : 0.5,
        wiggle_y : 0.5,
        wiggle_range : 0.1,
        max_wiggle : 4
    }

    return word;
}




function draw_word(word, fbo){

    //adjust the wiggle
    word.wiggle_x += random(-word.wiggle_range, word.wiggle_range);
    word.wiggle_y += random(-word.wiggle_range, word.wiggle_range);

    word.wiggle_x = constrain(word.wiggle_x, -word.max_wiggle, word.max_wiggle);
    word.wiggle_y = constrain(word.wiggle_y, -word.max_wiggle, word.max_wiggle);

    //set the pos
    let this_x = floor( word.x + word.wiggle_x );
    let this_y = floor( word.y + word.wiggle_y );

    //draw it
    fbo.bitmapTextFont(bit_font_back);
    fbo.bitmapText(word.text, this_x-1, this_y+1);
    fbo.bitmapTextFont(bit_font);
    fbo.bitmapText(word.text, this_x, this_y);
}