$(document).ready(function(){
	$("#qualityRank").text(resData.quality);

	//底部图表
	var data = resData.codStyle,
	key = Object.keys(data),
	issueNum = 0,
	fileNum = 0,
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
	//顶部summary
	$("#issueNum").text(issueNum);
	$("#fileNum").text(fileNum);
	//底部内容
	$("#subNav").append(indexHtml);
	$("#content").append(contentHtml);

})