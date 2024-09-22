import React from 'react';
import Base from '../components/base';

const SearchResult = () => {
  return (
    <div>
      {/* Main content starts here */}
        <main class="p-6 pt-1 max-w-4xl mx-auto">
          <div class="space-y-4">
              <div class="flex items-start bg-gray-900 rounded-lg p-4 shadow-md hover:bg-gray-800 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer">
                  <img src="../dist/img_src/maze-runner-1.png" alt="Drama Poster" class="w-72 h-48 object-cover rounded-xl mr-4" />
                  <div class="flex-1 flex flex-col justify-between">
                      <div class="mb-2 space-y-1">
                          <h3 class="text-lg font-semibold">Maze Runner</h3>
                          <p class="text-gray-400">2024</p>
                          <p class="text-gray-400">Genre 1, Genre 2, Genre 3</p>
                          <p class="text-gray-400">Actor 1, Actor 2, Actor 3</p>
                      </div>
                      <div class="flex justify-between items-end space-y-10">
                          <p class="text-yellow-400">⭐ 8.5</p>
                          <p class="text-gray-400">Views: 1.2M</p>
                      </div>
                  </div>
              </div>

              <div class="flex items-start bg-gray-900 rounded-lg p-4 shadow-md hover:bg-gray-800 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer">
                  <img src="https://via.placeholder.com/80x100" alt="Drama Poster" class="w-72 h-48 object-cover rounded-xl mr-4" />
                  <div class="flex-1 flex flex-col justify-between">
                      <div class="mb-2 space-y-1">
                          <h3 class="text-lg font-semibold">Title of the drama 1 that makes two lines</h3>
                          <p class="text-gray-400">2024</p>
                          <p class="text-gray-400">Genre 1, Genre 2, Genre 3</p>
                          <p class="text-gray-400">Actor 1, Actor 2, Actor 3</p>
                      </div>
                      <div class="flex justify-between items-end space-y-10">
                          <p class="text-yellow-400">⭐ 8.5</p>
                          <p class="text-gray-400">Views: 1.2M</p>
                      </div>
                  </div>
              </div>

              <div class="flex items-start bg-gray-900 rounded-lg p-4 shadow-md hover:bg-gray-800 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer">
                  <img src="https://via.placeholder.com/80x100" alt="Drama Poster" class="w-72 h-48 object-cover rounded-xl mr-4" />
                  <div class="flex-1 flex flex-col justify-between">
                      <div class="mb-2 space-y-1">
                          <h3 class="text-lg font-semibold">Title of the drama 1 that makes two lines</h3>
                          <p class="text-gray-400">2024</p>
                          <p class="text-gray-400">Genre 1, Genre 2, Genre 3</p>
                          <p class="text-gray-400">Actor 1, Actor 2, Actor 3</p>
                      </div>
                      <div class="flex justify-between items-end space-y-10">
                          <p class="text-yellow-400">⭐ 8.5</p>
                          <p class="text-gray-400">Views: 1.2M</p>
                      </div>
                  </div>
              </div>
          </div>
      </main>
    </div>
  );
}

export default SearchResult;