(function() {
    'use strict';

    angular.module("iTravelApp")
        .controller("VenuesShowCtrl", function ($scope, Venue, $routeParams) {

            //request GET venue from venue service
            //Venue.find($routeParams.id)
            //    .success(function (data) {
            //        console.log("get user "+ $routeParams.id+ " success");
            //        console.log(data);
            //        $scope.user = data;
            //    });

            $scope.venue = {
                "id": "428a8580f964a52098231fe3",
                "name": "Children's Discovery Museum of San Jose",
                "contact": {
                    "phone": "4082985437",
                    "formattedPhone": "(408) 298-5437",
                    "twitter": "cdmsj"
                },
                "location": {
                    "address": "180 Woz Way",
                    "crossStreet": "at W San Carlos",
                    "lat": 37.32669336901266,
                    "lng": -121.89192652702332,
                    "postalCode": "95110",
                    "cc": "US",
                    "city": "San Jose",
                    "state": "CA",
                    "country": "United States",
                    "formattedAddress": [
                        "180 Woz Way (at W San Carlos)",
                        "San Jose, CA 95110",
                        "United States"
                    ]
                },
                "canonicalUrl": "https://foursquare.com/v/childrens-discovery-museum-of-san-jose/428a8580f964a52098231fe3",
                "categories": [
                    {
                        "id": "4bf58dd8d48988d181941735",
                        "name": "Museum",
                        "pluralName": "Museums",
                        "shortName": "Museum",
                        "icon": {
                            "prefix": "https://ss3.4sqi.net/img/categories_v2/arts_entertainment/museum_",
                            "suffix": ".png"
                        },
                        "primary": true
                    },
                    {
                        "id": "4bf58dd8d48988d1e7941735",
                        "name": "Playground",
                        "pluralName": "Playgrounds",
                        "shortName": "Playground",
                        "icon": {
                            "prefix": "https://ss3.4sqi.net/img/categories_v2/parks_outdoors/playground_",
                            "suffix": ".png"
                        }
                    },
                    {
                        "id": "4bf58dd8d48988d15a941735",
                        "name": "Garden",
                        "pluralName": "Gardens",
                        "shortName": "Garden",
                        "icon": {
                            "prefix": "https://ss3.4sqi.net/img/categories_v2/parks_outdoors/garden_",
                            "suffix": ".png"
                        }
                    }
                ],
                "verified": true,
                "stats": {
                    "checkinsCount": 3702,
                    "usersCount": 2556,
                    "tipCount": 39,
                    "visitsCount": 4307
                },
                "url": "http://www.cdm.org",
                "likes": {
                    "count": 85,
                    "groups": [
                        {
                            "type": "others",
                            "count": 85,
                            "items": []
                        }
                    ],
                    "summary": "85 Likes"
                },
                "dislike": false,
                "ok": false,
                "rating": 9.2,
                "ratingColor": "00B551",
                "ratingSignals": 107,
                "specials": {
                    "count": 1,
                    "items": [
                        {
                            "id": "5386792111d2221ff0a2a991",
                            "type": "frequency",
                            "message": "$5 off your order.  \nClink link here:   http://offrz.co/s/ZYKF8Q/",
                            "photo": {
                                "id": "51fc8252498e60e2a154c2ed",
                                "createdAt": 1375502930,
                                "prefix": "https://irs3.4sqi.net/img/general/",
                                "suffix": "/25816819_iG477cANao7UyuyhoXo9XJ3VdGl3M5TPE_5SGRASTpw.jpg",
                                "width": 720,
                                "height": 960
                            },
                            "description": "",
                            "unlocked": true,
                            "icon": "default",
                            "title": "Special",
                            "state": "unlocked",
                            "provider": "foursquare",
                            "redemption": "webview",
                            "interaction": {
                                "entryUrl": "https://foursquare.com/device/specials/5386792111d2221ff0a2a991?venueId=49bee4cff964a520ef541fe3"
                            },
                            "page": {
                                "id": "36582113",
                                "firstName": "Firehouse No. 1 Gastropub",
                                "gender": "none",
                                "photo": {
                                    "prefix": "https://irs1.4sqi.net/img/user/",
                                    "suffix": "/36582113-LJBB3GQVTZ4INCB3.png"
                                },
                                "type": "venuePage",
                                "venue": {
                                    "id": "49bee4cff964a520ef541fe3"
                                },
                                "tips": {
                                    "count": 6
                                },
                                "homeCity": "San Jose, CA",
                                "bio": "",
                                "contact": {}
                            },
                            "likes": {
                                "count": 2,
                                "groups": [
                                    {
                                        "type": "others",
                                        "count": 2,
                                        "items": [
                                            {
                                                "id": "63113244",
                                                "firstName": "Kevin",
                                                "lastName": "Pratt",
                                                "gender": "male",
                                                "photo": {
                                                    "prefix": "https://irs3.4sqi.net/img/user/",
                                                    "suffix": "/3RATXTE5C34J0J0D.jpg"
                                                }
                                            },
                                            {
                                                "id": "1309202",
                                                "firstName": "Ron",
                                                "lastName": "Gastrock",
                                                "gender": "male",
                                                "photo": {
                                                    "prefix": "https://irs3.4sqi.net/img/user/",
                                                    "suffix": "/20PFY01YIDN5DMR2.jpg"
                                                }
                                            }
                                        ]
                                    }
                                ],
                                "summary": "2 Likes"
                            }
                        }
                    ]
                },
                "photos": {
                    "count": 304,
                    "groups": [
                        {
                            "type": "venue",
                            "name": "Venue photos",
                            "count": 304,
                            "items": [
                                {
                                    "id": "4f53c1a5e4b0ef9672e71f2a",
                                    "createdAt": 1330889125,
                                    "source": {
                                        "name": "Foursquare for iOS",
                                        "url": "https://foursquare.com/download/#/iphone"
                                    },
                                    "prefix": "https://irs2.4sqi.net/img/general/",
                                    "suffix": "/GGxLzXnDJmQlWTyQ8RinSRRL_kaWdx2iQBQPrzXF3SY.jpg",
                                    "width": 720,
                                    "height": 537,
                                    "user": {
                                        "id": "9004763",
                                        "firstName": "Yuichi",
                                        "lastName": "Tawara",
                                        "gender": "male",
                                        "photo": {
                                            "prefix": "https://irs0.4sqi.net/img/user/",
                                            "suffix": "/IULMR44TEKUF4F0U.jpg"
                                        }
                                    },
                                    "visibility": "public"
                                },
                                {
                                    "id": "4fd914d2e4b06452aa2a16f7",
                                    "createdAt": 1339626706,
                                    "source": {
                                        "name": "Foursquare for iOS",
                                        "url": "https://foursquare.com/download/#/iphone"
                                    },
                                    "prefix": "https://irs3.4sqi.net/img/general/",
                                    "suffix": "/5rA-GsobroXtjNTY502QLS7bcsEUlWAaKC6dyB_KHj4.jpg",
                                    "width": 720,
                                    "height": 540,
                                    "user": {
                                        "id": "28812729",
                                        "firstName": "Ulyana",
                                        "lastName": "Zilch",
                                        "gender": "female",
                                        "photo": {
                                            "prefix": "https://irs3.4sqi.net/img/user/",
                                            "suffix": "/JSXG0QNRLZATIKGS.jpg"
                                        }
                                    },
                                    "visibility": "public"
                                },
                                {
                                    "id": "4e1b555fb61cda006c7e62a8",
                                    "createdAt": 1310414175,
                                    "source": {
                                        "name": "Foursquare for iOS",
                                        "url": "https://foursquare.com/download/#/iphone"
                                    },
                                    "prefix": "https://irs1.4sqi.net/img/general/",
                                    "suffix": "/SNCUWPW51OTSYH0T2ZQP3R40MU3RSC22JOTXLJCRYS0NI1CZ.jpg",
                                    "width": 720,
                                    "height": 537,
                                    "user": {
                                        "id": "5633690",
                                        "firstName": "nikki",
                                        "lastName": "Trevino",
                                        "gender": "female",
                                        "photo": {
                                            "prefix": "https://irs3.4sqi.net/img/user/",
                                            "suffix": "/O3AU5X0VQECES323.jpg"
                                        }
                                    },
                                    "visibility": "public"
                                },
                                {
                                    "id": "514f7c83e4b08d282387c300",
                                    "createdAt": 1364163715,
                                    "source": {
                                        "name": "Foursquare for iOS",
                                        "url": "https://foursquare.com/download/#/iphone"
                                    },
                                    "prefix": "https://irs0.4sqi.net/img/general/",
                                    "suffix": "/51100796_PterPVzmOGyf88SDQxOP1Sc6FaLmDY8vkf2NetGXoDA.jpg",
                                    "width": 720,
                                    "height": 960,
                                    "user": {
                                        "id": "51100796",
                                        "firstName": "Brian",
                                        "lastName": "Duncan",
                                        "gender": "male",
                                        "photo": {
                                            "prefix": "https://irs2.4sqi.net/img/user/",
                                            "suffix": "/51100796-WQ0DLKOYI3G1FPMI.jpg"
                                        }
                                    },
                                    "visibility": "public"
                                },
                                {
                                    "id": "50c2a6b0e4b02085d69719e4",
                                    "createdAt": 1354933936,
                                    "source": {
                                        "name": "Instagram",
                                        "url": "http://instagram.com"
                                    },
                                    "prefix": "https://irs2.4sqi.net/img/general/",
                                    "suffix": "/533279_7Q3w4dsjMjb9hAr-r3_W8XnPHSZd25PoIbNGXqL6drY.jpg",
                                    "width": 612,
                                    "height": 612,
                                    "user": {
                                        "id": "533279",
                                        "firstName": "Ron",
                                        "lastName": "Kashani",
                                        "gender": "male",
                                        "photo": {
                                            "prefix": "https://irs0.4sqi.net/img/user/",
                                            "suffix": "/ZW0LSKR5J3KFXBN1.jpg"
                                        }
                                    },
                                    "visibility": "public"
                                },
                                {
                                    "id": "4e07814ffd282d90dde45afb",
                                    "createdAt": 1309114703,
                                    "source": {
                                        "name": "Foursquare for iOS",
                                        "url": "https://foursquare.com/download/#/iphone"
                                    },
                                    "prefix": "https://irs2.4sqi.net/img/general/",
                                    "suffix": "/WEB0MIWECH0YDD1RRFRFRKWKHXVJMGM2U0GS1X2E4LVOPVCI.jpg",
                                    "width": 720,
                                    "height": 537,
                                    "user": {
                                        "id": "49623",
                                        "firstName": "Antonio",
                                        "lastName": "Silveira",
                                        "gender": "male",
                                        "photo": {
                                            "prefix": "https://irs3.4sqi.net/img/user/",
                                            "suffix": "/XFMCQYOJRSGCKG55.jpg"
                                        }
                                    },
                                    "visibility": "public"
                                }
                            ]
                        }
                    ]
                },
                "hereNow": {
                    "count": 1,
                    "summary": "One person is checked in here",
                    "groups": [
                        {
                            "type": "others",
                            "name": "Other people here",
                            "count": 1,
                            "items": []
                        }
                    ]
                },
                "reasons": {
                    "count": 1,
                    "items": [
                        {
                            "summary": "Lots of people like this place",
                            "type": "general",
                            "reasonName": "rawLikesReason"
                        }
                    ]
                },
                "description": "Visit Children's Discovery Museum of San Jose where you can expect to test, crank, listen, prod and tinker. One of the largest museums of its kind in the nation, CDM's 150 interactive exhibits lead visitors to explore, understand and enjoy the world.",
                "createdAt": 1116374400,
                "tips": {
                    "count": 38,
                    "groups": [
                        {
                            "type": "others",
                            "name": "All tips",
                            "count": 39,
                            "items": [
                                {
                                    "id": "4abe884e70c603bb7e838eb4",
                                    "createdAt": 1254000718,
                                    "text": "bring your younger kids here and make sure you have a change of clothes for the water tables!",
                                    "type": "user",
                                    "canonicalUrl": "https://foursquare.com/item/4abe884e70c603bb7e838eb4",
                                    "likes": {
                                        "count": 10,
                                        "groups": [
                                            {
                                                "type": "others",
                                                "count": 10,
                                                "items": []
                                            }
                                        ],
                                        "summary": "10 likes"
                                    },
                                    "logView": true,
                                    "todo": {
                                        "count": 1
                                    },
                                    "user": {
                                        "id": "16135",
                                        "firstName": "Lynette",
                                        "lastName": "Miles",
                                        "gender": "female",
                                        "photo": {
                                            "prefix": "https://irs2.4sqi.net/img/user/",
                                            "suffix": "/4a49179de3b7a.png"
                                        }
                                    }
                                },
                                {
                                    "id": "4cab6fab76d3a09392362c6b",
                                    "createdAt": 1286303659,
                                    "text": "Take the light rail instead of paying $5 for parking",
                                    "type": "user",
                                    "canonicalUrl": "https://foursquare.com/item/4cab6fab76d3a09392362c6b",
                                    "likes": {
                                        "count": 4,
                                        "groups": [
                                            {
                                                "type": "others",
                                                "count": 4,
                                                "items": []
                                            }
                                        ],
                                        "summary": "4 likes"
                                    },
                                    "logView": true,
                                    "todo": {
                                        "count": 0
                                    },
                                    "user": {
                                        "id": "3693552",
                                        "firstName": "James",
                                        "lastName": "Chung",
                                        "gender": "male",
                                        "photo": {
                                            "prefix": "https://irs0.4sqi.net/img/user/",
                                            "suffix": "/GBIB5FC3VPAEDB2R.jpg"
                                        }
                                    }
                                },
                                {
                                    "id": "4b46c5bb70c603bb020b90b4",
                                    "createdAt": 1262929339,
                                    "text": "Be sure to bring a crisp $5 bill for parking.",
                                    "type": "user",
                                    "url": "http://www.cdm.org/index.asp?f=1",
                                    "canonicalUrl": "https://foursquare.com/item/4b46c5bb70c603bb020b90b4",
                                    "likes": {
                                        "count": 4,
                                        "groups": [
                                            {
                                                "type": "others",
                                                "count": 4,
                                                "items": []
                                            }
                                        ],
                                        "summary": "4 likes"
                                    },
                                    "logView": true,
                                    "todo": {
                                        "count": 1
                                    },
                                    "user": {
                                        "id": "99072",
                                        "firstName": "Kira",
                                        "lastName": "Wampler",
                                        "gender": "female",
                                        "photo": {
                                            "prefix": "https://irs3.4sqi.net/img/user/",
                                            "suffix": "/-1_1258406666818.png"
                                        }
                                    }
                                },
                                {
                                    "id": "4b07f0b570c603bbc7fc8eb4",
                                    "createdAt": 1258811573,
                                    "text": "On the second floor there is a Crawl Space for babies, with interesting textures and things to crawl over. One parent can stay with the younger child while the other parent goes with the older.",
                                    "type": "user",
                                    "canonicalUrl": "https://foursquare.com/item/4b07f0b570c603bbc7fc8eb4",
                                    "likes": {
                                        "count": 3,
                                        "groups": [
                                            {
                                                "type": "others",
                                                "count": 3,
                                                "items": [
                                                    {
                                                        "id": "16478536",
                                                        "firstName": "Zack",
                                                        "lastName": "Garban",
                                                        "gender": "male",
                                                        "photo": {
                                                            "prefix": "https://irs0.4sqi.net/img/user/",
                                                            "suffix": "/Z240WTLVSOARE1WT.jpg"
                                                        }
                                                    }
                                                ]
                                            }
                                        ],
                                        "summary": "3 likes"
                                    },
                                    "logView": true,
                                    "todo": {
                                        "count": 0
                                    },
                                    "user": {
                                        "id": "24536",
                                        "firstName": "Denton",
                                        "lastName": "Gentry",
                                        "gender": "male",
                                        "photo": {
                                            "prefix": "https://irs2.4sqi.net/img/user/",
                                            "suffix": "/4a6c83b378486.jpg"
                                        }
                                    }
                                },
                                {
                                    "id": "53551b5a498ea2a728eec1c1",
                                    "createdAt": 1398086490,
                                    "text": "WATER ZONE!  Do it last, or bring a change of clothes.  Let the kids play!",
                                    "type": "user",
                                    "canonicalUrl": "https://foursquare.com/item/53551b5a498ea2a728eec1c1",
                                    "likes": {
                                        "count": 2,
                                        "groups": [
                                            {
                                                "type": "others",
                                                "count": 2,
                                                "items": [
                                                    {
                                                        "id": "21439886",
                                                        "firstName": "Zafer",
                                                        "lastName": "Z",
                                                        "gender": "male",
                                                        "photo": {
                                                            "prefix": "https://irs0.4sqi.net/img/user/",
                                                            "suffix": "/J2LQTYNFY3KJZP3G.jpg"
                                                        }
                                                    },
                                                    {
                                                        "id": "84483380",
                                                        "firstName": "Monty",
                                                        "lastName": "Krish",
                                                        "gender": "male",
                                                        "photo": {
                                                            "prefix": "https://irs0.4sqi.net/img/user/",
                                                            "suffix": "/blank_boy.png",
                                                            "default": true
                                                        }
                                                    }
                                                ]
                                            }
                                        ],
                                        "summary": "2 likes"
                                    },
                                    "logView": true,
                                    "todo": {
                                        "count": 0
                                    },
                                    "user": {
                                        "id": "735076",
                                        "firstName": "Chris",
                                        "lastName": "Alston",
                                        "gender": "male",
                                        "photo": {
                                            "prefix": "https://irs2.4sqi.net/img/user/",
                                            "suffix": "/UJ55USH1FU3S0AWZ.jpg"
                                        }
                                    }
                                },
                                {
                                    "id": "50e9ca62e4b0b7b9732f97b5",
                                    "createdAt": 1357498978,
                                    "text": "Sundays members only hour. 11am-12pm.  Awesome!",
                                    "type": "user",
                                    "canonicalUrl": "https://foursquare.com/item/50e9ca62e4b0b7b9732f97b5",
                                    "likes": {
                                        "count": 2,
                                        "groups": [
                                            {
                                                "type": "others",
                                                "count": 2,
                                                "items": [
                                                    {
                                                        "id": "4068",
                                                        "firstName": "Bryan",
                                                        "lastName": "Calabrese",
                                                        "gender": "male",
                                                        "photo": {
                                                            "prefix": "https://irs3.4sqi.net/img/user/",
                                                            "suffix": "/4068_1255370322771.jpg"
                                                        }
                                                    },
                                                    {
                                                        "id": "54132939",
                                                        "firstName": "Jenny",
                                                        "lastName": "Down the Block",
                                                        "gender": "female",
                                                        "photo": {
                                                            "prefix": "https://irs1.4sqi.net/img/user/",
                                                            "suffix": "/WANR0KUCFYQRKGEZ.jpg"
                                                        }
                                                    }
                                                ]
                                            }
                                        ],
                                        "summary": "2 likes"
                                    },
                                    "logView": true,
                                    "todo": {
                                        "count": 0
                                    },
                                    "user": {
                                        "id": "4068",
                                        "firstName": "Bryan",
                                        "lastName": "Calabrese",
                                        "gender": "male",
                                        "photo": {
                                            "prefix": "https://irs3.4sqi.net/img/user/",
                                            "suffix": "/4068_1255370322771.jpg"
                                        }
                                    }
                                },
                                {
                                    "id": "50b99894e4b077f48cdda9a9",
                                    "createdAt": 1354340500,
                                    "text": "In addition to a change of clothes, bring galoshes or water shoes, or just another pair of shoes, so kids don't have to wear soaked sneakers home.",
                                    "type": "user",
                                    "canonicalUrl": "https://foursquare.com/item/50b99894e4b077f48cdda9a9",
                                    "likes": {
                                        "count": 2,
                                        "groups": [
                                            {
                                                "type": "others",
                                                "count": 2,
                                                "items": [
                                                    {
                                                        "id": "12153804",
                                                        "firstName": "Sarah",
                                                        "lastName": "Fowler",
                                                        "gender": "female",
                                                        "photo": {
                                                            "prefix": "https://irs2.4sqi.net/img/user/",
                                                            "suffix": "/12153804-IN22KAD2QMNUHJBD.jpg"
                                                        }
                                                    },
                                                    {
                                                        "id": "248301",
                                                        "firstName": "Kyle",
                                                        "lastName": "Fowler",
                                                        "gender": "male",
                                                        "photo": {
                                                            "prefix": "https://irs1.4sqi.net/img/user/",
                                                            "suffix": "/VNMYRE0CPV2HYTUD.jpg"
                                                        }
                                                    }
                                                ]
                                            }
                                        ],
                                        "summary": "2 likes"
                                    },
                                    "logView": true,
                                    "todo": {
                                        "count": 0
                                    },
                                    "user": {
                                        "id": "41284",
                                        "firstName": "Ashley",
                                        "lastName": "Richards",
                                        "gender": "female",
                                        "photo": {
                                            "prefix": "https://irs1.4sqi.net/img/user/",
                                            "suffix": "/4aa716deda275.jpg"
                                        }
                                    }
                                },
                                {
                                    "id": "4e665eaf1850e238d7212eff",
                                    "createdAt": 1315331759,
                                    "text": "Sure to become a favorite, learn and play as a family here – this educational, creative museum helps your kids discover the meaning of community and culture.",
                                    "type": "user",
                                    "canonicalUrl": "https://foursquare.com/item/4e665eaf1850e238d7212eff",
                                    "likes": {
                                        "count": 2,
                                        "groups": [
                                            {
                                                "type": "others",
                                                "count": 2,
                                                "items": [
                                                    {
                                                        "id": "73354769",
                                                        "firstName": "Simone",
                                                        "lastName": "Santini",
                                                        "gender": "female",
                                                        "photo": {
                                                            "prefix": "https://irs0.4sqi.net/img/user/",
                                                            "suffix": "/73354769-BEXCP2N2VAIDLEJC.jpg"
                                                        }
                                                    },
                                                    {
                                                        "id": "15656772",
                                                        "firstName": "Gem",
                                                        "lastName": "E",
                                                        "gender": "female",
                                                        "photo": {
                                                            "prefix": "https://irs1.4sqi.net/img/user/",
                                                            "suffix": "/D1L2GHPMEPB4HVJL.jpg"
                                                        }
                                                    }
                                                ]
                                            }
                                        ],
                                        "summary": "2 likes"
                                    },
                                    "logView": true,
                                    "todo": {
                                        "count": 0
                                    },
                                    "user": {
                                        "id": "12642479",
                                        "firstName": "Yoplait",
                                        "gender": "none",
                                        "photo": {
                                            "prefix": "https://irs2.4sqi.net/img/user/",
                                            "suffix": "/LGPI3RWBSDD3XPZO.jpg"
                                        },
                                        "type": "page"
                                    }
                                },
                                {
                                    "id": "4d127acd058fa35d4923279f",
                                    "createdAt": 1293056717,
                                    "text": "do the water exhibit last because you will get soaking wet!",
                                    "type": "user",
                                    "canonicalUrl": "https://foursquare.com/item/4d127acd058fa35d4923279f",
                                    "likes": {
                                        "count": 2,
                                        "groups": [
                                            {
                                                "type": "others",
                                                "count": 2,
                                                "items": []
                                            }
                                        ],
                                        "summary": "2 likes"
                                    },
                                    "logView": true,
                                    "todo": {
                                        "count": 0
                                    },
                                    "user": {
                                        "id": "103020",
                                        "firstName": "Bob",
                                        "lastName": "Hitching",
                                        "gender": "male",
                                        "photo": {
                                            "prefix": "https://irs2.4sqi.net/img/user/",
                                            "suffix": "/X3NEAG0HI4SOBROS.jpg"
                                        }
                                    }
                                },
                                {
                                    "id": "4cb773b090c9a1438c8177d6",
                                    "createdAt": 1287091120,
                                    "text": "Weekdays r usu the best time to go. We have the entire museum to ourselves... And just a couple more families.",
                                    "type": "user",
                                    "canonicalUrl": "https://foursquare.com/item/4cb773b090c9a1438c8177d6",
                                    "likes": {
                                        "count": 2,
                                        "groups": [
                                            {
                                                "type": "others",
                                                "count": 2,
                                                "items": [
                                                    {
                                                        "id": "33436119",
                                                        "firstName": "Kim",
                                                        "lastName": "Possible",
                                                        "gender": "female",
                                                        "photo": {
                                                            "prefix": "https://irs0.4sqi.net/img/user/",
                                                            "suffix": "/33436119-HI3E24TL0IUZ0KHL.jpg"
                                                        }
                                                    }
                                                ]
                                            }
                                        ],
                                        "summary": "2 likes"
                                    },
                                    "logView": true,
                                    "todo": {
                                        "count": 0
                                    },
                                    "user": {
                                        "id": "3897400",
                                        "firstName": "Eddah",
                                        "lastName": "General",
                                        "gender": "female",
                                        "photo": {
                                            "prefix": "https://irs1.4sqi.net/img/user/",
                                            "suffix": "/22NOMAO0H30VQGJM.jpg"
                                        }
                                    }
                                },
                                {
                                    "id": "4b6727a770c603bb8a4b91b4",
                                    "createdAt": 1265051559,
                                    "text": "A great place for kids!",
                                    "type": "user",
                                    "canonicalUrl": "https://foursquare.com/item/4b6727a770c603bb8a4b91b4",
                                    "likes": {
                                        "count": 2,
                                        "groups": [
                                            {
                                                "type": "others",
                                                "count": 2,
                                                "items": []
                                            }
                                        ],
                                        "summary": "2 likes"
                                    },
                                    "logView": true,
                                    "todo": {
                                        "count": 0
                                    },
                                    "user": {
                                        "id": "162392",
                                        "firstName": "Jay",
                                        "lastName": "Zaveri",
                                        "gender": "male",
                                        "photo": {
                                            "prefix": "https://irs2.4sqi.net/img/user/",
                                            "suffix": "/FE0JDJLELCEWRMDS.png"
                                        }
                                    }
                                },
                                {
                                    "id": "52ddd46511d22d96051c83e1",
                                    "createdAt": 1390269541,
                                    "text": "Bring a change of clothes so they can really play in the water area!!",
                                    "type": "user",
                                    "canonicalUrl": "https://foursquare.com/item/52ddd46511d22d96051c83e1",
                                    "likes": {
                                        "count": 1,
                                        "groups": [
                                            {
                                                "type": "others",
                                                "count": 1,
                                                "items": [
                                                    {
                                                        "id": "16478536",
                                                        "firstName": "Zack",
                                                        "lastName": "Garban",
                                                        "gender": "male",
                                                        "photo": {
                                                            "prefix": "https://irs0.4sqi.net/img/user/",
                                                            "suffix": "/Z240WTLVSOARE1WT.jpg"
                                                        }
                                                    }
                                                ]
                                            }
                                        ],
                                        "summary": "1 like"
                                    },
                                    "logView": true,
                                    "todo": {
                                        "count": 0
                                    },
                                    "user": {
                                        "id": "33596670",
                                        "firstName": "Jill",
                                        "gender": "female",
                                        "photo": {
                                            "prefix": "https://irs2.4sqi.net/img/user/",
                                            "suffix": "/HRUMZCIDDK5JWIYD.jpg"
                                        }
                                    }
                                },
                                {
                                    "id": "4e4ee591091a58b84843aa98",
                                    "createdAt": 1313793425,
                                    "text": "Did you know? The museum’s address on Woz Way is a tribute to Apple co-founder Steve Wozniak, who donated $1.8 million to help found the museum.",
                                    "type": "user",
                                    "url": "http://ow.ly/67ZIR",
                                    "canonicalUrl": "https://foursquare.com/item/4e4ee591091a58b84843aa98",
                                    "likes": {
                                        "count": 1,
                                        "groups": [
                                            {
                                                "type": "others",
                                                "count": 1,
                                                "items": [
                                                    {
                                                        "id": "50748871",
                                                        "firstName": "Stephanie",
                                                        "lastName": "Eldridge",
                                                        "gender": "female",
                                                        "photo": {
                                                            "prefix": "https://irs1.4sqi.net/img/user/",
                                                            "suffix": "/IOXEKZOJ1EQBE2RA.jpg"
                                                        }
                                                    }
                                                ]
                                            }
                                        ],
                                        "summary": "1 like"
                                    },
                                    "logView": true,
                                    "todo": {
                                        "count": 0
                                    },
                                    "user": {
                                        "id": "8593075",
                                        "firstName": "K12 Inc",
                                        "gender": "none",
                                        "photo": {
                                            "prefix": "https://irs3.4sqi.net/img/user/",
                                            "suffix": "/3FW1P4XLUMUDEN0S.jpg"
                                        },
                                        "type": "page"
                                    }
                                },
                                {
                                    "id": "4e4a0234d22d876aed14ec2e",
                                    "createdAt": 1313473076,
                                    "text": "This beloved children's science center boasts a separate floor for preschoolers! There's even a special playroom so small babies can explore soft toys and carpeted ramps just for them.",
                                    "type": "user",
                                    "canonicalUrl": "https://foursquare.com/item/4e4a0234d22d876aed14ec2e",
                                    "likes": {
                                        "count": 1,
                                        "groups": [
                                            {
                                                "type": "others",
                                                "count": 1,
                                                "items": []
                                            }
                                        ],
                                        "summary": "1 like"
                                    },
                                    "logView": true,
                                    "todo": {
                                        "count": 0
                                    },
                                    "user": {
                                        "id": "12403223",
                                        "firstName": "Citrus Lane",
                                        "gender": "none",
                                        "photo": {
                                            "prefix": "https://irs0.4sqi.net/img/user/",
                                            "suffix": "/FD4QPQZJIUE50KVQ.gif"
                                        },
                                        "type": "page"
                                    }
                                },
                                {
                                    "id": "4e0e0ce7c65ba20da21c5e06",
                                    "createdAt": 1309543655,
                                    "text": "Lots of field trips on Friday mornings.",
                                    "type": "user",
                                    "canonicalUrl": "https://foursquare.com/item/4e0e0ce7c65ba20da21c5e06",
                                    "likes": {
                                        "count": 1,
                                        "groups": [
                                            {
                                                "type": "others",
                                                "count": 1,
                                                "items": [
                                                    {
                                                        "id": "850062",
                                                        "firstName": "Thomas",
                                                        "lastName": "Pfau",
                                                        "gender": "male",
                                                        "photo": {
                                                            "prefix": "https://irs0.4sqi.net/img/user/",
                                                            "suffix": "/0P20OPL0XKSP12VO.jpg"
                                                        }
                                                    }
                                                ]
                                            }
                                        ],
                                        "summary": "1 like"
                                    },
                                    "logView": true,
                                    "todo": {
                                        "count": 0
                                    },
                                    "user": {
                                        "id": "992060",
                                        "firstName": "Kelly",
                                        "lastName": "H",
                                        "gender": "male",
                                        "photo": {
                                            "prefix": "https://irs3.4sqi.net/img/user/",
                                            "suffix": "/IIGQRH4YYRT4U0NK.jpg"
                                        }
                                    }
                                },
                                {
                                    "id": "4d8649895ad3a093883ff6fd",
                                    "createdAt": 1300646281,
                                    "text": "Members get in one hour early in Sundays.",
                                    "type": "user",
                                    "canonicalUrl": "https://foursquare.com/item/4d8649895ad3a093883ff6fd",
                                    "likes": {
                                        "count": 1,
                                        "groups": [
                                            {
                                                "type": "others",
                                                "count": 1,
                                                "items": []
                                            }
                                        ],
                                        "summary": "1 like"
                                    },
                                    "logView": true,
                                    "todo": {
                                        "count": 0
                                    },
                                    "user": {
                                        "id": "99072",
                                        "firstName": "Kira",
                                        "lastName": "Wampler",
                                        "gender": "female",
                                        "photo": {
                                            "prefix": "https://irs3.4sqi.net/img/user/",
                                            "suffix": "/-1_1258406666818.png"
                                        }
                                    }
                                },
                                {
                                    "id": "4d34b0998250f04d35b007e1",
                                    "createdAt": 1295298713,
                                    "text": "Drive just past the first parking area and there is a second parking lot that takes Amex visa and mc",
                                    "type": "user",
                                    "canonicalUrl": "https://foursquare.com/item/4d34b0998250f04d35b007e1",
                                    "likes": {
                                        "count": 1,
                                        "groups": [
                                            {
                                                "type": "others",
                                                "count": 1,
                                                "items": []
                                            }
                                        ],
                                        "summary": "1 like"
                                    },
                                    "logView": true,
                                    "todo": {
                                        "count": 0
                                    },
                                    "user": {
                                        "id": "591323",
                                        "firstName": "Tawana",
                                        "lastName": "Burnett",
                                        "gender": "female",
                                        "photo": {
                                            "prefix": "https://irs0.4sqi.net/img/user/",
                                            "suffix": "/YCS4LCTY3BIFCG42.jpg"
                                        }
                                    }
                                },
                                {
                                    "id": "4d34a8abc6cba35db075357a",
                                    "createdAt": 1295296683,
                                    "text": "or bring a crisp $10 and get 5 $1 coins in return",
                                    "type": "user",
                                    "canonicalUrl": "https://foursquare.com/item/4d34a8abc6cba35db075357a",
                                    "likes": {
                                        "count": 1,
                                        "groups": [
                                            {
                                                "type": "others",
                                                "count": 1,
                                                "items": []
                                            }
                                        ],
                                        "summary": "1 like"
                                    },
                                    "logView": true,
                                    "todo": {
                                        "count": 0
                                    },
                                    "user": {
                                        "id": "229523",
                                        "firstName": "Joe",
                                        "lastName": "Murray",
                                        "gender": "male",
                                        "photo": {
                                            "prefix": "https://irs1.4sqi.net/img/user/",
                                            "suffix": "/D1ZZNMIOMSR1VHTK.jpg"
                                        }
                                    }
                                },
                                {
                                    "id": "54e1324b498e61cf48888a0c",
                                    "createdAt": 1424044619,
                                    "text": "Bring a change of cloth :-).. be careful lots of places to fall asleep. ..lol",
                                    "type": "user",
                                    "canonicalUrl": "https://foursquare.com/item/54e1324b498e61cf48888a0c",
                                    "photo": {
                                        "id": "54e1324d498ea94034da36e6",
                                        "createdAt": 1424044621,
                                        "source": {
                                            "name": "Foursquare for Android",
                                            "url": "https://foursquare.com/download/#/android"
                                        },
                                        "prefix": "https://irs2.4sqi.net/img/general/",
                                        "suffix": "/88272100_0l4q3vc8Bt3rd-aE-MUsV-Q0IQukgUVQgaIZiD5LaGc.jpg",
                                        "width": 2048,
                                        "height": 1152
                                    },
                                    "photourl": "https://irs2.4sqi.net/img/general/original/88272100_0l4q3vc8Bt3rd-aE-MUsV-Q0IQukgUVQgaIZiD5LaGc.jpg",
                                    "likes": {
                                        "count": 0,
                                        "groups": []
                                    },
                                    "logView": true,
                                    "todo": {
                                        "count": 0
                                    },
                                    "user": {
                                        "id": "88272100",
                                        "firstName": "Ray",
                                        "lastName": "Pollard",
                                        "gender": "male",
                                        "photo": {
                                            "prefix": "https://irs1.4sqi.net/img/user/",
                                            "suffix": "/88272100-QLW514FDUMGU32SM.jpg"
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                "tags": [
                    "children's museum",
                    "gallery",
                    "museum"
                ],
                "shortUrl": "http://4sq.com/71Uyde",
                "timeZone": "America/Los_Angeles",
                "listed": {
                    "count": 33,
                    "groups": [
                        {
                            "type": "others",
                            "name": "Lists from other people",
                            "count": 33,
                            "items": [
                                {
                                    "id": "50b174c6e4b078aafc3c5828",
                                    "name": "Things to do @ Bay Area",
                                    "description": "Enjoy this list of must-visit places in northern California/USA.",
                                    "type": "others",
                                    "user": {
                                        "id": "304557",
                                        "firstName": "Guilherme",
                                        "lastName": "Chapiewski",
                                        "gender": "male",
                                        "photo": {
                                            "prefix": "https://irs1.4sqi.net/img/user/",
                                            "suffix": "/2JENYQETW0444YSY.jpg"
                                        }
                                    },
                                    "editable": false,
                                    "public": true,
                                    "collaborative": false,
                                    "url": "/gchapiewski/list/things-to-do--bay-area",
                                    "canonicalUrl": "https://foursquare.com/gchapiewski/list/things-to-do--bay-area",
                                    "createdAt": 1353807046,
                                    "updatedAt": 1429424927,
                                    "photo": {
                                        "id": "4e7639f4d22d80eb338eb542",
                                        "createdAt": 1316370932,
                                        "prefix": "https://irs3.4sqi.net/img/general/",
                                        "suffix": "/HAFJMTICT0LFZFRUT5FVT5BWURE3RKZL231UE0M5XHZCKYON.jpg",
                                        "width": 460,
                                        "height": 345,
                                        "user": {
                                            "id": "3449515",
                                            "firstName": "Ginger",
                                            "lastName": "Pigott",
                                            "gender": "female",
                                            "photo": {
                                                "prefix": "https://irs3.4sqi.net/img/user/",
                                                "suffix": "/LKSNME14AYQLRLLX.jpg"
                                            }
                                        },
                                        "visibility": "public"
                                    },
                                    "followers": {
                                        "count": 56
                                    },
                                    "listItems": {
                                        "count": 174,
                                        "items": [
                                            {
                                                "id": "v428a8580f964a52098231fe3",
                                                "createdAt": 1353911687
                                            }
                                        ]
                                    }
                                },
                                {
                                    "id": "502297f5e4b048003e88b351",
                                    "name": "75 Geeky Places to Take Your Kids",
                                    "description": "Looking for places to take the geeklets? Here is a comprehensive list put together by Doug Cornelius of GEEKDAD.",
                                    "type": "others",
                                    "user": {
                                        "id": "17844782",
                                        "firstName": "Wired",
                                        "gender": "none",
                                        "photo": {
                                            "prefix": "https://irs3.4sqi.net/img/user/",
                                            "suffix": "/YWNCZNSUJBHKEGIW.png"
                                        },
                                        "type": "page"
                                    },
                                    "editable": false,
                                    "public": true,
                                    "collaborative": false,
                                    "url": "/p/wired/17844782/list/75-geeky-places-to-take-your-kids",
                                    "canonicalUrl": "https://foursquare.com/p/wired/17844782/list/75-geeky-places-to-take-your-kids",
                                    "createdAt": 1344444405,
                                    "updatedAt": 1373654689,
                                    "logView": true,
                                    "followers": {
                                        "count": 545
                                    },
                                    "listItems": {
                                        "count": 75,
                                        "items": [
                                            {
                                                "id": "t5022ab7ae4b0851f0d9e2b97",
                                                "createdAt": 1344449362
                                            }
                                        ]
                                    }
                                },
                                {
                                    "id": "4e666d9fd22de03c064fb9e8",
                                    "name": "California Strong Families",
                                    "description": "",
                                    "type": "others",
                                    "user": {
                                        "id": "12642479",
                                        "firstName": "Yoplait",
                                        "gender": "none",
                                        "photo": {
                                            "prefix": "https://irs2.4sqi.net/img/user/",
                                            "suffix": "/LGPI3RWBSDD3XPZO.jpg"
                                        },
                                        "type": "page"
                                    },
                                    "editable": false,
                                    "public": true,
                                    "collaborative": false,
                                    "url": "/yoplaityogurt/list/california-strong-families",
                                    "canonicalUrl": "https://foursquare.com/yoplaityogurt/list/california-strong-families",
                                    "createdAt": 1315335583,
                                    "updatedAt": 1340132025,
                                    "logView": true,
                                    "followers": {
                                        "count": 27
                                    },
                                    "listItems": {
                                        "count": 23,
                                        "items": [
                                            {
                                                "id": "t4e665eaf1850e238d7212eff",
                                                "createdAt": 1315335583
                                            }
                                        ]
                                    }
                                },
                                {
                                    "id": "5005a2bfe4b0fce97182da64",
                                    "name": "local",
                                    "description": "",
                                    "type": "others",
                                    "user": {
                                        "id": "15656772",
                                        "firstName": "Gem",
                                        "lastName": "E",
                                        "gender": "female",
                                        "photo": {
                                            "prefix": "https://irs1.4sqi.net/img/user/",
                                            "suffix": "/D1L2GHPMEPB4HVJL.jpg"
                                        }
                                    },
                                    "editable": false,
                                    "public": true,
                                    "collaborative": false,
                                    "url": "/user/15656772/list/local",
                                    "canonicalUrl": "https://foursquare.com/user/15656772/list/local",
                                    "createdAt": 1342546623,
                                    "updatedAt": 1422229579,
                                    "photo": {
                                        "id": "4f4dcb196d86be77b4b97aa4",
                                        "createdAt": 1330498329,
                                        "prefix": "https://irs0.4sqi.net/img/general/",
                                        "suffix": "/zwglUT09iIuoQ-jItv2mIziqAZ4J6jwfgdSc0HwCCGU.jpg",
                                        "width": 400,
                                        "height": 533,
                                        "user": {
                                            "id": "12226523",
                                            "firstName": "TIME",
                                            "gender": "none",
                                            "photo": {
                                                "prefix": "https://irs1.4sqi.net/img/user/",
                                                "suffix": "/ODEGSVU4P3ULUL5S.jpg"
                                            },
                                            "type": "page"
                                        },
                                        "visibility": "public"
                                    },
                                    "followers": {
                                        "count": 12
                                    },
                                    "listItems": {
                                        "count": 199,
                                        "items": [
                                            {
                                                "id": "t5022ab7ae4b0851f0d9e2b97",
                                                "createdAt": 1348895457
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                "phrases": [
                    {
                        "phrase": "change of clothes",
                        "sample": {
                            "entities": [
                                {
                                    "indices": [
                                        17,
                                        34
                                    ],
                                    "type": "keyPhrase"
                                }
                            ],
                            "text": "In addition to a change of clothes, bring galoshes or water shoes, or just..."
                        },
                        "count": 5
                    },
                    {
                        "phrase": "bring extra clothes",
                        "sample": {
                            "entities": [
                                {
                                    "indices": [
                                        26,
                                        45
                                    ],
                                    "type": "keyPhrase"
                                }
                            ],
                            "text": "... - it is worth it! and bring extra clothes because of the water play area"
                        },
                        "count": 2
                    },
                    {
                        "phrase": "crisp $",
                        "sample": {
                            "entities": [
                                {
                                    "indices": [
                                        11,
                                        18
                                    ],
                                    "type": "keyPhrase"
                                }
                            ],
                            "text": "or bring a crisp $10 and get 5 $1 coins in return"
                        },
                        "count": 2
                    }
                ],
                "hours": {
                    "status": "Open until 5:00 PM",
                    "isOpen": true,
                    "timeframes": [
                        {
                            "days": "Tue–Sat",
                            "includesToday": true,
                            "open": [
                                {
                                    "renderedTime": "10:00 AM–5:00 PM"
                                }
                            ],
                            "segments": []
                        },
                        {
                            "days": "Sun",
                            "open": [
                                {
                                    "renderedTime": "Noon–5:00 PM"
                                }
                            ],
                            "segments": []
                        }
                    ]
                },
                "popular": {
                    "status": "Likely open",
                    "isOpen": true,
                    "timeframes": [
                        {
                            "days": "Today",
                            "includesToday": true,
                            "open": [
                                {
                                    "renderedTime": "9:00 AM–3:00 PM"
                                }
                            ],
                            "segments": []
                        },
                        {
                            "days": "Fri",
                            "open": [
                                {
                                    "renderedTime": "9:00 AM–4:00 PM"
                                }
                            ],
                            "segments": []
                        },
                        {
                            "days": "Sat",
                            "open": [
                                {
                                    "renderedTime": "9:00 AM–6:00 PM"
                                }
                            ],
                            "segments": []
                        },
                        {
                            "days": "Sun",
                            "open": [
                                {
                                    "renderedTime": "10:00 AM–5:00 PM"
                                }
                            ],
                            "segments": []
                        },
                        {
                            "days": "Mon",
                            "open": [
                                {
                                    "renderedTime": "10:00 AM–2:00 PM"
                                }
                            ],
                            "segments": []
                        },
                        {
                            "days": "Tue–Wed",
                            "open": [
                                {
                                    "renderedTime": "9:00 AM–3:00 PM"
                                }
                            ],
                            "segments": []
                        }
                    ]
                },
                "pageUpdates": {
                    "count": 0,
                    "items": []
                },
                "inbox": {
                    "count": 0,
                    "items": []
                },
                "attributes": {
                    "groups": [
                        {
                            "type": "payments",
                            "name": "Credit Cards",
                            "summary": "Credit Cards",
                            "count": 7,
                            "items": [
                                {
                                    "displayName": "Credit Cards",
                                    "displayValue": "Yes (incl. American Express)"
                                }
                            ]
                        },
                        {
                            "type": "wifi",
                            "name": "Wi-Fi",
                            "summary": "Wi-Fi",
                            "count": 1,
                            "items": [
                                {
                                    "displayName": "Wi-Fi",
                                    "displayValue": "Yes"
                                }
                            ]
                        }
                    ]
                },
                "bestPhoto": {
                    "id": "4f53c1a5e4b0ef9672e71f2a",
                    "createdAt": 1330889125,
                    "source": {
                        "name": "Foursquare for iOS",
                        "url": "https://foursquare.com/download/#/iphone"
                    },
                    "prefix": "https://irs2.4sqi.net/img/general/",
                    "suffix": "/GGxLzXnDJmQlWTyQ8RinSRRL_kaWdx2iQBQPrzXF3SY.jpg",
                    "width": 720,
                    "height": 537,
                    "visibility": "public"
                }
            };

        });
})();

