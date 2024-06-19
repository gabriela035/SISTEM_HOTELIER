import React, { useState, useEffect } from 'react';
import { useFetchData } from '../hooks/useData';
import { DatePicker, Input, Select } from 'antd';
import { formatDateToDDMMYYYY } from '../utils/utils';
import BoxWrapper from '../components/BoxWrapper';
import Footer from '../components/Footer';
import { getAllApartments } from '../services/apartments';
import Apartment from '../components/Apartment';
const { RangePicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;

function ApartmentList() {
  const [fromDate, setFromDate] = useState('Please select valid date range');
  const [toDate, setToDate] = useState('Please select valid date range');
  const [copyApartments, setCopyApartments] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  const { data: apartments = [] } = useFetchData(() => getAllApartments());
//   useEffect(() => {
//     setCopyRooms(apartments);
//   }, [apartments]);

  // if (loading || !rooms) {
  //   return <div>loading data....</div>;
  // }
  // if (error || !rooms) {
  //   return <div>error fetching data</div>;
  // }
  useEffect(() => {
    setCopyApartments(apartments);
  }, [apartments]);

  function filterByDate(dates) {
    if (dates) {
      setFromDate(formatDateToDDMMYYYY(new Date(dates[0])));
      setToDate(formatDateToDDMMYYYY(new Date(dates[1])));
    }
  }



  function filterBySearch() {
    const filteredApartments = apartments.filter((a) => `${a.name}`.includes(searchKey));
    setCopyApartments(filteredApartments);
  }

  function handleFilter(value) {
    let filteredRooms = [];

    if (value === 'all') {
      // If 'All' is selected, show all rooms
      filteredRooms = apartments;
    } else {
      // Filter rooms based on the selected number of beds
      filteredRooms = apartments.filter((a) => a.roomID.length.toString() === value);
    }

    // Update the state with the filtered rooms
    setCopyApartments(filteredRooms);
  }



  return (
    <>
      <div className='container'>
        <BoxWrapper>
          <RangePicker
            format='DD-MM-YYYY'
            onChange={filterByDate}
          // style={{ width: '60%' }} // Adjust width as needed
          />
          <Search
            placeholder='Search...'
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyUp={filterBySearch}
            style={{ width: '300px' }}
          />
          <Select
            defaultValue="all"
            onChange={handleFilter} // Connect the handleFilter function to the onChange event
            style={{ minWidth: '200px', fontSize: '16px' }}
          >
            <Option value="all">All</Option>
            <Option value="1">With 1 room</Option> {/* Example: Change value to '2' */}
            <Option value="2">With 2 rooms</Option> {/* Example: Change value to '3' */}
            {/* Add more options as needed for different bed configurations */}
          </Select>

        </BoxWrapper>
        <div className='row justify-content-center mt-3'>
          {copyApartments.map((r) => (
            <div key={r._id} className='col-md-9 mt-2'>
              <Apartment apartment={r} fromDate={fromDate} toDate={toDate} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ApartmentList;
