/* Remember that blanket will only work with brackets live preview */
/* Try to maximise the coverage of the SantaModel object */

describe("Santa", function () {

    it("should init the data", function () {
        SantaModel.init();
        expect(SantaModel.current).toBe(0);
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
        expect(SantaModel.pack("yes")).toBe(0);
        expect(SantaModel.pack("pippo")).toBe(0);
        expect(SantaModel.pack("no")).toBe(1);
    });

    it("..", function () {

    });
});
