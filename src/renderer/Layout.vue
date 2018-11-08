<template>
    <div class='appContainer'>
        <div class='leftSide'>
            <slot name='page'></slot>
        </div>
        <div class='rightSide'>
            <slot name='aside'></slot>
        </div>
        <span 
            @click='goToRepo'
            class='poweredBy'
            title="Go to github"
        >
            POWERED BY WRK2
        </span>
    </div>
</template>

<script>
const { shell } = require('electron');

export default {
    methods: {
        goToRepo() {
            shell.openExternal('https://github.com/giltene/wrk2');
        }
    }
};
</script>

<style scoped>
.appContainer {
    display: flex;
    background: linear-gradient(180deg, #2F2F2F 0%, #1C1C1C 100%);
    width: 100%;
    height: 100%;
}

.leftSide {
    flex: 1 1 65%;
    padding: 35px;
}

.rightSide {
    flex: 1 0 35%;
    min-width: 150px;
    background: linear-gradient(180deg, #252525 0%, #151515 100%);
    padding: 40px 20px;
}

.poweredBy {
    position: absolute;
    bottom: 10px;
    left: 10px;
    cursor: pointer;
    font-size: 14px;
    transition: .15s;
    color: #3E3E3E;
}

.poweredBy:hover {
    color: #808080;
}
</style>
