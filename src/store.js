import { combineReducers, configureStore } from "@reduxjs/toolkit";

const errorReducer = (
  state = { authError: undefined, carError: undefined },
  action
) => {
  switch (action.type) {
    case "SET_ERROR":
      const temp = {};
      const { payload } = action;

      if (payload.status && payload.status.length) {
        payload.status &&
          payload?.status.forEach((ele) => {
            if (ele.param === "_error") {
              ele.nestedErrors?.forEach((ele1) => {
                const key = ele1.param.split(".").pop();
                temp[key] = ele1.msg;
              });
            } else if (ele.param?.includes("updates.")) {
              const key = ele.param.split(".").slice(1).join(".");
              temp[key] = ele.msg;
            } else {
              temp[ele.path] = ele.msg;
            }
          });
      }

      return { ...state, [`${payload.scope}Error`]: temp };

    default:
      return state;
  }
};

const loadingReducer = (state = { authLoading: false }, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return Object.assign({}, state, {
        [`${action.payload.scope}Loading`]: action.payload.status,
      });
    default:
      return state;
  }
};

const msgReducer = (
  state = { success: undefined, error: undefined },
  action
) => {
  switch (action.type) {
    case "SET_TOAST":
      return Object.assign({}, state, {
        [`${action.payload.scope}`]:
          action.payload.status || "Something went wrong!",
      });
    case "CLEAR_TOAST":
      return { ...state, error: undefined, success: undefined };
    default:
      return state;
  }
};

const ThemeReducer = (
  state = {
    theme: [],
  },
  action
) => {
  switch (action.type) {
    case "GET_THEME":
      return {
        ...state,
        theme: action.payload,
      };
    case "CLEAR_DATA":
      return {
        ...state,
        theme: {},
      };
    default:
      return state;
  }
};

