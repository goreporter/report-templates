$(document).ready(function(){
	var summary 		= resData.codeStyle.summary,
		data 			= resData.codeStyle.content;

		//顶部summary
	$("#issueNum").text(summary.issueNum);
	$("#fileNum").text(summary.fileNum);
	$("#qualityRank").text(summary.quality);

	//底部图表
	key = Object.keys(data),
	indexHtml = "",
	contentHtml = "";
	key.forEach(function(k){
		indexHtml += "<li><a href='#" + k + "'>" + k + "</a></li>";
		var content = "";
		data[k].detail.forEach(function(d){
			issueNum += d.content.length;
			content += "<h5>" + d.rep + "</h5>" + d.content.map(function(cc){return "<a>" + cc + "<br/></a>"}).join("");
		});
		fileNum += data[k].detail.length;
		contentHtml += "<section id=" + k + "><h4><span>" + k  + "</span><span>" + data[k].score + "</span></h4>" + "<div><p class='description'>" + data[k].label + "</p><div>" + content + "</div></div></section>"
	});

	//底部内容
	$("#subNav").append(indexHtml);
	$("#content").append(contentHtml);

})