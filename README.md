# IUH4-KLTN-BackEnd
## [Github](https://github.com/DucHuy23032001/IUH41-CNM-BackEnd-MeChat)

## **Auth**
- SignIn
    - Api: **POST**: https://ptask.cyclic.app/api/v1/auths/sign-in
    - Request:
    ```json
    {
        "email":"123@gmail.com",
        "password":"123456"
    }
    ```
    - Reponse:
    ```json
    {
        "msg": "Success",
        "accountId": "6406b883e37a41dce48544d5",
        "userId": "63f47b681e6c6175bf4ce69c",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjQ3YjY4MWU2YzYxNzViZjRjZTY5YyIsImlhdCI6MTY3ODE2MjcxNywiZXhwIjoxNjc4MTYzMzE3fQ.BHf4pcM4o11Rrm4UCJAUSDCgpJvvbOA6MJdhxXef78I"
    }
    ```
- SignUp
    - Api: **POST**: https://ptask.cyclic.app/api/v1/auths/sign-up
    - Request:
    ```json
    {
        "email":"123@gmail.com",
        "password":"1234",
        "confirmPassword":"1234",
        "fullName":"ABC",
        "birthday":"02/14/2023",
        "address":"TP HCM",
        "phoneNumber":"0879276284",
        "gender": 0,
        "avatarImage":"https://mechat.s3.ap-southeast-1.amazonaws.com/avatar-nam.png"
    }
    ```
    - Reponse:
    ```json
    {
        "accountId": "6406bbb97a58b596f51d393a",
        "userId": "6406bbb97a58b596f51d393c",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDZiYmI5N2E1OGI1OTZmNTFkMzkzYyIsImlhdCI6MTY3ODE2Mjg3MywiZXhwIjoxNjc4MTYzNDczfQ.VrEbYoHAOVnlGgKIhBZjZvajaUOWAFLat-xxhTEotMg"
    }
    ```
## **Account**

- getAllCount
    - Api: **GET**:  https://ptask.cyclic.app/api/v1/accounts    
    - Reponse:
    ```json
    [
        "63f47b681e6c6175bf4ce69a",
        "63f481f55f6bee2a60d910e9"
    ]
    ```
- getAccountById
    - Api: **GET**:  https://ptask.cyclic.app/api/v1/accounts/:id
    - Reponse
    ```json
    {
        "id": "63f47b681e6c6175bf4ce69a",
        "email": "12345@gmail.com",
        "password": "$2b$10$R4sZ9QAGSYQ9L68dYZ44Le7J.SVe76Q53OGkUtV28wleX//OXv/2."
    }
    ```
- getAccountByEmail
    - Api: **GET**:  https://ptask.cyclic.app/api/v1/accounts/email/:email
    - Reponse
    ```json
    {
        "id": "63f47b681e6c6175bf4ce69a",
        "email": "12345@gmail.com",
        "password": "$2b$10$R4sZ9QAGSYQ9L68dYZ44Le7J.SVe76Q53OGkUtV28wleX//OXv/2."
    }
    ```
- changePassword
    - Api: **PATCH**:    https://ptask.cyclic.app/api/v1/accounts/change-password/:id
    - Request
    ```json
    {
        "password":"1234",
        "newPassword":"123456",
        "confirm":"123456"
    }
    ```
    - Reponse
    ```json
    {
        "id": "6406b883e37a41dce48544d5",
        "status": "Success"
    }
    ```
- forgetPassword
    - Api: **PATCH**:    https://ptask.cyclic.app/api/v1/accounts/forget-password
    - Request
    ```json
    {
        "email":"123@gmail.com",
        "newPassword":"123456",
        "confirm":"123456"
    }
    ```
    - Reponse
    ```json
    {
        "id": "6406b883e37a41dce48544d5",
        "status": "Success"
    }
    ```
## **User**
- getAllUser
    - Api: **Get**:    https://ptask.cyclic.app/api/v1/users/
    - Reponse
    ```json
    {
        "status": "Success",
        "data": [
            "63f47b681e6c6175bf4ce69c",
            "63f481f55f6bee2a60d910eb",
            "6406b883e37a41dce48544d7",
            "6406bbb97a58b596f51d393c"
        ]
    }
    ```
