# IUH4-KLTN-BackEnd

## **Auth**
- SignIn
    - Api: **POST**: https://ptask.cyclic.app/api/auths/sign-in
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
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjQ3YjY4MWU2YzYxNzViZjRjZTY5YyIsImlhdCI6MTY3ODE2MjcxNywiZXhwIjoxNjc4MTYzMzE3fQ.BHf4pcM4o11Rrm4UCJAUSDCgpJvvbOA6MJdhxXef78I"
    }
    ```
- SignUp
    - Api: **POST**: https://ptask.cyclic.app/api/auths/sign-up
    - Request:
    
    ![image](https://user-images.githubusercontent.com/113782478/229042411-896af149-f949-48fe-a18c-26e60a9a3aa4.png)
    - Reponse:
    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZ1bGxOYW1lIjoiQSIsImJpcnRoZGF5IjoiMjAyMy0wMi0wMVQxNzowMDowMC4wMDBaIiwiYWRkcmVzcyI6IjEyMyIsInBob25lTnVtYmVyIjoiMDg3OTI3NjI4NCIsImdlbmRlciI6dHJ1ZSwic3RhdHVzIjp0cnVlLCJhdmF0YXIiOiJodHRwczovL2l1aDRrbHRuLnMzLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb20vNTk3YzcwNmE5Mzc1NGUyYjE3NjQuanBnIiwiYWNjb3VudElkIjoiNjQyM2U3NDEwNTUxODFjYjRlNDM2ZjA2IiwiX2lkIjoiNjQyM2U3NDIwNTUxODFjYjRlNDM2ZjA4IiwiY3JlYXRlZEF0IjoiMjAyMy0wMy0yOVQwNzoyMjo0Mi41MzFaIiwidXBkYXRlZEF0IjoiMjAyMy0wMy0yOVQwNzoyMjo0Mi41MzFaIiwiX192IjowfSwiaWF0IjoxNjgwMDc0NTYyLCJleHAiOjE2ODAwNzUxNjJ9.EZVt466llkdBg5d-FD7h7SOSTruDuLYzeYofHHUGsWk"
    }
    ```
## **Account**
- getAllCount
    - Api: **GET**:  https://ptask.cyclic.app/api/accounts    
    - Reponse:
    ```json
    [
        "63f47b681e6c6175bf4ce69a",
        "63f481f55f6bee2a60d910e9"
    ]
    ```
- getAccountById
    - Api: **GET**:  https://ptask.cyclic.app/api/accounts/:id
    - Reponse
    ```json
    {
        "id": "63f47b681e6c6175bf4ce69a",
        "email": "12345@gmail.com",
        "password": "$2b$10$R4sZ9QAGSYQ9L68dYZ44Le7J.SVe76Q53OGkUtV28wleX//OXv/2."
    }
    ```
- getAccountByEmail
    - Api: **GET**:  https://ptask.cyclic.app/api/accounts/email/:email
    - Reponse
    ```json
    {
        "id": "63f47b681e6c6175bf4ce69a",
        "email": "12345@gmail.com",
        "password": "$2b$10$R4sZ9QAGSYQ9L68dYZ44Le7J.SVe76Q53OGkUtV28wleX//OXv/2."
    }
    ```
- changePassword
    - Api: **PATCH**:    https://ptask.cyclic.app/api/accounts/change-password/:id
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
    - Api: **PATCH**:    https://ptask.cyclic.app/api/accounts/forget-password
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
    - Api: **Get**:    https://ptask.cyclic.app/api/users/
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
    - Api: **Get**:    https://ptask.cyclic.app/api/users/63f47b681e6c6175bf4ce69c
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
- getUserByTaskId
    - Api: **Get**:    https://ptask.cyclic.app/api/users/tasks/64527b07a9c0a95631ad3415
    - Reponse
    ```json
    [
        {
            "_id": "64527b07a9c0a95631ad33fc",
            "fullName": "Nguyễn Đức Huy",
            "birthday": "2001-03-22T17:00:00.000Z",
            "address": "247 Lê Đức Thọ, Gò Gấp, TP HCM",
            "phoneNumber": "0879276284",
            "gender": false,
            "avatar": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/avatar-nam.png",
            "status": true,
            "accountId": "64527b07a9c0a95631ad33fa"
        }
    ]
    ```
