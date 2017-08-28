$(document).ready(function(){
	//顶部summary
	$("#issueNum").text(resData.issueNum);
	$("#fileNum").text(resData.fileNum);
	$("#qualityRank").text(resData.quality);

	//底部图表
	var data = resData.codStyle,
		key = Object.keys(data),
		indexHtml = "",
		contentHtml = "";
		key.forEach(function(k){
			indexHtml += "<li><a href='#" + k + "'>" + k + "</a></li>";
			var content = "";
			data[k].detail.forEach(function(d){
				content += "<h5>" + d.rep + "</h5>" + d.content.map(function(cc){return "<a>" + cc + "<br/></a>"}).join("");
			});
			contentHtml += "<section id=" + k + "><h4><span>" + k  + "</span><span>" + data[k].score + "</span></h4>" + "<div><p class='description'>" + data[k].label + "</p><div>" + content + "</div></div></section>"
		});
		$("#subNav").append(indexHtml);
		$("#content").append(contentHtml);
})