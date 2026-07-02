const LoadResources = async function(){
    console.group("Ресурсы")

    await LoadTextures()

    console.groupEnd()
}