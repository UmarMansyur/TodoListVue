<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-12">
        <h1 class="text-center">Aplikasi Todo list</h1>
      </div>
      <div class="col-7 offset-2 my-4">
        <input
          type="text"
          class="form-control"
          v-model="newTask"
          autofocus
          @keyup.enter="add()"
        />
      </div>
      <div class="col-2 my-4">
        <button type="button" class="btn btn-primary" @click="add()">Tambah</button>
      </div>
    </div>
    <TodoList :newTask="newTask"></TodoList>
  </div>
</template>
<script setup lang="ts">
  import Props from './components/Props.vue'
  import TodoList from './components/TodoList.vue'
  import { ref } from 'vue';
  const nama = ref('sd');
  const newTask = ref();
</script>
