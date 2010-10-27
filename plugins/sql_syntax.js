/*
Modified from Bespin python_syntax.
Contribuitor: Marc McIntyre ( marchaos@gmail.com )
*/
"define metadata";
({
    "description": "Python syntax highlighter",
    "dependencies": { "syntax_manager": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "sql",
            "pointer": "#SQLSyntax",
            "fileexts": [ "sql" ]
        }
    ]
});
"end";

var StandardSyntax = require('standard_syntax').StandardSyntax;

var states = {
  start: [
      {
      // SQL 2003 Keywords (can be uppercase of lowercase)
	  regex:  /^(?:ADD|ALL|ALLOCATE|ALTER|AND|ANY|ARE|ARRAY|AS|ASENSITIVE|ASYMMETRIC|AT|ATOMIC|AUTHORIZATION|BEGIN|BETWEEN|BIGINT|BINARY|BLOB|BOOLEAN|BOTH|BY|CALL|CALLED|CASCADED|CASE|CAST|CHAR|CHARACTER|CHECK|CLOB|CLOSE|COLLATE|COLUMN|COMMIT|CONDITION|CONNECT|CONSTRAINT|CONTINUE|CORRESPONDING|CREATE|CROSS|CUBE|CURRENT|CURRENT_DATE|CURRENT_DEFAULT_TRANSFORM_GROUP|CURRENT_PATH|CURRENT_ROLE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_TRANSFORM_GROUP_FOR_TYPE|CURRENT_USER|CURSOR|CYCLE|DATE|DAY|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DELETE|DEREF|DESCRIBE|DETERMINISTIC|DISCONNECT|DISTINCT|DO|DOUBLE|DROP|DYNAMIC|EACH|ELEMENT|ELSE|ELSEIF|END|ESCAPE|EXCEPT|EXEC|EXECUTE|EXISTS|EXIT|EXTERNAL|FALSE|FETCH|FILTER|FLOAT|FOR|FOREIGN|FREE|FROM|FULL|FUNCTION|GET|GLOBAL|GRANT|GROUP|GROUPING|HANDLER|HAVING|HOLD|HOUR|IDENTITY|IF|IMMEDIATE|IN|INDICATOR|INNER|INOUT|INPUT|INSENSITIVE|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|IS|ITERATE|JOIN|LANGUAGE|LARGE|LATERAL|LEADING|LEAVE|LEFT|LIKE|LOCAL|LOCALTIME|LOCALTIMESTAMP|LOOP|MATCH|MEMBER|MERGE|METHOD|MINUTE|MODIFIES|MODULE|MONTH|MULTISET|NATIONAL|NATURAL|NCHAR|NCLOB|NEW|NO|NONE|NOT|NULL|NUMERIC|OF|OLD|ON|ONLY|OPEN|OR|ORDER|OUT|OUTER|OUTPUT|OVER|OVERLAPS|PARAMETER|PARTITION|PRECISION|PREPARE|PRIMARY|PROCEDURE|RANGE|READS|REAL|RECURSIVE|REF|REFERENCES|REFERENCING|RELEASE|REPEAT|RESIGNAL|RESULT|RETURN|RETURNS|REVOKE|RIGHT|ROLLBACK|ROLLUP|ROW|ROWS|SAVEPOINT|SCOPE|SCROLL|SEARCH|SECOND|SELECT|SENSITIVE|SESSION_USER|SET|SIGNAL|SIMILAR|SMALLINT|SOME|SPECIFIC|SPECIFICTYPE|SQL|SQLEXCEPTION|SQLSTATE|SQLWARNING|START|STATIC|SUBMULTISET|SYMMETRIC|SYSTEM|SYSTEM_USER|TABLE|TABLESAMPLE|THEN|TIME|TIMESTAMP|TIMEZONE_HOUR|TIMEZONE_MINUTE|TO|TRAILING|TRANSLATION|TREAT|TRIGGER|TRUE|UNDO|UNION|UNIQUE|UNKNOWN|UNNEST|UNTIL|UPDATE|USER|USING|VALUE|VALUES|VARCHAR|VARYING|WHEN|WHENEVER|WHERE|WHILE|WINDOW|WITH|WITHIN|WITHOUT|YEAR)(?![a-zA-Z0-9_])/i,
	  tag:    'keyword'
      },
      {
	  regex:  /^[A-Za-z_][A-Za-z0-9_]*/,
	  tag:    'identifier'
      },
      {
	  regex:  /^[^'"-\/ \tA-Za-z0-9_]+/,
	  tag:    'plain'
      },
      {
	  regex:  /^[ \t]+/,
	  tag:    'plain'
      },
      {
      // Oracle style quoting.
	  regex:  /^''/,
	  tag:    'string',
	  then:   'qqqstring'
      },
      {
      // Oracle style quoting.
	  regex:  /^'''/,
	  tag:    'string',
	  then:   'qqqqstring'
      },
      {
	  regex:  /^'/,
	  tag:    'string',
	  then:   'qstring'
      },
      {
	  regex:  /^"/,
	  tag:    'string',
	  then:   'qqstring'
      },
      {
	  regex:  /^--.*/,
	  tag:    'comment'
      },
      {
      // PostgreSQL supports C style comments.
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
	  regex:  /^'/,
	  tag:    'string',
	  then:   'start'
      },
      {
	  regex:  /^(?:\\.|[^'\\])+/,
	  tag:    'string'
      }
  ],
  
  qqstring: [
        {
  	  regex:  /^"/,
  	  tag:    'string',
  	  then:   'start'
        },
        {
  	  regex:  /^(?:\\.|[^"\\])+/,
  	  tag:    'string'
        }
    ],

  qqqstring: [
      {
	  regex:  /^''/,
	  tag:    'string',
	  then:   'start'
      },
      {
    	  regex:  /^(?:\\.|[^'\\])*''?/,
	  tag:    'string'
      }
  ],

  qqqqstring: [
      {
	  regex:  /^'''/,
	  tag:    'string',
	  then:   'start'
      },
      {
      regex:  /^(?:\\.|[^'\\])*'''?/,
	  tag:    'string'
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

exports.SQLSyntax = new StandardSyntax(states);
