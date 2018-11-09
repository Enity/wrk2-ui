<template>
    <div class="benchQuery">
        <router-link to='/'>
            <div class='addBtn'></div>
        </router-link>
        <transition-group
            name="list-transition" 
            class='list'
            tag="div"
        >
            <Bench v-for='l of list'
                :id='l.id'
                :key='l.id'
                :data='l.data'
                :state='l.state'
                @click='$emit("selected", $event)'
            />
        </transition-group>
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

<style scoped lang='scss'>
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
    &:before, &:after {
        content: '';
        position: absolute;
        width: 14px;
        top: 50%;
        left: 50%;
        margin-left: -7px;
        height: 1px;
        background-color: #a5a5a5;
    }
    &:before {
        transform: rotate(90deg);
    }
    &:hover {
        opacity: .85;
    }
    &:active {
        opacity: 1;
    }
}

.list {
    margin-top: 10px;
    > div {
        transition: .3s ease-out;
    }
    > div:not(:first-child) {
        margin-top: 10px;
    }
    
}

.list-transition-enter, .list-transition-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}

.list-transition-leave-active {
    position: absolute;
}

</style>
