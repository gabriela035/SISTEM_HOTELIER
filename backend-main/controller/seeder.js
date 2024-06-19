const Inventory = require('../models/inventory');
const Room = require('../models/room');
const Supplies = require('../models/supplies');
const Facilities = require('../models/facilities');
const Apartments = require('../models/apartment');
const mongoose = require('mongoose');

const data_inventory = [
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Closet",
        quantity: 1,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Chairs",
        quantity: 3,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Table",
        quantity: 1,
    }
];
const data_supplies = [
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Soap",
        quantity: 3,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Toilet paper",
        quantity: 5,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Towels",
        quantity: 7,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Shower Gel",
        quantity: 1,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Trash bag",
        quantity: 1,
    }
];
const data_facilities = [
    {
        _id: new mongoose.Types.ObjectId(),
        name: "TV",
        quantity: 1,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Fridge",
        quantity: 1,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Microwave",
        quantity: 1,
    }
];


const data_rooms = [
    {
        _id: new mongoose.Types.ObjectId(),
        room_number: 101,
        number_of_beds: 2,
        image_urls: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaFhJ3WnMt2c8wuUYo626B0jPwMdKX85T5sA&usqp=CAU'],
        current_bookings: [],
        inventoryID:[ data_inventory[0]._id,data_inventory[1]._id, data_inventory[2]._id],
        suppliesID: [data_supplies[0]._id, data_supplies[1]._id,data_supplies[2]._id],
        facilitiesID: data_facilities[0]._id,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        room_number: 102,
        number_of_beds: 3,
        image_urls: ['https://images.livspace-cdn.com/plain/https://d3gq2merok8n5r.cloudfront.net/abhinav/1real-homes-in-1669021353-jiSjM/ond-2022-1669032781-pWI47/wall-paint-1669871644-nrqVf/d-inwp-ond2022-0104-1671099486-PF4b3/living-room-05-1-1671099496-1tmXX.jpg',
            'https://media.designcafe.com/wp-content/uploads/2019/12/09102702/modern-living-room-design-with-tv-unit-designed-with-storage.jpg'],
        current_bookings: [],
        inventoryID: [ data_inventory[0]._id,data_inventory[1]._id, data_inventory[2]._id],
        suppliesID:[data_supplies[0]._id, data_supplies[3]._id,data_supplies[4]._id],
        facilitiesID: data_facilities[2]._id,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        room_number: 104,
        number_of_beds: 2,
        image_urls: ['https://www.myboutiquehotel.com/photos/110961/shinola-hotel-detroit-005-90455-1110x700.jpg,https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-videoSixteenByNineJumbo1600.jpg'],
        current_bookings: [],
        inventoryID: [ data_inventory[0]._id,data_inventory[1]._id, data_inventory[2]._id],
        suppliesID:[data_supplies[0]._id, data_supplies[3]._id,data_supplies[4]._id],
        facilitiesID: [data_facilities[0]._id, data_facilities[1]._id],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        room_number: 104,
        number_of_beds: 2,
        image_urls: ['https://www.rwlasvegas.com/wp-content/uploads/2022/05/crockfords-las-vegas-standard-deluxe-bedroom_1000x880.jpg'],
        current_bookings: [],
        inventoryID: [ data_inventory[0]._id,data_inventory[1]._id, data_inventory[2]._id],
        suppliesID:[data_supplies[0]._id, data_supplies[1]._id,data_supplies[3]._id],
        facilitiesID: [data_facilities[0]._id, data_facilities[2]._id],
    },

];

const data_apartment = [
    {
        _id: new mongoose.Types.ObjectId(),
        name:"Apartment TH",
        roomID: [data_rooms[0]._id, data_rooms[1]._id]
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name:"Apartment TH",
        roomID: [data_rooms[2]._id, data_rooms[3]._id]
    }

];
//----------------------
const seedDataIfEmpty = async (Model, seedData) => {
    try {
        const existingData = await Model.find();

        if (existingData.length === 0) {
            for (let data of seedData) {
                const newItem = new Model(data);
                await newItem.save();
            }
            console.log(`${Model.modelName} collection seeded!`);
        } else {
            console.log(`${Model.modelName} collection already contains data, no need to seed.`);
        }
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};
//==================



// async function dataSeeder() {
//     try {
//         const data = await Inventory.find();
//         if (data.length === 0) {


//             for (let inventory of data_inventory) {
//                 let newItem = new Inventory(inventory);
//                 await newItem.save();
//             }
//             console.log("Inventory created!");
//         } else {
//             console.log("Inventory already exists, no need to seed.");
//         }//-----------------------------------------
//         const suppliesData = await Supplies.find();
//         if (suppliesData.length === 0) {


//             for (let s of data_supplies) {
//                 let newItem = new Supplies(s);
//                 await newItem.save();
//             }
//             console.log("Supplies created!");
//         } else {
//             console.log("Supplies already exists, no need to seed.");
//         }


//         //-----------------------------------------
//         const facilitiesData = await Facilities.find();
//         if (facilitiesData.length === 0) {


//             for (let f of data_facilities) {
//                 let newItem = new Facilities(f);
//                 await newItem.save();
//             }
//             console.log("Facilities created!");
//         } else {
//             console.log("Facilities already exists, no need to seed.");
//         }


//         //-----------------------------------------
//         const roomsData = await Room.find();
//         if (roomsData.length === 0) {
//             for (let r of data_rooms) {
//                 let newItem = new Room(r);
//                 await newItem.save();
//             }
//             console.log("Room created!");
//         } else {
//             console.log("Room already exists, no need to seed.");
//         }

//         //------test


//         const test = new Apartments({
//             _id: new mongoose.Types.ObjectId(),
//             roomID: data_rooms[0]._id
//         });
//         await test.save();
//         console.log(data_rooms[0])
//         //----------

//     } catch (error) {
//         console.error(error.message);
//     }
// }
async function dataSeeder() {
    seedDataIfEmpty(Inventory, data_inventory);
    // Seed Supplies collection
    seedDataIfEmpty(Supplies, data_supplies);
    seedDataIfEmpty(Facilities, data_facilities);
    seedDataIfEmpty(Room, data_rooms);
    seedDataIfEmpty(Apartments,data_apartment);
  
}
module.exports = dataSeeder;