- getUserById
    - Api: **Get**:    https://ptask.cyclic.app/api/v1/users/63f47b681e6c6175bf4ce69c
    - Reponse
    ```json
    {
            "_id": "63f47b681e6c6175bf4ce69c",
            "fullName": "Huy 111",
            "birthday": "2023-02-13T17:00:00.000Z",
            "address": "TP HCM",
            "phoneNumber": 879276284,
            "gender": false,
            "avatar": "https://mechat.s3.ap-southeast-1.amazonaws.com/avatar-nam.png",
            "status": false,
            "accountId": "63f47b681e6c6175bf4ce69a"
    }
    ```
- getUserByEmail
    - Api: **Get**:    https://ptask.cyclic.app/api/v1/users/email/12345@gmail.com
    - Reponse
    ```json
    {
            "_id": "63f47b681e6c6175bf4ce69c",
            "fullName": "Huy 111",
            "birthday": "2023-02-13T17:00:00.000Z",
            "address": "TP HCM",
            "phoneNumber": 879276284,
            "gender": false,
            "avatar": "https://mechat.s3.ap-southeast-1.amazonaws.com/avatar-nam.png",
            "status": false,
            "accountId": "63f47b681e6c6175bf4ce69a"
    }
    ```
- getUserByName
    - Api: **Get**:    https://ptask.cyclic.app/api/v1/users/email/ABC
    - Reponse
    ```json
    {
        [
            {
                "_id": "63f481f55f6bee2a60d910eb",
                "fullName": "ABC",
                "birthday": "2023-02-13T17:00:00.000Z",
                "address": "TP HCM",
                "phoneNumber": 879276284,
                "gender": false,
                "status": true,
                "avatar": "https://mechat.s3.ap-southeast-1.amazonaws.com/avatar-nam.png",
                "accountId": "63f481f55f6bee2a60d910e9",
                "__v": 0
            },
            {
                "_id": "6406b883e37a41dce48544d7",
                "fullName": "ABC",
                "birthday": "2023-02-13T17:00:00.000Z",
                "address": "TP HCM",
                "phoneNumber": 879276284,
                "gender": false,
                "status": true,
                "avatar": "https://mechat.s3.ap-southeast-1.amazonaws.com/avatar-nam.png",
                "accountId": "6406b883e37a41dce48544d5",
                "__v": 0
            }
        ]
    }
    ```
- getUserByPhone
    - Api: **Get**:    https://ptask.cyclic.app/api/v1/users/phone/879276284
    - Reponse
    ```json
    {
        {
            "_id": "63f47b681e6c6175bf4ce69c",
            "fullName": "Huy 111",
            "birthday": "2023-02-13T17:00:00.000Z",
            "address": "TP HCM",
            "phoneNumber": 879276284,
            "gender": false,
            "avatar": "https://mechat.s3.ap-southeast-1.amazonaws.com/avatar-nam.png",
            "status": false,
            "accountId": "63f47b681e6c6175bf4ce69a"
        }
    }
    ```
- updateUser:
    - Api: **PATCH**:    https://ptask.cyclic.app/api/v1/users/update/63f47b681e6c6175bf4ce69c
    - Request
    ```json
    {
        "fullName":"Huy 111",
        "birthday":"02/14/2023",
        "address":"TP HCM",
        "phoneNumber":"0879276284",
        "gender": 0,
        "avatarImage":"https://mechat.s3.ap-southeast-1.amazonaws.com/avatar-nam.png"
    }
    ```
    - Reponse
    ```json
    {
        "_id": "63f47b681e6c6175bf4ce69c",
        "fullName": "Huy 111",
        "birthday": "2023-02-13T17:00:00.000Z",
        "address": "TP HCM",
        "phoneNumber": 879276284,
        "gender": false,
        "status": true,
        "avatar": "https://mechat.s3.ap-southeast-1.amazonaws.com/avatar-nam.png",
        "accountId": "63f47b681e6c6175bf4ce69a",
        "__v": 0
    }
    ```
