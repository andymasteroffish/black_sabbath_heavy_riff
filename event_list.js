const default_event_delay_time = 30;
const default_delay_wiggle = 10;

const default_time_for_link = 40


function setup_events(){

    // event_list.push({
    //     text: "This is a test phrase. Hello.",
    //     x : 30,
    //     y : 70,
    //     delay_timer : 40,
    //     delay_time_wiggle : 5,
    //     link_word: "test"
    // });

    event_list.push({
        text: "It's not one of their best albums",
        x : 10,
        y : 20,
        link_word: "albums",
    });

    event_list.push({
        text: "But it opens with their best song",
        x : 70,
        y : 110,
        link_word: "opens"
    });

    event_list.push({
        text: "Sabbath",
        center_x : true,
        x : screen_w/2,
        y : 85,
        auto_advance_timer : 30,
        delay_time_wiggle : 0,
        delay_timer : 30,
        insta_kill_other_text : true,
        quick_hit_sound : "sabbath_bloody_sabbath"
    });

    event_list.push({
        text: "Bloody",
        center_x : true,
        x : screen_w/2,
        y : 115,
        do_not_clear_old_words : true,
        delay_time_wiggle : 0,
        delay_timer : 1,
        auto_advance_timer : 30,
    });

    event_list.push({
        text: "Sabbath",
        center_x : true,
        x : screen_w/2,
        y : 145,
        do_not_clear_old_words : true,
        delay_time_wiggle : 0,
        delay_timer : 1,
        link_word: "Sabbath"
    });

    event_list.push({
        text: "With that freight truck of a riff",
        x : 10,
        y : 180,
        link_word: "truck"
    });

    event_list.push({
        text: "It chases me down and beats the shit out of me",
        x : 126,
        y : 60,
        link_word: "beats"
    });

    event_list.push({
        text: "A permanent part of my brain",
        x : 28,
        y : 128,
        max_width : 80,
        link_word: "permanent"
    });

    //------------------------------------------------

    let this_y = 210;
    let this_x = 10;
    let y_step = 25;
    let x_step = 3;
    event_list.push({
        text: "I'm driving in high school",
        x : this_x,
        y : this_y,
        link_word: "driving"
    });

    this_y -= y_step;
    this_x += x_step;
    event_list.push({
        text: "Flying at night",
        x : this_x,
        y : this_y,
        link_word: "Flying"
    });

    this_y -= y_step;
    this_x += x_step;
    event_list.push({
        text: "The album is on",
        x : this_x,
        y : this_y,
        link_word: "album"
    });

    this_y -= y_step;
    this_x += x_step;
    event_list.push({
        text: "the riff turns over in my head",
        x : this_x,
        y : this_y,
        link_word: "album"
    });

    this_y -= y_step;
    this_x += x_step;
    event_list.push({
        text: "Swimming around, multiplying",
        x : this_x,
        y : this_y,
        link_word: "multiplying"
    });

    this_y -= y_step;
    this_x += x_step;
    event_list.push({
        text: "National Acrobat starts",
        x : this_x,
        y : this_y,
        link_word: "Acrobat"
    });

    this_y -= y_step;
    this_x += x_step;
    event_list.push({
        text: "I hit rewind",
        x : this_x,
        y : this_y,
        link_word: "rewind"
    });

    this_y -= y_step;
    this_x += x_step;
    event_list.push({
        text: "I miss my exit ",
        x : this_x,
        y : this_y,
        link_word: "miss"
    });

    this_y -= y_step;
    this_x += x_step;
    event_list.push({
        text: "I don't care",
        x : this_x,
        y : this_y,
        link_word: "don't"
    });

}