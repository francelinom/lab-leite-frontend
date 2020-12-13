<template>
    <div class="page-title shadow p-3 mb-5 bg-white rounded">
        <h1><i v-if="icon" :class="icon"></i>{{main}}</h1>
        <h2>{{sub}}</h2>
        <hr>
    </div>
</template>

<script>
export default {
    name: 'PageTitle',
    props: ['icon', 'main', 'sub']
}
</script>

<style>
    .page-title h1 {
        margin: 0%;
    }

    .page-title h2 {
        color: #777;
        margin: 5px;
        font-size: 1.3rem;
    }
  
</style>