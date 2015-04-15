var debug;

function goto(hash){ // hash need to be begun with '#'
    var target = hash.split('/')[0]
    var duration = Math.floor(Math.abs(jQuery(document).scrollTop() - jQuery(target).position().top)) + 10; // use how much pixels to move as the duration
    jQuery('body').scrollTo(jQuery(target),duration);
    setTimeout(function(){
        window.location.hash = hash;
    },duration);
}

jQuery(function(){

    if(window.location.hash){
        setTimeout(function() {
            goto(window.location.hash);
        }, 1);
    }

    jQuery(".hashable").click(function(e){
        goto(jQuery(this).attr('href'));
    });

    var click_twice_noti_pop = false;
    var click_twice_noti = function(){
        setTimeout(function(){
            click_twice_noti_pop = jQuery('.showing');
            click_twice_noti_pop.popup({
                position : 'bottom center',
                title    : '再按一次跳過動畫',
                content  : 'Click again to skip the animation',
            }).popup('show');
            click_twice_noti = false;
        },1500);
    }

    var terminal = jQuery('#terminal-container');
    var inteval;
    function show_item(item,to_term,callback){
        to_term = to_term === undefined ? true : to_term;
        callback = typeof callback != 'function' ? function(){} : callback;
        if(inteval !== false)
            clearInterval(inteval);

        terminal.empty();
        if(click_twice_noti_pop)
            click_twice_noti_pop.popup('destroy');
        if(jQuery(".showing").is(item)){
            terminal.append(item.find('.detail').children().clone());
            click_twice_noti = false;
            return;
        }

        jQuery(".showing").removeClass("showing");
        var lines = item.addClass('showing').find('.detail').children();
        var i = 0, j = 0, text = "";
        var cur;

        inteval = setInterval(function(){
            if(j >= text.length){
                if(i >= lines.length){
                    clearInterval(inteval);
                    inteval = false;
                    callback();
                    return;
                }
                cur = lines.eq(i).clone();
                debug = cur;
                if(cur.is('p,a')){
                    text = cur.text();
                    cur.text("");
                }
                else if(cur.is('img'))
                    text = "";
                else{
                    console.error("only p, a, img is availible...");
                    i = lines.length;
                    return;
                }
                terminal.append(cur);
                i++; j = 0;
            }
            cur.text(cur.text() + text.charAt(j));
            j++;
        },20);

        if(to_term)
            goto('#showcase/' + item.attr('id'));
    }

    var showcases = false;
    var scroll_play = false;

    JT2html({
        body:'@{list}',
        list:'<div class="column"><h2 class="ui center aligned icon header"><i class="circular @{icon} icon"></i>@{text}</h2><div class="ui animated divided list">@{item}</div></div>',
        item:'<div id="@{id}" class="item"><img class="ui image" src="@{src}"><div class="content"><div class="header">@{text}</div>@{detail}</div></div>',
        detail:'<div class="detail">@{a}@{p}@{img}</div>',
        a:'<a href="@{href}" target="_blank">@{text}</a>@{a}@{p}@{img}',
        p:'<p>@{text}</p>@{a}@{p}@{img}',
        img:'<img class="ui small right floated circular image" src="@{src}"></img>@{a}@{p}@{img}',
    }).fromGS('https://spreadsheets.google.com/feeds/list/0Auxy7gVEXhIrdDd6LUphYmRkRXk0dmRXWUJVUHdsSVE/2/public/values?alt=json',function(html){
        showcases = jQuery("#showcases").append(html).slideDown().find('.item:not(#showcase-demo):has(.detail)');
        showcases.click(function(){
            scroll_play = false;
            show_item(jQuery(this));
            if(click_twice_noti) click_twice_noti();
        });
        show_item(jQuery('#showcase-demo'),false,function(){
            scroll_play = function(){
                if(jQuery(document).scrollTop() >= jQuery('#showcase').position().top && scroll_play){
                    scroll_play = false;
                    var first_show = window.location.hash.split('/');
                    first_show = first_show.length >= 2 ? jQuery("#" + first_show[1]) : showcases.eq(Math.floor((Math.random() * showcases.length)));
                    first_show = first_show.is('.item:not(#showcase-demo):has(.detail)') ? first_show : showcases.eq(Math.floor((Math.random() * showcases.length)));
                    show_item(first_show,false);
                }
            };
            scroll_play();
        });
    });

    function scroll_check(){
        if(jQuery(document).scrollTop() >= jQuery('#story').position().top)
            jQuery("#bg").removeClass('blur');
        else
            jQuery('#bg').addClass('blur');
    }
    scroll_check();

    var refresh_inteval = false;
    jQuery(window).scroll(function(){
        if(!refresh_inteval){
            scroll_check();
            if(scroll_play) scroll_play();
        }
        refresh_inteval = setTimeout(function(){
            refresh_inteval = false;
        },150);
    });
});
