module.exports = mongoose => {
    let schema = mongoose.Schema(
        {
            name: String,
            description: String,
            published: Boolean
        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Academic = mongoose.model("academic", schema);
    return Academic;
}