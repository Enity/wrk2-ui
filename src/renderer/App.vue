<template>
    <div id='app'>
        <Layout>
            <template slot='page'>
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </template>
            <template slot='aside'>
                <BenchQueryProvider />
            </template>
        </Layout>
    </div>
</template>

<script>
import Layout from './Layout';
import BenchQueryProvider from './providers/BenchQueryProvider';

export default {
    components: { Layout, BenchQueryProvider }
};
</script>

<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

a:visited {
    color: inherit;
}

a {
    text-decoration: none;
}

body, html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #f5f5f5;
    font-size: 16px;
    height: 100%;
    overflow: hidden;
}

#app {
    height: 100%;
    width: 100%;
}
</style>
