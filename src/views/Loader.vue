<template>
    <div class="vld-parent">
        <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :is-full-page="fullPage"
        :color="color_value"
        :background-color="bg_value"
        ></loading>
    </div>
</template>
 
<script>
    // Import component
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';
    import global from '../components/globalcomponent'
    export default {
        data() {
            return {
                isLoading: global.is_loading,
                fullPage: true,
                color_value:"red",
                bg_value:'blue'
            }
        },
        components: {
            Loading
        },
    }
</script> 