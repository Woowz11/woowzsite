function serch() {
  var ser = document.getElementById("search").value.toLowerCase().replaceAll(" ","").replaceAll(".","").replaceAll(",","").replaceAll("-","");
 
  var result = "";
  
  var hrefs = [];
  var tags = [];
  var found = false;
  
  all_sites.forEach(function(site,i,arr){
	var tags_ = site.tags;
	  tags_.forEach(function(tag,i,arr){
		tags.push(tag);
		hrefs.push(site.href+".html");
	  });
  });
  
  for(var i = 0; i < tags.length-1; i++){
	  if(tags[i]==ser){
		  result = hrefs[i];
		  found = true;
	  }
  }
  
if(found){
window.open(result);}
}