- getUserByEmail
    - Api: **Get**:    https://ptask.cyclic.app/api/users/email/12345@gmail.com
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
    - Api: **Get**:    https://ptask.cyclic.app/api/users/email/ABC
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
    - Api: **Get**:    https://ptask.cyclic.app/api/users/phone/879276284
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
    - Api: **PATCH**:    https://ptask.cyclic.app/api/users/update/63f47b681e6c6175bf4ce69c
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
    - Api: **PATCH**:    https://ptask.cyclic.app/api/users/lock/63f47b681e6c6175bf4ce69c
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
- getTeamById
    - Api: **GET**:    https://ptask.cyclic.app/api/teams/team/641eb335bb721b7cdd8cbf36
    - Reponse
    ```json
    [
        {
            "_id":"641eb335bb721b7cdd8cbf36",
            "leaderId": "642687fbd58ad6becd0fa95f",
            "teamName": "Team 1",
            "listMembers": [
                "642687fbd58ad6becd0fa95f",
                "642687fbd58ad6becd0fa963"
            ],
            "createId": "642687fbd58ad6becd0fa95b",
            "createAt": "2023-03-31T07:13:00.022Z"
        }
    ]
    ```
- getAllTeamOfIdProject:
    - Api: **GET**:    https://ptask.cyclic.app/api/teams/teams-project/641eb335bb721b7cdd8cbf36
    - Reponse
    ```json
    [
        {
            "_id": "643278efa6fdbb3a058caa05",
            "teamName": "Team 1",
            "leaderName": "Nguyễn Đức Huy",
            "workName": [
                "Work 1"
            ],
            "leaderId" : "643278efa6fdbb3a058cabb90"
        },
        {
            "_id": "643278efa6fdbb3a058caa07",
            "teamName": "Team 2",
            "leaderName": "Nguyễn Việt Hoàng",
            "workName": [
                "Work 2"
            ],
            "leaderId" : "643278efa6fdbb3a058cabb90"
        }
    ]
    ```
- getAllMemberOfIdProject:
    - Api: **GET**:    https://ptask.cyclic.app/api/teams/members-project/641ba3f0efd24fc581820aba
    - Reponse
    ```json
    [
        {
            "_id": "643278eea6fdbb3a058ca9f7",
            "teamName": "Team 1",
            "position": "Leader",
            "name": "Nguyễn Đức Huy",
            "avatar": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/avatar-nam.png",
            "task": [
                "Task 1 Work 1"
            ]
        },
        {
            "_id": "643278eea6fdbb3a058ca9f7",
            "teamName": "Team 1",
            "position": "Member",
            "name": "Nguyễn Đức Huy",
            "avatar": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/avatar-nam.png",
            "task": [
                "Task 1 Work 1"
            ]
        }
    ]
    ```
- getLeadersOfMember:
    - Api: **GET**:   http://localhost:3000/api/teams/leader-member/6444d8568e1db702b44a3f8d
    - Reponse
    ```json
    [
        "6444d8568e1db702b44a3f7b",
        "6444d8568e1db702b44a3f83",
        "6444d8568e1db702b44a3f7b"
    ]
    ```
- getLeadersOfTeam:
    - Api: **GET**:   http://localhost:3000/api/teams/leader-team/6444d8568e1db702b44a3f8d
    - Reponse
    ```json
    [
        "6444d8568e1db702b44a3f7b",
        "6444d8568e1db702b44a3f83",
        "6444d8568e1db702b44a3f7b"
    ]
    ```
- getAllMemberOfTeam:
    - Api: **GET**:    https://ptask.cyclic.app/api/teams/members-team/641ba3f0efd24fc581820aba
    - Reponse
    ```json
    [
        {
            "_id": "641eb24fbb721b7cdd8cbf25",
            "fullName": "Nguyễn Đức Hung",
            "birthday": "2000-02-28T17:00:00.000Z",
            "address": "12 Nguyễn Văn Bảo, Gò vấp, TP HCM",
            "phoneNumber": 912345888,
            "gender": false,
            "status": true,
            "avatar": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/avatar-nam.png",
            "accountId": "641eb24fbb721b7cdd8cbf23",
            "__v": 0
        },
        {
            "_id": "641eb25bbb721b7cdd8cbf2b",
            "fullName": "Nguyễn Đức Phuong",
            "birthday": "2000-02-28T17:00:00.000Z",
            "address": "12 Nguyễn Văn Bảo, Gò vấp, TP HCM",
            "phoneNumber": 912341888,
            "gender": false,
            "status": true,
            "avatar": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/avatar-nam.png",
            "accountId": "641eb25bbb721b7cdd8cbf29",
            "__v": 0
        }
    ]
    ```
