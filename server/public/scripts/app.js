var clickCounter = -1;
var personNum = 0;


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
                $('.currentPerson').append('<button class="selectedPerson"> ' + personNum + ' </button>');
                $('.currentPerson').children().last().data('id', i);
                personNum++;
            });

            $('.currentPerson').on('click', '.selectedPerson', function() {
                $('.selectedPerson').each(function(i) {
                    $(this).removeClass('highlight');
                });

                $(this).addClass('highlight');
                var selectedButton = $(this);

                clickCounter = selectedButton.data('id');
                i = clickCounter;

                showPerson(data.people[i]);
            });

            $('.rightScroll').on('click', function() {
                clickCounter++;
                i = clickCounter;

                if(clickCounter <= 18) {
                    showPerson(data.people[i]);
                } else if(clickCounter == 19){
                    clickCounter = -1;
                    showPerson(data.people[i]);
                }

                $('.selectedPerson').removeClass('highlight');

                $('.selectedPerson').each(function() {
                    var currentElement = $(this);

                    if (currentElement.data('id') === i){
                            $(this).addClass('highlight');
                        }
                });
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

                $('.selectedPerson').removeClass('highlight');

                $('.selectedPerson').each(function() {
                    var currentElement = $(this);
                    if (currentElement.data('id') === i){
                        $(this).addClass('highlight');
                    }
                });
            });

            function showPerson(person) {
                $('#showcase').children().last().addClass('hidden');
                $('#showcase').append('<div class="person"></div>');

                var $el = $('.person');
                $el.append('<h2>' + person.name + '</h2>');
                $el.append('<p>Favorite Movie: ' + person.favoriteMovie1 + '</p>');
                $el.append('<p>Second Favorite Movie: ' + person.favoriteMovie2 + '</p>');
                $el.append('<p>Favorite Song: ' + person.favoriteSong + '</p>');
            }
        },
        error: function() {
            console.log('ERROR: Unable to contact the server.');
        }

    });
}