<script lang="ts">
  export let value = 0;
  export let goal = 100;
</script>

<div class="w-full bg-gray-200 rounded">
  <div class="bg-green-500 text-xs leading-none py-1 text-center text-white rounded"
       style="width: {Math.min(100, value / goal * 100)}%">
    {value}/{goal}
  </div>
</div>
