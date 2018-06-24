export class PageInfo{

    pageIndex = 1;
    pageSize = 10;
    total = 1;
    
    /*
    const skipCount = (this.pageIndex - 1) * this.pageSize;
    const maxResultCount = this.pageSize;
    */

    get skipCount(){
        return (this.pageIndex - 1) * this.pageSize;
    }

    get maxResultCount(){
        return this.pageSize;
    }

}