- getAllTeamOfUser:
    - Api: **GET**:    https://ptask.cyclic.app/api/teams/63f47b681e6c6175bf4ce69c
    - Reponse
    ```json
    [
        {
            "_id":"641eb335bb721b7cdd8cbf36",
            "leaderId": "642687fbd58ad6becd0fa95f",
            "teamName": "Team 1",
            "listMembers": [
                "642687fbd58ad6becd0fa95f",
                "642687fbd58ad6becd0fa963"
            ],
            "createId": "642687fbd58ad6becd0fa95b",
            "createAt": "2023-03-31T07:13:00.022Z"
        }
    ]
    ```
- getAllTeamOfIdWork:
    - Api: **GET**:    https://ptask.cyclic.app/api/teams/teams-work/641eb335bb721b7cdd8cbf36
    - Reponse
    ```json
    [
        {
            "_id": "643278efa6fdbb3a058caa05",
            "teamName": "Team 1",
            "leaderName": "Nguyễn Đức Huy",
            "listMembers": [
                {
                    "id": "643278eea6fdbb3a058ca9f7",
                    "fullName": "Nguyễn Đức Huy"
                },
                {
                    "id": "643278eea6fdbb3a058ca9fb",
                    "fullName": "Nguyễn Đức Hùng"
                }
            ]
        }
    ] 
    ```
- createTeam:
    - Api: **POST**:    https://ptask.cyclic.app/api/teams/create
    - Request **status true(nhóm), false(đơn)**
    ```json
    {
        "createId":"64280789e4fa172184218593",
        "teamName":"Team Test",
        "leaderId":"64280789e4fa172184218593",
        "listMembers":["64280789e4fa172184218593","64280789e4fa172184218597"],
        "listTeams":[],
        "projectId":"6428078ae4fa1721842185ab",
    }
    ```
    - Reponse
    ```json
    {
        "_id": "6427f648e35d083e95b84c07",
        "leaderId": "642687fbd58ad6becd0fa95b",
        "teamName": "Team 1",
        "listMembers": [
            "642687fbd58ad6becd0fa95b",
            "642687fbd58ad6becd0fa95f"
        ],
        "listTeams":[],
        "createId": "642687fbd58ad6becd0fa95b",
        "createAt": "2023-04-01T09:15:52.389Z",
        "projectId": "6426a65e8b1cc3b37eb1221f",
        "status": true
    }
    ```
- changeNameTeam:
    - Api: **PATCH**:    https://ptask.cyclic.app/api/teams/change-name/63f4806dc4ec61b3edc26f6e
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
        "listMembers": [
            "642687fbd58ad6becd0fa95b",
            "642687fbd58ad6becd0fa95f"
        ],
        "listTeams":[],
        "__v": 2
    }
- addMember: 
    - Api: **PATCH**:    https://ptask.cyclic.app/api/teams/add-member/63f4806dc4ec61b3edc26f6e
    - Request
    ```json
    {
        "createId":"6429449d32e69be96008c587",
        "memberIds": ["6429449d32e69be96008c587","6429449d32e69be96008c58c"]
    }
    ```
    - Reponse
    ```json
    {
        "_id": "6429449e32e69be96008c59a",
        "leaderId": "6429449d32e69be96008c58c",
        "teamName": "Team 1",
        "listMembers": [
            "6429449d32e69be96008c58c",
            "6429449e32e69be96008c590",
            "6429449d32e69be96008c587"
        ],
        "listTeams": [],
        "createId": "6429449d32e69be96008c587",
        "createAt": "2023-04-02T09:02:22.306Z"
    }
    ```
- removeMember: 
    - Api: **PATCH**:    https://ptask.cyclic.app/api/teams/remove-member/63f4806dc4ec61b3edc26f6e
    - Request
    ```json
    {
        "memberId":"6429449d32e69be96008c587"
    }
    ```
    - Reponse
    ```json
    {
        "_id": "6429449e32e69be96008c59a",
        "leaderId": "6429449d32e69be96008c58c",
        "teamName": "Team 1",
        "listMembers": [
            "6429449d32e69be96008c58c",
            "6429449e32e69be96008c590"
        ],
        "listTeams": [],
        "createId": "6429449d32e69be96008c587",
        "createAt": "2023-04-02T09:02:22.306Z"
    }
    ```
