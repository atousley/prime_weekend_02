var clickCounter = -1;
var personNum = 0;
var i = 0;
var toSelect = 0;

$(document).ready(function(){
    getData();
});

function getData(){
    $.ajax({
        type: "GET",
        url:"/data",
        success: function(data) {
            console.log(data);

            for(var i = 0; i < data.people.length; i++){
                $('.currentPerson').append('<button id="selectedPerson" class="'+ personNum +'" > ' + personNum + ' </button>');
                //$('.currentPerson').children().last().data('id', personNum);
                personNum++;
            }

            function selectPerson() {
                $('#selectedPerson').each(function (i) {

                    var id = $('#selectedPerson').children().first();

                    console.log(id);

                    if(id == clickCounter) {
                        console.log(clickCounter);
                    }
                });
            }

            $('.rightScroll').on('click', function() {
                clickCounter++;
                i = clickCounter;

                if(clickCounter <= 18) {
                    showPerson(data.people[i]);
                } else if(clickCounter == 19){
                    clickCounter = -1;
                    showPerson(data.people[i]);
                }
                return clickCounter;
            });

            $('.leftScroll').on('click', function() {
                clickCounter--;
                i = clickCounter;

                if(clickCounter >= 0) {
                    showPerson(data.people[i]);
                } else {
                    clickCounter = 19;
                    showPerson(data.people[i]);
                }
                return clickCounter;
            });

            function showPerson(person) {
                $('#showcase').children().last().remove();
                $('#showcase').append('<div class="person"></div>');

                var $el = $('.person');
                $el.append('<h2>' + person.name + '</h2>');
                $el.append('<p>' + person.favoriteMovie1 + '</p>');
                $el.append('<p>' + person.favoriteMovie2 + '</p>');
                $el.append('<p>' + person.favoriteSong + '</p>');

                //currentPerson = data.people[i];
                //console.log(currentPerson);

                selectPerson();
            };
        },
        error: function() {
            console.log('ERROR: Unable to contact the server.');
        }

    });
}