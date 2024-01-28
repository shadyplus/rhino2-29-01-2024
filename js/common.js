$(function() {

    // Шкала прогресса теста
    var progress_bar = $('.quiz__progress-bar');
    var counter = document.querySelector('.counter');
    var slider_length_element = document.querySelector('.counter-length').textContent;
    var counterProgress = 1;
    var current_width;
    var step_bar = 100 / slider_length_element;
    progress_bar.css("width", current_width + "%");
    current_width = step_bar;
    
    function progressScale() {
        counterProgress++;
        counter.innerHTML = counterProgress;
        slider_length_element = $(".quiz").children().length;
        current_width += step_bar;
        progress_bar.css("width", current_width + "%");
    }

    // Псевдозагрузка результата теста
    var load = document.querySelector('.load');
    var loadingCircle = document.querySelector('.loading-circle');
    var loadProgress = 1;
    function loadingResult() {
        setInterval(function() {
            if (loadProgress >=100) {
                loadingCircle.style = "animation-play-state: paused";
                clearInterval(loadingResult);
            } else {
                loadProgress++;
                load.innerHTML = loadProgress + '%';
            }
        }, 10);
    }


    var quizQuestions = $(".quiz__questions");
    var quizLoading = $(".quiz__loading");
    var step = $(".quiz__step");
    var current_slide = 0;
    var score = 0;

    //Получение баллов из выбранного ответа
    function checkAnswer() {
            var answerValue = $('.quiz__step.active input:checked');
            score = score + parseInt(answerValue.val());
            //console.log(score);
    }

    // Скрипт перехода по вопросам теста
    function next() {
        if (current_slide === 4) {
            quizQuestions.slideUp();
            quizLoading.slideToggle().addClass("show");
            loadingResult();
        } else {
            checkAnswer();
            current_slide++;
            step.removeClass('active');
            step.eq(current_slide).addClass('active');
            progressScale();
        }
    }

    $(".js-next").click(function() {
        $("html, body").animate({scrollTop: $('.quiz__questions').offset().top}, 1000);
        next();
    });

    // Скрипт вывода результата теста
    $(".js-result").click(function() {
        if (loadProgress >=100) {
            $('.article__content').slideUp();
            $("html, body").animate({scrollTop: $('.main-inner').offset().top}, 1000);
            if (score >= 11) {
                $('.quiz__rezult-bad').slideToggle();
            } else if (score <= 5) {
                $('.quiz__rezult-good').slideToggle();
            } else {
                $('.quiz__rezult-normal').slideToggle();
            }
            return false;
        }
    });


});