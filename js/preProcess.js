//******************************* constants **********************************
	var MEDIUM_GOCYCLO_SCORE = 15,
		HIGH_GOCYCLO_SCORE = 50,
		PATH_PREFIX = 3,
		PROGRESS_BAR_LEN = 220,
		project = resData.project,
		pjLen = project.length;
//******************************* change to relative path **********************************
	changeToRelativePath(resData.gotest.res, "path");
	changeToRelativePath(resData.gotest.noTest);
	//changeToRelativePath(resData.gosimple, "path");
	//changeToRelativePath(resData.deadcode, "path");
	// for(var i=0 ;i<resData.copycode.length;i++){
	// 	changeToRelativePath(resData.copycode[i].infos);
	// }
	/**
	 * get relative path
	 * @param  {[Array]} array [array containing path infomation]
	 * @param  {[string]} key  [Optional. Key for path. Absence of this parameter means that elements in the first parameter array has a type of string representing 'path' instead of object]
	 */
	function changeToRelativePath(array, key){
		for(var i=0; i<array.length; i++){
			var path = key ? array[i][key] : array[i];
			if(path.indexOf(project) > -1){
				key ? array[i][key] = path.substring(path.indexOf(project) + pjLen) : array[i] =  path.substring(path.indexOf(project) + pjLen);
			}else if(path.indexOf(project.substring(PATH_PREFIX)) > -1){
				key ? array[i][key] = path.substring(path.indexOf(project.substring(PATH_PREFIX)) + pjLen - PATH_PREFIX) : array[i] =  path.substring(path.indexOf(project.substring(PATH_PREFIX)) + pjLen - PATH_PREFIX);
			}
		}
	}
