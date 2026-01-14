class api {
    constructor(query,queryStr){
        this.query = query
        this.queryStr = queryStr
    }

    // <--------Search Products---------->
        search(){
            let keyword = this.queryStr.keyword ? {
                name :{
                    $regex:this.queryStr.keyword,
                    $options:"i"
                }
            } : {}

            this.query.find({...keyword})
            return this;
        }

        // <----------Filter Products----------->
        filter(){

        const queryStrCopy = { ...this.queryStr };

        const removeFields = ["keyword", "limit", "page"];
        removeFields.forEach(field => delete queryStrCopy[field]);

        let queryString = JSON.stringify(queryStrCopy);
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        this.query.find(JSON.parse(queryString));

        return this;
    }

    // <----------Pagination------------->

    pagination(resperpage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resperpage * currentPage -1;
        this.query.limit(resperpage).skip(skip);
        return this;
    }
}

export default api