const PortfolioData = {
    Categories: []
};

function AddCategories(Categories, Target = PortfolioData.Categories){
    Categories.forEach(Item => {
        if(typeof Item === "string"){
            Target.push({
               ID: Item,
               Type: 1
            });
        }else if(Array.isArray(Item)){
            const Folder = {
                ID: Item[0],
                Type: 0,
                Children: []
            };
            AddCategories(Item[1], Folder.Children)
            Target.push(Folder);
        }
    });
}

function AddProject(){
    
}

// ----------------------------------------------------------------------

AddCategories([
    "start",
    
    "projects",
    
    ["skills", [
        "languages",
        "gamedev",
        "tools",
        "libs"
    ]],
    
    ["arts", [
        "art_video",
        "history"
    ]],
    
    ["experience", [
        "vehi"
    ]],
    
    ["environment", [
        "programs",
        "iron"
    ]],
    
    ["lichnoe", [
        "likes_dislikes",
        "my_code_style"
    ]]
]);