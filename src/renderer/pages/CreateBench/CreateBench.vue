<template>
    <div class='createBenchForm'>
        <div class='block target-block'>
            <span class>TARGET</span>
            <Input 
                width='100%'
                v-model="formData.target"
            />
        </div>
        <div class="block">
            <RangeGroup
                label='Duration (sec)'
                min='10'
                max='150'
                step='5'
                inputWidth='50px'
                v-model='formData.duration'
            />
        </div>
        <div class="block">
            <RangeGroup
                label='Connections'
                min='100'
                max='1000'
                step='20'
                inputWidth='55px'
                v-model='formData.connections'
            />
        </div>
        <div class="block">
            <RangeGroup
                label='Requests/sec'
                min='200'
                max='4000'
                step='50'
                inputWidth='65px'
                v-model='formData.requests'
            />
        </div>
        <Button
            type='flat'
            class='submit'
            @click='submit'
        >
            BEGIN
        </Button>
    </div>
</template>

<script>
import Input from '@/components/Input';
import Button from '@/components/Button';
import RangeGroup from './RangeGroup';
import { ActionsEnum } from '@root/enums';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            formData: {
                target: 'http://localhost/phpmyadmin',
                threads: 2,
                duration: 5,
                connections: 300,
                requests: 2000
            }
        };
    },
    components: { Input, Button, RangeGroup },
    methods: {
        ...mapActions([ ActionsEnum.CREATE_BENCH ]),

        submit() {
            this[ActionsEnum.CREATE_BENCH](this.formData);
        }
    }
};
</script>

<style scoped lang='scss'>
.createBenchForm {
    text-align: center;
    margin: 0 auto;
    width: 75%;
}

.block {
    margin-bottom: 20px;
}

.target-block {
    margin-bottom: 30px;
    span {
        user-select: none;
        display: block;
        margin-bottom: 10px;
    }
}

.submit {
    margin-top: 10px;
}
</style>
