export const getPaginateAggregations = (req) => [
    {
        $skip: +req.query.skip || 0
    },
    {
        $limit: +req.query.limit || 10
    }
];