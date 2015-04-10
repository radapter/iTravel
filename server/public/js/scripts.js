$(document).ready(function() {
	//console.log("test");

    $("#planner h4#optional").click(function(){
        var gly = $(this).find("span.glyphicon");
        if(gly.hasClass("glyphicon-plus")){
           gly.removeClass("glyphicon-plus").addClass("glyphicon-minus");
           $(this).siblings("div.panel").show();
        }
        else{
           gly.removeClass("glyphicon-minus").addClass("glyphicon-plus");
           $(this).siblings("div.panel").hide();
        }
    });

	//$("#attraction-price-range").bootstrapSlider({});
});