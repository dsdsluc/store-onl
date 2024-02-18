module.exports = (pageCurrent,countItems)=>{
    let objectPagination = {
        currentPage : pageCurrent,
        limitItem : 4
    }
    if(isNaN(pageCurrent)){
        objectPagination.currentPage = 1
    }
    
    objectPagination.skip = (objectPagination.currentPage -1) * objectPagination.limitItem
    objectPagination.totalPage = Math.ceil(countItems/objectPagination.limitItem);
    return objectPagination
}