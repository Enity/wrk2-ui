<template>
    <div class="benchList">
        <div class='addBtn'></div>
        <div class='list'>
            <Bench v-for='l of list'
                :key='l.id'
                :target='l.target'
                :finished='l.finished'
                :progress='l.progress'
            />
        </div>
    </div>
</template>

<script>
import Bench from './Bench';
export default {
    props: {
        list: Array
    },
    components: { Bench }
};
</script>

<style scoped>
.addBtn {
    width: 100%;
    height: 25px;
    position: relative;
    border-radius: 4px;
    cursor: pointer;
    opacity: 0.7;
    transition: .15s ease-out;
    background-image: linear-gradient(to right, #a5a5a5 50%, transparent 50%), linear-gradient(to right, #a5a5a5 50%, transparent 50%), linear-gradient(to bottom, #a5a5a5 50%, transparent 50%), linear-gradient(to bottom, #a5a5a5 50%, transparent 50%);
    background-position: left top, left bottom, left top, right top;
    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
    background-size: 15px 1px, 15px 1px, 1px 15px, 1px 15px;
}

.addBtn::before, .addBtn::after {
    content: '';
    position: absolute;
    width: 14px;
    top: 50%;
    left: 50%;
    margin-left: -7px;
    height: 1px;
    background-color: #a5a5a5;
}

.addBtn::before {
    transform: rotate(90deg);
}

.addBtn:hover {
    opacity: .85;
}

.addBtn:active {
    opacity: 1;
}

.list {
    margin-top: 10px;
}

.list > div:not(:first-child) {
    margin-top: 8px;
}
</style>