- addTeamInTeam: 
    - Api: **PATCH**:    https://ptask.cyclic.app/api/teams/add-team/63f4806dc4ec61b3edc26f6e
    - Request
    ```json
    {
        "createId":"6429449d32e69be96008c587",
        "teamIds": ["6429449e32e69be96008c59c"]
    }
    ```
    - Reponse
    ```json
    {
        "_id": "6429449e32e69be96008c59a",
        "leaderId": "6429449d32e69be96008c58c",
        "teamName": "Team 1",
        "listMembers": [
            "6429449e32e69be96008c59c",
            "6429449d32e69be96008c58c",
            "6429449e32e69be96008c590"
        ],
        "listTeams": [
            "6429449e32e69be96008c59c"
        ],
        "createId": "6429449d32e69be96008c587",
        "createAt": "2023-04-02T09:02:22.306Z"
    }
    ```
- removeTeamInTeam: 
    - Api: **PATCH**:    https://ptask.cyclic.app/api/teams/remove-team/63f4806dc4ec61b3edc26f6e
    - Request
    ```json
    {
        "teamId":"6429449e32e69be96008c59c"
    }
    ```
    - Reponse
    ```json
    {
        "_id": "6429449e32e69be96008c59a",
        "leaderId": "6429449d32e69be96008c58c",
        "teamName": "Team 1",
        "listMembers": [
            "6429449e32e69be96008c59c",
            "6429449d32e69be96008c58c",
            "6429449e32e69be96008c590"
        ],
        "listTeams": [],
        "createId": "6429449d32e69be96008c587",
        "createAt": "2023-04-02T09:02:22.306Z"
    }
    ```
