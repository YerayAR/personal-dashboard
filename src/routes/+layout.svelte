<script lang="ts">
  export let data;
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <header class="p-4 shadow bg-white dark:bg-gray-800">
    <h1 class="text-xl font-bold">Personal Dashboard</h1>
  </header>
  <main class="p-4">
    <slot />
  </main>
</div>
