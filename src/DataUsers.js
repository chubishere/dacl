export default {
	users: [
		{
			email: 'fred@dad.com',
			clients: [
				{
					id: 1,
					name: 'A',
					password: 'fredpass',
					access_all: false,
					projects: [
						{
							id: 1,
							title: 'A',
							access_all: false,
							studies: [
								{ id: 1, title: 'A', roles: [] },
								{ id: 2, title: 'B', roles: [] },
							]
						},
						{
							id: 2,
							title: 'B',
							studies: [
								{ id: 1, title: 'C', roles: []},
								{ id: 2, title: 'D', roles: []},
							]
						}
					]
				}
			]
		},
		{
			email: "sue@boo.com",
			clients: [{
				id: 1,
				projects: [{
					id: 1,
					studies: [
						{ id: 1, title: 'A', roles: ['admin'] }
					]
				}]
			}]
		},
		{
			email: "lou@noo.com",
			clients: [{
				id: 1,
				projects: [{
					id: 1,
					studies: [
						{ id: 1, title: 'A', roles: ['admin'] }
					]
				}]
			}]
		}
	]
}
