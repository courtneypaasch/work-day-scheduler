
$("document").ready(function () {


    //function that sets current date and displays in header
    function setDate() {
        var date = moment().format('dddd MMMM Do, YYYY');
        $("#currentDay").html(date);
    }

    setDate();


    //function that adds time blocks for each hour
    for (i = 0; i < 10; i++) {
        var index = i;
        var eventInput = $("#eventEntered");
       
        function timeBlock() {
          

            function setHours(i) {
                var time = i + 8;

                if (time < 12) {
                    time += "AM";
                } if (time === 12) {
                    time += "PM";
                } if (time > 12) {
                    time = time - 12 + "PM";
                }
                return time;
            }

            function currentTime(i) {
                var time = i + 8;
            
                if (moment().format('H')<time) {
                    event.addClass("future");
                } if (moment().format('H')==time) {
                    event.addClass("present");
                } if (moment().format('H')>time) {
                    event.addClass("past");
                }
            }

            var timeBlock = $("<form>");
            timeBlock.addClass("time-block row");
            timeBlock.attr("index", index);

            var hour = $("<div>" + setHours(i) + "</div>");
            hour.addClass("hour");

            var event = ($("<input>", {type: "text", placeholder: "Enter an event or reminder", name: "eventEntered", id: "eventEntered"}));
            currentTime(i);
            event.attr("index", index);

            var saveButton = $("<button>");
            saveButton.addClass("saveBtn");
            saveButton.attr("index", index);
            saveButton.addClass("fa fa-save");

            timeBlock.append(hour,event,saveButton);
            $(".container").append(timeBlock);

        
        }

        timeBlock();
    }

    $(".time-block").on("click", function() {
        event.preventDefault();
        var clickedIndex = ($(event.target).attr("index"));
        var inputClicked = $("input[index|=" + clickedIndex + "]").val();

        localStorage.setItem(clickedIndex, inputClicked);
    })



    function renderEvents() {

        for(i = 0; i < 10; i++) {

            var inputSet = $("input[index|=" + i + "]");
            var getInput = localStorage.getItem(i);
            var help = $("input[index|=" + i + "]").val(getInput);
        }
    }

    renderEvents();

})





