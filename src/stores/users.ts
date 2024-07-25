import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/user'

export const useUsersStore = defineStore(
  'users',
  () => {
    const users = ref<User[]>([])

    const addUser = (user: User) => {
      users.value.splice(users.value.length, 0, user)
    }

    return { users, addUser }
  },
  {
    persist: true
  }
)