const PacakgeReducer = (
  state = {
    packages: [
      {
        _id: "687a0fba4165301d38d1a59e",
        themeId: {
          _id: "6879e5d7702d9b629f9a19ab",
          name: "Dubai Theme",
          image:
            "https://res.cloudinary.com/dsulwdnj2/image/upload/v1752819159/themes/1752819154926-dubai_theme.jpg.jpg",
          createdAt: "2025-07-18T06:12:39.744Z",
          updatedAt: "2025-07-18T06:12:39.744Z",
          __v: 0,
        },
        is_domestic_international: "2",
        tourImages: [
          "http://localhost:3001/uploads/1752829881872-pexels-apasaric-325193.jpg",
          "http://localhost:3001/uploads/1752829881901-pexels-shukran-1534411.jpg",
          "http://localhost:3001/uploads/1752829881929-pexels-apasaric-4201659.jpg",
          "http://localhost:3001/uploads/1752829881976-pexels-jeshoots-com-147458-442579.jpg",
        ],
        name: "DUBAI WITH ABU DHABI",
        description:
          "Explore Dubai and Abu Dhabi with a luxurious 7-day / 6-night experience including major attractions and activities.",
        duration: "7 Days / 6 Nights",
        locations: [
          {
            name: "Dubai Airport",
            image:
              "http://localhost:3001/uploads/1752829881981-dubai_12345234325_airport.jpg",
            description: "Arrival transfer and breakfast on 1 Hr Yacht",
            _id: "687a0fba4165301d38d1a59f",
          },
          {
            name: "Dubai City",
            image:
              "http://localhost:3001/uploads/1752829881993-dubai_city_23456785.jpg",
            description:
              "Half Day City Tour, Monorail & Burj Khalifa 124th Floor (Non-Prime)",
            _id: "687a0fba4165301d38d1a5a0",
          },
          {
            name: "Desert Safari",
            image:
              "http://localhost:3001/uploads/1752829882000-dubai_Desert Safari_142535.jpg",
            description: "Premium Desert Safari with BBQ Dinner",
            _id: "687a0fba4165301d38d1a5a1",
          },
          {
            name: "Miracle Garden",
            image:
              "http://localhost:3001/uploads/1752829882003-dubai_miracle_garden_36245.jpg",
            description: "Visit to Miracle Garden and Global Village",
            _id: "687a0fba4165301d38d1a5a2",
          },
          {
            name: "Abu Dhabi",
            image:
              "http://localhost:3001/uploads/1752829882014-abudhabi_737445.jpg",
            description: "City Tour including BAPS Mandir & Grand Mosque",
            _id: "687a0fba4165301d38d1a5a3",
          },
          {
            name: "Dubai Shopping",
            image:
              "http://localhost:3001/uploads/1752829882017-dubai_shopping_366384.jpg",
            description: "Shopping Tour",
            _id: "687a0fba4165301d38d1a5a4",
          },
          {
            name: "Dubai Airport - return",
            image:
              "http://localhost:3001/uploads/1752829881981-dubai_12345234325_airport.jpg",
            description: "Departure transfer to airport",
            _id: "687a0fba4165301d38d1a5a5",
          },
        ],
        services: [
          {
            name: "Flight",
            description: "Return airfare",
            _id: "687a0fba4165301d38d1a5a6",
          },
          {
            name: "Hotel",
            description: "4-star hotel accommodation",
            _id: "687a0fba4165301d38d1a5a7",
          },
          {
            name: "City Tour",
            description: "Dubai and Abu Dhabi guided tours",
            _id: "687a0fba4165301d38d1a5a8",
          },
          {
            name: "Transfers",
            description: "Airport and intercity transfers",
            _id: "687a0fba4165301d38d1a5a9",
          },
        ],
        createdAt: "2025-07-18T09:11:22.034Z",
        updatedAt: "2025-07-18T09:11:22.034Z",
        __v: 0,
      },
      {
        _id: "687dd079c87fcf7a3a79ea9f",
        themeId: {
          _id: "6879e5d7702d9b629f9a19ab",
          name: "Dubai Theme",
          image:
            "https://res.cloudinary.com/dsulwdnj2/image/upload/v1752819159/themes/1752819154926-dubai_theme.jpg.jpg",
          createdAt: "2025-07-18T06:12:39.744Z",
          updatedAt: "2025-07-18T06:12:39.744Z",
          __v: 0,
        },
        is_domestic_international: "2",
        tourImages: [
          "http://localhost:3001/uploads/1753075833357-pexels-apasaric-325193.jpg",
          "http://localhost:3001/uploads/1753075833370-pexels-shukran-1534411.jpg",
          "http://localhost:3001/uploads/1753075833389-pexels-apasaric-4201659.jpg",
          "http://localhost:3001/uploads/1753075833396-pexels-jeshoots-com-147458-442579.jpg",
        ],
        name: "DUBAI WITH ABU DHABI",
        description:
          "Explore Dubai and Abu Dhabi with a luxurious 7-day / 6-night experience including major attractions and activities.",
        duration: "7 Days / 6 Nights",
        locations: [
          {
            name: "Dubai Airport",
            image:
              "http://localhost:3001/uploads/1753075833402-dubai_12345234325_airport.jpg",
            description: "Arrival transfer and breakfast on 1 Hr Yacht",
            _id: "687dd079c87fcf7a3a79eaa0",
          },
          {
            name: "Dubai City",
            image:
              "http://localhost:3001/uploads/1753075833406-dubai_city_23456785.jpg",
            description:
              "Half Day City Tour, Monorail & Burj Khalifa 124th Floor (Non-Prime)",
            _id: "687dd079c87fcf7a3a79eaa1",
          },
          {
            name: "Desert Safari",
            image:
              "http://localhost:3001/uploads/1753075833415-dubai_Desert Safari_142535.jpg",
            description: "Premium Desert Safari with BBQ Dinner",
            _id: "687dd079c87fcf7a3a79eaa2",
          },
          {
            name: "Miracle Garden",
            image:
              "http://localhost:3001/uploads/1753075833426-dubai_miracle_garden_36245.jpg",
            description: "Visit to Miracle Garden and Global Village",
            _id: "687dd079c87fcf7a3a79eaa3",
          },
          {
            name: "Abu Dhabi",
            image:
              "http://localhost:3001/uploads/1753075833440-abudhabi_737445.jpg",
            description: "City Tour including BAPS Mandir & Grand Mosque",
            _id: "687dd079c87fcf7a3a79eaa4",
          },
          {
            name: "Dubai Shopping",
            image:
              "http://localhost:3001/uploads/1753075833444-dubai_shopping_366384.jpg",
            description: "Shopping Tour",
            _id: "687dd079c87fcf7a3a79eaa5",
          },
          {
            name: "Dubai Airport - return",
            image:
              "http://localhost:3001/uploads/1753075833402-dubai_12345234325_airport.jpg",
            description: "Departure transfer to airport",
            _id: "687dd079c87fcf7a3a79eaa6",
          },
        ],
        services: [
          {
            name: "Flight",
            description: "Return airfare",
            _id: "687dd079c87fcf7a3a79eaa7",
          },
          {
            name: "Hotel",
            description: "4-star hotel accommodation",
            _id: "687dd079c87fcf7a3a79eaa8",
          },
          {
            name: "City Tour",
            description: "Dubai and Abu Dhabi guided tours",
            _id: "687dd079c87fcf7a3a79eaa9",
          },
          {
            name: "Transfers",
            description: "Airport and intercity transfers",
            _id: "687dd079c87fcf7a3a79eaaa",
          },
        ],
        createdAt: "2025-07-21T05:30:33.482Z",
        updatedAt: "2025-07-21T05:30:33.482Z",
        __v: 0,
      },
      {
        _id: "687dd2732f3815d399d34059",
        themeId: {
          _id: "6879e5d7702d9b629f9a19ab",
          name: "Dubai Theme",
          image:
            "https://res.cloudinary.com/dsulwdnj2/image/upload/v1752819159/themes/1752819154926-dubai_theme.jpg.jpg",
          createdAt: "2025-07-18T06:12:39.744Z",
          updatedAt: "2025-07-18T06:12:39.744Z",
          __v: 0,
        },
        is_domestic_international: "2",
        tourImages: [
          "http://api.stellarinternational.co.in/uploads/1753076339654-pexels-apasaric-325193.jpg",
          "http://api.stellarinternational.co.in/uploads/1753076339686-pexels-shukran-1534411.jpg",
          "http://api.stellarinternational.co.in/uploads/1753076339701-pexels-apasaric-4201659.jpg",
          "http://api.stellarinternational.co.in/uploads/1753076339711-pexels-jeshoots-com-147458-442579.jpg",
        ],
        name: "DUBAI WITH ABU DHABI",
        description:
          "Explore Dubai and Abu Dhabi with a luxurious 7-day / 6-night experience including major attractions and activities.",
        duration: "7 Days / 6 Nights",
        locations: [
          {
            name: "Dubai Airport",
            image:
              "http://api.stellarinternational.co.in/uploads/1753076339717-dubai_12345234325_airport.jpg",
            description: "Arrival transfer and breakfast on 1 Hr Yacht",
            _id: "687dd2732f3815d399d3405a",
          },
          {
            name: "Dubai City",
            image:
              "http://api.stellarinternational.co.in/uploads/1753076339721-dubai_city_23456785.jpg",
            description:
              "Half Day City Tour, Monorail & Burj Khalifa 124th Floor (Non-Prime)",
            _id: "687dd2732f3815d399d3405b",
          },
          {
            name: "Desert Safari",
            image:
              "http://api.stellarinternational.co.in/uploads/1753076339731-dubai_Desert Safari_142535.jpg",
            description: "Premium Desert Safari with BBQ Dinner",
            _id: "687dd2732f3815d399d3405c",
          },
          {
            name: "Miracle Garden",
            image:
              "http://api.stellarinternational.co.in/uploads/1753076339735-dubai_miracle_garden_36245.jpg",
            description: "Visit to Miracle Garden and Global Village",
            _id: "687dd2732f3815d399d3405d",
          },
          {
            name: "Abu Dhabi",
            image:
              "http://api.stellarinternational.co.in/uploads/1753076339755-abudhabi_737445.jpg",
            description: "City Tour including BAPS Mandir & Grand Mosque",
            _id: "687dd2732f3815d399d3405e",
          },
          {
            name: "Dubai Shopping",
            image:
              "http://api.stellarinternational.co.in/uploads/1753076339773-dubai_shopping_366384.jpg",
            description: "Shopping Tour",
            _id: "687dd2732f3815d399d3405f",
          },
          {
            name: "Dubai Airport - return",
            image:
              "http://api.stellarinternational.co.in/uploads/1753076339717-dubai_12345234325_airport.jpg",
            description: "Departure transfer to airport",
            _id: "687dd2732f3815d399d34060",
          },
        ],
        services: [
          {
            name: "Flight",
            description: "Return airfare",
            _id: "687dd2732f3815d399d34061",
          },
          {
            name: "Hotel",
            description: "4-star hotel accommodation",
            _id: "687dd2732f3815d399d34062",
          },
          {
            name: "City Tour",
            description: "Dubai and Abu Dhabi guided tours",
            _id: "687dd2732f3815d399d34063",
          },
          {
            name: "Transfers",
            description: "Airport and intercity transfers",
            _id: "687dd2732f3815d399d34064",
          },
        ],
        createdAt: "2025-07-21T05:38:59.814Z",
        updatedAt: "2025-07-21T05:38:59.814Z",
        __v: 0,
      },
      {
        _id: "687e5b8a2f3815d399d3411c",
        themeId: {
          _id: "687b5abcd57f7528ad18c671",
          name: "Beach Theme",
          image:
            "https://res.cloudinary.com/dsulwdnj2/image/upload/v1752914620/themes/1752914619372-istockphoto-1604863709-612x612.jpg.jpg",
          createdAt: "2025-07-19T08:43:40.892Z",
          updatedAt: "2025-07-19T08:43:40.892Z",
          __v: 0,
        },
        is_domestic_international: "1",
        tourImages: [
          "http://api.stellarinternational.co.in/uploads/1753111434325-andaman-nicobar-island-2.jpg",
          "http://api.stellarinternational.co.in/uploads/1753111434325-Best-Places-to-Visit-in-Andaman.jpg",
          "http://api.stellarinternational.co.in/uploads/1753111434325-HOW+TO+REACH+Andaman+and+Nicobar+Islands.jpg",
          "http://api.stellarinternational.co.in/uploads/1753111434326-hqdefault.jpg",
          "http://api.stellarinternational.co.in/uploads/1753111434326-istockphoto-1604863709-612x612.jpg",
          "http://api.stellarinternational.co.in/uploads/1753111434326-MacBook Air - 1.png",
          "http://api.stellarinternational.co.in/uploads/1753111434327-pexels-erik-karits-5312140-scaled.jpg",
        ],
        name: "Andman Nikobar",
        description: "Andman Nikobar",
        duration: "6 Days / 5 Nights",
        locations: [
          {
            name: "Andman Nikobar",
            image: "",
            description: "",
            _id: "687e5b8a2f3815d399d3411d",
          },
          {
            name: "Havelock Activities",
            image: "",
            description: "",
            _id: "687e5b8a2f3815d399d3411e",
          },
        ],
        services: [
          {
            name: "Best Flights",
            description:
              "Engrossed listening. Park gate sell they west hard for the",
            _id: "687e5b8a2f3815d399d3411f",
          },
          {
            name: "Accommodation",
            description:
              "Engrossed listening. Park gate sell they west hard for the",
            _id: "687e5b8a2f3815d399d34120",
          },
          {
            name: "Food & Dining",
            description:
              "Engrossed listening. Park gate sell they west hard for the",
            _id: "687e5b8a2f3815d399d34121",
          },
        ],
        createdAt: "2025-07-21T15:23:54.339Z",
        updatedAt: "2025-07-21T15:23:54.339Z",
        __v: 0,
      },
      {
        _id: "687e5f5b2f3815d399d3449b",
        themeId: {
          _id: "687b5abcd57f7528ad18c671",
          name: "Beach Theme",
          image:
            "https://res.cloudinary.com/dsulwdnj2/image/upload/v1752914620/themes/1752914619372-istockphoto-1604863709-612x612.jpg.jpg",
          createdAt: "2025-07-19T08:43:40.892Z",
          updatedAt: "2025-07-19T08:43:40.892Z",
          __v: 0,
        },
        is_domestic_international: "1",
        tourImages: [],
        name: "Andman Nikobar",
        description: "Andman Nikobar",
        duration: "6 Days / 5 Nights",
        locations: [
          {
            name: "fdbbf",
            description: "",
            _id: "687fa8602f3815d399d34ee0",
          },
        ],
        services: [
          {
            name: "Best Flights",
            description:
              "Engrossed listening. Park gate sell they west hard for the",
            _id: "687fa8602f3815d399d34edd",
          },
          {
            name: "Accommodation",
            description:
              "Engrossed listening. Park gate sell they west hard for the",
            _id: "687fa8602f3815d399d34ede",
          },
          {
            name: "Food & Dining",
            description:
              "Engrossed listening. Park gate sell they west hard for the",
            _id: "687fa8602f3815d399d34edf",
          },
        ],
        createdAt: "2025-07-21T15:40:11.941Z",
        updatedAt: "2025-07-22T15:04:00.880Z",
        __v: 0,
      },
      {
        _id: "687f50332f3815d399d34d6a",
        themeId: {
          _id: "6879e5d7702d9b629f9a19ab",
          name: "Dubai Theme",
          image:
            "https://res.cloudinary.com/dsulwdnj2/image/upload/v1752819159/themes/1752819154926-dubai_theme.jpg.jpg",
          createdAt: "2025-07-18T06:12:39.744Z",
          updatedAt: "2025-07-18T06:12:39.744Z",
          __v: 0,
        },
        is_domestic_international: "2",
        tourImages: [],
        name: "DUBAI WITH ABU DHABI",
        description:
          "Explore Dubai and Abu Dhabi with a luxurious 7-day / 6-night experience including major attractions and activities.",
        duration: "7 Days / 6 Nights",
        locations: [
          {
            name: "Dubai Airport",
            image: "dubai_12345234325_airport.jpg",
            description: "Arrival transfer and breakfast on 1 Hr Yacht",
            _id: "687f50332f3815d399d34d6b",
          },
          {
            name: "Dubai City",
            image: "dubai_city_23456785.jpg",
            description:
              "Half Day City Tour, Monorail & Burj Khalifa 124th Floor (Non-Prime)",
            _id: "687f50332f3815d399d34d6c",
          },
          {
            name: "Desert Safari",
            image: "dubai_Desert Safari_142535.jpg",
            description: "Premium Desert Safari with BBQ Dinner",
            _id: "687f50332f3815d399d34d6d",
          },
          {
            name: "Miracle Garden",
            image: "dubai_miracle_garden_36245.jpg",
            description: "Visit to Miracle Garden and Global Village",
            _id: "687f50332f3815d399d34d6e",
          },
          {
            name: "Abu Dhabi",
            image: "abudhabi_737445.jpg",
            description: "City Tour including BAPS Mandir & Grand Mosque",
            _id: "687f50332f3815d399d34d6f",
          },
          {
            name: "Dubai Shopping",
            image: "dubai_shopping_366384.jpg",
            description: "Shopping Tour",
            _id: "687f50332f3815d399d34d70",
          },
          {
            name: "Dubai Airport - return",
            image: "dubai_12345234325_airport.jpg",
            description: "Departure transfer to airport",
            _id: "687f50332f3815d399d34d71",
          },
        ],
        services: [
          {
            name: "Flight",
            description: "Return airfare",
            _id: "687f50332f3815d399d34d72",
          },
          {
            name: "Hotel",
            description: "4-star hotel accommodation",
            _id: "687f50332f3815d399d34d73",
          },
          {
            name: "City Tour",
            description: "Dubai and Abu Dhabi guided tours",
            _id: "687f50332f3815d399d34d74",
          },
          {
            name: "Transfers",
            description: "Airport and intercity transfers",
            _id: "687f50332f3815d399d34d75",
          },
        ],
        createdAt: "2025-07-22T08:47:47.925Z",
        updatedAt: "2025-07-22T08:47:47.925Z",
        __v: 0,
      },
    ],
    packageDetail: {},
  },
  action
) => {
  switch (action.type) {
    case "GET_PACKAGE":
      return {
        ...state,
        packages: action.payload,
      };
    case "GET_PACKAGE_DETAIL":
      return {
        ...state,
        packageDetail: action.payload,
      };
    case "CLEAR_DATA":
      return {
        ...state,
        theme: {},
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: combineReducers({
    error: errorReducer,
    loading: loadingReducer,
    msg: msgReducer,
    theme: ThemeReducer,
    package: PacakgeReducer,
  }),
});

export default store;
