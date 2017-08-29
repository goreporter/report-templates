$(document).ready(function(){	
	var summary 		= resData.goIssue.summary,
		data 			= resData.goIssue.content,
		keys 			= Object.keys(data),
		indexHtml 		= "",
		contentHtml 	= "";
	//顶部summary
	$("#issueNum").text(resData.goIssue.summary.issueNum);
	$("#fileNum").text(resData.goIssue.summary.fileNum);
	$("#qualityRank").text(resData.goIssue.summary.quality);

	//底部图表
	keys.forEach(function(k){
		indexHtml += "<li><a href='#" + k + "'>" + k + "</a></li>";
		var content = "";
		data[k].detail.forEach(function(d){
			if(k != 'copyCode'){
				content += "<h5>" + d.rep + "</h5>" + d.content.map(function(cc){return "<a>" + cc + "<br/></a>"}).join("");
			}else{
				content += "<h5>" + d.length + "</h5>" + d.map(function(cc){return "<p>" + cc +"</p>"}).join("");
			}
		});
		contentHtml += "<section id=" + k + "><h4><span>" + k  + "</span><span>" + data[k].score + "</span></h4>" + "<div><p class='description'>" + data[k].label + "</p><div>" + content + "</div></div></section>"
	});

	//底部内容
	$("#subNav").append(indexHtml);
	$("#content").append(contentHtml);

})