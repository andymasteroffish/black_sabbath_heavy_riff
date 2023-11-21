const default_time_for_link = 30

function setup_events(){

    event_list.push({
        text: "This is a test phrase. Hello.",
        x : 30,
        y : 70,
        link_word: "test"
    });

    event_list.push({
        text: "It's not one of their best albums",
        x : 10,
        y : 20,
        link_word: "albums"
    });

    event_list.push({
        text: "But it opens with their best song",
        x : 70,
        y : 110
    });

    event_list.push({
        text: "Sabbath",
        x : 70,
        y : 60,
        auto_advance_timer : 25,
        insta_kill_other_text : true,
    });

    event_list.push({
        text: "Bloody",
        x : 77,
        y : 90,
        do_not_clear_old_words : true,
        auto_advance_timer : 25,
    });

    event_list.push({
        text: "Sabbath",
        x : 70,
        y : 120,
        do_not_clear_old_words : true
    });

    event_list.push({
        text: "With that freight truck of a riff",
        x : 10,
        y : 180
    });

}