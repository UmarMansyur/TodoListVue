<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-12">
        <h1 class="text-center">Aplikasi Todo list</h1>
      </div>
      <div class="col-7 offset-2 my-4">
        <input type="text" class="form-control" v-model="newTask" autofocus @keyup.enter="add()" />
      </div>
      <div class="col-2 my-4">
        <button type="button" class="btn btn-primary" @click="add()">Tambah</button>
      </div>
    </div>
    <div class="row justify-content-center">
    <div class="col-10">
      <table class="table table-bordered stripped">
        <thead>
          <tr>
            <th style="width: 10%" class="text-center">NO</th>
            <th class="text-center">Nama Kegiatan</th>
            <th class="text-center">Status</th>
            <th style="width: 15%" class="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in task" :key="index">
            <td class="text-center">{{ index + 1 }}</td>
            <td :class="
              Boolean(data.status) == true ? 'text-decoration-line-through' : ''
            ">
              {{ data.nama_kegiatan }}
            </td>
            <td class="text-center">
              <input type="checkbox" class="form-check-input" :checked="Boolean(data.status)" v-model="data.status" @click="option(data.id)"
                 />
              {{ }}
            </td>
            <td class="text-center">
              <button class="btn btn-sm btn-outline-warning me-2" @click="edit(data.id)">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-sm btn-outline-danger" @click="hapus(data.id)">
                <i class="bi bi-trash3"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  </div>
</template>
<script setup lang="ts">
import useApi from './composables/api';
import { onMounted, ref } from 'vue';
const {postResource, getResource, deleteResource, putResource} = useApi();
const newTask = ref('');
const isEdit = ref(false);
const isId = ref();
const option = async (id:any) => {
 const a = task.value.find((x:any)=> {
   return x.id == id;
 });
  await putResource(`/task/${id}`, { nama_kegiatan: a?.nama_kegiatan, status: !a?.status });
};
onMounted(async () => {
  const data = await getResource("/task");
  const response = data;
  task.value = response.map((x:any)=>{
    return {
      id: x.id,
      nama_kegiatan: x.nama_kegiatan,
      status: Boolean(x.status)
    };
  });
});
let task = ref<typeTask[]>([]);
type typeTask = {
  id: number;
  nama_kegiatan: string;
  status: boolean;
};
const getTask = async () => {
  const data = await getResource("/task");
  const response = data;
  task.value = response.map((x:any)=>{
    return {
      id: x.id,
      nama_kegiatan: x.nama_kegiatan,
      status: Boolean(x.status)
    };
  });
}
const hapus = async (id:any) => {
  await deleteResource(`/task/${id}`);
  task.value = task.value.filter((x:any)=>{
    return x.id != id
  });
}
const add = async () => {
  if(isEdit.value === true){
    console.log(isId.value);
    await putResource(`/task/${isId.value}`, { 
      nama_kegiatan: newTask.value 
    });
    newTask.value = "";
    isEdit.value = false;
    getTask();
    return;
  }
  await postResource("/task", { nama_kegiatan: newTask.value, status: false });
  newTask.value = "";
  getTask();  
};
const edit = (id:any) => {
  isId.value = id.toString();
  const a = task.value.find((x:any) => {
    return x.id == id
  });
  if(a){
    newTask.value = (a?.nama_kegiatan).toString();
    isEdit.value = true;
  }
}
</script>
