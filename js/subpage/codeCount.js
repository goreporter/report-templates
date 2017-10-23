/*************************************code count************************************************/
module.exports = function codeCount(codeCount){
	$("#line_count").text(codeCount.summary.line_count);
	$("#comment_count").text(codeCount.summary.comment_count);
	$("#function_count").text(codeCount.summary.function_count);
	$("#file_count").text(codeCount.summary.file_count);
	/**
	 * package coverage rate 
	 */
	$("#lineCountChart").highcharts({
		chart: {
			type: 'bar',
			height: codeCount.content.pkg.length * 20 + 120
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
	        	stacking: 'percentage',
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
                pointPadding: 0,
                groupPadding: 0
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
	        name: null,
	        color: '#d9e4eb',
	        stack: 'code_count',
	        data: codeCount.content.pkg_line_count.map(function(d, i, arr){return Math.max.apply(Math, arr) - d}),
	        dataLabels: {
	        	enabled: false
	        },
	        linkedTo: 'code_count',
	        enableMouseTracking:false
	    },{
	    	id: 'code_count',
	        name: $.i18n('cc_pkg_code_legend'),
	        data: codeCount.content.pkg_line_count,
	        color: '#47bac1',
	        stack: 'code_count'
	    }]
	});
	$("#commentCountChart").highcharts({
		chart: {
			type: 'bar',
			height: codeCount.content.pkg.length * 20 + 120
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
	        	stacking: 'percentage',
	            dataLabels: {
	                enabled: true,
	                color: "#596679",
	                fontSize: "10px",
	                pointPadding: 0,
	                groupPadding: 0.1,
	                align: 'right',
	                x: 40

	            }
	        },
	        series: {
	                pointWidth: 12
	              
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
	        name: null,
	        color: '#d9e4eb',
	        stack: 'comment_count',
	        data: codeCount.content.pkg_comment_count.map(function(d, i, arr){return Math.max.apply(Math, arr) - d}),
	        dataLabels: {
	        	enabled: false
	        },
	        linkedTo: 'comment_count',
	        enableMouseTracking:false
	    },{
	    	id: 'comment_count',
	        name: $.i18n('cc_pkg_comment_legend'),
	        data: codeCount.content.pkg_comment_count,
	        color: '#4d73c4',
	        stack: 'comment_count'
	    }]
	});
	$("#funcCountChart").highcharts({
		chart: {
			type: 'bar',
			height: codeCount.content.pkg.length * 20 + 120
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
					fontSize: '12px'
				}
			}
		},
		yAxis: {
	        title: {
	            text: ''
	        },
	        labels: {
	            overflow: 'justify'
	        },
	        gridLineColor: '',
	        gridLineWidth: 0,
	        labels: {
	        	enabled: false
	        }
		},
	    plotOptions: {
	        column: {
	            dataLabels: {
	                enabled: true,
	                color: "#596679",
	                fontSize: "10px",
	                align: 'right',
	                x: 40
	            }
	        },
	        series: {
	                pointWidth: 12
	              
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
	        name: $.i18n('cc_pkg_func_legend'),
	        data: codeCount.content.pkg_function_count,
	        color: '#0382be'
	    }]
	});
	$("#fileCountChart").highcharts({
		chart: {
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
	                pointWidth: 12
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
}