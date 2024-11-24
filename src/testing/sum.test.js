import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import CmsCountries from '../views/cmsCountries';
import CmsDrama from '../views/cmsDrama';
import CmsDramaInput from '../views/cmsDramaInput';
import ModalDrama from '../components/modalDrama';

fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();
    setMovies = jest.fn();
});

// Mocking fetch API
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        status: 200,
    })
);

// describe('handleApproved function tests', () => {
//     let setMovies;

//     it('should update movie status to Approved', async () => {
//         const movies = [
//           { id: 1, title: 'Movie 1', status: 'Pending' },
//           { id: 2, title: 'Movie 2', status: 'Pending' },
//         ];
    
//         render(<ModalDrama movies={movies} setMovies={setMovies} />);
    
//         screen.debug();

//         // Menunggu elemen tombol Approve muncul
//         const approveButton = await screen.findByText('Approve'); // Cari berdasarkan teks "Approve"
    
//         fireEvent.click(approveButton);
    
//         await waitFor(() => {
//           // Memastikan setMovies dipanggil dengan status yang diperbarui
//           expect(setMovies).toHaveBeenCalledWith(
//             expect.arrayContaining([
//               expect.objectContaining({ id: 1, status: 'Approved' }),
//             ])
//           );
//         });
//     });    
// });


// test('should add new country and display it in the table', async () => {
//     fetchMock.mockResponseOnce(JSON.stringify([]));

//     fetchMock.mockResponseOnce(JSON.stringify({ id: 1, name: 'Testing Country' }));

//     render(
//         <MemoryRouter>
//             <CmsCountries />
//         </MemoryRouter>
//     );

//     const countryInput = await screen.findByPlaceholderText('Input new country here');
//     const submitButton = screen.getByText('Submit');

//     fireEvent.change(countryInput, { target: { value: 'Testing Country' } });
//     fireEvent.click(submitButton);

//     expect(fetchMock).toHaveBeenCalledWith(
//         'http://localhost:3005/api/countries',
//         expect.objectContaining({
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ name: 'Testing Country' }),
//         })
//     );

//     await waitFor(async () => {
//         expect(await screen.findByText(/Testing Country/i)).toBeInTheDocument();
//     }, { timeout: 3000 });
// });


afterAll(() => {
    jest.clearAllMocks(); // Clean up mocks after all tests
});