- removeTeamInProject
    - Api: **DELETE**:    https://ptask.cyclic.app/api/teams/63f4806dc4ec61b3edc26f6e/:projectId
    - Reponse
    ```json
    {
        "_id": "6429449e32e69be96008c59a",
        "leaderId": "6429449d32e69be96008c58c",
        "teamName": "Team 1",
        "listMembers": [
            "6429449e32e69be96008c59c",
            "6429449d32e69be96008c58c",
            "6429449e32e69be96008c590"
        ],
        "listTeams": [],
        "createId": "6429449d32e69be96008c587",
        "createAt": "2023-04-02T09:02:22.306Z"
    }
## Project
- getAllProject
    - Api: **GET**:    https://ptask.cyclic.app/api/projects
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
    - Api: **POST**:    https://ptask.cyclic.app/api/projects/create
    - Request
    ![image](https://user-images.githubusercontent.com/113782478/229061766-9d3673bb-3f21-4a2b-b472-310626f6ffe2.png)
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
    - Api: **GET**:    https://ptask.cyclic.app/api/projects/63f485974bad526b718962a5
    - Reponse
    ```json
    {
        "_id": "6444d8568e1db702b44a3f8d",
        "name": "Project 1",
        "startTime": "2010-03-22T17:00:00.000Z",
        "endTime": "2012-03-22T17:00:00.000Z",
        "status": false,
        "background": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/project.png",
        "teamIds": [
            "6444d8568e1db702b44a3f89",
            "6444d8568e1db702b44a3f8b",
            "644635ecf69b64c9cd07450c"
        ],
        "createdAt": "2023-04-23T07:03:50.528Z",
        "updatedAt": "2023-04-24T07:55:24.179Z",
        "__v": 0,
        "leaders": [
            "6444d8568e1db702b44a3f7b",
            "6444d8568e1db702b44a3f83",
            "6444d8568e1db702b44a3f7b"
        ],
        "mainProject": "6444d8558e1db702b44a3f77",
        "mainName": "Võ Minh Phương"
    }
    ```
- getProjectByName:
    - Api: **GET**:    https://ptask.cyclic.app/api/projects/name/name ***(:name)***
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
    - Api: **GET**:    https://ptask.cyclic.app/api/projects/id-user/64132d32a992069c9eeca5b8 ***(:id)***
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
- removeProject
    - Api: **DELETE**:    http://localhost:3000/api/projects/6444cff9f3bb45946187c2af
    - Reponse
    ```json
    {
        "_id": "6444cff9f3bb45946187c2af",
    }
    ```
## Work
- getAllWorkByProjectId:
    - Api: **GET**:    hhttps://ptask.cyclic.app/api/works/all-work-project/63f4836e4986d4991247715a
    - Reponse
    ```json
    [
        {
            "_id": "643278efa6fdbb3a058caa0d",
            "name": "Work 1",
            "status": false,
            "startTime": "2010-03-22T17:00:00.000Z",
            "endTime": "2011-03-22T17:00:00.000Z",
            "teamId": "643278efa6fdbb3a058caa05",
            "createId": "643278eea6fdbb3a058ca9f7",
            "projectId": "643278efa6fdbb3a058caa0b",
            "teamName": [
                "Team 1"
            ]
        },
        {
            "_id": "643278efa6fdbb3a058caa0f",
            "name": "Work 2",
            "status": false,
            "startTime": "2011-03-22T17:00:00.000Z",
            "endTime": "2012-03-22T17:00:00.000Z",
            "teamId": "643278efa6fdbb3a058caa07",
            "createId": "643278efa6fdbb3a058ca9ff",
            "projectId": "643278efa6fdbb3a058caa0b",
            "teamName": [
                "Team 2"
            ]
        }
    ]
    ```
- getWorkByName:
    - Api: **GET**:    http://localhost:3000/api/works/name/6454aee55e2d29d9ec8bc8f9/work 1
    - Reponse
    ```json
    [
        {
            "_id": "64577269803a4b3ab6166b44",
            "name": "1",
            "status": false,
            "startTime": "2023-04-29T17:00:00.000Z",
            "endTime": "2023-05-31T17:00:00.000Z",
            "teamId": "64577269803a4b3ab6166b42",
            "createId": "64573c83acce53ef4dab9507",
            "projectId": "64577242803a4b3ab6166b14",
            "teamName": [
                "1 Team"
            ]
        }
    ]
    ```
- getWorkById:
    - Api: **GET**:    https://ptask.cyclic.app/api/works/641eb80287c02b20789b3635
    - Reponse
    ```json
    {
        "_id": "6444d8568e1db702b44a3f8f",
        "name": "Nám 1",
        "status": false,
        "startTime": "2010-03-22T17:00:00.000Z",
        "endTime": "2011-03-22T17:00:00.000Z",
        "teamId": "6444d8568e1db702b44a3f89",
        "createId": "6444d8568e1db702b44a3f7b",
        "projectId": "6444d8568e1db702b44a3f8d",
        "teamName": "Team 1"
    }
    ```
- getWorkByIdUser:
    - Api: **GET**:    http://localhost:3000/api/works/id-user/645673277b539bdc79a198fc (id project)
    = Request 
    ```json
    {
        "userId" : "645673267b539bdc79a198f2"
    }
    ```
    - Reponse
    ```json
    [
        {
            "_id": "645673277b539bdc79a19900",
            "name": "Work 2",
            "status": false,
            "startTime": "2011-03-22T17:00:00.000Z",
            "endTime": "2012-03-22T17:00:00.000Z",
            "teamId": "645673267b539bdc79a198fa",
            "createId": "645673267b539bdc79a198f2",
            "projectId": "645673277b539bdc79a198fc",
            "teamName": "Team 2"
        }
    ]
    ```
- createWork
    - Api: **POST**:    https://ptask.cyclic.app/api/works/
    - Request
    ```json
    {
        "teamId": ["6454aee55e2d29d9ec8bc8f5"],
        "createId":"6454aee45e2d29d9ec8bc8e2",
        "name":"Work Huy 1 ",
        "startTime": "03/23/2010",
        "endTime": "03/23/2011",
        "projectId":"6454aee55e2d29d9ec8bc8f9",
        "leaderId":"6454aee45e2d29d9ec8bc8e7"
    }
    ```
    - Reponse **ManagerId nó sẽ được tạo thành leader của 1 team mới mà cái teamId trên kia là members trong đó**
    ```json
    {
        "name": "Work Huy 1 ",
        "status": false,
        "startTime": "2010-03-22T17:00:00.000Z",
        "endTime": "2011-03-22T17:00:00.000Z",
        "teamId": "6454aee55e2d29d9ec8bc8f5",
        "createId": "6454aee45e2d29d9ec8bc8e2",
        "leaderId": "6454aee45e2d29d9ec8bc8e7",
        "projectId": "6454aee55e2d29d9ec8bc8f9",
        "_id": "6454b3e25cbd47a5f822c53f",
        "createdAt": "2023-05-05T07:44:34.746Z",
        "updatedAt": "2023-05-05T07:44:34.746Z",
        "__v": 0
    }
    ```
- updateWork
    - Api: **PATCH**:    https://ptask.cyclic.app/api/works/
    - Request
    ```json
    {
        "teamId":["643278efa6fdbb3a058caa05", "643278efa6fdbb3a058caa07"],
        "name":"Work Huy tesst 3 ",
        "startTime": "03/23/2001",
        "endTime": "03/23/2002",
        "leaderId":"643278eea6fdbb3a058ca9f3"
    }
    ```
    - Reponse 
    ```json
    {
        "name": "Work Huy tesst 3 ",
        "status": false,
        "startTime": "2001-03-22T17:00:00.000Z",
        "endTime": "2002-03-22T17:00:00.000Z",
        "teamId": "6432a2de1b83802815e147f9",
        "createId": "643278eea6fdbb3a058ca9f3",
        "leaderId": null,
        "projectId": "643278efa6fdbb3a058caa0b",
        "_id": "6432a2de1b83802815e147fd",
        "createdAt": "2023-04-09T11:34:54.515Z",
        "updatedAt": "2023-04-09T11:34:54.515Z",
        "__v": 0
    }
    ```
- changeNameWork
    - Api: **PATCH**:    https://ptask.cyclic.app/api/works/change-name/641eb353bb721b7cdd8cbf38
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
    - Api: **PATCH**:    https://ptask.cyclic.app/api/works/change-status/641eb353bb721b7cdd8cbf38
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
- removeWork
    - Api: **DELETE**:    http://localhost:3000/api/works/6444cff9f3bb45946187c2af
    - Reponse
    ```json
    {
        "_id": "6444cff9f3bb45946187c2af",
    }
    ```
## Task
- createTask
    - Api: **POST**:    https://ptask.cyclic.app/api/tasks/
    - Request
    ```json
    {
        "name":"Task 2 Work 1",
        "description": "description",
        "startDay":"03-23-2001",
        "endDay":"03-23-2010",
        "startHour":"9:00",
        "endHour":"16:00",
        "workId":"643278efa6fdbb3a058caa0d",
        "members":["643278eea6fdbb3a058ca9fb"],
        "level": 1
    }
    ```
    - Reponse
    ```json
    {
        "name": "task 1",
        "description": "description",
        "startDay": "2001-03-22T17:00:00.000Z",
        "endDay": "2010-03-22T17:00:00.000Z",
        "startHour": "9:00",
        "endHour": "16:00",
        "workId": "6428078ae4fa1721842185ad",
        "members": [
            "64280789e4fa172184218597"
        ],
        "status": 3,
        "level": "Bình thường",
        "_id": "64280906e1a5e1900bfa4cde",
        "createdAt": "2023-04-01T10:35:50.654Z",
        "updatedAt": "2023-04-01T10:35:50.654Z",
        "__v": 0
    }
    ```
- getAllTaskInProject (by Id project)
    - Api: **GET**:    https://ptask.cyclic.app/api/tasks/get-task-in-project/641ba3f0efd24fc581820aba
    - Reponse
    ```json
    [
        {
            "_id": "641f0759e0289a292bde5e1c",
            "name": "task 1",
            "description": "description",
            "startDay": "2001-03-22T17:00:00.000Z",
            "endDay": "2010-03-22T17:00:00.000Z",
            "startHour": "9:00",
            "endHour": "16:00",
            "workId": "641eb80287c02b20789b3635",
            "workName": "Work 2",
            "members": [
                {
                    "name": "Nguyễn Đức Hung",
                    "avatar": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/avatar-nam.png"
                }
            ],
            "level" : 1,
            "status": 3,
            "__v": 0
        },
        {
            "_id": "641f075fe0289a292bde5e1e",
            "name": "task 2",
            "description": "description",
            "startDay": "2001-03-22T17:00:00.000Z",
            "endDay": "2010-03-22T17:00:00.000Z",
            "startHour": "9:00",
            "endHour": "16:00",
            "workId": "641eb80287c02b20789b3635",
            "workName": "Work 2",
            "members": [
                {
                    "name": "Nguyễn Đức Hung",
                    "avatar": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/avatar-nam.png"
                }
            ],
            "level":1,
            "status": 3,
            "__v": 0
        }
    ]
    ```
- getAllTaskInWork 
    - Api: **GET**:    https://ptask.cyclic.app/api/tasks/get-task-in-list/63f48728f071ef7be2a9e9bd
    - Reponse
    ```json
    [
        {
            "status": 3,
            "_id": "63f48c86c765a223ecb74b8e",
            "name": "name",
            "description": "description",
            "level": 1,
            "startDay": "2001-03-22T17:00:00.000Z",
            "endDay": "2010-03-22T17:00:00.000Z",
            "startHour": "9:00",
            "endHour": "16:00",
            "listId": "63f48728f071ef7be2a9e9bd",
            "members": [
                "63f47b681e6c6175bf4ce69c",
                "63f481f55f6bee2a60d910eb"
            ],
            "__v": 0
        },
        {
            "_id": "640745aa372921bca42eae22",
            "name": "name",
            "description": "description",
            "level": 1,
            "startDay": "2001-03-22T17:00:00.000Z",
            "endDay": "2010-03-22T17:00:00.000Z",
            "startHour": "9:00",
            "endHour": "16:00",
            "listId": "63f48728f071ef7be2a9e9bd",
            "members": [
                "63f47b681e6c6175bf4ce69c",
                "63f481f55f6bee2a60d910eb"
            ],
            "status": 3,
            "__v": 0
        }
    ]
    ```
- getTaskById
    - Api: **GET**:    https://ptask.cyclic.app/api/tasks/63f48c86c765a223ecb74b8e
    - Reponse
    ```json
    {
        "_id": "644f0b227803eeb315da8fb3",
        "name": "Demo",
        "description": "ffff",
        "level": 2,
        "startDay": "2023-04-30T00:00:00.000Z",
        "endDay": "2023-04-30T00:00:00.000Z",
        "startHour": "13:01",
        "endHour": "17:02",
        "workId": "644a7c32d014f3bd84234e5f",
        "workName": "RedMiu123",
        "members": [
            "6444d8568e1db702b44a3f7b",
            "6444d8568e1db702b44a3f87",
            "6444d8568e1db702b44a3f7f"
        ],
        "status": false,
        "__v": 0
    }
    ```
- getTaskByName:
    - Api: **GET**:    https://ptask.cyclic.app/api/tasks/name/Task 1 Work 1 ***(:name)***

    - Request
    ```json
    {
        "projectId": "6447c816a980f937d79eb973"
    }
    ```
    - Reponse
    ```json
    [
        {
            "_id": "6447cdb779b011741ccca4ac",
            "name": "RedMiu123",
            "startDay": "2023-03-26T00:00:00.000Z",
            "endDay": "2023-03-26T00:00:00.000Z",
            "startHour": "20:56",
            "endHour": "10:58",
            "workId": "6447cd7ae12c0a9a41b75626",
            "workName": "RedMiu999",
            "members": [
                {
                    "name": "Nguyễn Đức Hùng",
                    "avatar": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/avatar-nam.png"
                },
                {
                    "name": "Nguyễn Đức Huy",
                    "avatar": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/avatar-nam.png"
                },
                {
                    "name": "Nguyễn Việt Nam",
                    "avatar": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/avatar-nam.png"
                }
            ],
            "status": false,
            "level": 1,
            "createdAt": "2023-04-25T12:55:19.547Z",
            "updatedAt": "2023-04-25T12:55:19.547Z",
            "__v": 0
        }
    ]
    ```
- updateTask
    - Api: **PATCH**:    https://ptask.cyclic.app/api/tasks/update/63f48c272df79e949fe9243b
    - Request
    ```json
    {
        "name":"task test update",
        "startDay":"03-23-2001",
        "endDay":"03-23-20100",
        "startHour":"9:00",
        "description": "description",
        "endHour":"16:00",
        "userId":"641eb24fbb721b7cdd8cbf25",
        "level":2,
        "status": true,
        "members":[ "641eb24fbb721b7cdd8cbf25"]
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
        "workId": "641eb7fc87c02b20789b3633",
        "members": [
            "641eb24fbb721b7cdd8cbf25"
        ],
        "status": true,
        "description": "description",
        "level": 2,
        "__v": 0
    }
    ```
- removeTask
    - Api: **PATCH**:    http://localhost:3000/api/tasks/63f48c272df79e949fe9243b
    - Reponse
    ```json
    {
        "_id": "63f48c272df79e949fe9243b"
    }
    ```
- changeStatus
    - Api: **PATCH**:    http://localhost:3000/api/tasks/update-status/63f48c272df79e949fe9243b
    - Reponse
    ```json
    {
        "_id": "641eb81187c02b20789b3637",
        "name": "task test update",
        "startDay": "2001-03-22T17:00:00.000Z",
        "endDay": "2010-03-22T17:00:00.000Z",
        "startHour": "9:00",
        "endHour": "16:00",
        "workId": "641eb7fc87c02b20789b3633",
        "members": [
            "641eb24fbb721b7cdd8cbf25"
        ],
        "status": true,
        "description": "description",
        "level": 1,
        "__v": 0
    }
    ```
## Note
- getAllNotes
    - Api: **GET**:    https://ptask.cyclic.app/api/notes/
    - Reponse
    ```json
    [
        {
            "_id": "6448a35c0d4b2e5c5edb0e1f",
            "text": "Note 1",
            "links": [
                "ABC"
            ],
            "taskId": "6447cdb779b011741ccca4ac",
            "createId": "6444d8568e1db702b44a3f7f",
            "createdAt": "2023-04-26T04:06:52.732Z",
            "updatedAt": "2023-04-26T04:06:52.732Z",
            "__v": 0
        }
    ]
    ```
- getAllNoteByIdTask 
    - Api: **GET**:    http://localhost:3000/api/notes/task/6447cdb779b011741ccca4ac
    - Reponse
    ```json
    [
        {
            "_id": "6448a6fb6ae435d66e655b58",
            "text": "Note 1",
            "links": [
                "ABC"
            ],
            "taskId": "6447cdb779b011741ccca4ac",
            "createId": "6444d8568e1db702b44a3f7f",
            "createdAt": "2023-04-26T04:22:19.277Z",
            "updatedAt": "2023-04-26T04:22:19.277Z",
            "__v": 0
        },
        {
            "_id": "6448a6fd6ae435d66e655b5a",
            "text": "Note 2",
            "links": [
                "ABC"
            ],
            "taskId": "6447cdb779b011741ccca4ac",
            "createId": "6444d8568e1db702b44a3f7f",
            "createdAt": "2023-04-26T04:22:21.997Z",
            "updatedAt": "2023-04-26T04:22:21.997Z",
            "__v": 0
        },
        {
            "_id": "6448a7016ae435d66e655b5c",
            "text": "Note 3",
            "links": [
                "ABC"
            ],
            "taskId": "6447cdb779b011741ccca4ac",
            "createId": "6444d8568e1db702b44a3f7f",
            "createdAt": "2023-04-26T04:22:25.560Z",
            "updatedAt": "2023-04-26T04:22:25.560Z",
            "__v": 0
        }
    ]
    ```
- getNoteById 
    - Api: **GET**:    https://ptask.cyclic.app/api/notes/6448a35c0d4b2e5c5edb0e1f
    - Reponse
    ```json
    {
        "_id": "6448a35c0d4b2e5c5edb0e1f",
        "text": "Note 1",
        "links": [
            "ABC"
        ],
        "taskId": "6447cdb779b011741ccca4ac",
        "createId": "6444d8568e1db702b44a3f7f",
        "createdAt": "2023-04-26T04:06:52.732Z",
        "updatedAt": "2023-04-26T04:06:52.732Z",
        "__v": 0
    }
    ```
- createNote
    - Api: **POST**:    https://ptask.cyclic.app/api/notes/
    - Request
    ```json
    {
        "text": "Note 1" ,
        "links": ["ABC"],
        "taskId": "6447cdb779b011741ccca4ac" ,
        "createId": "6444d8568e1db702b44a3f7f"
    }
    ```
    - Reponse
    ```json
    {
        "text": "Note 1",
        "links": [
            "ABC"
        ],
        "taskId": "6447cdb779b011741ccca4ac",
        "createId": "6444d8568e1db702b44a3f7f",
        "_id": "6448a35c0d4b2e5c5edb0e1f",
        "createdAt": "2023-04-26T04:06:52.732Z",
        "updatedAt": "2023-04-26T04:06:52.732Z",
        "__v": 0
    }
    ```
- removeNote
    - Api: **DELETE**:    https://ptask.cyclic.app/api/notes/6448a35c0d4b2e5c5edb0e1f
    - Reponse
    ```json
    {
        "_id": "6448a35c0d4b2e5c5edb0e1f"
    }
    ```
- updateNote
    - Api: **PATCH**:    https://ptask.cyclic.app/api/notes/63f48c272df79e949fe9243b
    - Request
    ```json
    {
        "text": "Note 1",
        "links": ["ABC"],
        "createId": "6444d8568e1db702b44a3f7f"
    }
    ```
    - Reponse
    ```json
    {
        "text": "Note 1",
        "links": [
            "ABC"
        ],
        "taskId": "6447cdb779b011741ccca4ac",
        "createId": "6444d8568e1db702b44a3f7f",
        "_id": "6448a35c0d4b2e5c5edb0e1f",
        "createdAt": "2023-04-26T04:06:52.732Z",
        "updatedAt": "2023-04-26T04:06:52.732Z",
        "__v": 0
    }
    ```