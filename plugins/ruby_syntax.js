/*
Modified from Bespin js_syntax.
Contribuitor: Marc McIntyre ( marchaos@gmail.com )

Currently does not support HEREDOCS or

%q!I said, "You said, 'She said it.'"!
%!I said, "You said, 'She said it.'"!
%Q('This is it.'\n)

style string literals.
*/
"define metadata";
({
    "description": "Ruby syntax highlighter",
    "dependencies": { "standard_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "rb",
            "pointer": "#RubySyntax",
            "fileexts": [ "rb", "ruby" ]
        }
    ]
});
"end";


var StandardSyntax = require('standard_syntax').StandardSyntax;

var states = {
    start: [
        {
        	// Special identifiers
			regex:  /^\$[\!\@\&\`\'\+\~\=\/\\\,\.\<\>\;\_\*\$\?\"\:0-9]{1}/,
			tag:    'identifier',
		},
		{
        	// Instance Variable
			regex:  /^\@{1,2}[a-z_]\w*/,
			tag:    'identifier',
		},
        {
			//Variables
			regex:  /^\$[a-z_]\w*/,
			tag:    'identifier',
		},
		{
			//Variables
			regex:  /^\:[a-z_]\w*/,
			tag:    'identifier',
		},
        {
            regex:  /^(?:BEGIN|END|__ENCODING__|__END__|__FILE__|__LINE__|alias|and|begin|break|case|class|def|defined|do|else|elsif|end|ensure|false|for|if|in|module|next|nil|not|or|redo|rescue|retry|return|self|super|then|true|undef|unless|until|when|while|yield|raise|proc|Proc|lambda|puts|print|new|call|gets)(?![a-zA-Z0-9_])/,
            tag:    'keyword'
        },
        {
      	    regex:  /^[A-Za-z_][A-Za-z0-9_]*/,
      	    tag:    'operator'
        },
        {
      	  regex:  /^[^'"#\/ \tA-Za-z0-9_]+/,
      	  tag:    'plain'
        },
        {
            regex:  /^[ \t]+/,
            tag:    'plain'
        },
        {
            regex:  /^'(?=.)/,
            tag:    'string',
            then:   'qstring'
        },
        {
            regex:  /^"(?=.)/,
            tag:    'string',
            then:   'qqstring'
        },
        {
      	    regex:  /^#.*/,
      	    tag:    'comment'
        },
        {
            regex:  /^=begin.*/,
            tag:    'comment'
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
            regex:  /^=end/,
            tag:    'comment'
        }
    ]
};

exports.RubySyntax = new StandardSyntax(states);