- lockUser:
    - Api: **PATCH**:    https://ptask.cyclic.app/api/v1/users/lock/63f47b681e6c6175bf4ce69c
    - Reponse
    ```json
    {
        "_id": "63f47b681e6c6175bf4ce69c",
        "fullName": "Huy 111",
        "birthday": "2023-02-13T17:00:00.000Z",
        "address": "TP HCM",
        "phoneNumber": 879276284,
        "gender": false,
        "status": false,
        "avatar": "https://mechat.s3.ap-southeast-1.amazonaws.com/avatar-nam.png",
        "accountId": "63f47b681e6c6175bf4ce69a",
        "__v": 0
    }
    ```
## Team
- getAllTeamOfIdProject:
    - Api: **GET**:    hhttps://ptask.cyclic.app/api/v1/teams/teams/641eb335bb721b7cdd8cbf36
    - Reponse
    ```json
    [
        {
            "_id": "641eb30abb721b7cdd8cbf30",
            "name": "Team 2",
            "createId": "641eb246bb721b7cdd8cbf1f",
            "leaderId": "641eb25bbb721b7cdd8cbf2b",
            "members": [
                "641eb24fbb721b7cdd8cbf25",
                "641eb25bbb721b7cdd8cbf2b"
            ],
            "status": true,
            "__v": 0
        },
        {
            "_id": "641eb315bb721b7cdd8cbf32",
            "name": "Team 1",
            "createId": "641eb246bb721b7cdd8cbf1f",
            "leaderId": "641eb25bbb721b7cdd8cbf2b",
            "members": [
                "641eb24fbb721b7cdd8cbf25",
                "641eb25bbb721b7cdd8cbf2b"
            ],
            "status": true,
            "__v": 0
        },
        {
            "_id": "641eb335bb721b7cdd8cbf34",
            "name": "Project Owner",
            "leaderId": "641eb246bb721b7cdd8cbf1f",
            "members": [
                "641eb246bb721b7cdd8cbf1f"
            ],
            "__v": 0
        }
    ]
    ```
- getAllMemberOfIdProject:
    - Api: **GET**:    https://ptask.cyclic.app/api/v1/teams/members/641ba3f0efd24fc581820aba
    - Reponse
    ```json
    [
        "641ba31887b485c176a160ba",
        "641ba30d87b485c176a160b4",
        "641ba31887b485c176a160ba",
        "641ba30d87b485c176a160b4",
        "641ba2cf87b485c176a160ae"
    ]
    ```
- getAllTeamOfUser:
    - Api: **GET**:    https://ptask.cyclic.app/api/v1/teams/63f47b681e6c6175bf4ce69c
    - Reponse
    ```json
    [
        {
            "_id": "63f4806dc4ec61b3edc26f6e",
            "name": "Name 1",
            "members": [
                "63f47b681e6c6175bf4ce69c"
            ],
            "__v": 2
        }
    ]
    ```
- createTeam:
    - Api: **POST**:    https://ptask.cyclic.app/api/v1/teams/create
    - Request
    ```json
    {
        "status":true,
        "createId":"641ba2cf87b485c176a160ae",
        "name":"Team 1",
        "leaderId":"641ba30d87b485c176a160b4",
        "members":["641ba31887b485c176a160ba","641ba30d87b485c176a160b4"]
    }
    ```
    - Reponse
    ```json
    {
        "name": "Team 1",
        "createId": "641ba2cf87b485c176a160ae",
        "leaderId": "641ba30d87b485c176a160b4",
        "members": [
            "641ba31887b485c176a160ba",
            "641ba30d87b485c176a160b4"
        ],
        "status": true,
        "_id": "641ba36e87b485c176a160bc",
        "__v": 0
    }
    ```
