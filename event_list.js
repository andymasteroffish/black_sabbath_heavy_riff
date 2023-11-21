const default_event_delay_time = 30;
const default_delay_wiggle = 10;

const default_time_for_link = 40


function setup_events(){

    event_list.push({
        text: "This is a test phrase. Hello.",
        x : 30,
        y : 70,
        delay_timer : 40,
        delay_time_wiggle : 5,
        link_word: "test"
    });

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
        x : 70,
        y : 60,
        auto_advance_timer : 30,
        delay_time_wiggle : 0,
        delay_timer : 30,
        insta_kill_other_text : true,
        quick_hit_sound : "sabbath_bloody_sabbath"
    });

    event_list.push({
        text: "Bloody",
        x : 77,
        y : 90,
        do_not_clear_old_words : true,
        delay_time_wiggle : 0,
        delay_timer : 1,
        auto_advance_timer : 30,
    });

    event_list.push({
        text: "Sabbath",
        x : 70,
        y : 120,
        do_not_clear_old_words : true,
        delay_time_wiggle : 0,
        delay_timer : 1,
        link_word: "Sabbath"
    });

    event_list.push({
        text: "With that freight truck of a riff",
        x : 10,
        y : 180
    });

}