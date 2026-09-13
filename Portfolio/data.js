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

// ----------------------------------------------------------------------

AddCategories([
    "start",
    
    "projects",
    
    ["skills", "red", [
        "languages",
        "gamedev",
        "tools",
        "libs"
    ]],
    
    ["arts", "green", [
        "art_video",
        "history"
    ]],
    
    ["experience", "blue", [
        "vehi"
    ]],
    
    ["environment", "magenta", [
        "programs",
        "iron"
    ]],
    
    ["lichnoe", "white", [
        "likes_dislikes",
        "my_code_style"
    ]]
]);

// добавить элементы
// * cubemap,skybox - можно скриншоты смотреть в виде 3д шара и вращать