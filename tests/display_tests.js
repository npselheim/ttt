var display = null,
    html = "<table><tr>" +
                    "<td class='cell' id='cell0'></td>" +
                    "<td class='cell' id='cell1'></td>" +
                    "<td class='cell' id='cell2'></td>" +
                    "<td class='cell' id='cell3'></td>" +
                    "<td class='cell' id='cell4'></td>" +
                    "<td class='cell' id='cell5'></td>" +
                    "<td class='cell' id='cell6'></td>" +
                    "<td class='cell' id='cell7'></td>" +
                    "<td class='cell' id='cell8'></td>" +
                    "<td id='message'></td>" +
                "</tr></table>" +
                '<form><fieldset class="radio" id="modeSelect">' +
                    '<input id="modeOne" name="modeGroup" type="radio" value="1" checked />' +
                    '<input id="modeTwo" name="modeGroup" type="radio" value="2" />' +
                    '</fieldset>' +
                    '<fieldset class="radio mark" id="markSelect">' +
                    '<input id="X" name="xoGroup" type="radio" value="X" checked />' +
                    '<input id="O" name="xoGroup" type="radio" value="O" />' +
                    '</fieldset>' +
                    '<input type="button" value="Start" name="startBtn" id="startBtn" />' +
                '</form>';

module("Display Tests", {
    setup: function () {
        $fixture.append(html);
        display = MyApp.display();
    },
    teardown: function () {
        display = null;
        $fixture.empty();
    }
});

test("can format winning row", function () {
    expect(9);
    // $fixture.append(cellsHtml);
    display.formatWinningRow([2, 5, 8]);
    deepEqual(jQuery("td#cell0").hasClass("winner_cell"), false,
        "cell0 should not be a winner");
    deepEqual(jQuery("td#cell1").hasClass("winner_cell"), false,
        "cell1 should not be a winner");
    deepEqual(jQuery("td#cell2").hasClass("winner_cell"), true,
        "cell2 should be a winner");
    deepEqual(jQuery("td#cell3").hasClass("winner_cell"), false,
        "cell3 should not be a winner");
    deepEqual(jQuery("td#cell4").hasClass("winner_cell"), false,
        "cell4 should not be a winner");
    deepEqual(jQuery("td#cell5").hasClass("winner_cell"), true,
        "cell5 should be a winner");
    deepEqual(jQuery("td#cell6").hasClass("winner_cell"), false,
        "cell6 should not be a winner");
    deepEqual(jQuery("td#cell7").hasClass("winner_cell"), false,
        "cell7 should not be a winner");
    deepEqual(jQuery("td#cell8").hasClass("winner_cell"), true,
        "cell8 should be a winner");
});

test("can display a status message", function() {
    expect(1);
    // $fixture.append(cellsHtml);
    var msg = "This is a test message.",
        msgElement = jQuery("td#message");
    display.showStatus(msg);
    // console.log(msgElement);
    deepEqual(msgElement.text(), msg, "should contain the test message");
});

test("reset should clear the display", function() {
    expect(2);
    // $fixture.append(cellsHtml);
    jQuery("td#cell0").text("X");
    jQuery("td#cell7").text("X");
    deepEqual(helper.getNumberMarkedWith("X"), 2, "should be two Xs");
    display.reset();
    deepEqual(helper.getNumberMarkedWith("X"), 0, "should be cleared");
});

test("start button click displays status", function() {
    expect(1);
    // $fixture.append(formHtml);
    display.init();

});