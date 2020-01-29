<template>
    <div>
        <p>Example of received data from API using Axios:</p>
        <pre>{{ received }}</pre>
        <!-- <LocalComponant1></LocalComponant1> -->
    </div>
</template>

<script>
// import LocalComponant1 from './localComponent1.vue';

export default {
    name: 'ApiConsumption',
    data: () => ({
        received: null,
    }),
    // components: {
    //     LocalComponant1,
    // }
    created: function () {
        this.$log.info('ApiConsumption.created');

        this.$api.get('/get')
        .then(response => {
            this.$log.info('ApiConsumption.created.then');
            this.$log.debug('ApiConsumption.created.then.response: ', response);
            this.received = response.data;
        })
        .catch(error => {
            this.$log.info('ApiConsumption.created.catch');
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                this.$log.debug('ApiConsumption.created.catch.error.response: ', error.response);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                this.$log.debug('ApiConsumption.created.catch.error.request: ', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                this.$log.debug('ApiConsumption.created.catch.error.message: ', error.message);
            }
        });
    }
}
</script>

<style lang="scss" scoped>
p {
    margin: 0;
}
</style>