- changeNameTeam:
    - Api: **PATCH**:    https://ptask.cyclic.app/api/v1/teams/change-name/63f4806dc4ec61b3edc26f6e
    - Request
    ```json
    {
        "name":"Name 1"
    }
    ```
    - Reponse
    ```json
    {
        "_id": "63f4806dc4ec61b3edc26f6e",
        "name": "Name 1",
        "members": [
            "63f47b681e6c6175bf4ce69c"
        ],
        "__v": 2
    }
- addMembersTeam: **Đang có bug**
    - Api: **PATCH**:    https://ptask.cyclic.app/api/v1/teams/add-member/63f4806dc4ec61b3edc26f6e
    - Request
    ```json
    {
        "memberIds":["63f481f55f6bee2a60d910eb","63f47b681e6c6175bf4ce69c"]
    }
    ```
    - Reponse
    ```json
    {
        "_id": "63f4806dc4ec61b3edc26f6e",
        "name": "Name 1",
        "members": [
            "63f47b681e6c6175bf4ce69c"
        ],
        "__v": 2
    }
    ```

- removeMemberTeam: 
    - Api: **PATCH**:    https://ptask.cyclic.app/api/v1/teams/remove-member/63f4806dc4ec61b3edc26f6e
    - Request
    ```json
    {
        "memberId":"63f481f55f6bee2a60d910eb"
    }
    ```
    - Reponse
    ```json
    {
        "team": {
            "_id": "63f4806dc4ec61b3edc26f6e",
            "name": "Name 1",
            "members": [],
            "__v": 3
        },
        "memberId": "63f47b681e6c6175bf4ce69c"
    }
    ```
## Project
- getAllProject
    - Api: **GET**:    https://ptask.cyclic.app/api/v1/projects
    - Reponse
    ```json
    [
        {
            "_id": "63f4836e4986d4991247715a",
            "name": "name",
            "startTime": "2001-03-22T17:00:00.000Z",
            "endTime": "2100-03-22T17:00:00.000Z",
            "status": true,
            "teamIds": [],
            "__v": 0
        },
        {
            "_id": "63f483964986d4991247715c",
            "name": "name",
            "startTime": "2001-03-22T17:00:00.000Z",
            "endTime": "2100-03-22T17:00:00.000Z",
            "status": true,
            "teamIds": [],
            "__v": 0
        }
    ]
    ```
- createProject
    - Api: **POST**:    https://ptask.cyclic.app/api/v1/projects/create
    - Request
    ```json
    {
        "mainProject":"641ba2cf87b485c176a160ae",
        "name":"Project test",
        "startTime" :"03-24-2001",
        "endTime" :"03-24-2001",
        "teamIds":["641ba36e87b485c176a160bc","641ba3a387b485c176a160be"]
    }
    ```
    - Reponse
    ```json
    {
        "name": "Project test",
        "startTime": "2001-03-23T17:00:00.000Z",
        "endTime": "2001-03-23T17:00:00.000Z",
        "status": true,
        "background": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/project.png",
        "teamIds": [
            "641ba36e87b485c176a160bc",
            "641ba3a387b485c176a160be",
            "641ba3f0efd24fc581820ab8"
        ],
        "_id": "641ba3f0efd24fc581820aba",
        "__v": 0
    }
    ```
- getProjectById:
    - Api: **GET**:    https://ptask.cyclic.app/api/v1/projects/63f485974bad526b718962a5
    - Reponse
    ```json
    {
        "_id": "63f4836e4986d4991247715a",
        "name": "name",
        "startTime": "2001-03-22T17:00:00.000Z",
        "endTime": "2100-03-22T17:00:00.000Z",
        "status": true,
        "teamIds": [],
        "__v": 0
    }
    ```
- getProjectByName:
    - Api: **GET**:    https://ptask.cyclic.app/api/v1/projects/name/name ***(:name)***
    - Reponse
    ```json
    [
        {
            "_id": "63f4836e4986d4991247715a",
            "name": "name",
            "startTime": "2001-03-22T17:00:00.000Z",
            "endTime": "2100-03-22T17:00:00.000Z",
            "status": true,
            "teamIds": [],
            "__v": 0
        },
        {
            "_id": "63f483964986d4991247715c",
            "name": "name",
            "startTime": "2001-03-22T17:00:00.000Z",
            "endTime": "2100-03-22T17:00:00.000Z",
            "status": true,
            "teamIds": [],
            "__v": 0
        }
    ]
    ```
- getProjectByIdUser:
    - Api: **GET**:    https://ptask.cyclic.app/api/v1/projects/id-user/64132d32a992069c9eeca5b8 ***(:id)***
    - Reponse
    ```json
    [
        {
            "_id": "64194e53a0702b7822abd5d9",
            "name": "Project 1",
            "startTime": "2001-03-23T17:00:00.000Z",
            "endTime": "2001-04-23T17:00:00.000Z",
            "status": true,
            "background": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/project.png",
            "teamIds": [
                "641479b36e21cef193748903",
                "641479ca6e21cef193748905"
            ],
            "mainProject": "641329c27a9b8b3c70c80864",
            "__v": 0
        },
        {
            "_id": "641a946603fca33b72b65318",
            "name": "Project test time",
            "startTime": "2001-03-23T17:00:00.000Z",
            "endTime": "2001-03-23T17:00:00.000Z",
            "status": true,
            "background": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/project.png",
            "teamIds": [
                "641479b36e21cef193748903",
                "641479ca6e21cef193748905"
            ],
            "mainProject": "641329c27a9b8b3c70c80864",
            "__v": 0
        }
    ]
    ```
## Work
- getAllWorkByProjectId:
    - Api: **GET**:    hhttps://ptask.cyclic.app/api/v1/works/all-work-project/63f4836e4986d4991247715a
    - Reponse
    ```json
    [
        {
            "_id": "6407447d95b5b542e6bc7e0d",
            "name": "name 2",
            "status": false,
            "projectId": "63f4836e4986d4991247715a",
            "__v": 0
        },
        {
            "_id": "6407448095b5b542e6bc7e0f",
            "name": "name 2",
            "status": false,
            "projectId": "63f4836e4986d4991247715a",
            "__v": 0
        },
        {
            "_id": "6407448195b5b542e6bc7e11",
            "name": "name 2",
            "status": false,
            "projectId": "63f4836e4986d4991247715a",
            "__v": 0
        }
    ]
    ```
- getWorkByName:
    - Api: **GET**:    https://ptask.cyclic.app/api/v1/works/name/Work 2
    - Reponse
    ```json
    [
        {
            "_id": "641eb80287c02b20789b3635",
            "name": "Work 2",
            "status": false,
            "startTime": "2001-03-22T17:00:00.000Z",
            "endTime": "2002-03-22T17:00:00.000Z",
            "teamId": "641eb315bb721b7cdd8cbf32",
            "createId": "641eb25bbb721b7cdd8cbf2b",
            "projectId": "641eb335bb721b7cdd8cbf36",
            "__v": 0
        }
    ]
    ```
- getWorkById:
    - Api: **GET**:    https://ptask.cyclic.app/api/v1/works/641eb80287c02b20789b3635
    - Reponse
    ```json
    [
        {
            "_id": "641eb80287c02b20789b3635",
            "name": "Work 2",
            "status": false,
            "startTime": "2001-03-22T17:00:00.000Z",
            "endTime": "2002-03-22T17:00:00.000Z",
            "teamId": "641eb315bb721b7cdd8cbf32",
            "createId": "641eb25bbb721b7cdd8cbf2b",
            "projectId": "641eb335bb721b7cdd8cbf36",
            "__v": 0
        }
    ]
    ```
- createWork
    - Api: **POST**:    https://ptask.cyclic.app/api/v1/works/
    - Request
    ```json
    {
        "teamId":"641eb315bb721b7cdd8cbf32",
        "createId":"641eb25bbb721b7cdd8cbf2b",
        "name":"Work 2",
        "startTime": "03/23/2001",
        "endTime": "03/23/2002",
        "projectId":"641eb335bb721b7cdd8cbf36"    
    }
    ```
    - Reponse
    ```json
    {
        "name": "Work 2",
        "status": false,
        "startTime": "2001-03-22T17:00:00.000Z",
        "endTime": "2002-03-22T17:00:00.000Z",
        "teamId": "641eb315bb721b7cdd8cbf32",
        "createId": "641eb25bbb721b7cdd8cbf2b",
        "projectId": "641eb335bb721b7cdd8cbf36",
        "_id": "641eb80287c02b20789b3635",
        "__v": 0
    }
    ```
- changeNameWork
    - Api: **PATCH**:    https://ptask.cyclic.app/api/v1/works/change-name/641eb353bb721b7cdd8cbf38
    - Request
    ```json
    {
        "createId":"641329c27a9b8b3c70c80864",
        "name":"Test change name 1"
    }
    ```
    - Reponse
    ```json
    {
        "_id": "641eb7fc87c02b20789b3633",
        "name": "Test change name 1",
        "status": false,
        "startTime": "2001-03-22T17:00:00.000Z",
        "endTime": "2002-03-22T17:00:00.000Z",
        "teamId": "641eb315bb721b7cdd8cbf32",
        "createId": "641eb25bbb721b7cdd8cbf2b",
        "projectId": "641eb335bb721b7cdd8cbf36",
        "__v": 0
    }
    ```
- changeStatusWork
    - Api: **PATCH**:    https://ptask.cyclic.app/api/v1/works/change-status/641eb353bb721b7cdd8cbf38
    - Request
    ```json
    {
        "createId":"641329c27a9b8b3c70c80864",
    }
    ```
    - Reponse
    ```json
    {
        "_id": "641eb7fc87c02b20789b3633",
        "name": "Test change name 1",
        "status": true,
        "startTime": "2001-03-22T17:00:00.000Z",
        "endTime": "2002-03-22T17:00:00.000Z",
        "teamId": "641eb315bb721b7cdd8cbf32",
        "createId": "641eb25bbb721b7cdd8cbf2b",
        "projectId": "641eb335bb721b7cdd8cbf36",
        "__v": 0
    }
    ```
## Task
- createTask
    - Api: **POST**:    https://ptask.cyclic.app/api/v1/tasks/
    - Request
    ```json
    {
        "name":"task 2",
        "startDay":"03-23-2001",
        "endDay":"03-23-2010",
        "startHour":"9:00",
        "endHour":"16:00",
        "linkSupport":"ABC",
        "imageLink":"ABC",
        "workId":"641ba5a6efd24fc581820abc",
        "members":["641ba30d87b485c176a160b4"]
    }
    ```
    - Reponse
    ```json
    {
        "name": "task 2",
        "startDay": "2001-03-22T17:00:00.000Z",
        "endDay": "2010-03-22T17:00:00.000Z",
        "startHour": "9:00",
        "endHour": "16:00",
        "imageLink": "ABC",
        "workId": "641ba5a6efd24fc581820abc",
        "members": [
            "641ba30d87b485c176a160b4"
        ],
        "status": 3,
        "_id": "641ba6722d192869ea462018",
        "linkSupports": [],
        "__v": 0
    }
    ```
- getAllTaskInProject (by Id project)
    - Api: **GET**:    https://ptask.cyclic.app/api/v1/tasks/get-task-in-project/641ba3f0efd24fc581820aba
    - Reponse
    ```json
    [
        {
            "_id": "641d8afa0c7438d1c496a16b",
            "name": "task 1",
            "startDay": "2001-03-22T17:00:00.000Z",
            "endDay": "2010-03-22T17:00:00.000Z",
            "startHour": "9:00",
            "endHour": "16:00",
            "imageLink": "ABC",
            "workId": "641d8aa80c7438d1c496a167",
            "members": [
                "641ba30d87b485c176a160b4"
            ],
            "status": 3,
            "linkSupports": [],
            "__v": 0
        },
        {
            "_id": "641d8afd0c7438d1c496a16d",
            "name": "task 2",
            "startDay": "2001-03-22T17:00:00.000Z",
            "endDay": "2010-03-22T17:00:00.000Z",
            "startHour": "9:00",
            "endHour": "16:00",
            "imageLink": "ABC",
            "workId": "641d8aa80c7438d1c496a167",
            "members": [
                "641ba30d87b485c176a160b4"
            ],
            "status": 3,
            "linkSupports": [],
            "__v": 0
        }
    ]
    ```
- getAllTaskInWork 
    - Api: **GET**:    https://ptask.cyclic.app/api/v1/tasks/get-task-in-list/63f48728f071ef7be2a9e9bd
    - Reponse
    ```json
    [
        {
            "status": 3,
            "_id": "63f48c86c765a223ecb74b8e",
            "name": "name",
            "startDay": "2001-03-22T17:00:00.000Z",
            "endDay": "2010-03-22T17:00:00.000Z",
            "startHour": "9:00",
            "endHour": "16:00",
            "imageLink": "ABC",
            "listId": "63f48728f071ef7be2a9e9bd",
            "members": [
                "63f47b681e6c6175bf4ce69c",
                "63f481f55f6bee2a60d910eb"
            ],
            "linkSupports": [],
            "__v": 0
        },
        {
            "_id": "640745aa372921bca42eae22",
            "name": "name",
            "startDay": "2001-03-22T17:00:00.000Z",
            "endDay": "2010-03-22T17:00:00.000Z",
            "startHour": "9:00",
            "endHour": "16:00",
            "imageLink": "ABC",
            "listId": "63f48728f071ef7be2a9e9bd",
            "members": [
                "63f47b681e6c6175bf4ce69c",
                "63f481f55f6bee2a60d910eb"
            ],
            "status": 3,
            "linkSupports": [],
            "__v": 0
        }
    ]
    ```
- getTaskById
    - Api: **GET**:    https://ptask.cyclic.app/api/v1/tasks/63f48c86c765a223ecb74b8e
    - Reponse
    ```json
    {
        "status": 3,
        "_id": "63f48c86c765a223ecb74b8e",
        "name": "name",
        "startDay": "2001-03-22T17:00:00.000Z",
        "endDay": "2010-03-22T17:00:00.000Z",
        "startHour": "9:00",
        "endHour": "16:00",
        "imageLink": "ABC",
        "listId": "63f48728f071ef7be2a9e9bd",
        "members": [
            "63f47b681e6c6175bf4ce69c",
            "63f481f55f6bee2a60d910eb"
        ],
        "linkSupports": [],
        "__v": 0
    }
    ```
- getTaskByName:
    - Api: **GET**:    https://ptask.cyclic.app/api/v1/tasks/name/name ***(:name)***
    - Reponse
    ```json
    [
        {
            "status": 3,
            "_id": "63f48c86c765a223ecb74b8e",
            "name": "name",
            "startDay": "2001-03-22T17:00:00.000Z",
            "endDay": "2010-03-22T17:00:00.000Z",
            "startHour": "9:00",
            "endHour": "16:00",
            "imageLink": "ABC",
            "listId": "63f48728f071ef7be2a9e9bd",
            "members": [
                "63f47b681e6c6175bf4ce69c",
                "63f481f55f6bee2a60d910eb"
            ],
            "linkSupports": [],
            "__v": 0
        },
        {
            "_id": "640745aa372921bca42eae22",
            "name": "name",
            "startDay": "2001-03-22T17:00:00.000Z",
            "endDay": "2010-03-22T17:00:00.000Z",
            "startHour": "9:00",
            "endHour": "16:00",
            "imageLink": "ABC",
            "listId": "63f48728f071ef7be2a9e9bd",
            "members": [
                "63f47b681e6c6175bf4ce69c",
                "63f481f55f6bee2a60d910eb"
            ],
            "status": 3,
            "linkSupports": [],
            "__v": 0
        }
    ]
    ```
- updateTask
    - Api: **PATCH**:    https://ptask.cyclic.app/api/v1/tasks/update/63f48c272df79e949fe9243b
    - Request
    ```json
    {
        "name":"task test update",
        "startDay":"03-23-2001",
        "endDay":"03-23-20100",
        "startTime":"9:00",
        "endTime":"16:00",
        "linkSupport":["ABC"],
        "imageLink":"ABC",
        "userId":"641eb24fbb721b7cdd8cbf25"
    }
    ```
    - Reponse
    ```json
    {
        "_id": "641eb81187c02b20789b3637",
        "name": "task test update",
        "startDay": "2001-03-22T17:00:00.000Z",
        "endDay": "2010-03-22T17:00:00.000Z",
        "startHour": "9:00",
        "endHour": "16:00",
        "imageLink": "ABC",
        "workId": "641eb7fc87c02b20789b3633",
        "members": [
            "641eb24fbb721b7cdd8cbf25"
        ],
        "status": 3,
        "__v": 0
    }
    ```