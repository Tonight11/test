<template>
  <div class="container">
    <button class="add-button" @click="openModal">Добавить</button>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Телефон</th>
          </tr>
        </thead>
        <tbody>
          <UserRow v-for="user in rootUsers" :key="user.id" :user="user" :level="1" />
        </tbody>
      </table>
    </div>
    <Transition>
      <UserModal v-if="isModalVisible" @closeModal="isModalVisible = false" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import UserModal from './UserModal.vue'
import UserRow from './UserRow.vue'
import { useUsersStore } from '@/stores/users'

const isModalVisible = ref(false)
const userStore = useUsersStore()
const users = userStore.users

const openModal = () => {
  isModalVisible.value = true
}

const rootUsers = computed(() => users.filter((user) => user.parentId === null))
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.add-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
}

.table-container {
  width: 100%;
  max-width: 800px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: rgb(19, 24, 27);
}

th,
td {
  padding: 12px 15px;
}

td {
  color: white;
}

th {
  background-color: #f2f2f2;
  text-align: left;
  font-weight: bold;
  border: 1px solid #ddd;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
