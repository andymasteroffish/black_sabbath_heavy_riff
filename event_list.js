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
        text: "With that freight train of a riff",
        x : 10,
        y : 180,
        link_word: "train"
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
        link_word: "permanent",
        quick_hit_on_click : "solo1"
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
        delay_timer : default_event_delay_time * 7,
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
        link_word: "riff"
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
        text: "A National Acrobat comes on",
        x : this_x,
        y : this_y,
        link_word: "Acrobat",
        quick_hit_sound: "acrobat"
    });

    this_y -= y_step;
    this_x += x_step;
    event_list.push({
        text: "I hit rewind, of course",
        x : this_x,
        y : this_y,
        link_word: "rewind,"
    });

    this_y -= y_step;
    this_x += x_step;
    event_list.push({
        text: "I miss my exit",
        x : this_x,
        y : this_y,
        link_word: "miss"
    });

    this_y -= y_step;
    this_x += x_step;
    event_list.push({
        text: "I don't care, of course",
        x : this_x,
        y : this_y,
        link_word: "don't"
    });


    //------------------------------------------------
    
    event_list.push({
        text: "I'm at a party in college",
        x : 115,
        y : 102,
        delay_timer : default_event_delay_time * 3,
        link_word: "party",
        quick_hit_on_click : "execution"
    });

    event_list.push({
        text: "Far too stoned",
        x : 20,
        y : 220,
        link_word: "stoned"
    });

    event_list.push({
        text: "Merging with the bed I'm on",
        x : 40,
        y : 40,
        link_word: "Merging",
        quick_hit_on_click: "nobody"
    });

    event_list.push({
        text: "I guess somebody put on Sabbath",
        x : 10,
        y : 126,
        link_word: "Sabbath",
    });

    event_list.push({
        text: "I get distracted",
        x : 110,
        y : 40,
        link_word: "distracted",
        quick_hit_sound : "lies"
    });

    event_list.push({
        text: "Was I hooking up with somebody?",
        x : 20,
        y : 162,
        link_word: "with",

    });

    event_list.push({
        text: "It bounces around in my skull",
        x : 120,
        y : 70,
        link_word: "none",
        auto_advance_timer : 30,
    });

    event_list.push({
        text: "Reverberating",
        center_x : true,
        do_not_clear_old_words : true,
        x : screen_w/2,
        y : 130,
        link_word: "Reverberating",
        quick_hit_sound: "no_return"
    });

    event_list.push({
        text: "Like a whippit high",
        x : 10,
        y : 25,
        auto_advance_timer : 30,
    });

    event_list.push({
        text: "that has built a permanent home",
        x : 20,
        y : 50,
        max_width : 10,
        do_not_clear_old_words : true,
        auto_advance_timer : 30,
        quick_hit_sound: "mind_away"
    });

    event_list.push({
        text: "in my mind",
        x : 90,
        y : 215,
        do_not_clear_old_words : true,
        link_word : "permanent"
    });

    event_list.push({
        text: "Grinding me into dust",
        x : 20,
        y : 90,
        link_word: "Grinding",
        quick_hit_on_click: "light_of_day"
    });


    //------------------------------------------------

    event_list.push({
        text: "I'm where I am right now",
        x : 40,
        y : 20,
        link_word: "now",
    });

    event_list.push({
        text: "I can't sleep",
        x : 35,
        y : 70,
        link_word: "sleep",
    });

    event_list.push({
        text: "I play the song in my head",
        x : 100,
        y : 100,
        link_word: "head",
    });

    event_list.push({
        text: "Sometimes I get to the first line",
        x : 10,
        y : 170,
        link_word: "Sometimes",
    });

    event_list.push({
        text: "Sometimes I don't",
        x : 50,
        y : 30,
        max_width: 100,
        link_word: "Sometimes",
        quick_hit_on_click : "bastards"
    });

    event_list.push({
        text: "",
        x : 0,
        y : 0,
        link_word: "none",
    });

}