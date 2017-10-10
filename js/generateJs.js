//解析数据
// resData.gotest = JSON.parse(resData.gotest);
// resData.codeStyle = JSON.parse(resData.codeStyle);
// resData.goIssue = JSON.parse(resData.goIssue);
// resData.codeSmell = JSON.parse(resData.codeSmell);
// resData.countCode = JSON.parse(resData.countCode);

// console.log(resData.gotest);
// console.log(resData.codeStyle);
// console.log(resData.goIssue);
// console.log(resData.codeSmell);



var subPageMap = {
	navSummary: 
	{
		id: 'summary',
		label: ''
	},
	navUnitTest: {
		id: 'unitTest',
		label: '单元测试'
	},
	navCodeCount: {
		id: 'codeCount',
		label: '代码统计'
	},
	navCodeOpt: {
		id: 'codeOpt',
		label: '代码优化'
	},
	navCodeSmell: {
		id: 'codeSmell',
		label: '可维护性'
	},
	navCodeStyle: {
		id: 'codeStyle',
		label: '代码风格'
	}
}

Object.keys(subPageMap).forEach(function(d, i){
	(function(nav){
		$("#"+nav).on("click", function(){
			$("#"+ subPageMap[nav].id).removeClass("none");
			$(this).addClass("active");
			$(".navbar-brand").html(subPageMap[nav].label);
			Object.keys(subPageMap).forEach(function(dd, k){
				if(dd !== nav){
					$("#" + subPageMap[dd].id).removeClass("none").addClass("none");
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
