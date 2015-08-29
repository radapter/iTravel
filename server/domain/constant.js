var activitiesType = {
  ATTRACTIONS:'attractions',
  RESTAURANTS:'restaurants',
};

var section = {
  ARTS: 'arts',
  SIGHTS: 'sights',
  OUTDOORS: 'outdoors',
  FOOD: 'food',
};

var schedule = [
  {
    activitiesType:activitiesType.ATTRACTIONS,
    start:new Date(1970, 0, 1, 8, 0, 0),
    end:new Date(1970, 0, 1, 9, 30, 0)
  },
  {
    activitiesType:activitiesType.ATTRACTIONS,
    start:new Date(1970, 0, 1, 10, 0, 0),
    end:new Date(1970, 0, 1, 11, 30, 0)
  },
  {
    activitiesType:activitiesType.RESTAURANTS,
    start:new Date(1970, 0, 1, 12, 0, 0),
    end:new Date(1970, 0, 1, 13, 30, 0)
  },
  {
    activitiesType:activitiesType.ATTRACTIONS,
    start:new Date(1970, 0, 1, 14, 0, 0),
    end:new Date(1970, 0, 1, 15, 30, 0)
  },
  {
    activitiesType:activitiesType.ATTRACTIONS,
    start:new Date(1970, 0, 1, 16, 0, 0),
    end:new Date(1970, 0, 1, 17, 30, 0)
  },
  {
    activitiesType:activitiesType.RESTAURANTS,
    start:new Date(1970, 0, 1, 18, 0, 0),
    end:new Date(1970, 0, 1, 19, 30, 0)
  }
];

var CONST = {
  ActivitiesType: activitiesType,
  SCHEDULE: schedule,
  SECTION: section,
}

module.exports = CONST;
