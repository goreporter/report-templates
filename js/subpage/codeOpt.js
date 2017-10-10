/********************************code opt*****************************************/
module.exports = function codeOpt(goIssue){
	var summary 		= goIssue.summary,
		data 			= goIssue.content,
		keys 			= Object.keys(data),
		indexHtml 		= "",
		contentHtml 	= "";
	//顶部summary
	$("#optIssueNum").text(goIssue.summary.issue_num);
	$("#optFileNum").text(goIssue.summary.file_num);
	$("#optQualityRank").text(goIssue.summary.quality);

	//底部图表
	keys.forEach(function(k){
		indexHtml += "<li><a href='#" + k + "'>" + k + "</a></li>";
		var content = "";
		data[k].detail.forEach(function(d){
			if(k != 'copy_code'){
				content += "<h5>" + d.rep + "</h5>" + d.content.map(function(cc){return "<a>" + cc + "<br/></a>"}).join("");
			}else{
				content += "<h5>" + d.length + "</h5>" + d.map(function(cc){return "<p>" + cc +"</p>"}).join("");
			}
		});
		contentHtml += "<section id=" + k + "><h4><span>" + k  + "</span><span class='emp-num'>" + data[k].score + "</span><span class='description'>" + data[k].label + "</span></h4><div>" + content + "</div></div></div></section>"
	});

	//底部内容
	$("#optSubNav").append(indexHtml);
	$("#optContent").append(contentHtml);
}