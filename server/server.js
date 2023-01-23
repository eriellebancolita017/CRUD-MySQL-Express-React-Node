const express = require("express");
const cors = require("cors");

const db = require("./models");
const controller = require("./controller/tutorial_controller");

const app = express();

/* --------- db sync --------
  In development, you may need to drop existing tables and re-sync database. Just use force: true as following code:
  db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });

  const db = require("./models")
  db.sequelize.sync();
 */

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to test for CRUD application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const run = async () => {
  // Create Tutorials

  const tut1 = await controller.createTutorial({
    title: "Tut#1",
    description: "Tut#1 Description",
  });
  /*
>> Created tutorial: {
    "id": 1,
    "title": "Tut#1",
    "description": "Tut#1 Description",     
    "updatedAt": "2020-04-14T09:49:14.021Z",
    "createdAt": "2020-04-14T09:49:14.021Z" 
}
*/

  const tut2 = await controller.createTutorial({
    title: "Tut#2",
    description: "Tut#2 Description",
  });
  /*
>> Created tutorial: {
    "id": 2,
    "title": "Tut#2",
    "description": "Tut#2 Description",
    "updatedAt": "2020-04-14T09:49:14.052Z",
    "createdAt": "2020-04-14T09:49:14.052Z"
}
*/

  // Create Comments

  const comment1 = await controller.createComment(tut1.id, {
    name: "bezkoder",
    text: "Good job!",
  });
  /*
>> Created comment: {
    "id": 1,
    "name": "bezkoder",
    "text": "Good job!",
    "tutorialId": 1,
    "updatedAt": "2020-04-14T09:49:14.071Z",
    "createdAt": "2020-04-14T09:49:14.071Z"
}
*/

  await controller.createComment(tut1.id, {
    name: "zkoder",
    text: "One of the best tuts!",
  });
  /*
>> Created comment: {
    "id": 2,
    "name": "zkoder",
    "text": "One of the best tuts!",
    "tutorialId": 1,
    "updatedAt": "2020-04-14T09:49:14.081Z",
    "createdAt": "2020-04-14T09:49:14.081Z"
}
*/

  const comment2 = await controller.createComment(tut2.id, {
    name: "aKoder",
    text: "Hi, thank you!",
  });
  /*
>> Created comment: {
    "id": 3,
    "name": "aKoder",
    "text": "Hi, thank you!",
    "tutorialId": 2,
    "updatedAt": "2020-04-14T09:49:14.855Z",
    "createdAt": "2020-04-14T09:49:14.855Z"
}
*/

  await controller.createComment(tut2.id, {
    name: "anotherKoder",
    text: "Awesome tut!",
  });
  /*
>> Created comment: {
    "id": 4,
    "name": "anotherKoder",
    "text": "Awesome tut!",
    "tutorialId": 2,
    "updatedAt": "2020-04-14T09:49:15.478Z",
    "createdAt": "2020-04-14T09:49:15.478Z"
}
*/

  // Get Tutorial by given id

  // const tut1Data = await controller.findTutorialById(tut1.id);
  // console.log(
  //   ">> Tutorial id=" + tut1Data.id,
  //   JSON.stringify(tut1Data, null, 2)
  // );
  /*
>> Tutorial id=1 {
  "id": 1,
  "title": "Tut#1",
  "description": "Tut#1 Description",
  "createdAt": "2020-04-14T09:49:14.000Z",
  "updatedAt": "2020-04-14T09:49:14.000Z",
  "comments": [
    {
      "id": 1,
      "name": "bezkoder",
      "text": "Good job!",
      "createdAt": "2020-04-14T09:49:14.000Z",
      "updatedAt": "2020-04-14T09:49:14.000Z",
      "tutorialId": 1
    },
    {
      "id": 2,
      "name": "zkoder",
      "text": "One of the best tuts!",
      "createdAt": "2020-04-14T09:49:14.000Z",
      "updatedAt": "2020-04-14T09:49:14.000Z",
      "tutorialId": 1
    }
  ]
}
*/

//   const tut2Data = await controller.findTutorialById(tut2.id);
//   console.log(
//     ">> Tutorial id=" + tut2Data.id,
//     JSON.stringify(tut2Data, null, 2)
//   );
//   /*
// >> Tutorial id=2 {
//   "id": 2,
//   "title": "Tut#2",
//   "description": "Tut#2 Description",
//   "createdAt": "2020-04-14T09:49:14.000Z",
//   "updatedAt": "2020-04-14T09:49:14.000Z",
//   "comments": [
//     {
//       "id": 3,
//       "name": "aKoder",
//       "text": "Hi, thank you!",
//       "createdAt": "2020-04-14T09:49:14.000Z",
//       "updatedAt": "2020-04-14T09:49:14.000Z",
//       "tutorialId": 2
//     },
//     {
//       "id": 4,
//       "name": "anotherKoder",
//       "text": "Awesome tut!",
//       "createdAt": "2020-04-14T09:49:15.000Z",
//       "updatedAt": "2020-04-14T09:49:15.000Z",
//       "tutorialId": 2
//     }
//   ]
// }
// */

//   // Get Comment by given id

//   const comment1Data = await controller.findCommentById(comment1.id);
//   console.log(
//     ">> Comment id=" + comment1.id,
//     JSON.stringify(comment1Data, null, 2)
//   );
//   /*
// >> Comment id=1 {
//   "id": 1,
//   "name": "bezkoder",
//   "text": "Good job!",
//   "createdAt": "2020-04-14T09:49:14.000Z",
//   "updatedAt": "2020-04-14T09:49:14.000Z",
//   "tutorialId": 1,
//   "tutorial": {
//     "id": 1,
//     "title": "Tut#1",
//     "description": "Tut#1 Description",
//     "createdAt": "2020-04-14T09:49:14.000Z",
//     "updatedAt": "2020-04-14T09:49:14.000Z"
//   }
// }
// */

//   const comment2Data = await controller.findCommentById(comment2.id);
//   console.log(
//     ">> Comment id=" + comment2.id,
//     JSON.stringify(comment2Data, null, 2)
//   );
//   /*
// >> Comment id=3 {
//   "id": 3,
//   "name": "aKoder",
//   "text": "Hi, thank you!",
//   "createdAt": "2020-04-14T09:49:14.000Z",
//   "updatedAt": "2020-04-14T09:49:14.000Z",
//   "tutorialId": 2,
//   "tutorial": {
//     "id": 2,
//     "title": "Tut#2",
//     "description": "Tut#2 Description",
//     "createdAt": "2020-04-14T09:49:14.000Z",
//     "updatedAt": "2020-04-14T09:49:14.000Z"
//   }
// }
// */

//   // Get all Tutorials

//   const tutorials = await controller.findAll();
//   console.log(">> All tutorials", JSON.stringify(tutorials, null, 2));
  /*
>> All tutorials [
  {
    "id": 1,
    "title": "Tut#1",
    "description": "Tut#1 Description",
    "createdAt": "2020-04-14T09:49:14.000Z",
    "updatedAt": "2020-04-14T09:49:14.000Z",
    "comments": [
      {
        "id": 1,
        "name": "bezkoder",
        "text": "Good job!",
        "createdAt": "2020-04-14T09:49:14.000Z",
        "updatedAt": "2020-04-14T09:49:14.000Z",
        "tutorialId": 1
      },
      {
        "id": 2,
        "name": "zkoder",
        "text": "One of the best tuts!",
        "createdAt": "2020-04-14T09:49:14.000Z",
        "updatedAt": "2020-04-14T09:49:14.000Z",
        "tutorialId": 1
      }
    ]
  },
  {
    "id": 2,
    "title": "Tut#2",
    "description": "Tut#2 Description",
    "createdAt": "2020-04-14T09:49:14.000Z",
    "updatedAt": "2020-04-14T09:49:14.000Z",
    "comments": [
      {
        "id": 3,
        "name": "aKoder",
        "text": "Hi, thank you!",
        "createdAt": "2020-04-14T09:49:14.000Z",
        "updatedAt": "2020-04-14T09:49:14.000Z",
        "tutorialId": 2
      },
      {
        "id": 4,
        "name": "anotherKoder",
        "text": "Awesome tut!",
        "createdAt": "2020-04-14T09:49:15.000Z",
        "updatedAt": "2020-04-14T09:49:15.000Z",
        "tutorialId": 2
      }
    ]
  }
]
*/
};

// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  run();
});
