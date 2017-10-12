/***************************codeStyle****************************/
module.exports = function(codeStyle){
	var summary 		= codeStyle.summary,
		data 			= codeStyle.content;

		//顶部summary
	$("#styleIssueNum").text(summary.issue_num);
	$("#styleFileNum").text(summary.file_num);
	$("#styleQualityRank").text(summary.quality);

	//底部图表
	key = Object.keys(data),
	indexHtml = "",
	contentHtml = "";
	key.forEach(function(k){
		indexHtml += "<li><a href='#" + k + "'>" + k + "</a></li>";
		var content = "";
		data[k].detail.forEach(function(d){
			content += "<h5>" + d.rep + "</h5>" + d.content.map(function(cc){return "<a>" + cc + "<br/></a>"}).join("");
		});
		contentHtml += "<section id=" + k + "><h4><span>" + k  + "</span><span class='emp-num'>" + data[k].score + "</span><span class='description'>" + data[k].label + "</span></h4><div>" + content + "</div></div></div></section>"
	});

	//底部内容
	$("#styleSubNav").append(indexHtml);
	$("#styleContent").append(contentHtml);
	//点击滚动
	$("#styleSubNav a").on('click', function(event){
		// var id = event.target.getAttribute("href");
		// var main = document.querySelector("#optSubNav a[href='" + id+ "']");
		// var scrollTop = document.querySelector(".flex-container").scrollTop;
		// console.log(scrollTop);
		// document.querySelector("#styleSubNav").style.top = scrollTop + 'px';

	})
}