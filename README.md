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
    {
        "_id": "6465ba8cfcd3c0a33f09c306",
        "leaderId": "6465ba8cfcd3c0a33f09c2f2",
        "teamName": "Âm nhạc",
        "listMembers": [
            "6465ba8cfcd3c0a33f09c2f6",
            "6465ba8cfcd3c0a33f09c2fa",
            "6465ba8cfcd3c0a33f09c2fe",
            "6465ba8cfcd3c0a33f09c302"
        ],
        "createId": "6465ba8bfcd3c0a33f09c2ed",
        "createAt": "2023-05-18T05:41:32.593Z"
    }
    ```
- getAllTeamOfIdProject:
    - Api: **GET**:    https://ptask.cyclic.app/api/teams/teams-project/641eb335bb721b7cdd8cbf36
    - Reponse
    ```json
    [
        {
            "_id": "6465ba8cfcd3c0a33f09c306",
            "teamName": "Âm nhạc",
            "leaderName": "Võ Minh Phương",
            "workName": [
                "Chuẩn bị",
                "Tập luyện",
                "Trình diễn"
            ],
            "leaderId": "6465ba8cfcd3c0a33f09c2f2"
        }
    ]
    ```
- getTeamByName:
    - Api: **GET**:    http://localhost:3000/api/teams/name/64574176803a4b3ab6165a43/Nhóm 123
    - Reponse
    ```json
    [
        {
            "_id": "6465ba8cfcd3c0a33f09c306",
            "teamName": "Âm nhạc",
            "leaderName": "Võ Minh Phương",
            "workName": [
                "Chuẩn bị",
                "Tập luyện",
                "Trình diễn"
            ],
            "leaderId": "6465ba8cfcd3c0a33f09c2f2"
        }
    ]
    ```
- getMemberByName:
    - Api: **GET**:    http://localhost:3000/api/teams/member-project/645f50b1cad5045a9011bd78/Nguyễn Đức Huy
    - Reponse
    ```json
    [
        {
            "_id": "6465ba8cfcd3c0a33f09c2f6",
            "teamName": [
                "Âm nhạc"
            ],
            "position": "Member",
            "name": "Nguyễn Đức Huy",
            "avatar": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/Huy.jpg",
            "task": []
        }
    ]
    ```
- getAllMemberOfIdProject:
    - Api: **GET**:    https://ptask.cyclic.app/api/teams/members-project/641ba3f0efd24fc581820aba
    - Reponse
    ```json
    [
    {
        "_id": "6465ba8cfcd3c0a33f09c2fe",
        "teamName": [
            "Âm nhạc"
        ],
        "position": "Member",
        "name": "Nguyễn Việt Hoàng",
        "avatar": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/2.jpg",
        "task": []
    },
    {
        "_id": "6465ba8cfcd3c0a33f09c302",
        "teamName": [
            "Âm nhạc"
        ],
        "position": "Member",
        "name": "Nguyễn Việt Nam",
        "avatar": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/avatar-nam.png",
        "task": []
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
    - Request 
    ```json
    {
        "createId":"64280789e4fa172184218593",
        "teamName":"Team Test",
        "projectId":"6428078ae4fa1721842185ab",
    }
    ```
    - Reponse
    ```json
    {
        "_id": "6465c1439976312b5970fde8",
        "teamName": "Team Huy Tạo",
        "listMembers": [],
        "leaderId": null,
        "createId": "6465ba8bfcd3c0a33f09c2ed",
        "createAt": "2023-05-18T06:10:11.992Z",
        "projectId": "6465ba8cfcd3c0a33f09c2f2"
    }
    ```
- updateTeam:
    - Api: **PATCH**:    https://ptask.cyclic.app/api/teams
    - Request 
    ```json
    {
        "createId":"64280789e4fa172184218593",
        "teamName":"Team Test",
        "projectId":"6428078ae4fa1721842185ab",
    }
    ```
    - Reponse
    ```json
    {
        "_id": "6427f648e35d083e95b84c07",
        "teamName": "Team 1",
        "createId": "642687fbd58ad6becd0fa95b",
        "createAt": "2023-04-01T09:15:52.389Z",
        "projectId": "6426a65e8b1cc3b37eb1221f",
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
    - Api: **DELETE**:    https://ptask.cyclic.app/api/teams/6429449e32e69be96008c59a
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
            "_id": "6465ba8cfcd3c0a33f09c304",
            "name": "Khai giảng năm học",
            "startTime": "2023-06-04T17:00:00.000Z",
            "endTime": "2023-09-04T17:00:00.000Z",
            "status": false,
            "background": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/project.png",
            "teamIds": [
                "6465ba8cfcd3c0a33f09c306"
            ],
            "mainProject": "6465ba8bfcd3c0a33f09c2ed",
            "mainName": "Nguyễn Văn Nghĩa"
        }
    ]
    ```
- createProject
    - Api: **POST**:    https://ptask.cyclic.app/api/projects/create
    - Request
        inboxx
    - Reponse
    ```json
    {
        "_id": "6465cee9cca13ef5d0ef2ba2",
        "name": "Khai giảng năm học Phương",
        "startTime": "2023-06-04T17:00:00.000Z",
        "endTime": "2023-09-04T17:00:00.000Z",
        "status": false,
        "background": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/project.png",
        "teamIds": [],
        "mainProject": "6465ba8cfcd3c0a33f09c2f2",
        "mainName": "Võ Minh Phương"
    }
    ```
- getProjectById:
    - Api: **GET**:    https://ptask.cyclic.app/api/projects/63f485974bad526b718962a5
    - Reponse
    ```json
    {
        "_id": "6465ba8cfcd3c0a33f09c304",
        "name": "Khai giảng năm học",
        "startTime": "2023-06-04T17:00:00.000Z",
        "endTime": "2023-09-04T17:00:00.000Z",
        "status": false,
        "background": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/project.png",
        "teamIds": [
            "6465ba8cfcd3c0a33f09c306"
        ],
        "mainProject": "6465ba8bfcd3c0a33f09c2ed",
        "mainName": "Nguyễn Văn Nghĩa"
    }
    ```
- getProjectByName:
    - Api: **GET**:    https://ptask.cyclic.app/api/projects/name/name ***(:name)***
    - Reponse
    ```json
    [
        {
            "_id": "6465ba8cfcd3c0a33f09c304",
            "name": "Khai giảng năm học",
            "startTime": "2023-06-04T17:00:00.000Z",
            "endTime": "2023-09-04T17:00:00.000Z",
            "status": false,
            "background": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/project.png",
            "teamIds": [
                "6465ba8cfcd3c0a33f09c306"
            ],
            "mainProject": "6465ba8bfcd3c0a33f09c2ed",
            "mainName": "Nguyễn Văn Nghĩa"
        },
        {
            "_id": "6465ce5c83c39850efd79f50",
            "name": "Khai giảng năm học Phương",
            "startTime": "2023-06-04T17:00:00.000Z",
            "endTime": "2023-09-04T17:00:00.000Z",
            "status": false,
            "background": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/project.png",
            "teamIds": [],
            "mainProject": "6465ba8cfcd3c0a33f09c2f2",
            "mainName": "Võ Minh Phương"
        }
    ]
    ```
- getProjectByIdUser:
    - Api: **GET**:    https://ptask.cyclic.app/api/projects/id-user/64132d32a992069c9eeca5b8 ***(:id)***
    - Reponse
    ```json
    [
        {
            "_id": "6465cecc1aadb59cf622e895",
            "name": "Khai giảng năm học Phương",
            "startTime": "2023-06-04T17:00:00.000Z",
            "endTime": "2023-09-04T17:00:00.000Z",
            "status": false,
            "background": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/project.png",
            "teamIds": [],
            "mainProject": "6465ba8cfcd3c0a33f09c2f2",
            "mainName": "Võ Minh Phương"
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
            "_id": "6465ba8cfcd3c0a33f09c312",
            "name": "Chuẩn bị",
            "status": false,
            "startTime": "2023-06-04T17:00:00.000Z",
            "endTime": "2023-06-14T17:00:00.000Z",
            "teamId": [
                "6465ba8cfcd3c0a33f09c306"
            ],
            "createId": "6465ba8bfcd3c0a33f09c2ed",
            "projectId": "6465ba8cfcd3c0a33f09c304",
            "leaderId": [
                "6465ba8cfcd3c0a33f09c2f2"
            ],
            "teamName": [
                "Âm nhạc"
            ]
        },
        {
            "_id": "6465ba8cfcd3c0a33f09c314",
            "name": "Tập luyện",
            "status": false,
            "startTime": "2023-06-04T17:00:00.000Z",
            "endTime": "2023-06-14T17:00:00.000Z",
            "teamId": [
                "6465ba8cfcd3c0a33f09c306"
            ],
            "createId": "6465ba8bfcd3c0a33f09c2ed",
            "projectId": "6465ba8cfcd3c0a33f09c304",
            "leaderId": [
                "6465ba8cfcd3c0a33f09c2f2"
            ],
            "teamName": [
                "Âm nhạc"
            ]
        },
        {
            "_id": "6465ba8dfcd3c0a33f09c316",
            "name": "Trình diễn",
            "status": false,
            "startTime": "2023-06-04T17:00:00.000Z",
            "endTime": "2023-06-14T17:00:00.000Z",
            "teamId": [
                "6465ba8cfcd3c0a33f09c306"
            ],
            "createId": "6465ba8bfcd3c0a33f09c2ed",
            "projectId": "6465ba8cfcd3c0a33f09c304",
            "leaderId": [
                "6465ba8cfcd3c0a33f09c2f2"
            ],
            "teamName": [
                "Âm nhạc"
            ]
        }
    ]
    ```
- getWorkByName:
    - Api: **GET**:    http://localhost:3000/api/works/name/6465ba8cfcd3c0a33f09c304/Chuẩn
    - Reponse
    ```json
    [
        {
            "_id": "6465ba8cfcd3c0a33f09c312",
            "name": "Chuẩn bị",
            "status": false,
            "startTime": "2023-06-04T17:00:00.000Z",
            "endTime": "2023-06-14T17:00:00.000Z",
            "teamId": [
                "6465ba8cfcd3c0a33f09c306"
            ],
            "createId": "6465ba8bfcd3c0a33f09c2ed",
            "projectId": "6465ba8cfcd3c0a33f09c304",
            "leaderId": [
                "6465ba8cfcd3c0a33f09c2f2"
            ],
            "teamName": [
                "Âm nhạc"
            ]
        }
    ]
    ```
- getWorkById:
    - Api: **GET**:    https://ptask.cyclic.app/api/works/641eb80287c02b20789b3635
    - Reponse
    ```json
    {
        "_id": "6465ba8cfcd3c0a33f09c312",
        "name": "Chuẩn bị",
        "status": false,
        "startTime": "2023-06-04T17:00:00.000Z",
        "endTime": "2023-06-14T17:00:00.000Z",
        "teamId": [
            "6465ba8cfcd3c0a33f09c306"
        ],
        "createId": "6465ba8bfcd3c0a33f09c2ed",
        "projectId": "6465ba8cfcd3c0a33f09c304",
        "leaderId": [
            "6465ba8cfcd3c0a33f09c2f2"
        ],
        "teamName": [
            "Âm nhạc"
        ]
    }
    ```
- getWorkByIdUser:
    - Api: **GET**:    http://localhost:3000/api/works/id-user/645673277b539bdc79a198fc/:userId (id project)
    - Reponse
    ```json
    [
        {
            "_id": "6465ba8cfcd3c0a33f09c312",
            "name": "Chuẩn bị",
            "status": false,
            "startTime": "2023-06-04T17:00:00.000Z",
            "endTime": "2023-06-14T17:00:00.000Z",
            "teamId": [
                "6465ba8cfcd3c0a33f09c306"
            ],
            "createId": "6465ba8bfcd3c0a33f09c2ed",
            "projectId": "6465ba8cfcd3c0a33f09c304",
            "leaderId": [
                "6465ba8cfcd3c0a33f09c2f2"
            ],
            "teamName": [
                "Âm nhạc"
            ]
        },
        {
            "_id": "6465ba8cfcd3c0a33f09c314",
            "name": "Tập luyện",
            "status": false,
            "startTime": "2023-06-04T17:00:00.000Z",
            "endTime": "2023-06-14T17:00:00.000Z",
            "teamId": [
                "6465ba8cfcd3c0a33f09c306"
            ],
            "createId": "6465ba8bfcd3c0a33f09c2ed",
            "projectId": "6465ba8cfcd3c0a33f09c304",
            "leaderId": [
                "6465ba8cfcd3c0a33f09c2f2"
            ],
            "teamName": [
                "Âm nhạc"
            ]
        },
        {
            "_id": "6465ba8dfcd3c0a33f09c316",
            "name": "Trình diễn",
            "status": false,
            "startTime": "2023-06-04T17:00:00.000Z",
            "endTime": "2023-06-14T17:00:00.000Z",
            "teamId": [
                "6465ba8cfcd3c0a33f09c306"
            ],
            "createId": "6465ba8bfcd3c0a33f09c2ed",
            "projectId": "6465ba8cfcd3c0a33f09c304",
            "leaderId": [
                "6465ba8cfcd3c0a33f09c2f2"
            ],
            "teamName": [
                "Âm nhạc"
            ]
        }
    ]
    ```
- createWork
    - Api: **POST**:    https://ptask.cyclic.app/api/works/
    - Request
    ```json
    {
        "createId":"6454aee45e2d29d9ec8bc8e2",
        "name":"Work Huy 1 ",
        "startTime": "03/23/2010",
        "endTime": "03/23/2011",
        "projectId":"6454aee55e2d29d9ec8bc8f9",
    }
    ```
    - Reponse **ManagerId nó sẽ được tạo thành leader của 1 team mới mà cái teamId trên kia là members trong đó**
    ```json
    {
        "_id": "6465c92391e0aba71b4a8eeb",
        "name": "Trình diễn 2",
        "status": false,
        "startTime": "2023-08-31T17:00:00.000Z",
        "endTime": "2023-09-04T17:00:00.000Z",
        "teamId": [],
        "createId": "6465ba8bfcd3c0a33f09c2ed",
        "projectId": "6465ba8cfcd3c0a33f09c304",
        "leaderId": [],
        "teamName": []
    }
    ```
- updateWork
    - Api: **PATCH**:    https://ptask.cyclic.app/api/works/645f50b1cad5045a9011bd7a
    - Request
    ```json
    {
        "name":"Trinh dien 3",
        "startTime":"09-01-2023",
        "endTime":"09-4-2023",
    }
    ```
    - Reponse 
    ```json
    {
        "_id": "6465db976bddd3877e14732b",
        "name": "Trinh dien 31",
        "status": false,
        "startTime": "2023-08-31T17:00:00.000Z",
        "endTime": "2023-09-03T17:00:00.000Z",
        "teamId": [],
        "createId": "6465ba8bfcd3c0a33f09c2ed",
        "projectId": "6465ba8cfcd3c0a33f09c304",
        "leaderId": [],
        "teamName": []
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
        "_id": "6465c92391e0aba71b4a8eeb",
        "name": "Test change name 1",
        "status": false,
        "startTime": "2023-08-31T17:00:00.000Z",
        "endTime": "2023-09-03T17:00:00.000Z",
        "teamId": [],
        "createId": "6465ba8bfcd3c0a33f09c2ed",
        "projectId": "6465ba8cfcd3c0a33f09c304",
        "leaderId": [],
        "teamName": []
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
        "_id": "6465c92391e0aba71b4a8eeb",
        "name": "Test change name 1",
        "status": true,
        "startTime": "2023-08-31T17:00:00.000Z",
        "endTime": "2023-09-03T17:00:00.000Z",
        "teamId": [],
        "createId": "6465ba8bfcd3c0a33f09c2ed",
        "projectId": "6465ba8cfcd3c0a33f09c304",
        "leaderId": [],
        "teamName": []
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
            "_id": "645f5e0d6cc2f8ee9a40b886",
            "name": "ssss",
            "description": "dđ",
            "level": 1,
            "startDay": "2023-05-07T17:00:00.000Z",
            "endDay": "2023-05-23T17:00:00.000Z",
            "startHour": "04:53",
            "endHour": "04:53",
            "workId": "645f5c9e16546fb84d14d2ff",
            "workName": "Công việc 2",
            "members": [
                {
                    "_id": "645f50b0cad5045a9011bd6a",
                    "name": "Nguyễn Đức Hùng",
                    "avatar": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/avatar-nam.png"
                }
            ],
            "status": true,
            "__v": 0
        }
    ]
    ```
- getAllTaskInWork 
    - Api: **GET**:    http://localhost:3000/api/tasks/get-task-in-work/645bb9e2fb4144361c7698a6
    - Reponse
    ```json
    [
        {
            "_id": "645d0cc85d50058b05aff56d",
            "name": "ddd",
            "description": "123",
            "level": 2,
            "startDay": "2023-05-10T17:00:00.000Z",
            "endDay": "2023-05-14T17:00:00.000Z",
            "startHour": "22:41",
            "endHour": "10:41",
            "workId": "645bb9e2fb4144361c7698a6",
            "workName": "RedMiu",
            "members": [
                {
                    "name": "Nguyễn Việt Nam",
                    "avatar": "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/avatar-nam.png"
                }
            ],
            "status": false,
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
    - Api: **GET**:    https://ptask.cyclic.app/api/tasks/name/:projectId/Task 1 Work 1 ***(:name)***
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
            "taskId": "6447cdb779b011741ccca4ac",
            "createId": "6444d8568e1db702b44a3f7f",
            "createdAt": "2023-04-26T04:22:19.277Z",
            "updatedAt": "2023-04-26T04:22:19.277Z",
            "__v": 0
        },
        {
            "_id": "6448a6fd6ae435d66e655b5a",
            "text": "Note 2",
            "taskId": "6447cdb779b011741ccca4ac",
            "createId": "6444d8568e1db702b44a3f7f",
            "createdAt": "2023-04-26T04:22:21.997Z",
            "updatedAt": "2023-04-26T04:22:21.997Z",
            "__v": 0
        },
        {
            "_id": "6448a7016ae435d66e655b5c",
            "text": "Note 3",
            "taskId": "6447cdb779b011741ccca4ac",
            "createId": "6444d8568e1db702b44a3f7f",
            "createdAt": "2023-04-26T04:22:25.560Z",
            "updatedAt": "2023-04-26T04:22:25.560Z",
            "__v": 0
        }
    ]
    ```
- getAllNoteByIdWork 
    - Api: **GET**:    http://localhost:3000/api/notes/work/6447cdb779b011741ccca4ac
    - Reponse
    ```json
    [
        {
            "_id": "6448a6fb6ae435d66e655b58",
            "text": "Note 1",
            "taskId": null,
            "workId": "6447cdb779b011741ccca4ac",
            "createId": "6444d8568e1db702b44a3f7f",
            "createdAt": "2023-04-26T04:22:19.277Z",
            "updatedAt": "2023-04-26T04:22:19.277Z",
            "__v": 0
        },
        {
            "_id": "6448a6fd6ae435d66e655b5a",
            "text": "Note 2",
            "taskId": null,
            "workId": "6447cdb779b011741ccca4ac",
            "createId": "6444d8568e1db702b44a3f7f",
            "createdAt": "2023-04-26T04:22:21.997Z",
            "updatedAt": "2023-04-26T04:22:21.997Z",
            "__v": 0
        },
        {
            "_id": "6448a7016ae435d66e655b5c",
            "text": "Note 3",
            "taskId": null,
            "workId": "6447cdb779b011741ccca4ac",
            "createId": "6444d8568e1db702b44a3f7f",
            "createdAt": "2023-04-26T04:22:25.560Z",
            "updatedAt": "2023-04-26T04:22:25.560Z",
            "__v": 0
        }
    ]
    ```
- getNoteById 
    - Api: **GETT**:    https://ptask.cyclic.app/api/notes/6448a35c0d4b2e5c5edb0e1f
    - Reponse
    ```json
    {
        "_id": "6448a35c0d4b2e5c5edb0e1f",
        "text": "Note 1",
        "taskId": "6447cdb779b011741ccca4ac",
        "createId": "6444d8568e1db702b44a3f7f",
        "createdAt": "2023-04-26T04:06:52.732Z",
        "updatedAt": "2023-04-26T04:06:52.732Z",
        "__v": 0
    }
    ```
- createNoteTask
    - Api: **POST**:    https://ptask.cyclic.app/api/notes/task
    - Request
    ```json
    {
        "text": "Note 1" ,
        "taskId": "6447cdb779b011741ccca4ac" ,
        "createId": "6444d8568e1db702b44a3f7f"
    }
    ```
    - Reponse
    ```json
    {
        "text": "Note 1",
        "workId": null,
        "taskId": "6447cdb779b011741ccca4ac",
        "createId": "6444d8568e1db702b44a3f7f",
        "_id": "6448a35c0d4b2e5c5edb0e1f",
        "createdAt": "2023-04-26T04:06:52.732Z",
        "updatedAt": "2023-04-26T04:06:52.732Z",
        "__v": 0
    }
    ```
- createNoteWork
    - Api: **POST**:    https://ptask.cyclic.app/api/notes/work
    - Request
    ```json
    {
        "text": "Note 1" ,
        "workId": "6447cdb779b011741ccca4ac" ,
        "createId": "6444d8568e1db702b44a3f7f"
    }
    ```
    - Reponse
    ```json
    {
        "text": "Note 1",
        "taskId": null,
        "workId": "6447cdb779b011741ccca4ac",
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
        "createId": "6444d8568e1db702b44a3f7f"
    }
    ```
    - Reponse
    ```json
    {
        "text": "Note 1",
        "taskId": "6447cdb779b011741ccca4ac",
        "createId": "6444d8568e1db702b44a3f7f",
        "_id": "6448a35c0d4b2e5c5edb0e1f",
        "createdAt": "2023-04-26T04:06:52.732Z",
        "updatedAt": "2023-04-26T04:06:52.732Z",
        "__v": 0
    }
    ```