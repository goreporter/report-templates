	//data
		var resData = {
				"score": 37,
				"project": "../apollo",    //路径请遵循这种写法： ../ + 项目名字
				"issueNum": 52,
				"fileNum": 37,
				"quality": 'A+',
				"issueQuality": 'A+',
				"smellQuality": 'A-',
				"gotest":{
					"codeCover": '75',     //unit: percentage
					"pkgCover":  '80',      //unit: percentage
					"res": [{
						path: "../apollo/gocode",      //path项可以直接去掉跟路径，也可以加上根路径。此项可以写成: /gocode,也可以写成：../apollo/gocode.但不要写成 “/apollo/gocode”
						result: 1,
						time: 0.04,
						cover: 49.4
					},{
						path: "../apollo/gocode/dupl/output",
						result: 1,
						time: 0.009,
						cover: 23.4
					},{
						path: "../apollo/gotest",
						result: 1,
						time: 0.505,
						cover: 65.2
					},{
						path: "../apollo/gocode/copycode/output",
						result: 1,
						time: 0.008,
						cover: 22.0
					},{
						path: "../apollo/gocode/dupl/suffixtree",
						result: 1,
						time: 0.09,
						cover: 90.6
					},{
						path: "../apollo/gosimple/gotool",
						result: 1,
						time: 0.090,
						cover: 45.7
					},{
						path: "../apollo/gocode/dupl/syntax",
						result: 1,
						time: 0.008,
						cover: 55.8
					},{
						path: "../apollo/gocyclo",
						result: 1,
						time: 0.010,
						cover: 66.7
					},{
						path: "../apollo/godep",
						result: 1,
						time: 0.101,
						cover: 70.4
					},{
						path: "../apollo/gosimple/lint",
						result: 1,
						time: 0.013,
						cover: 6.2
					},{
						path: "../apollo/gocode/deadcode",
						result:0,
						time: 0,
						cover: 0
					},{
						path: "../apollo/gosimple/simple",
						result: 0,
						time: 0,
						cover: 0
					}],
					summary: 53,
					noTest: ["../apollo/gocheck", "../apollo/gocheck/structcheck", "../apollo/gocheck/structcheck"]
				},
				// gosimple: [
				// 			{
				// 				path: "/Users/wangguoliang/Documents/skylar_server_tools_code/gowork/dataforce/src/360.cn/apollo/apollo/gocode/copycode/copycode.go:84:5",
				// 				info: "should replace this if statement with an unconditional strings.TrimPrefix"
				// 			},{
				// 				path: "/Users/wangguoliang/Documents/skylar_server_tools_code/gowork/dataforce/src/360.cn/apollo/apollo/gocode/copycode/copycode.go:110:8:",
				// 				info: "should use strings.Contains(path, expect) instead"
				// 			},{
				// 				path: "/Users/wangguoliang/Documents/skylar_server_tools_code/gowork/dataforce/src/360.cn/apollo/apollo/utils.go:118:2",
				// 				info: "should replace loop with notest = append(notest, diff...)"
				// 			}
				// ],
				//gosimpleLevel: 2,
				// deadcode: [
				// 	{
				// 		path: "../apollo/main.go:18:1",
				// 		info: "help is unused"
				// 	},{
				// 		path: "../apollo/utils.go:35:1",
				// 		info: "CycloSummary is unused"
				// 	}
				// ],
				// copycode: [
				// 	{
				// 		files: "4 files clone",
				// 		infos: ["/gocode/copycode/syntax/golang/golang.go:221,229","/gocode/copycode/syntax/golang/golang.go:255,263"]
				// 	},{
				// 		files: "2 files clone",
				// 		infos: ["../apollo/gocode/copycode/copycode.go:77,94", "../apollo/gocode/dupl/copycode.go:77,94"]
				// 	}
				// ],
				//首页右侧，包圈复杂度
				gocyclo :[
					{
						pkg: "../apollo/gotest",
						size: 12,
						res: []
					},{
						pkg: "../apollo/gocode/deadcode",
						size: 12,
						res: [{
							comp: 17,
							info: "deadcode doPackage ../apollo/gocode/deadcode/deadcode.go:53:1"
						}]
					},{
						pkg: "../apollo/gosimple/gotool",
						size: 12,
						res: [
								{
									comp: 22,
									info: "gotool (*Context).matchPackages ../apollo/gosimple/gotool/match.go:61:1"
								}
						]
					},{
						pkg: "../apollo/gocode/dupl/job",
						size: 12,
						res:[]
					},{
						pkg: "../apollo/godep",
						size: 12,
						res:[
								{
									comp: 23,
									info: "godep Dep ../apollo/godep/godep.go:41:1"
								}
						]
					},{
						pkg: "../apollo/gocode/dupl/output",
						size: 12,
						res:[]
					},{
						pkg: "../apollo/gocode/copycode",
						size: 12,
						res:[
								{
									comp: 90,
									info: "golang (*transformer).trans ../apollo/gocode/copycode/syntax/golang/golang.go:83:1"
								}
						]
					},{
						pkg: "../apollo/gosimple/lint/lintutil",
						size: 12,
						res:[]
					},{
						pkg: "../apollo/gocode/dupl/suffixtree",
						size: 12,
						res: []
					},{
						pkg: "../apollo/gocheck",
						size: 12,
						res: [
								{
									comp: 16,
									info: "structcheck StructCheck ../apollo/gocheck/structcheck/structcheck.go:148:1"
								},{
									comp: 15,
									info: "aligncheck AlignCheck ../apollo/gocheck/aligncheck/aligncheck.go:33:1"
								}
						]
					},{
						pkg: "../apollo/gocode/copycode/job",
						size: 12,
						res:[]
					},{
						pkg: "../apollo/gosimple/simple",
						size: 12,
						res:[
								{
									comp: 60,
									info: "simple LintTrim ../apollo/gosimple/simple/lint.go:1061:1"
								},{
									comp: 47,
									info: "pkg fn ../apollo/gosimple/simple/testdata/nil-len.go:3:1"
								},{
									comp: 41,
									info: "simple LintRedundantNilCheckWithLen ../apollo/gosimple/simple/lint.go:451:1"
								},{
									comp: 34,
									info: "simple LintSimplerReturn ../apollo/gosimple/simple/lint.go:722:1"
								},{
									comp: 31,
									info: "simple LintFormatInt ../apollo/gosimple/simple/lint.go:867:1"
								},{
									comp: 25,
									info: "pkg fn ../apollo/gosimple/simple/testdata/trim.go:13:1"
								},{
									comp: 25,
									info: "simple LintSimplerStructConversion ../apollo/gosimple/simple/lint.go:964:1"
								},{
									comp: 24,
									info: "simple LintLoopCopy ../apollo/gosimple/simple/lint.go:77:1"
								},{
									comp: 21,
									info: "simple LintLoopAppend ../apollo/gosimple/simple/lint.go:624:1"
								},{
									comp: 18,
									info: "simple LintIfReturn ../apollo/gosimple/simple/lint.go:378:1"
								},{
									comp: 17,
									info: "simple LintStringsContains ../apollo/gosimple/simple/lint.go:185:1"
								},{
									comp: 16,
									info: "simple LintRegexpRaw ../apollo/gosimple/simple/lint.go:321:1"
								}
						]
					},{
						pkg: "../apollo/gosimple/lint/testutil",
						size: 12,
						res:[{
							comp: 18,
							info: "testutil TestAll ../apollo/gosimple/lint/testutil/util.go:27:1"
						}]
					},{
						pkg: "../apollo/gocode/dupl/syntax/golang",
						size: 12,
						res:[{
							comp: 90,
							info: "golang (*transformer).trans ../apollo/gocode/dupl/syntax/golang/golang.go:83:1"
						}]
					},{
						pkg: "../apollo/gocode/dupl/syntax",
						size: 12,
						res:[{
							comp: 90,
							info: "golang (*transformer).trans ../apollo/gocode/dupl/syntax/golang/golang.go:83:1"
						}]
					},{
						pkg: "../apollo/gocheck/structcheck",
						size: 12,
						res:[{
							comp: 16,
							info: "structcheck StructCheck ../apollo/gocheck/structcheck/structcheck.go:148:1"
						}]
					},{
						pkg: "../apollo/gocode/copycode/suffixtree",
						size: 12,
						res:[]
					},{
						pkg: "../apollo/gocode",
						size: 12,
						res:[{
							comp: 90,
							info: "golang (*transformer).trans ../apollo/gocode/copycode/syntax/golang/golang.go:83:1"
						},{
							comp: 90,
							info: "golang (*transformer).trans ../apollo/gocode/dupl/syntax/golang/golang.go:83:1"
						}]
					},{
						pkg: "../apollo/gocheck/varcheck",
						size: 12,
						res:[]
					},{
						pkg: "../apollo/gocode/copycode/syntax",
						size: 12,
						res:[{
							comp: 90,
							info: "golang (*transformer).trans ../apollo/gocode/copycode/syntax/golang/golang.go:83:1"
						}]
					},{
						pkg: "../apollo/gosimple/simple/testdata",
						size: 12,
						res:[{
							comp: 47,
							info: "pkg fn ../apollo/gosimple/simple/testdata/nil-len.go:3:1"
						},{
							comp: 25,
							info: "pkg fn ../apollo/gosimple/simple/testdata/trim.go:13:1"
						}]
					},{
						pkg: "../apollo/gosimple",
						size: 12,
						res: [{
							comp: 15,
							info: "xxxxx"
						}]
					},{
						pkg: "../apollo",
						size: 12,
						res: [{
							comp: 15,
							info: "xxxxx"
						}]
					},{
						pkg: "../apollo/gocheck/aligncheck",
						size: 12,
						res: [{
							comp: 15,
							info: "xxxxx"
						}]
					},{
						pkg: "../apollo/gocode/dupl",
						size: 12,
						res: [{
							comp: 15,
							info: "xxxxx"
						}]
					},{
						pkg: "../apollo/gocyclo",
						size: 12,
						res: [{
							comp: 15,
							info: "xxxxx"
						}]
					},{
						pkg: "../apollo/gosimple/lint",
						size: 12,
						res: [{
							comp: 15,
							info: "xxxxx"
						}]
					},{
						pkg: "../apollo/gocode/copycode/output",
						size: 12,
						res: [{
							comp: 15,
							info: "xxxxx"
						}]
					},{
						pkg: "../apollo/gocode/copycode/syntax/golang",
						size: 12,
						res: [{
							comp: 15,
							info: "xxxxx"
						}]
					}
				],
				//首页右侧，包代码量占比  
				countCode: [
					{
						package: 'gocode',
						codeNum: 100,
						commentNum: 10
					},{
						package: 'copycode/',
						codeNum: 342,
						commentNum: 52
					},{
						package: 'gosimple/',
						codeNum: 220,
						commentNum: 10
					},{
						package: 'gocheck/',
						codeNum: 520,
						commentNum: 10
					}
				],
				//代码风格
				codStyle: {
					gofmt: {
						label: 'Gofmt formats Go programs. We run gofmt -s on your code, where -s is for the "simplify" command',
						score: '100%',
						detail: []
					},
					go_vet: {
						label: 'go vet examines Go source code and reports suspicious constructs, such as Printf calls whose arguments do not align with the format string.',
						score: '100%',
						detail: []
					},
					golint: {
						label: 'Golint is a linter for Go source code.',
						score: '80%',
						detail: [
									{
										rep: 'Sia/compatibility/siag_1.0_test.go',
										content: [ "Line 18: warning: don't use underscores in Go names; type KeyPairSiag_1_0 should be KeyPairSiag1_0 (golint)",
												 "Line 28: warning: don't use underscores in Go names; func verifyKeysSiag_1_0 should be verifyKeysSiag1_0 (golint)"
										]
									},{
										rep: 'Sia/types/target.go',
										content: ["Line 24: warning: exported var ErrNegativeTarget should have comment or be unexported (golint)","Line 46: warning: receiver name t should be consistent with previous receiver name x for Target (golint)"]
									}
						]
					},
					misspell: {
						label: 'Misspell Finds commonly misspelled English words',
						score: '96%',
						detail: [
									{
										rep: 'Sia/siac/walletcmd.go',
										content: [ 'Line 213: warning: "sucessfully" is a misspelling of "successfully" (misspell)'
										]
									},{
										rep: 'Sia/modules/transactionpool/update.go',
										content: ['Line 187: warning: "extermely" is a misspelling of "extremely" (misspell)'
												]
									},{
										rep: 'Sia/api/ecosystem_helpers_test.go',
										content: ['Line 47, warning: "inital" is a misspelling of "initial" (misspell)'
												]
									} 
						]
					}
				},
				//代码优化
				goIssue: {
					summary: {
						issueNum: 85,
						fileNum: 15,
						quality: 'A+'
					},
					content:{
						deadCode: {
							label: 'deadCode description',
							score: '85%',
							detail: [
										{
											rep: 'Sia/compatibility/siag_1.0_test.go',
											content: [ "/gocode/copycode/syntax/golang/golang.go:221,229",
													 "/gocode/copycode/syntax/golang/golang.go:255,263"
											]
										},{
											rep: 'Sia/types/target.go',
											content: ["/gocode/copycode/copycode.go:77,94",
													  "/gocode/dupl/copycode.go:77,94"]
										}
								]
						},
						copyCode: {
							label: 'copy code description',
							score: '85%',
							detail: [["/gocode/copycode/copycode.go:77,94",'/gocode/copycode/copycode.go:77,94'],
							         ['/gocode/copycode/copycode.go:77,94','/gocode/copycode/copycode.go:77,94']
									]
						},
						simpleCode: {
							label: 'simplecode description',
							score: '85%',
							detail: [
										{
											rep: 'Sia/compatibility/siag_1.0_test.go',
											content: [ "/gocode/copycode/syntax/golang/golang.go:221,229",
													 "/gocode/copycode/syntax/golang/golang.go:255,263"
											]
										},{
											rep: 'Sia/types/target.go',
											content: ["/gocode/copycode/copycode.go:77,94",
													  "/gocode/dupl/copycode.go:77,94"]
										}
									]
						},
						staticCode: {
							label: 'static code description',
							score: '85%',
							detail: [
										{
											rep: 'Sia/compatibility/siag_1.0_test.go',
											content: [ "/gocode/copycode/syntax/golang/golang.go:221,229",
													 "/gocode/copycode/syntax/golang/golang.go:255,263"
											]
										},{
											rep: 'Sia/types/target.go',
											content: ["/gocode/copycode/copycode.go:77,94",
													  "/gocode/dupl/copycode.go:77,94"]
										}
									]
						}
					}
				}    
			}