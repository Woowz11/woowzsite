const Site = {
      href: "test_site",
      name: "TestNullSite Name",
      catalog: "TestNullSite Catalog",
      hide: false,
      tags: [
        "TestNullSite"
      ]
}

const new_html = "";
function AddSite(site,new_html,saved_category)
{
	if(saved_category!=site.catalog){
			new_html = new_html + "<hr><font>["+site.catalog+"]</font><hr><br><br>";
			saved_category = site.catalog;
	}
	return [new_html + '<a href="' + site.href + '.html">' + site.name + '</a><br><br><font>' + String(site.tags).replace(",",", ") + '</font><br><br>',saved_category];
}

function lodlist(show_hide) {
	var Sites = all_sites;
	var saved_category = "";
	var new_html = "";
	
	Sites.sort(function(a, b)
	{
		if (a.catalog < b.catalog) {
			return -1;
		}
		if (a.catalog > b.catalog) {
			return 1;
		}
		return 0;
	});
	
	Sites.forEach(function(site,i,arr){
		if((!site.hide) || show_hide){
		var result = AddSite(site,new_html,saved_category);
		new_html = result[0];
		saved_category = result[1];
		}
	});
	document.getElementById("list").innerHTML = new_html;
}   
