"define metadata";
({
    "provides": [
        {
            "ep": "command",
            "name": "alert",
            "key": "ctrl_i",
            "pointer": "#showMessage"
        }
    ]
});
"end";

exports.showMessage = function() {
    alert("Greetings from the Cloud!");
};
