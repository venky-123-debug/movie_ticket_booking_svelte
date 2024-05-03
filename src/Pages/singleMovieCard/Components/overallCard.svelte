<script>
  export let list
  const toHoursAndMinutes = (t) => {
    let hours = Math.floor(t / 60)
    let minutes = t % 60
    return `${hours}hr ${minutes}min`
  }
</script>

<div class="rounded-md bg-gray-800 shadow-lg">
  <div class="max-w-4xl px-4 leading-none md:flex">
    <div class="flex-none">
      <img src="/bookApi/files/{list.poster}" alt="pic" class="h-72 w-56 -translate-y-4 transform rounded-md border-4 border-gray-300 shadow-2xl" />
    </div>

    <div class="flex-col sm:pl-10">
      <p class="pt-4 text-2xl text-blue-500 font-bold">{list.title}</p>
      <hr class="bg-red-500 " data-content="" />
      <div class="text-md my-2 flex justify-between px-4">
        <span class="font-bold">{toHoursAndMinutes(Number(list.duration))} |{list.genre}</span>
        <span class="font-bold" />
      </div>
      <p class="my-4 hidden px-4 text-left text-sm md:block">
        {list.description}
      </p>

      <p class="text-md my-2 flex px-4">
        Rating: 9.0/10
        <span class="px-2 font-bold">|</span>
        Mood: Dark
      </p>
    </div>
  </div>
</div>
