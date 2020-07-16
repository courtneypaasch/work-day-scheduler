
$("document").ready(function () {


    //function that sets current date and displays in header
    function setDate() {
        var date = moment().format('dddd MMMM Do, YYYY');
        $("#currentDay").html(date);
    }

    setDate();


    //loop that creates a specified number of hour blocks on the scheduler
    for (i = 0; i < 10; i++) {
        var index = i;
    
    //constructor function for the body of the scheduler
        function timeBlock() {
          
    
    //function that formats the times for each hour block during construction
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

    //function that establishes the current time and uses it to conditionally format time block shading
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

            var hour = $("<div>" + setHours(i) + "</div>");
            hour.addClass("hour");

            var event = ($("<input>", {type: "text", placeholder: "Enter an event or reminder", name: "eventEntered", id: "eventEntered"}));
            currentTime(i);
            event.attr("index", index);

            var saveButton = $("<button>");
            saveButton.addClass("saveBtn fa fa-save");
            saveButton.attr("index", index);

            timeBlock.append(hour,event,saveButton);
            $(".container").append(timeBlock);

        
        }

        timeBlock();
    }

    //click event to get index of the updated event to save and pull on reload
    $(".time-block").on("click", function() {
        event.preventDefault();
        var clickedIndex = ($(event.target).attr("index"));
        var inputClicked = $("input[index|=" + clickedIndex + "]").val();

        localStorage.setItem(clickedIndex, inputClicked);
    })


//renders saved events from local storage on reload
    function renderEvents() {

        for(i = 0; i < 10; i++) {

            var getInput = localStorage.getItem(i);
            $("input[index|=" + i + "]").val(getInput);
        }
    }

    renderEvents();

})





