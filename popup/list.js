window.addEventListener("load", bookmarkCurrent);
var parentFolderId = "fbjbd";

function onCreated(node) {
	console.log(node);
	parentFolderId = node.id;
	saveBookmarksInSession();
}

function saveBookmarksInSession(){
	var tabTitle = [];
	var tabUrls = [];

	browser.windows.getAll({ populate: true }, function(windowList) {
		for (var i = 0; i < windowList.length; i++) {
			for (var j = 0; j < windowList[i].tabs.length; j++) {
				tabUrls[tabUrls.length] = windowList[i].tabs[j].url;
				tabTitle[tabTitle.length] = windowList[i].tabs[j].title;
				// tabs[windowList[i].tabs[j].id] = windowList[i].tabs[j];
			}
		}
		// updateStatus(tabTitle);

		console.log(parentFolderId);

		for(i = 0; i < tabUrls.length - 1; i++){
			browser.bookmarks.create({
				title: tabTitle[i],
				url: tabUrls[i],
				parentId: parentFolderId
			});
		}
	});
}

function saveSession(){
	// var tabFolder = new Object();

	// updateStatus("hai");

	var parentFolder = browser.bookmarks.create({
		title: document.getElementById("bookmarkCurrentTxt").value
	});

	parentFolder.then(onCreated);

	// bookmarkCurrentBtn.removeEventListener("click", saveSession);
	// bookmarkCurrentBtn.addEventListener("click", saveBookmarksInSession);
 
	// bookmarkCurrentBtn.value = "Save \nsession"
}


function bookmarkCurrent(){
	console.log("bookmarkCurrent");
	
	bookmarkCurrentBtn = document.getElementById("bookmarkCurrentBtn");
	bookmarkCurrentBtn.removeEventListener("click", bookmarkCurrent);
	bookmarkCurrentBtn.addEventListener("click", saveSession);
	// bookmarkCurrentBtn.disabled = true;
	bookmarkCurrentBtn.style.height = "80%";
	bookmarkCurrentBtn.value = "Create \nfolder"

	var bookmarkCurrentTxt = document.createElement("input");
	bookmarkCurrentTxt.id = "bookmarkCurrentTxt";
	bookmarkCurrentTxt.type = "text";
	bookmarkCurrentTxt.placeholder = "Folder name";
	document.getElementById("bookmarkCurrentDiv").appendChild(bookmarkCurrentTxt);
}
