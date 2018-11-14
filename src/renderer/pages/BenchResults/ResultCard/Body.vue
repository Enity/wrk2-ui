<template>
    <div class="resultBody">
        <div class="resRow top">
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
        <div class="resRow">
            <span class='article'>Total:</span>
            <p>
                {{ result.summary.requests }} requests in
                {{ result.summary.duration }},
                {{ result.summary.size.value }} {{ result.summary.size.unit }} read.
            </p>
        </div>
        <div class="resRow">
            <span class='article'>Errors:</span>
            <p 
                class='errorUnit'
                v-for='(err, i) of errors' 
                :key='i'
            >
                <span
                    :class='{
                        warnErr: err.warn,
                        criticalErr: err.critical
                    }'
                >
                    {{ err.value }}
                </span>
                {{ err.title }}
            </p>
        </div>
        <div class="resRow">
            <Button
                @click='rawOpen = !rawOpen'
                type='dashes'
                title='Raw result'
            />
        </div>
        <div
            v-if='rawOpen'
            class="resRow"
        >
            <div class="rawResult">
                {{ result.raw }}
            </div>
        </div>
    </div>
</template>

<script>
import Button from '@/components/Button';

export default {
    data() {
        return {
            rawOpen: false
        };
    },
    props: {
        result: Object
    },
    components: { Button },
    computed: {
        errors() {
            const { errors } = this.result.summary;
            return Object.keys(errors).map(key => {
                const value = errors[key];
                return {
                    title: key,
                    value,
                    critical: value > 250,
                    warn: value > 100
                };
            });
        }
    }
};
</script>

<style scoped lang='scss'>
.resultBody {
    width: 100%;
    padding: 10px 20px;
}

.resRow {
    display: flex;
    margin-bottom: 8px;
    color: #d6d6d6;
    &.top {
        color: #E2E2E2;
        justify-content: space-between;
        margin-bottom: 25px;
    }
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

.article {
    margin-right: 10px;
}

.errorUnit:not(:last-child) {
    margin-right: 5px;
}

.rawResult {
    margin-top: 5px;
    background-color: #171717;
    width: 100%;
    border: 1px solid #242424;
    font-size: 14px;
    padding: 0 14px 14px 14px;
    white-space: pre-line;
    line-height: 1.3em;
}

.warnErr {
    color: #D5C95C;
}

.criticalErr {
    color: #C64848;
}
</style>
