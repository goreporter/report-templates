$(document).ready(function(){

	$("#line_count").text(resData.countCode.summary.line_count);
	$("#comment_count").text(resData.countCode.summary.comment_count);
	$("#function_count").text(resData.countCode.summary.function_count);
	$("#file_count").text(resData.countCode.summary.file_count);
	/**
	 * package coverage rate 
	 */
	$("#lineCountChart").highcharts({
					chart: {
						type: 'column',
				        alignTicks: false,
				        backgroundColor: '#ecf2f6'
					},
					title: {
						text: ''
					},
					xAxis: {
						categories: resData.countCode.content.pkg,
						title:{
							text: null
						},
						tickLength: 3,
						labels: {
							style: {
								color: "#596679",
								fontSize: '12px'
							}
						}
					},
					yAxis: {
						min: 0,
						ceiling: 100,
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
				                pointPadding: 0.2,
				                groupPadding: 0.1,

				            }
				        },
				        series: {
				                pointWidth: 12,
				                borderRadius: 3,
				              
				        }
				    },
				    credits: {
				        enabled: false
				    },
				    legend: {
				    	align: 'center',
				    	itemDistance: 15,
				    	itemStyle: {
				    		color: "#596679"
				    	}
				    },
				    series: [{
				        name: '包代码行详情',
				        data: resData.countCode.content.pkg_line_count,
				        color: '#47bac1'
				    }]
				});
	$("#commentCountChart").highcharts({
					chart: {
						type: 'column',
				        alignTicks: false,
				        backgroundColor: '#ecf2f6'
					},
					title: {
						text: ''
					},
					xAxis: {
						categories: resData.countCode.content.pkg,
						title:{
							text: null
						},
						tickLength: 3,
						labels: {
							style: {
								color: "#596679",
								fontSize: '12px'
							}
						}
					},
					yAxis: {
						min: 0,
						ceiling: 100,
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
				                pointPadding: 0.2,
				                groupPadding: 0.1,

				            }
				        },
				        series: {
				                pointWidth: 12,
				                borderRadius: 3,
				              
				        }
				    },
				    credits: {
				        enabled: false
				    },
				    legend: {
				    	align: 'center',
				    	itemDistance: 15,
				    	itemStyle: {
				    		color: "#596679"
				    	}
				    },
				    series: [{
				        name: '注释行详情',
				        data: resData.countCode.content.pkg_comment_count,
				        color: '#47bac1'
				    }]
				});
	$("#funcCountChart").highcharts({
					chart: {
						type: 'column',
				        alignTicks: false,
				        backgroundColor: '#ecf2f6'
					},
					title: {
						text: ''
					},
					xAxis: {
						categories: resData.countCode.content.pkg,
						title:{
							text: null
						},
						tickLength: 3,
						labels: {
							style: {
								color: "#596679",
								fontSize: '12px'
							}
						}
					},
					yAxis: {
						min: 0,
						ceiling: 100,
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
				                pointPadding: 0.2,
				                groupPadding: 0.1,

				            }
				        },
				        series: {
				                pointWidth: 12,
				                borderRadius: 3,
				              
				        }
				    },
				    credits: {
				        enabled: false
				    },
				    legend: {
				    	align: 'center',
				    	itemDistance: 15,
				    	itemStyle: {
				    		color: "#596679"
				    	}
				    },
				    series: [{
				        name: '函数行详情',
				        data: resData.countCode.content.pkg_function_count,
				        color: '#47bac1'
				    }]
				});
			$("#fileCountChart").highcharts({
					chart: {
						type: 'column',
				        alignTicks: false,
				        backgroundColor: '#ecf2f6'
					},
					title: {
						text: ''
					},
					xAxis: {
						categories: resData.countCode.content.file,
						title:{
							text: null
						},
						tickLength: 3,
						labels: {
							style: {
								color: "#596679",
								fontSize: '12px'
							}
						}
					},
					yAxis: {
						min: 0,
						ceiling: 100,
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
				                pointPadding: 0.2,
				                groupPadding: 0.1,

				            }
				        },
				        series: {
				                pointWidth: 12,
				                borderRadius: 3,
				              
				        }
				    },
				    credits: {
				        enabled: false
				    },
				    legend: {
				    	align: 'center',
				    	itemDistance: 15,
				    	itemStyle: {
				    		color: "#596679"
				    	}
				    },
				    series: [{
				        name: '代码行详情',
				        data: resData.countCode.content.file_line_count,
				        color: '#47bac1'
				    },{
				        name: '注释行详情',
				        data: resData.countCode.content.file_comment_count,
				        color: '#BB8FCE'
				    },{
				        name: '函数行详情',
				        data: resData.countCode.content.file_function_count,
				        color: '#2aafff'
				    }]
				});

})