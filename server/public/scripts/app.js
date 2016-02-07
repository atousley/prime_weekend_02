var clickCounter = -1;
var personNum = 0;
//var i = 0;
var person = 0;

$(document).ready(function(){
    getData();
});

function getData(){
    $.ajax({
        type: "GET",
        url:"/data",
        success: function(data) {
            console.log(data);

            $.each(data.people, function(i, person) {
                $('#showcase').append('<div class="person"></div>').data('id', i);

                var $el = $('#showcase').children().last();
                $el.append('<h2>' + person.name + '</h2>');
                $el.append('<p>' + person.favoriteMovie1 + '</p>');
                $el.append('<p>' + person.favoriteMovie2 + '</p>');
                $el.append('<p>' + person.favoriteSong + '</p>');
                $el.addClass('hidden');

                $('.currentPerson').append('<button class="selectedPerson"> ' + personNum + ' </button>');
                $('.currentPerson').children().last().data('id', i);
                personNum++;

            });

            $('.container').on('click', '.selectedPerson', function() {
                $('.selectedPerson').each(function(i) {
                    $(this).removeClass('highlight');
                });

                $(this).addClass('highlight');


                //$('.person').each(function() {
                //    $(this).removeClass('selected');
                //    $(this).hide();
                //    if ($(this).data('index') == $('.selectedButton').data('index')) {
                //        $(this).fadeIn(750);
                //        $(this).addClass('selected');
                //    }
                //});

            });

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

            //function showPerson(person) {
            //    $('#showcase').children().last().addClass('hidden');
            //    $('#showcase').append('<div class="person"></div>');
            //
            //    var $el = $('.person');
            //    $el.append('<h2>' + person.name + '</h2>');
            //    $el.append('<p>' + person.favoriteMovie1 + '</p>');
            //    $el.append('<p>' + person.favoriteMovie2 + '</p>');
            //    $el.append('<p>' + person.favoriteSong + '</p>');
            //
            //
            //    //console.log(currentPerson);
            //
            //    selectPerson();
            //};
        },
        error: function() {
            console.log('ERROR: Unable to contact the server.');
        }

    });
}