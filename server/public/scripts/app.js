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

                if(clickCounter == data.people.length){
                    clickCounter = 0;
                }

                i = clickCounter;
                console.log(i);
                console.log(data.people[i]);

                showPerson(data.people[i]);
                highlightButton();
            });

            $('.leftScroll').on('click', function() {
                clickCounter--;

                if(clickCounter < 0) {
                    clickCounter = data.people.length -1;
                }

                i = clickCounter;

                showPerson(data.people[i]);
                console.log(data.people[i]);
                highlightButton();
            });

        },
        error: function() {
            console.log('ERROR: Unable to contact the server.');
        }

    });
}

function showPerson(person) {
    $('#showcase').find('span').remove();
    $('#showcase').children().last().addClass('hidden');
    $('#showcase').append('<div class="person"></div>');

    var $el = $('.person');
    $el.append('<h2>' + person.name + '</h2>');
    $el.append('<p>Favorite Movie: ' + person.favoriteMovie1 + '</p>');
    $el.append('<p>Second Favorite Movie: ' + person.favoriteMovie2 + '</p>');
    $el.append('<p>Favorite Song: ' + person.favoriteSong + '</p>');
}

function highlightButton() {
    $('.selectedPerson').removeClass('highlight');

    $('.selectedPerson').each(function() {
        var currentElement = $(this);

        if (currentElement.data('id') === i){
            $(this).addClass('highlight');
        }
    });
}