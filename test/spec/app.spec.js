/* Remember that blanket will only work with brackets live preview */
/* Try to maximise the coverage of the SantaModel object */

describe("Santa", function () {

    it("should init the data", function () {
        SantaModel.init();
        expect(SantaModel.current).toBe(-1);
        expect(SantaModel.requests.length).toBe(requests.length);
    });

    it("should show the result at the end", function () {
        SantaController.init();
        SantaModel.current = requests.length;
        spyOn(SantaView, "showResult");
        SantaController.showNextRequest();
        expect(SantaView.showResult).toHaveBeenCalled();
    });

    it("check the correct answer", function () {
        SantaController.init();
        expect(SantaModel.pack("Shampoo")).toBe(-1);
        expect(SantaModel.pack("pippo")).toBe(-1);
        expect(SantaModel.pack("Lego")).toBe(1);
    });

    it("the controller should check the answer", function () {
        SantaController.init();
        SantaController.checkAnswer("no");
        expect(SantaController.points).toBe(1);
    });

    it("should show next request", function () {
       SantaController.init();
        SantaController.showNextRequest();
    });
});
