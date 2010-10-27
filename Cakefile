exec = require('child_process').exec

task 'build', ->
  exec 'coffee -c --no-wrap plugins/coffeescript_syntax.coffee', (err) ->
    puts err if err
    exec 'cd BespinEmbedded-0.9a2 && python dryice.py ../coffeescript_syntax.json', (err) ->
      puts err if err
