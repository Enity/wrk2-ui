<template>
    <div id='app'>
        <Layout>
            <template slot='page'>
                <router-view></router-view>
            </template>
        </Layout>
    </div>
</template>

<script>
import Layout from './Layout';

export default {
    components: { Layout }
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
    height: 100%;
    overflow: hidden;
}

#app {
    height: 100%;
    width: 100%;
}
</style>
