import React from 'react';
import Cms from '../components/cms';

const Countries = () => {
    return (
        <Cms activePage="countries">
                {/* <!-- Country Form --> */}
                <div class="w-3/4 text-left border-white p-4 mb-6 max-w-full mx-auto">
                    <form class="flex items-center space-x-4">
                        <label class="text-white font-bold min-w-[100px]" for="country">Country</label>
                        <input id="country" type="text" class="p-1 rounded-lg bg-gray-100 text-black focus:outline-none"/>
                        <button type="submit" class="p-1 bg-teal-600 w-20 rounded-xl text-white hover:bg-teal-700">Submit</button>
                    </form>
                </div>

                {/* <!-- Country List Table --> */}
                <table class="w-3/4 text-left border-collapse p-4 mb-6 max-w-full mx-auto">
                    <thead class="bg-purple-900">
                        <tr>
                            <th class="py-4 px-4"></th>
                            <th class="py-4 px-4">Countries</th>
                            <th class="py-4 px-10">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-blue-900">
                            <td class="py-4 px-4">1</td>
                            <td class="py-4 px-4">
                                <input type="text" value="Japan" class="bg-white border-lg p-1 rounded-lg text-black focus:outline-none"/>
                                <input type="radio" class="ml-2" checked/> Default
                            </td>
                            <td class="py-4 px-4">
                                <button class="text-red-400 hover:underline">Rename</button> | 
                                <button class="text-red-400 hover:underline">Delete</button>
                            </td>
                        </tr>
                        <tr class="bg-gray-800">
                            <td class="py-4 px-4">2</td>
                            <td class="py-4 px-4">
                                Korea
                            </td>
                            <td class="py-4 px-4">
                                <button class="text-red-400 hover:underline">Rename</button> | 
                                <button class="text-red-400 hover:underline">Delete</button>
                            </td>
                        </tr>
                        <tr class="bg-blue-900">
                            <td class="py-4 px-4">3</td>
                            <td class="py-4 px-4">
                                China
                            </td>
                            <td class="py-4 px-4">
                                <button class="text-red-400 hover:underline">Rename</button> | 
                                <button class="text-red-400 hover:underline">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
        </Cms>
    );
}

export default Countries;