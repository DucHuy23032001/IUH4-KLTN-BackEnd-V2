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
        "accountId": "6406b883e37a41dce48544d5",
        "userId": "63f47b681e6c6175bf4ce69c",
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
        "user": {
            "fullName": "A",
            "birthday": "2023-02-01T17:00:00.000Z",
            "address": "123",
            "phoneNumber": "0879276284",
            "gender": true,
            "status": true,
            "avatar": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/597c706a93754e2b1764.jpg",
            "accountId": "6423e741055181cb4e436f06",
            "_id": "6423e742055181cb4e436f08",
            "createdAt": "2023-03-29T07:22:42.531Z",
            "updatedAt": "2023-03-29T07:22:42.531Z",
            "__v": 0
        },
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
            "_id": "641eb30abb721b7cdd8cbf30",
            "teamName": "Team 2",
            "leaderName": "Nguyễn Đức Phuong",
            "workName": "Demo work"
        },
        {
            "_id": "641eb315bb721b7cdd8cbf32",
            "team": "Team 1",
            "leaderName": "Nguyễn Đức Phuong",
            "works": "Test change name 1"
        }
    ]
    ```
- getAllTeamOfIdProject:
    - Api: **GET**:    hhttps://ptask.cyclic.app/api/teams/teams/641eb335bb721b7cdd8cbf36
    - Reponse
    ```json
    [
        {
            "_id": "641eb30abb721b7cdd8cbf30",
            "teamName": "Team 2",
            "leaderName": "Nguyễn Đức Phuong",
            "workName": "Demo work"
        },
        {
            "_id": "641eb315bb721b7cdd8cbf32",
            "team": "Team 1",
            "leaderName": "Nguyễn Đức Phuong",
            "works": "Test change name 1"
        }
    ]
    ```
- getAllMemberOfIdProject:
    - Api: **GET**:    https://ptask.cyclic.app/api/teams/members-project/641ba3f0efd24fc581820aba
    - Reponse
    ```json
    [
        {
            "_id": "641eb24fbb721b7cdd8cbf25",
            "teamName": "Team 2",
            "name": "Nguyễn Đức Hung",
            "avatar": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/avatar-nam.png",
            "task": [
                "task 1",
                "task 2"
            ]
        },
        {
            "_id": "641eb24fbb721b7cdd8cbf25",
            "teamName": "Team 2",
            "name": "Nguyễn Đức Phuong",
            "avatar": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/avatar-nam.png",
            "task": []
        }
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
    - Api: **POST**:    https://ptask.cyclic.app/api/teams/create
    - Request
    ```json
    {
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
        "_id": "641ba36e87b485c176a160bc",
        "__v": 0
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
        "members": [
            "63f47b681e6c6175bf4ce69c"
        ],
        "__v": 2
    }
- addMembersTeam: **Đang có bug**
    - Api: **PATCH**:    https://ptask.cyclic.app/api/teams/add-member/63f4806dc4ec61b3edc26f6e
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
    - Api: **PATCH**:    https://ptask.cyclic.app/api/teams/remove-member/63f4806dc4ec61b3edc26f6e
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
        "_id": "642687fcd58ad6becd0fa971",
        "name": "Project 1",
        "startTime": "2010-03-22T17:00:00.000Z",
        "endTime": "2012-03-22T17:00:00.000Z",
        "status": false,
        "background": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/project.png",
        "teamIds": [
            "642687fcd58ad6becd0fa96d",
            "642687fcd58ad6becd0fa96f"
        ],
        "createdAt": "2023-03-31T07:13:00.140Z",
        "updatedAt": "2023-03-31T07:13:00.140Z",
        "__v": 0,
        "leaders": [
            "642687fbd58ad6becd0fa95f",
            "642687fbd58ad6becd0fa967"
        ],
        "mainProject": "642687fbd58ad6becd0fa95b"
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
## Work
- getAllWorkByProjectId:
    - Api: **GET**:    hhttps://ptask.cyclic.app/api/works/all-work-project/63f4836e4986d4991247715a
    - Reponse
    ```json
    [
        {
            "_id": "641eca7e1719488051e48de7",
            "name": "Work 2",
            "status": false,
            "startTime": "2001-03-22T17:00:00.000Z",
            "endTime": "2002-03-22T17:00:00.000Z",
            "teamId": "641eb315bb721b7cdd8cbf32",
            "createId": "641eb25bbb721b7cdd8cbf2b",
            "projectId": "641eb335bb721b7cdd8cbf36",
            "teamName": "Team 1"
        },
        {
            "_id": "641ecaaaa4524814a198f0c3",
            "name": "Work 2",
            "status": false,
            "startTime": "2001-03-22T17:00:00.000Z",
            "endTime": "2002-03-22T17:00:00.000Z",
            "teamId": "641eb315bb721b7cdd8cbf32",
            "createId": "641eb25bbb721b7cdd8cbf2b",
            "projectId": "641eb335bb721b7cdd8cbf36",
            "teamName": "Team 1"
        }
    ]
    ```
- getWorkByName:
    - Api: **GET**:    https://ptask.cyclic.app/api/works/name/Work 2
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
    - Api: **GET**:    https://ptask.cyclic.app/api/works/641eb80287c02b20789b3635
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
    - Api: **POST**:    https://ptask.cyclic.app/api/works/
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
## Task
- createTask
    - Api: **POST**:    https://ptask.cyclic.app/api/tasks/
    - Request
    ```json
    {
        "name":"task 2",
        "startDay":"03-23-2001",
        "endDay":"03-23-2010",
        "startHour":"9:00",
        "endHour":"16:00",
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
        "imageLink": [],
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
    - Api: **GET**:    https://ptask.cyclic.app/api/tasks/get-task-in-project/641ba3f0efd24fc581820aba
    - Reponse
    ```json
    [
        {
            "_id": "641f0759e0289a292bde5e1c",
            "name": "task 1",
            "startDay": "2001-03-22T17:00:00.000Z",
            "endDay": "2010-03-22T17:00:00.000Z",
            "startHour": "9:00",
            "endHour": "16:00",
            "imageLink": "ABC",
            "workId": "641eb80287c02b20789b3635",
            "workName": "Work 2",
            "members": [
                {
                    "name": "Nguyễn Đức Hung",
                    "avatar": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/avatar-nam.png"
                }
            ],
            "status": 3,
            "linkSupports": [],
            "__v": 0
        },
        {
            "_id": "641f075fe0289a292bde5e1e",
            "name": "task 2",
            "startDay": "2001-03-22T17:00:00.000Z",
            "endDay": "2010-03-22T17:00:00.000Z",
            "startHour": "9:00",
            "endHour": "16:00",
            "imageLink": "ABC",
            "workId": "641eb80287c02b20789b3635",
            "workName": "Work 2",
            "members": [
                {
                    "name": "Nguyễn Đức Hung",
                    "avatar": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/avatar-nam.png"
                }
            ],
            "status": 3,
            "linkSupports": [],
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
    - Api: **GET**:    https://ptask.cyclic.app/api/tasks/63f48c86c765a223ecb74b8e
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
    - Api: **GET**:    https://ptask.cyclic.app/api/tasks/name/name ***(:name)***
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
    - Api: **PATCH**:    https://ptask.cyclic.app/api/tasks/update/63f48c272df79e949fe9243b
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