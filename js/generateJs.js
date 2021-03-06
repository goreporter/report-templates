//解析数据
try{
	resData.gotest = JSON.parse(resData.gotest);
}catch(e){
	resData.gotest = dataDefault.gotest;
	console.error("gotest" + $.i18n('json_parse_error'));
}

try{
	resData.codeStyle = JSON.parse(resData.codeStyle);
}catch(e){
	resData.codeStyle = dataDefault.codeStyle;
	console.error("codeStyle" + $.i18n('json_parse_error'));
}

try{
	resData.goIssue = JSON.parse(resData.goIssue);
}catch(e){
	resData.goIssue = dataDefault.codeStyle;
	console.error("goIssue" + $.i18n('json_parse_error'));
}

try{
	resData.codeSmell = JSON.parse(resData.codeSmell);
}catch(e){
	resData.codeSmell = dataDefault.codeSmell;
	console.error("codeSmell" + $.i18n('json_parse_error'));
}

try{
	resData.countCode = JSON.parse(resData.countCode);
}catch(e){
	resData.countCode = dataDefault.countCode;
	console.error("countCode" + $.i18n('json_parse_error'));
}

initData(resData.gotest);
initData(resData.codeStyle, 'detail');
initData(resData.goIssue, 'detail');
initData(resData.codeSmell);
initData(resData.countCode);

function initData(data, value){
	Object.keys(data.content).forEach(function(d){
		typeof value === 'undefined' ? data.content[d] = data.content[d] || [] : data.content[d][value] = data.content[d][value] || [];
	})
}

var subPageMap = {
	navSummary: 
	{
		id: 'summary'
	},
	navUnitTest: {
		id: 'unitTest'
	},
	navCodeCount: {
		id: 'codeCount'
	},
	navCodeOpt: {
		id: 'codeOpt'
	},
	navCodeSmell: {
		id: 'codeSmell'
	},
	navCodeStyle: {
		id: 'codeStyle'
	}
}

/**
 * 切换菜单
 */
Object.keys(subPageMap).forEach(function(d, i){
	(function(nav){
		$("#"+nav).on("click", function(){
			$("#"+ subPageMap[nav].id).removeClass("none");
			$(this).addClass("active");
			Object.keys(subPageMap).forEach(function(dd, k){
				if(dd !== nav){
					$("#" + subPageMap[dd].id).removeClass("none").addClass("none");
					$("#" + dd).removeClass("active");
				}
			})

		})
	})(d)
});

/**
 * 语言切换
 */
$.i18n({
	locale: 'en'
})
$.i18n().load({
	en: en_text,
	zh: ch_text
})

function changeLang(){
	var allTexts = Object.keys(en_text);
	allTexts.forEach(function(dom){
		if($("#"+dom).length > 0){
			$("#"+dom).i18n();
		}
	});
}

changeLang();

/**
 * 引入子页面的js文件
 */
var codeCountPage = require('./subpage/codeCount.js')(resData.countCode);
require('./subpage/codeOpt.js')(resData.goIssue);
var codeSmellPage = require('./subpage/codeSmell.js')(resData.codeSmell);
require('./subpage/codeStyle.js')(resData.codeStyle);
var summaryPage = require('./subpage/summary.js')(resData);
var unitTestPage = require('./subpage/unitTest.js')(resData.gotest);

/**
 * 监听语言切换按钮
 */
$("#changeLang").on("click", function(){
	var lang = $.i18n().locale;
	if(lang == "zh"){
		$(this).text("中文");
		$.i18n().locale = "en";
	}else if(lang == "en"){
		$(this).text("ENGLISH");
		$.i18n().locale = "zh";
	}
	changeLang();
	redrawAllCharts();
})

/**
 * redraw all highcharts after changing language
 */

function redrawAllCharts(){
	summaryPage.updateHighcharts();
	unitTestPage.updateHighcharts();
	codeCountPage.updateHighcharts();
	codeSmellPage.updateHighcharts();
}




