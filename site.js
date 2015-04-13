var debug;

jQuery(function(){
    var refresh_inteval = false;
    jQuery(window).scroll(function(){
        if(!refresh_inteval){
            if(jQuery(document).scrollTop() > jQuery('#change_stage').position().top)
                jQuery("#bg").removeClass('blur');
            else
                jQuery('#bg').addClass('blur');
        }
        refresh_inteval = setTimeout(function(){
            refresh_inteval = false;
        },200);
    });

    var terminal = jQuery('#terminal-container');
    var inteval;
    function show_item(item){
        clearInterval(inteval);
        terminal.empty();
        jQuery(".showing").removeClass("showing");
        var lines = item.addClass('showing').find('.detail').children();
        var i = 0, j = 0, text = "";
        var cur;

        inteval = setInterval(function(){
            if(j >= text.length){
                if(i >= lines.length){
                    clearInterval(inteval);
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
        },30);
    }

    JT2html({
        body:'@{list}',
        list:'<div class="column"><h2 class="ui center aligned icon header"><i class="circular @{icon} icon"></i>@{text}</h2><div class="ui animated text-center list">@{item}</div></div>',
        item:'<div class="item"><img class="ui avatar image" src="@{img}"><div class="content"><div class="header">@{text}</div>@{detail}</div></div>',
        detail:'<div class="detail">@{a}@{p}@{img}</div>',
        a:'<a href="@{href}" target="_blank">@{text}</a>@{a}@{p}@{img}',
        p:'<p>@{text}</p>@{a}@{p}@{img}',
        img:'<img class="ui small right floated circular image" src="@{img}"></img>@{a}@{p}@{img}',
    }).fromGS('https://spreadsheets.google.com/feeds/list/0Auxy7gVEXhIrdDd6LUphYmRkRXk0dmRXWUJVUHdsSVE/2/public/values?alt=json',function(html){
        var showcases = jQuery("#showcases").empty().append(html).slideDown().find('.item:has(.detail)');
        showcases.click(function(){
            show_item(jQuery(this));
        });
        console.log([Math.floor((Math.random() * showcases.length)),showcases.length]);
        show_item(showcases.eq(Math.floor((Math.random() * showcases.length))));
    });
});
