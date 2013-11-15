(function(undefined) {
    function evaluate(force) {
        var value = editor.getValue();
//        if(force === true || encodeURI(value) != window.location.search.substring(1)) {
            outputs.style.opacity = "0.75"

            if (history.pushState) {
                var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + encodeURI(value);
                window.history.pushState({path:newurl},'',newurl);
            }

            ws.send(value)
//        }
    }

    function maskOutputs() {
        outputs.style.opacity = "0.75";
    }

    function unmaskOutputs() {
        outputs.style.opacity = "1";
    }

    function codeMirrorSettings(ext) {
        ext = ext || {}
        var merged = {};
        var defaults = {
            theme: "solarized light",
            smartIndent: false,
            tabSize: 2,
            lineNumbers: true
        };

        for (var prop in defaults) { merged[prop] = defaults[prop]; }
        for (var prop in ext) { merged[prop] = ext[prop]; }

        return merged
    }

    var editor = CodeMirror(document.getElementById("code"), codeMirrorSettings({
        mode:  "text/x-scala",
        extraKeys: {
            "Alt-Enter": evaluate,
            "Cmd-Enter": evaluate
        }
    }));

    var display = CodeMirror(document.getElementById("output"), codeMirrorSettings())

    var console = CodeMirror(document.getElementById("console"), codeMirrorSettings({
        value: "Welcome to Tinsmith.\nYou are standing in an open field.\n\nAlt-Enter or ⌘-Enter to evaluate",
        lineNumberFormatter: function(){
            return ">"
        }
    }));

    var ws = new WebSocket('ws://' + window.location.host + '/stream')

    ws.onmessage = function( message ) {
        unmaskOutputs();
        var data = JSON.parse(message.data);
        display.setValue(data.userRepr);
        console.setValue(data.output);
    };

    ws.onerror = function(){
        unmaskOutputs();
        display.setValue("error");
        console.log(arguments);
    }


    if(window.location.search !== "") {
//        maskOutputs();
        editor.setValue(decodeURI(window.location.search.substring(1)));

//        if(ws.readyState == 1) {
//            evaluate(true);
//        }else {
//            ws.onopen = function() {
//                evaluate(true);
//            }
//        }
    }
})()