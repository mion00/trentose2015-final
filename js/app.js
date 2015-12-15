/* SantaModel assists santa's helpers in packing children's requests.
 * It provides quality control by checking if the requests are being
 * fulfilled
 */

var SantaModel = {

    /* Initializes the model with a list of requests,
     * and sets the first one as the current one
     */
    init: function (list) {
        this.packs = [];
        this.requests = requests;
        this.current = -1;
    },

    /* It moves "current" to the next request */
    next: function () {
        this.current += 1;
    },

    /* Returns the current request.
     * If all requests have been processed (there is no current one), it returns null
     */
    getCurrentRequest: function () {
        if (this.current == this.requests.length) {
            return null;
        } else {
            return this.requests[this.current];
        }
    },

    /* Packs the given item if it fulfills the current request.
     * returns 1 if the given item fulfills the request (= answer)
     * returns 0 if the given item does not fulfill the request
     */
    pack: function (item) {
        var request = SantaModel.getCurrentRequest();
        if (request != null) {
            if (request.answer == item) {
                return 1;
            } else {
                return -1;
            }

        }
    }

};

var SantaView = {
    init: function() {
        this.bindAnswers();
    },
    showRequest: function (request) {
        $(".question").html(request.question);
        $(".question-items").empty();
        request.options.forEach(function (elem) {
            $(".question-items").append("<li>" + elem + "</li>");
        });
    },
    showResult: function (points) {
        $(".question").hide();
        $(".question-items").hide();
        $(".result").html("Total points: " + points);
    },
    bindAnswers: function() {
        $(".question-items").click(SantaController.clickHandler);
    }
};

var SantaController = {
    init: function() {
        this.points = 0;
        SantaModel.init();
        SantaView.init();
        this.showNextRequest();
    },
    showNextRequest: function() {
        SantaModel.next();
        var request = SantaModel.getCurrentRequest();
        if (request != null) {
            SantaView.showRequest(request);
        } else {
            SantaView.showResult(this.points);
        }
    },
    clickHandler: function(event) {
        var li = $(event.target).filter("li");
        if(li.length > 0) {
            var value = li.html();
            SantaController.checkAnswer(value);
        }
    },
    checkAnswer: function (answer) {
        var pack = SantaModel.pack(answer);
        this.points += pack;
        console.log(this.points);
        if (pack > 0) {
            SantaController.showNextRequest();
        }
    }
};

$(document).ready(function() {
   SantaController.init();
});