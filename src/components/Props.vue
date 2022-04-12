<template>
    <div class="row justify-content-center mt-4">
        <div class="col-sm-4">
            <span>Anda mengirim : {{ value }} </span>
        </div>
    </div>
    <div class="row mt-3 justify-content-center">
        <div class="col-sm-4">
            <button @change="$emit('increaseBy', 'belajar')">
                Increase by 1
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref  } from 'vue';
const props = defineProps({
    value: String
})
const emit = defineEmits({
    increaseBy: String
})
const count = ref(1);
</script>