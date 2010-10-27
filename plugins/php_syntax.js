/*
Modified from Bespin js_syntax.
Contribuitor: Reijo Vosu ( reijovosu@gmail.com )
*/
"define metadata";
({
    "description": "PHP syntax highlighter",
    "dependencies": { "standard_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "php",
            "pointer": "#PHPSyntax",
            "fileexts": [ "php", "phtml" ]
        }
    ]
});
"end";

var StandardSyntax = require('standard_syntax').StandardSyntax;

var states = {
    start: [
        {
        	//Variables
        	regex:  /^\$[a-z_]\w*/,
            tag:    'identifier',
        	
            /*regex:  /^$([A-Za-z_$][A-Za-z0-9_$]*)\s*=\s*\.\s*\\+\s*-\s/,
            tag:    'identifier',*/
        },
        {
  			//Reserved words	
            regex:  /^(?:echo|foreach|else|if|elseif|for|as|while|foreach|break|continue|class|const|declare|switch|case|endfor|endswitch|endforeach|endswitch|endif|array|default|do|enddeclare|eval|exit|die|extends|function|global|include|include_once|require|require_once|isset|empty|list|new|static|unset|var|return|try|catch|final|throw|public|private|protected|abstract|interface|implements|const|define|__FILE__|__LINE__|__CLASS__|__METHOD__|__FUNCTION__|NULL|true|false|and|or|xor)(?![a-zA-Z0-9_])/,
            tag:    'keyword'
        },
        {
        	//Functions
            regex:  /^[A-Za-z_][A-Za-z0-9_]*/,
            tag:    'operator'
        },
        //in array []
        {
            regex:  /^[ \t]+/,
            tag:    'plain'
        },
        //string start with '
        {
            regex:  /^'(?=.)/,
            tag:    'string',
            then:   'qstring'
        },
        //string start with "
        {
            regex:  /^"(?=.)/,
            tag:    'string',
            then:   'qqstring'
        },
        //Comments
        {
            regex:  /^\/\/.*/,
            tag:    'comment'
        },
        {
            regex:  /^\/\*/,
            tag:    'comment',
            then:   'comment'
        },
        {
            regex:  /^./,
            tag:    'plain'
        }
    ],

    qstring: [
        {
            regex:  /^(?:\\.|[^'\\])*'?/,
            tag:    'string',
            then:   'start'
        }
    ],

    qqstring: [
        {
            regex:  /^(?:\\.|[^"\\])*"?/,
            tag:    'string',
            then:   'start'
        }
    ],

    comment: [
        {
            regex:  /^[^*\/]+/,
            tag:    'comment'
        },
        {
            regex:  /^\*\//,
            tag:    'comment',
            then:   'start'
        },
        {
            regex:  /^[*\/]/,
            tag:    'comment'
        }
    ]
};

exports.PHPSyntax = new StandardSyntax(states);
