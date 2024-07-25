<template>
  <tr>
    <td :style="{ paddingLeft: `${level * 1.5}em` }">
      <span v-if="children.length > 0" class="expandable">+</span>
      {{ user.name }}
    </td>
    <td>{{ user.number }}</td>
  </tr>
  <template v-for="child in children" :key="child.id">
    <UserRow :user="child" :level="level + 1" />
  </template>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/stores/users'
import type { User } from '@/types/user'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

interface Props {
  user: User
  level: number
}

const props = withDefaults(defineProps<Props>(), {
  level: 1
})

const userStore = useUsersStore()
const { users } = storeToRefs(userStore)

const children = computed(() => {
  return users.value.filter((u) => u.parentId === props.user.id)
})
</script>

<style>
td {
  border: 0;
  padding: 10px 15px;
  transition: padding-left 0.3s;
}
</style>
