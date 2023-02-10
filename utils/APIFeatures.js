class APIFeatures {
    constructor(query, queryString) {
        this.query = query
        this.queryString = queryString
    }

    filter() {
        const queryObj = { ...this.queryString }
        const excludedFields = ["page", "sort", "limit", "fields"]
        excludedFields.forEach(el => delete queryObj[el])

        // filter
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`) //price[gt]=5
        this.query.find(JSON.parse(queryStr))
        return this
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(" ")
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }
        return this
    }

    select() {
        if (this.queryString.fields) {
            const fieldsList = this.queryString.fields.split(',').join(" ")
            this.query = this.query.select(fieldsList);
        } else {
            this.query = this.query.select('-__v'); // thêm option select vào model sẽ có thể tùy chọn hiện/ẩn trường dữ liệu đó khi query to client
        }
        return this
    }

    pagination() {
        const page = Number(this.queryString.page) || 1
        const limit = Number(this.queryString.limit) || 10
        const skip = (page - 1) * limit
        this.query.skip(skip).limit(limit)
        return this
    }
}

module.exports = APIFeatures