export class PageInfo{

    // 页码
    pageIndex = 1;

    // 每页条数
    pageSize = 10;

    // 总条数
    total = 1;
    
    /**
     * 跳过总数
     */
    get skipCount(){
        return (this.pageIndex - 1) * this.pageSize;
    }

    /**
     * 最大返回总数
     */
    get maxResultCount(){
        return this.pageSize;
    }

}