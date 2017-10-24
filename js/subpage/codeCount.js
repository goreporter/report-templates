/*************************************code count************************************************/
module.exports = function codeCount(codeCount){
	$("#line_count").text(codeCount.summary.line_count);
	$("#comment_count").text(codeCount.summary.comment_count);
	$("#function_count").text(codeCount.summary.function_count);
	$("#file_count").text(codeCount.summary.file_count);
	/**
	 * package coverage rate 
	 */
	console.log(codeCount.content);
	var chart1 = new Highcharts.Chart({
		chart: {
			renderTo: 'lineCountChart',
			type: 'bar',
			height: codeCount.content.pkg.length * 60 + 120
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: codeCount.content.pkg,
			title:{
				text: null
			},
			tickLength: 0,
			lineWidth: 0,
			labels: {
				style: {
					color: "#596679",
					fontSize: '14px'
				}
			}
		},
		yAxis: {
	        title: {
	            text: ''
	        },
	        gridLineColor: '',
	        gridLineWidth: 0,
	        labels: {
	        	enabled: false
	        }
		},
	    plotOptions: {
	        bar: {
	            dataLabels: {
	                enabled: true,
	                color: "#596679",
	                fontSize: "10px",
	                align: 'right',
	                x: 40
	            }
	        },
	        series: {
                pointWidth: 12,
	            groupPadding: 0.15
	        }
	    },
	    credits: {
	        enabled: false
	    },
	    legend: {
	    	itemDistance: 15,
	    	margin: 30,
	    	itemStyle: {
	    		fontSize: '14px',
	    		color: "#596679"
	    	},
	    	symbolRadius: 0,
	    	verticalAlign: 'top',
	    	align: 'left'
	    },
	    series: [{
	        name: $.i18n('cc_pkg_code_legend'),
	        data: codeCount.content.pkg_line_count,
	        color: '#47bac1'
	    },{
	        name: $.i18n('cc_pkg_comment_legend'),
	        data: codeCount.content.pkg_comment_count,
	        color: '#4d73c4'
	    },{
	        name: $.i18n('cc_pkg_func_legend'),
	        data: codeCount.content.pkg_function_count,
	        color: '#0382be'
	    }]
	});
	var chart2 = new Highcharts.Chart({
		chart: {
			renderTo: 'fileCountChart',
			type: 'bar',
			height: codeCount.content.pkg.length * 60 + 120
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: codeCount.content.file,
			title:{
				text: null
			},
			tickLength: 0,
			lineWidth: 0,
			labels: {
				style: {
					color: "#596679",
					fontSize: '12px'
				}
			}
		},
		yAxis: {
	        title: {
	            text: ''
	        },
	        gridLineColor: '',
	        gridLineWidth: 0,
	        labels: {
	        	enabled: false
	        }
		},
	    plotOptions: {
	        bar: {
	            dataLabels: {
	                enabled: true,
	                color: "#596679",
	                fontSize: "10px",
	                pointPadding: 0.2,
	                groupPadding: 0.1,

	            }
	        },
	        series: {
	                pointWidth: 12,
	                groupPadding: 0.15
	        }
	    },
	    credits: {
	        enabled: false
	    },
	    legend: {
	    	itemDistance: 15,
	    	margin: 30,
	    	itemStyle: {
	    		fontSize: '14px',
	    		color: "#596679"
	    	},
	    	symbolRadius: 0,
	    	verticalAlign: 'top',
	    	align: 'left'
	    },
	    series: [{
	        name: $.i18n('cc_code_legend'),
	        data: codeCount.content.file_line_count,
	        color: '#47bac1'
	    },{
	        name: $.i18n('cc_comment_legend'),
	        data: codeCount.content.file_comment_count,
	        color: '#BB8FCE'
	    },{
	        name: $.i18n('cc_function_legend'),
	        data: codeCount.content.file_function_count,
	        color: '#2aafff'
	    }]
	});
	/**
	 * update Highcharts after changing language
	 */
	function updateHighcharts(){
		chart1.update({
						series:[{
					        name: $.i18n('cc_pkg_code_legend')
					    },{
					        name: $.i18n('cc_pkg_comment_legend')
					    },{
					        name: $.i18n('cc_pkg_func_legend')
					    }]
					});
		chart2.update({
			 series: [{
		        name: $.i18n('cc_code_legend')
		    },{
		        name: $.i18n('cc_comment_legend')
		    },{
		        name: $.i18n('cc_function_legend')
		    }]
		})
	}
	return {
		updateHighcharts: updateHighcharts
	}
}