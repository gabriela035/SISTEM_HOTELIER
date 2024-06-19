import React, { useState, useEffect,  } from "react";
import Room from "../components/Room";
import { useFetchData } from "../hooks/useData";
import { getAllRooms } from "../services/rooms";
import { DatePicker, Input, Select } from "antd";
import { formatDateToDDMMYYYY } from "../utils/utils";
import BoxWrapper from "../components/BoxWrapper";
import Footer from "../components/Footer";
const { RangePicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;

function HomeScreen() {

  const [fromDate, setFromDate] = useState("Please select valid date range");
  const [toDate, setToDate] = useState("Please select valid date range");

  const [searchKey, setSearchKey] = useState("");

  const { data: rooms = [], loading } = useFetchData(() => getAllRooms(), []);
  const [copyRooms, setCopyRooms] = useState(rooms);

  useEffect(() => {
    setCopyRooms(rooms);
  }, [rooms]);

  if (loading || !rooms) {
    return <div>loading data....</div>;
  }

  function filterByDate(dates) {
    if (dates) {
      setFromDate(formatDateToDDMMYYYY(new Date(dates[0])));
      setToDate(formatDateToDDMMYYYY(new Date(dates[1])));
    }
  }

  function filterBySearch() {
    const filteredRooms = rooms.filter((r) =>
      `${r.room_number}`.includes(searchKey)
    );
    setCopyRooms(filteredRooms);
  }

  function handleFilter(value) {
    let filteredRooms = [];

    if (value === "all") {
      filteredRooms = rooms;
    } else {
      filteredRooms = rooms.filter(
        (room) => room.number_of_beds.toString() === value
      );
    }

    setCopyRooms(filteredRooms);
  }

  return (
    <>
      <div className="container" >
        <BoxWrapper >
          <RangePicker
            format="DD-MM-YYYY"
            onChange={filterByDate}
             style={{ width: 430 }}//tbc
          />
          <Search
            placeholder="Search..."
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyUp={filterBySearch}
            style={{ width: "300px" }}
          />
          <Select
            defaultValue="all"
            onChange={handleFilter}
            style={{ minWidth: "200px", fontSize: "16px" }}
          >
            <Option value="all">All</Option>
            <Option value="2">Rooms with 2 beds</Option>{" "}
            {/* Example: Change value to '2' */}
            <Option value="3">Rooms with 3 beds</Option>{" "}
            {/* Example: Change value to '3' */}
            {/* Add more options as needed for different bed configurations */}
          </Select>
        </BoxWrapper>

        <div className="row justify-content-center mt-3">
          {copyRooms.map((r) => (
            //Add filter for removing apartment rooms
            <div key={r._id} className="col-md-9 mt-2">
              <Room room={r} fromDate={fromDate} toDate={toDate} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomeScreen;
