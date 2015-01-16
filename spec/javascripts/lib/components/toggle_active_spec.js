define([ "public/assets/javascripts/lib/components/toggle_active.js" ], function(ToggleActive) {

  describe("ToggleActive", function() {

    var instance;

    beforeEach(function() {
      loadFixtures("toggle_active.html");
      instance = new ToggleActive();
    });

    describe("Initialisation", function() {

      it("Initially adds the is-not-active class", function() {
        expect($(".foo")).toHaveClass("is-not-active");
      });

      describe("Toggles class names.", function() {
        beforeEach(function(done) {
          $("#normal").trigger("click");
          spyOn(instance, "_broadcast").and.callFake(done);
        });

        it("toggles the is-active and is-not-active class names", function() {
          expect($(".foo")).toHaveClass("is-active");
          expect($(".foo")).not.toHaveClass("is-not-active");
        });
      });

      describe("Custom class.", function() {
        beforeEach(function(done) {
          $("#custom-class").trigger("click");
          spyOn(instance, "_broadcast").and.callFake(done);
        });

        it("toggles a custom class", function() {
          expect($(".foo")).toHaveClass("custom-class");
        });
      });

      describe("Toggle both.", function() {
        beforeEach(function(done) {
          $("#both").trigger("click");
          spyOn(instance, "_broadcast").and.callFake(done);
        });

        it("toggles the is-active classes on both the clicked element and the target", function() {
          expect($("#both")).toHaveClass("is-active");
          expect($("#both")).not.toHaveClass("is-not-active");
        });
      });

      describe("Prevents the default click event for anchor elements", function() {
        var e;

        beforeEach(function(done) {
          e = $.Event("click");
          $("#is-cancellable").trigger(e);
          spyOn(instance, "_broadcast").and.callFake(done);
        });

        it("", function() {
          expect(e.isDefaultPrevented()).toBe(true);
        });
      });

      describe("Does not prevent the default click event for non-anchor elements", function() {
        var e;

        beforeEach(function(done) {
          e = $.Event("click");
          $("#not-cancellable").trigger(e);
          spyOn(instance, "_broadcast").and.callFake(done);
        });

        it("", function() {
          expect(e.isDefaultPrevented()).not.toBe(true);
        });
      });

    });

    describe("Works with events", function() {
      var beforeState, spyEvent;

      beforeEach(function() {
        beforeState = $("#evented").hasClass("is-active");
        spyEvent = spyOnEvent($("#evented"), ":toggleActive/click");
      });

      describe(":toggleActive/click", function() {
        beforeEach(function(done) {
          $("#evented").one(":toggleActive/click", function() {
            done();
          });

          $("#evented").trigger("click");
        });

        it("has triggered the event (otherwise this spec would time out)", function() {
          expect($("#evented").hasClass("is-active")).not.toEqual(beforeState);
        });
      });

      describe(":toggleActive/update", function() {
        beforeEach(function(done) {
          instance.$context.one(":toggleActive/ready", function() {
            done();
          });

          $("#evented").trigger(":toggleActive/update", $("#evented").get(0));
        });

        it("has listened to the event", function() {
          expect($("#evented").hasClass("is-active")).not.toEqual(beforeState);
        });
      });
    });

  });

});
