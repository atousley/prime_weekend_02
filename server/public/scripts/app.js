var clickCounter = -1;
var peopleArray = [];


$(document).ready(function(){
    getData();
    $('.rightScroll').on('click', rightScroll);
    $('.leftScroll').on('click', leftScroll);
    $('.currentPerson').on('click', '.selectedPerson', updateIndex);
});

function getData(){
    $.ajax({
        type: "GET",
        url:"/data",
        success: function(data) {
            peopleArray = data.people;
            addIndexButtons();
        },
        error: function() {
            console.log('ERROR: Unable to contact the server.');
        }

    });
}

function addIndexButtons() {
    peopleArray.forEach(function(person, i) {
        $('.currentPerson').append('<button class="selectedPerson"> ' + i + ' </button>');
        $('.currentPerson').children().last().data('id', i);
    });
}

function updateIndex() {
    $('.selectedPerson').each(function(i) {
        $(this).removeClass('highlight');
    });

    $(this).addClass('highlight');
    var selectedButton = $(this);

    clickCounter = selectedButton.data('id');
    i = clickCounter;

    showPerson(peopleArray[i]);
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

function rightScroll() {
    clickCounter++;

    if(clickCounter == peopleArray.length){
        clickCounter = 0;
    }

    i = clickCounter;

    showPerson(peopleArray[i]);
    highlightButton();
}

function leftScroll() {
    clickCounter--;

    if(clickCounter < 0) {
        clickCounter = peopleArray.length -1;
    }

    i = clickCounter;

    showPerson(peopleArray[i]);
    highlightButton();
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