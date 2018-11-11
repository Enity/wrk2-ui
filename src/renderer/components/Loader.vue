<template>
    <svg :style='style' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <rect y="30" height="40" :fill='color' x="15" width="10">
            <animate attributeName="opacity" calcMode="spline" values="1;0.2;1" keyTimes="0;0.5;1" dur="1" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.6s" repeatCount="indefinite"/>
        </rect>
        <rect y="30" height="40" :fill='color' x="35" width="10">
            <animate attributeName="opacity" calcMode="spline" values="1;0.2;1" keyTimes="0;0.5;1" dur="1" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.4s" repeatCount="indefinite"/>
        </rect>
        <rect y="30" height="40" :fill='color' x="55" width="10">
            <animate attributeName="opacity" calcMode="spline" values="1;0.2;1" keyTimes="0;0.5;1" dur="1" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="-0.2s" repeatCount="indefinite"/>
        </rect>
        <rect y="30" height="40" :fill='color' x="75" width="10">
            <animate attributeName="opacity" calcMode="spline" values="1;0.2;1" keyTimes="0;0.5;1" dur="1" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" begin="0s" repeatCount="indefinite"/>
            </rect>
    </svg>
</template>

<script>
export default {
    props: {
        size: {
            type: String,
            default: 'small'
        }
    },
    computed: {
        color() {
            return '#c8c8c8';
        },
        style() {
            let size;
            switch (this.size) {
            case 'small':
                size = '50px';
                break;
            case 'medium':
                size = '80px';
                break;
            default:
                size = '50px';
                break;
            }
            return {
                width: size,
                height: size
            };
        }
    }
};
</script>

<style>
</style>
