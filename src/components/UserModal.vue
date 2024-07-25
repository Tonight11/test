<template>
  <div class="modal">
    <div class="modal__content">
      <span class="close" @click="closeModal">X</span>
      <h2>Добавить пользователя</h2>
      <form class="modal__form" @submit.prevent="submitForm">
        <label>
          Имя:
          <input v-model="name" required />
        </label>
        <label>
          Номер:
          <input v-model="number" required />
        </label>
        <label>
          Родители:
          <select v-model="parentId">
            <option :value="null">None</option>
            <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
          </select>
        </label>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useUsersStore } from '@/stores/users'

const emit = defineEmits(['closeModal'])

const name = ref('')
const number = ref('')
const parentId = ref<number | null>(null)
const userStore = useUsersStore()
const users = userStore.users

const submitForm = () => {
  const newUser = {
    id: Date.now(),
    name: name.value,
    number: number.value,
    parentId: parentId.value
  }
  userStore.addUser(newUser)
  name.value = ''
  number.value = ''
  parentId.value = null
  closeModal()
}

const closeModal = () => {
  emit('closeModal')
}
</script>
<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(115, 115, 115, 0.4);
  animation: fadeIn 1s ease both;
  z-index: 2;
  backdrop-filter: blur(20px);

  &__content {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem 3rem;
    background: #f5f5f5;
    max-width: 400px;
    padding-top: 2rem;
    border-radius: 20px;
    border: 0;
    box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.1);
    animation: fadeIn 1s ease both;
    color: #202020;
  }

  .close {
    filter: grayscale(1);
    border: none;
    background: none;
    position: absolute;
    top: 15px;
    right: 10px;
    transition:
      filter 0.3s,
      transform 0.3s;
    cursor: pointer;
    transform-origin: center;
    font-size: 16px;

    &:hover {
      filter: grayscale(0);
      transform: scale(1.1);
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    label {
      font-size: 1rem;
      line-height: 1.3rem;
      display: flex;
      flex-direction: column;
    }

    input,
    select {
      padding: 8px;
      margin-top: 5px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1em;
    }

    .submit-button {
      background-color: #007bff;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #0056b3;
      }
    }
  }

  h2 {
    font-weight: 600;
    font-size: 2rem;
    padding-bottom: 1rem;
  }
}


</style>
