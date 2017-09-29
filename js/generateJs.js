var subPageMap = {
	navSummary 	  : 'summary',
	navUnitTest   : 'unitTest',
	navCodeCount  : 'codeCount',
	navCodeOpt 	  : 'codeOpt',
	navCodeSmell  : 'codeSmell',
	navCodeStyle  : 'codeStyle'
}

Object.keys(subPageMap).forEach(function(d, i){
	(function(nav){
		$("#"+nav).on("click", function(){
			$("#"+ subPageMap[nav]).removeClass("none");
			$(this).addClass("active");
			Object.keys(subPageMap).forEach(function(dd, k){
				if(dd !== nav){
					$("#" + subPageMap[dd]).removeClass("none").addClass("none");
					$("#" + dd).removeClass("active");
				}
			})

		})
	})(d)
});


require('./subpage/codeCount.js')(resData.countCode);
require('./subpage/codeOpt.js')(resData.goIssue);
require('./subpage/codeSmell.js')(resData.codeSmell);
require('./subpage/codeStyle.js')(resData.codeStyle);
require('./subpage/summary.js')(resData);
require('./subpage/unitTest.js')(resData.gotest);
