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
            <tr v-for="(data, index) in task" :key="data.id">
              <td class="text-center">{{ index + 1 }}</td>
              <td
                :class="
                  Boolean(data.status) == true ? 'text-decoration-line-through' : ''
                "
              >
                {{ data.nama_kegiatan }}
              </td>
              <td class="text-center">
                <input
                  type="checkbox"
                  class="form-check-input"
                  :checked="Boolean(data.status)"
                  v-model="data.status"
                  @click="checked(data.id)"
                />
                {{}}
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
import { onMounted, onUnmounted, reactive, ref } from "vue";
import useApi from "./composables/api";
const { postResource, getResource, putResource, deleteResource } = useApi();
const check = ref(true);
const idStatus = ref();
const newTask = ref("");
const isEdit = ref(false);
const index = ref();
type typeTask = {
  id: number;
  nama_kegiatan: string;
  status: boolean;
};
const task = reactive<typeTask[]>([]);
onMounted(async () => {
  const data = await getResource("/task");
  const response = data;
  response.forEach((a: any) => {
    task.push({ id: a.id, nama_kegiatan: a.nama_kegiatan, status: Boolean(a.status) });
  });
});

const getTodo = async () => {
  const data = await getResource("/task");
  const response = data;
  response.forEach((a: any) => {
    task.push({ id: a.id, nama_kegiatan: a.nama_kegiatan, status: Boolean(a.status) });
  });
};
const checkId = (id: any) => {
  for (let i = 0; i < task.length; i++) {
    if (id == task[i].id) {
      index.value = i;
    }
  }
};
const add = async () => {
  if (isEdit.value == true) {
    console.log('masuk');
    await putResource(`/task/${idStatus.value}`, {nama_kegiatan: newTask.value});
    task.length = 0;
    getTodo();
    isEdit.value = false;
    newTask.value = "";
    return;
  }
  await postResource("/task", { nama_kegiatan: newTask.value, status: false });
  task.length = 0;
  getTodo();
  newTask.value = "";
};
async function checked(id: any) {
  for (let i = 0; i < task.length; i++) {
    if (id == task[i].id) {
      check.value = !task[i].status;
    }
  }
  await putResource(`/task/${id}`, { status: Boolean(check.value) });
}
const edit = async (id: any) => {
  idStatus.value = id;
  isEdit.value = true;
  checkId(id);
  newTask.value = task[index.value].nama_kegiatan;
};
const hapus = async (id: any) => {
  checkId(id);
  task.splice(index.value, 1);
  await deleteResource(`/task/${id}`);
};
</script>
