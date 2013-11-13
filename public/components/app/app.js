(function(undefined) {
    function debounce(fn, delay) {
        var timer = null;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    }

    var outputPane = document.getElementById("outputs");
    var editor = CodeMirror(document.getElementById("code"), {
        mode:  "text/x-scala",
        theme: "solarized light",
        smartIndent: false,
        tabSize: 2,
        lineNumbers: true
    });

    var display = CodeMirror(document.getElementById("output"), {
        mode:  "text/x-scala",
        theme: "solarized light",
        readOnly: true,
        tabSize: 2,
        lineNumbers: true
    })

    var console = CodeMirror(document.getElementById("console"), {
        mode:  "text/x-scala",
        theme: "solarized light",
        readOnly: true,
        tabSize: 2,
        lineNumbers: true,
        lineNumberFormatter: function(){
            return ">"
        }
    })

    editor.on("change", debounce(function(me, obj){
        outputs.style.opacity = "0.75"

        var value = me.getValue();

        if (history.pushState) {
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + encodeURI(value);
            window.history.pushState({path:newurl},'',newurl);
        }
        ws.send(value)
    }, 1500))

    var ws = new WebSocket('ws://' + window.location.host + '/stream')
    ws.onmessage = function( message ) {
        outputs.style.opacity = "1"
        var data = JSON.parse(message.data);
        display.setValue(data.userRepr);
        console.setValue(data.output);
    };

    ws.onerror = function(){
        outputs.style.opacity = "1";
        display.setValue("error");
        editor.log(arguments);
    }

    if(window.location.search !== "") {
        outputs.style.opacity = "0.75";
        editor.setValue(decodeURI(window.location.search.substring(1)));
    }
})()