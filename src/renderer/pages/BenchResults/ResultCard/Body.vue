<template>
    <div class="resultBody">
        <div class="resRow">
            <div class="resBlock">
                <span class="resBlockHead">REQUESTS</span>
                <div class="resBlockBody">
                    <span class="value">{{ result.summary.requestPerSecond }}</span>
                    <span class="units">/sec</span>
                </div>
            </div>
            <div class="resBlock">
                <span class="resBlockHead">DATA</span>
                <div class="resBlockBody">
                    <span class="value">{{ result.summary.dataPerSecond.value }}</span>
                    <span class="units">{{ result.summary.dataPerSecond.unit }}/sec</span>
                </div>
            </div>
            <div class="resBlock">
                <span class="resBlockHead">AVG LATENCY</span>
                <div class="resBlockBody">
                    <span class="value">{{ result.latency.average.value }}</span>
                    <span class="units">{{ result.latency.average.unit }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        result: Object
    }
};
</script>

<style scoped lang='scss'>
.resultBody {
    width: 100%;
    height: 100%;
    padding: 10px 20px;
    color: #E2E2E2;
}

.resRow {
    display: flex;
    justify-content: space-between;
}

.resBlock {
    text-align: left;
}

.resBlockHead {
    display: block;
    width: 100%;
    font-size: 19px;
    font-weight: 300;
    margin-bottom: 10px;
}

.resBlockBody {
    .value {
        font-weight: 200;
        font-size: 26px;
    }
    .units {
        color: #7E7D7D;
        margin-left: 2px;
    }
}
</style>
