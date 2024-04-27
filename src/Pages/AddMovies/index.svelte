  <div class="flex items-center justify-center h-screen w-screen overflow-hidden bg-gradient-to-b from-gray-800 via-gray-900 to-black">
    <div class="flex items-center justify-start w-[70%]">
      <div class="w-full overflow-auto px-6 pb-6">
        <div class="mx-auto mt-6 h-auto rounded-md bg-black/60 w-full p-6">
          <form action="post" class="space-y-3">
            <div class="flex w-full gap-3">
              <div class="flex w-full flex-col gap-3 ">
                <div class="sm:grid sm:grid-cols-3 sm:items-start md:items-center">
                  <div class="mb-1 block select-none text-base font-medium text-gray-200 sm:mb-0">Movie Name</div>
                  <div class="sm:col-span-2 sm:mt-0">
                    <input
                      autocomplete="off"
                      required="true"
                      name="movie"
                      type="text"
                      value="Sherlock Holmes"
                      class="formInput"
                      placeholder="Enter movie name"
                    />
                  </div>
                </div>
                <div class="sm:grid sm:grid-cols-3 sm:items-start md:items-center">
                  <div class="mb-1 block select-none text-base font-medium text-gray-200 sm:mb-0">Email Address</div>
                  <div class="sm:col-span-2 sm:mt-0">
                    <input
                      autocomplete="off"
                      required="true"
                      name="email"
                      type="email"
                      value="venkat@print2block.com"
                      class="formInput"
                      placeholder="enter email"
                    />
                  </div>
                </div>
               
              </div>
            </div>
  
            <div class="flex items-center justify-end">
              <button
                type="submit"
                class="w-28 rounded-md bg-green-500 py-2 text-sm font-medium text-white hover:bg-green-600 active:bg-green-500"
              >
                <i class="fa-solid fa-user-plus" />
                &nbsp;Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
