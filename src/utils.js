
module.exports = {
    /**
     * Get the error from a response.
     *
     * @param {Response} response The Vue-resource Response that we will try to get errors from.
     */
    getError(response) {
        return response.body['meta']
            ? response.body.meta
            : response.statusText
    }
}